import { Locator, Page, test } from '@playwright/test'
import { BasePage } from '../Basepage';
import { faker, Faker } from '@faker-js/faker';

export class Catalog extends BasePage {
    private catalogNav: Locator
    private prodSel: Locator

    constructor(page: Page) {
        super(page)
        this.catalogNav = page.getByText('Catalog')
        this.prodSel = page.locator('//img[@class="product"]')
    }
    async CatItemNav(): Promise<void> {
        await this.clickElement(this.catalogNav, 'Catalog')
        const prodCount = await this.prodSel.count()
        await this.clickElement(this.prodSel.nth(faker.number.int({min:0,max:prodCount-1})), 'SelectItem')
    }
}