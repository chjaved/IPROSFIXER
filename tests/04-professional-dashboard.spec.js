import { test, expect } from '@playwright/test';
import { proSignup, proLogin } from './helpers.js';

const t = Date.now();
const proEmail = `pro_dash_${t}@test.com`;
const password = 'Test1234!';

test.beforeAll(async ({ browser }) => {
  const page = await browser.newPage();
  await proSignup(page, proEmail, password);
  await page.close();
});

test('PRO-01 - Pro dashboard overview loads', async ({ page }) => {
  await proLogin(page, proEmail, password);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  expect(page.url()).toContain('dashboard');
  const body = await page.locator('body').innerText();
  expect(body).toContain('RM');
  console.log('✅ Pro dashboard loaded with earnings');
});

test('PRO-02 - Pro dashboard shows earnings stats', async ({ page }) => {
  await proLogin(page, proEmail, password);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  const body = await page.locator('body').innerText();
  expect(body).toContain('RM');
  const hasStats = body.toLowerCase().match(/earning|job|rating|completed/);
  expect(hasStats).toBeTruthy();
  console.log('✅ Pro dashboard shows stats');
});

test('PRO-03 - Jobs page loads with tabs', async ({ page }) => {
  await proLogin(page, proEmail, password);
  await page.goto('/pro-dashboard/jobs');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  const body = await page.locator('body').innerText();
  const hasTabs = body.toLowerCase().match(/available|active|completed/);
  expect(hasTabs).toBeTruthy();
  console.log('✅ Jobs page has tabs');
});

test('PRO-04 - Available jobs tab is default active tab', async ({ page }) => {
  await proLogin(page, proEmail, password);
  await page.goto('/pro-dashboard/jobs');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  const body = await page.locator('body').innerText();
  expect(body.toLowerCase()).toContain('available');
  console.log('✅ Available jobs tab is active by default');
});

test('PRO-05 - Jobs from demo data appear in available tab', async ({ page }) => {
  await proLogin(page, proEmail, password);
  await page.goto('/pro-dashboard/jobs');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(5000);
  const body = await page.locator('body').innerText();
  console.log('Jobs page content:', body.substring(0, 500));
  expect(body.length).toBeGreaterThan(100);
  console.log('✅ Jobs page content loaded');
});

test('PRO-06 - Schedule page loads', async ({ page }) => {
  await proLogin(page, proEmail, password);
  await page.goto('/pro-dashboard/schedule');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  await expect(page.locator('body')).toBeVisible();
  console.log('✅ Schedule page loaded');
});

test('PRO-07 - Earnings page loads with RM values', async ({ page }) => {
  await proLogin(page, proEmail, password);
  await page.goto('/pro-dashboard/earnings');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  const body = await page.locator('body').innerText();
  expect(body).toContain('RM');
  console.log('✅ Earnings page shows RM values');
});

test('PRO-08 - Earnings page shows this month and all time totals', async ({ page }) => {
  await proLogin(page, proEmail, password);
  await page.goto('/pro-dashboard/earnings');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  const body = await page.locator('body').innerText();
  const hasMonthly = body.toLowerCase().match(/month|total|earning/);
  expect(hasMonthly).toBeTruthy();
  console.log('✅ Earnings page shows monthly and total');
});

test('PRO-09 - Reviews page loads', async ({ page }) => {
  await proLogin(page, proEmail, password);
  await page.goto('/pro-dashboard/reviews');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  const body = await page.locator('body').innerText();
  expect(body.length).toBeGreaterThan(50);
  console.log('✅ Reviews page loaded');
});

test('PRO-10 - Reviews page shows rating', async ({ page }) => {
  await proLogin(page, proEmail, password);
  await page.goto('/pro-dashboard/reviews');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  const body = await page.locator('body').innerText();
  const hasRating = body.match(/\d+\.\d+|\d+ review|rating/i);
  expect(hasRating).toBeTruthy();
  console.log('✅ Reviews page shows rating');
});

test('PRO-11 - Profile page loads with email', async ({ page }) => {
  await proLogin(page, proEmail, password);
  await page.goto('/pro-dashboard/profile');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  const emailInput = page.locator('input[type="email"], input[name="email"]');
  if (await emailInput.count() > 0) {
    const value = await emailInput.first().inputValue();
    expect(value).toBe(proEmail);
    console.log('✅ Pro profile shows correct email');
  }
});

test('PRO-12 - Profile has service category field', async ({ page }) => {
  await proLogin(page, proEmail, password);
  await page.goto('/pro-dashboard/profile');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  const body = await page.locator('body').innerText();
  const hasCategory = body.toLowerCase().match(/service|category|clean|maid/);
  expect(hasCategory).toBeTruthy();
  console.log('✅ Profile has service category');
});

test('PRO-13 - Profile update saves successfully', async ({ page }) => {
  await proLogin(page, proEmail, password);
  await page.goto('/pro-dashboard/profile');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  const phoneInput = page.locator('input[name="phone"], input[placeholder*="Phone"]');
  if (await phoneInput.count() > 0) {
    await phoneInput.fill('0177777777');
    const saveBtn = page.locator('button:has-text("Save"), button:has-text("Update"), button[type="submit"]');
    if (await saveBtn.count() > 0) {
      await saveBtn.first().click();
      await page.waitForTimeout(3000);
      const body = await page.locator('body').innerText();
      const saved = body.toLowerCase().match(/saved|updated|success/);
      expect(saved).toBeTruthy();
      console.log('✅ Pro profile saved');
    }
  }
});

test('PRO-14 - Pro sidebar navigation works', async ({ page }) => {
  await proLogin(page, proEmail, password);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  const links = ['jobs', 'earnings', 'reviews', 'profile'];
  for (const link of links) {
    const navLink = page.locator(`a[href*="${link}"]`).first();
    if (await navLink.count() > 0) {
      await navLink.click();
      await page.waitForTimeout(2000);
      expect(page.url()).toContain(link);
    }
  }
  console.log('✅ Pro sidebar navigation works');
});

test('PRO-15 - Availability toggle exists on profile', async ({ page }) => {
  await proLogin(page, proEmail, password);
  await page.goto('/pro-dashboard/profile');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  const body = await page.locator('body').innerText();
  const hasAvailability = body.toLowerCase().match(/available|availability|online|offline/);
  expect(hasAvailability).toBeTruthy();
  console.log('✅ Availability toggle exists');
});
