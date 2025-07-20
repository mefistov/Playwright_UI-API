
/// Imports
import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './src/tests',
  timeout: 15_000,
  retries: 0,
  workers: 3,
  fullyParallel: true,
  use: {
    headless: true,
    baseURL: process.env.BASE_URL ?? '',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1080 },
    bypassCSP: true,
    launchOptions: {
      args: [
        '--disable-blink-features=AutomationControlled',
        '--start-maximized',],
    },
  },
  reporter: [
    ['allure-playwright', { outputFolder: 'allure-results' }],
    ['html'],
  ],
  projects: [
    {
      name: 'api_smoke',
      testMatch: '**/*.smoke.*',
    },
    {
      name: 'regression',
      testMatch: '**/*.regression.*',
    },
  ],
});