const blogRouter = require("express").Router()
const jwt = require("jsonwebtoken")
const Blog = require("../models/blog")
const User = require("../models/user")
const { JWT_SECRET } = require("../utils/config")
const { userExtractor } = require("../utils/middleware")

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response) => {
  const { title, author, likes, url } = request.body

  const user = request.user

  const blog = new Blog({
    user: user.id,
    title,
    url,
    author,
    likes
  })

  user.blogs = user.blogs.concat(blog.id)
  await user.save()
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)

})

blogRouter.delete("/:id", userExtractor, async (request, response) => {
  const id = request.params.id
  const user = request.user

  const blog = await Blog.findById(id)
  if (user.id.toString() !== blog.user.toString()) {
    return response.status(403).json({
      "error": "You are not allowed to delete this post."
    })
  }
  await blog.deleteOne()
  response.status(204).end()
})


blogRouter.put("/:id", async (request, response) => {
  const id = request.params.id
  const body = request.body

  const blog = await Blog.findById(id)

  if (!blog) {
    return response.status(404).end()
  }

  blog.likes = body.likes
  blog.title = body.title
  blog.author = body.author
  blog.url = body.author

  const updatedBlog = await blog.save()

  response.json(updatedBlog)
})
module.exports = blogRouter