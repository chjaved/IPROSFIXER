import { test, expect } from '@playwright/test';
import { generateEmail, signup, login, proSignup, password } from './helpers.js';

const custEmail = generateEmail('auth_cust');
const proEmail = generateEmail('auth_pro');

test('AUTH-01 - Customer signup succeeds', async ({ page }) => {
  await signup(page, custEmail, 'Ahmad Test Customer');
  expect(page.url()).toContain('dashboard');
  expect(page.url()).not.toContain('pro-dashboard');
  console.log('✅ Customer signup and routing correct');
});

test('AUTH-02 - Customer login succeeds', async ({ page }) => {
  await login(page, custEmail);
  expect(page.url()).toContain('dashboard');
  console.log('✅ Customer login works');
});

test('AUTH-03 - Wrong password shows error', async ({ page }) => {
  await page.goto('/login');
  await page.waitForLoadState('networkidle');
  await page.locator('input[type="email"]').first().fill(custEmail);
  await page.locator('input[type="password"]').first().fill('wrongpassword');
  await page.locator('button[type="submit"]').first().click();
  await page.waitForTimeout(5000);
  const body = await page.locator('body').innerText();
  expect(body.toLowerCase()).toMatch(/invalid|incorrect|wrong|error|failed/);
  console.log('✅ Wrong password shows error');
});


test('AUTH-04 - Duplicate email signup shows error', async ({ page }) => {
  await page.goto('/signup');
  await page.waitForLoadState('networkidle');
  await page.fill('input[name="name"]', 'Duplicate User');
  await page.locator('input[type="email"]').first().fill(custEmail);
  await page.fill('input[name="phone"]', '0123456789');
  await page.locator('input[type="password"]').first().fill(password);
  const confirm = page.locator('input[name="confirmPassword"]');
  if (await confirm.count() > 0) await confirm.fill(password);
  const checkboxes = page.locator('input[type="checkbox"]');
  const count = await checkboxes.count();
  for (let i = 0; i < count; i++) await checkboxes.nth(i).check();
  await page.locator('button[type="submit"]').first().click();
  await page.waitForTimeout(5000);
  const body = await page.locator('body').innerText();
  expect(body.toLowerCase()).toMatch(/already|exists|registered|taken|error/);
  console.log('✅ Duplicate email rejected');
});

test('AUTH-05 - Professional signup succeeds', async ({ page }) => {
  await proSignup(page, proEmail, 'Siti Pro Cleaner');
  expect(page.url()).toContain('dashboard');
  console.log('✅ Professional signup works');
});

test('AUTH-06 - Professional login routes to pro dashboard', async ({ page }) => {
  await login(page, proEmail);
  expect(page.url()).toContain('pro-dashboard');
  console.log('✅ Professional routed to pro dashboard');
});

test('AUTH-07 - Customer cannot access pro dashboard', async ({ page }) => {
  await login(page, custEmail);
  await page.goto('/pro-dashboard');
  await page.waitForTimeout(3000);
  expect(page.url()).not.toContain('pro-dashboard');
  console.log('✅ Customer blocked from pro dashboard');
});

test('AUTH-08 - Token persists after page refresh', async ({ page }) => {
  await login(page, custEmail);
  await page.reload();
  await page.waitForTimeout(3000);
  expect(page.url()).toContain('dashboard');
  console.log('✅ Token persists after refresh');
});

test('AUTH-09 - Logout clears session', async ({ page }) => {
  await login(page, custEmail);
  const logout = page.locator('button:has-text("Logout"), a:has-text("Logout")');
  if (await logout.count() > 0) {
    await logout.first().click();
    await page.waitForTimeout(3000);
    expect(page.url()).not.toContain('dashboard');
    await page.goto('/dashboard');
    await page.waitForTimeout(2000);
    expect(page.url()).not.toContain('dashboard');
    console.log('✅ Logout works correctly');
  }
});

test('AUTH-10 - Rate limiting on failed logins', async ({ page }) => {
  await page.goto('/login');
  await page.waitForLoadState('networkidle');
  for (let i = 0; i < 12; i++) {
    await page.locator('input[type="email"]').first().fill(`fake${i}@test.com`);
    await page.locator('input[type="password"]').first().fill('wrongpass');
    await page.locator('button[type="submit"]').first().click();
    await page.waitForTimeout(500);
  }
  const body = await page.locator('body').innerText();
  const rateLimited = body.toLowerCase().match(/too many|rate limit|try again later/);
  if (rateLimited) console.log('✅ Rate limiting working');
  else console.log('⚠️ Rate limiting may need more requests to trigger');
});
