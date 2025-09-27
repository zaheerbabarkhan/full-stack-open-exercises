import { useState } from 'react'

const Blog = ({ blog, user, updateLikes, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const [visible, setVisible] = useState(false)


  const addLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    updateLikes(updatedBlog)
  }

  const removeBlog = () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)

    }
  }
  return (
    <div style={blogStyle}>
      <div className='blog-title'>
        {blog.title} {blog.author} <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={{ display: visible ? '' : 'none' }}>
        <p><a href={blog.url}>{blog.url}</a></p>
        <p className='likes'>likes {blog.likes} <button onClick={addLike}>like</button></p>
        <p>{user?.name}</p>
        {user.username === blog.user.username && <p><button onClick={removeBlog}>remove</button></p>}
      </div>
    </div>
  )
}

export default Blog