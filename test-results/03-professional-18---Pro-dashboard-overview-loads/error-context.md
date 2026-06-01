# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 03-professional.spec.js >> 18 - Pro dashboard overview loads
- Location: tests\03-professional.spec.js:18:1

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
      - heading "Join iPROFIXER as a Professional" [level=1] [ref=e26]
      - paragraph [ref=e27]: Start earning with your skills. Connect with thousands of customers in your area.
    - generic [ref=e28]:
      - generic [ref=e29]:
        - img [ref=e30]
        - heading "Earn More" [level=3] [ref=e32]
        - paragraph [ref=e33]: Competitive rates & tips
      - generic [ref=e34]:
        - img [ref=e35]
        - heading "More Jobs" [level=3] [ref=e40]
        - paragraph [ref=e41]: Steady stream of customers
      - generic [ref=e42]:
        - img [ref=e43]
        - heading "Grow Skills" [level=3] [ref=e46]
        - paragraph [ref=e47]: Build your reputation
  - generic [ref=e49]:
    - link "Back to Home" [ref=e50] [cursor=pointer]:
      - /url: /
      - img [ref=e51]
      - text: Back to Home
    - generic [ref=e53]:
      - generic [ref=e54]:
        - img "iPROFIXER" [ref=e56]
        - heading "Join as a Cleaner" [level=1] [ref=e57]
        - paragraph [ref=e58]: Maids, deep cleaners, helpers & caregivers welcome
      - generic [ref=e59]:
        - generic [ref=e60]:
          - generic [ref=e61]:
            - generic [ref=e62]: Full Name
            - generic [ref=e63]:
              - img [ref=e64]
              - textbox "Your full name" [ref=e67]: Siti Pro Professional
          - generic [ref=e68]:
            - generic [ref=e69]: Email Address
            - generic [ref=e70]:
              - img [ref=e71]
              - textbox "you@example.com" [ref=e74]: prodash_1780328946707@test.com
          - generic [ref=e75]:
            - generic [ref=e76]: Phone Number
            - generic [ref=e77]:
              - img [ref=e78]
              - textbox "+60 12-345-6789" [ref=e80]: "0123456789"
          - generic [ref=e81]:
            - generic [ref=e82]: Service Category
            - generic [ref=e83]:
              - img [ref=e84]
              - combobox [ref=e87]:
                - option "Select your service"
                - option "Part-Time Maid / Cleaner" [selected]
                - option "Full-Time Maid"
                - option "Live-In Maid"
                - option "Household Helper"
                - option "Wash & Fold Service"
                - option "Ironing & Pressing"
                - option "Dry Cleaning"
                - option "Laundry Pickup & Delivery"
                - option "Deep Home Cleaning"
                - option "Post-Renovation Cleaning"
                - option "Post-Event / Party Cleanup"
                - option "Move-In / Move-Out Cleaning"
                - option "Sofa & Upholstery Cleaning"
                - option "Carpet & Rug Cleaning"
                - option "Mattress Cleaning"
                - option "Curtain Cleaning"
                - option "Marble / Parquet Polishing"
                - option "Newborn / Confinement Helper"
                - option "Post-Natal Care Assistant"
                - option "Elderly Care Helper"
                - option "Childcare / Nanny"
          - generic [ref=e88]:
            - generic [ref=e89]:
              - generic [ref=e90]: Location
              - generic [ref=e91]:
                - img [ref=e92]
                - combobox [active] [ref=e95]:
                  - option "Select area" [selected]
                  - option "Kuala Lumpur"
                  - option "Petaling Jaya"
                  - option "Shah Alam"
                  - option "Subang Jaya"
                  - option "Cheras"
                  - option "Klang"
                  - option "Cyberjaya"
                  - option "Putrajaya"
                  - option "Ampang"
                  - option "Bangsar"
                  - option "Mont Kiara"
                  - option "Damansara"
            - generic [ref=e96]:
              - generic [ref=e97]: Experience
              - combobox [ref=e98]:
                - option "Select" [selected]
                - option "0-1 years"
                - option "1-3 years"
                - option "3-5 years"
                - option "5+ years"
          - generic [ref=e99] [cursor=pointer]:
            - checkbox "I have my own transport" [checked] [ref=e100]
            - generic [ref=e101]: I have my own transport
          - generic [ref=e102]:
            - generic [ref=e103]: Password
            - generic [ref=e104]:
              - img [ref=e105]
              - textbox "At least 6 characters" [ref=e108]: Test1234!
              - button [ref=e109] [cursor=pointer]:
                - img [ref=e110]
          - generic [ref=e113]:
            - generic [ref=e114]: Confirm Password
            - generic [ref=e115]:
              - img [ref=e116]
              - textbox "Confirm your password" [ref=e119]: Test1234!
              - button [ref=e120] [cursor=pointer]:
                - img [ref=e121]
          - generic [ref=e124] [cursor=pointer]:
            - checkbox "I agree to the Terms of Service, Privacy Policy, and undergo a background check" [checked] [ref=e125]
            - generic [ref=e126]:
              - text: I agree to the
              - link "Terms of Service" [ref=e127]:
                - /url: /terms
              - text: ","
              - link "Privacy Policy" [ref=e128]:
                - /url: /privacy
              - text: ", and undergo a background check"
          - button "Join as Professional" [ref=e129] [cursor=pointer]
        - generic [ref=e134]: Already registered?
        - link "Sign in to your account" [ref=e135] [cursor=pointer]:
          - /url: /login
    - paragraph [ref=e136]:
      - text: Looking for home services?
      - link "Sign up as Customer" [ref=e137] [cursor=pointer]:
        - /url: /signup
  - contentinfo [ref=e138]:
    - generic [ref=e141]:
      - generic [ref=e142]:
        - img [ref=e144]
        - generic [ref=e146]: Verified Pros
      - generic [ref=e147]:
        - img [ref=e149]
        - generic [ref=e152]: Quality Assured
      - generic [ref=e153]:
        - img [ref=e155]
        - generic [ref=e158]: On-Time Service
    - generic [ref=e159]:
      - generic [ref=e160]:
        - generic [ref=e161]:
          - link "iPROFIXER" [ref=e162] [cursor=pointer]:
            - /url: /
            - img "iPROFIXER" [ref=e163]
          - paragraph [ref=e164]: Malaysia's most trusted cleaning service platform. Connecting homeowners with verified cleaning professionals for all your home cleaning needs.
          - generic [ref=e165]:
            - link "+03-8080 5249" [ref=e166] [cursor=pointer]:
              - /url: tel:+60380805249
              - img [ref=e168]
              - generic [ref=e170]: +03-8080 5249
            - link "for_services@iprofixer.com.my" [ref=e171] [cursor=pointer]:
              - /url: mailto:for_services@iprofixer.com.my
              - img [ref=e173]
              - generic [ref=e176]: for_services@iprofixer.com.my
            - generic [ref=e177]:
              - img [ref=e179]
              - generic [ref=e182]: Ara Damansara, Petaling Jaya
        - generic [ref=e183]:
          - generic [ref=e184]:
            - heading "Services" [level=4] [ref=e185]
            - list [ref=e186]:
              - listitem [ref=e187]:
                - link "Home Deep Cleaning" [ref=e188] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e189]
                  - text: Home Deep Cleaning
              - listitem [ref=e191]:
                - link "Regular Maid Service" [ref=e192] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e193]
                  - text: Regular Maid Service
              - listitem [ref=e195]:
                - link "Post-Renovation Cleaning" [ref=e196] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e197]
                  - text: Post-Renovation Cleaning
              - listitem [ref=e199]:
                - link "Sofa & Carpet Cleaning" [ref=e200] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e201]
                  - text: Sofa & Carpet Cleaning
              - listitem [ref=e203]:
                - link "Post-Event Cleanup" [ref=e204] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e205]
                  - text: Post-Event Cleanup
              - listitem [ref=e207]:
                - link "Laundry & Ironing" [ref=e208] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e209]
                  - text: Laundry & Ironing
              - listitem [ref=e211]:
                - link "Part-Time Maid" [ref=e212] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e213]
                  - text: Part-Time Maid
          - generic [ref=e215]:
            - heading "Company" [level=4] [ref=e216]
            - list [ref=e217]:
              - listitem [ref=e218]:
                - link "About iPROFIXER" [ref=e219] [cursor=pointer]:
                  - /url: /about
                  - img [ref=e220]
                  - text: About iPROFIXER
              - listitem [ref=e222]:
                - link "How It Works" [ref=e223] [cursor=pointer]:
                  - /url: /how-it-works
                  - img [ref=e224]
                  - text: How It Works
              - listitem [ref=e226]:
                - link "Join as Professional" [ref=e227] [cursor=pointer]:
                  - /url: /for-professionals
                  - img [ref=e228]
                  - text: Join as Professional
              - listitem [ref=e230]:
                - link "Careers" [ref=e231] [cursor=pointer]:
                  - /url: /pro-signup
                  - img [ref=e232]
                  - text: Careers
              - listitem [ref=e234]:
                - link "Blog & Tips" [ref=e235] [cursor=pointer]:
                  - /url: /pro-signup
                  - img [ref=e236]
                  - text: Blog & Tips
          - generic [ref=e238]:
            - heading "Support" [level=4] [ref=e239]
            - list [ref=e240]:
              - listitem [ref=e241]:
                - link "Help Center / FAQ" [ref=e242] [cursor=pointer]:
                  - /url: /faq
                  - img [ref=e243]
                  - text: Help Center / FAQ
              - listitem [ref=e245]:
                - link "Safety Guidelines" [ref=e246] [cursor=pointer]:
                  - /url: /pro-signup
                  - img [ref=e247]
                  - text: Safety Guidelines
              - listitem [ref=e249]:
                - link "Cancellation Policy" [ref=e250] [cursor=pointer]:
                  - /url: /pro-signup
                  - img [ref=e251]
                  - text: Cancellation Policy
              - listitem [ref=e253]:
                - link "Refund Policy" [ref=e254] [cursor=pointer]:
                  - /url: /pro-signup
                  - img [ref=e255]
                  - text: Refund Policy
              - listitem [ref=e257]:
                - link "Service Guarantee" [ref=e258] [cursor=pointer]:
                  - /url: /pro-signup
                  - img [ref=e259]
                  - text: Service Guarantee
        - generic [ref=e261]:
          - heading "Stay Updated" [level=4] [ref=e262]
          - paragraph [ref=e263]: Get home maintenance tips and exclusive offers.
          - generic [ref=e264]:
            - generic [ref=e265]:
              - img [ref=e266]
              - textbox "Enter your email" [ref=e269]
            - button "Subscribe Now" [ref=e270] [cursor=pointer]
          - link "Chat on WhatsApp" [ref=e271] [cursor=pointer]:
            - /url: https://wa.me/60162104127
            - img [ref=e272]
            - text: Chat on WhatsApp
      - generic [ref=e275]:
        - generic [ref=e276]:
          - generic [ref=e277]: "Follow us:"
          - generic [ref=e278]:
            - link "Facebook" [ref=e279] [cursor=pointer]:
              - /url: https://facebook.com/iprofixer
              - img [ref=e280]
            - link "Instagram" [ref=e282] [cursor=pointer]:
              - /url: https://instagram.com/iprofixer
              - img [ref=e283]
            - link "LinkedIn" [ref=e286] [cursor=pointer]:
              - /url: https://linkedin.com/company/iprofixer
              - img [ref=e287]
            - link "Twitter" [ref=e291] [cursor=pointer]:
              - /url: https://twitter.com/iprofixer
              - img [ref=e292]
            - link "YouTube" [ref=e294] [cursor=pointer]:
              - /url: https://youtube.com/iprofixer
              - img [ref=e295]
        - generic [ref=e298]:
          - generic [ref=e299]: "We accept:"
          - generic [ref=e300]:
            - img [ref=e301]
            - img [ref=e303]
            - img [ref=e305]
            - generic [ref=e307]:
              - img [ref=e308]
              - generic [ref=e310]: Pay
      - generic [ref=e312]:
        - paragraph [ref=e313]: © 2026 iPROFIXER — IPROS EDUCTECH SDN BHD. All rights reserved.
        - generic [ref=e314]:
          - link "Privacy Policy" [ref=e315] [cursor=pointer]:
            - /url: /privacy
          - link "Terms of Service" [ref=e316] [cursor=pointer]:
            - /url: /terms
          - link "Cookies" [ref=e317] [cursor=pointer]:
            - /url: /cookie-policy
    - button "Back to top" [ref=e318] [cursor=pointer]:
      - img [ref=e319]
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
  24 |   await page.waitForURL(/dashboard/, { timeout: 30000 });
  25 | }
  26 | 
  27 | export async function proSignup(page, email, password = 'Test1234!') {
  28 |   await page.goto('/pro-signup');
  29 |   await page.waitForLoadState('networkidle');
  30 |   await page.fill('input[name="name"], input[placeholder*="Full Name"]', 'Siti Pro Professional');
  31 |   await page.fill('input[type="email"]', email);
  32 |   await page.fill('input[placeholder*="Phone"], input[name="phone"]', '0123456789');
  33 |   const whatsapp = page.locator('input[placeholder*="WhatsApp"], input[name="whatsapp"]');
  34 |   if (await whatsapp.count() > 0) await whatsapp.fill('0123456789');
  35 |   const category = page.locator('select[name="service_category"], select[name="serviceCategory"]');
  36 |   if (await category.count() > 0) await category.selectOption({ index: 1 });
  37 |   const area = page.locator('select[name="coverage_area"], select[name="coverageArea"]');
  38 |   if (await area.count() > 0) await area.selectOption({ index: 1 });
  39 |   const exp = page.locator('input[name="years_experience"], input[placeholder*="Experience"], input[placeholder*="Years"]');
  40 |   if (await exp.count() > 0) await exp.fill('3');
  41 |   await page.fill('input[type="password"]', password);
  42 |   const confirm = page.locator('input[placeholder*="Confirm"], input[name="confirmPassword"]');
  43 |   if (await confirm.count() > 0) await confirm.fill(password);
  44 |   const checkboxes = page.locator('input[type="checkbox"]');
  45 |   const count = await checkboxes.count();
  46 |   for (let i = 0; i < count; i++) {
  47 |     await checkboxes.nth(i).check();
  48 |   }
  49 |   await page.click('button[type="submit"]');
> 50 |   await page.waitForURL(/dashboard/, { timeout: 30000 });
     |              ^ TimeoutError: page.waitForURL: Timeout 30000ms exceeded.
  51 | }
  52 | 
  53 | export async function proLogin(page, email, password = 'Test1234!') {
  54 |   await page.goto('/login');
  55 |   await page.waitForLoadState('networkidle');
  56 |   await page.locator('input[type="email"]').first().fill(email);
  57 |   await page.locator('input[type="password"]').first().fill(password);
  58 |   await page.locator('button[type="submit"]').first().click();
  59 |   await page.waitForURL(/dashboard/, { timeout: 30000 });
  60 | }
  61 | 
```