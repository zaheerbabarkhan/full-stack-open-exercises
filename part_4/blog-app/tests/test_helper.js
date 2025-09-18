const Blog = require("../models/blog")
const User = require('../models/user')

const initialBlogs = [
  {
    "title": "My first blog",
    "author": "68cb92e2092f0a7daefc162c",
    "url": "http://example.com/my-first-blog",
    "likes": 0,
  },
  {
    "title": "My second blog",
    "author": "68cb92f1f934ff65e5c20bfb",
    "url": "http://example.com/my-first-blog",
    "likes": 0
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = { initialBlogs, blogsInDb, usersInDb }