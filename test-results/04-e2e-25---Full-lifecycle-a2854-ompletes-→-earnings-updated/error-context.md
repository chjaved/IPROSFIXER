# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 04-e2e.spec.js >> 25 - Full lifecycle: customer books → pro accepts → pro completes → earnings updated
- Location: tests\04-e2e.spec.js:9:1

# Error details

```
Error: locator.check: Error: strict mode violation: locator('input[type="checkbox"]') resolved to 2 elements:
    1) <input type="checkbox" name="hasTransport" class="rounded border-gray-300 text-orange focus:ring-orange"/> aka getByRole('checkbox', { name: 'I have my own transport' })
    2) <input type="checkbox" class="mt-1 rounded border-gray-300 text-orange focus:ring-orange"/> aka getByRole('checkbox', { name: 'I agree to the Terms of' })

Call log:
  - waiting for locator('input[type="checkbox"]')

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
        - link "My Dashboard" [ref=e15] [cursor=pointer]:
          - /url: /dashboard
          - img [ref=e16]
          - text: My Dashboard
        - generic [ref=e21]:
          - img [ref=e22]
          - generic [ref=e25]: Hi, Ahmad
        - button "Logout" [ref=e26] [cursor=pointer]:
          - img [ref=e27]
          - text: Logout
  - generic [ref=e30]:
    - complementary [ref=e31]:
      - generic [ref=e32]:
        - link "iPROFIXER" [ref=e33] [cursor=pointer]:
          - /url: /
          - img "iPROFIXER" [ref=e34]
        - navigation [ref=e35]:
          - link "Dashboard" [ref=e36] [cursor=pointer]:
            - /url: /dashboard
            - img [ref=e37]
            - text: Dashboard
          - link "Profile" [ref=e42] [cursor=pointer]:
            - /url: /dashboard/profile
            - img [ref=e43]
            - text: Profile
          - link "Bookings" [ref=e46] [cursor=pointer]:
            - /url: /dashboard/bookings
            - img [ref=e47]
            - text: Bookings
          - link "Refunds" [ref=e49] [cursor=pointer]:
            - /url: /dashboard/refunds
            - img [ref=e50]
            - text: Refunds
          - link "Services" [ref=e55] [cursor=pointer]:
            - /url: /dashboard/services
            - img [ref=e56]
            - text: Services
          - link "Appointments" [ref=e59] [cursor=pointer]:
            - /url: /dashboard/appointments
            - img [ref=e60]
            - text: Appointments
    - main [ref=e63]:
      - generic [ref=e64]:
        - generic [ref=e65]:
          - generic [ref=e66]:
            - heading "Dashboard Overview" [level=1] [ref=e67]
            - paragraph [ref=e68]: Welcome back, Ahmad Test Customer!
          - link "Book a Service" [ref=e69] [cursor=pointer]:
            - /url: /dashboard/bookings
        - generic [ref=e70]:
          - generic [ref=e72]:
            - generic [ref=e73]:
              - paragraph [ref=e74]: Total Bookings
              - heading "0" [level=3] [ref=e75]
              - paragraph [ref=e76]: All time
            - img [ref=e78]
          - generic [ref=e81]:
            - generic [ref=e82]:
              - paragraph [ref=e83]: Completed Jobs
              - heading "0" [level=3] [ref=e84]
              - paragraph [ref=e85]: Successfully finished
            - img [ref=e87]
          - generic [ref=e91]:
            - generic [ref=e92]:
              - paragraph [ref=e93]: Upcoming
              - heading "0" [level=3] [ref=e94]
              - paragraph [ref=e95]: Scheduled
            - img [ref=e97]
          - generic [ref=e101]:
            - generic [ref=e102]:
              - paragraph [ref=e103]: Total Spent
              - heading "RM 0" [level=3] [ref=e104]
              - paragraph [ref=e105]: All time
            - img [ref=e107]
        - generic [ref=e110]:
          - generic [ref=e112]:
            - generic [ref=e113]:
              - heading "Recent Bookings" [level=2] [ref=e114]
              - link "View All" [ref=e115] [cursor=pointer]:
                - /url: /dashboard/bookings
                - text: View All
                - img [ref=e116]
            - generic [ref=e118]:
              - img [ref=e119]
              - paragraph [ref=e121]: No bookings yet. Book your first service!
              - link "Book Now →" [ref=e122] [cursor=pointer]:
                - /url: /dashboard/bookings
          - generic [ref=e123]:
            - generic [ref=e124]:
              - heading "Quick Actions" [level=2] [ref=e125]
              - generic [ref=e126]:
                - link "Book New Service" [ref=e127] [cursor=pointer]:
                  - /url: /dashboard/bookings
                  - img [ref=e128]
                  - generic [ref=e130]: Book New Service
                - link "View Schedule" [ref=e131] [cursor=pointer]:
                  - /url: /dashboard/appointments
                  - img [ref=e132]
                  - generic [ref=e135]: View Schedule
                - link "Update Profile" [ref=e136] [cursor=pointer]:
                  - /url: /dashboard/profile
                  - img [ref=e137]
                  - generic [ref=e140]: Update Profile
                - link "Contact Support" [ref=e141] [cursor=pointer]:
                  - /url: https://wa.me/60162104127
                  - img [ref=e142]
                  - generic [ref=e144]: Contact Support
            - generic [ref=e145]:
              - generic [ref=e146]:
                - img [ref=e147]
                - heading "Need Help?" [level=2] [ref=e149]
              - paragraph [ref=e150]: Questions about your booking or service?
              - link "Chat on WhatsApp" [ref=e151] [cursor=pointer]:
                - /url: https://wa.me/60162104127
                - img [ref=e152]
                - text: Chat on WhatsApp
  - contentinfo [ref=e154]:
    - generic [ref=e157]:
      - generic [ref=e158]:
        - img [ref=e160]
        - generic [ref=e162]: Verified Pros
      - generic [ref=e163]:
        - img [ref=e165]
        - generic [ref=e168]: Quality Assured
      - generic [ref=e169]:
        - img [ref=e171]
        - generic [ref=e174]: On-Time Service
    - generic [ref=e175]:
      - generic [ref=e176]:
        - generic [ref=e177]:
          - link "iPROFIXER" [ref=e178] [cursor=pointer]:
            - /url: /
            - img "iPROFIXER" [ref=e179]
          - paragraph [ref=e180]: Malaysia's most trusted cleaning service platform. Connecting homeowners with verified cleaning professionals for all your home cleaning needs.
          - generic [ref=e181]:
            - link "+03-8080 5249" [ref=e182] [cursor=pointer]:
              - /url: tel:+60380805249
              - img [ref=e184]
              - generic [ref=e186]: +03-8080 5249
            - link "for_services@iprofixer.com.my" [ref=e187] [cursor=pointer]:
              - /url: mailto:for_services@iprofixer.com.my
              - img [ref=e189]
              - generic [ref=e192]: for_services@iprofixer.com.my
            - generic [ref=e193]:
              - img [ref=e195]
              - generic [ref=e198]: Ara Damansara, Petaling Jaya
        - generic [ref=e199]:
          - generic [ref=e200]:
            - heading "Services" [level=4] [ref=e201]
            - list [ref=e202]:
              - listitem [ref=e203]:
                - link "Home Deep Cleaning" [ref=e204] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e205]
                  - text: Home Deep Cleaning
              - listitem [ref=e207]:
                - link "Regular Maid Service" [ref=e208] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e209]
                  - text: Regular Maid Service
              - listitem [ref=e211]:
                - link "Post-Renovation Cleaning" [ref=e212] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e213]
                  - text: Post-Renovation Cleaning
              - listitem [ref=e215]:
                - link "Sofa & Carpet Cleaning" [ref=e216] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e217]
                  - text: Sofa & Carpet Cleaning
              - listitem [ref=e219]:
                - link "Post-Event Cleanup" [ref=e220] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e221]
                  - text: Post-Event Cleanup
              - listitem [ref=e223]:
                - link "Laundry & Ironing" [ref=e224] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e225]
                  - text: Laundry & Ironing
              - listitem [ref=e227]:
                - link "Part-Time Maid" [ref=e228] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e229]
                  - text: Part-Time Maid
          - generic [ref=e231]:
            - heading "Company" [level=4] [ref=e232]
            - list [ref=e233]:
              - listitem [ref=e234]:
                - link "About iPROFIXER" [ref=e235] [cursor=pointer]:
                  - /url: /about
                  - img [ref=e236]
                  - text: About iPROFIXER
              - listitem [ref=e238]:
                - link "How It Works" [ref=e239] [cursor=pointer]:
                  - /url: /how-it-works
                  - img [ref=e240]
                  - text: How It Works
              - listitem [ref=e242]:
                - link "Join as Professional" [ref=e243] [cursor=pointer]:
                  - /url: /for-professionals
                  - img [ref=e244]
                  - text: Join as Professional
              - listitem [ref=e246]:
                - link "Careers" [ref=e247] [cursor=pointer]:
                  - /url: /dashboard
                  - img [ref=e248]
                  - text: Careers
              - listitem [ref=e250]:
                - link "Blog & Tips" [ref=e251] [cursor=pointer]:
                  - /url: /dashboard
                  - img [ref=e252]
                  - text: Blog & Tips
          - generic [ref=e254]:
            - heading "Support" [level=4] [ref=e255]
            - list [ref=e256]:
              - listitem [ref=e257]:
                - link "Help Center / FAQ" [ref=e258] [cursor=pointer]:
                  - /url: /faq
                  - img [ref=e259]
                  - text: Help Center / FAQ
              - listitem [ref=e261]:
                - link "Safety Guidelines" [ref=e262] [cursor=pointer]:
                  - /url: /dashboard
                  - img [ref=e263]
                  - text: Safety Guidelines
              - listitem [ref=e265]:
                - link "Cancellation Policy" [ref=e266] [cursor=pointer]:
                  - /url: /dashboard
                  - img [ref=e267]
                  - text: Cancellation Policy
              - listitem [ref=e269]:
                - link "Refund Policy" [ref=e270] [cursor=pointer]:
                  - /url: /dashboard
                  - img [ref=e271]
                  - text: Refund Policy
              - listitem [ref=e273]:
                - link "Service Guarantee" [ref=e274] [cursor=pointer]:
                  - /url: /dashboard
                  - img [ref=e275]
                  - text: Service Guarantee
        - generic [ref=e277]:
          - heading "Stay Updated" [level=4] [ref=e278]
          - paragraph [ref=e279]: Get home maintenance tips and exclusive offers.
          - generic [ref=e280]:
            - generic [ref=e281]:
              - img [ref=e282]
              - textbox "Enter your email" [ref=e285]
            - button "Subscribe Now" [ref=e286] [cursor=pointer]
          - link "Chat on WhatsApp" [ref=e287] [cursor=pointer]:
            - /url: https://wa.me/60162104127
            - img [ref=e288]
            - text: Chat on WhatsApp
      - generic [ref=e291]:
        - generic [ref=e292]:
          - generic [ref=e293]: "Follow us:"
          - generic [ref=e294]:
            - link "Facebook" [ref=e295] [cursor=pointer]:
              - /url: https://facebook.com/iprofixer
              - img [ref=e296]
            - link "Instagram" [ref=e298] [cursor=pointer]:
              - /url: https://instagram.com/iprofixer
              - img [ref=e299]
            - link "LinkedIn" [ref=e302] [cursor=pointer]:
              - /url: https://linkedin.com/company/iprofixer
              - img [ref=e303]
            - link "Twitter" [ref=e307] [cursor=pointer]:
              - /url: https://twitter.com/iprofixer
              - img [ref=e308]
            - link "YouTube" [ref=e310] [cursor=pointer]:
              - /url: https://youtube.com/iprofixer
              - img [ref=e311]
        - generic [ref=e314]:
          - generic [ref=e315]: "We accept:"
          - generic [ref=e316]:
            - img [ref=e317]
            - img [ref=e319]
            - img [ref=e321]
            - generic [ref=e323]:
              - img [ref=e324]
              - generic [ref=e326]: Pay
      - generic [ref=e328]:
        - paragraph [ref=e329]: © 2026 iPROFIXER — IPROS EDUCTECH SDN BHD. All rights reserved.
        - generic [ref=e330]:
          - link "Privacy Policy" [ref=e331] [cursor=pointer]:
            - /url: /privacy
          - link "Terms of Service" [ref=e332] [cursor=pointer]:
            - /url: /terms
          - link "Cookies" [ref=e333] [cursor=pointer]:
            - /url: /cookie-policy
    - button "Back to top" [ref=e334] [cursor=pointer]:
      - img [ref=e335]
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
  21 |   await page.fill('input[type="email"]', email);
  22 |   await page.fill('input[type="password"]', password);
  23 |   await page.click('button[type="submit"]');
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
  44 |   const checkbox = page.locator('input[type="checkbox"]');
> 45 |   if (await checkbox.count() > 0) await checkbox.check();
     |                                                  ^ Error: locator.check: Error: strict mode violation: locator('input[type="checkbox"]') resolved to 2 elements:
  46 |   await page.click('button[type="submit"]');
  47 |   await page.waitForURL(/dashboard/, { timeout: 30000 });
  48 | }
  49 | 
  50 | export async function proLogin(page, email, password = 'Test1234!') {
  51 |   await page.goto('/login');
  52 |   await page.waitForLoadState('networkidle');
  53 |   await page.fill('input[type="email"]', email);
  54 |   await page.fill('input[type="password"]', password);
  55 |   await page.click('button[type="submit"]');
  56 |   await page.waitForURL(/dashboard/, { timeout: 30000 });
  57 | }
  58 | 
```