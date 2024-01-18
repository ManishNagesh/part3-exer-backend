const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
// console.log('url: ',url)


mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })
    
const personSchema = new mongoose.Schema({
    name : String,
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


// if(pname && pnumber){
//     const person = new Person({
//         name: pname,
//         number: pnumber,
//     })
    
//     person.save().then(result => {
//         console.log('person saved!')
//         mongoose.connection.close()
//     })
// }
// else{
//     console.log('phonebook:')
//     Person.find({}).then(result => {
//         result.forEach(person => {
//             console.log(person.name, person.number)
//         })
//         mongoose.connection.close()
//     })
// }

