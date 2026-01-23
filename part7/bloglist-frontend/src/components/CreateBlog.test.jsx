import { render, screen } from '@testing-library/react'
import CreateBlog from './CreateBlog'
import userEvent from '@testing-library/user-event'

test('calls create event with correct params when form is filled', async () => {
    const blog = {
    title: 'Component testing is done with react-testing-library',
    author: "true",
    url: 'fhgfgf',
    likes: 10
  }
  
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<CreateBlog submitBlog={createBlog}></CreateBlog>)

  const titleInput = screen.getByPlaceholderText('title')
  await user.type(titleInput, blog.title)
  const authorInput = screen.getByPlaceholderText('author')
  await user.type(authorInput, blog.author)
  const urlInput = screen.getByPlaceholderText('url')
  await user.type(urlInput, blog.url)
  const likesInput = screen.getByPlaceholderText('likes')
  await user.type(likesInput, blog.likes.toString())
  const sendButton = screen.getByText(/Create Blog/i)
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe(blog.title)
  expect(createBlog.mock.calls[0][0].author).toBe(blog.author)
  expect(createBlog.mock.calls[0][0].url).toBe(blog.url)
  expect(createBlog.mock.calls[0][0].likes).toBe(blog.likes.toString())
  

})