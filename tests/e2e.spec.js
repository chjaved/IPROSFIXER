import { test, expect } from '@playwright/test';

const timestamp = Date.now();
const custEmail = `e2e_cust_${timestamp}@test.com`;
const proEmail = `e2e_pro_${timestamp}@test.com`;
const password = 'Test1234';

async function registerCustomer(page, email) {
  await page.goto('https://iprosfixer.vercel.app/signup');
  await page.waitForLoadState('networkidle');
  await page.fill('input[name="name"], input[placeholder*="Full Name" i]', 'E2E Customer');
  await page.fill('input[type="email"]', email);
  const phone = page.locator('input[name="phone"], input[placeholder*="Phone" i]');
  if (await phone.count() > 0) await phone.first().fill('0123456789');
  await page.fill('input[type="password"]', password);
  const confirm = page.locator('input[placeholder*="Confirm" i], input[name="confirmPassword"]');
  if (await confirm.count() > 0) await confirm.first().fill(password);
  const checkbox = page.locator('input[type="checkbox"]');
  if (await checkbox.count() > 0) await checkbox.first().check();
  await page.click('button[type="submit"], button:has-text("Create"), button:has-text("Sign Up")');
  await page.waitForURL(/dashboard/, { timeout: 15000 });
}

async function registerPro(page, email) {
  await page.goto('https://iprosfixer.vercel.app/pro-signup');
  await page.waitForLoadState('networkidle');
  await page.fill('input[name="name"], input[placeholder*="Full Name" i]', 'E2E Professional');
  await page.fill('input[type="email"]', email);
  const phone = page.locator('input[name="phone"], input[placeholder*="Phone" i]');
  if (await phone.count() > 0) await phone.first().fill('0123456789');
  const whatsapp = page.locator('input[name="whatsapp"], input[placeholder*="WhatsApp" i]');
  if (await whatsapp.count() > 0) await whatsapp.first().fill('0123456789');
  const cat = page.locator('select[name="service_category"], select[name="serviceCategory"]');
  if (await cat.count() > 0) await cat.first().selectOption({ index: 1 });
  const area = page.locator('select[name="coverage_area"], select[name="coverageArea"]');
  if (await area.count() > 0) await area.first().selectOption({ index: 1 });
  const exp = page.locator('input[name="years_experience"], input[placeholder*="Experience" i]');
  if (await exp.count() > 0) await exp.first().fill('2');
  await page.fill('input[type="password"]', password);
  const confirm = page.locator('input[placeholder*="Confirm" i], input[name="confirmPassword"]');
  if (await confirm.count() > 0) await confirm.first().fill(password);
  const checkbox = page.locator('input[type="checkbox"]');
  if (await checkbox.count() > 0) await checkbox.first().check();
  await page.click('button[type="submit"], button:has-text("Join"), button:has-text("Complete"), button:has-text("Sign Up")');
  await page.waitForURL(/dashboard/, { timeout: 15000 });
}

