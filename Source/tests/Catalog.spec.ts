import { test } from '@playwright/test'
import { Login } from '../Pages/login'
import { PerformAddToCart } from '../utils/CommonFunctions'
import { Catalog } from '../Pages/Catalog'
import { faker } from '@faker-js/faker'

test('Catalog_Item_Cart', async ({ page }) => {
    const login = new Login(page)
    const cat = new Catalog(page)
    await login.navigation()
    await cat.CatItemNav()
    await PerformAddToCart(page, faker.string.alphanumeric(8), faker.internet.email(), faker.person.firstName(), faker.person.lastName())
})