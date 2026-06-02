# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 03-customer-dashboard.spec.js >> CUST-04 - New booking button opens modal or form
- Location: tests\03-customer-dashboard.spec.js:43:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('button:has-text("New Booking"), button:has-text("Book"), button:has-text("Book a Service")').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('button:has-text("New Booking"), button:has-text("Book"), button:has-text("Book a Service")').first()

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
  - link "My Dashboard":
    - /url: /dashboard
    - img
    - text: My Dashboard
  - img
  - text: Hi, Ahmad
  - button "Logout":
    - img
    - text: Logout
- main:
  - region "iPROFIXER home services Malaysia hero":
    - text: Vetted Pros · KL, PJ & Selangor
    - heading "Malaysia's Most Trusted Cleaning Service Platform" [level=1]
    - paragraph: Book vetted cleaning professionals for your home — deep cleaning, regular maid service, post-reno cleanup and more. Serving KL, PJ and all Klang Valley.
    - text: ✓ Background Checked ✓ Insured on Every Job ✓ Pay After the Job
    - link "Book a Cleaner Now →":
      - /url: https://wa.me/60162104127?text=Hi%2C%20I%20need%20help%20booking%20a%20cleaning%20service.
    - link "Chat on WhatsApp":
      - /url: https://wa.me/60162104127?text=Hi%2C%20I%20need%20help%20booking%20a%20cleaning%20service.
    - link "New Customer? Sign Up Now":
      - /url: /signup
    - link "Browse Our Services":
      - /url: /services
    - img "Malaysian homeowner"
    - img "Malaysian homeowner"
    - img "Malaysian homeowner"
    - img "Malaysian homeowner"
    - img "Malaysian homeowner"
    - paragraph:
      - strong: 9,000+ homeowners
      - text: trust us across Klang Valley
    - img "Southeast Asian professional handyman at work in a Malaysian home"
    - img
    - text: Verified & Insured 500+ Professionals
    - img
    - img
    - img
    - img
    - img
    - text: 4.9 / 5.0 9,641 reviews
    - img "Malaysian homeowner"
    - img "Malaysian homeowner"
    - img "Malaysian homeowner"
    - text: 9,000+ happy clients Across Klang Valley
  - region "iPROFIXER statistics": 0+ Cleaning jobs completed 0% Customer satisfaction 0+ Vetted cleaning professionals 0 Cities in Klang Valley
  - region "Home services available in Malaysia":
    - text: What We Cover
    - heading "Cleaning Services We Cover" [level=2]
    - paragraph: One platform for all your cleaning needs — from daily maintenance to deep cleaning.
    - img "Professional deep cleaning service in Kuala Lumpur"
    - heading "Home Deep Cleaning" [level=3]
    - paragraph: Top-to-bottom deep clean covering kitchen, bathrooms, bedrooms and living areas. Eco-friendly products.
    - link "Book Now →":
      - /url: https://wa.me/60162104127
    - img "Trusted regular maid service in Selangor"
    - heading "Regular Maid Service" [level=3]
    - paragraph: Flexible 4–8 hour cleaning sessions — weekly, bi-weekly or one-off bookings. Vetted & insured.
    - link "Book Now →":
      - /url: https://wa.me/60162104127
    - img "Post-renovation cleaning service in Malaysia"
    - heading "Post-Renovation Cleaning" [level=3]
    - paragraph: Industrial-grade clean to remove cement dust, paint splatters and construction residue.
    - link "Book Now →":
      - /url: https://wa.me/60162104127
    - img "Sofa and carpet cleaning service"
    - heading "Sofa & Carpet Cleaning" [level=3]
    - paragraph: Deep extraction cleaning for fabric sofas, mattresses, carpets and rugs — stain removal included.
    - link "Book Now →":
      - /url: https://wa.me/60162104127
    - img "Post-event cleanup service in Malaysia"
    - heading "Post-Event Cleanup" [level=3]
    - paragraph: After your kenduri, birthday or gathering — restore your home fast. Waste disposal included.
    - link "Book Now →":
      - /url: https://wa.me/60162104127
    - img "Professional laundry and ironing service"
    - heading "Laundry & Ironing" [level=3]
    - paragraph: Wash, dry and fold — free pickup and same-day delivery to your door. 48-hour turnaround.
    - link "Book Now →":
      - /url: https://wa.me/60162104127
    - img "Part-time maid service in Klang Valley"
    - heading "Part-Time Maid" [level=3]
    - paragraph: 4-hour or 8-hour daily cleaning and household help by vetted maids. Regular or one-time.
    - link "Book Now →":
      - /url: https://wa.me/60162104127
    - link "Book via WhatsApp":
      - /url: https://wa.me/60162104127
  - region "How iPROFIXER booking works":
    - text: Simple Process
    - heading "Booking Takes Less Than 2 Minutes" [level=2]
    - paragraph: We've made it as simple as possible. Here's how it works.
    - img "Malaysian person using smartphone to book cleaning service"
    - text: "1"
    - heading "Tell us what you need" [level=3]
    - paragraph: Pick your service and area. Takes 30 seconds.
    - img "Malaysian cleaning professional profile photo"
    - text: "2"
    - heading "We match you with a pro" [level=3]
    - paragraph: You'll get a WhatsApp message with your matched professional within 15 minutes.
    - img "Southeast Asian cleaner working in Malaysian home"
    - text: "3"
    - heading "They show up and do the job" [level=3]
    - paragraph: Vetted, insured, on time. You can track them live.
    - img "Mobile payment using e-wallet app in Malaysia"
    - text: "4"
    - heading "Pay after. Rate your pro" [level=3]
    - paragraph: Cash, DuitNow, TnG or GrabPay. Only pay when you're satisfied.
    - text: Not happy? We send a replacement for free.
  - region "iPROFIXER for homeowners and professionals":
    - img "Happy homeowner relaxing in clean Malaysian home"
    - text: FOR HOMEOWNERS
    - heading "Find someone you can actually trust" [level=3]
    - paragraph: We check every professional before they join. Background check, IC verification, skills test and insurance.
    - list:
      - listitem: Fixed upfront pricing - no surprises
      - listitem: Same-day bookings available
      - listitem: Live tracking when your pro is on the way
      - listitem: Free replacement if you're not satisfied
    - link "Book Your First Service →":
      - /url: https://wa.me/60162104127
    - img "Confident Southeast Asian professional ready for work"
    - text: FOR PROFESSIONALS
    - heading "Earn more. Work on your own terms." [level=3]
    - paragraph: Join 500+ professionals already earning through iPROFIXER. Set your own hours, pick your own jobs and get paid straight after every booking.
    - list:
      - listitem: Free to join - no monthly fee
      - listitem: Set your own rates and availability
      - listitem: Get client requests in your city
      - listitem: Payments secured on every job
    - link "Join as a Professional →":
      - /url: /for-professionals
  - region "Customer reviews for iPROFIXER home services":
    - text: Real Reviews
    - heading "What Our Customers Say" [level=2]
    - img "Google"
    - img
    - img
    - img
    - img
    - img
    - text: 4.9 Based on 9,641 Google reviews
    - img
    - img
    - img
    - img
    - img
    - paragraph: "\"Booked a deep clean after moving into my new place. The team came on time, knew exactly what they were doing and the house smelled amazing after. Will definitely book again.\""
    - img "Ahmad Hafizi from Petaling Jaya - iPROFIXER customer review"
    - paragraph: Ahmad Hafizi
    - paragraph: Petaling Jaya
    - img
    - img
    - img
    - img
    - img
    - paragraph: "\"Post-reno cleaning after my renovation. The cement dust, paint splatters - all gone. I was honestly shocked at how good the result was.\""
    - img "Raj Kumar from Cheras - iPROFIXER customer review"
    - paragraph: Raj Kumar
    - paragraph: Cheras
    - img
    - img
    - img
    - img
    - img
    - paragraph: "\"My regular cleaner Kak Siti has been coming every week for 3 months now. Always the same person, knows how I like things. That consistency is priceless.\""
    - img "Nurul Kasih from Ara Damansara - iPROFIXER customer review"
    - paragraph: Nurul Kasih
    - paragraph: Ara Damansara
    - img
    - img
    - img
    - img
    - img
    - paragraph: "\"Sofa cleaning service was excellent. My 5-year-old sofa looks brand new again. The stains are completely gone and it smells fresh.\""
    - img "James Lim from Bangsar South - iPROFIXER customer review"
    - paragraph: James Lim
    - paragraph: Bangsar South
    - img
    - img
    - img
    - img
    - img
    - paragraph: "\"Booked post-event cleanup after my daughter's birthday party. 2 hours later the house looked like nothing happened. Complete lifesaver.\""
    - img "Lily Heng from Subang Jaya - iPROFIXER customer review"
    - paragraph: Lily Heng
    - paragraph: Subang Jaya
    - img
    - img
    - img
    - img
    - img
    - paragraph: "\"Mattress cleaning service was thorough. The UV sanitisation really worked - my allergies have improved so much. Highly recommend!\""
    - img "Azman Mokhtar from Shah Alam - iPROFIXER customer review"
    - paragraph: Azman Mokhtar
    - paragraph: Shah Alam
  - region "Coverage areas in Klang Valley":
    - text: Coverage
    - heading "We Come to You - Across All of Klang Valley" [level=2]
    - paragraph: Currently active in 12 cities. Expanding soon.
    - text: Kuala Lumpur Petaling Jaya Shah Alam Subang Jaya Cheras Klang Cyberjaya Putrajaya Ampang Bangsar Mont Kiara Damansara
    - paragraph:
      - text: Don't see your area?
      - link "WhatsApp us":
        - /url: https://wa.me/60162104127
      - text: "- we may still be able to help."
  - region "Frequently asked questions about iPROFIXER":
    - text: FAQ
    - heading "Questions People Ask Before Booking" [level=2]
    - button "Is iPROFIXER a home services company or a marketplace?"
    - button "How quickly can a cleaner come to my home?"
    - button "How much does it cost?"
    - button "Do I pay before or after the job?"
    - button "What if I'm not happy with the service?"
    - button "I'm a cleaner. Can I join?"
  - region "Book home services in Malaysia":
    - heading "Ready to Book? Let's Sort It Out Today." [level=2]
    - paragraph: Over 9,000 homeowners have trusted us. Your turn.
    - link "Book a Service →":
      - /url: https://wa.me/60162104127?text=Hi%2C%20I%20need%20help%20booking%20a%20home%20service.
    - link "Chat on WhatsApp":
      - /url: https://wa.me/60162104127?text=Hi%2C%20I%20need%20help%20booking%20a%20home%20service.
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
        - /url: /
        - img
        - text: Careers
    - listitem:
      - link "Blog & Tips":
        - /url: /
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
        - /url: /
        - img
        - text: Safety Guidelines
    - listitem:
      - link "Cancellation Policy":
        - /url: /
        - img
        - text: Cancellation Policy
    - listitem:
      - link "Refund Policy":
        - /url: /
        - img
        - text: Refund Policy
    - listitem:
      - link "Service Guarantee":
        - /url: /
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
- button "Open chat":
  - img
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { customerSignup, customerLogin } from './helpers.js';
  3   | 
  4   | const t = Date.now();
  5   | const email = `cust_dash_${t}@test.com`;
  6   | const password = 'Test1234!';
  7   | 
  8   | test.beforeAll(async ({ browser }) => {
  9   |   const page = await browser.newPage();
  10  |   await customerSignup(page, email, password);
  11  |   await page.close();
  12  | });
  13  | 
  14  | test('CUST-01 - Dashboard overview loads with stat cards', async ({ page }) => {
  15  |   await customerLogin(page, email, password);
  16  |   await page.waitForLoadState('networkidle');
  17  |   await page.waitForTimeout(2000);
  18  |   expect(page.url()).toContain('dashboard');
  19  |   const body = await page.locator('body').innerText();
  20  |   expect(body.length).toBeGreaterThan(200);
  21  |   console.log('✅ Customer dashboard overview loaded');
  22  | });
  23  | 
  24  | test('CUST-02 - Dashboard shows correct customer name', async ({ page }) => {
  25  |   await customerLogin(page, email, password);
  26  |   await page.waitForLoadState('networkidle');
  27  |   await page.waitForTimeout(2000);
  28  |   const body = await page.locator('body').innerText();
  29  |   expect(body.toLowerCase()).toMatch(/welcome|hello|hi|dashboard/);
  30  |   console.log('✅ Dashboard shows welcome message');
  31  | });
  32  | 
  33  | test('CUST-03 - Bookings page loads', async ({ page }) => {
  34  |   await customerLogin(page, email, password);
  35  |   await page.goto('/dashboard/bookings');
  36  |   await page.waitForLoadState('networkidle');
  37  |   await page.waitForTimeout(3000);
  38  |   const body = await page.locator('body').innerText();
  39  |   expect(body.toLowerCase()).toMatch(/booking|service|new/);
  40  |   console.log('✅ Bookings page loaded');
  41  | });
  42  | 
  43  | test('CUST-04 - New booking button opens modal or form', async ({ page }) => {
  44  |   await customerLogin(page, email, password);
  45  |   await page.goto('/dashboard/bookings');
  46  |   await page.waitForLoadState('networkidle');
  47  |   await page.waitForTimeout(2000);
  48  |   const bookBtn = page.locator('button:has-text("New Booking"), button:has-text("Book"), button:has-text("Book a Service")');
> 49  |   await expect(bookBtn.first()).toBeVisible({ timeout: 5000 });
      |                                 ^ Error: expect(locator).toBeVisible() failed
  50  |   await bookBtn.first().click();
  51  |   await page.waitForTimeout(2000);
  52  |   const form = page.locator('form, [role="dialog"], [class*="modal"]');
  53  |   await expect(form.first()).toBeVisible({ timeout: 5000 });
  54  |   console.log('✅ New booking form opens');
  55  | });
  56  | 
  57  | test('CUST-05 - Booking form has all required fields', async ({ page }) => {
  58  |   await customerLogin(page, email, password);
  59  |   await page.goto('/dashboard/bookings');
  60  |   await page.waitForLoadState('networkidle');
  61  |   await page.waitForTimeout(2000);
  62  |   const bookBtn = page.locator('button:has-text("New Booking"), button:has-text("Book")');
  63  |   if (await bookBtn.count() > 0) {
  64  |     await bookBtn.first().click();
  65  |     await page.waitForTimeout(2000);
  66  |     const serviceField = page.locator('select[name="service_id"], select[name="service"]');
  67  |     const areaField = page.locator('select[name="area"]');
  68  |     const dateField = page.locator('input[type="date"]');
  69  |     await expect(serviceField.first()).toBeVisible({ timeout: 5000 });
  70  |     await expect(areaField.first()).toBeVisible({ timeout: 5000 });
  71  |     await expect(dateField.first()).toBeVisible({ timeout: 5000 });
  72  |     console.log('✅ Booking form has required fields');
  73  |   }
  74  | });
  75  | 
  76  | test('CUST-06 - Booking form service dropdown has options', async ({ page }) => {
  77  |   await customerLogin(page, email, password);
  78  |   await page.goto('/dashboard/bookings');
  79  |   await page.waitForLoadState('networkidle');
  80  |   await page.waitForTimeout(2000);
  81  |   const bookBtn = page.locator('button:has-text("New Booking"), button:has-text("Book")');
  82  |   if (await bookBtn.count() > 0) {
  83  |     await bookBtn.first().click();
  84  |     await page.waitForTimeout(3000);
  85  |     const serviceSelect = page.locator('select[name="service_id"], select[name="service"]');
  86  |     if (await serviceSelect.count() > 0) {
  87  |       const options = await serviceSelect.first().locator('option').count();
  88  |       expect(options).toBeGreaterThan(1);
  89  |       console.log(`✅ Service dropdown has ${options} options`);
  90  |     }
  91  |   }
  92  | });
  93  | 
  94  | test('CUST-07 - Complete booking submission creates booking with reference', async ({ page }) => {
  95  |   await customerLogin(page, email, password);
  96  |   await page.goto('/dashboard/bookings');
  97  |   await page.waitForLoadState('networkidle');
  98  |   await page.waitForTimeout(2000);
  99  | 
  100 |   const bookBtn = page.locator('button:has-text("New Booking"), button:has-text("Book")');
  101 |   if (await bookBtn.count() === 0) { test.skip(); return; }
  102 |   await bookBtn.first().click();
  103 |   await page.waitForTimeout(2000);
  104 | 
  105 |   const serviceSelect = page.locator('select[name="service_id"], select[name="service"]');
  106 |   if (await serviceSelect.count() > 0) await serviceSelect.selectOption({ index: 1 });
  107 | 
  108 |   const areaSelect = page.locator('select[name="area"]');
  109 |   if (await areaSelect.count() > 0) await areaSelect.selectOption({ index: 1 });
  110 | 
  111 |   const dateInput = page.locator('input[type="date"]');
  112 |   if (await dateInput.count() > 0) await dateInput.fill('2026-08-15');
  113 | 
  114 |   const timeInput = page.locator('input[type="time"]');
  115 |   if (await timeInput.count() > 0) await timeInput.fill('10:00');
  116 | 
  117 |   const notes = page.locator('textarea[name="notes"], textarea');
  118 |   if (await notes.count() > 0) await notes.first().fill('Please bring eco-friendly products');
  119 | 
  120 |   const whatsapp = page.locator('input[name="whatsapp"], input[placeholder*="WhatsApp"]');
  121 |   if (await whatsapp.count() > 0) await whatsapp.fill('0123456789');
  122 | 
  123 |   const submit = page.locator('button:has-text("Confirm"), button:has-text("Submit"), button:has-text("Book Now")');
  124 |   if (await submit.count() > 0) {
  125 |     await submit.first().click();
  126 |     await page.waitForTimeout(5000);
  127 |     const body = await page.locator('body').innerText();
  128 |     const success = body.includes('IPF-') || body.toLowerCase().match(/confirmed|success|booked/);
  129 |     expect(success).toBeTruthy();
  130 |     console.log('✅ Booking created with reference number');
  131 |   }
  132 | });
  133 | 
  134 | test('CUST-08 - Booking appears in bookings list after creation', async ({ page }) => {
  135 |   await customerLogin(page, email, password);
  136 |   await page.goto('/dashboard/bookings');
  137 |   await page.waitForLoadState('networkidle');
  138 |   await page.waitForTimeout(3000);
  139 |   const body = await page.locator('body').innerText();
  140 |   const hasBooking = body.includes('IPF-') || body.toLowerCase().includes('pending');
  141 |   expect(hasBooking).toBeTruthy();
  142 |   console.log('✅ Booking appears in list');
  143 | });
  144 | 
  145 | test('CUST-09 - Booking has correct status badge', async ({ page }) => {
  146 |   await customerLogin(page, email, password);
  147 |   await page.goto('/dashboard/bookings');
  148 |   await page.waitForLoadState('networkidle');
  149 |   await page.waitForTimeout(3000);
```