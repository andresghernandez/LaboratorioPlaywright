import { Locator, Page, expect } from "@playwright/test";

export class PaymentDetailsPage {

    private readonly documentTypeSelect:Locator
    private readonly documentNumberTextBox:Locator
    private readonly nameTextBox:Locator
    private readonly emailTextBox:Locator
    private readonly confirmEmailTextBox:Locator
    private readonly countrySelect:Locator
    private readonly mobileTextBox:Locator
    private readonly confirmMobileTextBox:Locator
    private readonly bankRadioList:Locator
    private readonly payButton:Locator

    constructor(page: Page){
        this.documentTypeSelect = page.locator("//select[@name='documentTypeHolder']")
        this.documentNumberTextBox = page.locator("//input[@name='documentNumberHolder']")
        this.nameTextBox = page.locator("//input[@name='nameHolder']")
        this.emailTextBox = page.locator("//input[@name='emailHolder']")
        this.confirmEmailTextBox =  page.locator("//input[@name='emailConfirmationHolder']")
        this.countrySelect = page.locator("//select[@name='countryTypeHolder']")
        this.mobileTextBox = page.locator("//input[@name='movilHolder']")
        this.confirmMobileTextBox =  page.locator("//input[@name='movilConfirmationHolder']")
        this.bankRadioList = page.locator("//input[@name='AvalBanks']")
        this.payButton = page.getByText("Pagar")
    }

    async holderData(documentType:string, documentNumber:string, name:string, email:string, confirmEmail:string, country:string,
        mobile:string, confirmMobile:string){
        await this.documentTypeSelect.selectOption(documentType)
        await this.documentNumberTextBox.fill(documentNumber)
        await this.nameTextBox.fill(name)
        await this.emailTextBox.fill(email)
        await this.confirmEmailTextBox.fill(confirmEmail)
        await this.countrySelect.selectOption(country)
        await this.mobileTextBox.fill(mobile)
        await this.confirmMobileTextBox.fill(confirmMobile)
    }

    //VILLAS, BOGOTA, OCCIDENTE, POPULAR//ng-reflect-value
    async selectBank(page:Page, bank:string){

        const rows = await this.bankRadioList.all()
        console.log(rows.length);
        
        for (let element of await this.bankRadioList.all()){
            const value = await element.getAttribute("ng-reflect-value");
            console.log("value: "+value);

            if (value === bank){
                await element.click();
                break;
            }
        }
        await page.screenshot({ path: 'Screenshots/screenshot4.png', fullPage: true });
        await this.payButton.click();
    }



}