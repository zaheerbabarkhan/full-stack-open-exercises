const { test, describe } = require("node:test")
const assert = require("node:assert")

const { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } = require("../utils/list_helper")

test("dummy returns one", () => {
  const blogs = []

  assert.strictEqual(dummy(blogs), 1)
})

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  const listWithManyBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },

    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful Part 2',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
    ,
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful Part 3',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
    , {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful Part 4',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test("empty list have zero likes", () => {
    assert.strictEqual(totalLikes([]), 0)
  })

  test("when list has only one blog, equals the likes of that", () => {
    const result = totalLikes(listWithOneBlog)

    assert.strictEqual(result, 5)
  })

  test("when list has many blogs, equals the sum of th likes", () => {
    const result = totalLikes(listWithManyBlog)

    assert.strictEqual(result, 20)
  })
})

describe("favorite blog", () => {
  const listWithManyBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 9,
      __v: 0
    },

    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful Part 2',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 7,
      __v: 0
    }
    ,
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful Part 3',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
    , {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful Part 4',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 9,
      __v: 0
    }
  ]
  test("blogs with the highest likes is returned", () => {
    const highLikesBlog = favoriteBlog(listWithManyBlog)
    assert.deepStrictEqual(highLikesBlog, listWithManyBlog[0])
  })
})

describe("most blogs", () => {
  test("author with highest blog count", () => {
    const blogs = [
      { author: 'Edsger W. Dijkstra', title: 'Go To Statement', likes: 5 },
      { author: 'Robert C. Martin', title: 'Clean Code', likes: 10 },
      { author: 'Robert C. Martin', title: 'The Clean Coder', likes: 8 },
      { author: 'Robert C. Martin', title: 'Agile Software', likes: 7 },
    ]
    const expected = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    assert.deepStrictEqual(mostBlogs(blogs), expected)
  })
})

describe("most likes", () => {
  test("author with most likes", () => {
    const blogs = [
      { author: 'Edsger W. Dijkstra', title: 'Go To Statement', likes: 5 },
      { author: 'Robert C. Martin', title: 'Clean Code', likes: 10 },
      { author: 'Robert C. Martin', title: 'The Clean Coder', likes: 8 },
      { author: 'Edsger W. Dijkstra', title: 'Another Blog', likes: 12 },
    ]
    const expected = {
      author: 'Robert C. Martin',
      likes: 18
    }
    assert.deepStrictEqual(mostLikes(blogs), expected)
  })
})