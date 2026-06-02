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
  await page.locator('input[type="email"]').first().fill(email);
  await page.locator('input[type="password"]').first().fill(password);
  await page.locator('button[type="submit"]').first().click();
  await page.waitForURL(/dashboard/, { timeout: 30000 });
}

export async function proSignup(page, email, password = 'Test1234!') {
  await page.goto('/pro-signup');
  await page.waitForLoadState('networkidle');
  
  // Fill exact field names from ProSignup.jsx
  await page.fill('input[name="name"]', 'Siti Pro Professional');
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="phone"]', '0123456789');
  await page.selectOption('select[name="serviceCategory"]', 'Part-Time Maid / Cleaner');
  await page.selectOption('select[name="location"]', 'Kuala Lumpur');
  await page.selectOption('select[name="experience"]', '3-5');
  await page.fill('input[name="password"]', password);
  await page.fill('input[name="confirmPassword"]', password);
  
  // Check both checkboxes (hasTransport and terms agreement)
  await page.check('input[name="hasTransport"]');
  // Terms checkbox doesn't have name, check by label text
  const termsCheckbox = page.locator('label:has-text("I agree to the") input[type="checkbox"]');
  if (await termsCheckbox.count() > 0) {
    await termsCheckbox.check();
  }
  
  await page.click('button[type="submit"]');
  
  // Debug logging
  await page.waitForTimeout(3000);
  console.log('URL after pro signup submit:', page.url());
  const body = await page.locator('body').innerText();
  console.log('Page content after submit:', body.substring(0, 300));
  
  // Wait for pro-dashboard redirect (not /dashboard/)
  await page.waitForURL(/pro-dashboard/, { timeout: 30000 });
}

export async function proLogin(page, email, password = 'Test1234!') {
  await page.goto('/login');
  await page.waitForLoadState('networkidle');
  await page.locator('input[type="email"]').first().fill(email);
  await page.locator('input[type="password"]').first().fill(password);
  await page.locator('button[type="submit"]').first().click();
  await page.waitForURL(/dashboard/, { timeout: 30000 });
}
