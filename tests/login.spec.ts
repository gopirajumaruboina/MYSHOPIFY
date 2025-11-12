import { test } from '@playwright/test'
import dotenv from 'dotenv'
import { PerformLogin } from '../Source/utils/CommonFunctions'
import path from 'path'

dotenv.config()
test('login', async ({ page }) => {
    await PerformLogin(page, process.env.S_Username!, process.env.S_Password!)
    await page.context().storageState({path:'auth.json'})
})