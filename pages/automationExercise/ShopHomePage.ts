import { Page, Locator, expect } from '@playwright/test';
import { BaseShopPage } from './BaseShopPage';

export class ShopHomePage extends BaseShopPage {
    readonly subscriptionHeading: Locator;
    readonly subscriptionEmailInput: Locator;
    readonly subscribeButton: Locator;
    readonly subscriptionSuccessAlert: Locator;

    constructor(page: Page) {
        super(page);
        this.subscriptionHeading = page.getByRole('heading', { name: 'Subscription' });
        this.subscriptionEmailInput = page.locator('#susbscribe_email'); // yes, the site misspells it
        this.subscribeButton = page.locator('#subscribe');
        this.subscriptionSuccessAlert = page.locator('.alert-success', { hasText: 'You have been successfully subscribed!' });
    }

    async open(): Promise<void> {
        await this.page.goto('/');
    }

    async subscribeToNewsletter(email: string): Promise<void> {
        await this.subscriptionHeading.scrollIntoViewIfNeeded();
        await this.subscriptionEmailInput.fill(email);
        await this.subscribeButton.click();
    }

    async assertSubscriptionSuccess(): Promise<void> {
        await expect(this.subscriptionSuccessAlert).toBeVisible();
        await expect(this.subscriptionEmailInput).toHaveValue('');
    }
}