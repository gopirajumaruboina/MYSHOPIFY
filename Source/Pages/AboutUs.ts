import { Locator, Page, test } from '@playwright/test'
import { BasePage } from '../Basepage'

export class About extends BasePage {
    private aboutNav: Locator
    private aboutMsg: Locator

    constructor(page: Page) {
        super(page)
        this.aboutNav = page.getByText('About Us')
        this.aboutMsg = page.locator('[class="twelve columns offset-by-one"]')
    }

    async AboutNav() {
        await this.clickElement(this.aboutNav.first(), 'About')
    }
    async AboutMsg() {
        return  await this.aboutMsg.textContent();
    }
}