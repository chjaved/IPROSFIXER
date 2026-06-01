import { test, expect } from '@playwright/test';

const timestamp = Date.now();
const customerEmail = `customer_${timestamp}@test.com`;
const proEmail = `pro_${timestamp}@test.com`;
const password = 'Test1234';

test.describe('Authentication', () => {

  test('Customer signup succeeds and redirects to dashboard', async ({ page }) => {
    await page.goto('/signup');
    await page.waitForLoadState('networkidle');
    await page.fill('input[name="name"], input[placeholder*="Full Name"], input[placeholder*="name" i]', 'Test Customer');
    await page.fill('input[type="email"]', customerEmail);
    const phone = page.locator('input[name="phone"], input[placeholder*="Phone" i]');
    if (await phone.count() > 0) await phone.first().fill('0123456789');
    await page.fill('input[type="password"]', password);
    const confirm = page.locator('input[name="confirmPassword"], input[placeholder*="Confirm" i]');
    if (await confirm.count() > 0) await confirm.first().fill(password);
    const checkbox = page.locator('input[type="checkbox"]');
    if (await checkbox.count() > 0) await checkbox.first().check();
    await page.click('button[type="submit"], button:has-text("Create Account"), button:has-text("Sign Up")');
    await page.waitForURL(/dashboard/, { timeout: 15000 });
    expect(page.url()).toContain('dashboard');
  });

  test('Customer login succeeds', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    await page.fill('input[type="email"]', customerEmail);
    await page.fill('input[type="password"]', password);
    await page.click('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")');
    await page.waitForURL(/dashboard/, { timeout: 15000 });
    expect(page.url()).toContain('dashboard');
  });

  test('Login with wrong password shows error', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    await page.fill('input[type="email"]', customerEmail);
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(4000);
    // Error in Login.jsx uses bg-red-50 class
    const error = page.locator('.bg-red-50, [class*="red-50"]');
    await expect(error).toBeVisible({ timeout: 5000 });
  });

  test('Professional signup succeeds and redirects to pro dashboard', async ({ page }) => {
    // Generate unique email for this test
    const testProEmail = `pro_${Date.now()}_${Math.random().toString(36).substr(2, 5)}@test.com`;

    await page.goto('/pro-signup');
    await page.waitForLoadState('networkidle');

    // Fill form fields matching ProSignup.jsx exactly
    await page.fill('input[name="name"]', 'Siti Pro');
    await page.fill('input[name="email"]', testProEmail);
    await page.fill('input[name="phone"]', '0123456789');
    await page.selectOption('select[name="serviceCategory"]', 'cleaning');
    await page.fill('input[name="location"]', 'Kuala Lumpur');
    await page.fill('input[name="experience"]', '3');
    await page.fill('input[name="password"]', password);
    await page.fill('input[name="confirmPassword"]', password);

    // Check terms checkbox
    await page.check('input[name="agreed"]');

    // Click submit button
    await page.click('button[type="submit"]');

    await page.waitForURL(/pro-dashboard/, { timeout: 15000 });
    expect(page.url()).toContain('pro-dashboard');
  });

});
