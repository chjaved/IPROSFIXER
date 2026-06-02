# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 02-auth.spec.js >> AUTH-12 - Token persists after page refresh
- Location: tests\02-auth.spec.js:115:1

# Error details

```
TimeoutError: page.waitForURL: Timeout 30000ms exceeded.
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
        - generic [ref=e62]: Invalid credentials
        - generic [ref=e63]:
          - generic [ref=e64]:
            - generic [ref=e65]: Email Address
            - generic [ref=e66]:
              - img [ref=e67]
              - textbox "you@example.com" [ref=e70]: auth_cust_1780333843856@test.com
          - generic [ref=e71]:
            - generic [ref=e72]: Password
            - generic [ref=e73]:
              - img [ref=e74]
              - textbox "Enter your password" [ref=e77]: Test1234!
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
          - paragraph [ref=e125]: Malaysia's most trusted cleaning service platform. Connecting homeowners with verified cleaning professionals for all your home cleaning needs.
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
                - link "Home Deep Cleaning" [ref=e149] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e150]
                  - text: Home Deep Cleaning
              - listitem [ref=e152]:
                - link "Regular Maid Service" [ref=e153] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e154]
                  - text: Regular Maid Service
              - listitem [ref=e156]:
                - link "Post-Renovation Cleaning" [ref=e157] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e158]
                  - text: Post-Renovation Cleaning
              - listitem [ref=e160]:
                - link "Sofa & Carpet Cleaning" [ref=e161] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e162]
                  - text: Sofa & Carpet Cleaning
              - listitem [ref=e164]:
                - link "Post-Event Cleanup" [ref=e165] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e166]
                  - text: Post-Event Cleanup
              - listitem [ref=e168]:
                - link "Laundry & Ironing" [ref=e169] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e170]
                  - text: Laundry & Ironing
              - listitem [ref=e172]:
                - link "Part-Time Maid" [ref=e173] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e174]
                  - text: Part-Time Maid
          - generic [ref=e176]:
            - heading "Company" [level=4] [ref=e177]
            - list [ref=e178]:
              - listitem [ref=e179]:
                - link "About iPROFIXER" [ref=e180] [cursor=pointer]:
                  - /url: /about
                  - img [ref=e181]
                  - text: About iPROFIXER
              - listitem [ref=e183]:
                - link "How It Works" [ref=e184] [cursor=pointer]:
                  - /url: /how-it-works
                  - img [ref=e185]
                  - text: How It Works
              - listitem [ref=e187]:
                - link "Join as Professional" [ref=e188] [cursor=pointer]:
                  - /url: /for-professionals
                  - img [ref=e189]
                  - text: Join as Professional
              - listitem [ref=e191]:
                - link "Careers" [ref=e192] [cursor=pointer]:
                  - /url: /login
                  - img [ref=e193]
                  - text: Careers
              - listitem [ref=e195]:
                - link "Blog & Tips" [ref=e196] [cursor=pointer]:
                  - /url: /login
                  - img [ref=e197]
                  - text: Blog & Tips
          - generic [ref=e199]:
            - heading "Support" [level=4] [ref=e200]
            - list [ref=e201]:
              - listitem [ref=e202]:
                - link "Help Center / FAQ" [ref=e203] [cursor=pointer]:
                  - /url: /faq
                  - img [ref=e204]
                  - text: Help Center / FAQ
              - listitem [ref=e206]:
                - link "Safety Guidelines" [ref=e207] [cursor=pointer]:
                  - /url: /login
                  - img [ref=e208]
                  - text: Safety Guidelines
              - listitem [ref=e210]:
                - link "Cancellation Policy" [ref=e211] [cursor=pointer]:
                  - /url: /login
                  - img [ref=e212]
                  - text: Cancellation Policy
              - listitem [ref=e214]:
                - link "Refund Policy" [ref=e215] [cursor=pointer]:
                  - /url: /login
                  - img [ref=e216]
                  - text: Refund Policy
              - listitem [ref=e218]:
                - link "Service Guarantee" [ref=e219] [cursor=pointer]:
                  - /url: /login
                  - img [ref=e220]
                  - text: Service Guarantee
        - generic [ref=e222]:
          - heading "Stay Updated" [level=4] [ref=e223]
          - paragraph [ref=e224]: Get home maintenance tips and exclusive offers.
          - generic [ref=e225]:
            - generic [ref=e226]:
              - img [ref=e227]
              - textbox "Enter your email" [ref=e230]
            - button "Subscribe Now" [ref=e231] [cursor=pointer]
          - link "Chat on WhatsApp" [ref=e232] [cursor=pointer]:
            - /url: https://wa.me/60162104127
            - img [ref=e233]
            - text: Chat on WhatsApp
      - generic [ref=e236]:
        - generic [ref=e237]:
          - generic [ref=e238]: "Follow us:"
          - generic [ref=e239]:
            - link "Facebook" [ref=e240] [cursor=pointer]:
              - /url: https://facebook.com/iprofixer
              - img [ref=e241]
            - link "Instagram" [ref=e243] [cursor=pointer]:
              - /url: https://instagram.com/iprofixer
              - img [ref=e244]
            - link "LinkedIn" [ref=e247] [cursor=pointer]:
              - /url: https://linkedin.com/company/iprofixer
              - img [ref=e248]
            - link "Twitter" [ref=e252] [cursor=pointer]:
              - /url: https://twitter.com/iprofixer
              - img [ref=e253]
            - link "YouTube" [ref=e255] [cursor=pointer]:
              - /url: https://youtube.com/iprofixer
              - img [ref=e256]
        - generic [ref=e259]:
          - generic [ref=e260]: "We accept:"
          - generic [ref=e261]:
            - img [ref=e262]
            - img [ref=e264]
            - img [ref=e266]
            - generic [ref=e268]:
              - img [ref=e269]
              - generic [ref=e271]: Pay
      - generic [ref=e273]:
        - paragraph [ref=e274]: © 2026 iPROFIXER — IPROS EDUCTECH SDN BHD. All rights reserved.
        - generic [ref=e275]:
          - link "Privacy Policy" [ref=e276] [cursor=pointer]:
            - /url: /privacy
          - link "Terms of Service" [ref=e277] [cursor=pointer]:
            - /url: /terms
          - link "Cookies" [ref=e278] [cursor=pointer]:
            - /url: /cookie-policy
    - button "Back to top" [ref=e279] [cursor=pointer]:
      - img [ref=e280]
```

