import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlog from './components/CreateBlog'
import Message from './components/Message'
import Toggleable from './components/Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newMessage, setNewMessage] = useState({
    message : '',
    isError : false
  })

  const createBlogRef = useRef(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.data.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.data.token)
      setUsername('')
      setPassword('')
      displayMessage('logged in', false)
    } catch {
      displayMessage('wrong credentials', true)
    }
  }

  const displayMessage = (message, isError) => {
    setNewMessage({ message: message, isError:isError })
    setTimeout(() => {
      setNewMessage({ message:'', isError:false })
    }, 5000)
  }

  const handleLogout = () => {
    console.log('logging out...')
    window.localStorage.clear()
    setUser(null)
    blogService.setToken('')
  }

  const handleCreateBlog = async blog => {
    try{
      const result = await blogService.create(blog)
      setBlogs(blogs.concat(result))
      displayMessage(`new blog added: ${result.title} by ${result.author}`, false)
      createBlogRef.current.toggleVisibility()
    }
    catch{
      displayMessage('error adding blog', true)
    }
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <h2>login</h2>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              autoComplete="username"
              placeholder='username'
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              autoComplete="current-password"
              placeholder='password'
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    )
  }

  const blogList = () => {
    return (
      <>
        <h2>blogs</h2>
        {getSortedBlogs().map((blog) => (
          <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} updateBlog={updateBlog} currentUser={user}/>
        ))}
      </>
    )
  }

  const updateBlog = async updatedBlog => {
    try{
      console.log(updatedBlog)
      const response = await blogService.update(updatedBlog)
      const updatedBlogs = blogs.map(blog => blog.id===response.id ? response : blog)
      setBlogs(updatedBlogs)
    } catch{
      displayMessage('error updating blog', true)
    }
  }

  const deleteBlog = async blogToDelete => {
    if(!window.confirm(`Delete the ${blogToDelete.title} blog?`)) return
    try {
      await blogService.deleteBlog(blogToDelete)
      const newBlogs = blogs.filter(blog => blog.id!==blogToDelete.id)
      setBlogs(newBlogs)
    } catch {
      displayMessage('A user is unauthorized to delete the blog', true)
    }
  }

  const getSortedBlogs = () => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
    console.log(sortedBlogs)
    return sortedBlogs
  }

  return (
    <div>
      <Message message={newMessage.message} isError={newMessage.isError}/>
      {user && (
        <div>
          <h4>User {user.data.name} is logged in</h4>
          <button onClick={handleLogout}>Logout</button>
          <Toggleable buttonLabel = 'Create blog' ref = {createBlogRef} >
            <CreateBlog submitBlog={handleCreateBlog}></CreateBlog>
          </Toggleable>
          {blogList()}
        </div>
      )}
      {!user && loginForm()}
    </div>
  )
}

export default App
