# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 07-e2e-full-lifecycle.spec.js >> E2E-03 - Demo professional account shows real data
- Location: tests\07-e2e-full-lifecycle.spec.js:101:1

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
  4   | test('E2E-01 - Complete full lifecycle from signup to payment to review', async ({ browser }) => {
  5   |   const custEmail = generateEmail('e2e_cust');
  6   |   const proEmail = generateEmail('e2e_pro');
  7   | 
  8   |   const custPage = await browser.newPage();
  9   |   const proPage = await browser.newPage();
  10  | 
  11  |   // Step 1 - Register both users
  12  |   await signup(custPage, custEmail, 'E2E Customer');
  13  |   console.log('✅ Step 1a: Customer registered');
  14  | 
  15  |   await proSignup(proPage, proEmail, 'E2E Professional');
  16  |   console.log('✅ Step 1b: Professional registered');
  17  | 
  18  |   // Step 2 - Customer books a service
  19  |   await login(custPage, custEmail);
  20  |   const ref = await createBooking(custPage);
  21  |   if (ref) console.log(`✅ Step 2: Booking created - ${ref}`);
  22  |   else console.log('⚠️ Step 2: Booking not created');
  23  | 
  24  |   // Step 3 - Professional accepts job
  25  |   await login(proPage, proEmail);
  26  |   await proPage.goto('/pro-dashboard/jobs');
  27  |   await proPage.waitForLoadState('networkidle');
  28  |   await proPage.waitForTimeout(5000);
  29  |   const acceptBtn = proPage.locator('button:has-text("Accept")').first();
  30  |   if (await acceptBtn.count() > 0) {
  31  |     await acceptBtn.click();
  32  |     await proPage.waitForTimeout(3000);
  33  |     console.log('✅ Step 3: Job accepted by professional');
  34  |   } else {
  35  |     console.log('⚠️ Step 3: No job to accept');
  36  |   }
  37  | 
  38  |   // Step 4 - Customer sees accepted status
  39  |   await custPage.goto('/dashboard/bookings');
  40  |   await custPage.waitForLoadState('networkidle');
  41  |   await custPage.waitForTimeout(3000);
  42  |   const custBody = await custPage.locator('body').innerText();
  43  |   const hasStatus = custBody.toLowerCase().match(/accepted|pending/);
  44  |   expect(hasStatus).toBeTruthy();
  45  |   console.log('✅ Step 4: Customer sees booking status');
  46  | 
  47  |   // Step 5 - Pro marks job complete
  48  |   await proPage.goto('/pro-dashboard/jobs');
  49  |   await proPage.waitForLoadState('networkidle');
  50  |   await proPage.waitForTimeout(3000);
  51  |   const completeBtn = proPage.locator('button:has-text("Complete"), button:has-text("Mark Complete")').first();
  52  |   if (await completeBtn.count() > 0) {
  53  |     await completeBtn.click();
  54  |     await proPage.waitForTimeout(3000);
  55  |     console.log('✅ Step 5: Job marked complete');
  56  |   }
  57  | 
  58  |   // Step 6 - Check earnings updated
  59  |   await proPage.goto('/pro-dashboard/earnings');
  60  |   await proPage.waitForLoadState('networkidle');
  61  |   await proPage.waitForTimeout(3000);
  62  |   const earningsBody = await proPage.locator('body').innerText();
  63  |   expect(earningsBody).toContain('RM');
  64  |   console.log('✅ Step 6: Earnings page shows RM');
  65  | 
  66  |   // Step 7 - Customer sees completed status
  67  |   await custPage.goto('/dashboard/bookings');
  68  |   await custPage.waitForLoadState('networkidle');
  69  |   await custPage.waitForTimeout(3000);
  70  |   const finalBody = await custPage.locator('body').innerText();
  71  |   expect(finalBody.length).toBeGreaterThan(100);
  72  |   console.log('✅ Step 7: Customer sees final status');
  73  | 
  74  |   // Step 8 - Professional checks reviews
  75  |   await proPage.goto('/pro-dashboard/reviews');
  76  |   await proPage.waitForLoadState('networkidle');
  77  |   await proPage.waitForTimeout(2000);
  78  |   await expect(proPage.locator('body')).toBeVisible();
  79  |   console.log('✅ Step 8: Reviews page accessible');
  80  | 
  81  |   await custPage.close();
  82  |   await proPage.close();
  83  | 
  84  |   console.log('🎉 Full E2E lifecycle completed successfully');
  85  | });
  86  | 
  87  | test('E2E-02 - Demo accounts work with real data', async ({ page }) => {
  88  |   await page.goto('/login');
  89  |   await page.waitForLoadState('networkidle');
  90  |   await page.locator('input[type="email"]').first().fill('ahmad.hafizi@demo.com');
  91  |   await page.locator('input[type="password"]').first().fill('Test1234!');
  92  |   await page.locator('button[type="submit"]').first().click();
  93  |   await page.waitForURL(/dashboard/, { timeout: 15000 });
  94  |   await page.waitForTimeout(3000);
  95  |   const body = await page.locator('body').innerText();
  96  |   const hasData = body.includes('IPF-') || body.toLowerCase().match(/booking|pending|completed/);
  97  |   expect(hasData).toBeTruthy();
  98  |   console.log('✅ Demo customer account has real booking data');
  99  | });
  100 | 
  101 | test('E2E-03 - Demo professional account shows real data', async ({ page }) => {
  102 |   await page.goto('/login');
  103 |   await page.waitForLoadState('networkidle');
> 104 |   await page.locator('input[type="email"]').first().fill('siti.rahimah@demo.com');
      |                                                     ^ TimeoutError: locator.fill: Timeout 15000ms exceeded.
  105 |   await page.locator('input[type="password"]').first().fill('Test1234!');
  106 |   await page.locator('button[type="submit"]').first().click();
  107 |   await page.waitForURL(/dashboard/, { timeout: 15000 });
  108 |   await page.waitForTimeout(3000);
  109 |   const body = await page.locator('body').innerText();
  110 |   expect(body).toContain('RM');
  111 |   console.log('✅ Demo professional account shows earnings data');
  112 | });
  113 | 
```