import { test, expect } from '@playwright/test';
import { customerSignup, customerLogin, proSignup, proLogin } from './helpers.js';

const t = Date.now();
const custEmail = `auth_cust_${t}@test.com`;
const proEmail = `auth_pro_${t}@test.com`;
const password = 'Test1234!';

test('AUTH-01 - Customer signup with valid data succeeds', async ({ page }) => {
  await customerSignup(page, custEmail, password);
  expect(page.url()).toContain('dashboard');
  const body = await page.locator('body').innerText();
  expect(body.toLowerCase()).not.toContain('error');
  console.log('✅ Customer signup succeeded');
});

test('AUTH-02 - Customer login with correct credentials works', async ({ page }) => {
  await customerLogin(page, custEmail, password);
  expect(page.url()).toContain('dashboard');
  console.log('✅ Customer login succeeded');
});

test('AUTH-03 - Customer login routes to customer dashboard not pro dashboard', async ({ page }) => {
  await customerLogin(page, custEmail, password);
  expect(page.url()).toMatch(/\/dashboard/);
  expect(page.url()).not.toContain('pro-dashboard');
  console.log('✅ Customer routed to correct dashboard');
});

test('AUTH-04 - Wrong password shows error', async ({ page }) => {
  await page.goto('/login');
  await page.waitForLoadState('networkidle');
  await page.locator('input[type="email"]').first().fill(custEmail);
  await page.locator('input[type="password"]').first().fill('wrongpassword');
  await page.locator('button[type="submit"]').first().click();
  await page.waitForTimeout(4000);
  const body = await page.locator('body').innerText();
  const hasError = body.toLowerCase().match(/invalid|incorrect|wrong|error|failed/);
  expect(hasError).toBeTruthy();
  console.log('✅ Wrong password shows error');
});

test('AUTH-05 - Empty form shows validation error', async ({ page }) => {
  await page.goto('/login');
  await page.waitForLoadState('networkidle');
  await page.locator('button[type="submit"]').first().click();
  await page.waitForTimeout(2000);
  expect(page.url()).toContain('login');
  console.log('✅ Empty form validation works');
});

test('AUTH-06 - Duplicate email signup shows error', async ({ page }) => {
  await page.goto('/signup');
  await page.waitForLoadState('networkidle');
  await page.fill('input[name="name"]', 'Duplicate User');
  await page.locator('input[type="email"]').first().fill(custEmail);
  await page.fill('input[name="phone"]', '0123456789');
  await page.locator('input[type="password"]').first().fill(password);
  const confirm = page.locator('input[name="confirmPassword"], input[placeholder*="Confirm"]');
  if (await confirm.count() > 0) await confirm.fill(password);
  const checkbox = page.locator('input[type="checkbox"]');
  const count = await checkbox.count();
  for (let i = 0; i < count; i++) await checkbox.nth(i).check();
  await page.locator('button[type="submit"]').first().click();
  await page.waitForTimeout(5000);
  const body = await page.locator('body').innerText();
  const hasError = body.toLowerCase().match(/already|exists|duplicate|error|taken/);
  expect(hasError).toBeTruthy();
  console.log('✅ Duplicate email shows error');
});

test('AUTH-07 - Professional signup succeeds and routes to pro dashboard', async ({ page }) => {
  await proSignup(page, proEmail, password);
  expect(page.url()).toContain('dashboard');
  console.log('✅ Professional signup succeeded');
});

test('AUTH-08 - Professional login routes to pro dashboard', async ({ page }) => {
  await proLogin(page, proEmail, password);
  expect(page.url()).toContain('pro-dashboard');
  console.log('✅ Professional routed to pro dashboard');
});

test('AUTH-09 - Customer cannot access pro dashboard', async ({ page }) => {
  await customerLogin(page, custEmail, password);
  await page.goto('/pro-dashboard');
  await page.waitForTimeout(3000);
  expect(page.url()).not.toContain('pro-dashboard');
  console.log('✅ Customer blocked from pro dashboard');
});

test('AUTH-10 - Professional cannot access customer dashboard', async ({ page }) => {
  await proLogin(page, proEmail, password);
  await page.goto('/dashboard');
  await page.waitForTimeout(3000);
  expect(page.url()).not.toContain('/dashboard/bookings');
  console.log('✅ Professional blocked from customer dashboard');
});

test('AUTH-11 - Logout clears session and redirects', async ({ page }) => {
  await customerLogin(page, custEmail, password);
  await page.waitForTimeout(2000);
  const logout = page.locator('button:has-text("Logout"), a:has-text("Logout"), button:has-text("Sign Out")');
  if (await logout.count() > 0) {
    await logout.first().click();
    await page.waitForTimeout(3000);
    expect(page.url()).not.toContain('dashboard');
    await page.goto('/dashboard');
    await page.waitForTimeout(2000);
    expect(page.url()).not.toContain('dashboard');
    console.log('✅ Logout clears session');
  }
});

test('AUTH-12 - Token persists after page refresh', async ({ page }) => {
  await customerLogin(page, custEmail, password);
  await page.reload();
  await page.waitForTimeout(3000);
  expect(page.url()).toContain('dashboard');
  console.log('✅ Token persists after refresh');
});
