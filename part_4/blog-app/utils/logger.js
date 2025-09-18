const { NODE_ENV } = require("../utils/config")
const info = (...params) => {
  if (NODE_ENV !== "test") {
    console.log(...params)
  }
}

const error = (...params) => {
  if (NODE_ENV !== "test") {
    console.log(...params)
  }
}

module.exports = { info, error }