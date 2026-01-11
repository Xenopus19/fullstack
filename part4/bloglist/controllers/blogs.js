const blogsRouter = require("express").Router();
const { request } = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require('jsonwebtoken')
const extractUser = require('../middleware/user_extractor')

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", extractUser, async (request, response) => {
  const user = request.user

  if(!user){
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    user: user,
    url: request.body.url,
    likes: request.body.likes,
  });

  const result = await blog.save();
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result);
});

blogsRouter.delete("/:id", extractUser, async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id)
  if(request.user.id.toString() !== blogToDelete.user.toString())
  {
    return request.status(401).json({error: 'user not authorised'})
  }

  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const likes = request.body.likes;

  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 });;
  if (!blog) {
    return response.status(404).end();
  }
  blog.likes = likes

  const updatedBlog = await blog.save()
  response.json(updatedBlog)
});

module.exports = blogsRouter;
