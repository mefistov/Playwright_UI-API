import { test } from '../utils/fixtures/BaseFixtures'
import {ProductDetails} from "../utils/recources/interfaces/ProductDetails";

test.describe('Product pages tests', () => {

    const product: ProductDetails = {
        id: 'product-1',
        name: 'Blue Top',
        category: 'Women > Tops',
        price: 500,
        availability: 'In Stock',
        condition: 'New',
        brand: 'Polo',
        quantity: 1
    };

    test.beforeEach(async ({homePage, productsPage}) => {
        await homePage.navigateToProductsPage();

        await productsPage.assertOnProductsPage();

        await productsPage.selectFirstElementFromAllProductsContainer();
    })

    test('Verify All Products and product detail page', async ({productDetailsPage}) => {
        await productDetailsPage.assertPageStateAndDisplayedElements(product);
    });

    test('Add Single Product in Cart', async ({productDetailsPage, shoppingCartPage}) => {
        await productDetailsPage.setProductQuantityAndMoveToCart(product);

        await shoppingCartPage.assertProductDetailsInCart(product)
    });

    test('Verify Product quantity and Total amount in Cart', async ({productDetailsPage, shoppingCartPage}) => {
        product.quantity = 4;
        await productDetailsPage.setProductQuantityAndMoveToCart(product);

        await shoppingCartPage.assertProductDetailsInCart(product)
    });
});