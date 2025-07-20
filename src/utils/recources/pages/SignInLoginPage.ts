import {expect, Locator, Page} from "@playwright/test";
import {GenerateSignUpTestData} from "../../GenerateSignUpTestData";
import {BasePage} from "./BasePage";

export class SignInLoginPage extends BasePage{
    readonly signUpHeading: Locator;
    readonly nameSighUp: Locator;
    readonly emailAddressSighUp: Locator;
    readonly signUpButton: Locator;
    readonly emailExistsAlert: Locator;

    readonly loginHeading: Locator;
    readonly passwordLogin: Locator;
    readonly emailAddressLogin: Locator;
    readonly loginButton: Locator;
    readonly invalidEmailOrPassword: Locator;

    constructor(page: Page) {
        super(page);
        this.signUpHeading = page.getByRole('heading', { name: 'New User Signup!' });
        this.nameSighUp = page.getByRole('textbox', { name: 'Name' });
        this.emailAddressSighUp = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
        this.signUpButton = page.getByRole('button', { name: 'Signup' });
        this.emailExistsAlert = page.getByText('Email Address already exist!');

        this.loginHeading = page.getByRole('heading', { name: 'Login to your account' });
        this.emailAddressLogin = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
        this.passwordLogin = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.invalidEmailOrPassword = page.getByText('Your email or password is');
    }

    async signUp(name: string, email: string){
        expect(await this.signUpHeading.isVisible()).toBe(true);
        await this.typeText(this.nameSighUp, name);
        await this.typeText(this.emailAddressSighUp, email);
        await this.clickElement(this.signUpButton)
    }

    async logIn(data: GenerateSignUpTestData){
        expect(await this.loginHeading.isVisible()).toBe(true);
        await this.typeText(this.emailAddressLogin, data.email);
        await this.typeText(this.passwordLogin, data.password);
        await this.clickElement(this.loginButton);
    }
}