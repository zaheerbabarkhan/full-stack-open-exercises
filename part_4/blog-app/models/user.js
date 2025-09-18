const { Schema, model } = require('mongoose')


const UserSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3
  },
  name: String,
  passwordHash: {
    type: String,
    required: true,
    minLength: 3
  },
  blogs: [{
    type: Schema.Types.ObjectId,
    ref: 'Blog'
  }]
})

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = model('User', UserSchema)

module.exports = User