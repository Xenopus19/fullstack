const mongoose = require('mongoose')
console.log('connecting to MongoDB...')

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.1jrt6lt.mongodb.net/?appName=Cluster0`

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

const Person = mongoose.model('Person', personSchema)

if(process.argv.length<4){
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => console.log(person))
        mongoose.connection.close()
    })
}
else{
    const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})

person.save().then(result => {
  console.log(`person ${result.name} ${result.number} saved!`)
  mongoose.connection.close()
})
}

