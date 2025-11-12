import { test } from '@playwright/test'
import dotenv from 'dotenv'
import { PerformAddToCart } from '../Source/utils/CommonFunctions'
import { Login } from '../Source/Pages/login'
import { faker } from '@faker-js/faker'
import { Home } from '../Source/Pages/Home'

dotenv.config()
test('Home_Item_Cart', async ({ page }) => {
    const login = new Login(page)
    const home = new Home(page)
    await login.navigation()
    await home.SelectItem()
    await PerformAddToCart(page, faker.string.alphanumeric(8), faker.internet.email(), faker.person.firstName(), faker.person.lastName())
})