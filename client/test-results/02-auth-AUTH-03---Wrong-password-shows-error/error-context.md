# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 02-auth.spec.js >> AUTH-03 - Wrong password shows error
- Location: tests\02-auth.spec.js:20:1

# Error details

```
TimeoutError: locator.fill: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('input[type="email"]').first()

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - heading "404" [level=1] [ref=e4]
    - heading "Not Found" [level=2] [ref=e5]
    - paragraph [ref=e6]: The resource requested could not be found on this server!
  - generic [ref=e7]:
    - text: Proudly powered by LiteSpeed Web Server
    - paragraph [ref=e8]: Please be advised that LiteSpeed Technologies Inc. is not a web hosting company and, as such, has no control over content found on this site.
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { generateEmail, signup, login, proSignup, password } from './helpers.js';
  3   | 
  4   | const custEmail = generateEmail('auth_cust');
  5   | const proEmail = generateEmail('auth_pro');
  6   | 
  7   | test('AUTH-01 - Customer signup succeeds', async ({ page }) => {
  8   |   await signup(page, custEmail, 'Ahmad Test Customer');
  9   |   expect(page.url()).toContain('dashboard');
  10  |   expect(page.url()).not.toContain('pro-dashboard');
  11  |   console.log('✅ Customer signup and routing correct');
  12  | });
  13  | 
  14  | test('AUTH-02 - Customer login succeeds', async ({ page }) => {
  15  |   await login(page, custEmail);
  16  |   expect(page.url()).toContain('dashboard');
  17  |   console.log('✅ Customer login works');
  18  | });
  19  | 
  20  | test('AUTH-03 - Wrong password shows error', async ({ page }) => {
  21  |   await page.goto('/login');
  22  |   await page.waitForLoadState('networkidle');
> 23  |   await page.locator('input[type="email"]').first().fill(custEmail);
      |                                                     ^ TimeoutError: locator.fill: Timeout 15000ms exceeded.
  24  |   await page.locator('input[type="password"]').first().fill('wrongpassword');
  25  |   await page.locator('button[type="submit"]').first().click();
  26  |   await page.waitForTimeout(5000);
  27  |   const body = await page.locator('body').innerText();
  28  |   expect(body.toLowerCase()).toMatch(/invalid|incorrect|wrong|error|failed/);
  29  |   console.log('✅ Wrong password shows error');
  30  | });
  31  | 
  32  | 
  33  | test('AUTH-04 - Duplicate email signup shows error', async ({ page }) => {
  34  |   await page.goto('/signup');
  35  |   await page.waitForLoadState('networkidle');
  36  |   await page.fill('input[name="name"]', 'Duplicate User');
  37  |   await page.locator('input[type="email"]').first().fill(custEmail);
  38  |   await page.fill('input[name="phone"]', '0123456789');
  39  |   await page.locator('input[type="password"]').first().fill(password);
  40  |   const confirm = page.locator('input[name="confirmPassword"]');
  41  |   if (await confirm.count() > 0) await confirm.fill(password);
  42  |   const checkboxes = page.locator('input[type="checkbox"]');
  43  |   const count = await checkboxes.count();
  44  |   for (let i = 0; i < count; i++) await checkboxes.nth(i).check();
  45  |   await page.locator('button[type="submit"]').first().click();
  46  |   await page.waitForTimeout(5000);
  47  |   const body = await page.locator('body').innerText();
  48  |   expect(body.toLowerCase()).toMatch(/already|exists|registered|taken|error/);
  49  |   console.log('✅ Duplicate email rejected');
  50  | });
  51  | 
  52  | test('AUTH-05 - Professional signup succeeds', async ({ page }) => {
  53  |   await proSignup(page, proEmail, 'Siti Pro Cleaner');
  54  |   expect(page.url()).toContain('dashboard');
  55  |   console.log('✅ Professional signup works');
  56  | });
  57  | 
  58  | test('AUTH-06 - Professional login routes to pro dashboard', async ({ page }) => {
  59  |   await login(page, proEmail);
  60  |   expect(page.url()).toContain('pro-dashboard');
  61  |   console.log('✅ Professional routed to pro dashboard');
  62  | });
  63  | 
  64  | test('AUTH-07 - Customer cannot access pro dashboard', async ({ page }) => {
  65  |   await login(page, custEmail);
  66  |   await page.goto('/pro-dashboard');
  67  |   await page.waitForTimeout(3000);
  68  |   expect(page.url()).not.toContain('pro-dashboard');
  69  |   console.log('✅ Customer blocked from pro dashboard');
  70  | });
  71  | 
  72  | test('AUTH-08 - Token persists after page refresh', async ({ page }) => {
  73  |   await login(page, custEmail);
  74  |   await page.reload();
  75  |   await page.waitForTimeout(3000);
  76  |   expect(page.url()).toContain('dashboard');
  77  |   console.log('✅ Token persists after refresh');
  78  | });
  79  | 
  80  | test('AUTH-09 - Logout clears session', async ({ page }) => {
  81  |   await login(page, custEmail);
  82  |   const logout = page.locator('button:has-text("Logout"), a:has-text("Logout")');
  83  |   if (await logout.count() > 0) {
  84  |     await logout.first().click();
  85  |     await page.waitForTimeout(3000);
  86  |     expect(page.url()).not.toContain('dashboard');
  87  |     await page.goto('/dashboard');
  88  |     await page.waitForTimeout(2000);
  89  |     expect(page.url()).not.toContain('dashboard');
  90  |     console.log('✅ Logout works correctly');
  91  |   }
  92  | });
  93  | 
  94  | test('AUTH-10 - Rate limiting on failed logins', async ({ page }) => {
  95  |   await page.goto('/login');
  96  |   await page.waitForLoadState('networkidle');
  97  |   for (let i = 0; i < 12; i++) {
  98  |     await page.locator('input[type="email"]').first().fill(`fake${i}@test.com`);
  99  |     await page.locator('input[type="password"]').first().fill('wrongpass');
  100 |     await page.locator('button[type="submit"]').first().click();
  101 |     await page.waitForTimeout(500);
  102 |   }
  103 |   const body = await page.locator('body').innerText();
  104 |   const rateLimited = body.toLowerCase().match(/too many|rate limit|try again later/);
  105 |   if (rateLimited) console.log('✅ Rate limiting working');
  106 |   else console.log('⚠️ Rate limiting may need more requests to trigger');
  107 | });
  108 | 
```