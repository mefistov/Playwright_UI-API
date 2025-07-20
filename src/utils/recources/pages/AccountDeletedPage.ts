import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "./BasePage";

export class AccountDeletedPage extends BasePage{
    readonly successMessage: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        super(page);

        this.successMessage = page.locator('h2[data-qa="account-deleted"]');
        this.continueButton = page.locator('a[data-qa="continue-button"]');
    }

    async assertMessageAndClickContinue(){
        await this.assertSuccessMessageIsVisible();
        await this.clickElement(this.continueButton);
    }

    async assertSuccessMessageIsVisible(): Promise<void> {
        await expect.soft(this.successMessage).toBeVisible();
        await expect.soft(this.successMessage).toHaveText('Account Deleted!');
    }

}