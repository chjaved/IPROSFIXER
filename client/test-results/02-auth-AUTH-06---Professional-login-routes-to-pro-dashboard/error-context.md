# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 02-auth.spec.js >> AUTH-06 - Professional login routes to pro dashboard
- Location: tests\02-auth.spec.js:58:1

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
        - generic [ref=e62]: Unexpected end of JSON input
        - generic [ref=e63]:
          - generic [ref=e64]:
            - generic [ref=e65]: Email Address
            - generic [ref=e66]:
              - img [ref=e67]
              - textbox "you@example.com" [ref=e70]: auth_pro_1780458000011@test.com
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
> 26 |   await page.waitForURL(/dashboard/, { timeout: 30000 });
     |              ^ TimeoutError: page.waitForURL: Timeout 30000ms exceeded.
  27 | }
  28 | 
  29 | export async function proSignup(page, email, name = 'Pro Tester') {
  30 |   await page.goto('/pro-signup');
  31 |   await page.waitForLoadState('networkidle');
  32 |   await page.fill('input[name="name"], input[placeholder*="Full Name"]', name);
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