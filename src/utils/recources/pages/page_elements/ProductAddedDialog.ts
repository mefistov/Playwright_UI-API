import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "../BasePage";

export class ProductAddedDialog extends BasePage{
    readonly popUp: Locator;
    readonly moveToCartLink: Locator;
    readonly continueShoppingButton: Locator;

    constructor(page: Page) {
        super(page);
        this.popUp = page.getByText('Your product has been added');
        this.moveToCartLink = page.getByRole('link', { name: 'View Cart' });
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    }

    async assertPopUpIsVisible(){
        await expect(this.popUp).toBeVisible();
    }

    async continueShopping(){
        await this.assertPopUpIsVisible();
        await this.clickElement(this.continueShoppingButton);
    }

    async moveToCart(){
        await this.assertPopUpIsVisible();
        await this.clickElement(this.moveToCartLink);
    }
}