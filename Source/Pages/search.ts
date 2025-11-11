import { Locator, Page, test } from '@playwright/test'
import { BasePage } from '../Basepage'

export class search extends BasePage {
    private searchNav: Locator
    private ItemCount: Locator

    constructor(page: Page) {
        super(page)
        this.searchNav = page.getByPlaceholder('Search')
        this.ItemCount = page.locator('[class="animated fadeInUpBig"]')
    }

    async SerachFunctionality(item: string) {
        await this.fillElement(this.searchNav, item, 'Search')
        await this.page.keyboard.press('Enter')
        await this.page.waitForTimeout(1000)
        const cnt = await this.ItemCount.count()
        if (cnt > 0) {
            console.log(cnt)
        } else {
            console.log('No results Found')
        }
    }
}