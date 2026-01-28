import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Blog = ({updateBlog, deleteBlog, commentBlog}) => {
  const {id} = useParams()
  const blog = useSelector(state => state.blogs).find(b => b.id===id)
  const currentUser = useSelector(state => state.user)

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

  const addComment = event => {
    event.preventDefault()

    commentBlog(blog, event.target.comment.value)
    event.target.comment.value = ''
  }

  if(!blog) return

  return (
    <div style={blogStyle} className='blog'>
      <h3>
        {blog.title} {blog.author}
      </h3>
      <div>
          <p>Url: {blog.url}</p>
          <p>Likes: {blog.likes}</p>
          {blog.user?.username && <p>User: {blog.user.username}</p>}
          <button onClick={increaseLikes}>♥</button>
          {currentUser.username===blog.user?.username && <button onClick={() => deleteBlog(blog)}>Delete</button>}
          <h4>Comments:</h4>
          <ul>
            {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
          </ul>
          <form onSubmit={addComment}>
            <input name='comment' type='text' placeholder='comment'></input>
            <button type='submit'>add comment</button>
          </form>
        </div>
    </div>
  )
}

export default Blog
