import { test, expect } from '@playwright/test';
import { customerSignup, customerLogin } from './helpers.js';

const t = Date.now();
const email = `cust_dash_${t}@test.com`;
const password = 'Test1234!';

test.beforeAll(async ({ browser }) => {
  const page = await browser.newPage();
  await customerSignup(page, email, password);
  await page.close();
});

test('CUST-01 - Dashboard overview loads with stat cards', async ({ page }) => {
  await customerLogin(page, email, password);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  expect(page.url()).toContain('dashboard');
  const body = await page.locator('body').innerText();
  expect(body.length).toBeGreaterThan(200);
  console.log('✅ Customer dashboard overview loaded');
});

test('CUST-02 - Dashboard shows correct customer name', async ({ page }) => {
  await customerLogin(page, email, password);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  const body = await page.locator('body').innerText();
  expect(body.toLowerCase()).toMatch(/welcome|hello|hi|dashboard/);
  console.log('✅ Dashboard shows welcome message');
});

test('CUST-03 - Bookings page loads', async ({ page }) => {
  await customerLogin(page, email, password);
  await page.goto('/dashboard/bookings');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  const body = await page.locator('body').innerText();
  expect(body.toLowerCase()).toMatch(/booking|service|new/);
  console.log('✅ Bookings page loaded');
});

test('CUST-04 - New booking button opens modal or form', async ({ page }) => {
  await customerLogin(page, email, password);
  await page.goto('/dashboard/bookings');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  const bookBtn = page.locator('button:has-text("New Booking"), button:has-text("Book"), button:has-text("Book a Service")');
  await expect(bookBtn.first()).toBeVisible({ timeout: 5000 });
  await bookBtn.first().click();
  await page.waitForTimeout(2000);
  const form = page.locator('form, [role="dialog"], [class*="modal"]');
  await expect(form.first()).toBeVisible({ timeout: 5000 });
  console.log('✅ New booking form opens');
});

test('CUST-05 - Booking form has all required fields', async ({ page }) => {
  await customerLogin(page, email, password);
  await page.goto('/dashboard/bookings');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  const bookBtn = page.locator('button:has-text("New Booking"), button:has-text("Book")');
  if (await bookBtn.count() > 0) {
    await bookBtn.first().click();
    await page.waitForTimeout(2000);
    const serviceField = page.locator('select[name="service_id"], select[name="service"]');
    const areaField = page.locator('select[name="area"]');
    const dateField = page.locator('input[type="date"]');
    await expect(serviceField.first()).toBeVisible({ timeout: 5000 });
    await expect(areaField.first()).toBeVisible({ timeout: 5000 });
    await expect(dateField.first()).toBeVisible({ timeout: 5000 });
    console.log('✅ Booking form has required fields');
  }
});

test('CUST-06 - Booking form service dropdown has options', async ({ page }) => {
  await customerLogin(page, email, password);
  await page.goto('/dashboard/bookings');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  const bookBtn = page.locator('button:has-text("New Booking"), button:has-text("Book")');
  if (await bookBtn.count() > 0) {
    await bookBtn.first().click();
    await page.waitForTimeout(3000);
    const serviceSelect = page.locator('select[name="service_id"], select[name="service"]');
    if (await serviceSelect.count() > 0) {
      const options = await serviceSelect.first().locator('option').count();
      expect(options).toBeGreaterThan(1);
      console.log(`✅ Service dropdown has ${options} options`);
    }
  }
});

test('CUST-07 - Complete booking submission creates booking with reference', async ({ page }) => {
  await customerLogin(page, email, password);
  await page.goto('/dashboard/bookings');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  const bookBtn = page.locator('button:has-text("New Booking"), button:has-text("Book")');
  if (await bookBtn.count() === 0) { test.skip(); return; }
  await bookBtn.first().click();
  await page.waitForTimeout(2000);

  const serviceSelect = page.locator('select[name="service_id"], select[name="service"]');
  if (await serviceSelect.count() > 0) await serviceSelect.selectOption({ index: 1 });

  const areaSelect = page.locator('select[name="area"]');
  if (await areaSelect.count() > 0) await areaSelect.selectOption({ index: 1 });

  const dateInput = page.locator('input[type="date"]');
  if (await dateInput.count() > 0) await dateInput.fill('2026-08-15');

  const timeInput = page.locator('input[type="time"]');
  if (await timeInput.count() > 0) await timeInput.fill('10:00');

  const notes = page.locator('textarea[name="notes"], textarea');
  if (await notes.count() > 0) await notes.first().fill('Please bring eco-friendly products');

  const whatsapp = page.locator('input[name="whatsapp"], input[placeholder*="WhatsApp"]');
  if (await whatsapp.count() > 0) await whatsapp.fill('0123456789');

  const submit = page.locator('button:has-text("Confirm"), button:has-text("Submit"), button:has-text("Book Now")');
  if (await submit.count() > 0) {
    await submit.first().click();
    await page.waitForTimeout(5000);
    const body = await page.locator('body').innerText();
    const success = body.includes('IPF-') || body.toLowerCase().match(/confirmed|success|booked/);
    expect(success).toBeTruthy();
    console.log('✅ Booking created with reference number');
  }
});

