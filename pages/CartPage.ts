import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly addToCartButton: Locator;
    readonly cartMenuLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.locator('a.btn-success:has-text("Add to cart")');
        this.cartMenuLink = page.locator('#cartur');
    }
    async addToCart() {
            const dialogPromise = this.page.waitForEvent('dialog');
            await this.addToCartButton.click();
            const dialog = await dialogPromise;
            await dialog.accept();
    }

        async goToCart() {
            await this.cartMenuLink.click();
    }

        async getProductInCart(productName: string): Promise<Locator> {
            // Returns the cart table row containing the product
            return this.page.locator(`tr.success:has-text("${productName}")`);
    }

}