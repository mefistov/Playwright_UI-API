import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "./BasePage";

export class ProductsPage extends BasePage{
    readonly pageTitle: Locator;
    readonly allProductsContainer: Locator;
    readonly categoriesContainer: Locator;
    readonly brandsContainer: Locator;
    readonly addedToCartModal: Locator;
    readonly viewCartLink: Locator;
    readonly continueShoppingButton: Locator;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.locator('h2.title', { hasText: 'All Products' });
        this.allProductsContainer = this.page.locator('.features_items');

        this.categoriesContainer = this.page.locator('#accordian');
        this.brandsContainer = this.page.locator('.brands_products');

        this.addedToCartModal = this.page.locator('#cartModal');
        this.viewCartLink = this.addedToCartModal.locator('a[href="/view_cart"]');
        this.continueShoppingButton = this.addedToCartModal.locator('button.close-modal');
    }

    async assertOnProductsPage(){
        await expect(this.page).toHaveURL(/.*products/);
        await expect(this.pageTitle).toBeVisible();
    }


}