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
        await cartPage.addToCart();
        await cartPage.goToCart();

        const productRow = await cartPage.getProductInCart(data.productName);
        await expect(productRow).toBeVisible();
        await expect(productRow.locator(`text=${data.expectedPrice}`)).toBeVisible();
    });

    test('Negative scenario: Overenie neexistujúceho tovaru', async ({ page }) => {
        const homePage = new HomePage(page);
        const data = testData.negativeScenario;

        await homePage.goto();
        
        // Asercia, že sa produkt na stránke nenachádza
        const productLocator = page.locator(`a:has-text("${data.productName}")`);
        await expect(productLocator).toHaveCount(0);
    });
});