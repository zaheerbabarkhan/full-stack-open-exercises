import { test, expect, describe, beforeEach } from '@playwright/test';
import { loginWith, createBlog } from './helper';

describe("Blog App", () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'New User',
        username: 'newuser',
        password: 'securepassword'
      }
    })
    await page.goto("/")
  })

  test("Login Form is shown", async ({ page }) => {
    await expect(page.getByLabel("username")).toBeVisible()
    await expect(page.getByLabel("password")).toBeVisible()
    await expect(page.getByRole('button', { name: "login" })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, "newuser", "securepassword")

      await expect(page.getByText("New User logged in")).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, "wronguser", "wrongpassword")

      await expect(page.getByText("invalid username or password")).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "newuser", "securepassword")
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'this the title for new blog', 'this is the author for new', 'this is the url for the new blog')

      await expect(page.getByText("this the title for new blog this is the author for new")).toBeVisible()

    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, 'this the title for new blog', 'this is the author for new', 'this is the url for the new blog')
      await page.getByRole('button', { name: "view" }).click()
      await page.getByRole('button', { name: "like" }).click()

      // Wait for the likes count to update to 1
      await expect(page.locator('.likes')).toContainText('likes 1')

      await page.getByRole('button', { name: "like" }).click()

      // Wait for the likes count to update to 2
      await expect(page.locator('.likes')).toContainText('likes 2')
    })

    test("blog can be deleted", async ({ page }) => {
      await createBlog(page, 'this the title for new blog', 'this is the author for new', 'this is the url for the new blog')
      await page.getByRole('button', { name: "view" }).click()
      page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('confirm')
        await dialog.accept()
      })
      await page.getByRole('button', { name: "remove" }).click()

      await expect(page.getByText("this the title for new blog this is the author for new")).not.toBeVisible()

    })
    test("other user cannot see removed button", async ({ page, request }) => {
      await request.post('/api/users', {
        data: {
          name: 'New User',
          username: 'newuser2',
          password: 'securepassword'
        }
      })
      await createBlog(page, 'this the title for new blog 2', 'this is the author for new', 'this is the url for the new blog')
      await page.evaluate(() => localStorage.clear());
      await page.goto("/")
      await loginWith(page, "newuser2", "securepassword")
      await page.getByRole('button', { name: "view" }).click()
      await expect(page.getByRole("button", { name: "remove" })).not.toBeVisible()
    })

    test("blog with most likes comes first", async ({ page }) => {
      await createBlog(page, 'Blog A', 'Author A', 'http://url-a.com')
      await createBlog(page, 'Blog B', 'Author B', 'http://url-b.com')

      // Open both blogs using the view buttons
      const viewButtons = page.getByRole('button', { name: 'view' });
      await viewButtons.nth(1).click(); // Open second blog (Blog B)
      await viewButtons.nth(0).click(); // Open first blog (Blog A)


      // Get references to the specific blog containers using the blog-title class
      const blogA = page.locator('.blog-title').filter({ hasText: 'Blog A Author A' }).locator('..');
      const blogB = page.locator('.blog-title').filter({ hasText: 'Blog B Author B' }).locator('..');

      // Like Blog A once (1 like)
      await blogA.getByRole('button', { name: 'like' }).click();
      await expect(blogA.locator('.likes')).toContainText('likes 1');

      // Like Blog B multiple times (3 likes total)
      // First like
      await blogB.getByRole('button', { name: 'like' }).click();
      await expect(blogB.locator('.likes')).toContainText('likes 1');

      // Second like - now Blog B should move to top
      await blogB.getByRole('button', { name: 'like' }).click();
      await expect(blogB.locator('.likes')).toContainText('likes 2');

      // Third like
      await blogB.getByRole('button', { name: 'like' }).click();
      await expect(blogB.locator('.likes')).toContainText('likes 3');

      // Verify that Blog B (with 3 likes) appears before Blog A (with 1 like)
      const firstBlogTitle = page.locator('.blog-title').first();
      await expect(firstBlogTitle).toContainText('Blog B Author B');

    })
  })

})