const usersRouter = require("express").Router();
const { request } = require("../app");
const User = require("../models/user");
const generatePasswordHash = require("../utils/hash");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate('blogs', {title: 1, author: 1, url:1, likes: 1});
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
    const { username, password, ...rest } = request.body;
  if (password.length < 3 || !password) {
    return response.status(400).json({ error: 'password must be at least 3 characters long' });
  }
  const passwordHash = await generatePasswordHash(password);
  console.log(passwordHash)
  const user = new User({
    username,
    passwordHash,
    ...rest
  });

  const result = await user.save();

  response.status(201).json(result);
});

module.exports = usersRouter;