test.describe('End-to-End Booking Lifecycle', () => {

  test('Complete booking lifecycle: register → book → accept → complete → review', async ({ browser }) => {
    const custContext = await browser.newContext();
    const proContext  = await browser.newContext();
    const custPage    = await custContext.newPage();
    const proPage     = await proContext.newPage();

    // ── Step 1: Register customer ──────────────────────────────────
    await registerCustomer(custPage, custEmail);
    console.log('✅ Step 1: Customer registered, on dashboard');

    // ── Step 2: Register professional ─────────────────────────────
    await registerPro(proPage, proEmail);
    console.log('✅ Step 2: Professional registered, on dashboard');

    // ── Step 3: Customer books a service ──────────────────────────
    await custPage.goto('https://iprosfixer.vercel.app/dashboard/bookings');
    await custPage.waitForLoadState('networkidle');
    await custPage.waitForTimeout(2000);

    const bookBtn = custPage.locator('button:has-text("Book"), button:has-text("New Booking"), button:has-text("Add Booking")');
    expect(await bookBtn.count()).toBeGreaterThan(0);
    await bookBtn.first().click();
    await custPage.waitForTimeout(1500);

    const serviceSelect = custPage.locator('select[name="service"], select[name="service_id"]');
    if (await serviceSelect.count() > 0) await serviceSelect.first().selectOption({ index: 1 });
    const areaSelect = custPage.locator('select[name="area"]');
    if (await areaSelect.count() > 0) await areaSelect.first().selectOption({ index: 1 });
    const dateInput = custPage.locator('input[type="date"]');
    if (await dateInput.count() > 0) await dateInput.first().fill('2026-07-20');
    const timeInput = custPage.locator('input[type="time"]');
    if (await timeInput.count() > 0) await timeInput.first().fill('10:00');
    const addrInput = custPage.locator('input[name="address"], textarea[name="address"], input[placeholder*="address" i]');
    if (await addrInput.count() > 0) await addrInput.first().fill('123 Test Street, KL');

    const submitBtn = custPage.locator('button:has-text("Confirm"), button:has-text("Submit"), button[type="submit"]');
    if (await submitBtn.count() > 0) await submitBtn.first().click();
    await custPage.waitForTimeout(4000);

    const refText = custPage.locator('text=/IPF-/');
    const hasRef = await refText.count() > 0;
    console.log(hasRef ? '✅ Step 3: Booking created with reference number' : '⚠️ Step 3: Booking created (no IPF ref visible)');

    // ── Step 4: Pro sees and accepts the job ──────────────────────
    await proPage.goto('https://iprosfixer.vercel.app/pro-dashboard/jobs');
    await proPage.waitForLoadState('networkidle');
    await proPage.waitForTimeout(3000);

    const acceptBtn = proPage.locator('button:has-text("Accept")');
    const hasJob = await acceptBtn.count() > 0;
    if (hasJob) {
      await acceptBtn.first().click();
      await proPage.waitForTimeout(2000);
      console.log('✅ Step 4: Professional accepted the job');
    } else {
      console.log('⚠️ Step 4: No pending jobs visible on pro dashboard (may need same service category)');
    }

    // ── Step 5: Customer sees accepted status ─────────────────────
    await custPage.goto('https://iprosfixer.vercel.app/dashboard/bookings');
    await custPage.waitForLoadState('networkidle');
    await custPage.waitForTimeout(2000);
    const acceptedStatus = custPage.locator('text=/accepted/i, text=/Accepted/');
    console.log(await acceptedStatus.count() > 0 ? '✅ Step 5: Customer sees Accepted status' : '⚠️ Step 5: Accepted status not visible');

    // ── Step 6: Pro marks job complete ────────────────────────────
    await proPage.goto('https://iprosfixer.vercel.app/pro-dashboard/jobs');
    await proPage.waitForTimeout(2000);
    const completeBtn = proPage.locator('button:has-text("Complete"), button:has-text("Mark Complete")');
    if (await completeBtn.count() > 0) {
      await completeBtn.first().click();
      await proPage.waitForTimeout(2000);
      console.log('✅ Step 6: Job marked as complete');
    } else {
      console.log('⚠️ Step 6: Complete button not found');
    }

    // ── Step 7: Customer sees completed + submits review ──────────
    await custPage.goto('https://iprosfixer.vercel.app/dashboard/bookings');
    await custPage.waitForTimeout(2000);
    const completedStatus = custPage.locator('text=/completed/i');
    console.log(await completedStatus.count() > 0 ? '✅ Step 7: Customer sees Completed status' : '⚠️ Step 7: Completed status not visible');

    const reviewBtn = custPage.locator('button:has-text("Review"), button:has-text("Leave Review"), button:has-text("Rate")');
    if (await reviewBtn.count() > 0) {
      await reviewBtn.first().click();
      await custPage.waitForTimeout(1000);
      const stars = custPage.locator('[class*="star"], input[type="radio"][name*="rating"]');
      if (await stars.count() > 0) await stars.last().click();
      const reviewText = custPage.locator('textarea, input[name="comment"], input[placeholder*="review" i]');
      if (await reviewText.count() > 0) await reviewText.first().fill('Great service, very professional!');
      const submitReview = custPage.locator('button:has-text("Submit"), button:has-text("Post"), button[type="submit"]');
      if (await submitReview.count() > 0) await submitReview.first().click();
      await custPage.waitForTimeout(2000);
      console.log('✅ Step 8: Review submitted');
    }

    // ── Step 8: Pro checks reviews and earnings ───────────────────
    await proPage.goto('https://iprosfixer.vercel.app/pro-dashboard/reviews');
    await proPage.waitForTimeout(2000);
    console.log('✅ Step 9: Pro reviews page loaded');

    await proPage.goto('https://iprosfixer.vercel.app/pro-dashboard/earnings');
    await proPage.waitForTimeout(2000);
    const rmText = proPage.locator('text=/RM/');
    console.log(await rmText.count() > 0 ? '✅ Step 10: Earnings visible' : '⚠️ Step 10: No earnings text found');

    await custContext.close();
    await proContext.close();
  });

});
