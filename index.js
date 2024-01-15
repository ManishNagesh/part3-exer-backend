const express = require('express')
const app = express()
const uuid = require('uuid')
const morgan = require('morgan')
const cors = require('cors')


app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('body', req => {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :response-time ms :body'))

let persons = [
    { 
        "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info',(request, response) => {
    const time = new Date()
    const length = persons.length
    response.send(`<p>Phonebook has info for ${length} people</p>
    <p>${time}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if(person){
        response.send(person)
    } else{
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    // console.log('id',id)
    persons = persons.filter(person => person.id !== id)
    
    response.status(204).end()
})

const generateId =() => {
    const id = Math.floor(Math.random() * 100) + 1;
    return id
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    
    const nameFind = persons.find(person => person.name === body.name)
    if(!body.name){
        return response.status(400).json({
            error: 'please include name'
        })
    } else if(!body.number){
        return response.status(400).json({
            error: 'please include number'
        })
    } else if(nameFind){
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    
    const person = {
        name: body.name,
        number: Number(body.number),
        id: generateId(),
    }
    
    persons = persons.concat(person)
    response.json(persons)
})


const PORT = 3001
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})