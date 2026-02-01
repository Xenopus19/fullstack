const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
require('dotenv').config() 

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/library'

const clear = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')

    await Book.deleteMany({})
    await Author.deleteMany({})
  } catch (error) {
  } finally {
    mongoose.connection.close()
  }
}

clear()