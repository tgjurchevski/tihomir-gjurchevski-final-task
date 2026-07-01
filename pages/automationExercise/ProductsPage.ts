import { Page, Locator, expect } from '@playwright/test';
import { BaseShopPage } from './BaseShopPage';

export class ProductsPage extends BaseShopPage {
    readonly allProductsHeading: Locator;
    readonly searchedProductsHeading: Locator;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly productCards: Locator;
    readonly productNames: Locator;
    readonly cartModal: Locator;
    readonly continueShoppingButton: Locator;
    readonly viewCartLink: Locator;

    constructor(page: Page) {
        super(page);
        this.allProductsHeading = page.getByRole('heading', { name: 'All Products' });
        this.searchedProductsHeading = page.getByRole('heading', { name: 'Searched Products' });
        this.searchInput = page.locator('#search_product');
        this.searchButton = page.locator('#submit_search');
        this.productCards = page.locator('.features_items .product-image-wrapper');
        this.productNames = this.productCards.locator('.productinfo p');
        this.cartModal = page.locator('#cartModal');
        this.continueShoppingButton = this.cartModal.getByRole('button', { name: 'Continue Shopping' });
        this.viewCartLink = this.cartModal.locator('a', { hasText: 'View Cart' });
    }

    async open(): Promise<void> {
        await this.page.goto('/products');
    }

    async searchFor(keyword: string): Promise<void> {
        await this.searchInput.fill(keyword);
        await this.searchButton.click();
    }

    async assertOnPage(): Promise<void> {
        await expect(this.allProductsHeading).toBeVisible();
    }

    async assertSearchResultsContain(keyword: string): Promise<void> {
        await expect(this.searchedProductsHeading).toBeVisible();
        const count = await this.productNames.count();
        expect(count).toBeGreaterThan(0);

        const lowerKeyword = keyword.toLowerCase();
        const names = await this.productNames.allTextContents();


        const mismatches = names.filter(
            (name) => !name.toLowerCase().includes(lowerKeyword)
        );


        for (const name of mismatches) {
            const card = this.productCards.filter({ hasText: name }).first();
            const detailLink = card.locator('a[href*="/product_details/"]').first();
            const href = await detailLink.getAttribute('href');

            const detailPage = await this.page.context().newPage();
            await detailPage.goto(href!);
            const productInfo = detailPage.locator('.product-information');
            await expect(productInfo).toContainText(new RegExp(keyword, 'i'));
            await detailPage.close();
        }
    }

    async openFirstProductDetails(): Promise<void> {
        await this.productCards.first().locator('a', { hasText: 'View Product' }).click();
        await this.page.waitForURL(/\/product_details\//);
    }
    async getProductName(index: number): Promise<string> {
        return (await this.productNames.nth(index).textContent())?.trim() ?? '';
    }

    async addProductToCart(index: number): Promise<void> {
        const card = this.productCards.nth(index);
        await card.hover(); // reveals the overlay Add-to-cart button
        await card.locator('.product-overlay .add-to-cart').click();
        await expect(this.cartModal).toBeVisible(); // task's named wait strategy for the modal
    }

    async continueShopping(): Promise<void> {
        await this.continueShoppingButton.click();
        await expect(this.cartModal).not.toBeVisible();
    }

    async viewCart(): Promise<void> {
        await this.viewCartLink.click();
        await this.page.waitForURL(/\/view_cart/);
    }
}