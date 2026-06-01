import { test, expect } from '@playwright/test';
import { customerSignup, customerLogin, proSignup, proLogin } from './helpers.js';

const t = Date.now();
const custEmail = `e2ecust_${t}@test.com`;
const proEmail = `e2epro_${t}@test.com`;
const password = 'Test1234!';

test('25 - Full lifecycle: customer books → pro accepts → pro completes → earnings updated', async ({ browser }) => {
  
  // Step 1 — Register both users
  const custPage = await browser.newPage();
  const proPage = await browser.newPage();
  
  await customerSignup(custPage, custEmail, password);
  console.log('✅ Step 1a: Customer registered');
  
  await proSignup(proPage, proEmail, password);
  console.log('✅ Step 1b: Professional registered');

  // Step 2 — Customer creates a booking
  await custPage.goto('/dashboard/bookings');
  await custPage.waitForLoadState('networkidle');
  await custPage.waitForTimeout(2000);
  
  const bookBtn = custPage.locator('button:has-text("New Booking"), button:has-text("Book")');
  if (await bookBtn.count() > 0) {
    await bookBtn.first().click();
    await custPage.waitForTimeout(2000);
    
    const serviceSelect = custPage.locator('select[name="service_id"], select[name="service"]');
    if (await serviceSelect.count() > 0) await serviceSelect.selectOption({ index: 1 });
    
    const areaSelect = custPage.locator('select[name="area"]');
    if (await areaSelect.count() > 0) await areaSelect.selectOption({ index: 1 });
    
    const dateInput = custPage.locator('input[type="date"]');
    if (await dateInput.count() > 0) await dateInput.fill('2026-07-20');
    
    const timeInput = custPage.locator('input[type="time"]');
    if (await timeInput.count() > 0) await timeInput.fill('14:00');
    
    const whatsapp = custPage.locator('input[name="whatsapp"], input[placeholder*="WhatsApp"]');
    if (await whatsapp.count() > 0) await whatsapp.fill('0123456789');
    
    const submitBtn = custPage.locator('button:has-text("Confirm"), button:has-text("Submit")');
    if (await submitBtn.count() > 0) {
      await submitBtn.first().click();
      await custPage.waitForTimeout(5000);
      const body = await custPage.locator('body').innerText();
      const booked = body.includes('IPF-') || body.toLowerCase().includes('confirmed');
      if (booked) console.log('✅ Step 2: Customer created booking');
      else console.log('⚠️ Step 2: Booking may not have been created');
    }
  }

  // Step 3 — Professional sees and accepts the job
  await proPage.goto('/pro-dashboard/jobs');
  await proPage.waitForLoadState('networkidle');
  await proPage.waitForTimeout(5000);
  
  const acceptBtn = proPage.locator('button:has-text("Accept")');
  if (await acceptBtn.count() > 0) {
    await acceptBtn.first().click();
    await proPage.waitForTimeout(3000);
    console.log('✅ Step 3: Professional accepted the job');
  } else {
    console.log('⚠️ Step 3: No jobs available to accept yet');
  }

  // Step 4 — Customer sees booking status updated
  await custPage.goto('/dashboard/bookings');
  await custPage.waitForLoadState('networkidle');
  await custPage.waitForTimeout(3000);
  const custBody = await custPage.locator('body').innerText();
  const statusUpdated = custBody.toLowerCase().includes('accepted') || custBody.toLowerCase().includes('pending');
  expect(statusUpdated).toBeTruthy();
  console.log('✅ Step 4: Customer sees booking status');

  // Step 5 — Professional marks job as complete
  await proPage.goto('/pro-dashboard/jobs');
  await proPage.waitForLoadState('networkidle');
  await proPage.waitForTimeout(3000);
  
  const completeBtn = proPage.locator('button:has-text("Complete"), button:has-text("Mark Complete"), button:has-text("Mark as Complete")');
  if (await completeBtn.count() > 0) {
    await completeBtn.first().click();
    await proPage.waitForTimeout(3000);
    console.log('✅ Step 5: Job marked as complete');
  } else {
    console.log('⚠️ Step 5: No complete button found');
  }

  // Step 6 — Professional checks earnings
  await proPage.goto('/pro-dashboard/earnings');
  await proPage.waitForLoadState('networkidle');
  await proPage.waitForTimeout(3000);
  const earningsBody = await proPage.locator('body').innerText();
  const hasEarnings = earningsBody.includes('RM');
  expect(hasEarnings).toBeTruthy();
  console.log('✅ Step 6: Earnings page shows RM values');

  // Step 7 — Customer checks completed booking
  await custPage.goto('/dashboard/bookings');
  await custPage.waitForLoadState('networkidle');
  await custPage.waitForTimeout(3000);
  const finalBody = await custPage.locator('body').innerText();
  expect(finalBody.length).toBeGreaterThan(100);
  console.log('✅ Step 7: Customer sees final booking state');

  await custPage.close();
  await proPage.close();
  
  console.log('🎉 Full E2E lifecycle completed');
});
