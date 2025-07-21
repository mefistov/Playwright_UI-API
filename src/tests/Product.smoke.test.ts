import { test } from '../utils/fixtures/BaseFixtures'
import {ProductDetails} from "../utils/recources/interfaces/ProductDetails";

test.describe('Product pages tests', () => {

    const product: ProductDetails = {
        name: 'Blue Top',
        category: 'Women > Tops',
        price: 500,
        availability: 'In Stock',
        condition: 'New',
        brand: 'Polo',
    };

    test('Verify All Products and product detail page', async ({homePage, productsPage, productDetailsPage}) => {
        await homePage.navigateToProductsPage();

        await productsPage.assertOnProductsPage();

        await productsPage.selectFirstElementFromAllProductsContainer();

        await productDetailsPage.assertOnProductDetailsPage();

        await productDetailsPage.assertProductDetailsElementsVisible(product);

    });

});