require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const { default: mongoose } = require('mongoose')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (request, response) => { return JSON.stringify(request.body) })
app.use(morgan(':method :url :response-time :status :body'))

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => response.json(persons))
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findById(id).then(person => {
    if(!person){
      return response.status(404).end()
    }
    response.json(person)
  })
  .catch(error => next(error))
})

app.get('/info', (request, response) => {
  const date = new Date()
  Person.find({})
  .then(persons => response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => {
      next(error)
    })
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if(!body.name || !body.number){
    return response.status(400).json({ 
      error: 'name missing or number missing' 
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findById(id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.number = request.body.number
      
      return person.save()
        .then(updPerson => {
          response.json(updPerson)
        })
    })
    .catch(error => next(error)) 
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})