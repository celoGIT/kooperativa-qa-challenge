import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import testData from '../data/test-data.json';

test.describe('Demoblaze E-shop Tests', () => {
    
  test('Positive scenario: Vloženie tovaru do košíka', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const data = testData.positiveScenario;

    await homePage.goto();
    await homePage.selectProduct(data.productName);

    // Validacia pristatia na spravnej podstranke
    const productTitle = page.locator('h2.name');
    await expect(productTitle).toHaveText(data.productName);

    await cartPage.addToCart();
    await cartPage.goToCart();

    const productRow = await cartPage.getProductInCart(data.productName);
    await expect(productRow).toBeVisible();
    await expect(productRow.locator(`text=${data.expectedPrice}`)).toBeVisible();
  });

  test('Negative scenario: Overenie neexistujúceho tovaru', async ({ page }) => {
    test.slow();

    const homePage = new HomePage(page);
    const data = testData.negativeScenario;

    await homePage.goto();
        
    const productLocator = page.locator(`a:has-text("${data.productName}")`);
    const nextButton = page.locator('#next2');

    let hasNextPage = true;

    while (hasNextPage) {
      // Asertácia neprítomnosti na aktuálne zobrazenej stránke
      await expect(productLocator).toBeHidden();

      // Kontrola viditeľnosti tlačidla pre ďalšiu stránku
      const isNextVisible = await nextButton.isVisible();

      if (isNextVisible) {
        try {
          // Skrátený timeout na 5 sekúnd pre detekciu falošného tlačidla na poslednej stránke
          const responsePromise = page.waitForResponse(response => 
          response.url().includes('pagination') && response.status() === 200,
          { timeout: 5000 }
        );
        await nextButton.click();
        await responsePromise;
        } catch (error) {
            // Ak odpoveď z backendu do 5 sekúnd nepríde, narazili sme na koniec paginácie
            hasNextPage = false;
        }
      } else {
        hasNextPage = false;
      }
    }
  });
});