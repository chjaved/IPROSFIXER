import { test, expect } from '@playwright/test';

const password = 'Test1234';

test.describe('Customer Dashboard', () => {
  let testEmail;

  test.beforeEach(async ({ page }) => {
    // Generate unique email for each test to avoid "already exists" error
    testEmail = `cust_${Date.now()}_${Math.random().toString(36).substr(2, 5)}@test.com`;

    await page.goto('/signup');
    await page.waitForLoadState('networkidle');
    await page.fill('input[name="name"], input[placeholder*="Full Name" i]', 'Test Customer');
    await page.fill('input[type="email"]', testEmail);
    const phone = page.locator('input[name="phone"], input[placeholder*="Phone" i]');
    if (await phone.count() > 0) await phone.first().fill('0123456789');
    await page.fill('input[type="password"]', password);
    const confirm = page.locator('input[placeholder*="Confirm" i], input[name="confirmPassword"]');
    if (await confirm.count() > 0) await confirm.first().fill(password);
    const checkbox = page.locator('input[type="checkbox"]');
    if (await checkbox.count() > 0) await checkbox.first().check();
    await page.click('button[type="submit"], button:has-text("Create"), button:has-text("Sign Up")');
    await page.waitForURL(/dashboard/, { timeout: 15000 });
  });

  test('Dashboard overview loads with stats', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1, h2').first()).toBeVisible({ timeout: 8000 });
    const noError = await page.locator('text=/error/i').count();
    expect(noError).toBe(0);
  });

  test('Bookings page loads', async ({ page }) => {
    await page.goto('/dashboard/bookings');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1, h2').first()).toBeVisible({ timeout: 8000 });
  });

  test('Booking form opens and submits', async ({ page }) => {
    await page.goto('/dashboard/bookings');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    const bookBtn = page.locator('button:has-text("Book"), button:has-text("New Booking"), button:has-text("Add Booking")');
    if (await bookBtn.count() > 0) {
      await bookBtn.first().click();
      await page.waitForTimeout(1500);
      const serviceSelect = page.locator('select[name="service"], select[name="service_id"]');
      if (await serviceSelect.count() > 0) await serviceSelect.first().selectOption({ index: 1 });
      const areaSelect = page.locator('select[name="area"]');
      if (await areaSelect.count() > 0) await areaSelect.first().selectOption({ index: 1 });
      const dateInput = page.locator('input[type="date"], input[name="date"]');
      if (await dateInput.count() > 0) await dateInput.first().fill('2026-07-15');
      const timeInput = page.locator('input[type="time"], input[name="time"]');
      if (await timeInput.count() > 0) await timeInput.first().fill('10:00');
      const addrInput = page.locator('input[name="address"], textarea[name="address"], input[placeholder*="address" i]');
      if (await addrInput.count() > 0) await addrInput.first().fill('123 Test Street, KL');
      const submitBtn = page.locator('button:has-text("Confirm"), button:has-text("Submit"), button[type="submit"]');
      if (await submitBtn.count() > 0) await submitBtn.first().click();
      await page.waitForTimeout(4000);
      const ref = page.locator('text=/IPF-/');
      const success = page.locator('[class*="success"]');
      const confirmed = page.locator('text=/confirmed/i');
      const hasRef = await ref.count() > 0;
      const hasSuccess = await success.count() > 0;
      const hasConfirmed = await confirmed.count() > 0;
      expect(hasRef || hasSuccess || hasConfirmed).toBeTruthy();
    } else {
      test.skip();
    }
  });

  test('Profile page loads and shows email', async ({ page }) => {
    await page.goto('/dashboard/profile');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    const emailVisible = page.locator(`text=${testEmail}`);
    await expect(emailVisible).toBeVisible({ timeout: 8000 });
  });

  test('Profile update saves successfully', async ({ page }) => {
    await page.goto('/dashboard/profile');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    const phoneInput = page.locator('input[name="phone"], input[placeholder*="Phone" i]');
    if (await phoneInput.count() > 0) {
      await phoneInput.first().fill('0199999999');
      const saveBtn = page.locator('button:has-text("Save"), button:has-text("Update"), button[type="submit"]');
      if (await saveBtn.count() > 0) {
        await saveBtn.first().click();
        await page.waitForTimeout(3000);
        const successMsg = page.locator('[class*="success"]');
        const savedMsg = page.locator('text=/saved/i');
        const updatedMsg = page.locator('text=/updated/i');
        const hasSuccess = await successMsg.count() > 0;
        const hasSaved = await savedMsg.count() > 0;
        const hasUpdated = await updatedMsg.count() > 0;
        expect(hasSuccess || hasSaved || hasUpdated).toBeTruthy();
      }
    }
  });

});
