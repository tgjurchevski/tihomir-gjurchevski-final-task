# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: finalTask.spec.ts >> Automation Exercise — Final Task >> TC-SHOP-007: POST searchProduct returns matching results
- Location: tests/finalTask.spec.ts:122:7

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "top"
Received string:    "little girls mr. panda shirt"
```

# Test source

```ts
  35  |   test('TC-SHOP-003: adding multiple products updates the cart', async ({ page }) => {
  36  |     await allure.epic('Shopping');
  37  |     await allure.feature('Cart');
  38  |     await allure.story('Add multiple products');
  39  |     await allure.severity('normal');
  40  | 
  41  |     const productsPage = new ProductsPage(page);
  42  |     const cartPage = new CartPage(page);
  43  | 
  44  |     await productsPage.open();
  45  |     await productsPage.assertOnPage();
  46  | 
  47  |     const firstProductName = await productsPage.getProductName(0);
  48  |     const secondProductName = await productsPage.getProductName(1);
  49  | 
  50  |     await productsPage.addProductToCart(0);
  51  |     await productsPage.continueShopping();
  52  | 
  53  |     await productsPage.addProductToCart(1);
  54  |     await productsPage.viewCart();
  55  | 
  56  |     await cartPage.assertCartHasProducts([firstProductName, secondProductName]);
  57  |   });
  58  | 
  59  |   test('TC-SHOP-004: removing a product updates the cart', async ({ page }) => {
  60  |     await allure.epic('Shopping');
  61  |     await allure.feature('Cart');
  62  |     await allure.story('Remove product');
  63  |     await allure.severity('normal');
  64  | 
  65  |     const productsPage = new ProductsPage(page);
  66  |     const cartPage = new CartPage(page);
  67  | 
  68  |     // Precondition: seed one product via the UI
  69  |     await productsPage.open();
  70  |     const productName = await productsPage.getProductName(0);
  71  |     await productsPage.addProductToCart(0);
  72  |     await productsPage.viewCart();
  73  | 
  74  |     await cartPage.deleteProduct(productName);
  75  | 
  76  |     await cartPage.assertCartIsEmpty();
  77  |   });
  78  | 
  79  |   test('TC-SHOP-005: product detail page shows correct data', async ({ page }) => {
  80  |     await allure.epic('Shopping');
  81  |     await allure.feature('Product Detail');
  82  |     await allure.story('View product info');
  83  |     await allure.severity('minor');
  84  | 
  85  |     const productsPage = new ProductsPage(page);
  86  |     const productDetailPage = new ProductDetailPage(page);
  87  | 
  88  |     await productsPage.open();
  89  |     await productsPage.assertOnPage();
  90  | 
  91  |     await productsPage.openFirstProductDetails();
  92  | 
  93  |     await productDetailPage.assertProductDetailsVisible();
  94  |   });
  95  | 
  96  |   test('TC-SHOP-006: GET productsList returns a valid product list', async ({ request }) => {
  97  |     await allure.epic('API');
  98  |     await allure.feature('Products API');
  99  |     await allure.story('List all products');
  100 |     await allure.severity('critical');
  101 | 
  102 |     const api = new ShopApiClient(request);
  103 |     const body = await api.getProducts();
  104 | 
  105 |     expect(body.responseCode).toBe(200);
  106 |     expect(Array.isArray(body.products)).toBe(true);
  107 |     expect(body.products.length).toBeGreaterThan(0);
  108 | 
  109 |     for (const product of body.products) {
  110 |       expect(product.id).toBeDefined();
  111 |       expect(product.name).toBeTruthy();
  112 |       expect(product.price).toBeTruthy();
  113 |       expect(product.brand).toBeTruthy();
  114 |       expect(product.category).toBeDefined();
  115 |     }
  116 | 
  117 |     const ids = body.products.map((p) => p.id);
  118 |     const uniqueIds = new Set(ids);
  119 |     expect(uniqueIds.size).toBe(ids.length);
  120 |   });
  121 | 
  122 |   test('TC-SHOP-007: POST searchProduct returns matching results', async ({ request }) => {
  123 |     await allure.epic('API');
  124 |     await allure.feature('Products API');
  125 |     await allure.story('Search products');
  126 |     await allure.severity('normal');
  127 | 
  128 |     const api = new ShopApiClient(request);
  129 |     const body = await api.searchProducts('top');
  130 | 
  131 |     expect(body.responseCode).toBe(200);
  132 |     expect(body.products.length).toBeGreaterThan(0);
  133 | 
  134 |     for (const product of body.products) {
> 135 |       expect(product.name.toLowerCase()).toContain('top');
      |                                          ^ Error: expect(received).toContain(expected) // indexOf
  136 |     }
  137 |   });
  138 | 
  139 |   test('TC-SHOP-008: POST searchProduct without parameter returns 400', async ({ request }) => {
  140 |     await allure.epic('API');
  141 |     await allure.feature('Products API');
  142 |     await allure.story('Missing parameter');
  143 |     await allure.severity('minor');
  144 | 
  145 |     const api = new ShopApiClient(request);
  146 |     const body = await api.searchProductsWithoutParameter();
  147 | 
  148 |     expect(body.responseCode).toBe(400);
  149 |     expect(body.message).toBeTruthy();
  150 |     expect(body.message.toLowerCase()).toContain('search_product');
  151 |   });
  152 | 
  153 |   test('TC-SHOP-009: footer subscription shows a success message', async ({ page }) => {
  154 |     await allure.epic('Marketing');
  155 |     await allure.feature('Newsletter');
  156 |     await allure.story('Footer subscription');
  157 |     await allure.severity('minor');
  158 | 
  159 |     const homePage = new ShopHomePage(page);
  160 |     const user = generateUser();
  161 | 
  162 |     await homePage.open();
  163 |     await homePage.subscribeToNewsletter(user.email);
  164 | 
  165 |     await homePage.assertSubscriptionSuccess();
  166 |   });
  167 | 
  168 | });
```