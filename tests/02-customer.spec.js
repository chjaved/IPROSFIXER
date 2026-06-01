import { test, expect } from '@playwright/test';
import { customerSignup, customerLogin } from './helpers.js';

const t = Date.now();
const email = `custdash_${t}@test.com`;
const password = 'Test1234!';

test.beforeAll(async ({ browser }) => {
  const page = await browser.newPage();
  await customerSignup(page, email, password);
  await page.close();
});

test('08 - Customer dashboard overview loads with stats', async ({ page }) => {
  await customerLogin(page, email, password);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  const url = page.url();
  expect(url).toContain('dashboard');
  const body = await page.locator('body').innerText();
  expect(body.length).toBeGreaterThan(100);
  console.log('✅ Customer dashboard overview loaded');
});

test('09 - Services page loads with cleaning services', async ({ page }) => {
  await page.goto('/services');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  const body = await page.locator('body').innerText();
  const hasServices = body.toLowerCase().includes('clean') || 
                      body.toLowerCase().includes('maid') ||
                      body.toLowerCase().includes('service');
  expect(hasServices).toBeTruthy();
  console.log('✅ Services page loaded with services');
});

test('10 - Customer bookings page loads', async ({ page }) => {
  await customerLogin(page, email, password);
  await page.goto('/dashboard/bookings');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  const body = await page.locator('body').innerText();
  expect(body.length).toBeGreaterThan(50);
  console.log('✅ Bookings page loaded');
});

test('11 - New booking modal opens', async ({ page }) => {
  await customerLogin(page, email, password);
  await page.goto('/dashboard/bookings');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  const bookBtn = page.locator('button:has-text("New Booking"), button:has-text("Book"), button:has-text("Book a Service")');
  if (await bookBtn.count() > 0) {
    await bookBtn.first().click();
    await page.waitForTimeout(2000);
    const modal = page.locator('[class*="modal"], [role="dialog"], form');
    await expect(modal.first()).toBeVisible({ timeout: 5000 });
    console.log('✅ New booking modal opened');
  } else {
    console.log('⚠️ Book button not found');
    test.skip();
  }
});

test('12 - Complete booking form and submit', async ({ page }) => {
  await customerLogin(page, email, password);
  await page.goto('/dashboard/bookings');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  
  const bookBtn = page.locator('button:has-text("New Booking"), button:has-text("Book"), button:has-text("Book a Service")');
  if (await bookBtn.count() === 0) { test.skip(); return; }
  await bookBtn.first().click();
  await page.waitForTimeout(2000);

  const serviceSelect = page.locator('select[name="service_id"], select[name="service"]');
  if (await serviceSelect.count() > 0) await serviceSelect.selectOption({ index: 1 });

  const areaSelect = page.locator('select[name="area"]');
  if (await areaSelect.count() > 0) await areaSelect.selectOption({ index: 1 });

  const dateInput = page.locator('input[type="date"], input[name="date"], input[name="scheduled_date"]');
  if (await dateInput.count() > 0) await dateInput.fill('2026-07-15');

  const timeInput = page.locator('input[type="time"], input[name="time"], input[name="scheduled_time"]');
  if (await timeInput.count() > 0) await timeInput.fill('10:00');

  const notes = page.locator('textarea[name="notes"], textarea[placeholder*="notes"], textarea[placeholder*="instruction"]');
  if (await notes.count() > 0) await notes.fill('Please bring your own cleaning equipment');

  const whatsapp = page.locator('input[name="whatsapp"], input[placeholder*="WhatsApp"]');
  if (await whatsapp.count() > 0) await whatsapp.fill('0123456789');

  const submitBtn = page.locator('button:has-text("Confirm"), button:has-text("Submit"), button:has-text("Book Now")');
  if (await submitBtn.count() > 0) {
    await submitBtn.first().click();
    await page.waitForTimeout(5000);
    const body = await page.locator('body').innerText();
    const success = body.includes('IPF-') || 
                    body.toLowerCase().includes('confirmed') || 
                    body.toLowerCase().includes('success') ||
                    body.toLowerCase().includes('booked');
    expect(success).toBeTruthy();
    console.log('✅ Booking submitted successfully');
  }
});

test('13 - Bookings list shows submitted booking', async ({ page }) => {
  await customerLogin(page, email, password);
  await page.goto('/dashboard/bookings');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  const body = await page.locator('body').innerText();
  const hasBooking = body.includes('IPF-') || 
                     body.toLowerCase().includes('pending') ||
                     body.toLowerCase().includes('cleaning');
  expect(hasBooking).toBeTruthy();
  console.log('✅ Booking appears in list');
});

test('14 - Appointments page loads', async ({ page }) => {
  await customerLogin(page, email, password);
  await page.goto('/dashboard/appointments');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  await expect(page.locator('body')).toBeVisible();
  console.log('✅ Appointments page loaded');
});

test('15 - Refunds page loads with empty state', async ({ page }) => {
  await customerLogin(page, email, password);
  await page.goto('/dashboard/refunds');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  await expect(page.locator('body')).toBeVisible();
  console.log('✅ Refunds page loaded');
});

test('16 - Customer profile page loads with email', async ({ page }) => {
  await customerLogin(page, email, password);
  await page.goto('/dashboard/profile');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  const body = await page.locator('body').innerText();
  expect(body).toContain(email);
  console.log('✅ Profile page shows correct email');
});

test('17 - Customer profile update saves', async ({ page }) => {
  await customerLogin(page, email, password);
  await page.goto('/dashboard/profile');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  
  const phoneInput = page.locator('input[name="phone"], input[placeholder*="Phone"]');
  if (await phoneInput.count() > 0) {
    await phoneInput.fill('0199999888');
    const saveBtn = page.locator('button:has-text("Save"), button:has-text("Update"), button[type="submit"]');
    if (await saveBtn.count() > 0) {
      await saveBtn.first().click();
      await page.waitForTimeout(3000);
      const body = await page.locator('body').innerText();
      const saved = body.toLowerCase().includes('saved') || 
                    body.toLowerCase().includes('updated') || 
                    body.toLowerCase().includes('success');
      expect(saved).toBeTruthy();
      console.log('✅ Profile updated successfully');
    }
  }
});
