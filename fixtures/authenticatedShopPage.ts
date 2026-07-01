import { test as base, expect, Page } from '@playwright/test';
import { generateUser, ShopUser } from '../utils/generateUser';
import { ShopApiClient } from '../utils/shopApiClient';
import { ShopHomePage } from '../pages/automationExercise/ShopHomePage';
import { SignupLoginPage } from '../pages/automationExercise/SignupLoginPage';
import { AccountCreationPage } from '../pages/automationExercise/AccountCreationPage';

interface AuthenticatedFixtures {
    authenticatedShopPage: Page;
    shopUser: ShopUser;
}

export const test = base.extend<AuthenticatedFixtures>({
    shopUser: async ({ }, use) => {
        await use(generateUser());
    },

    authenticatedShopPage: async ({ page, shopUser, request }, use) => {
        // ── Setup: register the user via the UI (full signup form) ──
        const homePage = new ShopHomePage(page);
        const signupLoginPage = new SignupLoginPage(page);
        const accountCreationPage = new AccountCreationPage(page);

        await homePage.open();
        await homePage.signupLoginLink.click();
        await signupLoginPage.signup(shopUser.name, shopUser.email);
        await accountCreationPage.fillAccountForm(shopUser);
        await accountCreationPage.submitAndContinue();
        await homePage.assertLoggedInAs(shopUser.name);

        // ── Hand the authenticated page to the test ──
        await use(page);

        // ── Teardown (runs after each test using this fixture):
        //    delete the account via DELETE /api/deleteAccount ──
        const api = new ShopApiClient(request);
        await api.deleteAccount(shopUser.email, shopUser.password);
    },
});

export { expect };