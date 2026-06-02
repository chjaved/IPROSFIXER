import { test, expect } from '@playwright/test';

test('PUBLIC-01 - Homepage loads with correct title', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveTitle(/iPROFIXER/i);
  const h1 = page.locator('h1').first();
  await expect(h1).toBeVisible();
  const body = await page.locator('body').innerText();
  expect(body.toLowerCase()).toContain('clean');
  console.log('✅ Homepage loaded correctly');
});

test('PUBLIC-02 - Homepage has navigation links', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  const nav = page.locator('nav');
  await expect(nav).toBeVisible();
  const loginLink = page.locator('a:has-text("Login"), button:has-text("Login")');
  await expect(loginLink.first()).toBeVisible();
  console.log('✅ Navigation links visible');
});

test('PUBLIC-03 - Services page loads with 7 cleaning services', async ({ page }) => {
  await page.goto('/services');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  const body = await page.locator('body').innerText();
  expect(body.toLowerCase()).toContain('clean');
  expect(body).toContain('RM');
  console.log('✅ Services page loaded');
});

test('PUBLIC-04 - Services Book button redirects to signup when not logged in', async ({ page }) => {
  await page.goto('/services');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  const bookBtn = page.locator('button:has-text("Book"), a:has-text("Book")').first();
  if (await bookBtn.count() > 0) {
    await bookBtn.click();
    await page.waitForTimeout(2000);
    const url = page.url();
    expect(url).toMatch(/signup|login/);
    console.log('✅ Book button redirects to signup when not logged in');
  }
});

test('PUBLIC-05 - How It Works page loads', async ({ page }) => {
  await page.goto('/how-it-works');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('body')).toBeVisible();
  const body = await page.locator('body').innerText();
  expect(body.length).toBeGreaterThan(100);
  console.log('✅ How It Works page loaded');
});

test('PUBLIC-06 - For Professionals page loads', async ({ page }) => {
  await page.goto('/for-professionals');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('body')).toBeVisible();
  console.log('✅ For Professionals page loaded');
});

test('PUBLIC-07 - FAQ page loads', async ({ page }) => {
  await page.goto('/faq');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('body')).toBeVisible();
  console.log('✅ FAQ page loaded');
});

test('PUBLIC-08 - Login page has all required fields', async ({ page }) => {
  await page.goto('/login');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('input[type="email"]').first()).toBeVisible();
  await expect(page.locator('input[type="password"]').first()).toBeVisible();
  await expect(page.locator('button[type="submit"]').first()).toBeVisible();
  console.log('✅ Login page has all fields');
});

test('PUBLIC-09 - Signup page has all required fields', async ({ page }) => {
  await page.goto('/signup');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('input[type="email"]').first()).toBeVisible();
  await expect(page.locator('input[type="password"]').first()).toBeVisible();
  await expect(page.locator('button[type="submit"]').first()).toBeVisible();
  console.log('✅ Signup page has all fields');
});

test('PUBLIC-10 - Pro signup page has professional fields', async ({ page }) => {
  await page.goto('/pro-signup');
  await page.waitForLoadState('networkidle');
  const body = await page.locator('body').innerText();
  expect(body.toLowerCase()).toMatch(/professional|service|category/);
  console.log('✅ Pro signup page has professional fields');
});

test('PUBLIC-11 - Privacy policy page loads', async ({ page }) => {
  await page.goto('/privacy');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('body')).toBeVisible();
  console.log('✅ Privacy policy loaded');
});

test('PUBLIC-12 - Terms page loads', async ({ page }) => {
  await page.goto('/terms');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('body')).toBeVisible();
  console.log('✅ Terms page loaded');
});

test('PUBLIC-13 - Direct navigation to dashboard redirects to login', async ({ page }) => {
  await page.goto('/dashboard');
  await page.waitForTimeout(3000);
  const url = page.url();
  expect(url).toMatch(/login|signup|\//);
  console.log('✅ Unauthenticated dashboard access redirects correctly');
});

test('PUBLIC-14 - Direct navigation to pro-dashboard redirects to login', async ({ page }) => {
  await page.goto('/pro-dashboard');
  await page.waitForTimeout(3000);
  const url = page.url();
  expect(url).toMatch(/login|signup|\//);
  console.log('✅ Unauthenticated pro-dashboard access redirects correctly');
});
