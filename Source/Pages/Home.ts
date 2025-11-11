import { expect, Locator, Page, test } from '@playwright/test'
import { BasePage } from '../Basepage'
import { faker, th } from '@faker-js/faker'

export class Home extends BasePage {

    private homeNav: Locator
    private prodSel: Locator
    private addCart: Locator
    private PageHeader: Locator
    private Checkout: Locator
    private Quantity: Locator
    private Notes: Locator
    private enterEmail: Locator
    private Country: Locator
    private Fname: Locator
    private Lname: Locator
    private company: Locator
    private size: Locator
    private color: Locator
    private MyCart: Locator
    private Checkout2: Locator
    private soldOut: Locator

    constructor(page: Page) {
        super(page)
        this.homeNav = page.locator('#main-menu').getByRole('link', { name: 'Home' })
        this.prodSel = page.locator('//img[@class="product"]')
        this.addCart = page.getByRole('button', { name: 'Add to Cart' })
        this.PageHeader = page.getByRole('heading', { name: 'Just a demo site showing off' })
        this.Checkout = page.locator('//*[@class="checkout"]')
        this.Checkout2 = page.locator('#checkout')
        this.MyCart = page.locator('//*[@class="toggle-drawer cart desktop "]')
        this.Quantity = page.locator('//input[@name="updates[]"]')
        this.Notes = page.getByPlaceholder('Add a note to your order...')
        this.enterEmail = page.getByRole('textbox', { name: 'Email' })
        this.Country = page.locator('//select[@name="countryCode"]')
        this.Fname = page.getByPlaceholder('First name (optional)')
        this.Lname = page.getByPlaceholder('Last name')
        this.company = page.getByPlaceholder('Company (optional)')
        this.size = page.getByLabel('Size')
        this.color = page.getByLabel('Color')
        this.soldOut = page.getByText('Sold Out')
    }
    async SelectItem(): Promise<void> {
        await this.clickElement(this.homeNav, 'Home')
        const prodCount = await this.prodSel.count()
        await this.clickElement(this.prodSel.nth(faker.number.int({min:0,max:prodCount-1})), 'SelectItem')
    }

    async addToCart(notes: string, email: string, Fname: string, Lname: string) {
        const soldOut = this.soldOut
        if (await soldOut.count() > 0) {
            console.log('Sorry Item sold out')
        } else {
            const element1 = this.size
            const element2 = this.color
            if (await element1.count() > 0 || await element2.count() > 0) {
                const SizeOpts = await element1.locator('option').allInnerTexts()
                console.log(SizeOpts)
                const ColorOpts = await element2.locator('option').allInnerTexts()
                console.log(ColorOpts)
                await this.selectDropdownByText(element1, SizeOpts[faker.number.int({ min: 0, max: SizeOpts.length - 1 })], 'Size',)
                await this.selectDropdownByText(element2, ColorOpts[faker.number.int({ min: 0, max: ColorOpts.length - 1 })], 'Color')


            } else {
                console.log('Size and colors not found')
            }
            await this.clickElement(this.addCart, 'ADD to Cart')
            await this.clickElement(this.MyCart, 'My Cart')
            await this.page.waitForTimeout(3000)
            await this.clickElement(this.Checkout, 'Checkout')
            await this.page.waitForTimeout(2000)
            await this.fillElement(this.Quantity.nth(1), faker.number.int({ min: 1, max: 10 }).toString(), 'quantity')
            await this.fillElement(this.Notes, notes, 'enter notes')
            await this.clickElement(this.Checkout2, 'Checkout')
            await this.fillElement(this.enterEmail, email, 'enter email')
            await this.fillElement(this.Fname, Fname, 'enter Fname')
            await this.fillElement(this.Lname, Lname, 'enter Lname')
            const countSel = ['India', 'Sri Lanka']
            await this.selectDropdownByText(this.Country, countSel[faker.number.int({ min: 0, max: 1 })], 'country')
            await this.page.getByText('Sauce Demo').first().click()
        }
    }
}

