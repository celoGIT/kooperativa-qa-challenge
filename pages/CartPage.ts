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
            // Demoblaze používa browser alert pri pridaní do košíka, je nutne ho automaticky potvrdiť
            this.page.once('dialog', dialog => dialog.accept());
            await this.addToCartButton.click();
    }

        async goToCart() {
            await this.cartMenuLink.click();
    }

        async getProductInCart(productName: string): Promise<Locator> {
            // Vráti riadok v tabuľke košíka, ktorý obsahuje produkt
            return this.page.locator(`tr.success:has-text("${productName}")`);
    }

}