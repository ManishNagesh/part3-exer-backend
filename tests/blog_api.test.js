const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
mongoose.set('bufferTimeoutMS', 30000)

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  // helper.initialblogs.forEach(async (blog) => {
  //   let blogObject = new blog(blog)
  //   await blogObject.save()
  // })

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  console.log('saved')
  await Promise.all(promiseArray)
  console.log('done')
}, 10000)


//exer 4.8
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
},10000)

test('all blogs are returned', async() => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'manish',
    url: 'efs',
    likes: 2,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const title = blogsAtEnd.map(n => n.title)
  expect(title).toContain(
    'async/await simplifies making async calls'
  )
})

//exer 4.9
test('property exist or not checker', async () => {

  // const response = await api.get('/api/blogs/')
  const blogs = await helper.blogsInDb()
  //question has asked to use this -"toBeDefined"
  expect(blogs[0].id).toBeDefined()
  //but this is better to use for checking certain name of property exist or not
  expect(blogs[0]).toHaveProperty('id')
})

//exer 4.11
test('check if blog without likes is added', async () => {
  const newblog = {
    title: 'funny bois',
    author: 'mad dogo',
    url: 'efse'
  }



  await api
    .post('/api/blogs')
    .send(newblog)
    .expect(201)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})


//exer 4.12
test('blog without title and url is not added', async () => {
  const newBlog = {
    author: 'mad dogo',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})


describe('updation of a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = {
      title: 'Somali Pirate',
      author: 'Bhadwa Billa',
      url: 'gvjh',
      likes: 6,
    }
    const requiredBlogId = blogsAtStart.filter(blog => blog.title === blogToUpdate.title)

    // console.log(blogToUpdate)

    await api
      .put(`/api/blogs/${requiredBlogId[0].id}`)
      .send(blogToUpdate)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    console.log(blogsAtEnd)

    // expect(blogsAtEnd).toHaveLength(
    //   helper.initialBlogs.length - 1
    // )

    // const titles = blogsAtEnd.map(r => r.title)
    // expect(titles).not.toContain(blogToUpdate.title)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})