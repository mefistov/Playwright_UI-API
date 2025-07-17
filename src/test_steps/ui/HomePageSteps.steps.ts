import {HomePage} from "../../utils/recources/pages/HomePage";
import {expect, Page} from "@playwright/test";
import {SignInLoginPage} from "../../utils/recources/pages/SignInLoginPage";
import {EnterAccountInformationPage} from "../../utils/recources/pages/EnterAccountInformationPage";
import {GenerateSignUpTestData} from "../../utils/GenerateSignUpTestData";
import {AccountCreatedPage} from "../../utils/recources/pages/AccountCreatedPage";
import { AccountDeletedPage } from "../../utils/recources/pages/AccountDeletedPage";
import {ContactUsPage} from "../../utils/recources/pages/ContactUsPage";
import {TestCasesPage} from "../../utils/recources/pages/TestCasesPage";

export class UISteps {
    readonly page: Page;
    private homePage: HomePage;
    private signInLoginPage: SignInLoginPage;
    private enterAccountInformationPage: EnterAccountInformationPage;
    private accountCreatedPage: AccountCreatedPage;
    private accountDeletedPage: AccountDeletedPage;
    private contactUsPage: ContactUsPage;
    private testCasesPage: TestCasesPage;

    constructor(page: Page) {
        this.page = page;
        this.homePage = new HomePage(this.page);
        this.signInLoginPage = new SignInLoginPage(this.page);
        this.enterAccountInformationPage = new EnterAccountInformationPage(this.page);
        this.accountCreatedPage = new AccountCreatedPage(this.page);
        this.accountDeletedPage = new AccountDeletedPage(this.page);
        this.contactUsPage = new ContactUsPage(this.page);
        this.testCasesPage = new TestCasesPage(this.page);
    }

    async navigateAndConsent(){
        await this.homePage.goto();
        await this.homePage.consent();
    }

    async assertNavigationBar(){
        await this.homePage.assertNavBar();
    }

    async userRegistration(data: GenerateSignUpTestData){
        await this.singUpUser(data);
        await this.enterAccountInformationPage.assertNameEmailMathcing(data.firstName, data.email);
        await this.enterAccountInformationPage.fillAccountInformation(data);
        await this.accountCreatedPage.assertMessageAndClickContinue();
    }

    async signUpUserWithIncorectdata(data: GenerateSignUpTestData){
        await this.singUpUser(data);
        expect.soft(await this.signInLoginPage.emailExistsAllert.isVisible()).toBe(true);
    }

    async singUpUser(data: GenerateSignUpTestData){
        await this.homePage.clickSignInLoginButton();
        await this.signInLoginPage.signUp(data.firstName, data.email);
    }

    async assertSignedUpUserAndDelete(data: GenerateSignUpTestData){
        await this.homePage.assertUserLoggedInAndDeleteAccount(data);
        await this.accountDeletedPage.assertMessageAndClickContinue()
    }

    async navigateAndSignUpUser(data: GenerateSignUpTestData){
        await this.navigateAndConsent();
        await this.userRegistration(data);
    }

    async logoutUser(){
        await this.homePage.logoutUser();

    }

    async assertUserLoginAndDelete(data: GenerateSignUpTestData) {
        await this.signInLoginPage.logIn(data);
        await this.homePage.assertUserLoggedInAndDeleteAccount(data);
        await this.accountDeletedPage.assertMessageAndClickContinue()
    }

    async assertUserLoggedInWithIncorrectData(data: GenerateSignUpTestData){
        await this.signInLoginPage.logIn(data);
        expect.soft(await this.signInLoginPage.invalidEmailOrPassword.isVisible()).toBe(true);
    }

    async navigateToContactFormAndFillIt(data: GenerateSignUpTestData, subject: string, message: string){
        await this.homePage.navigateToContactUsPage();
        await this.contactUsPage.fillContactUsFormAndReturnToHomePage(data, subject, message);
        await this.contactUsPage.submitBrowserDialog();
        await this.contactUsPage.submitFormAndReturnToHomePage();
    }

    async navigateAndAsserToTestCasesPage(){
        await this.homePage.navigateToTestCasesPage();
        await this.testCasesPage.assertOnTestCasesPage()
    }
}