const express = require('express')
const mongoose = require('mongoose')

const logger = require("./utils/logger")
const config = require("./utils/config")
const blogRouter = require("./controllers/blogs")
const middleware = require("./utils/middleware")
const app = express()

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(express.static("dist"))
app.use(express.json())

app.use(middleware.requestLogger)

app.use("/api/blogs", blogRouter)

app.get("/hello", (request, response) => {
  response.send("dingdong")
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app