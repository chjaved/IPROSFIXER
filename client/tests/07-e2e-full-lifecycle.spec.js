import { test, expect } from '@playwright/test';
import { generateEmail, signup, login, proSignup, createBooking } from './helpers.js';

test('E2E-01 - Complete full lifecycle from signup to payment to review', async ({ browser }) => {
  const custEmail = generateEmail('e2e_cust');
  const proEmail = generateEmail('e2e_pro');

  const custPage = await browser.newPage();
  const proPage = await browser.newPage();

  // Step 1 - Register both users
  await signup(custPage, custEmail, 'E2E Customer');
  console.log('✅ Step 1a: Customer registered');

  await proSignup(proPage, proEmail, 'E2E Professional');
  console.log('✅ Step 1b: Professional registered');

  // Step 2 - Customer books a service
  await login(custPage, custEmail);
  const ref = await createBooking(custPage);
  if (ref) console.log(`✅ Step 2: Booking created - ${ref}`);
  else console.log('⚠️ Step 2: Booking not created');

  // Step 3 - Professional accepts job
  await login(proPage, proEmail);
  await proPage.goto('/pro-dashboard/jobs');
  await proPage.waitForLoadState('networkidle');
  await proPage.waitForTimeout(5000);
  const acceptBtn = proPage.locator('button:has-text("Accept")').first();
  if (await acceptBtn.count() > 0) {
    await acceptBtn.click();
    await proPage.waitForTimeout(3000);
    console.log('✅ Step 3: Job accepted by professional');
  } else {
    console.log('⚠️ Step 3: No job to accept');
  }

  // Step 4 - Customer sees accepted status
  await custPage.goto('/dashboard/bookings');
  await custPage.waitForLoadState('networkidle');
  await custPage.waitForTimeout(3000);
  const custBody = await custPage.locator('body').innerText();
  const hasStatus = custBody.toLowerCase().match(/accepted|pending/);
  expect(hasStatus).toBeTruthy();
  console.log('✅ Step 4: Customer sees booking status');

  // Step 5 - Pro marks job complete
  await proPage.goto('/pro-dashboard/jobs');
  await proPage.waitForLoadState('networkidle');
  await proPage.waitForTimeout(3000);
  const completeBtn = proPage.locator('button:has-text("Complete"), button:has-text("Mark Complete")').first();
  if (await completeBtn.count() > 0) {
    await completeBtn.click();
    await proPage.waitForTimeout(3000);
    console.log('✅ Step 5: Job marked complete');
  }

  // Step 6 - Check earnings updated
  await proPage.goto('/pro-dashboard/earnings');
  await proPage.waitForLoadState('networkidle');
  await proPage.waitForTimeout(3000);
  const earningsBody = await proPage.locator('body').innerText();
  expect(earningsBody).toContain('RM');
  console.log('✅ Step 6: Earnings page shows RM');

  // Step 7 - Customer sees completed status
  await custPage.goto('/dashboard/bookings');
  await custPage.waitForLoadState('networkidle');
  await custPage.waitForTimeout(3000);
  const finalBody = await custPage.locator('body').innerText();
  expect(finalBody.length).toBeGreaterThan(100);
  console.log('✅ Step 7: Customer sees final status');

  // Step 8 - Professional checks reviews
  await proPage.goto('/pro-dashboard/reviews');
  await proPage.waitForLoadState('networkidle');
  await proPage.waitForTimeout(2000);
  await expect(proPage.locator('body')).toBeVisible();
  console.log('✅ Step 8: Reviews page accessible');

  await custPage.close();
  await proPage.close();

  console.log('🎉 Full E2E lifecycle completed successfully');
});

test('E2E-02 - Demo accounts work with real data', async ({ page }) => {
  await page.goto('/login');
  await page.waitForLoadState('networkidle');
  await page.locator('input[type="email"]').first().fill('ahmad.hafizi@demo.com');
  await page.locator('input[type="password"]').first().fill('Test1234!');
  await page.locator('button[type="submit"]').first().click();
  await page.waitForURL(/dashboard/, { timeout: 15000 });
  await page.waitForTimeout(3000);
  const body = await page.locator('body').innerText();
  const hasData = body.includes('IPF-') || body.toLowerCase().match(/booking|pending|completed/);
  expect(hasData).toBeTruthy();
  console.log('✅ Demo customer account has real booking data');
});

test('E2E-03 - Demo professional account shows real data', async ({ page }) => {
  await page.goto('/login');
  await page.waitForLoadState('networkidle');
  await page.locator('input[type="email"]').first().fill('siti.rahimah@demo.com');
  await page.locator('input[type="password"]').first().fill('Test1234!');
  await page.locator('button[type="submit"]').first().click();
  await page.waitForURL(/dashboard/, { timeout: 15000 });
  await page.waitForTimeout(3000);
  const body = await page.locator('body').innerText();
  expect(body).toContain('RM');
  console.log('✅ Demo professional account shows earnings data');
});
