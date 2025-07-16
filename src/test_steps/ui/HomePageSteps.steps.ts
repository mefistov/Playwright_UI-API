import {HomePage} from "../../utils/recources/pages/HomePage";
import {Page} from "@playwright/test";

export class HomePageSteps {
    readonly page: Page;
    private homePage: HomePage;

    constructor(page: Page) {
        this.page = page;
        this.homePage = new HomePage(this.page);
    }

    async loginAndConsent(){
        await this.homePage.goto();
        await this.homePage.consent();
    }

    async assertNavigationBar(){
        await this.homePage.assertNavBar();
    }
}