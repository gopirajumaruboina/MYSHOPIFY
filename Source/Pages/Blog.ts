import { Locator, Page, test } from '@playwright/test'
import { BasePage } from '../Basepage'

export class Blog extends BasePage {
    private blogNav: Locator
    private blogMsg: Locator

    constructor(page: Page) {
        super(page)
        this.blogNav = page.getByText('Blog')
        this.blogMsg = page.locator('[class="ten columns content omega clearfix"]')
    }

    async BlogNav() {
        await this.clickElement(this.blogNav, 'Blog')
    }
    async BlogMsg() {
        return  await this.blogMsg.textContent();
    }
}