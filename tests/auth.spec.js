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
    await page.click('button[type="submit"], button:has-text("Login")');
    await page.waitForTimeout(4000);
    const error = page.locator('[class*="error"], [class*="alert"], [role="alert"], text=/invalid/i, text=/incorrect/i, text=/wrong/i');
    expect(await error.count()).toBeGreaterThan(0);
  });

  test('Professional signup succeeds and redirects to pro dashboard', async ({ page }) => {
    await page.goto('/pro-signup');
    await page.waitForLoadState('networkidle');
    await page.fill('input[name="name"], input[placeholder*="Full Name" i]', 'Siti Pro');
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
    const confirm = page.locator('input[name="confirmPassword"], input[placeholder*="Confirm" i]');
    if (await confirm.count() > 0) await confirm.first().fill(password);
    const checkbox = page.locator('input[type="checkbox"]');
    if (await checkbox.count() > 0) await checkbox.first().check();
    await page.click('button[type="submit"], button:has-text("Join"), button:has-text("Sign Up"), button:has-text("Complete")');
    await page.waitForURL(/dashboard/, { timeout: 15000 });
    expect(page.url()).toContain('dashboard');
  });

});
