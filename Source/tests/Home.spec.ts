import { test } from '@playwright/test'
import dotenv from 'dotenv'
import { PerformAddToCart } from '../utils/CommonFunctions'
import { Login } from '../Pages/login'
import { faker } from '@faker-js/faker'
import { Home } from '../Pages/Home'

dotenv.config()
test('Home_Item_Cart', async ({ page }) => {
    const login = new Login(page)
    const home = new Home(page)
    await login.navigation()
    await home.SelectItem()
    await PerformAddToCart(page, faker.string.alphanumeric(8), faker.internet.email(), faker.person.firstName(), faker.person.lastName())
})