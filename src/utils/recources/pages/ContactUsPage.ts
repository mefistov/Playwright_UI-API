import {Dialog, expect, Locator, Page} from "@playwright/test";
import {GenerateSignUpTestData} from "../../GenerateSignUpTestData";
import {BasePage} from "./BasePage";

export class ContactUsPage extends BasePage{
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly subjectInput: Locator;
    readonly messageInput: Locator;
    readonly fileInput: Locator;
    readonly submitButton: Locator;
    readonly successMessage: Locator;
    readonly homeButton: Locator;


    constructor(page: Page) {
        super(page);
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
            await this.clickElement(this.submitButton);
        })
    }

    async fillContactUsFormAndReturnToHomePage(data: GenerateSignUpTestData, subject: string, message: string, ){
        await this.typeText(this.nameInput, data.firstName);
        await this.typeText(this.emailInput, data.email);
        await this.typeText(this.subjectInput, subject);
        await this.typeText(this.messageInput, message);
    }

    async submitFormAndReturnToHomePage() {
        await this.submitBrowserDialog();
        await expect(this.successMessage).toBeVisible();
        await this.clickElement(this.homeButton);
    }

    async fillAndSubmitForm(data: GenerateSignUpTestData, subject: string, message: string, ){
        await this.fillContactUsFormAndReturnToHomePage(data, subject, message);
        await this.submitBrowserDialog();
        await this.submitFormAndReturnToHomePage();
    }
}