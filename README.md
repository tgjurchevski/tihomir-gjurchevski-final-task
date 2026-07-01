# Tihomir Gjurchevski — Final Task

Playwright test suite for [automationexercise.com](https://automationexercise.com) —
10 test cases covering the full shopping flow, end to end (UI + API).

## Tech stack

- Playwright + TypeScript
- Page Object Model
- Allure reporting
- GitHub Actions CI

## Project structure

- `pages/automationExercise/` — Page Object Model classes (`BaseShopPage` + 9 page classes),
  locators as properties, action and assertion methods
- `fixtures/authenticatedShopPage.ts` — fixture that generates a unique user, registers it
  via the UI before the test, and deletes the account via `DELETE /api/deleteAccount` after
- `utils/generateUser.ts` — dynamic test data, unique per run (no hardcoded credentials)
- `utils/shopApiClient.ts` — typed API client wrapping `APIRequestContext`, with retry on throttling
- `tests/finalTask.spec.ts` — all 10 test cases (TC-SHOP-001 … TC-SHOP-010),
  each tagged with Allure `epic` / `feature` / `story` / `severity`

## How to run

    npm ci
    npx playwright install
    npx playwright test

Run a single test:

    npx playwright test -g "TC-SHOP-001"

## Allure report

    npx allure generate allure-results --clean -o allure-report
    npx allure open allure-report

## Wait strategies used

- `waitForResponse` / `waitForURL` for navigation and redirects
- `toBeVisible()` for modals and alerts
- Polling assertions (`toHaveCount`) for cart recalculation after delete
- No `waitForTimeout` calls in any UI flow

## Site quirks handled

- **Ads block clicks** — ad networks are aborted via `page.route()` in a `beforeEach`,
  otherwise ad iframes/overlays intercept clicks on product cards
- **Search matches more than names** — both the UI and API search match by category /
  description as well (e.g. searching "dress" returns a "Top and Short" set; searching
  "top" returns a shirt categorized under Tops). Tests assert the keyword appears in the
  name **or** category, and for UI results verify it on the product detail page
- **API always returns HTTP 200** — the real status is in the JSON body's `responseCode`
  field, so assertions target the body, not the HTTP status
- **API throttling under parallel load** — the API occasionally responds with an HTML
  error page during parallel runs; the API client retries with a short backoff and fails
  with a readable message if it persists

## CI

GitHub Actions workflow (`.github/workflows/playwright.yml`) runs the `automation-exercise`
project from a matrix on every push to `main`, and uploads both the Playwright HTML report
and the Allure results as artifacts.
