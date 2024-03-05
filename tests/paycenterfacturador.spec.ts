import { test, expect } from '@playwright/test';
import { HomePayCenterPage } from './pageobjects/HomePaycenterPage';
import { PayPage } from './pageobjects/PayPage';
import { PaymentDetailsPage } from './pageobjects/PaymentDetailsPage';
import { BankVillasPage } from './pageobjects/BankVillasPage';

test('pay center', async ({ page }) => {

    const homePayCenterPage = new HomePayCenterPage(page);
    const payPage = new PayPage(page);
    const paymentDetailsPage = new PaymentDetailsPage(page);
    const bankVillasPage = new BankVillasPage(page);
    
    await homePayCenterPage.openPage(page, "https://www.avalpaycenter.com/wps/portal/portal-de-pagos");

    await homePayCenterPage.searchService(page, "Vanti Sa Esp Gas Natural");

    await payPage.paymentDetails(page, "63941175", "63941175", "Asociacion 5", "6860", "pago recibo del servicio");

    await payPage.acceptTerms(page);

    await paymentDetailsPage.holderData(page, "Cedula de Ciudadania", "1234567890", "Pedro Fernandez", 
    "pruebapedrofernandez@gmail.com", "pruebapedrofernandez@gmail.com", "Colombia", "3280000000", "3280000000")

    await paymentDetailsPage.selectBank(page, "VILLAS");

    await bankVillasPage.loginVillas(page, "Cédula de Ciudadanía", "1234567890", "123456");
    
    await bankVillasPage.successfullLogin(page);

    //await page.pause();

});