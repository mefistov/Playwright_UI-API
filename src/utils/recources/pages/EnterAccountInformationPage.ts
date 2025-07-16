import {expect, Locator, Page} from "@playwright/test";
import {GenerateSignUpTestData} from "../../GenerateSignUpTestData";
import {AccountCreatedPage} from "./AccountCreatedPage";

export class EnterAccountInformationPage {
    readonly page: Page;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly titleMrRadio: Locator;
    readonly titleMrsRadio: Locator;
    readonly passwordInput: Locator;
    readonly daysDropdown: Locator;
    readonly monthsDropdown: Locator;
    readonly yearsDropdown: Locator;
    readonly newsletterCheckbox: Locator;
    readonly specialOffersCheckbox: Locator;

    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly companyInput: Locator;
    readonly address1Input: Locator;
    readonly address2Input: Locator;
    readonly countryDropdown: Locator;
    readonly stateInput: Locator;
    readonly cityInput: Locator;
    readonly zipcodeInput: Locator;
    readonly mobileNumberInput: Locator;
    readonly createAccountButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.getByRole('textbox', { name: 'Name *', exact: true });
        this.emailInput = page.getByRole('textbox', { name: 'Email *', exact: true });
        this.titleMrRadio = page.locator('#id_gender1');
        this.titleMrsRadio = page.locator('#id_gender2');
        this.passwordInput = page.locator('[data-qa="password"]');
        this.daysDropdown = page.locator('[data-qa="days"]');
        this.monthsDropdown = page.locator('[data-qa="months"]');
        this.yearsDropdown = page.locator('[data-qa="years"]');
        this.newsletterCheckbox = page.locator('#newsletter');
        this.specialOffersCheckbox = page.locator('#optin');

        this.firstNameInput = page.locator('[data-qa="first_name"]');
        this.lastNameInput = page.locator('[data-qa="last_name"]');
        this.companyInput = page.locator('[data-qa="company"]');
        this.address1Input = page.locator('[data-qa="address"]');
        this.address2Input = page.locator('[data-qa="address2"]');
        this.countryDropdown = page.locator('[data-qa="country"]');
        this.stateInput = page.locator('[data-qa="state"]');
        this.cityInput = page.locator('[data-qa="city"]');
        this.zipcodeInput = page.locator('[data-qa="zipcode"]');
        this.mobileNumberInput = page.locator('[data-qa="mobile_number"]');
        this.createAccountButton = page.locator('[data-qa="create-account"]');
    }

    async assertNameEmailMathcing(name: string, email: string){
        expect.soft(await this.nameInput.inputValue()).toBe(name);
        expect.soft(await this.emailInput.inputValue()).toBe(email);
    }

    async fillAccountInformation(data: GenerateSignUpTestData): Promise<AccountCreatedPage>{
        await this.passwordInput.fill(data.password);
        await this.daysDropdown.selectOption(data.dateOfBirth.day.toString());
        await this.monthsDropdown.selectOption(data.dateOfBirth.month);
        await this.yearsDropdown.selectOption(data.dateOfBirth.year.toString());
        await this.newsletterCheckbox.check();
        await this.specialOffersCheckbox.check();
        await this.firstNameInput.fill(data.firstName);
        await this.lastNameInput.fill(data.lastName);
        await this.companyInput.fill(data.company);
        await this.address1Input.fill(data.address1);
        await this.address2Input.fill(data.address2);
        await this.countryDropdown.selectOption(data.country);
        await this.stateInput.fill(data.state);
        await this.cityInput.fill(data.city);
        await this.zipcodeInput.fill(data.zipcode);
        await this.mobileNumberInput.fill(data.mobileNumber);
        await this.createAccountButton.click();

        return new AccountCreatedPage(this.page);
    }
}