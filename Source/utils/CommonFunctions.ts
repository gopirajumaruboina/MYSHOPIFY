import { Page, test } from '@playwright/test'
import { Login } from '../Pages/login'
import { Home } from '../Pages/Home'

let loginpage : Login
let home : Home
export async function PerformLogin(page: Page, username: string, password: string) {
     loginpage = new Login(page)
    await loginpage.navigation()
    await loginpage.Login(username, password)
}

export async function PerformAddToCart(page:Page,notes: string, email: string, Fname: string, Lname: string ) {
     home = new Home(page)
    await home.addToCart(notes,email,Fname,Lname)
}
