import {Page} from "@playwright/test";
import {BasePage} from "./BasePage";

export class ProductPage extends BasePage{

    constructor(page: Page) {
        super(page);
    }
}