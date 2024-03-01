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
        this.codeTextBox = page.frameLocator("//iframe[@id='iframe-facturador']").locator("//div[@class='billers__body-form'][1]//apc-input/input")
        this.confirmCodeTextBox = page.frameLocator("//iframe[@id='iframe-facturador']").locator("//apc-input/input[contains(@id, 'onfirmar')]")
        this.valueTextBox = page.frameLocator("//iframe[@id='iframe-facturador']").locator("//apc-input/input[contains(@id, 'valor')]")
        this.detailTextBox = page.frameLocator("//iframe[@id='iframe-facturador']").locator("//textarea[contains(@id, 'detalle')]")
        this.continueButton =  page.frameLocator("//iframe[@id='iframe-facturador']").getByText("Continuar")
        this.acceptTermsCheckbox = page.frameLocator("//iframe[@id='iframe-facturador']").locator("//div[@class='checkbox__container']")
        this.payButton =  page.frameLocator("//iframe[@id='iframe-facturador']").locator("//button/p[text()=' Pagar ']")
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
        await this.continueButton.click();
    }

    async acceptTerms(){
        await this.acceptTermsCheckbox.click()
        await this.payButton.click();
    }


}


