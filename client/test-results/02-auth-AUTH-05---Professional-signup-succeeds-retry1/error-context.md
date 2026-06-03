# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 02-auth.spec.js >> AUTH-05 - Professional signup succeeds
- Location: tests\02-auth.spec.js:52:1

# Error details

```
TimeoutError: page.fill: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('input[name="name"], input[placeholder*="Full Name"]')

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
  1  | export const generateEmail = (prefix) => `${prefix}_${Date.now()}@test.com`;
  2  | export const password = 'Test1234!';
  3  | 
  4  | export async function signup(page, email, name = 'Test User') {
  5  |   await page.goto('/signup');
  6  |   await page.waitForLoadState('networkidle');
  7  |   await page.fill('input[name="name"], input[placeholder*="Full Name"]', name);
  8  |   await page.locator('input[type="email"]').first().fill(email);
  9  |   await page.fill('input[name="phone"], input[placeholder*="Phone"]', '0123456789');
  10 |   await page.locator('input[type="password"]').first().fill(password);
  11 |   const confirm = page.locator('input[name="confirmPassword"], input[placeholder*="Confirm"]');
  12 |   if (await confirm.count() > 0) await confirm.fill(password);
  13 |   const checkboxes = page.locator('input[type="checkbox"]');
  14 |   const count = await checkboxes.count();
  15 |   for (let i = 0; i < count; i++) await checkboxes.nth(i).check();
  16 |   await page.locator('button[type="submit"]').first().click();
  17 |   await page.waitForURL(/dashboard/, { timeout: 30000 });
  18 | }
  19 | 
  20 | export async function login(page, email) {
  21 |   await page.goto('/login');
  22 |   await page.waitForLoadState('networkidle');
  23 |   await page.locator('input[type="email"]').first().fill(email);
  24 |   await page.locator('input[type="password"]').first().fill(password);
  25 |   await page.locator('button[type="submit"]').first().click();
  26 |   await page.waitForURL(/dashboard/, { timeout: 30000 });
  27 | }
  28 | 
  29 | export async function proSignup(page, email, name = 'Pro Tester') {
  30 |   await page.goto('/pro-signup');
  31 |   await page.waitForLoadState('networkidle');
> 32 |   await page.fill('input[name="name"], input[placeholder*="Full Name"]', name);
     |              ^ TimeoutError: page.fill: Timeout 15000ms exceeded.
  33 |   await page.locator('input[type="email"]').first().fill(email);
  34 |   await page.fill('input[placeholder*="Phone"], input[name="phone"]', '0123456789');
  35 |   const whatsapp = page.locator('input[placeholder*="WhatsApp"], input[name="whatsapp"]');
  36 |   if (await whatsapp.count() > 0) await whatsapp.fill('0123456789');
  37 |   const cat = page.locator('select[name="serviceCategory"], select[name="service_category"]');
  38 |   if (await cat.count() > 0) await cat.selectOption({ index: 1 });
  39 |   const area = page.locator('select[name="coverageArea"], select[name="coverage_area"]');
  40 |   if (await area.count() > 0) await area.selectOption({ index: 1 });
  41 |   const exp = page.locator('input[name="yearsExperience"], input[placeholder*="Experience"]');
  42 |   if (await exp.count() > 0) await exp.fill('3');
  43 |   await page.locator('input[type="password"]').first().fill(password);
  44 |   const confirm = page.locator('input[name="confirmPassword"], input[placeholder*="Confirm"]');
  45 |   if (await confirm.count() > 0) await confirm.fill(password);
  46 |   const checkboxes = page.locator('input[type="checkbox"]');
  47 |   const count = await checkboxes.count();
  48 |   for (let i = 0; i < count; i++) await checkboxes.nth(i).check();
  49 |   await page.locator('button[type="submit"]').first().click();
  50 |   await page.waitForURL(/dashboard/, { timeout: 30000 });
  51 | }
  52 | 
  53 | export async function createBooking(page) {
  54 |   await page.goto('/dashboard/bookings');
  55 |   await page.waitForLoadState('networkidle');
  56 |   await page.waitForTimeout(2000);
  57 |   const bookBtn = page.locator('button:has-text("New Booking"), button:has-text("Book")');
  58 |   if (await bookBtn.count() === 0) return null;
  59 |   await bookBtn.first().click();
  60 |   await page.waitForTimeout(2000);
  61 |   const serviceSelect = page.locator('select[name="service_id"], select[name="service"]');
  62 |   if (await serviceSelect.count() > 0) await serviceSelect.selectOption({ index: 1 });
  63 |   const areaSelect = page.locator('select[name="area"]');
  64 |   if (await areaSelect.count() > 0) await areaSelect.selectOption({ index: 1 });
  65 |   const dateInput = page.locator('input[type="date"]');
  66 |   if (await dateInput.count() > 0) await dateInput.fill('2026-08-15');
  67 |   const timeInput = page.locator('input[type="time"]');
  68 |   if (await timeInput.count() > 0) await timeInput.fill('10:00');
  69 |   const notes = page.locator('textarea[name="notes"], textarea');
  70 |   if (await notes.count() > 0) await notes.first().fill('Please bring eco-friendly products');
  71 |   const whatsapp = page.locator('input[name="whatsapp"], input[placeholder*="WhatsApp"]');
  72 |   if (await whatsapp.count() > 0) await whatsapp.fill('0123456789');
  73 |   const submit = page.locator('button:has-text("Confirm"), button:has-text("Submit")');
  74 |   if (await submit.count() > 0) await submit.first().click();
  75 |   await page.waitForTimeout(5000);
  76 |   const body = await page.locator('body').innerText();
  77 |   const match = body.match(/IPF-\d{4}-\d+/);
  78 |   return match ? match[0] : null;
  79 | }
  80 | 
```