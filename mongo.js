const mongoose = require('mongoose')

if(process.argv.length<3){
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const pname = process.argv[3]
const pnumber = process.argv[4]


const url =
`mongodb+srv://test:${password}@mernapp.tzrlur1.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name : String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if(pname && pnumber){
  const person = new Person({
    name: pname,
    number: pnumber,
  })

  person.save().then(() => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}
else{
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}
