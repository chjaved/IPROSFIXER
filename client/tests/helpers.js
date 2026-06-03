export const generateEmail = (prefix) => `${prefix}_${Date.now()}@test.com`;
export const password = 'Test1234!';

export async function signup(page, email, name = 'Test User') {
  await page.goto('/signup');
  await page.waitForLoadState('networkidle');
  await page.fill('input[name="name"], input[placeholder*="Full Name"]', name);
  await page.locator('input[type="email"]').first().fill(email);
  await page.fill('input[name="phone"], input[placeholder*="Phone"]', '0123456789');
  await page.locator('input[type="password"]').first().fill(password);
  const confirm = page.locator('input[name="confirmPassword"], input[placeholder*="Confirm"]');
  if (await confirm.count() > 0) await confirm.fill(password);
  const checkboxes = page.locator('input[type="checkbox"]');
  const count = await checkboxes.count();
  for (let i = 0; i < count; i++) await checkboxes.nth(i).check();
  await page.locator('button[type="submit"]').first().click();
  await page.waitForURL(/dashboard/, { timeout: 30000 });
}

export async function login(page, email) {
  await page.goto('/login');
  await page.waitForLoadState('networkidle');
  await page.locator('input[type="email"]').first().fill(email);
  await page.locator('input[type="password"]').first().fill(password);
  await page.locator('button[type="submit"]').first().click();
  await page.waitForURL(/dashboard/, { timeout: 30000 });
}

export async function proSignup(page, email, name = 'Pro Tester') {
  await page.goto('/pro-signup');
  await page.waitForLoadState('networkidle');
  await page.fill('input[name="name"], input[placeholder*="Full Name"]', name);
  await page.locator('input[type="email"]').first().fill(email);
  await page.fill('input[placeholder*="Phone"], input[name="phone"]', '0123456789');
  const whatsapp = page.locator('input[placeholder*="WhatsApp"], input[name="whatsapp"]');
  if (await whatsapp.count() > 0) await whatsapp.fill('0123456789');
  const cat = page.locator('select[name="serviceCategory"], select[name="service_category"]');
  if (await cat.count() > 0) await cat.selectOption({ index: 1 });
  const area = page.locator('select[name="coverageArea"], select[name="coverage_area"]');
  if (await area.count() > 0) await area.selectOption({ index: 1 });
  const exp = page.locator('input[name="yearsExperience"], input[placeholder*="Experience"]');
  if (await exp.count() > 0) await exp.fill('3');
  await page.locator('input[type="password"]').first().fill(password);
  const confirm = page.locator('input[name="confirmPassword"], input[placeholder*="Confirm"]');
  if (await confirm.count() > 0) await confirm.fill(password);
  const checkboxes = page.locator('input[type="checkbox"]');
  const count = await checkboxes.count();
  for (let i = 0; i < count; i++) await checkboxes.nth(i).check();
  await page.locator('button[type="submit"]').first().click();
  await page.waitForURL(/dashboard/, { timeout: 30000 });
}

export async function createBooking(page) {
  await page.goto('/dashboard/bookings');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  const bookBtn = page.locator('button:has-text("New Booking"), button:has-text("Book")');
  if (await bookBtn.count() === 0) return null;
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
  const submit = page.locator('button:has-text("Confirm"), button:has-text("Submit")');
  if (await submit.count() > 0) await submit.first().click();
  await page.waitForTimeout(5000);
  const body = await page.locator('body').innerText();
  const match = body.match(/IPF-\d{4}-\d+/);
  return match ? match[0] : null;
}
