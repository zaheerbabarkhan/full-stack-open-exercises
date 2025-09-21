import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })
    setAuthor('')
    setTitle('')
    setUrl('')
  }
  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={addBlog}>
        <div>
          <label>title <input type="text" onChange={({ target }) => setTitle(target.value)} value={title} /></label>
        </div>
        <div>
          <label>author <input type="text" onChange={({ target }) => setAuthor(target.value)} value={author} /></label>
        </div>
        <div>
          <label>url <input type="text" onChange={({ target }) => setUrl(target.value)} value={url} /></label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm