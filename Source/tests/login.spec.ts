import { expect, test } from '@playwright/test'
import dotenv from 'dotenv'
import { PerformLogin } from '../utils/CommonFunctions'

dotenv.config()
test('login', async ({ page }) => {
    await PerformLogin(page, process.env.S_Username!, process.env.S_Password!)
    //await expect(page).toHaveScreenshot('Homepage.png',{fullPage:true})
    //await page.context().storageState({path:'auth.json'})
})