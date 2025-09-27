const express = require('express')
const mongoose = require('mongoose')

const logger = require("./utils/logger")
const config = require("./utils/config")
const blogRouter = require("./controllers/blogs")
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
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

app.use(middleware.tokenExtractor)
app.use("/api/blogs", blogRouter)
app.use("/api/login", loginRouter)
app.use("/api/users", userRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app