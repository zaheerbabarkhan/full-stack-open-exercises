import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

let blog = null
describe('<Blog />', () => {
  beforeEach(() => {
    blog = {
      title: 'this is the first blog',
      author: 'test author',
      url: 'http://example.com',
      likes: 10
    }

  })

  test('title and author is shown and likes and url not', () => {
    render(<Blog blog={blog} />)
    screen.getByText('this is the first blog test author')
    const urlElement = screen.getByText('http://example.com')
    const likesElement = screen.getByText('likes', {
      exact: false
    })

    expect(urlElement).not.toBeVisible()
    expect(likesElement).not.toBeVisible()
  })

  test('url and likes are shown after clicking the button',async () => {
    render(<Blog blog={blog} />)
    const user = userEvent.setup()
    const showButton = screen.getByText('view')

    await user.click(showButton)

    const urlElement = screen.getByText('http://example.com')
    const likesElement = screen.getByText('likes', {
      exact: false
    })

    expect(urlElement).toBeVisible()
    expect(likesElement).toBeVisible()
  })

  test('twice click on likes will update the likes twice', async () => {
    const updatedLikes = vi.fn()
    render(<Blog blog={blog} updateLikes={updatedLikes} />)
    const user = userEvent.setup()
    const showButton = screen.getByText('view')

    await user.click(showButton)


    const likeButton = screen.getByText('like')

    await user.dblClick(likeButton)

    expect(updatedLikes.mock.calls).toHaveLength(2)
  })

})