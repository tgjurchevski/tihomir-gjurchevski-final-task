import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { ProductsPage } from '../pages/automationExercise/ProductsPage';
import { ProductDetailPage } from '../pages/automationExercise/ProductDetailPage';
import { ShopHomePage } from '../pages/automationExercise/ShopHomePage';
import { generateUser } from '../utils/generateUser';

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