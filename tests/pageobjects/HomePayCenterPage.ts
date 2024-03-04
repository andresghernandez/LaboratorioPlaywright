import { Locator, Page, expect } from "@playwright/test";

export class HomePayCenterPage {

    private readonly serviceTextBox:Locator;
    private readonly searchButton:Locator;
    private readonly payButton:Locator;


    constructor(page: Page){
        this.serviceTextBox = page.frameLocator("//iframe[@id='iframe-buscador']").locator("//input[@id='search']")
        this.searchButton = page.frameLocator("//iframe[@id='iframe-buscador']").locator("//div[@class='search__button']/img")
        this.payButton =  page.frameLocator("//iframe[@id='iframe-buscador']").locator("//div[1]/div/a/p[contains(text(), 'Pagar')]")
    }

    async openPage(page: Page, url:string){
        await page.goto(url)
    }

    async searchService(page: Page, service:string){
        await this.serviceTextBox.fill(service);
        await page.waitForTimeout(3000)
        await this.searchButton.click();
        await page.screenshot({ path: 'Screenshots/screenshot0.png', fullPage: true });
        await this.payButton.click();
    }

    


}

