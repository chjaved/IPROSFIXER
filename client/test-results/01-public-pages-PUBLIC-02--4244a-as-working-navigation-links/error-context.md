# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 01-public-pages.spec.js >> PUBLIC-02 - Homepage has working navigation links
- Location: tests\01-public-pages.spec.js:12:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('nav')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('nav')

```

```yaml
- heading "Index of /" [level=1]
- table:
  - rowgroup:
    - row "Name Last Modified Size":
      - columnheader "Name":
        - link "Name":
          - /url: "?ND"
      - columnheader "Last Modified":
        - link "Last Modified":
          - /url: "?MA"
      - columnheader "Size":
        - link "Size":
          - /url: "?SA"
- text: Proudly Served by LiteSpeed Web Server at www.iprofixer.com.my Port 443
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test('PUBLIC-01 - Homepage loads with correct title and content', async ({ page }) => {
  4   |   await page.goto('/');
  5   |   await page.waitForLoadState('networkidle');
  6   |   await expect(page).toHaveTitle(/iPROFIXER/i);
  7   |   const body = await page.locator('body').innerText();
  8   |   expect(body.toLowerCase()).toMatch(/clean|service|malaysia/);
  9   |   console.log('✅ Homepage loaded');
  10  | });
  11  | 
  12  | test('PUBLIC-02 - Homepage has working navigation links', async ({ page }) => {
  13  |   await page.goto('/');
  14  |   await page.waitForLoadState('networkidle');
  15  |   const nav = page.locator('nav');
> 16  |   await expect(nav).toBeVisible();
      |                     ^ Error: expect(locator).toBeVisible() failed
  17  |   console.log('✅ Navigation visible');
  18  | });
  19  | 
  20  | test('PUBLIC-03 - Homepage CTA buttons work', async ({ page }) => {
  21  |   await page.goto('/');
  22  |   await page.waitForLoadState('networkidle');
  23  |   const ctaBtn = page.locator('a:has-text("Book"), button:has-text("Book")').first();
  24  |   if (await ctaBtn.count() > 0) {
  25  |     await expect(ctaBtn).toBeVisible();
  26  |     console.log('✅ CTA button visible');
  27  |   }
  28  | });
  29  | 
  30  | test('PUBLIC-04 - Homepage WhatsApp button works', async ({ page }) => {
  31  |   await page.goto('/');
  32  |   await page.waitForLoadState('networkidle');
  33  |   const waBtn = page.locator('a[href*="wa.me"], a:has-text("WhatsApp")').first();
  34  |   if (await waBtn.count() > 0) {
  35  |     const href = await waBtn.getAttribute('href');
  36  |     expect(href).toContain('wa.me');
  37  |     console.log('✅ WhatsApp button has correct link');
  38  |   }
  39  | });
  40  | 
  41  | test('PUBLIC-05 - Services page loads all cleaning services', async ({ page }) => {
  42  |   await page.goto('/services');
  43  |   await page.waitForLoadState('networkidle');
  44  |   await page.waitForTimeout(3000);
  45  |   const body = await page.locator('body').innerText();
  46  |   expect(body.toLowerCase()).toMatch(/clean|maid|laundry/);
  47  |   console.log('✅ Services page loaded');
  48  | });
  49  | 
  50  | test('PUBLIC-06 - Services page Book button redirects correctly', async ({ page }) => {
  51  |   await page.goto('/services');
  52  |   await page.waitForLoadState('networkidle');
  53  |   await page.waitForTimeout(2000);
  54  |   const bookBtn = page.locator('button:has-text("Book"), a:has-text("Book")').first();
  55  |   if (await bookBtn.count() > 0) {
  56  |     await bookBtn.click();
  57  |     await page.waitForTimeout(2000);
  58  |     const url = page.url();
  59  |     expect(url).toMatch(/signup|login|dashboard/);
  60  |     console.log('✅ Book button redirects correctly');
  61  |   }
  62  | });
  63  | 
  64  | test('PUBLIC-07 - How It Works page loads', async ({ page }) => {
  65  |   await page.goto('/how-it-works');
  66  |   await page.waitForLoadState('networkidle');
  67  |   await expect(page.locator('body')).toBeVisible();
  68  |   console.log('✅ How It Works page loaded');
  69  | });
  70  | 
  71  | test('PUBLIC-08 - For Professionals page loads', async ({ page }) => {
  72  |   await page.goto('/for-professionals');
  73  |   await page.waitForLoadState('networkidle');
  74  |   await expect(page.locator('body')).toBeVisible();
  75  |   console.log('✅ For Professionals page loaded');
  76  | });
  77  | 
  78  | test('PUBLIC-09 - FAQ page loads', async ({ page }) => {
  79  |   await page.goto('/faq');
  80  |   await page.waitForLoadState('networkidle');
  81  |   await expect(page.locator('body')).toBeVisible();
  82  |   console.log('✅ FAQ page loaded');
  83  | });
  84  | 
  85  | test('PUBLIC-10 - FAQ accordion opens and closes', async ({ page }) => {
  86  |   await page.goto('/faq');
  87  |   await page.waitForLoadState('networkidle');
  88  |   await page.waitForTimeout(1000);
  89  |   const faqItem = page.locator('[class*="faq"], [class*="accordion"], button').first();
  90  |   if (await faqItem.count() > 0) {
  91  |     await faqItem.click();
  92  |     await page.waitForTimeout(500);
  93  |     console.log('✅ FAQ accordion works');
  94  |   }
  95  | });
  96  | 
  97  | test('PUBLIC-11 - Contact page loads and form exists', async ({ page }) => {
  98  |   await page.goto('/contact');
  99  |   await page.waitForLoadState('networkidle');
  100 |   await expect(page.locator('body')).toBeVisible();
  101 |   console.log('✅ Contact page loaded');
  102 | });
  103 | 
  104 | test('PUBLIC-12 - Contact form submits successfully', async ({ page }) => {
  105 |   await page.goto('/contact');
  106 |   await page.waitForLoadState('networkidle');
  107 |   await page.waitForTimeout(1000);
  108 |   const nameInput = page.locator('input[name="name"], input[placeholder*="Name"]').first();
  109 |   if (await nameInput.count() > 0) {
  110 |     await nameInput.fill('Test User');
  111 |     const phone = page.locator('input[name="phone"], input[placeholder*="Phone"]').first();
  112 |     if (await phone.count() > 0) await phone.fill('0123456789');
  113 |     const email = page.locator('input[type="email"]').first();
  114 |     if (await email.count() > 0) await email.fill('test@test.com');
  115 |     const message = page.locator('textarea[name="message"], textarea').first();
  116 |     if (await message.count() > 0) await message.fill('This is a test message from Playwright');
```