import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "./BasePage";

export class TestCasesPage extends BasePage{

    readonly pageTitle: Locator;
    readonly testCasesContainer: Locator;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.locator('h2.title', { hasText: 'Test Cases' });
        this.testCasesContainer = page.locator('.panel-group');
    }

    async assertOnTestCasesPage(){
         await expect(this.page).toHaveURL(/.*test_cases/);
         await expect(this.pageTitle).toBeVisible();
        }
}