import { Page, Locator, expect } from '@playwright/test';
import { BaseShopPage } from './BaseShopPage';

export class PaymentConfirmationPage extends BaseShopPage {
    readonly orderPlacedHeading: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.orderPlacedHeading = page.locator('[data-qa="order-placed"]');
        this.successMessage = page.locator('p', { hasText: 'Congratulations! Your order has been confirmed!' });
    }

    async assertOrderPlaced(): Promise<void> {
        await expect(this.orderPlacedHeading).toBeVisible();
        expect(this.page.url()).toContain('/payment_done/');

        // Order ID is the number at the end of /payment_done/<id>
        const orderId = this.page.url().split('/payment_done/')[1];
        expect(Number(orderId)).toBeGreaterThan(0);
        await expect(this.successMessage).toBeVisible();
    }
}