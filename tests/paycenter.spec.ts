import { test, expect } from '@playwright/test';
import { HomePayCenterPage } from './pageobjects/HomePaycenterPage';
import { PayPage } from './pageobjects/PayPage';
import { PaymentDetailsPage } from './pageobjects/PaymentDetailsPage';

test('pay center', async ({ page }) => {

    const homePayCenterPage = new HomePayCenterPage(page);
    const payPage = new PayPage(page);
    const paymentDetailsPage = new PaymentDetailsPage(page);

    await homePayCenterPage.openPage(page, "https://www.avalpaycenter.com/wps/portal/portal-de-pagos");
    
    await homePayCenterPage.searchService(page, "Vanti Sa Esp Gas Natural");

    await payPage.paymentDetails(page, "63941186", "63941186", "6860", "pago recibo del servicio");

    await payPage.acceptTerms();

    await paymentDetailsPage.holderData("Cedula de Ciudadania", "1234567890", "Pedro Fernandez", 
    "pruebapedrofernandez@gmail.com", "pruebapedrofernandez@gmail.com", "Colombia", "3280000000", "3280000000")

    await paymentDetailsPage.selectBank("BOGOTA");

    await page.pause();

});