const jwt = require("jsonwebtoken");
const Book = require("./models/book");
const Author = require("./models/author");
const { GraphQLError } = require("graphql");
const User = require("./models/user");
const { PubSub } = require('graphql-subscriptions')

const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let query = {};

      if (args.genre) {
        query.genres = { $in: [args.genre] };
      }
      let books = await Book.find(query).populate("author");
      if (args.name) {
        books = books.filter((b) => b.author.name === args.name);
      }

      return books;
    },
    allAuthors: async () => Author.find({}),

    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Author: {
    bookCount: async (root, args, {loaders}) => {
      return loaders.bookCountLoader.load(root.id);
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const user = await User.find({username: context.currentUser.username})
      if(!user){
        throw new GraphQLError(`Invalid token: ${error.message}`, {
          extensions: {
            code: "UNAUTHORIZED",
            invalidArgs: args.name,
            error,
          },
        });
      }
      
      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author });
        try {
          await author.save();
        } catch (error) {
          throw new GraphQLError(`Saving author failed: ${error.message}`, {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.name,
              error,
            },
          });
        }
      }

      const newBook = new Book({
        ...args,
        author: author._id,
      });

      try {
        await newBook.save();
      } catch (error) {
        throw new GraphQLError(`Saving book failed: ${error.message}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }

      const bookWithAuthor = newBook.populate("author")
      pubsub.publish('BOOK_ADDED', { bookAdded: bookWithAuthor })
      return bookWithAuthor;
    },

    editAuthor: async (root, args, context) => {
      const user = await User.find({username: context.currentUser.username})
      if(!user){
        throw new GraphQLError(`Invalid token: ${error.message}`, {
          extensions: {
            code: "UNAUTHORIZED",
            invalidArgs: args.name,
            error,
          },
        });
      }

      const author = await Author.findOne({ name: args.name });

      if (!author) return null;

      if (args.setBornTo) {
        author.born = args.setBornTo;
      }

      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError(`Saving author failed: ${error.message}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
      return author;
    },

    createUser: async (root, args) => {
      const newUser = new User({ ...args });

      try {
        await newUser.save();
      } catch (error) {
        throw new GraphQLError(`Saving user failed: ${error.message}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
      return newUser;
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "testpassword") {
        throw new GraphQLError(`Login failed: ${error.message}`, {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const jwtUser = { username: user.username, id: user._id };

      return { value: jwt.sign(jwtUser, process.env.JWT_SECRET) };
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED')
    },
  },
};

module.exports = resolvers;
