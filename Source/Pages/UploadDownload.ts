
import { Locator, Page, test } from '@playwright/test'

export class ULandDL {

    private page: Page
    private ULDDNav: Locator
    private ULBtn: Locator
    private DDBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.ULDDNav = page.getByText('Upload and Download')
        this.ULBtn = page.locator('#uploadFile')
        this.DDBtn = page.locator('#downloadButton')
    }

    async Navigation() {
        await this.page.goto('https://demoqa.com/upload-download')
    }
    async Upload() {
        await this.page.setInputFiles('#uploadFile',['sampleFile.jpeg'])
    }
    async Download() {

        const [download]= await Promise.all([
            this.page.waitForEvent('download'),
            this.DDBtn.click()
        ])
        const path = await download.suggestedFilename();
        await download.saveAs(path)
    }
}