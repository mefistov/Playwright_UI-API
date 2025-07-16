import {HomePage} from "../../utils/recources/pages/HomePage";
import {expect, Page} from "@playwright/test";
import {SignInLoginPage} from "../../utils/recources/pages/SignInLoginPage";
import {EnterAccountInformationPage} from "../../utils/recources/pages/EnterAccountInformationPage";
import {GenerateSignUpTestData} from "../../utils/GenerateSignUpTestData";
import {AccountCreatedPage} from "../../utils/recources/pages/AccountCreatedPage";
import { AccountDeletedPage } from "../../utils/recources/pages/AccountDeletedPage";

export class UISteps {
    readonly page: Page;
    private homePage: HomePage;
    private signInLoginPage: SignInLoginPage;
    private enterAccountInformationPage: EnterAccountInformationPage;
    private accountCreatedPage: AccountCreatedPage;
    private accountDeletedPage: AccountDeletedPage;

    constructor(page: Page) {
        this.page = page;
        this.homePage = new HomePage(this.page);
        this.signInLoginPage = new SignInLoginPage(this.page);
        this.enterAccountInformationPage = new EnterAccountInformationPage(this.page);
        this.accountCreatedPage = new AccountCreatedPage(this.page);
        this.accountDeletedPage = new AccountDeletedPage(this.page);
    }

    async navigateAndConsent(){
        await this.homePage.goto();
        await this.homePage.consent();
    }

    async assertNavigationBar(){
        await this.homePage.assertNavBar();
    }

    async signUpUser(data: GenerateSignUpTestData){
        await this.homePage.clickSignInLoginButton();
        await this.signInLoginPage.signUp(data.firstName, data.email);
        await this.enterAccountInformationPage.assertNameEmailMathcing(data.firstName, data.email);
        await this.enterAccountInformationPage.fillAccountInformation(data);
        await this.accountCreatedPage.assertMessageAndClickContinue();
    }

    async assertSignedUpUserAndDelete(data: GenerateSignUpTestData){
        await this.homePage.assertUserLoggedInAndDeleteAccount(data);
        await this.accountDeletedPage.assertMessageAndClickContinue()
    }

    async navigateAndSignUpUser(data: GenerateSignUpTestData){
        await this.navigateAndConsent();
        await this.signUpUser(data);
    }

    async logoutUser(){
        await this.homePage.logoutUser();

    }

    async assertUserLoginAndDelete(data: GenerateSignUpTestData) {
        await this.signInLoginPage.logIn(data);
        await this.homePage.assertUserLoggedInAndDeleteAccount(data);
        await this.accountDeletedPage.assertMessageAndClickContinue()
    }

    async assertUserLogedInWithIncorrectData(data: GenerateSignUpTestData){
        await this.signInLoginPage.logIn(data);
        expect.soft(await this.signInLoginPage.invalidEmailOrPassword.isVisible()).toBe(true);
    }
}