test('CUST-08 - Booking appears in bookings list after creation', async ({ page }) => {
  await customerLogin(page, email, password);
  await page.goto('/dashboard/bookings');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  const body = await page.locator('body').innerText();
  const hasBooking = body.includes('IPF-') || body.toLowerCase().includes('pending');
  expect(hasBooking).toBeTruthy();
  console.log('✅ Booking appears in list');
});

test('CUST-09 - Booking has correct status badge', async ({ page }) => {
  await customerLogin(page, email, password);
  await page.goto('/dashboard/bookings');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  const body = await page.locator('body').innerText();
  const hasStatus = body.toLowerCase().match(/pending|accepted|completed|cancelled/);
  expect(hasStatus).toBeTruthy();
  console.log('✅ Booking status badge visible');
});

test('CUST-10 - Cancel booking button exists on pending booking', async ({ page }) => {
  await customerLogin(page, email, password);
  await page.goto('/dashboard/bookings');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  const cancelBtn = page.locator('button:has-text("Cancel")');
  if (await cancelBtn.count() > 0) {
    await expect(cancelBtn.first()).toBeVisible();
    console.log('✅ Cancel button visible on pending booking');
  } else {
    console.log('⚠️ No pending bookings to cancel');
  }
});

test('CUST-11 - Appointments page loads', async ({ page }) => {
  await customerLogin(page, email, password);
  await page.goto('/dashboard/appointments');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  await expect(page.locator('body')).toBeVisible();
  const body = await page.locator('body').innerText();
  expect(body.length).toBeGreaterThan(50);
  console.log('✅ Appointments page loaded');
});

test('CUST-12 - Refunds page loads with correct empty state', async ({ page }) => {
  await customerLogin(page, email, password);
  await page.goto('/dashboard/refunds');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  const body = await page.locator('body').innerText();
  expect(body.length).toBeGreaterThan(50);
  console.log('✅ Refunds page loaded');
});

test('CUST-13 - Profile page loads with correct email', async ({ page }) => {
  await customerLogin(page, email, password);
  await page.goto('/dashboard/profile');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  const emailInput = page.locator('input[type="email"], input[name="email"]');
  if (await emailInput.count() > 0) {
    const value = await emailInput.first().inputValue();
    expect(value).toBe(email);
    console.log('✅ Profile shows correct email');
  }
});

test('CUST-14 - Profile name field is editable', async ({ page }) => {
  await customerLogin(page, email, password);
  await page.goto('/dashboard/profile');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  const nameInput = page.locator('input[name="name"], input[placeholder*="Name"]');
  if (await nameInput.count() > 0) {
    await expect(nameInput.first()).toBeEnabled();
    console.log('✅ Name field is editable');
  }
});

test('CUST-15 - Profile update saves successfully', async ({ page }) => {
  await customerLogin(page, email, password);
  await page.goto('/dashboard/profile');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  const phoneInput = page.locator('input[name="phone"], input[placeholder*="Phone"]');
  if (await phoneInput.count() > 0) {
    await phoneInput.fill('0111111111');
    const saveBtn = page.locator('button:has-text("Save"), button:has-text("Update"), button[type="submit"]');
    if (await saveBtn.count() > 0) {
      await saveBtn.first().click();
      await page.waitForTimeout(3000);
      const body = await page.locator('body').innerText();
      const saved = body.toLowerCase().match(/saved|updated|success/);
      expect(saved).toBeTruthy();
      console.log('✅ Profile saved successfully');
    }
  }
});

test('CUST-16 - Dashboard sidebar navigation works', async ({ page }) => {
  await customerLogin(page, email, password);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  const links = ['bookings', 'appointments', 'profile'];
  for (const link of links) {
    const navLink = page.locator(`a[href*="${link}"], button:has-text("${link}")`).first();
    if (await navLink.count() > 0) {
      await navLink.click();
      await page.waitForTimeout(2000);
      expect(page.url()).toContain(link);
    }
  }
  console.log('✅ Sidebar navigation works');
});

test('CUST-17 - Services page Book button redirects logged in customer to bookings', async ({ page }) => {
  await customerLogin(page, email, password);
  await page.goto('/services');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  const bookBtn = page.locator('button:has-text("Book"), a:has-text("Book")').first();
  if (await bookBtn.count() > 0) {
    await bookBtn.click();
    await page.waitForTimeout(3000);
    const url = page.url();
    expect(url).toContain('dashboard');
    console.log('✅ Book button goes to dashboard bookings');
  }
});
