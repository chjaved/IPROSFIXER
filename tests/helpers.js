export const timestamp = () => Date.now();

export async function customerSignup(page, email, password = 'Test1234!') {
  await page.goto('/signup');
  await page.waitForLoadState('networkidle');
  await page.fill('input[name="name"], input[placeholder*="Full Name"]', 'Ahmad Test Customer');
  await page.fill('input[type="email"]', email);
  await page.fill('input[placeholder*="Phone"], input[name="phone"]', '0123456789');
  await page.fill('input[type="password"]', password);
  const confirm = page.locator('input[placeholder*="Confirm"], input[name="confirmPassword"], input[name="confirm"]');
  if (await confirm.count() > 0) await confirm.fill(password);
  const checkbox = page.locator('input[type="checkbox"]');
  if (await checkbox.count() > 0) await checkbox.check();
  await page.click('button[type="submit"]');
  await page.waitForURL(/dashboard/, { timeout: 30000 });
}

export async function customerLogin(page, email, password = 'Test1234!') {
  await page.goto('/login');
  await page.waitForLoadState('networkidle');
  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForURL(/dashboard/, { timeout: 30000 });
}

export async function proSignup(page, email, password = 'Test1234!') {
  await page.goto('/pro-signup');
  await page.waitForLoadState('networkidle');
  await page.fill('input[name="name"], input[placeholder*="Full Name"]', 'Siti Pro Professional');
  await page.fill('input[type="email"]', email);
  await page.fill('input[placeholder*="Phone"], input[name="phone"]', '0123456789');
  const whatsapp = page.locator('input[placeholder*="WhatsApp"], input[name="whatsapp"]');
  if (await whatsapp.count() > 0) await whatsapp.fill('0123456789');
  const category = page.locator('select[name="service_category"], select[name="serviceCategory"]');
  if (await category.count() > 0) await category.selectOption({ index: 1 });
  const area = page.locator('select[name="coverage_area"], select[name="coverageArea"]');
  if (await area.count() > 0) await area.selectOption({ index: 1 });
  const exp = page.locator('input[name="years_experience"], input[placeholder*="Experience"], input[placeholder*="Years"]');
  if (await exp.count() > 0) await exp.fill('3');
  await page.fill('input[type="password"]', password);
  const confirm = page.locator('input[placeholder*="Confirm"], input[name="confirmPassword"]');
  if (await confirm.count() > 0) await confirm.fill(password);
  const checkbox = page.locator('input[type="checkbox"]');
  if (await checkbox.count() > 0) await checkbox.check();
  await page.click('button[type="submit"]');
  await page.waitForURL(/dashboard/, { timeout: 30000 });
}

export async function proLogin(page, email, password = 'Test1234!') {
  await page.goto('/login');
  await page.waitForLoadState('networkidle');
  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForURL(/dashboard/, { timeout: 30000 });
}
