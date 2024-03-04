import { Locator, Page, expect } from "@playwright/test";

export class PayPage {

    private readonly codeTextBox:Locator
    private readonly confirmCodeTextBox:Locator
    private readonly valueTextBox:Locator
    private readonly detailTextBox:Locator
    private readonly continueButton:Locator
    private readonly acceptTermsCheckbox:Locator
    private readonly payButton:Locator

    constructor(page: Page){
        this.codeTextBox = page.frameLocator("//iframe[@id='iframe-facturador' or @id='iframe-nofacturador']").locator("//div[@class='billers__body-form'][1]//apc-input/input")
        this.confirmCodeTextBox = page.frameLocator("//iframe[@id='iframe-facturador' or @id='iframe-nofacturador']").locator("//apc-input/input[contains(@id, 'onfirmar')]")
        this.valueTextBox = page.frameLocator("//iframe[@id='iframe-facturador' or @id='iframe-nofacturador']").locator("//apc-input/input[contains(@id, 'valor')]")
        this.detailTextBox = page.frameLocator("//iframe[@id='iframe-facturador' or @id='iframe-nofacturador']").locator("//textarea[contains(@id, 'detalle')]")
        this.continueButton =  page.frameLocator("//iframe[@id='iframe-facturador' or @id='iframe-nofacturador']").getByText("Continuar")
        this.acceptTermsCheckbox = page.frameLocator("//iframe[@id='iframe-facturador' or @id='iframe-nofacturador']").locator("//div[@class='checkbox__container']")
        this.payButton =  page.frameLocator("//iframe[@id='iframe-facturador' or @id='iframe-nofacturador']").locator("//button/p[text()=' Pagar ']")
    }

    async paymentDetails(page: Page, code:string, codeConfirm:string, value:string, detail:string){
        await page.waitForTimeout(2000)
        await this.codeTextBox.fill(code);
        await this.confirmCodeTextBox.fill(codeConfirm);
        const valueTextBoxVisible = await this.valueTextBox.isVisible();
        if (valueTextBoxVisible) {
            await this.valueTextBox.fill(value);
        }
        await this.detailTextBox.fill(detail);
        await page.screenshot({ path: 'Screenshots/screenshot1.png', fullPage: true });
        await this.continueButton.click();
        await page.waitForTimeout(3000)
    }

    async acceptTerms(page:Page){
        await this.acceptTermsCheckbox.click()
        await page.screenshot({ path: 'Screenshots/screenshot2.png', fullPage: true });
        await this.payButton.click();
        await page.waitForTimeout(5000)
    }


}


