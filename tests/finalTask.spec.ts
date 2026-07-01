import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { ProductsPage } from '../pages/automationExercise/ProductsPage';
import { ProductDetailPage } from '../pages/automationExercise/ProductDetailPage';
import { ShopHomePage } from '../pages/automationExercise/ShopHomePage';
import { generateUser } from '../utils/generateUser';
import { CartPage } from '../pages/automationExercise/CartPage';
import { ShopApiClient } from '../utils/shopApiClient';

test.describe('Automation Exercise — Final Task', () => {
  test.beforeEach(async ({ page }) => {
    // Block ad networks — their overlays intercept clicks on this site
    await page.route(
      /googlesyndication|doubleclick|googleads|adtrafficquality|adsbygoogle/,
      (route) => route.abort()
    );
  });

  test('TC-SHOP-002: keyword search returns only matching products', async ({ page }) => {
    await allure.epic('Shopping');
    await allure.feature('Product Search');
    await allure.story('Keyword search');
    await allure.severity('normal');

    const productsPage = new ProductsPage(page);

    await productsPage.open();
    await productsPage.assertOnPage();

    await productsPage.searchFor('dress');

    await productsPage.assertSearchResultsContain('dress');
  });

  test('TC-SHOP-003: adding multiple products updates the cart', async ({ page }) => {
    await allure.epic('Shopping');
    await allure.feature('Cart');
    await allure.story('Add multiple products');
    await allure.severity('normal');

    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.open();
    await productsPage.assertOnPage();

    const firstProductName = await productsPage.getProductName(0);
    const secondProductName = await productsPage.getProductName(1);

    await productsPage.addProductToCart(0);
    await productsPage.continueShopping();

    await productsPage.addProductToCart(1);
    await productsPage.viewCart();

    await cartPage.assertCartHasProducts([firstProductName, secondProductName]);
  });

  test('TC-SHOP-004: removing a product updates the cart', async ({ page }) => {
    await allure.epic('Shopping');
    await allure.feature('Cart');
    await allure.story('Remove product');
    await allure.severity('normal');

    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    // Precondition: seed one product via the UI
    await productsPage.open();
    const productName = await productsPage.getProductName(0);
    await productsPage.addProductToCart(0);
    await productsPage.viewCart();

    await cartPage.deleteProduct(productName);

    await cartPage.assertCartIsEmpty();
  });

  test('TC-SHOP-005: product detail page shows correct data', async ({ page }) => {
    await allure.epic('Shopping');
    await allure.feature('Product Detail');
    await allure.story('View product info');
    await allure.severity('minor');

    const productsPage = new ProductsPage(page);
    const productDetailPage = new ProductDetailPage(page);

    await productsPage.open();
    await productsPage.assertOnPage();

    await productsPage.openFirstProductDetails();

    await productDetailPage.assertProductDetailsVisible();
  });

  test('TC-SHOP-006: GET productsList returns a valid product list', async ({ request }) => {
    await allure.epic('API');
    await allure.feature('Products API');
    await allure.story('List all products');
    await allure.severity('critical');

    const api = new ShopApiClient(request);
    const body = await api.getProducts();

    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBeGreaterThan(0);

    for (const product of body.products) {
      expect(product.id).toBeDefined();
      expect(product.name).toBeTruthy();
      expect(product.price).toBeTruthy();
      expect(product.brand).toBeTruthy();
      expect(product.category).toBeDefined();
    }

    const ids = body.products.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  test('TC-SHOP-007: POST searchProduct returns matching results', async ({ request }) => {
    await allure.epic('API');
    await allure.feature('Products API');
    await allure.story('Search products');
    await allure.severity('normal');

    const api = new ShopApiClient(request);
    const body = await api.searchProducts('top');

    expect(body.responseCode).toBe(200);
    expect(body.products.length).toBeGreaterThan(0);

    // The API matches by name OR category (e.g. "Panda Shirt" is in the Tops
    // category), so assert the keyword appears in either.
    for (const product of body.products) {
      const name = product.name.toLowerCase();
      const category = product.category.category.toLowerCase();
      expect(
        name.includes('top') || category.includes('top'),
        `Product "${product.name}" (category: ${product.category.category}) does not match keyword "top"`
      ).toBe(true);
    }
  });

  test('TC-SHOP-008: POST searchProduct without parameter returns 400', async ({ request }) => {
    await allure.epic('API');
    await allure.feature('Products API');
    await allure.story('Missing parameter');
    await allure.severity('minor');

    const api = new ShopApiClient(request);
    const body = await api.searchProductsWithoutParameter();

    expect(body.responseCode).toBe(400);
    expect(body.message).toBeTruthy();
    expect(body.message.toLowerCase()).toContain('search_product');
  });

  test('TC-SHOP-009: footer subscription shows a success message', async ({ page }) => {
    await allure.epic('Marketing');
    await allure.feature('Newsletter');
    await allure.story('Footer subscription');
    await allure.severity('minor');

    const homePage = new ShopHomePage(page);
    const user = generateUser();

    await homePage.open();
    await homePage.subscribeToNewsletter(user.email);

    await homePage.assertSubscriptionSuccess();
  });

});