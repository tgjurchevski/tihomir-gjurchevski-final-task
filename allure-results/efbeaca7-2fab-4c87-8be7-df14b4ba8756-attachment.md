# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: finalTask.spec.ts >> Automation Exercise — Final Task >> TC-SHOP-002: keyword search returns only matching products
- Location: tests/finalTask.spec.ts:7:7

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "dress"
Received string:    "sleeves top and short - blue & pink"
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e5]:
      - link "Website for automation practice" [ref=e8] [cursor=pointer]:
        - /url: /
        - img "Website for automation practice" [ref=e9]
      - list [ref=e12]:
        - listitem [ref=e13]:
          - link " Home" [ref=e14] [cursor=pointer]:
            - /url: /
            - generic [ref=e15]: 
            - text: Home
        - listitem [ref=e16]:
          - link " Products" [ref=e17] [cursor=pointer]:
            - /url: /products
            - generic [ref=e18]: 
            - text: Products
        - listitem [ref=e19]:
          - link " Cart" [ref=e20] [cursor=pointer]:
            - /url: /view_cart
            - generic [ref=e21]: 
            - text: Cart
        - listitem [ref=e22]:
          - link " Signup / Login" [ref=e23] [cursor=pointer]:
            - /url: /login
            - generic [ref=e24]: 
            - text: Signup / Login
        - listitem [ref=e25]:
          - link " Test Cases" [ref=e26] [cursor=pointer]:
            - /url: /test_cases
            - generic [ref=e27]: 
            - text: Test Cases
        - listitem [ref=e28]:
          - link " API Testing" [ref=e29] [cursor=pointer]:
            - /url: /api_list
            - generic [ref=e30]: 
            - text: API Testing
        - listitem [ref=e31]:
          - link " Video Tutorials" [ref=e32] [cursor=pointer]:
            - /url: https://www.youtube.com/c/AutomationExercise
            - generic [ref=e33]: 
            - text: Video Tutorials
        - listitem [ref=e34]:
          - link " Contact us" [ref=e35] [cursor=pointer]:
            - /url: /contact_us
            - generic [ref=e36]: 
            - text: Contact us
  - generic [ref=e38]:
    - img "Website for practice" [ref=e39]
    - textbox "Search Product" [ref=e40]: dress
    - button "" [ref=e41] [cursor=pointer]:
      - generic [ref=e42]: 
  - generic [ref=e45]:
    - generic [ref=e47]:
      - heading "Category" [level=2] [ref=e48]
      - generic [ref=e49]:
        - heading " Women" [level=4] [ref=e52]:
          - link " Women" [ref=e53] [cursor=pointer]:
            - /url: "#Women"
            - generic [ref=e55]: 
            - text: Women
        - heading " Men" [level=4] [ref=e58]:
          - link " Men" [ref=e59] [cursor=pointer]:
            - /url: "#Men"
            - generic [ref=e61]: 
            - text: Men
        - heading " Kids" [level=4] [ref=e64]:
          - link " Kids" [ref=e65] [cursor=pointer]:
            - /url: "#Kids"
            - generic [ref=e67]: 
            - text: Kids
      - generic [ref=e68]:
        - heading "Brands" [level=2] [ref=e69]
        - list [ref=e71]:
          - listitem [ref=e72]:
            - link "(6) Polo" [ref=e73] [cursor=pointer]:
              - /url: /brand_products/Polo
              - generic [ref=e74]: (6)
              - text: Polo
          - listitem [ref=e75]:
            - link "(5) H&M" [ref=e76] [cursor=pointer]:
              - /url: /brand_products/H&M
              - generic [ref=e77]: (5)
              - text: H&M
          - listitem [ref=e78]:
            - link "(5) Madame" [ref=e79] [cursor=pointer]:
              - /url: /brand_products/Madame
              - generic [ref=e80]: (5)
              - text: Madame
          - listitem [ref=e81]:
            - link "(3) Mast & Harbour" [ref=e82] [cursor=pointer]:
              - /url: /brand_products/Mast & Harbour
              - generic [ref=e83]: (3)
              - text: Mast & Harbour
          - listitem [ref=e84]:
            - link "(4) Babyhug" [ref=e85] [cursor=pointer]:
              - /url: /brand_products/Babyhug
              - generic [ref=e86]: (4)
              - text: Babyhug
          - listitem [ref=e87]:
            - link "(3) Allen Solly Junior" [ref=e88] [cursor=pointer]:
              - /url: /brand_products/Allen Solly Junior
              - generic [ref=e89]: (3)
              - text: Allen Solly Junior
          - listitem [ref=e90]:
            - link "(3) Kookie Kids" [ref=e91] [cursor=pointer]:
              - /url: /brand_products/Kookie Kids
              - generic [ref=e92]: (3)
              - text: Kookie Kids
          - listitem [ref=e93]:
            - link "(5) Biba" [ref=e94] [cursor=pointer]:
              - /url: /brand_products/Biba
              - generic [ref=e95]: (5)
              - text: Biba
    - generic [ref=e97]:
      - heading "Searched Products" [level=2] [ref=e98]
      - generic [ref=e100]:
        - generic [ref=e101]:
          - generic [ref=e102]:
            - img "ecommerce website products"
            - heading "Rs. 1000" [level=2] [ref=e103]
            - paragraph [ref=e104]: Sleeveless Dress
            - generic [ref=e105] [cursor=pointer]:
              - generic [ref=e106]: 
              - text: Add to cart
          - generic [ref=e107]:
            - heading "Rs. 1000" [level=2] [ref=e108]
            - paragraph [ref=e109]: Sleeveless Dress
            - generic [ref=e110] [cursor=pointer]:
              - generic [ref=e111]: 
              - text: Add to cart
        - list [ref=e113]:
          - listitem [ref=e114]:
            - link " View Product" [ref=e115] [cursor=pointer]:
              - /url: /product_details/3
              - generic [ref=e116]: 
              - text: View Product
      - generic [ref=e118]:
        - generic [ref=e119]:
          - generic [ref=e120]:
            - img "ecommerce website products"
            - heading "Rs. 1500" [level=2] [ref=e121]
            - paragraph [ref=e122]: Stylish Dress
            - generic [ref=e123] [cursor=pointer]:
              - generic [ref=e124]: 
              - text: Add to cart
          - generic [ref=e125]:
            - heading "Rs. 1500" [level=2] [ref=e126]
            - paragraph [ref=e127]: Stylish Dress
            - generic [ref=e128] [cursor=pointer]:
              - generic [ref=e129]: 
              - text: Add to cart
        - list [ref=e131]:
          - listitem [ref=e132]:
            - link " View Product" [ref=e133] [cursor=pointer]:
              - /url: /product_details/4
              - generic [ref=e134]: 
              - text: View Product
      - generic [ref=e136]:
        - generic [ref=e137]:
          - generic [ref=e138]:
            - img "ecommerce website products"
            - heading "Rs. 478" [level=2] [ref=e139]
            - paragraph [ref=e140]: Sleeves Top and Short - Blue & Pink
            - generic [ref=e141] [cursor=pointer]:
              - generic [ref=e142]: 
              - text: Add to cart
          - generic [ref=e143]:
            - heading "Rs. 478" [level=2] [ref=e144]
            - paragraph [ref=e145]: Sleeves Top and Short - Blue & Pink
            - generic [ref=e146] [cursor=pointer]:
              - generic [ref=e147]: 
              - text: Add to cart
        - list [ref=e149]:
          - listitem [ref=e150]:
            - link " View Product" [ref=e151] [cursor=pointer]:
              - /url: /product_details/16
              - generic [ref=e152]: 
              - text: View Product
      - generic [ref=e154]:
        - generic [ref=e155]:
          - generic [ref=e156]:
            - img "ecommerce website products"
            - heading "Rs. 1050" [level=2] [ref=e157]
            - paragraph [ref=e158]: Sleeveless Unicorn Patch Gown - Pink
            - generic [ref=e159] [cursor=pointer]:
              - generic [ref=e160]: 
              - text: Add to cart
          - generic [ref=e161]:
            - heading "Rs. 1050" [level=2] [ref=e162]
            - paragraph [ref=e163]: Sleeveless Unicorn Patch Gown - Pink
            - generic [ref=e164] [cursor=pointer]:
              - generic [ref=e165]: 
              - text: Add to cart
        - list [ref=e167]:
          - listitem [ref=e168]:
            - link " View Product" [ref=e169] [cursor=pointer]:
              - /url: /product_details/19
              - generic [ref=e170]: 
              - text: View Product
      - generic [ref=e172]:
        - generic [ref=e173]:
          - generic [ref=e174]:
            - img "ecommerce website products"
            - heading "Rs. 1190" [level=2] [ref=e175]
            - paragraph [ref=e176]: Cotton Mull Embroidered Dress
            - generic [ref=e177] [cursor=pointer]:
              - generic [ref=e178]: 
              - text: Add to cart
          - generic [ref=e179]:
            - heading "Rs. 1190" [level=2] [ref=e180]
            - paragraph [ref=e181]: Cotton Mull Embroidered Dress
            - generic [ref=e182] [cursor=pointer]:
              - generic [ref=e183]: 
              - text: Add to cart
        - list [ref=e185]:
          - listitem [ref=e186]:
            - link " View Product" [ref=e187] [cursor=pointer]:
              - /url: /product_details/20
              - generic [ref=e188]: 
              - text: View Product
      - generic [ref=e190]:
        - generic [ref=e191]:
          - generic [ref=e192]:
            - img "ecommerce website products"
            - heading "Rs. 1530" [level=2] [ref=e193]
            - paragraph [ref=e194]: Blue Cotton Indie Mickey Dress
            - generic [ref=e195] [cursor=pointer]:
              - generic [ref=e196]: 
              - text: Add to cart
          - generic [ref=e197]:
            - heading "Rs. 1530" [level=2] [ref=e198]
            - paragraph [ref=e199]: Blue Cotton Indie Mickey Dress
            - generic [ref=e200] [cursor=pointer]:
              - generic [ref=e201]: 
              - text: Add to cart
        - list [ref=e203]:
          - listitem [ref=e204]:
            - link " View Product" [ref=e205] [cursor=pointer]:
              - /url: /product_details/21
              - generic [ref=e206]: 
              - text: View Product
      - generic [ref=e208]:
        - generic [ref=e209]:
          - generic [ref=e210]:
            - img "ecommerce website products"
            - heading "Rs. 1600" [level=2] [ref=e211]
            - paragraph [ref=e212]: Long Maxi Tulle Fancy Dress Up Outfits -Pink
            - generic [ref=e213] [cursor=pointer]:
              - generic [ref=e214]: 
              - text: Add to cart
          - generic [ref=e215]:
            - heading "Rs. 1600" [level=2] [ref=e216]
            - paragraph [ref=e217]: Long Maxi Tulle Fancy Dress Up Outfits -Pink
            - generic [ref=e218] [cursor=pointer]:
              - generic [ref=e219]: 
              - text: Add to cart
        - list [ref=e221]:
          - listitem [ref=e222]:
            - link " View Product" [ref=e223] [cursor=pointer]:
              - /url: /product_details/22
              - generic [ref=e224]: 
              - text: View Product
      - generic [ref=e226]:
        - generic [ref=e227]:
          - generic [ref=e228]:
            - img "ecommerce website products"
            - heading "Rs. 1100" [level=2] [ref=e229]
            - paragraph [ref=e230]: Sleeveless Unicorn Print Fit & Flare Net Dress - Multi
            - generic [ref=e231] [cursor=pointer]:
              - generic [ref=e232]: 
              - text: Add to cart
          - generic [ref=e233]:
            - heading "Rs. 1100" [level=2] [ref=e234]
            - paragraph [ref=e235]: Sleeveless Unicorn Print Fit & Flare Net Dress - Multi
            - generic [ref=e236] [cursor=pointer]:
              - generic [ref=e237]: 
              - text: Add to cart
        - list [ref=e239]:
          - listitem [ref=e240]:
            - link " View Product" [ref=e241] [cursor=pointer]:
              - /url: /product_details/23
              - generic [ref=e242]: 
              - text: View Product
      - generic [ref=e244]:
        - generic [ref=e245]:
          - generic [ref=e246]:
            - img "ecommerce website products"
            - heading "Rs. 2300" [level=2] [ref=e247]
            - paragraph [ref=e248]: Rose Pink Embroidered Maxi Dress
            - generic [ref=e249] [cursor=pointer]:
              - generic [ref=e250]: 
              - text: Add to cart
          - generic [ref=e251]:
            - heading "Rs. 2300" [level=2] [ref=e252]
            - paragraph [ref=e253]: Rose Pink Embroidered Maxi Dress
            - generic [ref=e254] [cursor=pointer]:
              - generic [ref=e255]: 
              - text: Add to cart
        - list [ref=e257]:
          - listitem [ref=e258]:
            - link " View Product" [ref=e259] [cursor=pointer]:
              - /url: /product_details/38
              - generic [ref=e260]: 
              - text: View Product
  - contentinfo [ref=e261]:
    - generic [ref=e266]:
      - heading "Subscription" [level=2] [ref=e267]
      - generic [ref=e268]:
        - textbox "Your email address" [ref=e269]
        - button "" [ref=e270] [cursor=pointer]:
          - generic [ref=e271]: 
        - paragraph [ref=e272]:
          - text: Get the most recent updates from
          - text: our site and be updated your self...
    - paragraph [ref=e276]: Copyright © 2021 All rights reserved
  - text: 
