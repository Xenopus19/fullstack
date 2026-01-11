const express = require('express')
const mongoose = require('mongoose')
const {PORT, MONGODB_URI} = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const cors = require('cors');
const errorHandler = require('./middleware/error_handler')
const extractToken = require('./middleware/token_extractor')

const app = express()

mongoose.connect(process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI, { family: 4 })

app.use(cors())
app.use(express.json())
app.use(extractToken)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}
app.use(errorHandler)

module.exports = app