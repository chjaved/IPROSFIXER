# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.js >> Authentication >> Customer signup succeeds and redirects to dashboard
- Location: tests\auth.spec.js:10:3

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
        - generic [ref=e56]: "Failed to execute 'json' on 'Response': Unexpected end of JSON input"
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
              - textbox "you@example.com" [ref=e71]: customer_1780041138027@test.com
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
          - paragraph [ref=e140]: Malaysia's most trusted home services platform. Connecting homeowners with verified professionals for cleaning, repairs, and maintenance.
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
                - link "Deep Cleaning" [ref=e164] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e165]
                  - text: Deep Cleaning
              - listitem [ref=e167]:
                - link "AC Repair & Service" [ref=e168] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e169]
                  - text: AC Repair & Service
              - listitem [ref=e171]:
                - link "Electrical Works" [ref=e172] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e173]
                  - text: Electrical Works
              - listitem [ref=e175]:
                - link "Plumbing" [ref=e176] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e177]
                  - text: Plumbing
              - listitem [ref=e179]:
                - link "Home Maid Service" [ref=e180] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e181]
                  - text: Home Maid Service
              - listitem [ref=e183]:
                - link "Sofa & Carpet Clean" [ref=e184] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e185]
                  - text: Sofa & Carpet Clean
          - generic [ref=e187]:
            - heading "Company" [level=4] [ref=e188]
            - list [ref=e189]:
              - listitem [ref=e190]:
                - link "About iPROFIXER" [ref=e191] [cursor=pointer]:
                  - /url: /about
                  - img [ref=e192]
                  - text: About iPROFIXER
              - listitem [ref=e194]:
                - link "How It Works" [ref=e195] [cursor=pointer]:
                  - /url: /how-it-works
                  - img [ref=e196]
                  - text: How It Works
              - listitem [ref=e198]:
                - link "Join as Professional" [ref=e199] [cursor=pointer]:
                  - /url: /for-professionals
                  - img [ref=e200]
                  - text: Join as Professional
              - listitem [ref=e202]:
                - link "Careers" [ref=e203] [cursor=pointer]:
                  - /url: /signup
                  - img [ref=e204]
                  - text: Careers
              - listitem [ref=e206]:
                - link "Blog & Tips" [ref=e207] [cursor=pointer]:
                  - /url: /signup
                  - img [ref=e208]
                  - text: Blog & Tips
          - generic [ref=e210]:
            - heading "Support" [level=4] [ref=e211]
            - list [ref=e212]:
              - listitem [ref=e213]:
                - link "Help Center / FAQ" [ref=e214] [cursor=pointer]:
                  - /url: /faq
                  - img [ref=e215]
                  - text: Help Center / FAQ
              - listitem [ref=e217]:
                - link "Safety Guidelines" [ref=e218] [cursor=pointer]:
                  - /url: /signup
                  - img [ref=e219]
                  - text: Safety Guidelines
              - listitem [ref=e221]:
                - link "Cancellation Policy" [ref=e222] [cursor=pointer]:
                  - /url: /signup
                  - img [ref=e223]
                  - text: Cancellation Policy
              - listitem [ref=e225]:
                - link "Refund Policy" [ref=e226] [cursor=pointer]:
                  - /url: /signup
                  - img [ref=e227]
                  - text: Refund Policy
              - listitem [ref=e229]:
                - link "Service Guarantee" [ref=e230] [cursor=pointer]:
                  - /url: /signup
                  - img [ref=e231]
                  - text: Service Guarantee
        - generic [ref=e233]:
          - heading "Stay Updated" [level=4] [ref=e234]
          - paragraph [ref=e235]: Get home maintenance tips and exclusive offers.
          - generic [ref=e236]:
            - generic [ref=e237]:
              - img [ref=e238]
              - textbox "Enter your email" [ref=e241]
            - button "Subscribe Now" [ref=e242] [cursor=pointer]
          - link "Chat on WhatsApp" [ref=e243] [cursor=pointer]:
            - /url: https://wa.me/60162104127
            - img [ref=e244]
            - text: Chat on WhatsApp
      - generic [ref=e247]:
        - generic [ref=e248]:
          - generic [ref=e249]: "Follow us:"
          - generic [ref=e250]:
            - link "Facebook" [ref=e251] [cursor=pointer]:
              - /url: https://facebook.com/iprofixer
              - img [ref=e252]
            - link "Instagram" [ref=e254] [cursor=pointer]:
              - /url: https://instagram.com/iprofixer
              - img [ref=e255]
            - link "LinkedIn" [ref=e258] [cursor=pointer]:
              - /url: https://linkedin.com/company/iprofixer
              - img [ref=e259]
            - link "Twitter" [ref=e263] [cursor=pointer]:
              - /url: https://twitter.com/iprofixer
              - img [ref=e264]
            - link "YouTube" [ref=e266] [cursor=pointer]:
              - /url: https://youtube.com/iprofixer
              - img [ref=e267]
        - generic [ref=e270]:
          - generic [ref=e271]: "We accept:"
          - generic [ref=e272]:
            - img [ref=e273]
            - img [ref=e275]
            - img [ref=e277]
            - generic [ref=e279]:
              - img [ref=e280]
              - generic [ref=e282]: Pay
      - generic [ref=e284]:
        - paragraph [ref=e285]: © 2026 iPROFIXER — IPROS EDUCTECH SDN BHD. All rights reserved.
        - generic [ref=e286]:
          - link "Privacy Policy" [ref=e287] [cursor=pointer]:
            - /url: /privacy
          - link "Terms of Service" [ref=e288] [cursor=pointer]:
            - /url: /terms
          - link "Cookies" [ref=e289] [cursor=pointer]:
            - /url: /cookie-policy
    - button "Back to top" [ref=e290] [cursor=pointer]:
      - img [ref=e291]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const timestamp = Date.now();
  4  | const customerEmail = `customer_${timestamp}@test.com`;
  5  | const proEmail = `pro_${timestamp}@test.com`;
  6  | const password = 'Test1234';
  7  | 
  8  | test.describe('Authentication', () => {
  9  | 
  10 |   test('Customer signup succeeds and redirects to dashboard', async ({ page }) => {
  11 |     await page.goto('/signup');
  12 |     await page.waitForLoadState('networkidle');
  13 |     await page.fill('input[name="name"], input[placeholder*="Full Name"], input[placeholder*="name" i]', 'Test Customer');
  14 |     await page.fill('input[type="email"]', customerEmail);
  15 |     const phone = page.locator('input[name="phone"], input[placeholder*="Phone" i]');
  16 |     if (await phone.count() > 0) await phone.first().fill('0123456789');
  17 |     await page.fill('input[type="password"]', password);
  18 |     const confirm = page.locator('input[name="confirmPassword"], input[placeholder*="Confirm" i]');
  19 |     if (await confirm.count() > 0) await confirm.first().fill(password);
  20 |     const checkbox = page.locator('input[type="checkbox"]');
  21 |     if (await checkbox.count() > 0) await checkbox.first().check();
  22 |     await page.click('button[type="submit"], button:has-text("Create Account"), button:has-text("Sign Up")');
> 23 |     await page.waitForURL(/dashboard/, { timeout: 15000 });
     |                ^ TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
  24 |     expect(page.url()).toContain('dashboard');
  25 |   });
  26 | 
  27 |   test('Customer login succeeds', async ({ page }) => {
  28 |     await page.goto('/login');
  29 |     await page.waitForLoadState('networkidle');
  30 |     await page.fill('input[type="email"]', customerEmail);
  31 |     await page.fill('input[type="password"]', password);
  32 |     await page.click('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")');
  33 |     await page.waitForURL(/dashboard/, { timeout: 15000 });
  34 |     expect(page.url()).toContain('dashboard');
  35 |   });
  36 | 
  37 |   test('Login with wrong password shows error', async ({ page }) => {
  38 |     await page.goto('/login');
  39 |     await page.waitForLoadState('networkidle');
  40 |     await page.fill('input[type="email"]', customerEmail);
  41 |     await page.fill('input[type="password"]', 'wrongpassword');
  42 |     await page.click('button[type="submit"], button:has-text("Login")');
  43 |     await page.waitForTimeout(4000);
  44 |     const error = page.locator('[class*="error"], [class*="alert"], [role="alert"], text=/invalid/i, text=/incorrect/i, text=/wrong/i');
  45 |     expect(await error.count()).toBeGreaterThan(0);
  46 |   });
  47 | 
  48 |   test('Professional signup succeeds and redirects to pro dashboard', async ({ page }) => {
  49 |     await page.goto('/pro-signup');
  50 |     await page.waitForLoadState('networkidle');
  51 |     await page.fill('input[name="name"], input[placeholder*="Full Name" i]', 'Siti Pro');
  52 |     await page.fill('input[type="email"]', proEmail);
  53 |     const phone = page.locator('input[name="phone"], input[placeholder*="Phone" i]');
  54 |     if (await phone.count() > 0) await phone.first().fill('0123456789');
  55 |     const whatsapp = page.locator('input[name="whatsapp"], input[placeholder*="WhatsApp" i]');
  56 |     if (await whatsapp.count() > 0) await whatsapp.first().fill('0123456789');
  57 |     const cat = page.locator('select[name="service_category"], select[name="serviceCategory"]');
  58 |     if (await cat.count() > 0) await cat.first().selectOption({ index: 1 });
  59 |     const area = page.locator('select[name="coverage_area"], select[name="coverageArea"]');
  60 |     if (await area.count() > 0) await area.first().selectOption({ index: 1 });
  61 |     const exp = page.locator('input[name="years_experience"], input[name="yearsExperience"], input[placeholder*="Experience" i]');
  62 |     if (await exp.count() > 0) await exp.first().fill('3');
  63 |     await page.fill('input[type="password"]', password);
  64 |     const confirm = page.locator('input[name="confirmPassword"], input[placeholder*="Confirm" i]');
  65 |     if (await confirm.count() > 0) await confirm.first().fill(password);
  66 |     const checkbox = page.locator('input[type="checkbox"]');
  67 |     if (await checkbox.count() > 0) await checkbox.first().check();
  68 |     await page.click('button[type="submit"], button:has-text("Join"), button:has-text("Sign Up"), button:has-text("Complete")');
  69 |     await page.waitForURL(/dashboard/, { timeout: 15000 });
  70 |     expect(page.url()).toContain('dashboard');
  71 |   });
  72 | 
  73 | });
  74 | 
```