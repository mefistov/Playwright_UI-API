import {BasePage} from "./BasePage";
import {expect, Locator} from "@playwright/test";
import {ProductDetails} from "../interfaces/ProductDetails";

export class ShoppingCartPage extends BasePage {

    readonly cartContainer: Locator;
    readonly cartTable: Locator;
    readonly emptyCartMessage: Locator;
    readonly emptyCartClickHereLink: Locator;

    constructor(page: any) {
        super(page);
        this.cartContainer = page.locator('#cart_info');
        this.cartTable = this.cartContainer.locator('#cart_info_table');
        this.emptyCartMessage = this.cartContainer.locator('#empty_cart');
        this.emptyCartClickHereLink = this.emptyCartMessage.getByRole('link', { name: 'here' });
    }

    productRow(productId: string): Locator {
        const numericId = productId.replace('product-', '');
        return this.cartTable.locator(`tr#product-${numericId}`);
    }

    getProductName(row: Locator): Locator {
        return row.locator('.cart_description h4 a');
    }

    getProductPrice(row: Locator): Locator {
        return row.locator('.cart_price p');
    }

    getProductQuantity(row: Locator): Locator {
        return row.locator('.cart_quantity button');
    }

    getProductTotalPrice(row: Locator): Locator {
        return row.locator('.cart_total_price');
    }

    getDeleteButton(row: Locator): Locator {
        return row.locator('.cart_quantity_delete');
    }

    async assertProductDetailsInCart(product: ProductDetails): Promise<void> {
        const row = this.productRow(product.id);
        expect.soft(row).toBeVisible();
        expect.soft(await this.getProductName(row)).toHaveText(product.name);
        expect.soft(await this.getProductPrice(row)).toContainText(product.price.toString());
        expect.soft(await this.getProductQuantity(row)).toHaveText(product.quantity.toString());
        expect.soft(await this.getProductTotalPrice(row)).toContainText((product.price * product.quantity).toString());
        expect.soft(await this.getDeleteButton(row)).toBeVisible();
    }
}