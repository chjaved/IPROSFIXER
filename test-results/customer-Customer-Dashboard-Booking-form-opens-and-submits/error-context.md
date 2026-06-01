# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: customer.spec.js >> Customer Dashboard >> Booking form opens and submits
- Location: tests\customer.spec.js:38:3

# Error details

```
Error: locator.count: Unexpected token "=" while parsing css selector "[class*="success"], text=/success/i, text=/confirmed/i". Did you mean to CSS.escape it?
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
          - generic [ref=e25]: Hi, Test
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
        - heading "My Bookings" [level=1] [ref=e65]
        - paragraph [ref=e66]: View and manage all your service bookings
        - generic [ref=e67]:
          - generic [ref=e68]:
            - paragraph [ref=e69]: "0"
            - paragraph [ref=e70]: Total
          - generic [ref=e71]:
            - paragraph [ref=e72]: "0"
            - paragraph [ref=e73]: Upcoming
          - generic [ref=e74]:
            - paragraph [ref=e75]: "0"
            - paragraph [ref=e76]: Completed
          - generic [ref=e77]:
            - paragraph [ref=e78]: "0"
            - paragraph [ref=e79]: Pending
        - generic [ref=e81]:
          - generic [ref=e82]:
            - img [ref=e83]
            - textbox "Search bookings..." [ref=e86]
          - generic [ref=e87]:
            - img [ref=e88]
            - combobox [ref=e90]:
              - option "All Status" [selected]
              - option "Pending"
              - option "Confirmed"
              - option "Accepted"
              - option "Completed"
              - option "Cancelled"
            - button "New Booking" [ref=e91] [cursor=pointer]:
              - img [ref=e92]
              - text: New Booking
        - generic [ref=e95]:
          - img [ref=e96]
          - paragraph [ref=e98]: No bookings found
        - generic [ref=e100]:
          - generic [ref=e101]:
            - heading "New Booking" [level=3] [ref=e102]
            - button [ref=e103] [cursor=pointer]:
              - img [ref=e104]
          - generic [ref=e107]:
            - generic [ref=e108]:
              - generic [ref=e109]: Service *
              - combobox [active] [ref=e110]:
                - option "Select a service..." [selected]
                - option "Caregiver (RM 25)"
                - option "Home Deep Cleaning (RM 120)"
                - option "Post-Event Cleanup (RM 150)"
                - option "Post-Renovation Cleaning (RM 200)"
                - option "Regular Maid Service (RM 80)"
                - option "Sofa & Carpet Cleaning (RM 120)"
                - option "Sofa & Carpet Cleaning (RM 120)"
                - option "Laundry & Ironing (RM 3)"
                - option "Laundry & Ironing (RM 3)"
                - option "Part-Time Maid (RM 80)"
                - option "AC Service & Repair (RM 150)"
                - option "Appliance Repair (RM 90)"
                - option "Electrical Works (RM 100)"
                - option "Plumbing Repair (RM 120)"
            - generic [ref=e111]:
              - generic [ref=e112]: Area *
              - combobox [ref=e113]:
                - option "Select area..." [selected]
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
            - generic [ref=e114]:
              - generic [ref=e115]:
                - generic [ref=e116]: Date *
                - textbox [ref=e117]: 2026-07-15
              - generic [ref=e118]:
                - generic [ref=e119]: Time *
                - textbox [ref=e120]: 10:00
            - generic [ref=e121]:
              - generic [ref=e122]: WhatsApp Number
              - textbox "e.g. 0123456789" [ref=e123]
            - generic [ref=e124]:
              - generic [ref=e125]: Notes
              - textbox "Any special instructions..." [ref=e126]
            - generic [ref=e127]:
              - button "Cancel" [ref=e128] [cursor=pointer]
              - button "Book Now" [ref=e129] [cursor=pointer]
  - contentinfo [ref=e130]:
    - generic [ref=e133]:
      - generic [ref=e134]:
        - img [ref=e136]
        - generic [ref=e138]: Verified Pros
      - generic [ref=e139]:
        - img [ref=e141]
        - generic [ref=e144]: Quality Assured
      - generic [ref=e145]:
        - img [ref=e147]
        - generic [ref=e150]: On-Time Service
    - generic [ref=e151]:
      - generic [ref=e152]:
        - generic [ref=e153]:
          - link "iPROFIXER" [ref=e154] [cursor=pointer]:
            - /url: /
            - img "iPROFIXER" [ref=e155]
          - paragraph [ref=e156]: Malaysia's most trusted cleaning service platform. Connecting homeowners with verified cleaning professionals for all your home cleaning needs.
          - generic [ref=e157]:
            - link "+03-8080 5249" [ref=e158] [cursor=pointer]:
              - /url: tel:+60380805249
              - img [ref=e160]
              - generic [ref=e162]: +03-8080 5249
            - link "for_services@iprofixer.com.my" [ref=e163] [cursor=pointer]:
              - /url: mailto:for_services@iprofixer.com.my
              - img [ref=e165]
              - generic [ref=e168]: for_services@iprofixer.com.my
            - generic [ref=e169]:
              - img [ref=e171]
              - generic [ref=e174]: Ara Damansara, Petaling Jaya
        - generic [ref=e175]:
          - generic [ref=e176]:
            - heading "Services" [level=4] [ref=e177]
            - list [ref=e178]:
              - listitem [ref=e179]:
                - link "Home Deep Cleaning" [ref=e180] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e181]
                  - text: Home Deep Cleaning
              - listitem [ref=e183]:
                - link "Regular Maid Service" [ref=e184] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e185]
                  - text: Regular Maid Service
              - listitem [ref=e187]:
                - link "Post-Renovation Cleaning" [ref=e188] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e189]
                  - text: Post-Renovation Cleaning
              - listitem [ref=e191]:
                - link "Sofa & Carpet Cleaning" [ref=e192] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e193]
                  - text: Sofa & Carpet Cleaning
              - listitem [ref=e195]:
                - link "Post-Event Cleanup" [ref=e196] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e197]
                  - text: Post-Event Cleanup
              - listitem [ref=e199]:
                - link "Laundry & Ironing" [ref=e200] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e201]
                  - text: Laundry & Ironing
              - listitem [ref=e203]:
                - link "Part-Time Maid" [ref=e204] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e205]
                  - text: Part-Time Maid
          - generic [ref=e207]:
            - heading "Company" [level=4] [ref=e208]
            - list [ref=e209]:
              - listitem [ref=e210]:
                - link "About iPROFIXER" [ref=e211] [cursor=pointer]:
                  - /url: /about
                  - img [ref=e212]
                  - text: About iPROFIXER
              - listitem [ref=e214]:
                - link "How It Works" [ref=e215] [cursor=pointer]:
                  - /url: /how-it-works
                  - img [ref=e216]
                  - text: How It Works
              - listitem [ref=e218]:
                - link "Join as Professional" [ref=e219] [cursor=pointer]:
                  - /url: /for-professionals
                  - img [ref=e220]
                  - text: Join as Professional
              - listitem [ref=e222]:
                - link "Careers" [ref=e223] [cursor=pointer]:
                  - /url: /dashboard/bookings
                  - img [ref=e224]
                  - text: Careers
              - listitem [ref=e226]:
                - link "Blog & Tips" [ref=e227] [cursor=pointer]:
                  - /url: /dashboard/bookings
                  - img [ref=e228]
                  - text: Blog & Tips
          - generic [ref=e230]:
            - heading "Support" [level=4] [ref=e231]
            - list [ref=e232]:
              - listitem [ref=e233]:
                - link "Help Center / FAQ" [ref=e234] [cursor=pointer]:
                  - /url: /faq
                  - img [ref=e235]
                  - text: Help Center / FAQ
              - listitem [ref=e237]:
                - link "Safety Guidelines" [ref=e238] [cursor=pointer]:
                  - /url: /dashboard/bookings
                  - img [ref=e239]
                  - text: Safety Guidelines
              - listitem [ref=e241]:
                - link "Cancellation Policy" [ref=e242] [cursor=pointer]:
                  - /url: /dashboard/bookings
                  - img [ref=e243]
                  - text: Cancellation Policy
              - listitem [ref=e245]:
                - link "Refund Policy" [ref=e246] [cursor=pointer]:
                  - /url: /dashboard/bookings
                  - img [ref=e247]
                  - text: Refund Policy
              - listitem [ref=e249]:
                - link "Service Guarantee" [ref=e250] [cursor=pointer]:
                  - /url: /dashboard/bookings
                  - img [ref=e251]
                  - text: Service Guarantee
        - generic [ref=e253]:
          - heading "Stay Updated" [level=4] [ref=e254]
          - paragraph [ref=e255]: Get home maintenance tips and exclusive offers.
          - generic [ref=e256]:
            - generic [ref=e257]:
              - img [ref=e258]
              - textbox "Enter your email" [ref=e261]
            - button "Subscribe Now" [ref=e262] [cursor=pointer]
          - link "Chat on WhatsApp" [ref=e263] [cursor=pointer]:
            - /url: https://wa.me/60162104127
            - img [ref=e264]
            - text: Chat on WhatsApp
      - generic [ref=e267]:
        - generic [ref=e268]:
          - generic [ref=e269]: "Follow us:"
          - generic [ref=e270]:
            - link "Facebook" [ref=e271] [cursor=pointer]:
              - /url: https://facebook.com/iprofixer
              - img [ref=e272]
            - link "Instagram" [ref=e274] [cursor=pointer]:
              - /url: https://instagram.com/iprofixer
              - img [ref=e275]
            - link "LinkedIn" [ref=e278] [cursor=pointer]:
              - /url: https://linkedin.com/company/iprofixer
              - img [ref=e279]
            - link "Twitter" [ref=e283] [cursor=pointer]:
              - /url: https://twitter.com/iprofixer
              - img [ref=e284]
            - link "YouTube" [ref=e286] [cursor=pointer]:
              - /url: https://youtube.com/iprofixer
              - img [ref=e287]
        - generic [ref=e290]:
          - generic [ref=e291]: "We accept:"
          - generic [ref=e292]:
            - img [ref=e293]
            - img [ref=e295]
            - img [ref=e297]
            - generic [ref=e299]:
              - img [ref=e300]
              - generic [ref=e302]: Pay
      - generic [ref=e304]:
        - paragraph [ref=e305]: © 2026 iPROFIXER — IPROS EDUCTECH SDN BHD. All rights reserved.
        - generic [ref=e306]:
          - link "Privacy Policy" [ref=e307] [cursor=pointer]:
            - /url: /privacy
          - link "Terms of Service" [ref=e308] [cursor=pointer]:
            - /url: /terms
          - link "Cookies" [ref=e309] [cursor=pointer]:
            - /url: /cookie-policy
    - button "Back to top" [ref=e310] [cursor=pointer]:
      - img [ref=e311]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const timestamp = Date.now();
  4  | const email = `cust_${timestamp}@test.com`;
  5  | const password = 'Test1234';
  6  | 
  7  | test.describe('Customer Dashboard', () => {
  8  | 
  9  |   test.beforeEach(async ({ page }) => {
  10 |     await page.goto('/signup');
  11 |     await page.waitForLoadState('networkidle');
  12 |     await page.fill('input[name="name"], input[placeholder*="Full Name" i]', 'Test Customer');
  13 |     await page.fill('input[type="email"]', email);
  14 |     const phone = page.locator('input[name="phone"], input[placeholder*="Phone" i]');
  15 |     if (await phone.count() > 0) await phone.first().fill('0123456789');
  16 |     await page.fill('input[type="password"]', password);
  17 |     const confirm = page.locator('input[placeholder*="Confirm" i], input[name="confirmPassword"]');
  18 |     if (await confirm.count() > 0) await confirm.first().fill(password);
  19 |     const checkbox = page.locator('input[type="checkbox"]');
  20 |     if (await checkbox.count() > 0) await checkbox.first().check();
  21 |     await page.click('button[type="submit"], button:has-text("Create"), button:has-text("Sign Up")');
  22 |     await page.waitForURL(/dashboard/, { timeout: 15000 });
  23 |   });
  24 | 
  25 |   test('Dashboard overview loads with stats', async ({ page }) => {
  26 |     await page.waitForLoadState('networkidle');
  27 |     await expect(page.locator('h1, h2').first()).toBeVisible({ timeout: 8000 });
  28 |     const noError = await page.locator('text=/error/i').count();
  29 |     expect(noError).toBe(0);
  30 |   });
  31 | 
  32 |   test('Bookings page loads', async ({ page }) => {
  33 |     await page.goto('/dashboard/bookings');
  34 |     await page.waitForLoadState('networkidle');
  35 |     await expect(page.locator('h1, h2').first()).toBeVisible({ timeout: 8000 });
  36 |   });
  37 | 
  38 |   test('Booking form opens and submits', async ({ page }) => {
  39 |     await page.goto('/dashboard/bookings');
  40 |     await page.waitForLoadState('networkidle');
  41 |     await page.waitForTimeout(2000);
  42 |     const bookBtn = page.locator('button:has-text("Book"), button:has-text("New Booking"), button:has-text("Add Booking")');
  43 |     if (await bookBtn.count() > 0) {
  44 |       await bookBtn.first().click();
  45 |       await page.waitForTimeout(1500);
  46 |       const serviceSelect = page.locator('select[name="service"], select[name="service_id"]');
  47 |       if (await serviceSelect.count() > 0) await serviceSelect.first().selectOption({ index: 1 });
  48 |       const areaSelect = page.locator('select[name="area"]');
  49 |       if (await areaSelect.count() > 0) await areaSelect.first().selectOption({ index: 1 });
  50 |       const dateInput = page.locator('input[type="date"], input[name="date"]');
  51 |       if (await dateInput.count() > 0) await dateInput.first().fill('2026-07-15');
  52 |       const timeInput = page.locator('input[type="time"], input[name="time"]');
  53 |       if (await timeInput.count() > 0) await timeInput.first().fill('10:00');
  54 |       const addrInput = page.locator('input[name="address"], textarea[name="address"], input[placeholder*="address" i]');
  55 |       if (await addrInput.count() > 0) await addrInput.first().fill('123 Test Street, KL');
  56 |       const submitBtn = page.locator('button:has-text("Confirm"), button:has-text("Submit"), button[type="submit"]');
  57 |       if (await submitBtn.count() > 0) await submitBtn.first().click();
  58 |       await page.waitForTimeout(4000);
  59 |       const ref = page.locator('text=/IPF-/');
  60 |       const success = page.locator('[class*="success"], text=/success/i, text=/confirmed/i');
  61 |       const hasRef = await ref.count() > 0;
> 62 |       const hasSuccess = await success.count() > 0;
     |                                        ^ Error: locator.count: Unexpected token "=" while parsing css selector "[class*="success"], text=/success/i, text=/confirmed/i". Did you mean to CSS.escape it?
  63 |       expect(hasRef || hasSuccess).toBeTruthy();
  64 |     } else {
  65 |       test.skip();
  66 |     }
  67 |   });
  68 | 
  69 |   test('Profile page loads and shows email', async ({ page }) => {
  70 |     await page.goto('/dashboard/profile');
  71 |     await page.waitForLoadState('networkidle');
  72 |     await page.waitForTimeout(2000);
  73 |     const emailVisible = page.locator(`text=${email}`);
  74 |     await expect(emailVisible).toBeVisible({ timeout: 8000 });
  75 |   });
  76 | 
  77 |   test('Profile update saves successfully', async ({ page }) => {
  78 |     await page.goto('/dashboard/profile');
  79 |     await page.waitForLoadState('networkidle');
  80 |     await page.waitForTimeout(2000);
  81 |     const phoneInput = page.locator('input[name="phone"], input[placeholder*="Phone" i]');
  82 |     if (await phoneInput.count() > 0) {
  83 |       await phoneInput.first().fill('0199999999');
  84 |       const saveBtn = page.locator('button:has-text("Save"), button:has-text("Update"), button[type="submit"]');
  85 |       if (await saveBtn.count() > 0) {
  86 |         await saveBtn.first().click();
  87 |         await page.waitForTimeout(3000);
  88 |         const success = page.locator('[class*="success"], text=/saved/i, text=/updated/i, text=/success/i');
  89 |         expect(await success.count()).toBeGreaterThan(0);
  90 |       }
  91 |     }
  92 |   });
  93 | 
  94 | });
  95 | 
```