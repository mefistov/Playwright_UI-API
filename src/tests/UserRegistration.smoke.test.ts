import { test } from '../utils/fixtures/BaseFixtures'
import {GenerateSignUpTestData} from "../utils/GenerateSignUpTestData";
import {expect} from "@playwright/test";

test.describe('UI user registration tests', async () => {

    let testData: GenerateSignUpTestData;

    test.beforeEach(async ({homePage, signInLoginPage, enterAccountInformationPage, accountCreatedPage}) => {
        testData = new GenerateSignUpTestData();
        await homePage.navigateToLoginPage();

        await signInLoginPage.signUp(testData.firstName, testData.email);

        await enterAccountInformationPage.fillAccountInformationAndReturn(testData);

        await accountCreatedPage.assertMessageAndClickContinue();
    });

    test('Register user varify account create and delete it', async({homePage, accountDeletedPage}) => {

        await homePage.assertUserLoggedInAndDeleteAccount(testData);

        await accountDeletedPage.assertMessageAndClickContinue();
    });

    test('Login User with correct email and password', async({homePage, signInLoginPage,  accountDeletedPage}) => {

        await homePage.logoutUser();

        await signInLoginPage.logIn(testData);

        await homePage.assertUserLoggedInAndDeleteAccount(testData);

        await accountDeletedPage.assertMessageAndClickContinue();
    });

    test('Login User with incorrect email', async({homePage, signInLoginPage}) => {

        await homePage.logoutUser();

        testData.email = testData.email.replace(testData.firstName.toLowerCase(), 'invalidName');

        await signInLoginPage.logIn(testData);

        expect.soft(await signInLoginPage.invalidEmailOrPassword.isVisible()).toBe(true);
    });

    test('Login User with incorrect password', async({homePage, signInLoginPage}) => {

        await homePage.logoutUser();

        testData.password = testData.password.replace(testData.password, 'invalidPassword');

        await signInLoginPage.logIn(testData);

        expect.soft(await signInLoginPage.invalidEmailOrPassword.isVisible()).toBe(true);
    });
});