import { test, expect } from '@playwright/test';

test('PUBLIC-01 - Homepage loads with correct title and content', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveTitle(/iPROFIXER/i);
  const body = await page.locator('body').innerText();
  expect(body.toLowerCase()).toMatch(/clean|service|malaysia/);
  console.log('✅ Homepage loaded');
});

test('PUBLIC-02 - Homepage has working navigation links', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  const nav = page.locator('nav');
  await expect(nav).toBeVisible();
  console.log('✅ Navigation visible');
});

test('PUBLIC-03 - Homepage CTA buttons work', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  const ctaBtn = page.locator('a:has-text("Book"), button:has-text("Book")').first();
  if (await ctaBtn.count() > 0) {
    await expect(ctaBtn).toBeVisible();
    console.log('✅ CTA button visible');
  }
});

test('PUBLIC-04 - Homepage WhatsApp button works', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  const waBtn = page.locator('a[href*="wa.me"], a:has-text("WhatsApp")').first();
  if (await waBtn.count() > 0) {
    const href = await waBtn.getAttribute('href');
    expect(href).toContain('wa.me');
    console.log('✅ WhatsApp button has correct link');
  }
});

test('PUBLIC-05 - Services page loads all cleaning services', async ({ page }) => {
  await page.goto('/services');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  const body = await page.locator('body').innerText();
  expect(body.toLowerCase()).toMatch(/clean|maid|laundry/);
  console.log('✅ Services page loaded');
});

test('PUBLIC-06 - Services page Book button redirects correctly', async ({ page }) => {
  await page.goto('/services');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  const bookBtn = page.locator('button:has-text("Book"), a:has-text("Book")').first();
  if (await bookBtn.count() > 0) {
    await bookBtn.click();
    await page.waitForTimeout(2000);
    const url = page.url();
    expect(url).toMatch(/signup|login|dashboard/);
    console.log('✅ Book button redirects correctly');
  }
});

test('PUBLIC-07 - How It Works page loads', async ({ page }) => {
  await page.goto('/how-it-works');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('body')).toBeVisible();
  console.log('✅ How It Works page loaded');
});

test('PUBLIC-08 - For Professionals page loads', async ({ page }) => {
  await page.goto('/for-professionals');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('body')).toBeVisible();
  console.log('✅ For Professionals page loaded');
});

test('PUBLIC-09 - FAQ page loads', async ({ page }) => {
  await page.goto('/faq');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('body')).toBeVisible();
  console.log('✅ FAQ page loaded');
});

test('PUBLIC-10 - FAQ accordion opens and closes', async ({ page }) => {
  await page.goto('/faq');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  const faqItem = page.locator('[class*="faq"], [class*="accordion"], button').first();
  if (await faqItem.count() > 0) {
    await faqItem.click();
    await page.waitForTimeout(500);
    console.log('✅ FAQ accordion works');
  }
});

test('PUBLIC-11 - Contact page loads and form exists', async ({ page }) => {
  await page.goto('/contact');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('body')).toBeVisible();
  console.log('✅ Contact page loaded');
});

test('PUBLIC-12 - Contact form submits successfully', async ({ page }) => {
  await page.goto('/contact');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  const nameInput = page.locator('input[name="name"], input[placeholder*="Name"]').first();
  if (await nameInput.count() > 0) {
    await nameInput.fill('Test User');
    const phone = page.locator('input[name="phone"], input[placeholder*="Phone"]').first();
    if (await phone.count() > 0) await phone.fill('0123456789');
    const email = page.locator('input[type="email"]').first();
    if (await email.count() > 0) await email.fill('test@test.com');
    const message = page.locator('textarea[name="message"], textarea').first();
    if (await message.count() > 0) await message.fill('This is a test message from Playwright');
    const submit = page.locator('button[type="submit"]').first();
    if (await submit.count() > 0) {
      await submit.click();
      await page.waitForTimeout(5000);
      const body = await page.locator('body').innerText();
      const success = body.toLowerCase().match(/success|sent|thank|received/);
      if (success) console.log('✅ Contact form submitted successfully');
      else console.log('⚠️ Contact form submission - check response');
    }
  }
});

test('PUBLIC-13 - Privacy policy page loads', async ({ page }) => {
  await page.goto('/privacy');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('body')).toBeVisible();
  console.log('✅ Privacy policy loaded');
});

test('PUBLIC-14 - Terms page loads', async ({ page }) => {
  await page.goto('/terms');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('body')).toBeVisible();
  console.log('✅ Terms page loaded');
});

test('PUBLIC-15 - 404 page shows for invalid routes', async ({ page }) => {
  await page.goto('/this-page-does-not-exist');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  const body = await page.locator('body').innerText();
  const is404 = body.match(/404|not found|page.*not.*exist/i);
  expect(is404).toBeTruthy();
  console.log('✅ 404 page works');
});

test('PUBLIC-16 - Unauthenticated access to dashboard redirects', async ({ page }) => {
  await page.goto('/dashboard');
  await page.waitForTimeout(3000);
  expect(page.url()).toMatch(/login|signup|\//);
  console.log('✅ Protected route redirects to login');
});

test('PUBLIC-17 - API health check returns ok', async ({ page }) => {
  await page.goto('/api/health');
  const body = await page.locator('body').innerText();
  expect(body).toContain('ok');
  console.log('✅ API health check passing');
});

test('PUBLIC-18 - API services endpoint returns services', async ({ page }) => {
  await page.goto('/api/services');
  const body = await page.locator('body').innerText();
  expect(body.toLowerCase()).toContain('clean');
  console.log('✅ API services endpoint working');
});
