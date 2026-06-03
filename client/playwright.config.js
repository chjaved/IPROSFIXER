import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  expect: { timeout: 10000 },
  retries: 1,
  workers: 1,
  use: {
    baseURL: 'https://iprofixer.com.my',
    headless: false,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15000,
  },
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
});
