import { Page, Locator, expect } from '@playwright/test';

export class BaseShopPage {
    readonly page: Page;
    readonly navbar: Locator;
    readonly signupLoginLink: Locator;
    readonly loggedInAs: Locator;
    readonly productsLink: Locator;
    readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navbar = page.locator('.navbar-nav');
        this.signupLoginLink = this.navbar.getByRole('link', { name: 'Signup / Login' });
        this.productsLink = this.navbar.getByRole('link', { name: 'Products' });
        this.cartLink = this.navbar.getByRole('link', { name: 'Cart' });
        this.loggedInAs = this.navbar.locator('a', { hasText: 'Logged in as' });
    }

    async assertLoggedInAs(username: string): Promise<void> {
        await expect(this.loggedInAs).toContainText(`Logged in as ${username}`);
    }
}