# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e.spec.js >> End-to-End Booking Lifecycle >> Complete booking lifecycle: register → book → accept → complete → review
- Location: tests\e2e.spec.js:50:3

# Error details

```
TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
============================================================
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]:
      - link "iPROFIXER home" [ref=e6] [cursor=pointer]:
        - /url: /
        - img "iPROFIXER" [ref=e7]
      - navigation [ref=e8]:
        - link "Home" [ref=e9] [cursor=pointer]:
          - /url: /
        - link "Services" [ref=e10] [cursor=pointer]:
          - /url: /services
        - link "How It Works" [ref=e11] [cursor=pointer]:
          - /url: /how-it-works
        - link "For Pros" [ref=e12] [cursor=pointer]:
          - /url: /for-professionals
        - link "FAQ" [ref=e13] [cursor=pointer]:
          - /url: /faq
      - generic [ref=e14]:
        - link "Login" [ref=e15] [cursor=pointer]:
          - /url: /login
          - img [ref=e16]
          - text: Login
        - link "Sign Up" [ref=e19] [cursor=pointer]:
          - /url: /signup
          - img [ref=e20]
          - text: Sign Up
  - generic [ref=e24]:
    - generic [ref=e25]:
      - heading "Create Your iPROFIXER Account" [level=1] [ref=e26]
      - paragraph [ref=e27]: Join thousands of happy customers booking home services
    - generic [ref=e28]:
      - generic [ref=e29]:
        - img [ref=e30]
        - heading "Quality Service" [level=3] [ref=e32]
        - paragraph [ref=e33]: Verified professionals only
      - generic [ref=e34]:
        - img [ref=e35]
        - heading "Easy Booking" [level=3] [ref=e37]
        - paragraph [ref=e38]: Book in just 2 minutes
      - generic [ref=e39]:
        - img [ref=e40]
        - heading "Secure Payment" [level=3] [ref=e42]
        - paragraph [ref=e43]: Pay after job completion
  - generic [ref=e45]:
    - link "Back to Home" [ref=e46] [cursor=pointer]:
      - /url: /
      - img [ref=e47]
      - text: Back to Home
    - generic [ref=e49]:
      - generic [ref=e50]:
        - img "iPROFIXER" [ref=e52]
        - heading "Create Account" [level=1] [ref=e53]
        - paragraph [ref=e54]: Sign up to book home services
      - generic [ref=e55]:
        - generic [ref=e56]: Unexpected token 'A', "A server e"... is not valid JSON
        - generic [ref=e57]:
          - generic [ref=e58]:
            - generic [ref=e59]: Full Name
            - generic [ref=e60]:
              - img [ref=e61]
              - textbox "John Doe" [ref=e64]: E2E Customer
          - generic [ref=e65]:
            - generic [ref=e66]: Email Address
            - generic [ref=e67]:
              - img [ref=e68]
              - textbox "you@example.com" [ref=e71]: e2e_cust_1780249038510@test.com
          - generic [ref=e72]:
            - generic [ref=e73]: Phone Number
            - generic [ref=e74]:
              - img [ref=e75]
              - textbox "+60 12-345-6789" [ref=e77]: "0123456789"
          - generic [ref=e78]:
            - generic [ref=e79]: Password
            - generic [ref=e80]:
              - img [ref=e81]
              - textbox "At least 6 characters" [ref=e84]: Test1234
              - button [ref=e85] [cursor=pointer]:
                - img [ref=e86]
          - generic [ref=e89]:
            - generic [ref=e90]: Confirm Password
            - generic [ref=e91]:
              - img [ref=e92]
              - textbox "Confirm your password" [ref=e95]: Test1234
              - button [ref=e96] [cursor=pointer]:
                - img [ref=e97]
          - generic [ref=e100] [cursor=pointer]:
            - checkbox "I agree to the Terms of Service and Privacy Policy" [checked] [ref=e101]
            - generic [ref=e102]:
              - text: I agree to the
              - link "Terms of Service" [ref=e103]:
                - /url: /terms
              - text: and
              - link "Privacy Policy" [ref=e104]:
                - /url: /privacy
          - button "Create Account" [ref=e105] [cursor=pointer]
        - generic [ref=e110]: Already have an account?
        - link "Sign in" [ref=e111] [cursor=pointer]:
          - /url: /login
    - paragraph [ref=e112]:
      - text: Want to join as a professional?
      - link "Apply here" [ref=e113] [cursor=pointer]:
        - /url: /pro-signup
  - contentinfo [ref=e114]:
    - generic [ref=e117]:
      - generic [ref=e118]:
        - img [ref=e120]
        - generic [ref=e122]: Verified Pros
      - generic [ref=e123]:
        - img [ref=e125]
        - generic [ref=e128]: Quality Assured
      - generic [ref=e129]:
        - img [ref=e131]
        - generic [ref=e134]: On-Time Service
    - generic [ref=e135]:
      - generic [ref=e136]:
        - generic [ref=e137]:
          - link "iPROFIXER" [ref=e138] [cursor=pointer]:
            - /url: /
            - img "iPROFIXER" [ref=e139]
          - paragraph [ref=e140]: Malaysia's most trusted cleaning service platform. Connecting homeowners with verified cleaning professionals for all your home cleaning needs.
          - generic [ref=e141]:
            - link "+03-8080 5249" [ref=e142] [cursor=pointer]:
              - /url: tel:+60380805249
              - img [ref=e144]
              - generic [ref=e146]: +03-8080 5249
            - link "for_services@iprofixer.com.my" [ref=e147] [cursor=pointer]:
              - /url: mailto:for_services@iprofixer.com.my
              - img [ref=e149]
              - generic [ref=e152]: for_services@iprofixer.com.my
            - generic [ref=e153]:
              - img [ref=e155]
              - generic [ref=e158]: Ara Damansara, Petaling Jaya
        - generic [ref=e159]:
          - generic [ref=e160]:
            - heading "Services" [level=4] [ref=e161]
            - list [ref=e162]:
              - listitem [ref=e163]:
                - link "Home Deep Cleaning" [ref=e164] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e165]
                  - text: Home Deep Cleaning
              - listitem [ref=e167]:
                - link "Regular Maid Service" [ref=e168] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e169]
                  - text: Regular Maid Service
              - listitem [ref=e171]:
                - link "Post-Renovation Cleaning" [ref=e172] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e173]
                  - text: Post-Renovation Cleaning
              - listitem [ref=e175]:
                - link "Sofa & Carpet Cleaning" [ref=e176] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e177]
                  - text: Sofa & Carpet Cleaning
              - listitem [ref=e179]:
                - link "Post-Event Cleanup" [ref=e180] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e181]
                  - text: Post-Event Cleanup
              - listitem [ref=e183]:
                - link "Laundry & Ironing" [ref=e184] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e185]
                  - text: Laundry & Ironing
              - listitem [ref=e187]:
                - link "Part-Time Maid" [ref=e188] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e189]
                  - text: Part-Time Maid
          - generic [ref=e191]:
            - heading "Company" [level=4] [ref=e192]
            - list [ref=e193]:
              - listitem [ref=e194]:
                - link "About iPROFIXER" [ref=e195] [cursor=pointer]:
                  - /url: /about
                  - img [ref=e196]
                  - text: About iPROFIXER
              - listitem [ref=e198]:
                - link "How It Works" [ref=e199] [cursor=pointer]:
                  - /url: /how-it-works
                  - img [ref=e200]
                  - text: How It Works
              - listitem [ref=e202]:
                - link "Join as Professional" [ref=e203] [cursor=pointer]:
                  - /url: /for-professionals
                  - img [ref=e204]
                  - text: Join as Professional
              - listitem [ref=e206]:
                - link "Careers" [ref=e207] [cursor=pointer]:
                  - /url: /signup
                  - img [ref=e208]
                  - text: Careers
              - listitem [ref=e210]:
                - link "Blog & Tips" [ref=e211] [cursor=pointer]:
                  - /url: /signup
                  - img [ref=e212]
                  - text: Blog & Tips
          - generic [ref=e214]:
            - heading "Support" [level=4] [ref=e215]
            - list [ref=e216]:
              - listitem [ref=e217]:
                - link "Help Center / FAQ" [ref=e218] [cursor=pointer]:
                  - /url: /faq
                  - img [ref=e219]
                  - text: Help Center / FAQ
              - listitem [ref=e221]:
                - link "Safety Guidelines" [ref=e222] [cursor=pointer]:
                  - /url: /signup
                  - img [ref=e223]
                  - text: Safety Guidelines
              - listitem [ref=e225]:
                - link "Cancellation Policy" [ref=e226] [cursor=pointer]:
                  - /url: /signup
                  - img [ref=e227]
                  - text: Cancellation Policy
              - listitem [ref=e229]:
                - link "Refund Policy" [ref=e230] [cursor=pointer]:
                  - /url: /signup
                  - img [ref=e231]
                  - text: Refund Policy
              - listitem [ref=e233]:
                - link "Service Guarantee" [ref=e234] [cursor=pointer]:
                  - /url: /signup
                  - img [ref=e235]
                  - text: Service Guarantee
        - generic [ref=e237]:
          - heading "Stay Updated" [level=4] [ref=e238]
          - paragraph [ref=e239]: Get home maintenance tips and exclusive offers.
          - generic [ref=e240]:
            - generic [ref=e241]:
              - img [ref=e242]
              - textbox "Enter your email" [ref=e245]
            - button "Subscribe Now" [ref=e246] [cursor=pointer]
          - link "Chat on WhatsApp" [ref=e247] [cursor=pointer]:
            - /url: https://wa.me/60162104127
            - img [ref=e248]
            - text: Chat on WhatsApp
      - generic [ref=e251]:
        - generic [ref=e252]:
          - generic [ref=e253]: "Follow us:"
          - generic [ref=e254]:
            - link "Facebook" [ref=e255] [cursor=pointer]:
              - /url: https://facebook.com/iprofixer
              - img [ref=e256]
            - link "Instagram" [ref=e258] [cursor=pointer]:
              - /url: https://instagram.com/iprofixer
              - img [ref=e259]
            - link "LinkedIn" [ref=e262] [cursor=pointer]:
              - /url: https://linkedin.com/company/iprofixer
              - img [ref=e263]
            - link "Twitter" [ref=e267] [cursor=pointer]:
              - /url: https://twitter.com/iprofixer
              - img [ref=e268]
            - link "YouTube" [ref=e270] [cursor=pointer]:
              - /url: https://youtube.com/iprofixer
              - img [ref=e271]
        - generic [ref=e274]:
          - generic [ref=e275]: "We accept:"
          - generic [ref=e276]:
            - img [ref=e277]
            - img [ref=e279]
            - img [ref=e281]
            - generic [ref=e283]:
              - img [ref=e284]
              - generic [ref=e286]: Pay
      - generic [ref=e288]:
        - paragraph [ref=e289]: © 2026 iPROFIXER — IPROS EDUCTECH SDN BHD. All rights reserved.
        - generic [ref=e290]:
          - link "Privacy Policy" [ref=e291] [cursor=pointer]:
            - /url: /privacy
          - link "Terms of Service" [ref=e292] [cursor=pointer]:
            - /url: /terms
          - link "Cookies" [ref=e293] [cursor=pointer]:
            - /url: /cookie-policy
    - button "Back to top" [ref=e294] [cursor=pointer]:
      - img [ref=e295]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | const timestamp = Date.now();
  4   | const custEmail = `e2e_cust_${timestamp}@test.com`;
  5   | const proEmail = `e2e_pro_${timestamp}@test.com`;
  6   | const password = 'Test1234';
  7   | 
  8   | async function registerCustomer(page, email) {
  9   |   await page.goto('https://iprosfixer.vercel.app/signup');
  10  |   await page.waitForLoadState('networkidle');
  11  |   await page.fill('input[name="name"], input[placeholder*="Full Name" i]', 'E2E Customer');
  12  |   await page.fill('input[type="email"]', email);
  13  |   const phone = page.locator('input[name="phone"], input[placeholder*="Phone" i]');
  14  |   if (await phone.count() > 0) await phone.first().fill('0123456789');
  15  |   await page.fill('input[type="password"]', password);
  16  |   const confirm = page.locator('input[placeholder*="Confirm" i], input[name="confirmPassword"]');
  17  |   if (await confirm.count() > 0) await confirm.first().fill(password);
  18  |   const checkbox = page.locator('input[type="checkbox"]');
  19  |   if (await checkbox.count() > 0) await checkbox.first().check();
  20  |   await page.click('button[type="submit"], button:has-text("Create"), button:has-text("Sign Up")');
> 21  |   await page.waitForURL(/dashboard/, { timeout: 15000 });
      |              ^ TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
  22  | }
  23  | 
  24  | async function registerPro(page, email) {
  25  |   await page.goto('https://iprosfixer.vercel.app/pro-signup');
  26  |   await page.waitForLoadState('networkidle');
  27  |   await page.fill('input[name="name"], input[placeholder*="Full Name" i]', 'E2E Professional');
  28  |   await page.fill('input[type="email"]', email);
  29  |   const phone = page.locator('input[name="phone"], input[placeholder*="Phone" i]');
  30  |   if (await phone.count() > 0) await phone.first().fill('0123456789');
  31  |   const whatsapp = page.locator('input[name="whatsapp"], input[placeholder*="WhatsApp" i]');
  32  |   if (await whatsapp.count() > 0) await whatsapp.first().fill('0123456789');
  33  |   const cat = page.locator('select[name="service_category"], select[name="serviceCategory"]');
  34  |   if (await cat.count() > 0) await cat.first().selectOption({ index: 1 });
  35  |   const area = page.locator('select[name="coverage_area"], select[name="coverageArea"]');
  36  |   if (await area.count() > 0) await area.first().selectOption({ index: 1 });
  37  |   const exp = page.locator('input[name="years_experience"], input[placeholder*="Experience" i]');
  38  |   if (await exp.count() > 0) await exp.first().fill('2');
  39  |   await page.fill('input[type="password"]', password);
  40  |   const confirm = page.locator('input[placeholder*="Confirm" i], input[name="confirmPassword"]');
  41  |   if (await confirm.count() > 0) await confirm.first().fill(password);
  42  |   const checkbox = page.locator('input[type="checkbox"]');
  43  |   if (await checkbox.count() > 0) await checkbox.first().check();
  44  |   await page.click('button[type="submit"], button:has-text("Join"), button:has-text("Complete"), button:has-text("Sign Up")');
  45  |   await page.waitForURL(/dashboard/, { timeout: 15000 });
  46  | }
  47  | 
  48  | test.describe('End-to-End Booking Lifecycle', () => {
  49  | 
  50  |   test('Complete booking lifecycle: register → book → accept → complete → review', async ({ browser }) => {
  51  |     const custContext = await browser.newContext();
  52  |     const proContext  = await browser.newContext();
  53  |     const custPage    = await custContext.newPage();
  54  |     const proPage     = await proContext.newPage();
  55  | 
  56  |     // ── Step 1: Register customer ──────────────────────────────────
  57  |     await registerCustomer(custPage, custEmail);
  58  |     console.log('✅ Step 1: Customer registered, on dashboard');
  59  | 
  60  |     // ── Step 2: Register professional ─────────────────────────────
  61  |     await registerPro(proPage, proEmail);
  62  |     console.log('✅ Step 2: Professional registered, on dashboard');
  63  | 
  64  |     // ── Step 3: Customer books a service ──────────────────────────
  65  |     await custPage.goto('https://iprosfixer.vercel.app/dashboard/bookings');
  66  |     await custPage.waitForLoadState('networkidle');
  67  |     await custPage.waitForTimeout(2000);
  68  | 
  69  |     const bookBtn = custPage.locator('button:has-text("Book"), button:has-text("New Booking"), button:has-text("Add Booking")');
  70  |     expect(await bookBtn.count()).toBeGreaterThan(0);
  71  |     await bookBtn.first().click();
  72  |     await custPage.waitForTimeout(1500);
  73  | 
  74  |     const serviceSelect = custPage.locator('select[name="service"], select[name="service_id"]');
  75  |     if (await serviceSelect.count() > 0) await serviceSelect.first().selectOption({ index: 1 });
  76  |     const areaSelect = custPage.locator('select[name="area"]');
  77  |     if (await areaSelect.count() > 0) await areaSelect.first().selectOption({ index: 1 });
  78  |     const dateInput = custPage.locator('input[type="date"]');
  79  |     if (await dateInput.count() > 0) await dateInput.first().fill('2026-07-20');
  80  |     const timeInput = custPage.locator('input[type="time"]');
  81  |     if (await timeInput.count() > 0) await timeInput.first().fill('10:00');
  82  |     const addrInput = custPage.locator('input[name="address"], textarea[name="address"], input[placeholder*="address" i]');
  83  |     if (await addrInput.count() > 0) await addrInput.first().fill('123 Test Street, KL');
  84  | 
  85  |     const submitBtn = custPage.locator('button:has-text("Confirm"), button:has-text("Submit"), button[type="submit"]');
  86  |     if (await submitBtn.count() > 0) await submitBtn.first().click();
  87  |     await custPage.waitForTimeout(4000);
  88  | 
  89  |     const refText = custPage.locator('text=/IPF-/');
  90  |     const hasRef = await refText.count() > 0;
  91  |     console.log(hasRef ? '✅ Step 3: Booking created with reference number' : '⚠️ Step 3: Booking created (no IPF ref visible)');
  92  | 
  93  |     // ── Step 4: Pro sees and accepts the job ──────────────────────
  94  |     await proPage.goto('https://iprosfixer.vercel.app/pro-dashboard/jobs');
  95  |     await proPage.waitForLoadState('networkidle');
  96  |     await proPage.waitForTimeout(3000);
  97  | 
  98  |     const acceptBtn = proPage.locator('button:has-text("Accept")');
  99  |     const hasJob = await acceptBtn.count() > 0;
  100 |     if (hasJob) {
  101 |       await acceptBtn.first().click();
  102 |       await proPage.waitForTimeout(2000);
  103 |       console.log('✅ Step 4: Professional accepted the job');
  104 |     } else {
  105 |       console.log('⚠️ Step 4: No pending jobs visible on pro dashboard (may need same service category)');
  106 |     }
  107 | 
  108 |     // ── Step 5: Customer sees accepted status ─────────────────────
  109 |     await custPage.goto('https://iprosfixer.vercel.app/dashboard/bookings');
  110 |     await custPage.waitForLoadState('networkidle');
  111 |     await custPage.waitForTimeout(2000);
  112 |     const acceptedStatus = custPage.locator('text=/accepted/i, text=/Accepted/');
  113 |     console.log(await acceptedStatus.count() > 0 ? '✅ Step 5: Customer sees Accepted status' : '⚠️ Step 5: Accepted status not visible');
  114 | 
  115 |     // ── Step 6: Pro marks job complete ────────────────────────────
  116 |     await proPage.goto('https://iprosfixer.vercel.app/pro-dashboard/jobs');
  117 |     await proPage.waitForTimeout(2000);
  118 |     const completeBtn = proPage.locator('button:has-text("Complete"), button:has-text("Mark Complete")');
  119 |     if (await completeBtn.count() > 0) {
  120 |       await completeBtn.first().click();
  121 |       await proPage.waitForTimeout(2000);
```