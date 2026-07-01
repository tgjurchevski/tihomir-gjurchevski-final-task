import { Page, Locator, expect } from '@playwright/test';
import { BaseShopPage } from './BaseShopPage';

export class SignupLoginPage extends BaseShopPage {
    readonly newUserSignupHeading: Locator;
    readonly signupNameInput: Locator;
    readonly signupEmailInput: Locator;
    readonly signupButton: Locator;

    constructor(page: Page) {
        super(page);
        this.newUserSignupHeading = page.getByRole('heading', { name: 'New User Signup!' });
        this.signupNameInput = page.locator('[data-qa="signup-name"]');
        this.signupEmailInput = page.locator('[data-qa="signup-email"]');
        this.signupButton = page.locator('[data-qa="signup-button"]');
    }

    async open(): Promise<void> {
        await this.page.goto('/login');
    }

    async signup(name: string, email: string): Promise<void> {
        await expect(this.newUserSignupHeading).toBeVisible();
        await this.signupNameInput.fill(name);
        await this.signupEmailInput.fill(email);
        await this.signupButton.click();
    }
}