import {type Page, type Locator, expect} from '@playwright/test';
import {SignInLoginPage} from "./SignInLoginPage";
import {GenerateSignUpTestData} from "../../GenerateSignUpTestData";
import {AccountDeletedPage} from "./AccountDeletedPage";
import {ContactUsPage} from "./ContactUsPage";
import {TestCasesPage} from "./TestCasesPage";

export class HomePage {
    readonly page: Page;

    readonly baseUrl: string;

    readonly consentDialog: Locator;
    readonly consentDialogButton: Locator;

    readonly homeButton: Locator;
    readonly productsButton: Locator;
    readonly cartButton: Locator;
    readonly signupLoginButton: Locator;
    readonly testCasesButton: Locator;
    readonly apiTestingsButton: Locator;
    readonly loggedAs: Locator;
    readonly loggedAsUserName: Locator;
    readonly deleteAccountButton: Locator;
    readonly logOut: Locator;
    readonly contactUsButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.baseUrl = process.env.BASE_URL;
        this.consentDialog = page.locator('div[role="dialog"][aria-label="This site asks for consent to use your data"]');
        this.consentDialogButton = page.getByRole('button', { name: 'Consent' });

        this.homeButton = page.getByRole('link', {name: ' Home'});
        this.productsButton = page.getByRole('link', {name: ' Products'});
        this.cartButton = page.getByRole('link', {name: ' Cart'});
        this.signupLoginButton = page.getByRole('link', {name: ' Signup / Login'});
        this.testCasesButton  =page.getByRole('link', { name: ' Test Cases' });
        this.apiTestingsButton = page.getByRole('link', {name: ' API Testing'});
        this.loggedAs = page.getByText('Logged in as');
        this.loggedAsUserName = this.loggedAs.locator('b');
        this.deleteAccountButton = page.getByRole('link', {name: ' Delete Account'});
        this.logOut = page.getByRole('link', {name: ' Logout'});
        this.contactUsButton = page.getByRole('link', {name: ' Contact us'});
    }

    async goto() {
        await this.page.goto(this.baseUrl);
    }

    async consent() {
        expect.soft(this.consentDialog).toBeVisible();
        expect.soft(this.consentDialogButton).toBeVisible();
        await this.consentDialogButton.click();
        expect.soft(this.consentDialog).not.toBeVisible();
    }

    async assertNavBar() {
        expect.soft(this.homeButton).toBeVisible();
        expect.soft(this.productsButton).toBeVisible();
        expect.soft(this.cartButton).toBeVisible();
        expect.soft(this.signupLoginButton).toBeVisible();
        expect.soft(this.testCasesButton).toBeVisible();
        expect.soft(this.apiTestingsButton).toBeVisible();
    }

    async clickSignInLoginButton() {
        await this.signupLoginButton.click();
        return new SignInLoginPage(this.page);
    }

    async assertUserLoggedInAndDeleteAccount(data: GenerateSignUpTestData): Promise<AccountDeletedPage> {
        expect(await this.loggedAsUserName.textContent()).toEqual(data.firstName);
        await this.deleteAccountButton.click();

        return new AccountDeletedPage(this.page);
    }

    async logoutUser() {
        await this.logOut.click();

        return new SignInLoginPage(this.page);
    }

    async navigateToContactUsPage() {
        await this.contactUsButton.click();

        return new ContactUsPage(this.page);
    }

    async navigateToTestCasesPage() {
        await this.testCasesButton.click();

        return new TestCasesPage(this.page);
    }
}