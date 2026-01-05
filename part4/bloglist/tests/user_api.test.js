const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert");
const { test, beforeEach, after, describe } = require("node:test");
const mongoose = require("mongoose");
const User = require("../models/user");
const { test_users, testUser, getAllUsers } = require("./test_helper");
const generatePasswordHash = require('../utils/hash')

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await generatePasswordHash(test_users[0].password);
  
  for (let user of test_users) {
    let userObject = new User({
      username: user.username,
      name: user.name,
      passwordHash
    });
    await userObject.save();
  }
});

test("a valid blog can be added", async () => {
  await api
    .post("/api/users")
    .send(testUser)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const usersInDB = await getAllUsers();
  assert.strictEqual(usersInDB.length, test_users.length + 1);

  const usernames = usersInDB.map((n) => n.username);
  assert(usernames.includes(testUser.username));
});

test("not valid blog can't be added", async () => {
    const newUser = {
        username: 'khfdgjdk',
        password: 'b',
        name: 'g'
    }
  const response = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

    assert(response.body.error.includes('password must be at least 3 characters long'))

  const usersInDB = await getAllUsers();
  assert.strictEqual(usersInDB.length, test_users.length);
});

after(async () => {
  await mongoose.connection.close();
});

console.log(testUser)