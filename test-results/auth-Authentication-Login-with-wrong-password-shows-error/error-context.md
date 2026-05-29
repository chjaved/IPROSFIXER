# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.js >> Authentication >> Login with wrong password shows error
- Location: tests\auth.spec.js:37:3

# Error details

```
Error: locator.count: Unexpected token "=" while parsing css selector "[class*="error"], [class*="alert"], [role="alert"], text=/invalid/i, text=/incorrect/i, text=/wrong/i". Did you mean to CSS.escape it?
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
      - heading "Welcome Back to iPROFIXER" [level=1] [ref=e26]
      - paragraph [ref=e27]: Sign in to book home services, track your bookings, and manage your account
    - generic [ref=e28]:
      - generic [ref=e29]:
        - img [ref=e30]
        - heading "Secure & Trusted" [level=3] [ref=e32]
        - paragraph [ref=e33]: Background-checked professionals
      - generic [ref=e34]:
        - img [ref=e35]
        - heading "Instant Booking" [level=3] [ref=e37]
        - paragraph [ref=e38]: Book services in under 2 minutes
      - generic [ref=e39]:
        - img [ref=e40]
        - heading "On-Time Service" [level=3] [ref=e43]
        - paragraph [ref=e44]: Track your pro in real-time
      - generic [ref=e45]:
        - img [ref=e46]
        - heading "Quality Assured" [level=3] [ref=e48]
        - paragraph [ref=e49]: Satisfaction guaranteed on every job
  - generic [ref=e51]:
    - generic [ref=e52]:
      - generic [ref=e53]:
        - img "iPROFIXER" [ref=e55]
        - heading "Sign In" [level=2] [ref=e56]
        - paragraph [ref=e57]: Access your dashboard
      - generic [ref=e58]:
        - generic [ref=e59]:
          - button "Customer" [ref=e60] [cursor=pointer]
          - button "Professional" [ref=e61] [cursor=pointer]
        - generic [ref=e62]: "Failed to execute 'json' on 'Response': Unexpected end of JSON input"
        - generic [ref=e63]:
          - generic [ref=e64]:
            - generic [ref=e65]: Email Address
            - generic [ref=e66]:
              - img [ref=e67]
              - textbox "you@example.com" [ref=e70]: customer_1780041190385@test.com
          - generic [ref=e71]:
            - generic [ref=e72]: Password
            - generic [ref=e73]:
              - img [ref=e74]
              - textbox "Enter your password" [ref=e77]: wrongpassword
              - button [ref=e78] [cursor=pointer]:
                - img [ref=e79]
          - generic [ref=e82]:
            - generic [ref=e83] [cursor=pointer]:
              - checkbox "Remember me" [ref=e84]
              - generic [ref=e85]: Remember me
            - link "Forgot password?" [ref=e86] [cursor=pointer]:
              - /url: /forgot-password
          - button "Sign In" [ref=e87] [cursor=pointer]
        - generic [ref=e92]: Don't have an account?
        - generic [ref=e93]:
          - link "Sign up as Customer" [ref=e94] [cursor=pointer]:
            - /url: /signup
          - link "Join as Pro" [ref=e95] [cursor=pointer]:
            - /url: /pro-signup
    - paragraph [ref=e96]:
      - text: By signing in, you agree to our
      - link "Terms" [ref=e97] [cursor=pointer]:
        - /url: /terms
      - text: and
      - link "Privacy Policy" [ref=e98] [cursor=pointer]:
        - /url: /privacy
  - contentinfo [ref=e99]:
    - generic [ref=e102]:
      - generic [ref=e103]:
        - img [ref=e105]
        - generic [ref=e107]: Verified Pros
      - generic [ref=e108]:
        - img [ref=e110]
        - generic [ref=e113]: Quality Assured
      - generic [ref=e114]:
        - img [ref=e116]
        - generic [ref=e119]: On-Time Service
    - generic [ref=e120]:
      - generic [ref=e121]:
        - generic [ref=e122]:
          - link "iPROFIXER" [ref=e123] [cursor=pointer]:
            - /url: /
            - img "iPROFIXER" [ref=e124]
          - paragraph [ref=e125]: Malaysia's most trusted home services platform. Connecting homeowners with verified professionals for cleaning, repairs, and maintenance.
          - generic [ref=e126]:
            - link "+03-8080 5249" [ref=e127] [cursor=pointer]:
              - /url: tel:+60380805249
              - img [ref=e129]
              - generic [ref=e131]: +03-8080 5249
            - link "for_services@iprofixer.com.my" [ref=e132] [cursor=pointer]:
              - /url: mailto:for_services@iprofixer.com.my
              - img [ref=e134]
              - generic [ref=e137]: for_services@iprofixer.com.my
            - generic [ref=e138]:
              - img [ref=e140]
              - generic [ref=e143]: Ara Damansara, Petaling Jaya
        - generic [ref=e144]:
          - generic [ref=e145]:
            - heading "Services" [level=4] [ref=e146]
            - list [ref=e147]:
              - listitem [ref=e148]:
                - link "Deep Cleaning" [ref=e149] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e150]
                  - text: Deep Cleaning
              - listitem [ref=e152]:
                - link "AC Repair & Service" [ref=e153] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e154]
                  - text: AC Repair & Service
              - listitem [ref=e156]:
                - link "Electrical Works" [ref=e157] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e158]
                  - text: Electrical Works
              - listitem [ref=e160]:
                - link "Plumbing" [ref=e161] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e162]
                  - text: Plumbing
              - listitem [ref=e164]:
                - link "Home Maid Service" [ref=e165] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e166]
                  - text: Home Maid Service
              - listitem [ref=e168]:
                - link "Sofa & Carpet Clean" [ref=e169] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e170]
                  - text: Sofa & Carpet Clean
          - generic [ref=e172]:
            - heading "Company" [level=4] [ref=e173]
            - list [ref=e174]:
              - listitem [ref=e175]:
                - link "About iPROFIXER" [ref=e176] [cursor=pointer]:
                  - /url: /about
                  - img [ref=e177]
                  - text: About iPROFIXER
              - listitem [ref=e179]:
                - link "How It Works" [ref=e180] [cursor=pointer]:
                  - /url: /how-it-works
                  - img [ref=e181]
                  - text: How It Works
              - listitem [ref=e183]:
                - link "Join as Professional" [ref=e184] [cursor=pointer]:
                  - /url: /for-professionals
                  - img [ref=e185]
                  - text: Join as Professional
              - listitem [ref=e187]:
                - link "Careers" [ref=e188] [cursor=pointer]:
                  - /url: /login
                  - img [ref=e189]
                  - text: Careers
              - listitem [ref=e191]:
                - link "Blog & Tips" [ref=e192] [cursor=pointer]:
                  - /url: /login
                  - img [ref=e193]
                  - text: Blog & Tips
          - generic [ref=e195]:
            - heading "Support" [level=4] [ref=e196]
            - list [ref=e197]:
              - listitem [ref=e198]:
                - link "Help Center / FAQ" [ref=e199] [cursor=pointer]:
                  - /url: /faq
                  - img [ref=e200]
                  - text: Help Center / FAQ
              - listitem [ref=e202]:
                - link "Safety Guidelines" [ref=e203] [cursor=pointer]:
                  - /url: /login
                  - img [ref=e204]
                  - text: Safety Guidelines
              - listitem [ref=e206]:
                - link "Cancellation Policy" [ref=e207] [cursor=pointer]:
                  - /url: /login
                  - img [ref=e208]
                  - text: Cancellation Policy
              - listitem [ref=e210]:
                - link "Refund Policy" [ref=e211] [cursor=pointer]:
                  - /url: /login
                  - img [ref=e212]
                  - text: Refund Policy
              - listitem [ref=e214]:
                - link "Service Guarantee" [ref=e215] [cursor=pointer]:
                  - /url: /login
                  - img [ref=e216]
                  - text: Service Guarantee
        - generic [ref=e218]:
          - heading "Stay Updated" [level=4] [ref=e219]
          - paragraph [ref=e220]: Get home maintenance tips and exclusive offers.
          - generic [ref=e221]:
            - generic [ref=e222]:
              - img [ref=e223]
              - textbox "Enter your email" [ref=e226]
            - button "Subscribe Now" [ref=e227] [cursor=pointer]
          - link "Chat on WhatsApp" [ref=e228] [cursor=pointer]:
            - /url: https://wa.me/60162104127
            - img [ref=e229]
            - text: Chat on WhatsApp
      - generic [ref=e232]:
        - generic [ref=e233]:
          - generic [ref=e234]: "Follow us:"
          - generic [ref=e235]:
            - link "Facebook" [ref=e236] [cursor=pointer]:
              - /url: https://facebook.com/iprofixer
              - img [ref=e237]
            - link "Instagram" [ref=e239] [cursor=pointer]:
              - /url: https://instagram.com/iprofixer
              - img [ref=e240]
            - link "LinkedIn" [ref=e243] [cursor=pointer]:
              - /url: https://linkedin.com/company/iprofixer
              - img [ref=e244]
            - link "Twitter" [ref=e248] [cursor=pointer]:
              - /url: https://twitter.com/iprofixer
              - img [ref=e249]
            - link "YouTube" [ref=e251] [cursor=pointer]:
              - /url: https://youtube.com/iprofixer
              - img [ref=e252]
        - generic [ref=e255]:
          - generic [ref=e256]: "We accept:"
          - generic [ref=e257]:
            - img [ref=e258]
            - img [ref=e260]
            - img [ref=e262]
            - generic [ref=e264]:
              - img [ref=e265]
              - generic [ref=e267]: Pay
      - generic [ref=e269]:
        - paragraph [ref=e270]: © 2026 iPROFIXER — IPROS EDUCTECH SDN BHD. All rights reserved.
        - generic [ref=e271]:
          - link "Privacy Policy" [ref=e272] [cursor=pointer]:
            - /url: /privacy
          - link "Terms of Service" [ref=e273] [cursor=pointer]:
            - /url: /terms
          - link "Cookies" [ref=e274] [cursor=pointer]:
            - /url: /cookie-policy
    - button "Back to top" [ref=e275] [cursor=pointer]:
      - img [ref=e276]
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
  23 |     await page.waitForURL(/dashboard/, { timeout: 15000 });
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
> 45 |     expect(await error.count()).toBeGreaterThan(0);
     |                        ^ Error: locator.count: Unexpected token "=" while parsing css selector "[class*="error"], [class*="alert"], [role="alert"], text=/invalid/i, text=/incorrect/i, text=/wrong/i". Did you mean to CSS.escape it?
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