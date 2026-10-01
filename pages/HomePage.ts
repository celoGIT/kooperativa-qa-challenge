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
            // Clicks the link with the exact product name
            await this.page.locator(`a:has-text("${productName}")`).click();
        }


}