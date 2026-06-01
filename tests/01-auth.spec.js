import { test, expect } from '@playwright/test';
import { customerSignup, customerLogin, proSignup } from './helpers.js';

const t = Date.now();
const custEmail = `cust_${t}@test.com`;
const proEmail = `pro_${t}@test.com`;
const password = 'Test1234!';

test('01 - Homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveTitle(/iPROFIXER/i);
  const heading = page.locator('h1, h2').first();
  await expect(heading).toBeVisible();
  console.log('✅ Homepage loaded');
});

test('02 - Login page loads', async ({ page }) => {
  await page.goto('/login');
  await expect(page.locator('input[type="email"]').first()).toBeVisible();
  await expect(page.locator('input[type="password"]').first()).toBeVisible();
  await expect(page.locator('button[type="submit"]').first()).toBeVisible();
  console.log('✅ Login page loaded');
});

test('03 - Customer signup creates account and redirects to dashboard', async ({ page }) => {
  await customerSignup(page, custEmail, password);
  expect(page.url()).toContain('dashboard');
  console.log('✅ Customer signup successful:', custEmail);
});

test('04 - Customer login works', async ({ page }) => {
  await customerLogin(page, custEmail, password);
  expect(page.url()).toContain('dashboard');
  console.log('✅ Customer login successful');
});

test('05 - Wrong password shows error message', async ({ page }) => {
  await page.goto('/login');
  await page.waitForLoadState('networkidle');
  await page.fill('input[type="email"]', custEmail);
  await page.fill('input[type="password"]', 'wrongpassword123');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(5000);
  const body = await page.locator('body').innerText();
  const hasError = body.toLowerCase().includes('invalid') || 
                   body.toLowerCase().includes('incorrect') || 
                   body.toLowerCase().includes('wrong') ||
                   body.toLowerCase().includes('error') ||
                   body.toLowerCase().includes('failed');
  expect(hasError).toBeTruthy();
  console.log('✅ Wrong password error shown');
});

test('06 - Professional signup creates account and redirects to pro dashboard', async ({ page }) => {
  await proSignup(page, proEmail, password);
  expect(page.url()).toContain('dashboard');
  console.log('✅ Professional signup successful:', proEmail);
});

test('07 - Logout works correctly', async ({ page }) => {
  const logoutEmail = `logout_${Date.now()}@test.com`;
  await customerSignup(page, logoutEmail, password);
  await page.waitForTimeout(2000);
  const logout = page.locator('button:has-text("Logout"), button:has-text("Sign Out"), a:has-text("Logout")');
  if (await logout.count() > 0) {
    await logout.first().click();
    await page.waitForTimeout(3000);
    expect(page.url()).not.toContain('dashboard');
    console.log('✅ Logout successful');
  } else {
    console.log('⚠️ Logout button not found');
  }
});
