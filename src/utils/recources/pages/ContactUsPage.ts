import {Dialog, expect, Locator, Page} from "@playwright/test";
import {HomePage} from "./HomePage";
import {GenerateSignUpTestData} from "../../GenerateSignUpTestData";

export class ContactUsPage {
    readonly page: Page;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly subjectInput: Locator;
    readonly messageInput: Locator;
    readonly fileInput: Locator;
    readonly submitButton: Locator;
    readonly successMessage: Locator;
    readonly homeButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.getByRole('textbox', { name: 'Name' });
        this.emailInput = page.getByRole('textbox', { name: 'Email', exact: true });
        this.subjectInput = page.getByRole('textbox', { name: 'Subject' });
        this.messageInput = page.getByRole('textbox', { name: 'Your Message Here' });
        this.fileInput = page.getByRole('button', { name: 'Choose File' });
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.successMessage = page.locator('#contact-page').getByText('Success! Your details have');
        this.homeButton = page.getByRole('link', { name: ' Home' });
    }

    async submitBrowserDialog() {
        this.page.once('dialog', async (dialog: Dialog) => {
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept().catch(() => {});
            await expect(this.submitButton).toBeEnabled();
            await this.submitButton.click();
        })
    }

    async fillContactUsFormAndReturnToHomePage(data: GenerateSignUpTestData, subject: string, message: string, ){
        await this.nameInput.fill(data.firstName);
        await this.emailInput.fill(data.email);
        await this.subjectInput.fill(subject);
        await this.messageInput.fill(message);
    }

    async submitFormAndReturnToHomePage() {
        await this.submitBrowserDialog();
        await expect(this.successMessage).toBeVisible();
        await this.homeButton.click();

        return new HomePage(this.page);
    }
}