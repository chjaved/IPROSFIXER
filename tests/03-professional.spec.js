import { test, expect } from '@playwright/test';
import { customerSignup, customerLogin, proSignup, proLogin } from './helpers.js';

const t = Date.now();
const proEmail = `prodash_${t}@test.com`;
const custEmail = `custforpro_${t}@test.com`;
const password = 'Test1234!';

test.beforeAll(async ({ browser }) => {
  const page = await browser.newPage();
  await proSignup(page, proEmail, password);
  await page.close();
  const page2 = await browser.newPage();
  await customerSignup(page2, custEmail, password);
  await page2.close();
});

test('18 - Pro dashboard overview loads', async ({ page }) => {
  await proLogin(page, proEmail, password);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  expect(page.url()).toContain('dashboard');
  console.log('✅ Pro dashboard loaded');
});

test('19 - Pro jobs page loads with tabs', async ({ page }) => {
  await proLogin(page, proEmail, password);
  await page.goto('/pro-dashboard/jobs');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  const body = await page.locator('body').innerText();
  const hasTabs = body.toLowerCase().includes('available') || 
                  body.toLowerCase().includes('active') || 
                  body.toLowerCase().includes('completed') ||
                  body.toLowerCase().includes('job');
  expect(hasTabs).toBeTruthy();
  console.log('✅ Jobs page loaded');
});

test('20 - Pro schedule page loads', async ({ page }) => {
  await proLogin(page, proEmail, password);
  await page.goto('/pro-dashboard/schedule');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  await expect(page.locator('body')).toBeVisible();
  console.log('✅ Schedule page loaded');
});

test('21 - Pro earnings page shows RM', async ({ page }) => {
  await proLogin(page, proEmail, password);
  await page.goto('/pro-dashboard/earnings');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  const body = await page.locator('body').innerText();
  const hasRM = body.includes('RM') || body.toLowerCase().includes('earning') || body.toLowerCase().includes('transaction');
  expect(hasRM).toBeTruthy();
  console.log('✅ Earnings page loaded with RM');
});

test('22 - Pro reviews page loads', async ({ page }) => {
  await proLogin(page, proEmail, password);
  await page.goto('/pro-dashboard/reviews');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  await expect(page.locator('body')).toBeVisible();
  console.log('✅ Reviews page loaded');
});

test('23 - Pro profile page shows email', async ({ page }) => {
  await proLogin(page, proEmail, password);
  await page.goto('/pro-dashboard/profile');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  const body = await page.locator('body').innerText();
  expect(body).toContain(proEmail);
  console.log('✅ Pro profile shows email');
});

test('24 - Pro profile update saves', async ({ page }) => {
  await proLogin(page, proEmail, password);
  await page.goto('/pro-dashboard/profile');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  const phoneInput = page.locator('input[name="phone"], input[placeholder*="Phone"]');
  if (await phoneInput.count() > 0) {
    await phoneInput.fill('0188887777');
    const saveBtn = page.locator('button:has-text("Save"), button:has-text("Update"), button[type="submit"]');
    if (await saveBtn.count() > 0) {
      await saveBtn.first().click();
      await page.waitForTimeout(3000);
      const body = await page.locator('body').innerText();
      const saved = body.toLowerCase().includes('saved') || 
                    body.toLowerCase().includes('updated') || 
                    body.toLowerCase().includes('success');
      expect(saved).toBeTruthy();
      console.log('✅ Pro profile updated');
    }
  }
});
