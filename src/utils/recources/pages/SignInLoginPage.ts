import {expect, Locator, Page} from "@playwright/test";
import {EnterAccountInformationPage} from "./EnterAccountInformationPage";
import {GenerateSignUpTestData} from "../../GenerateSignUpTestData";
import {HomePage} from "./HomePage";

export class SignInLoginPage {
    readonly page: Page;

    readonly signUpHeading: Locator;
    readonly nameSighUp: Locator;
    readonly emailAddressSighUp: Locator;
    readonly sighup: Locator;
    readonly invalidEmailOrPassword: Locator;

    readonly loginHeading: Locator;
    readonly passwordLogin: Locator;
    readonly emailAddressLogin: Locator;
    readonly login: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signUpHeading = page.getByRole('heading', { name: 'New User Signup!' });
        this.nameSighUp = page.getByRole('textbox', { name: 'Name' });
        this.emailAddressSighUp = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
        this.sighup = page.getByRole('button', { name: 'Signup' });

        this.loginHeading = page.getByRole('heading', { name: 'Login to your account' });
        this.emailAddressLogin = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
        this.passwordLogin = page.getByRole('textbox', { name: 'Password' });
        this.login = page.getByRole('button', { name: 'Login' });
        this.invalidEmailOrPassword = page.getByText('Your email or password is');
    }

    async signUp(name: string, email: string){
        expect(await this.signUpHeading.isVisible()).toBe(true);
        await this.nameSighUp.fill(name);
        await this.emailAddressSighUp.fill(email);
        await this.sighup.click();

        return new EnterAccountInformationPage(this.page);
    }

    async logIn(data: GenerateSignUpTestData){
        expect(await this.loginHeading.isVisible()).toBe(true);
        await this.emailAddressLogin.fill(data.email);
        await this.passwordLogin.fill(data.password);
        await this.login.click();

        return new HomePage(this.page);
    }
}