import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
            await this.page.goto('https://demoblaze.com/');
        }

        async selectProduct(productName: string) {
            // Klikne na odkaz s presným názvom produktu
            await this.page.locator(`a:has-text("${productName}")`).click();
        }


}