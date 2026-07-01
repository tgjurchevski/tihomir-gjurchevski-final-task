import { Page, Locator, expect } from '@playwright/test';
import { BaseShopPage } from './BaseShopPage';

export class CartPage extends BaseShopPage {
    readonly cartRows: Locator;
    readonly emptyCartMessage: Locator;
    readonly proceedToCheckoutButton: Locator;

    constructor(page: Page) {
        super(page);
        this.cartRows = page.locator('#cart_info_table tbody tr');
        this.emptyCartMessage = page.locator('#empty_cart', { hasText: 'Cart is empty!' });
        this.proceedToCheckoutButton = page.locator('.check_out', { hasText: 'Proceed To Checkout' });
    }

    async open(): Promise<void> {
        await this.page.goto('/view_cart');
    }

    rowByProductName(name: string): Locator {
        return this.cartRows.filter({ hasText: name });
    }

    async getRowData(row: Locator) {
        const name = (await row.locator('.cart_description a').textContent())?.trim() ?? '';
        const price = this.parseRs(await row.locator('.cart_price p').textContent());
        const quantity = Number((await row.locator('.cart_quantity button').textContent())?.trim());
        const total = this.parseRs(await row.locator('.cart_total .cart_total_price').textContent());
        return { name, price, quantity, total };
    }

    private parseRs(text: string | null): number {
        // "Rs. 500" -> 500
        return Number((text ?? '').replace(/[^\d]/g, ''));
    }

    async assertCartHasProducts(expectedNames: string[]): Promise<void> {
        await expect(this.cartRows).toHaveCount(expectedNames.length);

        let sumOfLineTotals = 0;
        for (const expectedName of expectedNames) {
            const row = this.rowByProductName(expectedName);
            await expect(row).toHaveCount(1);

            const data = await this.getRowData(row);
            expect(data.name).toBe(expectedName);
            expect(data.price).toBeGreaterThan(0);
            expect(data.quantity).toBe(1);
            expect(data.total).toBe(data.price * data.quantity);
            sumOfLineTotals += data.total;
        }
        expect(sumOfLineTotals).toBeGreaterThan(0);
    }

    async deleteProduct(name: string): Promise<void> {
        const row = this.rowByProductName(name);
        await row.locator('.cart_quantity_delete').click();
        // Wait strategy from the task: poll until the row is gone
        await expect(row).toHaveCount(0);
    }

    async assertCartIsEmpty(): Promise<void> {
        await expect(this.emptyCartMessage).toBeVisible();
    }
}