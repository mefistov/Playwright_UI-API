import { test } from '../utils/fixtures/BaseFixtures'
import {GenerateSignUpTestData} from "../utils/GenerateSignUpTestData";
import {expect} from "@playwright/test";

test.describe('Api & UI test steps', async () => {

    let testData: GenerateSignUpTestData;

    test.beforeEach(async () => {
        testData = new GenerateSignUpTestData();
    });

    test('Login consent check navigation bar test', async({homePage}) => {
        await homePage.navigateAndConsent();
        await homePage.assertNavBar();
    });

    test('Register user varify account create and delete it', async({homePage, signInLoginPage, enterAccountInformationPage, accountCreatedPage, accountDeletedPage}) => {
        await homePage.navigateAndConsent();
        await homePage.clickSignInLoginButton();

        await signInLoginPage.signUp(testData.firstName, testData.email);

        await enterAccountInformationPage.assertNameEmailMathcing(testData.firstName, testData.email);
        await enterAccountInformationPage.fillAccountInformation(testData);

        await accountCreatedPage.assertMessageAndClickContinue();

        await homePage.assertUserLoggedInAndDeleteAccount(testData);

        await accountDeletedPage.assertMessageAndClickContinue();
    });

    test('Login User with correct email and password', async({homePage, signInLoginPage, enterAccountInformationPage, accountCreatedPage, accountDeletedPage}) => {
        await homePage.navigateAndConsent();
        await homePage.clickSignInLoginButton();

        await signInLoginPage.signUp(testData.firstName, testData.email);

        await enterAccountInformationPage.assertNameEmailMathcing(testData.firstName, testData.email);
        await enterAccountInformationPage.fillAccountInformation(testData);

        await accountCreatedPage.assertMessageAndClickContinue();

        await homePage.logoutUser();

        await signInLoginPage.logIn(testData);

        await homePage.assertUserLoggedInAndDeleteAccount(testData);

        await accountDeletedPage.assertMessageAndClickContinue();
    });

    test('Login User with incorrect email', async({homePage, signInLoginPage, enterAccountInformationPage, accountCreatedPage}) => {
        await homePage.navigateAndConsent();
        await homePage.clickSignInLoginButton();

        await signInLoginPage.signUp(testData.firstName, testData.email);

        await enterAccountInformationPage.assertNameEmailMathcing(testData.firstName, testData.email);
        await enterAccountInformationPage.fillAccountInformation(testData);

        await accountCreatedPage.assertMessageAndClickContinue();

        await homePage.logoutUser();

        testData.email = testData.email.replace(testData.firstName.toLowerCase(), 'invalidName');

        await signInLoginPage.logIn(testData);


        expect.soft(await signInLoginPage.invalidEmailOrPassword.isVisible()).toBe(true);
    });

    test('Login User with incorrect password', async({homePage, signInLoginPage,  enterAccountInformationPage,accountCreatedPage}) => {
        await homePage.navigateAndConsent();
        await homePage.clickSignInLoginButton();

        await signInLoginPage.signUp(testData.firstName, testData.email);

        await enterAccountInformationPage.assertNameEmailMathcing(testData.firstName, testData.email);
        await enterAccountInformationPage.fillAccountInformation(testData);

        await accountCreatedPage.assertMessageAndClickContinue();

        await homePage.logoutUser();

        testData.password = testData.password.replace(testData.password, 'invalidPassword');

        await signInLoginPage.logIn(testData);

        expect.soft(await signInLoginPage.invalidEmailOrPassword.isVisible()).toBe(true);
    });

    test('SignUp user with existing email', async({homePage, signInLoginPage}) => {
        testData.email = process.env.EXISTING_EMAIL;

        await homePage.navigateAndConsent();
        await homePage.clickSignInLoginButton();

        await signInLoginPage.signUp(testData.firstName, testData.email);

        expect.soft(await signInLoginPage.emailExistsAllert.isVisible()).toBe(true);
    });

    test('Contact Us Form test', async({homePage, contactUsPage}) => {
        const subject: string = 'Complain'
        const message: string = 'Complain message.';

        await homePage.navigateAndConsent();
        await homePage.navigateToContactUsPage();

        await contactUsPage.fillContactUsFormAndReturnToHomePage(testData, subject, message);
        await contactUsPage.submitBrowserDialog();
        await contactUsPage.submitFormAndReturnToHomePage();
    });

    test('Navigate to Test Cases page', async({homePage, testCasesPage}) => {
        await homePage.navigateAndConsent();
        await homePage.navigateToTestCasesPage();

        await testCasesPage.assertOnTestCasesPage();
    });

    test('Navigate to Products page loaded and have product cards ', async({homePage, productsPage}) => {
        await homePage.navigateAndConsent();
        await homePage.navigateToProductsPage();

        await productsPage.assertOnProductsPage();
    });
});