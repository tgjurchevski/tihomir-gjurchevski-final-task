import { Page, Locator, expect } from '@playwright/test';
import { BaseShopPage } from './BaseShopPage';
import { ShopUser } from '../../utils/generateUser';

export class CheckoutPage extends BaseShopPage {
    readonly deliveryAddress: Locator;
    readonly placeOrderLink: Locator;

    constructor(page: Page) {
        super(page);
        this.deliveryAddress = page.locator('#address_delivery');
        this.placeOrderLink = page.locator('a', { hasText: 'Place Order' });
    }

    async assertDeliveryAddressMatches(user: ShopUser): Promise<void> {
        await expect(this.deliveryAddress).toBeVisible();
        await expect(this.deliveryAddress).toContainText(`${user.firstName} ${user.lastName}`);
        await expect(this.deliveryAddress).toContainText(user.address);
        await expect(this.deliveryAddress).toContainText(user.country);
        await expect(this.deliveryAddress).toContainText(user.mobileNumber);
    }

    async placeOrder(): Promise<void> {
        await this.placeOrderLink.click();
        await this.page.waitForURL(/\/payment/);
    }
}