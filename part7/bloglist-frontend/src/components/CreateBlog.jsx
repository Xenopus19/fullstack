import { useState } from 'react'

const CreateBlog = ({ submitBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)

  const handleSubmit = (event) => {
    event.preventDefault()
    const newBlog = { title, author, url, likes }
    submitBlog(newBlog)

    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes(0)
  }

  return (
    <div>
      <h2>Add new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            title
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              placeholder='title'
            />
          </label>
        </div>

        <div>
          <label>
            author
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
              placeholder='author'
            />
          </label>
        </div>

        <div>
          <label>
            url
            <input
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
              placeholder='url'
            />
          </label>
        </div>

        <div>
          <label>
            likes
            <input
              type="number"
              value={likes}
              onChange={({ target }) => setLikes(target.value)}
              placeholder='likes'
            />
          </label>
        </div>

        <button type="submit">Create Blog</button>
      </form>
    </div>
  )
}

export default CreateBlog
