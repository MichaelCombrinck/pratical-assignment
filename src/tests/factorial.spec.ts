import test, { expect } from "@playwright/test";
import { BASE_URL } from "../../playwright.config";
import { FactorialPage } from "../pages/factorial-page";


test.describe('Factorial', () => {

    test.beforeEach(async ({ page }) => {
        const factorialPage = new FactorialPage(page);
        await factorialPage.goto();
        await factorialPage.inputBox.isVisible();
    })

    test('Verify factorial calculation for a valid input', async ({ page }) => {
        const factorialPage = new FactorialPage(page);
        await factorialPage.inputBox.fill('5');
        await factorialPage.submitButton.click();
        await page.waitForSelector('#resultDiv');
        const result = await factorialPage.result.textContent();
        console.log(`Result: ${result}`);
        expect(result).toContain('120');
    })

    test(' Verify factorial calculation for negative numbers', async ({ page }) => {
        const factorialPage = new FactorialPage(page);
        await factorialPage.inputBox.fill('-5');
        await factorialPage.submitButton.click();
        await page.waitForSelector('#resultDiv');
        const errorMessage = await factorialPage.result.textContent();
        expect(errorMessage).toContain('Error');
    })

    test('Verify red form validation styling for invalid input', async ({ page }) => {
        const factorialPage = new FactorialPage(page);
        await factorialPage.inputBox.fill('abc');
        await factorialPage.submitButton.click();
        const inputBox = factorialPage.inputBox.locator('input[type="text"]');
        await expect(inputBox).toHaveCSS('border-color', 'red');
    })
    test('Verify console errors', async ({ page }) => {
        const factorialPage = new FactorialPage(page);

        const consoleMessages: string[] = [];
        page.on('console', (msg) => {
            consoleMessages.push(msg.text());
            console.log(`Console log: ${msg.text()}`);
        });

        await factorialPage.inputBox.fill('abc');
        await factorialPage.submitButton.click();
        await page.waitForSelector('#resultDiv');

        const errorMessages = consoleMessages.filter(msg => msg.toLowerCase().includes('error'));
        expect(errorMessages.length).toBe(0);
    });

    test('Verify API call parameters', async ({ page }) => {
        const factorialPage = new FactorialPage(page);
        const [response] = await Promise.all([
            page.waitForResponse(response => response.url().includes('/factorial') && response.status() === 200),
            factorialPage.inputBox.fill('5'),
            factorialPage.submitButton.click()
        ]);

        const request = response.request();
        expect(request.method()).toBe('POST');
        expect(request.postData()).toContain('5');
    })

    test('Verify factorial of 12', async ({ page }) => {
        const factorialPage = new FactorialPage(page);
        await factorialPage.inputBox.fill('12');
        await factorialPage.submitButton.click();
        await page.waitForSelector('#resultDiv');
        const result = await factorialPage.result.textContent();
        expect(result).toContain('479001600');
    });

    test('Verify factorial of 400', async ({ page }) => {
        const factorialPage = new FactorialPage(page);
        await factorialPage.inputBox.fill('400');
        await factorialPage.submitButton.click();
        await page.waitForSelector('#resultDiv');
        const resultText = await factorialPage.result.textContent()
        expect(resultText).not.toContain('Infinity');
        expect(resultText).not.toContain('Error');
    });

    test(`should ensure when 'about' link is clicked, user is navigated to about page`, async ({ page }) => {
        const factorialPage = new FactorialPage(page);
        await factorialPage.aboutLink.click();
        expect(page.url()).toContain(BASE_URL + 'about');
    });

    test(`should ensure when 'Terms and Conditions' link is clicked, user is navigated to terms and conditions page`, async ({ page }) => {
        const factorialPage = new FactorialPage(page);
        await factorialPage.termsLink.click();
        expect(page.url()).toContain(BASE_URL + 'terms');
    });


    test(`should ensure when 'Privacy' link is clicked, user is navigated to terms page`, async ({ page }) => {
        const factorialPage = new FactorialPage(page);
        await factorialPage.privacyLink.click();
        expect(page.url()).toContain(BASE_URL + 'privacy');
    });

    test('should ensure error pops up when empty field is entered ', async ({ page }) => {
        const factorialPage = new FactorialPage(page);
        await factorialPage.inputBox.fill('');
        await factorialPage.submitButton.click();
        await page.waitForSelector('#resultDiv');
        const errorMessage = await factorialPage.result.textContent();
        expect(errorMessage).toContain('Please enter an integer');
    });

    test('should ensure that the input can only contain interger numbers', async ({ page }) => {
        const factorialPage = new FactorialPage(page);
        await factorialPage.inputBox.fill('abc');
        await factorialPage.submitButton.click();
        await page.waitForSelector('#resultDiv');
        const errorMessage = await factorialPage.result.textContent();
        expect(errorMessage).toContain('Please enter an integer');
    });

    test('should ensure when QA services is clicked user is navigated to QA services page', async ({ page }) => {
        const factorialPage = new FactorialPage(page);
        await factorialPage.qaServicesLink.click();
        expect(page.url()).toContain('https://qxf2.com/?utm_source=qa-interview&utm_medium=click&utm_campaign=From%20QA%20Interview');
    })


})