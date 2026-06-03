# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 07-e2e-full-lifecycle.spec.js >> E2E-01 - Complete full lifecycle from signup to payment to review
- Location: tests\07-e2e-full-lifecycle.spec.js:4:1

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
              - textbox "John Doe" [ref=e64]: E2E Customer
          - generic [ref=e65]:
            - generic [ref=e66]: Email Address
            - generic [ref=e67]:
              - img [ref=e68]
              - textbox "you@example.com" [ref=e71]: e2e_cust_1780458486824@test.com
          - generic [ref=e72]:
            - generic [ref=e73]: Phone Number
            - generic [ref=e74]:
              - img [ref=e75]
              - textbox "+60 12-345-6789" [ref=e77]: "0123456789"
          - generic [ref=e78]:
            - generic [ref=e79]: Password
            - generic [ref=e80]:
              - img [ref=e81]
              - textbox "At least 6 characters" [ref=e84]: Test1234!
              - button [ref=e85] [cursor=pointer]:
                - img [ref=e86]
          - generic [ref=e89]:
            - generic [ref=e90]: Confirm Password
            - generic [ref=e91]:
              - img [ref=e92]
              - textbox "Confirm your password" [ref=e95]: Test1234!
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
> 17 |   await page.waitForURL(/dashboard/, { timeout: 30000 });
     |              ^ TimeoutError: page.waitForURL: Timeout 30000ms exceeded.
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