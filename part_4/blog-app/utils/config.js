require('dotenv').config()


const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === "test" ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI
const NODE_ENV = process.env.NODE_ENV
const JWT_SECRET = process.env.JWT_SECRET

module.exports = { PORT, MONGODB_URI, NODE_ENV, JWT_SECRET }