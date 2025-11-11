import { test } from '@playwright/test'
import dotenv from 'dotenv'
import { PerformLogin } from '../Source/utils/CommonFunctions'

dotenv.config()
test('login', async ({ page }) => {
    await PerformLogin(page, process.env.S_Username!, process.env.S_Password!)
})