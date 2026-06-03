# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 02-auth.spec.js >> AUTH-05 - Professional signup succeeds
- Location: tests\02-auth.spec.js:52:1

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
        - link "Pro Dashboard" [ref=e15] [cursor=pointer]:
          - /url: /pro-dashboard
          - img [ref=e16]
          - text: Pro Dashboard
        - generic [ref=e21]:
          - img [ref=e22]
          - generic [ref=e25]: Hi, Siti
        - button "Logout" [ref=e26] [cursor=pointer]:
          - img [ref=e27]
          - text: Logout
  - generic [ref=e31]:
    - img [ref=e33]
    - heading "Welcome to iPROFIXER Pro!" [level=2] [ref=e36]
    - paragraph [ref=e37]: Your professional account has been created. Redirecting to your dashboard...
  - contentinfo [ref=e38]:
    - generic [ref=e41]:
      - generic [ref=e42]:
        - img [ref=e44]
        - generic [ref=e46]: Verified Pros
      - generic [ref=e47]:
        - img [ref=e49]
        - generic [ref=e52]: Quality Assured
      - generic [ref=e53]:
        - img [ref=e55]
        - generic [ref=e58]: On-Time Service
    - generic [ref=e59]:
      - generic [ref=e60]:
        - generic [ref=e61]:
          - link "iPROFIXER" [ref=e62] [cursor=pointer]:
            - /url: /
            - img "iPROFIXER" [ref=e63]
          - paragraph [ref=e64]: Malaysia's most trusted cleaning service platform. Connecting homeowners with verified cleaning professionals for all your home cleaning needs.
          - generic [ref=e65]:
            - link "+03-8080 5249" [ref=e66] [cursor=pointer]:
              - /url: tel:+60380805249
              - img [ref=e68]
              - generic [ref=e70]: +03-8080 5249
            - link "for_services@iprofixer.com.my" [ref=e71] [cursor=pointer]:
              - /url: mailto:for_services@iprofixer.com.my
              - img [ref=e73]
              - generic [ref=e76]: for_services@iprofixer.com.my
            - generic [ref=e77]:
              - img [ref=e79]
              - generic [ref=e82]: Ara Damansara, Petaling Jaya
        - generic [ref=e83]:
          - generic [ref=e84]:
            - heading "Services" [level=4] [ref=e85]
            - list [ref=e86]:
              - listitem [ref=e87]:
                - link "Home Deep Cleaning" [ref=e88] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e89]
                  - text: Home Deep Cleaning
              - listitem [ref=e91]:
                - link "Regular Maid Service" [ref=e92] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e93]
                  - text: Regular Maid Service
              - listitem [ref=e95]:
                - link "Post-Renovation Cleaning" [ref=e96] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e97]
                  - text: Post-Renovation Cleaning
              - listitem [ref=e99]:
                - link "Sofa & Carpet Cleaning" [ref=e100] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e101]
                  - text: Sofa & Carpet Cleaning
              - listitem [ref=e103]:
                - link "Post-Event Cleanup" [ref=e104] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e105]
                  - text: Post-Event Cleanup
              - listitem [ref=e107]:
                - link "Laundry & Ironing" [ref=e108] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e109]
                  - text: Laundry & Ironing
              - listitem [ref=e111]:
                - link "Part-Time Maid" [ref=e112] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e113]
                  - text: Part-Time Maid
          - generic [ref=e115]:
            - heading "Company" [level=4] [ref=e116]
            - list [ref=e117]:
              - listitem [ref=e118]:
                - link "About iPROFIXER" [ref=e119] [cursor=pointer]:
                  - /url: /about
                  - img [ref=e120]
                  - text: About iPROFIXER
              - listitem [ref=e122]:
                - link "How It Works" [ref=e123] [cursor=pointer]:
                  - /url: /how-it-works
                  - img [ref=e124]
                  - text: How It Works
              - listitem [ref=e126]:
                - link "Join as Professional" [ref=e127] [cursor=pointer]:
                  - /url: /for-professionals
                  - img [ref=e128]
                  - text: Join as Professional
              - listitem [ref=e130]:
                - link "Careers" [ref=e131] [cursor=pointer]:
                  - /url: /pro-signup
                  - img [ref=e132]
                  - text: Careers
              - listitem [ref=e134]:
                - link "Blog & Tips" [ref=e135] [cursor=pointer]:
                  - /url: /pro-signup
                  - img [ref=e136]
                  - text: Blog & Tips
          - generic [ref=e138]:
            - heading "Support" [level=4] [ref=e139]
            - list [ref=e140]:
              - listitem [ref=e141]:
                - link "Help Center / FAQ" [ref=e142] [cursor=pointer]:
                  - /url: /faq
                  - img [ref=e143]
                  - text: Help Center / FAQ
              - listitem [ref=e145]:
                - link "Safety Guidelines" [ref=e146] [cursor=pointer]:
                  - /url: /pro-signup
                  - img [ref=e147]
                  - text: Safety Guidelines
              - listitem [ref=e149]:
                - link "Cancellation Policy" [ref=e150] [cursor=pointer]:
                  - /url: /pro-signup
                  - img [ref=e151]
                  - text: Cancellation Policy
              - listitem [ref=e153]:
                - link "Refund Policy" [ref=e154] [cursor=pointer]:
                  - /url: /pro-signup
                  - img [ref=e155]
                  - text: Refund Policy
              - listitem [ref=e157]:
                - link "Service Guarantee" [ref=e158] [cursor=pointer]:
                  - /url: /pro-signup
                  - img [ref=e159]
                  - text: Service Guarantee
        - generic [ref=e161]:
          - heading "Stay Updated" [level=4] [ref=e162]
          - paragraph [ref=e163]: Get home maintenance tips and exclusive offers.
          - generic [ref=e164]:
            - generic [ref=e165]:
              - img [ref=e166]
              - textbox "Enter your email" [ref=e169]
            - button "Subscribe Now" [ref=e170] [cursor=pointer]
          - link "Chat on WhatsApp" [ref=e171] [cursor=pointer]:
            - /url: https://wa.me/60162104127
            - img [ref=e172]
            - text: Chat on WhatsApp
      - generic [ref=e175]:
        - generic [ref=e176]:
          - generic [ref=e177]: "Follow us:"
          - generic [ref=e178]:
            - link "Facebook" [ref=e179] [cursor=pointer]:
              - /url: https://facebook.com/iprofixer
              - img [ref=e180]
            - link "Instagram" [ref=e182] [cursor=pointer]:
              - /url: https://instagram.com/iprofixer
              - img [ref=e183]
            - link "LinkedIn" [ref=e186] [cursor=pointer]:
              - /url: https://linkedin.com/company/iprofixer
              - img [ref=e187]
            - link "Twitter" [ref=e191] [cursor=pointer]:
              - /url: https://twitter.com/iprofixer
              - img [ref=e192]
            - link "YouTube" [ref=e194] [cursor=pointer]:
              - /url: https://youtube.com/iprofixer
              - img [ref=e195]
        - generic [ref=e198]:
          - generic [ref=e199]: "We accept:"
          - generic [ref=e200]:
            - img [ref=e201]
            - img [ref=e203]
            - img [ref=e205]
            - generic [ref=e207]:
              - img [ref=e208]
              - generic [ref=e210]: Pay
      - generic [ref=e212]:
        - paragraph [ref=e213]: © 2026 iPROFIXER — IPROS EDUCTECH SDN BHD. All rights reserved.
        - generic [ref=e214]:
          - link "Privacy Policy" [ref=e215] [cursor=pointer]:
            - /url: /privacy
          - link "Terms of Service" [ref=e216] [cursor=pointer]:
            - /url: /terms
          - link "Cookies" [ref=e217] [cursor=pointer]:
            - /url: /cookie-policy
    - button "Back to top" [ref=e218] [cursor=pointer]:
      - img [ref=e219]
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
> 50 |   await page.waitForURL(/dashboard/, { timeout: 30000 });
     |              ^ TimeoutError: page.waitForURL: Timeout 30000ms exceeded.
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