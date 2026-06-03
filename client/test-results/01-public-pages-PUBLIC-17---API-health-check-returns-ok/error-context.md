# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 01-public-pages.spec.js >> PUBLIC-17 - API health check returns ok
- Location: tests\01-public-pages.spec.js:160:1

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "ok"
Received string:    "{\"success\":true,\"message\":\"iPROFIXER API running\",\"timestamp\":\"2026-06-03T03:08:43.219Z\"}"
```

# Page snapshot

```yaml
- generic [ref=e2]: "{\"success\":true,\"message\":\"iPROFIXER API running\",\"timestamp\":\"2026-06-03T03:08:43.219Z\"}"
```

# Test source

```ts
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
  117 |     const submit = page.locator('button[type="submit"]').first();
  118 |     if (await submit.count() > 0) {
  119 |       await submit.click();
  120 |       await page.waitForTimeout(5000);
  121 |       const body = await page.locator('body').innerText();
  122 |       const success = body.toLowerCase().match(/success|sent|thank|received/);
  123 |       if (success) console.log('✅ Contact form submitted successfully');
  124 |       else console.log('⚠️ Contact form submission - check response');
  125 |     }
  126 |   }
  127 | });
  128 | 
  129 | test('PUBLIC-13 - Privacy policy page loads', async ({ page }) => {
  130 |   await page.goto('/privacy');
  131 |   await page.waitForLoadState('networkidle');
  132 |   await expect(page.locator('body')).toBeVisible();
  133 |   console.log('✅ Privacy policy loaded');
  134 | });
  135 | 
  136 | test('PUBLIC-14 - Terms page loads', async ({ page }) => {
  137 |   await page.goto('/terms');
  138 |   await page.waitForLoadState('networkidle');
  139 |   await expect(page.locator('body')).toBeVisible();
  140 |   console.log('✅ Terms page loaded');
  141 | });
  142 | 
  143 | test('PUBLIC-15 - 404 page shows for invalid routes', async ({ page }) => {
  144 |   await page.goto('/this-page-does-not-exist');
  145 |   await page.waitForLoadState('networkidle');
  146 |   await page.waitForTimeout(2000);
  147 |   const body = await page.locator('body').innerText();
  148 |   const is404 = body.match(/404|not found|page.*not.*exist/i);
  149 |   expect(is404).toBeTruthy();
  150 |   console.log('✅ 404 page works');
  151 | });
  152 | 
  153 | test('PUBLIC-16 - Unauthenticated access to dashboard redirects', async ({ page }) => {
  154 |   await page.goto('/dashboard');
  155 |   await page.waitForTimeout(3000);
  156 |   expect(page.url()).toMatch(/login|signup|\//);
  157 |   console.log('✅ Protected route redirects to login');
  158 | });
  159 | 
  160 | test('PUBLIC-17 - API health check returns ok', async ({ page }) => {
  161 |   await page.goto('/api/health');
  162 |   const body = await page.locator('body').innerText();
> 163 |   expect(body).toContain('ok');
      |                ^ Error: expect(received).toContain(expected) // indexOf
  164 |   console.log('✅ API health check passing');
  165 | });
  166 | 
  167 | test('PUBLIC-18 - API services endpoint returns services', async ({ page }) => {
  168 |   await page.goto('/api/services');
  169 |   const body = await page.locator('body').innerText();
  170 |   expect(body.toLowerCase()).toContain('clean');
  171 |   console.log('✅ API services endpoint working');
  172 | });
  173 | 
```