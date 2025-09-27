import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import BlogForm from './BlogForm'

test('createBlog called with proper paramaters', async () => {
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByLabelText('title')
  const authorInput = screen.getByLabelText('author')
  const urlInput = screen.getByLabelText('url')

  const user = userEvent.setup()

  await user.type(titleInput, 'this is the title')
  await user.type(authorInput, 'this is the author')
  await user.type(urlInput, 'this is the url')

  const createButton = screen.getByText('create')

  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('this is the title')
  expect(createBlog.mock.calls[0][0].author).toBe('this is the author')
  expect(createBlog.mock.calls[0][0].url).toBe('this is the url')


})