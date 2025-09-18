const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const User = require('../models/user')
const app = require('../app')
const { usersInDb } = require('./test_helper')

const api = supertest(app)


describe("create user when there is one user in DB", async () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test("creating with fresh username", async () => {
    const userAtStart = await usersInDb()

    const newUser = {
      username: 'testuser1',
      name: 'Test User',
      password: 'testpassword1',
    }

    await api.post('/api/users').send(newUser).expect(201).expect('Content-Type', /application\/json/)

    const userAtEnd = await usersInDb()

    assert.strictEqual(userAtEnd.length, userAtStart.length + 1)

    const usernames = userAtEnd.map(user => user.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()

    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtStart.length, usersAtEnd.length)


  })

  test('creation fails with proper statuscode and message if username is shorter than 3 char', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'ro',
      name: 'new user',
      password: 'testpassword',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await usersInDb()

    assert(result.body.error.includes('User validation failed'))

    assert.strictEqual(usersAtStart.length, usersAtEnd.length)


  })

  test('creation fails with proper statuscode and message if password is shorter than 3 char', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'newrootuser',
      name: 'new root user',
      password: 'nr',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await usersInDb()

    assert(result.body.error.includes('password must be greater than 3 char'))

    assert.strictEqual(usersAtStart.length, usersAtEnd.length)


  })
})

after(async () => {
  await mongoose.connection.close()
})