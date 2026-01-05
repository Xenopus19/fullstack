const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0) return undefined
    const favorite = blogs.reduce((fav, blog) => {
        if(blog.likes > fav.likes || fav === undefined){
            return blog
        }
        return fav
    })
    return favorite
}

const mostBlogs = (blogs) => {
    if(blogs.length === 0) return undefined
    const authorCounts = lodash.countBy(blogs, 'author')
    const maxAuthor = Object.keys(authorCounts).reduce((a, b) => authorCounts[a] > authorCounts[b] ? a : b)
    return { author: maxAuthor, blogs: authorCounts[maxAuthor] }
}

const mostLikes = (blogs) => {
    if(blogs.length === 0) return undefined
    const likesByAuthor = lodash.groupBy(blogs, 'author')
    const authorLikes = Object.keys(likesByAuthor).map(author => {
        const totalLikes = likesByAuthor[author].reduce((sum, blog) => sum + blog.likes, 0)
        return { author, likes: totalLikes }
    })
    return authorLikes.reduce((a, b) => a.likes > b.likes ? a : b)
}

module.exports = {
    dummy,
    totalLikes, 
    favoriteBlog,
    mostBlogs,
    mostLikes
}