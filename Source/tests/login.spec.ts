import { expect, test } from '@playwright/test'
import dotenv from 'dotenv'
import { PerformLogin } from '../utils/CommonFunctions'
import { equal } from 'assert'

dotenv.config()
test('login', async ({ page }) => {
    await PerformLogin(page, process.env.S_Username!, process.env.S_Password!)
    //await page.pause()
    await expect(page).toHaveScreenshot('Homepage.png',{fullPage:true})
    // await expect(page.locator('accounts-title').first()).toContainText('Account Details and Order History')
    // await page.context().storageState({path:'auth.json'})
})