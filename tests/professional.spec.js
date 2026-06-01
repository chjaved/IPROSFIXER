import { test, expect } from '@playwright/test';

const password = 'Test1234';

test.describe('Professional Dashboard', () => {
  let proEmail;

  test.beforeEach(async ({ page }) => {
    // Generate unique email for each test
    proEmail = `pro_${Date.now()}_${Math.random().toString(36).substr(2, 5)}@test.com`;

    await page.goto('/pro-signup');
    await page.waitForLoadState('networkidle');

    // Fill form fields matching ProSignup.jsx exactly
    await page.fill('input[name="name"]', 'Siti Professional');
    await page.fill('input[name="email"]', proEmail);
    await page.fill('input[name="phone"]', '0123456789');
    await page.selectOption('select[name="serviceCategory"]', 'cleaning');
    await page.fill('input[name="location"]', 'Kuala Lumpur');
    await page.fill('input[name="experience"]', '3');
    await page.fill('input[name="password"]', password);
    await page.fill('input[name="confirmPassword"]', password);

    // Check terms checkbox
    await page.check('input[name="agreed"]');

    // Click submit button with exact text "Join as Professional"
    await page.click('button[type="submit"]');

    // Wait for navigation to pro-dashboard
    await page.waitForURL(/pro-dashboard/, { timeout: 15000 });
  });

  test('Pro dashboard overview loads without errors', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1, h2').first()).toBeVisible({ timeout: 8000 });
    const errorCount = await page.locator('text=/something went wrong/i, text=/error loading/i').count();
    expect(errorCount).toBe(0);
  });

  test('Jobs page loads', async ({ page }) => {
    await page.goto('/pro-dashboard/jobs');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    await expect(page.locator('h1, h2').first()).toBeVisible({ timeout: 8000 });
  });

  test('Earnings page loads with RM text', async ({ page }) => {
    await page.goto('/pro-dashboard/earnings');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    const rmText = page.locator('text=/RM/');
    expect(await rmText.count()).toBeGreaterThan(0);
  });

  test('Reviews page loads', async ({ page }) => {
    await page.goto('/pro-dashboard/reviews');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    await expect(page.locator('h1, h2').first()).toBeVisible({ timeout: 8000 });
  });

  test('Profile page shows email', async ({ page }) => {
    await page.goto('/pro-dashboard/profile');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    await expect(page.locator(`text=${proEmail}`)).toBeVisible({ timeout: 8000 });
  });

});
