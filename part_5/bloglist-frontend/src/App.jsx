import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

import './index.css'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {

  const blogFormRef = useRef(null)

  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setnotificationMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (_error) {
      setIsError(true)
      setnotificationMessage('invalid username or password')
      setTimeout(() => {
        setnotificationMessage(null)
        setIsError(false)
      }, 3000)
    }

  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }
  const deleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    } catch (_error) {
      setIsError(true)
      setnotificationMessage('blog cannot be deleted')
      setTimeout(() => {
        setnotificationMessage(null)
        setIsError(false)
      }, 3000)
    }
  }
  const updateBlog = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject)
      setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))

    } catch (_error) {
      setIsError(true)
      setnotificationMessage('blog cannot be updated')
      setTimeout(() => {
        setnotificationMessage(null)
        setIsError(false)
      }, 3000)
    }
  }
  const addBlog = async (blogObject) => {

    try {
      const newBlog = await blogService.create(blogObject)

      setBlogs(blogs.concat(newBlog))
      setnotificationMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setnotificationMessage(null)
      }, 3000)

      blogFormRef.current.toggleDisplay()
    } catch (error) {
      setIsError(true)
      setnotificationMessage('blog cannot be added')
      setTimeout(() => {
        setnotificationMessage(null)
        setIsError(false)
      }, 3000)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} className={isError ? 'error' : 'success'} />

      {!user && <LoginForm onSubmit={handleLogin} password={password} setPassword={setPassword} setUsername={setUsername} username={username} />}

      {user && (
        <div>
          <div>
            <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          </div>
          <div>

            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
              <BlogForm createBlog={addBlog} />
            </Togglable>
          </div>
          <div>
            {blogs.sort((first, second) => second.likes - first.likes).map(blog =>
              <Blog key={blog.id} blog={blog} user={user} updateLikes={updateBlog} deleteBlog={deleteBlog}/>
            )}
          </div>
        </div>
      )}

    </div>
  )
}

export default App