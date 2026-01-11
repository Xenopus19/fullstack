const { test, expect, describe, beforeEach } = require("@playwright/test");
const { loginWith, addTestBlog } = require("./helper");

beforeEach(async ({ page, request }) => {
  await request.post("http://localhost:3001/api/testing/reset");
  await request.post("http://localhost:3001/api/users", {
    data: {
      name: "TestName",
      username: "test",
      password: "login",
    },
  });

  await page.goto("http://localhost:5173");
});

test("front page can be opened", async ({ page }) => {
  const locator = page.getByText(/login/);
  await expect(locator).toBeVisible();
});

describe("Login", () => {
  test("succeeds with correct credentials", async ({ page }) => {
    loginWith(page, "test", "login");

    await expect(page.getByText(/is logged/i)).toBeVisible();
  });

  test("fails with wrong credentials", async ({ page }) => {
    loginWith(page, "gggfgf", "hhghdg");

    await expect(page.getByText(/wrong credentials/i)).toBeVisible();
    await expect(page.getByText(/is logged/i)).not.toBeVisible();
  });
});

describe("when logged in", () => {
  beforeEach(async ({ page }) => {
    loginWith(page, "test", "login");
  });

  test("it's possible to create a blog", async ({ page }) => {
    addTestBlog(page);

    await page.getByText(/testBlog author/i).waitFor();
    await expect(page.getByText(/new blog added: testBlog/i)).toBeVisible();
    await expect(page.getByText(/testBlog author/i)).toBeVisible();
  });

  test("it's possible to like blog", async ({ page }) => {
    addTestBlog(page);

    await page.getByRole("button", { name: /View/i }).click();

    await expect(page.getByText(/Likes: 9/i)).toBeVisible();
    await page.getByRole("button", { name: /♥/i }).click();
    await expect(page.getByText(/Likes: 10/i)).toBeVisible();
  });

  test("user who added blog can delete it", async ({ page }) => {
    addTestBlog(page);

    page.on("dialog", async (dialog) => {
      console.log(dialog.message());
      await dialog.accept();
    });

    await page.getByRole("button", { name: /View/i }).click();
    await page.getByRole("button", { name: /Delete/i }).click();
    await expect(page.getByText(/testBlog author/i)).not.toBeVisible();
  });

  test("no delete button if current user is not blog owner", async ({
    page,
    request,
  }) => {
    await request.post("http://localhost:3001/api/users", {
      data: {
        name: "OtherUser",
        username: "other",
        password: "login",
      },
    });
    await addTestBlog(page);

    await page.getByRole("button", { name: /Logout/i }).click();

    await loginWith(page, "other", "login");

    await page.getByRole("button", { name: /View/i }).click();
    await expect(
      page.getByRole("button", { name: /Delete/i })
    ).not.toBeVisible();
  });

  test.only("blogs are sorted correctly", async ({ page }) => {
    await addTestBlog(page);
    await page.getByText(/testBlog author/i).waitFor();
    await addTestBlog(page, {
      title: "second",
      author: "author",
      url: "site.com",
      likes: "20",
    });
    await page.getByText(/second author/i).waitFor();
    await addTestBlog(page, {
      title: "third",
      author: "author",
      url: "site.com",
      likes: "30",
    });
    await page.getByText(/third author/i).waitFor();

    for (let i = 0; i < 3; i++) {
      let viewButton = await page
        .getByRole("button", { name: /view/i })
        .first();
      await viewButton.click();
    }

    const allTexts = await page.getByText(/Likes:/i).allInnerTexts();
    const likes = allTexts.map((text) =>
      parseInt(text.replace(/\D/g, ""), 10)
    );

    const sorted = [...likes].sort((a, b) => b - a);

    expect(likes).toEqual(sorted);
  });
});
