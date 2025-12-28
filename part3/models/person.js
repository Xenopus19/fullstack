const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

mongoose.set('strictQuery', false)

mongoose.connect(url, {family: 4})
.then(() => console.log('connected to MongoDB'))
.catch(error => console.log('error connecting to MongoDB:', error.message))

const personSchema = new mongoose.Schema({
    id: String,
  name: String,
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)