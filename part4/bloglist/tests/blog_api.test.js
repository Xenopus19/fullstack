const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert");
const { test, beforeEach, after, describe } = require("node:test");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const {
  test_blogs,
  test_blog,
  getAllBlogs,
  getAllUsers,
} = require("./test_helper");
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const api = supertest(app);
let token
beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({})

  const user = new User({ username: 'root', passwordHash: 'secret', name: 'MMMM' });
  await user.save();

  const userForToken = {
    username: user.username,
    id: user.id,
  };
  token = `Bearer ${jwt.sign(userForToken, process.env.SECRET)}`;
  await Blog.insertMany(test_blogs);
});

test("returns the correct amount of blog posts in the JSON format", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.length, test_blogs.length);
});

test("unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  response.body.forEach((blog) => {
    assert.ok(blog.id);
  });
});

test("a valid blog can be added", async () => {
  await api
    .post("/api/blogs")
    .send(test_blog)
    .set({ Authorization: token })
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsInDB = await getAllBlogs();
  assert.strictEqual(blogsInDB.length, test_blogs.length + 1);

  const titles = blogsInDB.map((n) => n.title);
  assert(titles.includes(test_blog.title));
});

test("if no token unauthorized", async () => {
  await api
    .post("/api/blogs")
    .send(test_blog)
    .expect(401)
    .expect("Content-Type", /application\/json/);
});

test("if likes missing its zero", async () => {
  const { likes, ...newBlog } = test_blog;
  const response = await api.post("/api/blogs")
  .send(newBlog)
  .set({ Authorization: token })
  .expect(201);

  assert.strictEqual(response.body.likes, 0);
});

test("bad request error if no title", async () => {
  const { title, ...newBlog } = test_blog;
  const response = await api.post("/api/blogs")
  .send(newBlog)
  .set({ Authorization: token })
  .expect(400);
});

test("bad request error if no url", async () => {
  const { url, ...newBlog } = test_blog;
  const response = await api.post("/api/blogs")
  .send(newBlog)
  .set({ Authorization: token })
  .expect(400);
});

describe("delete blog", () => {
  test("success if blog is present", async () => {
    const blogsAtStart = await getAllBlogs();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`)
    .set({ Authorization: token })
    .expect(204);

    const blogsAtEnd = await getAllBlogs();

    const titles = blogsAtEnd.map((blog) => blog.title);
    assert(!titles.includes(blogToDelete.title));

    assert.strictEqual(blogsAtEnd.length, test_blogs.length - 1);
  });
});

describe("changing of blog", () => {
  test("succesfull if blog is present", async () => {
    const blogsAtStart = await getAllBlogs();
    const blogToChange = blogsAtStart[0];

    blogToChange.likes += 1;

    const updatedBlog = await api
      .put(`/api/blogs/${blogToChange.id}`)
      .send(blogToChange);
    assert.strictEqual(updatedBlog.body.likes, blogToChange.likes);
  });
});

after(async () => {
  await mongoose.connection.close();
});
