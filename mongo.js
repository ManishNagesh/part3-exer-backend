const mongoose = require('mongoose')
require('dotenv').config()
const Blog = require('./models/blog')


// if (process.argv.length<3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

// const password = process.argv[2]

const url = process.env.TEST_MONGODB_URI

mongoose.set('strictQuery',false)
mongoose.connect(url)

// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean,
// })

// const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
  'title': 'Somali Pirate',
  'author': 'Bhadwa Billa',
  'url': 'gvjh',
  'likes': 3
})
// const note = new Note({
//   content: 'Browser can execute only JavaScript',
//   important: true,
// })

blog.save().then(() => {
  console.log('blog saved!')
  mongoose.connection.close()
})

// Note.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })