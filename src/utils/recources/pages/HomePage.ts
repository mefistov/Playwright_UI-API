import {type Page, type Locator, expect} from '@playwright/test';
import {GenerateSignUpTestData} from "../../GenerateSignUpTestData";
import {BasePage} from "./BasePage";

export class HomePage extends BasePage{
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
        super(page);
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
        this.contactUsButton = page.getByRole('link', {name: ' Contact us'});
    }

    async consent() {
        expect.soft(this.consentDialog).toBeVisible();
        expect.soft(this.consentDialogButton).toBeVisible();
        await this.consentDialogButton.click();
        expect.soft(this.consentDialog).not.toBeVisible();
    }

    async navigateAndConsent(){
        await this.navigate(this.baseUrl);
        await this.consent();
    }

    async assertNavBar() {
        expect.soft(this.homeButton).toBeVisible();
        expect.soft(this.productsButton).toBeVisible();
        expect.soft(this.cartButton).toBeVisible();
        expect.soft(this.signupLoginButton).toBeVisible();
        expect.soft(this.testCasesButton).toBeVisible();
        expect.soft(this.apiTestingsButton).toBeVisible();
    }

    async assertUserLoggedInAndDeleteAccount(data: GenerateSignUpTestData) {
        expect(await this.loggedAsUserName.textContent()).toEqual(data.firstName);
        await this.clickElement(this.deleteAccountButton);

    }

    async logoutUser() {
        await this.clickElement(this.logOut);
    }

    async navigateToContactUsPage() {
        await this.navigateAndConsent();
        await this.clickElement(this.contactUsButton);
    }

    async navigateToTestCasesPage() {
        await this.navigateAndConsent();
        await this.clickElement(this.testCasesButton);
    }

    async navigateToProductsPage() {
        await this.navigateAndConsent();
        await this.clickElement(this.productsButton);
    }

    async navigateToLoginPage() {
        await this.navigateAndConsent();
        await this.clickElement(this.signupLoginButton);
    }
}