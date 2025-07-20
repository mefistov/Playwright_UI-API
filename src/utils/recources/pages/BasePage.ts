import { expect, Locator, Page } from '@playwright/test';
import { TestLogger } from '../../TestLogger';

export class BasePage {
    constructor(protected page: Page) {}

    async navigate(url: string): Promise<void> {
        TestLogger.info(`Navigating to: ${url}`);
        await this.page.goto(url);
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    async clickElement(locator: Locator, options = { timeout: 5000 }): Promise<void> {
        TestLogger.info(`Clicking element: ${locator}`);
        try {
            await locator.click({ timeout: options.timeout });
        } catch (error) {
            TestLogger.error(`Failed to click element: ${error}`);
            TestLogger.info('Retrying with force click');
            await locator.click({ force: true, timeout: options.timeout });
        }
    }


    async typeText(locator: Locator, text: string): Promise<void> {
        TestLogger.info(`Typing text: ${text}`);
        await locator.fill(text);
    }

    async isElementVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    }

    async verifyNavigateContainExpectedPage(expectedUrl : string):Promise<void> {
        const expectedPageUrl = expectedUrl;
        const actualPageUrl = this.page.url();
        expect(actualPageUrl).toContain(expectedPageUrl);
    }

    async blockCommonAds() {
        await this.page.route('**/*', (route) => {
            const url = route.request().url();
            if (
                url.includes('googlesyndication') ||
                url.includes('doubleclick') ||
                url.includes('adservice') ||
                url.includes('facebook.com/ads')
            ) {
                TestLogger.data('Ad blocked:', url);
                route.abort();
            } else {
                route.continue();
            }
        });

        this.page.context().on('page', async (popup) => {
            TestLogger.data('Closing the pop-up that opens:', popup.url());
            await popup.close();
        });
    }
}