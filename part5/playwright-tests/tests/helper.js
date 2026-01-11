const loginWith = async (page, username, password) => {
  await page.getByPlaceholder("username").fill(username);
  await page.getByPlaceholder("password").fill(password);

  await page.getByRole("button", { name: /login/i }).click();
};

const addTestBlog = async (page, blog = {title: "testBlog", author: "author", url:"testsite.com", likes: "9" }) => {
    await page.getByRole("button", { name: /Create blog/i }).click();

    await page.getByPlaceholder("title").fill(blog.title)
    await page.getByPlaceholder("author").fill(blog.author)
    await page.getByPlaceholder("url").fill(blog.url)
    await page.getByPlaceholder("likes").fill(blog.likes)

    await page.getByRole("button", { name: /Create blog/i }).click();
}

export {loginWith, addTestBlog}