# Test source

```ts
  1  | export const timestamp = () => Date.now();
  2  | 
  3  | export async function customerSignup(page, email, password = 'Test1234!') {
  4  |   await page.goto('/signup');
  5  |   await page.waitForLoadState('networkidle');
  6  |   await page.fill('input[name="name"], input[placeholder*="Full Name"]', 'Ahmad Test Customer');
  7  |   await page.fill('input[type="email"]', email);
  8  |   await page.fill('input[placeholder*="Phone"], input[name="phone"]', '0123456789');
  9  |   await page.fill('input[type="password"]', password);
  10 |   const confirm = page.locator('input[placeholder*="Confirm"], input[name="confirmPassword"], input[name="confirm"]');
  11 |   if (await confirm.count() > 0) await confirm.fill(password);
  12 |   const checkbox = page.locator('input[type="checkbox"]');
  13 |   if (await checkbox.count() > 0) await checkbox.check();
  14 |   await page.click('button[type="submit"]');
  15 |   await page.waitForURL(/dashboard/, { timeout: 30000 });
  16 | }
  17 | 
  18 | export async function customerLogin(page, email, password = 'Test1234!') {
  19 |   await page.goto('/login');
  20 |   await page.waitForLoadState('networkidle');
  21 |   await page.locator('input[type="email"]').first().fill(email);
  22 |   await page.locator('input[type="password"]').first().fill(password);
  23 |   await page.locator('button[type="submit"]').first().click();
> 24 |   await page.waitForURL(/dashboard/, { timeout: 30000 });
     |              ^ TimeoutError: page.waitForURL: Timeout 30000ms exceeded.
  25 | }
  26 | 
  27 | export async function proSignup(page, email, password = 'Test1234!') {
  28 |   await page.goto('/pro-signup');
  29 |   await page.waitForLoadState('networkidle');
  30 |   
  31 |   // Fill exact field names from ProSignup.jsx
  32 |   await page.fill('input[name="name"]', 'Siti Pro Professional');
  33 |   await page.fill('input[name="email"]', email);
  34 |   await page.fill('input[name="phone"]', '0123456789');
  35 |   await page.selectOption('select[name="serviceCategory"]', 'Part-Time Maid / Cleaner');
  36 |   await page.selectOption('select[name="location"]', 'Kuala Lumpur');
  37 |   await page.selectOption('select[name="experience"]', '3-5');
  38 |   await page.fill('input[name="password"]', password);
  39 |   await page.fill('input[name="confirmPassword"]', password);
  40 |   
  41 |   // Check both checkboxes (hasTransport and terms agreement)
  42 |   await page.check('input[name="hasTransport"]');
  43 |   // Terms checkbox doesn't have name, check by label text
  44 |   const termsCheckbox = page.locator('label:has-text("I agree to the") input[type="checkbox"]');
  45 |   if (await termsCheckbox.count() > 0) {
  46 |     await termsCheckbox.check();
  47 |   }
  48 |   
  49 |   await page.click('button[type="submit"]');
  50 |   
  51 |   // Debug logging
  52 |   await page.waitForTimeout(3000);
  53 |   console.log('URL after pro signup submit:', page.url());
  54 |   const body = await page.locator('body').innerText();
  55 |   console.log('Page content after submit:', body.substring(0, 300));
  56 |   
  57 |   // Wait for pro-dashboard redirect (not /dashboard/)
  58 |   await page.waitForURL(/pro-dashboard/, { timeout: 30000 });
  59 | }
  60 | 
  61 | export async function proLogin(page, email, password = 'Test1234!') {
  62 |   await page.goto('/login');
  63 |   await page.waitForLoadState('networkidle');
  64 |   await page.locator('input[type="email"]').first().fill(email);
  65 |   await page.locator('input[type="password"]').first().fill(password);
  66 |   await page.locator('button[type="submit"]').first().click();
  67 |   await page.waitForURL(/dashboard/, { timeout: 30000 });
  68 | }
  69 | 
```