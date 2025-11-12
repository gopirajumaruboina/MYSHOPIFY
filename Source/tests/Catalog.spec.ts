import { test } from '@playwright/test'
import { Login } from '../Source/Pages/login'
import { PerformAddToCart } from '../Source/utils/CommonFunctions'
import { Catalog } from '../Source/Pages/Catalog'
import { faker } from '@faker-js/faker'

test('Catalog_Item_Cart', async ({ page }) => {
    const login = new Login(page)
    const cat = new Catalog(page)
    await login.navigation()
    await cat.CatItemNav()
    await PerformAddToCart(page, faker.string.alphanumeric(8), faker.internet.email(), faker.person.firstName(), faker.person.lastName())
})