import {Locator, Page} from "@playwright/test";
import {EnterAccountInformationPage} from "./EnterAccountInformationPage";

export class SignInLoginPage {
    readonly page: Page;
    readonly nameSighUp: Locator;
    readonly emailAddressSighUp: Locator;
    readonly sighup: Locator;

    readonly passwordLogin: Locator;
    readonly emailAddressLogin: Locator;
    readonly login: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameSighUp = page.getByRole('textbox', { name: 'Name' });
        this.emailAddressSighUp = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
        this.sighup = page.getByRole('button', { name: 'Signup' });

        this.passwordLogin = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
        this.emailAddressLogin = page.getByRole('textbox', { name: 'Password' });
        this.login = page.getByRole('button', { name: 'Login' });
    }

    async signUp(name: string, email: string){
        await this.nameSighUp.fill(name);
        await this.emailAddressSighUp.fill(email);
        await this.sighup.click();

        return new EnterAccountInformationPage(this.page);
    }

    async logIn(){

    }
}