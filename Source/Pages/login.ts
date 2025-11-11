import { expect, Locator, Page, test } from '@playwright/test'
import { BasePage } from '../Basepage';
import dotenv, { config } from 'dotenv'

dotenv.config()

export class Login extends BasePage {
    private username: Locator
    private password: Locator
    private loginBtn: Locator
    private loginNav: Locator

    constructor(page: Page) {
        super(page)
        this.username = page.getByRole('textbox', { name: 'Email Address' })
        this.password = page.getByRole('textbox', { name: 'Password' })
        this.loginBtn = page.getByRole('button', { name: 'Sign In' })
        this, this.loginNav = page.locator('#customer_login_link').first()
    }

    async navigation(): Promise<void> {
        await this.page.goto('.')
        await this.clickElement(this.loginNav, 'Login')
    }
    async Login(username: string, password: string): Promise<void> {
        await this.fillElement(this.username, username, 'username')
        await this.fillElement(this.password, password, 'password')
        await this.clickElement(this.loginBtn, 'login')
    }
}