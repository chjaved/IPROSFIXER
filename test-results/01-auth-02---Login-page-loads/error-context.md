# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 01-auth.spec.js >> 02 - Login page loads
- Location: tests\01-auth.spec.js:18:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('input[type="email"]')
Expected: visible
Error: strict mode violation: locator('input[type="email"]') resolved to 2 elements:
    1) <input value="" required="" type="email" placeholder="you@example.com" class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none transition-all"/> aka getByRole('textbox', { name: 'you@example.com' })
    2) <input value="" required="" type="email" placeholder="Enter your email" class="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal transition-colors"/> aka getByRole('textbox', { name: 'Enter your email' })

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('input[type="email"]')

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
        - generic [ref=e62]:
          - generic [ref=e63]:
            - generic [ref=e64]: Email Address
            - generic [ref=e65]:
              - img [ref=e66]
              - textbox "you@example.com" [ref=e69]
          - generic [ref=e70]:
            - generic [ref=e71]: Password
            - generic [ref=e72]:
              - img [ref=e73]
              - textbox "Enter your password" [ref=e76]
              - button [ref=e77] [cursor=pointer]:
                - img [ref=e78]
          - generic [ref=e81]:
            - generic [ref=e82] [cursor=pointer]:
              - checkbox "Remember me" [ref=e83]
              - generic [ref=e84]: Remember me
            - link "Forgot password?" [ref=e85] [cursor=pointer]:
              - /url: /forgot-password
          - button "Sign In" [ref=e86] [cursor=pointer]
        - generic [ref=e91]: Don't have an account?
        - generic [ref=e92]:
          - link "Sign up as Customer" [ref=e93] [cursor=pointer]:
            - /url: /signup
          - link "Join as Pro" [ref=e94] [cursor=pointer]:
            - /url: /pro-signup
    - paragraph [ref=e95]:
      - text: By signing in, you agree to our
      - link "Terms" [ref=e96] [cursor=pointer]:
        - /url: /terms
      - text: and
      - link "Privacy Policy" [ref=e97] [cursor=pointer]:
        - /url: /privacy
  - contentinfo [ref=e98]:
    - generic [ref=e101]:
      - generic [ref=e102]:
        - img [ref=e104]
        - generic [ref=e106]: Verified Pros
      - generic [ref=e107]:
        - img [ref=e109]
        - generic [ref=e112]: Quality Assured
      - generic [ref=e113]:
        - img [ref=e115]
        - generic [ref=e118]: On-Time Service
    - generic [ref=e119]:
      - generic [ref=e120]:
        - generic [ref=e121]:
          - link "iPROFIXER" [ref=e122] [cursor=pointer]:
            - /url: /
            - img "iPROFIXER" [ref=e123]
          - paragraph [ref=e124]: Malaysia's most trusted cleaning service platform. Connecting homeowners with verified cleaning professionals for all your home cleaning needs.
          - generic [ref=e125]:
            - link "+03-8080 5249" [ref=e126] [cursor=pointer]:
              - /url: tel:+60380805249
              - img [ref=e128]
              - generic [ref=e130]: +03-8080 5249
            - link "for_services@iprofixer.com.my" [ref=e131] [cursor=pointer]:
              - /url: mailto:for_services@iprofixer.com.my
              - img [ref=e133]
              - generic [ref=e136]: for_services@iprofixer.com.my
            - generic [ref=e137]:
              - img [ref=e139]
              - generic [ref=e142]: Ara Damansara, Petaling Jaya
        - generic [ref=e143]:
          - generic [ref=e144]:
            - heading "Services" [level=4] [ref=e145]
            - list [ref=e146]:
              - listitem [ref=e147]:
                - link "Home Deep Cleaning" [ref=e148] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e149]
                  - text: Home Deep Cleaning
              - listitem [ref=e151]:
                - link "Regular Maid Service" [ref=e152] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e153]
                  - text: Regular Maid Service
              - listitem [ref=e155]:
                - link "Post-Renovation Cleaning" [ref=e156] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e157]
                  - text: Post-Renovation Cleaning
              - listitem [ref=e159]:
                - link "Sofa & Carpet Cleaning" [ref=e160] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e161]
                  - text: Sofa & Carpet Cleaning
              - listitem [ref=e163]:
                - link "Post-Event Cleanup" [ref=e164] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e165]
                  - text: Post-Event Cleanup
              - listitem [ref=e167]:
                - link "Laundry & Ironing" [ref=e168] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e169]
                  - text: Laundry & Ironing
              - listitem [ref=e171]:
                - link "Part-Time Maid" [ref=e172] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e173]
                  - text: Part-Time Maid
          - generic [ref=e175]:
            - heading "Company" [level=4] [ref=e176]
            - list [ref=e177]:
              - listitem [ref=e178]:
                - link "About iPROFIXER" [ref=e179] [cursor=pointer]:
                  - /url: /about
                  - img [ref=e180]
                  - text: About iPROFIXER
              - listitem [ref=e182]:
                - link "How It Works" [ref=e183] [cursor=pointer]:
                  - /url: /how-it-works
                  - img [ref=e184]
                  - text: How It Works
              - listitem [ref=e186]:
                - link "Join as Professional" [ref=e187] [cursor=pointer]:
                  - /url: /for-professionals
                  - img [ref=e188]
                  - text: Join as Professional
              - listitem [ref=e190]:
                - link "Careers" [ref=e191] [cursor=pointer]:
                  - /url: /login
                  - img [ref=e192]
                  - text: Careers
              - listitem [ref=e194]:
                - link "Blog & Tips" [ref=e195] [cursor=pointer]:
                  - /url: /login
                  - img [ref=e196]
                  - text: Blog & Tips
          - generic [ref=e198]:
            - heading "Support" [level=4] [ref=e199]
            - list [ref=e200]:
              - listitem [ref=e201]:
                - link "Help Center / FAQ" [ref=e202] [cursor=pointer]:
                  - /url: /faq
                  - img [ref=e203]
                  - text: Help Center / FAQ
              - listitem [ref=e205]:
                - link "Safety Guidelines" [ref=e206] [cursor=pointer]:
                  - /url: /login
                  - img [ref=e207]
                  - text: Safety Guidelines
              - listitem [ref=e209]:
                - link "Cancellation Policy" [ref=e210] [cursor=pointer]:
                  - /url: /login
                  - img [ref=e211]
                  - text: Cancellation Policy
              - listitem [ref=e213]:
                - link "Refund Policy" [ref=e214] [cursor=pointer]:
                  - /url: /login
                  - img [ref=e215]
                  - text: Refund Policy
              - listitem [ref=e217]:
                - link "Service Guarantee" [ref=e218] [cursor=pointer]:
                  - /url: /login
                  - img [ref=e219]
                  - text: Service Guarantee
        - generic [ref=e221]:
          - heading "Stay Updated" [level=4] [ref=e222]
          - paragraph [ref=e223]: Get home maintenance tips and exclusive offers.
          - generic [ref=e224]:
            - generic [ref=e225]:
              - img [ref=e226]
              - textbox "Enter your email" [ref=e229]
            - button "Subscribe Now" [ref=e230] [cursor=pointer]
          - link "Chat on WhatsApp" [ref=e231] [cursor=pointer]:
            - /url: https://wa.me/60162104127
            - img [ref=e232]
            - text: Chat on WhatsApp
      - generic [ref=e235]:
        - generic [ref=e236]:
          - generic [ref=e237]: "Follow us:"
          - generic [ref=e238]:
            - link "Facebook" [ref=e239] [cursor=pointer]:
              - /url: https://facebook.com/iprofixer
              - img [ref=e240]
            - link "Instagram" [ref=e242] [cursor=pointer]:
              - /url: https://instagram.com/iprofixer
              - img [ref=e243]
            - link "LinkedIn" [ref=e246] [cursor=pointer]:
              - /url: https://linkedin.com/company/iprofixer
              - img [ref=e247]
            - link "Twitter" [ref=e251] [cursor=pointer]:
              - /url: https://twitter.com/iprofixer
              - img [ref=e252]
            - link "YouTube" [ref=e254] [cursor=pointer]:
              - /url: https://youtube.com/iprofixer
              - img [ref=e255]
        - generic [ref=e258]:
          - generic [ref=e259]: "We accept:"
          - generic [ref=e260]:
            - img [ref=e261]
            - img [ref=e263]
            - img [ref=e265]
            - generic [ref=e267]:
              - img [ref=e268]
              - generic [ref=e270]: Pay
      - generic [ref=e272]:
        - paragraph [ref=e273]: © 2026 iPROFIXER — IPROS EDUCTECH SDN BHD. All rights reserved.
        - generic [ref=e274]:
          - link "Privacy Policy" [ref=e275] [cursor=pointer]:
            - /url: /privacy
          - link "Terms of Service" [ref=e276] [cursor=pointer]:
            - /url: /terms
          - link "Cookies" [ref=e277] [cursor=pointer]:
            - /url: /cookie-policy
    - button "Back to top" [ref=e278] [cursor=pointer]:
      - img [ref=e279]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { customerSignup, customerLogin, proSignup } from './helpers.js';
  3  | 
  4  | const t = Date.now();
  5  | const custEmail = `cust_${t}@test.com`;
  6  | const proEmail = `pro_${t}@test.com`;
  7  | const password = 'Test1234!';
  8  | 
  9  | test('01 - Homepage loads correctly', async ({ page }) => {
  10 |   await page.goto('/');
  11 |   await page.waitForLoadState('networkidle');
  12 |   await expect(page).toHaveTitle(/iPROFIXER/i);
  13 |   const heading = page.locator('h1, h2').first();
  14 |   await expect(heading).toBeVisible();
  15 |   console.log('✅ Homepage loaded');
  16 | });
  17 | 
  18 | test('02 - Login page loads', async ({ page }) => {
  19 |   await page.goto('/login');
> 20 |   await expect(page.locator('input[type="email"]')).toBeVisible();
     |                                                     ^ Error: expect(locator).toBeVisible() failed
  21 |   await expect(page.locator('input[type="password"]')).toBeVisible();
  22 |   await expect(page.locator('button[type="submit"]')).toBeVisible();
  23 |   console.log('✅ Login page loaded');
  24 | });
  25 | 
  26 | test('03 - Customer signup creates account and redirects to dashboard', async ({ page }) => {
  27 |   await customerSignup(page, custEmail, password);
  28 |   expect(page.url()).toContain('dashboard');
  29 |   console.log('✅ Customer signup successful:', custEmail);
  30 | });
  31 | 
  32 | test('04 - Customer login works', async ({ page }) => {
  33 |   await customerLogin(page, custEmail, password);
  34 |   expect(page.url()).toContain('dashboard');
  35 |   console.log('✅ Customer login successful');
  36 | });
  37 | 
  38 | test('05 - Wrong password shows error message', async ({ page }) => {
  39 |   await page.goto('/login');
  40 |   await page.waitForLoadState('networkidle');
  41 |   await page.fill('input[type="email"]', custEmail);
  42 |   await page.fill('input[type="password"]', 'wrongpassword123');
  43 |   await page.click('button[type="submit"]');
  44 |   await page.waitForTimeout(5000);
  45 |   const body = await page.locator('body').innerText();
  46 |   const hasError = body.toLowerCase().includes('invalid') || 
  47 |                    body.toLowerCase().includes('incorrect') || 
  48 |                    body.toLowerCase().includes('wrong') ||
  49 |                    body.toLowerCase().includes('error') ||
  50 |                    body.toLowerCase().includes('failed');
  51 |   expect(hasError).toBeTruthy();
  52 |   console.log('✅ Wrong password error shown');
  53 | });
  54 | 
  55 | test('06 - Professional signup creates account and redirects to pro dashboard', async ({ page }) => {
  56 |   await proSignup(page, proEmail, password);
  57 |   expect(page.url()).toContain('dashboard');
  58 |   console.log('✅ Professional signup successful:', proEmail);
  59 | });
  60 | 
  61 | test('07 - Logout works correctly', async ({ page }) => {
  62 |   await customerLogin(page, custEmail, password);
  63 |   await page.waitForTimeout(2000);
  64 |   const logout = page.locator('button:has-text("Logout"), button:has-text("Sign Out"), a:has-text("Logout"), a:has-text("Sign Out")');
  65 |   if (await logout.count() > 0) {
  66 |     await logout.first().click();
  67 |     await page.waitForTimeout(3000);
  68 |     expect(page.url()).not.toContain('dashboard');
  69 |     console.log('✅ Logout successful');
  70 |   } else {
  71 |     console.log('⚠️ Logout button not found — skipping');
  72 |   }
  73 | });
  74 | 
```