```

# Test source

```ts
  1  | import { Page, Locator, expect } from '@playwright/test';
  2  | import { BaseShopPage } from './BaseShopPage';
  3  | 
  4  | export class ProductsPage extends BaseShopPage {
  5  |     readonly allProductsHeading: Locator;
  6  |     readonly searchedProductsHeading: Locator;
  7  |     readonly searchInput: Locator;
  8  |     readonly searchButton: Locator;
  9  |     readonly productCards: Locator;
  10 |     readonly productNames: Locator;
  11 | 
  12 |     constructor(page: Page) {
  13 |         super(page);
  14 |         this.allProductsHeading = page.getByRole('heading', { name: 'All Products' });
  15 |         this.searchedProductsHeading = page.getByRole('heading', { name: 'Searched Products' });
  16 |         this.searchInput = page.locator('#search_product');
  17 |         this.searchButton = page.locator('#submit_search');
  18 |         this.productCards = page.locator('.features_items .product-image-wrapper');
  19 |         this.productNames = this.productCards.locator('.productinfo p');
  20 |     }
  21 | 
  22 |     async open(): Promise<void> {
  23 |         await this.page.goto('/products');
  24 |     }
  25 | 
  26 |     async searchFor(keyword: string): Promise<void> {
  27 |         await this.searchInput.fill(keyword);
  28 |         await this.searchButton.click();
  29 |     }
  30 | 
  31 |     async assertOnPage(): Promise<void> {
  32 |         await expect(this.allProductsHeading).toBeVisible();
  33 |     }
  34 | 
  35 |     async assertSearchResultsContain(keyword: string): Promise<void> {
  36 |         await expect(this.searchedProductsHeading).toBeVisible();
  37 |         const count = await this.productNames.count();
  38 |         expect(count).toBeGreaterThan(0);
  39 | 
  40 |         const names = await this.productNames.allTextContents();
  41 |         for (const name of names) {
> 42 |             expect(name.toLowerCase()).toContain(keyword.toLowerCase());
     |                                        ^ Error: expect(received).toContain(expected) // indexOf
  43 |         }
  44 |     }
  45 | }
```