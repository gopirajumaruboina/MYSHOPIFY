import { expect, test } from '@playwright/test'
import { Login } from '../Pages/login'
import { About } from '../Pages/AboutUs'

test('about us',async({page})=>{
 const login = new Login(page)
 const about = new About(page)
 await login.navigation()
 await about.AboutNav()
 await expect(await about.AboutMsg()).toContain('This is a demo site created for ')
})