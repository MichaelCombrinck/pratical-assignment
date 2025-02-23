import { Page } from "@playwright/test";
import { BASE_URL } from "../../playwright.config";

export class FactorialPage {

    readonly inputBox = this.page.locator('input[name="number"]');
    readonly submitButton = this.page.locator('#getFactorial');
    readonly result = this.page.locator('#resultDiv');

    readonly aboutLink = this.page.locator('a', { hasText: 'About' });
    readonly termsLink = this.page.locator('a', { hasText: 'Terms and Conditions' });
    readonly privacyLink = this.page.locator('a', { hasText: 'Privacy' });
    readonly qaServicesLink = this.page.locator('a', { hasText: 'Qxf2 Services' });


    constructor(private page: Page) { }

    async goto() {
        await this.page.goto(BASE_URL);
    }
}