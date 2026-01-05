const Blog = require("../models/blog");
const User = require("../models/user");

const test_blogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
];

const test_blog = {
  title: "Test blog",
  author: "Test",
  url: "https://reactpatterns.com/",
  likes: 3,
};

const test_users = [
  {
    username: "Rostic1",
    password: "42fgfg425",
    name: "Rostislav Gov",
  },
  {
    username: "Rostic2",
    password: "42fgghgg4565",
    name: "Rostislav Gov",
  },
  {
    username: "Rostic3",
    password: "nna3416425",
    name: "Rostislav Gov",
  },
];

const testUser = {
    username: "Rostic4",
    password: "ngfhjty452",
    name: "Rostislav Gov",
  }

const getAllBlogs = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const getAllUsers = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = { test_blogs, test_blog, getAllBlogs, getAllUsers, test_users, testUser };
