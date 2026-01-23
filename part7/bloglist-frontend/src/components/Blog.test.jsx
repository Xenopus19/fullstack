import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders the blog title and author', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: "true",
    url: 'fhgfgf',
    likes: 10
  }

  render(<Blog blog={blog} />)

  let element = screen.getByText(/Component testing is done with react-testing-library/i)
  expect(element).toBeDefined()
  element = screen.getByText(/true/i)
  expect(element).toBeDefined()
  element = screen.queryByText(/fhgfgf/i);
  expect(element).not.toBeInTheDocument(); 
  element = screen.queryByText(/10/i);
  expect(element).not.toBeInTheDocument(); 
  
})

test("clicking button shows likes and url", async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: "true",
    url: 'fhgfgf',
    likes: 10
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const showButton = screen.getByText('View')
  user.click(showButton)
  let element = screen.queryByText(/fhgfgf/i);
  expect(element).toBeDefined(); 
  element = screen.queryByText(/10/i);
  expect(element).toBeDefined(); 
})

test('clicking the button twice calls event handler twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: "true",
    url: 'fhgfgf',
    likes: 10
  }
  
  const mockHandler = vi.fn()

  render(
    <Blog blog={blog} updateBlog={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)
  const buttonLike = screen.getByText('♥')
  await user.click(buttonLike)
  await user.click(buttonLike)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
