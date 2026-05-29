import { test, expect } from '@playwright/test';

const timestamp = Date.now();
const proEmail = `pro_${timestamp}@test.com`;
const password = 'Test1234';

test.describe('Professional Dashboard', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/pro-signup');
    await page.waitForLoadState('networkidle');
    await page.fill('input[name="name"], input[placeholder*="Full Name" i]', 'Siti Professional');
    await page.fill('input[type="email"]', proEmail);
    const phone = page.locator('input[name="phone"], input[placeholder*="Phone" i]');
    if (await phone.count() > 0) await phone.first().fill('0123456789');
    const whatsapp = page.locator('input[name="whatsapp"], input[placeholder*="WhatsApp" i]');
    if (await whatsapp.count() > 0) await whatsapp.first().fill('0123456789');
    const cat = page.locator('select[name="service_category"], select[name="serviceCategory"]');
    if (await cat.count() > 0) await cat.first().selectOption({ index: 1 });
    const area = page.locator('select[name="coverage_area"], select[name="coverageArea"]');
    if (await area.count() > 0) await area.first().selectOption({ index: 1 });
    const exp = page.locator('input[name="years_experience"], input[name="yearsExperience"], input[placeholder*="Experience" i]');
    if (await exp.count() > 0) await exp.first().fill('3');
    await page.fill('input[type="password"]', password);
    const confirm = page.locator('input[placeholder*="Confirm" i], input[name="confirmPassword"]');
    if (await confirm.count() > 0) await confirm.first().fill(password);
    const checkbox = page.locator('input[type="checkbox"]');
    if (await checkbox.count() > 0) await checkbox.first().check();
    await page.click('button[type="submit"], button:has-text("Join"), button:has-text("Complete"), button:has-text("Sign Up")');
    await page.waitForURL(/dashboard/, { timeout: 15000 });
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
