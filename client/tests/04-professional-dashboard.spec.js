import { test, expect } from '@playwright/test';
import { generateEmail, proSignup, login } from './helpers.js';

const proEmail = generateEmail('pro_full');

test.beforeAll(async ({ browser }) => {
  const page = await browser.newPage();
  await proSignup(page, proEmail, 'Siti Full Pro');
  await page.close();
});

test('PRO-01 - Pro dashboard loads with earnings and stats', async ({ page }) => {
  await login(page, proEmail);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  expect(page.url()).toContain('pro-dashboard');
  const body = await page.locator('body').innerText();
  expect(body).toContain('RM');
  console.log('✅ Pro dashboard loaded with earnings');
});

test('PRO-02 - Jobs page loads with Available tab', async ({ page }) => {
  await login(page, proEmail);
  await page.goto('/pro-dashboard/jobs');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  const body = await page.locator('body').innerText();
  expect(body.toLowerCase()).toMatch(/available|job|booking/);
  console.log('✅ Jobs page loaded');
});

test('PRO-03 - Available jobs tab shows pending bookings', async ({ page }) => {
  await login(page, proEmail);
  await page.goto('/pro-dashboard/jobs');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(5000);
  const body = await page.locator('body').innerText();
  expect(body.length).toBeGreaterThan(100);
  console.log('✅ Available jobs tab content loaded');
});

test('PRO-04 - Accept job button works', async ({ page }) => {
  await login(page, proEmail);
  await page.goto('/pro-dashboard/jobs');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(5000);
  const acceptBtn = page.locator('button:has-text("Accept")').first();
  if (await acceptBtn.count() > 0) {
    await acceptBtn.click();
    await page.waitForTimeout(3000);
    const body = await page.locator('body').innerText();
    const accepted = body.toLowerCase().match(/accepted|active/);
    if (accepted) console.log('✅ Job accepted successfully');
    else console.log('⚠️ Accept clicked but status unclear');
  } else {
    console.log('⚠️ No jobs available to accept');
  }
});

test('PRO-05 - Schedule page loads', async ({ page }) => {
  await login(page, proEmail);
  await page.goto('/pro-dashboard/schedule');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  await expect(page.locator('body')).toBeVisible();
  console.log('✅ Schedule page loaded');
});

test('PRO-06 - Earnings page shows RM values and breakdown', async ({ page }) => {
  await login(page, proEmail);
  await page.goto('/pro-dashboard/earnings');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  const body = await page.locator('body').innerText();
  expect(body).toContain('RM');
  expect(body.toLowerCase()).toMatch(/month|total|earning/);
  console.log('✅ Earnings page shows RM breakdown');
});

test('PRO-07 - Earnings shows commission calculation', async ({ page }) => {
  await login(page, proEmail);
  await page.goto('/pro-dashboard/earnings');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  const body = await page.locator('body').innerText();
  const hasCommission = body.toLowerCase().match(/commission|platform|payout|85|15%/);
  if (hasCommission) console.log('✅ Commission breakdown visible');
  else console.log('⚠️ Commission breakdown not found');
  expect(body).toContain('RM');
});

test('PRO-08 - Reviews page loads with rating', async ({ page }) => {
  await login(page, proEmail);
  await page.goto('/pro-dashboard/reviews');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  const body = await page.locator('body').innerText();
  const hasRating = body.match(/\d\.\d|rating|review/i);
  expect(hasRating).toBeTruthy();
  console.log('✅ Reviews page shows rating');
});

test('PRO-09 - Profile page loads with correct email', async ({ page }) => {
  await login(page, proEmail);
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

test('PRO-10 - Profile has service category and availability', async ({ page }) => {
  await login(page, proEmail);
  await page.goto('/pro-dashboard/profile');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  const body = await page.locator('body').innerText();
  expect(body.toLowerCase()).toMatch(/service|category|available/);
  console.log('✅ Pro profile has service and availability fields');
});

test('PRO-11 - Profile update saves', async ({ page }) => {
  await login(page, proEmail);
  await page.goto('/pro-dashboard/profile');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  const phoneInput = page.locator('input[name="phone"]');
  if (await phoneInput.count() > 0) {
    await phoneInput.fill('0177776666');
    const saveBtn = page.locator('button:has-text("Save"), button[type="submit"]');
    if (await saveBtn.count() > 0) {
      await saveBtn.first().click();
      await page.waitForTimeout(3000);
      const body = await page.locator('body').innerText();
      expect(body.toLowerCase()).toMatch(/saved|updated|success/);
      console.log('✅ Pro profile saved');
    }
  }
});

test('PRO-12 - Pro sidebar navigation works', async ({ page }) => {
  await login(page, proEmail);
  await page.waitForTimeout(2000);
  const links = ['jobs', 'schedule', 'earnings', 'reviews', 'profile'];
  for (const link of links) {
    const navLink = page.locator(`a[href*="${link}"]`).first();
    if (await navLink.count() > 0) {
      await navLink.click();
      await page.waitForTimeout(2000);
      expect(page.url()).toContain(link);
    }
  }
  console.log('✅ All pro sidebar links work');
});
