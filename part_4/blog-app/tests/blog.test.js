const { test, beforeEach, after } = require("node:test")
const assert = require("node:assert")
const supertest = require("supertest")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const User = require("../models/user")
const app = require("../app")
const Blog = require("../models/blog")
const { initialBlogs, blogsInDb, usersInDb } = require("./test_helper")
const { JWT_SECRET } = require("../utils/config")

const api = supertest(app)

let token
beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root2', passwordHash })

  await user.save()

  const initialBlogsWithUser = [{
    ...initialBlogs[0],
    user: user.id
  },
  {
    ...initialBlogs[1],
    user: user.id
  }]

  await Blog.insertMany(initialBlogsWithUser)



  const userForToken = {
    username: user.username,
    id: user.id,
  }

  token = jwt.sign(userForToken, JWT_SECRET, {
    expiresIn: 60 * 60
  })
})

test("blogs are returned as JSON", async () => {
  await api.get("/api/blogs").expect(200).expect("Content-Type", /application\/json/)
})

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs")

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test("blog have id property included", async () => {
  const response = await api.get("/api/blogs")

  assert.ok("id" in response.body[0])
})

test("valid blog is added", async () => {
  const blogsInStart = await blogsInDb()

  const newBlog = {
    "title": "My second blog",
    "author": "Lara croft",
    "url": "http://example.com/my-first-blog",
    "likes": 0
  }
  await api.post("/api/blogs").set('Authorization', `Bearer ${token}`).send(newBlog)

  const blogsInEnd = await blogsInDb()
  const titles = blogsInEnd.map(blog => blog.title)

  assert(titles.includes(newBlog.title))
  assert.strictEqual(blogsInEnd.length, blogsInStart.length + 1)
})

test("401 is returned if token is not there", async () => {
  const blogsInStart = await blogsInDb()

  const newBlog = {
    "title": "My new blog without token",
    "author": "Lara croft",
    "url": "http://example.com/my-first-blog",
    "likes": 0
  }
  await api.post("/api/blogs").send(newBlog).expect(401)

  const blogsInEnd = await blogsInDb()
  const titles = blogsInEnd.map(blog => blog.title)

  assert(!titles.includes(newBlog.title))
  assert.strictEqual(blogsInEnd.length, blogsInStart.length)
})

test("likes defaults to 0 when not provided", async () => {
  const newBlog = {
    "title": "My second blog",
    "author": "Lara croft",
    "url": "http://example.com/my-first-blog",
  }
  const response = await api.post("/api/blogs").set('Authorization', `Bearer ${token}`).send(newBlog)

  assert.strictEqual(response.body.likes, 0)
})

test("missing title is 400", async () => {
  const newBlog = {
    "author": "Lara croft",
    "url": "http://example.com/my-first-blog",
    likes: 10
  }
  await api.post("/api/blogs").set('Authorization', `Bearer ${token}`).send(newBlog).expect(400)
})

test("missing url is 400", async () => {
  const newBlog = {
    "title": "My second blog",
    "author": "Lara croft",
    likes: 10
  }
  await api.post("/api/blogs").set('Authorization', `Bearer ${token}`).send(newBlog).expect(400)
})

test("delete using valid id", async () => {
  const blogsInStart = await blogsInDb()
  const blogToDelete = blogsInStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).set('Authorization', `Bearer ${token}`).expect(204)

  const blogsInEnd = await blogsInDb()
  const content = blogsInEnd.map(blog => blog.title)

  assert(!content.includes(blogToDelete.title))
  assert.strictEqual(blogsInEnd.length, initialBlogs.length - 1)
})

test("update blog", async () => {
  const blogsInStart = await blogsInDb()
  let blogToUpdate = blogsInStart[0]

  blogToUpdate = {
    ...blogToUpdate,
    likes: 23
  }
  const response = await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate).expect(200)

  assert.strictEqual(response.body.likes, blogToUpdate.likes)

  const blogsInEnd = await blogsInDb()

  const updatedBlog = blogsInEnd.find(blog => blog.id === blogToUpdate.id)

  assert.strictEqual(updatedBlog.likes, blogToUpdate.likes)
})

after(async () => {
  await mongoose.connection.close()
})