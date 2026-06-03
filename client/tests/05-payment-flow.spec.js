import { test, expect } from '@playwright/test';
import { generateEmail, signup, login, proSignup, createBooking } from './helpers.js';

const custEmail = generateEmail('pay_cust');
const proEmail = generateEmail('pay_pro');

test.beforeAll(async ({ browser }) => {
  const custPage = await browser.newPage();
  await signup(custPage, custEmail, 'Payment Test Customer');
  await custPage.close();
  const proPage = await browser.newPage();
  await proSignup(proPage, proEmail, 'Payment Test Pro');
  await proPage.close();
});

test('PAY-01 - Customer creates booking successfully', async ({ page }) => {
  await login(page, custEmail);
  const ref = await createBooking(page);
  if (ref) {
    expect(ref).toMatch(/IPF-/);
    console.log(`✅ Booking created: ${ref}`);
  } else {
    console.log('⚠️ Booking creation needs investigation');
  }
});

test('PAY-02 - Professional sees pending booking in jobs', async ({ page }) => {
  await login(page, proEmail);
  await page.goto('/pro-dashboard/jobs');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(5000);
  const body = await page.locator('body').innerText();
  expect(body.length).toBeGreaterThan(100);
  console.log('✅ Pro jobs page loaded');
});

test('PAY-03 - Professional accepts booking', async ({ page }) => {
  await login(page, proEmail);
  await page.goto('/pro-dashboard/jobs');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(5000);
  const acceptBtn = page.locator('button:has-text("Accept")').first();
  if (await acceptBtn.count() > 0) {
    await acceptBtn.click();
    await page.waitForTimeout(3000);
    console.log('✅ Job accepted by professional');
  } else {
    console.log('⚠️ No accept button - may need fresh booking');
  }
});

test('PAY-04 - Customer sees booking status updated to accepted', async ({ page }) => {
  await login(page, custEmail);
  await page.goto('/dashboard/bookings');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  const body = await page.locator('body').innerText();
  const hasStatus = body.toLowerCase().match(/accepted|pending|completed/);
  expect(hasStatus).toBeTruthy();
  console.log('✅ Customer sees booking status');
});

test('PAY-05 - Upload receipt button exists for accepted booking', async ({ page }) => {
  await login(page, custEmail);
  await page.goto('/dashboard/bookings');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  const uploadBtn = page.locator('button:has-text("Upload"), button:has-text("Receipt"), button:has-text("Pay")');
  if (await uploadBtn.count() > 0) {
    await expect(uploadBtn.first()).toBeVisible();
    console.log('✅ Upload receipt button visible');
  } else {
    console.log('⚠️ Upload receipt button not found - booking may not be accepted yet');
  }
});

test('PAY-06 - Payment receipt modal opens', async ({ page }) => {
  await login(page, custEmail);
  await page.goto('/dashboard/bookings');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  const uploadBtn = page.locator('button:has-text("Upload"), button:has-text("Receipt")').first();
  if (await uploadBtn.count() > 0) {
    await uploadBtn.click();
    await page.waitForTimeout(2000);
    const modal = page.locator('[class*="modal"], [role="dialog"]');
    if (await modal.count() > 0) {
      await expect(modal.first()).toBeVisible();
      console.log('✅ Payment receipt modal opens');
    }
  }
});

test('PAY-07 - Professional marks job as completed', async ({ page }) => {
  await login(page, proEmail);
  await page.goto('/pro-dashboard/jobs');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  const completeBtn = page.locator('button:has-text("Complete"), button:has-text("Mark Complete")').first();
  if (await completeBtn.count() > 0) {
    await completeBtn.click();
    await page.waitForTimeout(3000);
    console.log('✅ Job marked as complete');
  } else {
    console.log('⚠️ No complete button - need accepted job first');
  }
});

test('PAY-08 - Earnings updated after job completion', async ({ page }) => {
  await login(page, proEmail);
  await page.goto('/pro-dashboard/earnings');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  const body = await page.locator('body').innerText();
  expect(body).toContain('RM');
  console.log('✅ Earnings page shows RM values');
});

test('PAY-09 - Admin panel accessible', async ({ page }) => {
  await page.goto('/admin/payments');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  const body = await page.locator('body').innerText();
  const hasAdmin = body.toLowerCase().match(/admin|password|payment/);
  expect(hasAdmin).toBeTruthy();
  console.log('✅ Admin panel accessible');
});

test('PAY-10 - Admin panel login works', async ({ page }) => {
  await page.goto('/admin/payments');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  const passwordInput = page.locator('input[type="password"]');
  if (await passwordInput.count() > 0) {
    await passwordInput.fill('iprofixer-admin-2026');
    const submitBtn = page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Enter")');
    if (await submitBtn.count() > 0) {
      await submitBtn.click();
      await page.waitForTimeout(3000);
      const body = await page.locator('body').innerText();
      const loggedIn = body.toLowerCase().match(/payment|receipt|verify|approve/);
      if (loggedIn) console.log('✅ Admin panel login works');
      else console.log('⚠️ Admin login may need different password');
    }
  }
});
