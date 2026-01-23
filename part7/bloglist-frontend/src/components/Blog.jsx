import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, currentUser }) => {
  const [showFull, setShowFull] = useState(false)

  const toggleShowFull = () => setShowFull(!showFull)

  const blogStyle = {
    padding: 4,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 5,
  }

  const increaseLikes = (event) => {
    event.preventDefault()

    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }

    updateBlog(updatedBlog)
  }

  return (
    <div style={blogStyle} className='blog'>
      <p>
        {blog.title} {blog.author}
      </p>
      {showFull && (
        <div>
          <p>Url: {blog.url}</p>
          <p>Likes: {blog.likes}</p>
          {blog.user?.username && <p>User: {blog.user.username}</p>}
          <button onClick={increaseLikes}>♥</button>
          <button onClick={toggleShowFull}>Hide</button>
          {currentUser.data.username===blog.user?.username && <button onClick={() => deleteBlog(blog)}>Delete</button>}
        </div>
      )}
      {!showFull && <button onClick={toggleShowFull}>View</button>}
    </div>
  )
}

export default Blog
