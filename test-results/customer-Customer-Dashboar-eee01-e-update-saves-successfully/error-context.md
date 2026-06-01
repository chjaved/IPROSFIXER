# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: customer.spec.js >> Customer Dashboard >> Profile update saves successfully
- Location: tests\customer.spec.js:77:3

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
        - generic [ref=e56]: Email already registered
        - generic [ref=e57]:
          - generic [ref=e58]:
            - generic [ref=e59]: Full Name
            - generic [ref=e60]:
              - img [ref=e61]
              - textbox "John Doe" [ref=e64]: Test Customer
          - generic [ref=e65]:
            - generic [ref=e66]: Email Address
            - generic [ref=e67]:
              - img [ref=e68]
              - textbox "you@example.com" [ref=e71]: cust_1780298953710@test.com
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
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const timestamp = Date.now();
  4  | const email = `cust_${timestamp}@test.com`;
  5  | const password = 'Test1234';
  6  | 
  7  | test.describe('Customer Dashboard', () => {
  8  | 
  9  |   test.beforeEach(async ({ page }) => {
  10 |     await page.goto('/signup');
  11 |     await page.waitForLoadState('networkidle');
  12 |     await page.fill('input[name="name"], input[placeholder*="Full Name" i]', 'Test Customer');
  13 |     await page.fill('input[type="email"]', email);
  14 |     const phone = page.locator('input[name="phone"], input[placeholder*="Phone" i]');
  15 |     if (await phone.count() > 0) await phone.first().fill('0123456789');
  16 |     await page.fill('input[type="password"]', password);
  17 |     const confirm = page.locator('input[placeholder*="Confirm" i], input[name="confirmPassword"]');
  18 |     if (await confirm.count() > 0) await confirm.first().fill(password);
  19 |     const checkbox = page.locator('input[type="checkbox"]');
  20 |     if (await checkbox.count() > 0) await checkbox.first().check();
  21 |     await page.click('button[type="submit"], button:has-text("Create"), button:has-text("Sign Up")');
> 22 |     await page.waitForURL(/dashboard/, { timeout: 15000 });
     |                ^ TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
  23 |   });
  24 | 
  25 |   test('Dashboard overview loads with stats', async ({ page }) => {
  26 |     await page.waitForLoadState('networkidle');
  27 |     await expect(page.locator('h1, h2').first()).toBeVisible({ timeout: 8000 });
  28 |     const noError = await page.locator('text=/error/i').count();
  29 |     expect(noError).toBe(0);
  30 |   });
  31 | 
  32 |   test('Bookings page loads', async ({ page }) => {
  33 |     await page.goto('/dashboard/bookings');
  34 |     await page.waitForLoadState('networkidle');
  35 |     await expect(page.locator('h1, h2').first()).toBeVisible({ timeout: 8000 });
  36 |   });
  37 | 
  38 |   test('Booking form opens and submits', async ({ page }) => {
  39 |     await page.goto('/dashboard/bookings');
  40 |     await page.waitForLoadState('networkidle');
  41 |     await page.waitForTimeout(2000);
  42 |     const bookBtn = page.locator('button:has-text("Book"), button:has-text("New Booking"), button:has-text("Add Booking")');
  43 |     if (await bookBtn.count() > 0) {
  44 |       await bookBtn.first().click();
  45 |       await page.waitForTimeout(1500);
  46 |       const serviceSelect = page.locator('select[name="service"], select[name="service_id"]');
  47 |       if (await serviceSelect.count() > 0) await serviceSelect.first().selectOption({ index: 1 });
  48 |       const areaSelect = page.locator('select[name="area"]');
  49 |       if (await areaSelect.count() > 0) await areaSelect.first().selectOption({ index: 1 });
  50 |       const dateInput = page.locator('input[type="date"], input[name="date"]');
  51 |       if (await dateInput.count() > 0) await dateInput.first().fill('2026-07-15');
  52 |       const timeInput = page.locator('input[type="time"], input[name="time"]');
  53 |       if (await timeInput.count() > 0) await timeInput.first().fill('10:00');
  54 |       const addrInput = page.locator('input[name="address"], textarea[name="address"], input[placeholder*="address" i]');
  55 |       if (await addrInput.count() > 0) await addrInput.first().fill('123 Test Street, KL');
  56 |       const submitBtn = page.locator('button:has-text("Confirm"), button:has-text("Submit"), button[type="submit"]');
  57 |       if (await submitBtn.count() > 0) await submitBtn.first().click();
  58 |       await page.waitForTimeout(4000);
  59 |       const ref = page.locator('text=/IPF-/');
  60 |       const success = page.locator('[class*="success"], text=/success/i, text=/confirmed/i');
  61 |       const hasRef = await ref.count() > 0;
  62 |       const hasSuccess = await success.count() > 0;
  63 |       expect(hasRef || hasSuccess).toBeTruthy();
  64 |     } else {
  65 |       test.skip();
  66 |     }
  67 |   });
  68 | 
  69 |   test('Profile page loads and shows email', async ({ page }) => {
  70 |     await page.goto('/dashboard/profile');
  71 |     await page.waitForLoadState('networkidle');
  72 |     await page.waitForTimeout(2000);
  73 |     const emailVisible = page.locator(`text=${email}`);
  74 |     await expect(emailVisible).toBeVisible({ timeout: 8000 });
  75 |   });
  76 | 
  77 |   test('Profile update saves successfully', async ({ page }) => {
  78 |     await page.goto('/dashboard/profile');
  79 |     await page.waitForLoadState('networkidle');
  80 |     await page.waitForTimeout(2000);
  81 |     const phoneInput = page.locator('input[name="phone"], input[placeholder*="Phone" i]');
  82 |     if (await phoneInput.count() > 0) {
  83 |       await phoneInput.first().fill('0199999999');
  84 |       const saveBtn = page.locator('button:has-text("Save"), button:has-text("Update"), button[type="submit"]');
  85 |       if (await saveBtn.count() > 0) {
  86 |         await saveBtn.first().click();
  87 |         await page.waitForTimeout(3000);
  88 |         const success = page.locator('[class*="success"], text=/saved/i, text=/updated/i, text=/success/i');
  89 |         expect(await success.count()).toBeGreaterThan(0);
  90 |       }
  91 |     }
  92 |   });
  93 | 
  94 | });
  95 | 
```