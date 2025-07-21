import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "./BasePage";
import {ProductDetails} from "../interfaces/ProductDetails";

export class ProductDetailsPage extends BasePage {
    readonly productDetailsContainer: Locator;
    readonly productNameTitle: Locator;
    readonly productCategory: Locator
    readonly productPrice: Locator;
    readonly productAvailability: Locator;
    readonly productCondition: Locator;
    readonly productBrand: Locator;
    readonly productQuantityInput: Locator;
    readonly addToCartButton: Locator;

    constructor(page: Page) {
        super(page);
        this.productDetailsContainer = page.locator('.product-details');
        this.productNameTitle = this.productDetailsContainer.getByRole('heading', { level: 2 });
        this.productCategory = this.productDetailsContainer.locator('p', { hasText: 'Category:' });
        this.productPrice = this.productDetailsContainer.locator('span').filter({ hasText: /^Rs\.\s\d+$/ });
        this.productAvailability = this.productDetailsContainer.locator('p', { hasText: 'Availability:' });
        this.productCondition = this.productDetailsContainer.locator('p', { hasText: 'Condition:' });
        this.productBrand = this.productDetailsContainer.locator('p', { hasText: 'Brand:' });
        this.productQuantityInput = this.productDetailsContainer.locator('#quantity');
        this.addToCartButton = this.productDetailsContainer.getByRole('button', { name: /add to cart/i });
    }

    async assertOnProductDetailsPage(){
        await expect(this.page).toHaveURL(/.*product_details/);
    }

    async assertProductDetailsElementsVisible(data: ProductDetails){
        await expect.soft(this.productNameTitle).toHaveText(data.name);
        await expect.soft(this.productCategory).toContainText(data.category);
        await expect.soft(this.productPrice).toContainText(data.price.toString());
        await expect.soft(this.productCondition).toContainText(data.condition);
        await expect.soft(this.productBrand).toContainText(data.brand);
        await expect.soft(this.productAvailability).toContainText(data.availability);
        expect.soft(await this.isElementVisible(this.productQuantityInput)).toBe(true);
        expect.soft(await this.isElementVisible(this.addToCartButton)).toBe(true);
    }
}