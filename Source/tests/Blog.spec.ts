import { expect, test } from '@playwright/test'
import { Login } from '../Pages/login'
import { Blog } from '../Pages/Blog'

test('blog', async ({ page }) => {
    const login = new Login(page)
    const blog = new Blog(page)
    await login.navigation()
    await blog.BlogNav()
    await expect(await blog.BlogMsg()).toContain('This is your store’s blog. You can use it to talk about new product launches, experiences, tips or other news you want your customers to read about.')
})