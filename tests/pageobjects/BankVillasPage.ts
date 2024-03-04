import { Locator, Page, expect } from "@playwright/test";

export class BankVillasPage {

    private readonly documentTypeButton:Locator;
    private readonly documentTypeSelect:Locator;
    private readonly documentNumberTextbox:Locator;
    private readonly passwordTextbox:Locator;
    private readonly enterButton:Locator;
    private readonly messageError:Locator;

    constructor(page: Page){
        this.documentTypeButton = page.locator("//label[@for='user-type-document']")
        this.documentTypeSelect = page.locator("//ul[@class='dropdown-list']//span")
        this.documentNumberTextbox = page.getByRole('textbox', { name: 'Número de documento' })
        this.passwordTextbox = page.locator("//input[@id='user-password']")
        this.enterButton = page.getByRole('button', { name: 'INGRESAR' })
        this.messageError = page.locator("//p[contains(text(), 'Los datos que ingresaste no son v')]")
    }

    async loginVillas(page:Page, documentType:string, documentNumber:string, password:string){
        await this.documentTypeButton.click()

        for (let element of await this.documentTypeSelect.all()){
            const value = await element.innerText() 
            console.log("value: "+value);
            if (value === documentType){
                await element.click();
                break;
            }
        }
        await this.documentNumberTextbox.fill(documentNumber);
        await this.passwordTextbox.fill(password);
        await page.screenshot({ path: 'Screenshots/screenshot5.png', fullPage: true });
        await this.enterButton.click();
        await page.waitForTimeout(2000)
    }

    async successfullLogin(page:Page){
        await page.screenshot({ path: 'Screenshots/screenshot6.png', fullPage: true });
        await expect(this.messageError).not.toBeVisible();
    }

}