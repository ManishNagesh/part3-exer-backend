const express = require('express')
const app = express()
const axios = require('axios')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')


app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('body', req => {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :response-time ms :body'))

let persons = []

app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
        response.json(person)
      })
})

app.get('/info',async(request, response) => {
    try {
        // Make a GET request to the /api/persons endpoint
        const personsResponse = await axios.get(`http://localhost:${process.env.PORT}/api/persons`);

        const length = personsResponse.data.length;
        const time = new Date();
        
        response.send(`<p>Phonebook has info for ${length} people</p>
        <p>${time}</p>`);
    } catch (error) {
        console.error(error);
        response.status(500).send('Internal Server Error');
    }
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(person => response.send(person))
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
  
    const person = {
      name: body.name,
      number: body.number,
    }
  
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
  })


app.post('/api/persons', (request, response) => {
    const body = request.body
    
    // const nameFind = persons.find(person => person.name === body.name)
    if(!body.name){
        return response.status(400).json({
            error: 'please include name'
        })
    } else if(!body.number){
        return response.status(400).json({
            error: 'please include number'
        })
    }
    
    const person = new Person({
        name: body.name,
        number: body.number
    })
    
    person.save().then(savedPerson => {
        response.json(savedPerson)
      })
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
}
  
// handler of requests with result to errors
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})