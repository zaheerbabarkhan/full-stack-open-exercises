const _ = require("lodash")
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const totalLikes = blogs.reduce((sum, nextValue) => sum + nextValue.likes, 0)
  return totalLikes
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  return blogs.reduce((maxBlog, nextBlog) =>
    nextBlog.likes > maxBlog.likes ? nextBlog : maxBlog
  );
};

const mostBlogs = (blogs) => {
  const grouped = _.groupBy(blogs, "author")

  const authorsWithCount = _.map(grouped, (authorBlogs, author) => {
    return {
      author,
      blogs: authorBlogs.length
    }
  })

  return _.maxBy(authorsWithCount, "blogs")
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  // Group blogs by author
  const grouped = _.groupBy(blogs, 'author')

  // Create an array of { author, likes }
  const authorsWithLikes = _.map(grouped, (authorBlogs, author) => ({
    author,
    likes: _.sumBy(authorBlogs, 'likes')
  }))

  // Return the one with the most likes
  return _.maxBy(authorsWithLikes, 'likes')
}
module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }