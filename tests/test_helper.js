const Blog = require('../models/blog')

const initialBlogs = [
  {
    'title': 'Somali Pirate',
    'author': 'Bhadwa Billa',
    'url': 'gvjh',
    'likes': 3
  },
  {
    'title': 'Sulur Train',
    'author': 'Masa Kuti',
    'url': 'lol',

  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}