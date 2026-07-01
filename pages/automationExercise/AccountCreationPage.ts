import { Page, Locator, expect } from '@playwright/test';
import { BaseShopPage } from './BaseShopPage';
import { ShopUser } from '../../utils/generateUser';

export class AccountCreationPage extends BaseShopPage {
    readonly accountInfoHeading: Locator;
    readonly titleMrRadio: Locator;
    readonly titleMrsRadio: Locator;
    readonly passwordInput: Locator;
    readonly daysDropdown: Locator;
    readonly monthsDropdown: Locator;
    readonly yearsDropdown: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly companyInput: Locator;
    readonly addressInput: Locator;
    readonly countryDropdown: Locator;
    readonly stateInput: Locator;
    readonly cityInput: Locator;
    readonly zipcodeInput: Locator;
    readonly mobileNumberInput: Locator;
    readonly createAccountButton: Locator;
    readonly accountCreatedHeading: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        super(page);
        this.accountInfoHeading = page.getByRole('heading', { name: 'Enter Account Information' });
        this.titleMrRadio = page.locator('#id_gender1');
        this.titleMrsRadio = page.locator('#id_gender2');
        this.passwordInput = page.locator('[data-qa="password"]');
        this.daysDropdown = page.locator('[data-qa="days"]');
        this.monthsDropdown = page.locator('[data-qa="months"]');
        this.yearsDropdown = page.locator('[data-qa="years"]');
        this.firstNameInput = page.locator('[data-qa="first_name"]');
        this.lastNameInput = page.locator('[data-qa="last_name"]');
        this.companyInput = page.locator('[data-qa="company"]');
        this.addressInput = page.locator('[data-qa="address"]');
        this.countryDropdown = page.locator('[data-qa="country"]');
        this.stateInput = page.locator('[data-qa="state"]');
        this.cityInput = page.locator('[data-qa="city"]');
        this.zipcodeInput = page.locator('[data-qa="zipcode"]');
        this.mobileNumberInput = page.locator('[data-qa="mobile_number"]');
        this.createAccountButton = page.locator('[data-qa="create-account"]');
        this.accountCreatedHeading = page.locator('[data-qa="account-created"]');
        this.continueButton = page.locator('[data-qa="continue-button"]');
    }

    async fillAccountForm(user: ShopUser): Promise<void> {
        await expect(this.accountInfoHeading).toBeVisible();

        if (user.title === 'Mr') {
            await this.titleMrRadio.check();
        } else {
            await this.titleMrsRadio.check();
        }

        await this.passwordInput.fill(user.password);
        await this.daysDropdown.selectOption(user.birthDay);
        await this.monthsDropdown.selectOption(user.birthMonth);
        await this.yearsDropdown.selectOption(user.birthYear);
        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.companyInput.fill(user.company);
        await this.addressInput.fill(user.address);
        await this.countryDropdown.selectOption(user.country);
        await this.stateInput.fill(user.state);
        await this.cityInput.fill(user.city);
        await this.zipcodeInput.fill(user.zipcode);
        await this.mobileNumberInput.fill(user.mobileNumber);
    }

    async submitAndContinue(): Promise<void> {
        await this.createAccountButton.click();
        await expect(this.accountCreatedHeading).toBeVisible(); // "Account Created!"
        await this.continueButton.click();
        await this.page.waitForURL('/'); // redirect after login — task's named wait strategy
    }
}