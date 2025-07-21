import { test } from '../utils/fixtures/BaseFixtures'
import {GenerateSignUpTestData} from "../utils/GenerateSignUpTestData";
import {expect} from "@playwright/test";

test.describe('Navigation to application pages', async () => {

    let testData: GenerateSignUpTestData;

    test.beforeEach(async () => {
        testData = new GenerateSignUpTestData();
    });

    test('Login consent check navigation bar test', async({homePage}) => {
        await homePage.navigateAndConsent();
        await homePage.assertNavBar();
    });

    test('Navigate to Test Cases page', async({homePage, testCasesPage}) => {
        await homePage.navigateToTestCasesPage();

        await testCasesPage.assertOnTestCasesPage();
    });

    test('Navigate to Products page loaded and have product cards ', async({homePage, productsPage}) => {
        await homePage.navigateToProductsPage();

        await productsPage.assertOnProductsPage();
    });

    test('Contact Us Form test', async({homePage, contactUsPage}) => {
        const subject: string = 'Complain'
        const message: string = 'Complain message.';

        await homePage.navigateToContactUsPage();

        await contactUsPage.fillAndSubmitForm(testData, subject, message);
    });

    test('SignUp user with existing email', async({homePage, signInLoginPage}) => {
        testData.email = process.env.EXISTING_EMAIL;

        await homePage.navigateToLoginPage();

        await signInLoginPage.signUp(testData.firstName, testData.email);

        expect.soft(await signInLoginPage.emailExistsAlert.isVisible()).toBe(true);
    });
})