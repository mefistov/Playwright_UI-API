import { test as baseTest, Page, expect } from '@playwright/test';
import {AccountCreatedPage} from "../recources/pages/AccountCreatedPage";
import {EnterAccountInformationPage} from "../recources/pages/EnterAccountInformationPage";
import {HomePage} from "../recources/pages/HomePage";
import {SignInLoginPage} from "../recources/pages/SignInLoginPage";
import {ContactUsPage} from "../recources/pages/ContactUsPage";
import {ProductDetailsPage} from "../recources/pages/ProductDetailsPage";
import {ProductsPage} from "../recources/pages/ProductsPage";
import {AccountDeletedPage} from "../recources/pages/AccountDeletedPage";
import {TestCasesPage} from "../recources/pages/TestCasesPage";


type Fixture = {
    homePage: HomePage;
    signInLoginPage: SignInLoginPage;
    contactUsPage: ContactUsPage;
    productDetailsPage: ProductDetailsPage;
    productsPage: ProductsPage;
    accountCreatedPage: AccountCreatedPage;
    accountDeletedPage: AccountDeletedPage;
    enterAccountInformationPage: EnterAccountInformationPage;
    testCasesPage: TestCasesPage;
};

function createFixture<T>(PageObject: new (page: Page) => T) {
    return async (
        { page }: { page: Page },
        use: (pageObject: T) => Promise<void>
    ) => {
        await use(new PageObject(page));
    };
}

const test = baseTest.extend<Fixture>({
    homePage: createFixture(HomePage),
    signInLoginPage: createFixture(SignInLoginPage),
    contactUsPage: createFixture(ContactUsPage),
    productDetailsPage: createFixture(ProductDetailsPage),
    productsPage: createFixture(ProductsPage),
    accountCreatedPage: createFixture(AccountCreatedPage),
    accountDeletedPage: createFixture(AccountDeletedPage),
    enterAccountInformationPage: createFixture(EnterAccountInformationPage),
    testCasesPage: createFixture(TestCasesPage),
});

export { test, expect };