# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.js >> Authentication >> Login with wrong password shows error
- Location: tests\auth.spec.js:37:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[class*="error"], [class*="alert"], [role="alert"]')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('[class*="error"], [class*="alert"], [role="alert"]')

```

```yaml
- banner:
  - link "iPROFIXER home":
    - /url: /
    - img "iPROFIXER"
  - navigation:
    - link "Home":
      - /url: /
    - link "Services":
      - /url: /services
    - link "How It Works":
      - /url: /how-it-works
    - link "For Pros":
      - /url: /for-professionals
    - link "FAQ":
      - /url: /faq
  - link "Login":
    - /url: /login
    - img
    - text: Login
  - link "Sign Up":
    - /url: /signup
    - img
    - text: Sign Up
- heading "Welcome Back to iPROFIXER" [level=1]
- paragraph: Sign in to book home services, track your bookings, and manage your account
- img
- heading "Secure & Trusted" [level=3]
- paragraph: Background-checked professionals
- img
- heading "Instant Booking" [level=3]
- paragraph: Book services in under 2 minutes
- img
- heading "On-Time Service" [level=3]
- paragraph: Track your pro in real-time
- img
- heading "Quality Assured" [level=3]
- paragraph: Satisfaction guaranteed on every job
- img "iPROFIXER"
- heading "Sign In" [level=2]
- paragraph: Access your dashboard
- button "Customer"
- button "Professional"
- text: Invalid credentials Email Address
- img
- textbox "you@example.com": customer_1780298867409@test.com
- text: Password
- img
- textbox "Enter your password": wrongpassword
- button:
  - img
- checkbox "Remember me"
- text: Remember me
- link "Forgot password?":
  - /url: /forgot-password
- button "Sign In"
- text: Don't have an account?
- link "Sign up as Customer":
  - /url: /signup
- link "Join as Pro":
  - /url: /pro-signup
- paragraph:
  - text: By signing in, you agree to our
  - link "Terms":
    - /url: /terms
  - text: and
  - link "Privacy Policy":
    - /url: /privacy
- contentinfo:
  - img
  - text: Verified Pros
  - img
  - text: Quality Assured
  - img
  - text: On-Time Service
  - link "iPROFIXER":
    - /url: /
    - img "iPROFIXER"
  - paragraph: Malaysia's most trusted cleaning service platform. Connecting homeowners with verified cleaning professionals for all your home cleaning needs.
  - link "+03-8080 5249":
    - /url: tel:+60380805249
    - img
    - text: +03-8080 5249
  - link "for_services@iprofixer.com.my":
    - /url: mailto:for_services@iprofixer.com.my
    - img
    - text: for_services@iprofixer.com.my
  - img
  - text: Ara Damansara, Petaling Jaya
  - heading "Services" [level=4]
  - list:
    - listitem:
      - link "Home Deep Cleaning":
        - /url: /services
        - img
        - text: Home Deep Cleaning
    - listitem:
      - link "Regular Maid Service":
        - /url: /services
        - img
        - text: Regular Maid Service
    - listitem:
      - link "Post-Renovation Cleaning":
        - /url: /services
        - img
        - text: Post-Renovation Cleaning
    - listitem:
      - link "Sofa & Carpet Cleaning":
        - /url: /services
        - img
        - text: Sofa & Carpet Cleaning
    - listitem:
      - link "Post-Event Cleanup":
        - /url: /services
        - img
        - text: Post-Event Cleanup
    - listitem:
      - link "Laundry & Ironing":
        - /url: /services
        - img
        - text: Laundry & Ironing
    - listitem:
      - link "Part-Time Maid":
        - /url: /services
        - img
        - text: Part-Time Maid
  - heading "Company" [level=4]
  - list:
    - listitem:
      - link "About iPROFIXER":
        - /url: /about
        - img
        - text: About iPROFIXER
    - listitem:
      - link "How It Works":
        - /url: /how-it-works
        - img
        - text: How It Works
    - listitem:
      - link "Join as Professional":
        - /url: /for-professionals
        - img
        - text: Join as Professional
    - listitem:
      - link "Careers":
        - /url: /login
        - img
        - text: Careers
    - listitem:
      - link "Blog & Tips":
        - /url: /login
        - img
        - text: Blog & Tips
  - heading "Support" [level=4]
  - list:
    - listitem:
      - link "Help Center / FAQ":
        - /url: /faq
        - img
        - text: Help Center / FAQ
    - listitem:
      - link "Safety Guidelines":
        - /url: /login
        - img
        - text: Safety Guidelines
    - listitem:
      - link "Cancellation Policy":
        - /url: /login
        - img
        - text: Cancellation Policy
    - listitem:
      - link "Refund Policy":
        - /url: /login
        - img
        - text: Refund Policy
    - listitem:
      - link "Service Guarantee":
        - /url: /login
        - img
        - text: Service Guarantee
  - heading "Stay Updated" [level=4]
  - paragraph: Get home maintenance tips and exclusive offers.
  - img
  - textbox "Enter your email"
  - button "Subscribe Now"
  - link "Chat on WhatsApp":
    - /url: https://wa.me/60162104127
    - img
    - text: Chat on WhatsApp
  - text: "Follow us:"
  - link "Facebook":
    - /url: https://facebook.com/iprofixer
    - img
  - link "Instagram":
    - /url: https://instagram.com/iprofixer
    - img
  - link "LinkedIn":
    - /url: https://linkedin.com/company/iprofixer
    - img
  - link "Twitter":
    - /url: https://twitter.com/iprofixer
    - img
  - link "YouTube":
    - /url: https://youtube.com/iprofixer
    - img
  - text: "We accept:"
  - img
  - img
  - img
  - img
  - text: Pay
  - paragraph: © 2026 iPROFIXER — IPROS EDUCTECH SDN BHD. All rights reserved.
  - link "Privacy Policy":
    - /url: /privacy
  - link "Terms of Service":
    - /url: /terms
  - link "Cookies":
    - /url: /cookie-policy
  - button "Back to top":
    - img
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
  44 |     const error = page.locator('[class*="error"], [class*="alert"], [role="alert"]');
> 45 |     await expect(error).toBeVisible({ timeout: 5000 });
     |                         ^ Error: expect(locator).toBeVisible() failed
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