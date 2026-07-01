import { Page, Locator } from '@playwright/test';
import { BaseShopPage } from './BaseShopPage';

export class PaymentPage extends BaseShopPage {
    readonly nameOnCardInput: Locator;
    readonly cardNumberInput: Locator;
    readonly cvcInput: Locator;
    readonly expiryMonthInput: Locator;
    readonly expiryYearInput: Locator;
    readonly payAndConfirmButton: Locator;

    constructor(page: Page) {
        super(page);
        this.nameOnCardInput = page.locator('[data-qa="name-on-card"]');
        this.cardNumberInput = page.locator('[data-qa="card-number"]');
        this.cvcInput = page.locator('[data-qa="cvc"]');
        this.expiryMonthInput = page.locator('[data-qa="expiry-month"]');
        this.expiryYearInput = page.locator('[data-qa="expiry-year"]');
        this.payAndConfirmButton = page.locator('[data-qa="pay-button"]');
    }

    async payWithCard(nameOnCard: string): Promise<void> {
        await this.nameOnCardInput.fill(nameOnCard);
        await this.cardNumberInput.fill('4111111111111111'); // standard test card number
        await this.cvcInput.fill('123');
        await this.expiryMonthInput.fill('12');
        await this.expiryYearInput.fill('2030');
        await this.payAndConfirmButton.click();
        await this.page.waitForURL(/\/payment_done\//);
    }
}