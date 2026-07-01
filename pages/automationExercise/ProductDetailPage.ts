import { Page, Locator, expect } from '@playwright/test';
import { BaseShopPage } from './BaseShopPage';

export class ProductDetailPage extends BaseShopPage {
    readonly productInfo: Locator;
    readonly productName: Locator;
    readonly category: Locator;
    readonly price: Locator;
    readonly availability: Locator;
    readonly condition: Locator;
    readonly brand: Locator;
    readonly addToCartButton: Locator;

    constructor(page: Page) {
        super(page);
        this.productInfo = page.locator('.product-information');
        this.productName = this.productInfo.locator('h2');
        this.category = this.productInfo.locator('p', { hasText: 'Category:' });
        this.price = this.productInfo.locator('span span', { hasText: 'Rs.' });
        this.availability = this.productInfo.locator('p', { hasText: 'Availability:' });
        this.condition = this.productInfo.locator('p', { hasText: 'Condition:' });
        this.brand = this.productInfo.locator('p', { hasText: 'Brand:' });
        this.addToCartButton = this.productInfo.locator('button', { hasText: 'Add to cart' });
    }

    private async assertFieldHasValue(field: Locator, label: string): Promise<void> {
        await expect(field).toBeVisible();
        const text = (await field.textContent())?.replace(label, '').trim();
        expect(text?.length).toBeGreaterThan(0);
    }

    async assertProductDetailsVisible(): Promise<void> {
        await expect(this.productName).toBeVisible();
        await expect((await this.productName.textContent())?.trim()).toBeTruthy();

        await this.assertFieldHasValue(this.category, 'Category:');
        await expect(this.price).toBeVisible();
        await this.assertFieldHasValue(this.availability, 'Availability:');
        await this.assertFieldHasValue(this.condition, 'Condition:');
        await this.assertFieldHasValue(this.brand, 'Brand:');

        await expect(this.addToCartButton).toBeVisible();
    }
}