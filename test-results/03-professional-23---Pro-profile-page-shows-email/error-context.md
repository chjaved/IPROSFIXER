# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 03-professional.spec.js >> 23 - Pro profile page shows email
- Location: tests\03-professional.spec.js:69:1

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "prodash_1780330241440@test.com"
Received string:    "Home
Services
How It Works
For Pros
FAQ
Pro Dashboard
Hi, Siti
Logout
Pro
Dashboard
Profile
Job Requests
Earnings
Schedule
Reviews
My Profile·
Manage your professional information·
Siti Pro Professional·
Part-Time Maid / Cleaner Specialist·
Verified Pro
4.8 Rating·
0·
Jobs Completed·
0·
Reviews·
5·
Avg Rating·
Professional Information
Full Name
Email
Phone
Service Category
Deep Cleaning
Regular Maid
AC Repair
Electrical
Caregiver
Bio
Service Area
Experience
0-1 years
1-3 years
3-5 years
5+ years
Save Changes
Documents
Verified·
IC/Passport·
Update·
Bank Account·
Update
Verified Pros
Quality Assured
On-Time Service·
Malaysia's most trusted cleaning service platform. Connecting homeowners with verified cleaning professionals for all your home cleaning needs.·
+03-8080 5249
for_services@iprofixer.com.my
Ara Damansara, Petaling Jaya
Services
Home Deep Cleaning
Regular Maid Service
Post-Renovation Cleaning
Sofa & Carpet Cleaning
Post-Event Cleanup
Laundry & Ironing
Part-Time Maid
Company
About iPROFIXER
How It Works
Join as Professional
Careers
Blog & Tips
Support
Help Center / FAQ
Safety Guidelines
Cancellation Policy
Refund Policy
Service Guarantee
Stay Updated·
Get home maintenance tips and exclusive offers.·
Subscribe Now
Chat on WhatsApp
Follow us:
We accept:
Pay·
© 2026 iPROFIXER — IPROS EDUCTECH SDN BHD. All rights reserved.·
Privacy Policy
Terms of Service
Cookies"
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
  - generic [ref=e30]:
    - complementary [ref=e31]:
      - generic [ref=e32]:
        - link "iPROFIXER Pro" [ref=e33] [cursor=pointer]:
          - /url: /
          - img "iPROFIXER" [ref=e34]
          - generic [ref=e35]: Pro
        - navigation [ref=e36]:
          - link "Dashboard" [ref=e37] [cursor=pointer]:
            - /url: /pro-dashboard
            - img [ref=e38]
            - text: Dashboard
          - link "Profile" [ref=e43] [cursor=pointer]:
            - /url: /pro-dashboard/profile
            - img [ref=e44]
            - text: Profile
          - link "Job Requests" [ref=e47] [cursor=pointer]:
            - /url: /pro-dashboard/jobs
            - img [ref=e48]
            - text: Job Requests
          - link "Earnings" [ref=e51] [cursor=pointer]:
            - /url: /pro-dashboard/earnings
            - img [ref=e52]
            - text: Earnings
          - link "Schedule" [ref=e55] [cursor=pointer]:
            - /url: /pro-dashboard/schedule
            - img [ref=e56]
            - text: Schedule
          - link "Reviews" [ref=e58] [cursor=pointer]:
            - /url: /pro-dashboard/reviews
            - img [ref=e59]
            - text: Reviews
    - main [ref=e61]:
      - generic [ref=e62]:
        - heading "My Profile" [level=1] [ref=e63]
        - paragraph [ref=e64]: Manage your professional information
        - generic [ref=e67]:
          - generic [ref=e68]:
            - img [ref=e71]
            - button [ref=e74] [cursor=pointer]:
              - img [ref=e75]
          - generic [ref=e78]:
            - generic [ref=e79]:
              - heading "Siti Pro Professional" [level=2] [ref=e80]
              - paragraph [ref=e81]: Part-Time Maid / Cleaner Specialist
            - generic [ref=e82]:
              - generic [ref=e83]:
                - img [ref=e84]
                - text: Verified Pro
              - generic [ref=e87]:
                - img [ref=e88]
                - text: 4.8 Rating
          - generic [ref=e90]:
            - generic [ref=e91]:
              - paragraph [ref=e92]: "0"
              - paragraph [ref=e93]: Jobs Completed
            - generic [ref=e94]:
              - paragraph [ref=e95]: "0"
              - paragraph [ref=e96]: Reviews
            - generic [ref=e97]:
              - paragraph [ref=e98]: "5"
              - paragraph [ref=e99]: Avg Rating
        - generic [ref=e100]:
          - heading "Professional Information" [level=3] [ref=e101]
          - generic [ref=e102]:
            - generic [ref=e103]:
              - generic [ref=e104]:
                - generic [ref=e105]: Full Name
                - generic [ref=e106]:
                  - img [ref=e107]
                  - textbox [ref=e110]: Siti Pro Professional
              - generic [ref=e111]:
                - generic [ref=e112]: Email
                - generic [ref=e113]:
                  - img [ref=e114]
                  - textbox [ref=e117]: prodash_1780330241440@test.com
              - generic [ref=e118]:
                - generic [ref=e119]: Phone
                - generic [ref=e120]:
                  - img [ref=e121]
                  - textbox [ref=e123]: "0123456789"
              - generic [ref=e124]:
                - generic [ref=e125]: Service Category
                - generic [ref=e126]:
                  - img [ref=e127]
                  - combobox [ref=e130]:
                    - option "Deep Cleaning" [selected]
                    - option "Regular Maid"
                    - option "AC Repair"
                    - option "Electrical"
                    - option "Caregiver"
            - generic [ref=e131]:
              - generic [ref=e132]: Bio
              - textbox [ref=e133]
            - generic [ref=e134]:
              - generic [ref=e135]:
                - generic [ref=e136]: Service Area
                - generic [ref=e137]:
                  - img [ref=e138]
                  - textbox [ref=e141]: Kuala Lumpur
              - generic [ref=e142]:
                - generic [ref=e143]: Experience
                - combobox [ref=e144]:
                  - option "0-1 years" [selected]
                  - option "1-3 years"
                  - option "3-5 years"
                  - option "5+ years"
            - button "Save Changes" [ref=e146] [cursor=pointer]:
              - img [ref=e147]
              - text: Save Changes
        - generic [ref=e151]:
          - generic [ref=e152]:
            - heading "Documents" [level=3] [ref=e153]
            - generic [ref=e154]: Verified
          - generic [ref=e155]:
            - generic [ref=e156]:
              - generic [ref=e157]:
                - img [ref=e158]
                - generic [ref=e161]:
                  - paragraph [ref=e162]: IC/Passport
                  - paragraph
              - button "Update" [ref=e163] [cursor=pointer]
            - generic [ref=e164]:
              - generic [ref=e165]:
                - img [ref=e166]
                - generic [ref=e169]:
                  - paragraph [ref=e170]: Bank Account
                  - paragraph
              - button "Update" [ref=e171] [cursor=pointer]
  - contentinfo [ref=e172]:
    - generic [ref=e175]:
      - generic [ref=e176]:
        - img [ref=e178]
        - generic [ref=e180]: Verified Pros
      - generic [ref=e181]:
        - img [ref=e183]
        - generic [ref=e186]: Quality Assured
      - generic [ref=e187]:
        - img [ref=e189]
        - generic [ref=e192]: On-Time Service
    - generic [ref=e193]:
      - generic [ref=e194]:
        - generic [ref=e195]:
          - link "iPROFIXER" [ref=e196] [cursor=pointer]:
            - /url: /
            - img "iPROFIXER" [ref=e197]
          - paragraph [ref=e198]: Malaysia's most trusted cleaning service platform. Connecting homeowners with verified cleaning professionals for all your home cleaning needs.
          - generic [ref=e199]:
            - link "+03-8080 5249" [ref=e200] [cursor=pointer]:
              - /url: tel:+60380805249
              - img [ref=e202]
              - generic [ref=e204]: +03-8080 5249
            - link "for_services@iprofixer.com.my" [ref=e205] [cursor=pointer]:
              - /url: mailto:for_services@iprofixer.com.my
              - img [ref=e207]
              - generic [ref=e210]: for_services@iprofixer.com.my
            - generic [ref=e211]:
              - img [ref=e213]
              - generic [ref=e216]: Ara Damansara, Petaling Jaya
        - generic [ref=e217]:
          - generic [ref=e218]:
            - heading "Services" [level=4] [ref=e219]
            - list [ref=e220]:
              - listitem [ref=e221]:
                - link "Home Deep Cleaning" [ref=e222] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e223]
                  - text: Home Deep Cleaning
              - listitem [ref=e225]:
                - link "Regular Maid Service" [ref=e226] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e227]
                  - text: Regular Maid Service
              - listitem [ref=e229]:
                - link "Post-Renovation Cleaning" [ref=e230] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e231]
                  - text: Post-Renovation Cleaning
              - listitem [ref=e233]:
                - link "Sofa & Carpet Cleaning" [ref=e234] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e235]
                  - text: Sofa & Carpet Cleaning
              - listitem [ref=e237]:
                - link "Post-Event Cleanup" [ref=e238] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e239]
                  - text: Post-Event Cleanup
              - listitem [ref=e241]:
                - link "Laundry & Ironing" [ref=e242] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e243]
                  - text: Laundry & Ironing
              - listitem [ref=e245]:
                - link "Part-Time Maid" [ref=e246] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e247]
                  - text: Part-Time Maid
          - generic [ref=e249]:
            - heading "Company" [level=4] [ref=e250]
            - list [ref=e251]:
              - listitem [ref=e252]:
                - link "About iPROFIXER" [ref=e253] [cursor=pointer]:
                  - /url: /about
                  - img [ref=e254]
                  - text: About iPROFIXER
              - listitem [ref=e256]:
                - link "How It Works" [ref=e257] [cursor=pointer]:
                  - /url: /how-it-works
                  - img [ref=e258]
                  - text: How It Works
              - listitem [ref=e260]:
                - link "Join as Professional" [ref=e261] [cursor=pointer]:
                  - /url: /for-professionals
                  - img [ref=e262]
                  - text: Join as Professional
              - listitem [ref=e264]:
                - link "Careers" [ref=e265] [cursor=pointer]:
                  - /url: /pro-dashboard/profile
                  - img [ref=e266]
                  - text: Careers
              - listitem [ref=e268]:
                - link "Blog & Tips" [ref=e269] [cursor=pointer]:
                  - /url: /pro-dashboard/profile
                  - img [ref=e270]
                  - text: Blog & Tips
          - generic [ref=e272]:
            - heading "Support" [level=4] [ref=e273]
            - list [ref=e274]:
              - listitem [ref=e275]:
                - link "Help Center / FAQ" [ref=e276] [cursor=pointer]:
                  - /url: /faq
                  - img [ref=e277]
                  - text: Help Center / FAQ
              - listitem [ref=e279]:
                - link "Safety Guidelines" [ref=e280] [cursor=pointer]:
                  - /url: /pro-dashboard/profile
                  - img [ref=e281]
                  - text: Safety Guidelines
              - listitem [ref=e283]:
                - link "Cancellation Policy" [ref=e284] [cursor=pointer]:
                  - /url: /pro-dashboard/profile
                  - img [ref=e285]
                  - text: Cancellation Policy
              - listitem [ref=e287]:
                - link "Refund Policy" [ref=e288] [cursor=pointer]:
                  - /url: /pro-dashboard/profile
                  - img [ref=e289]
                  - text: Refund Policy
              - listitem [ref=e291]:
                - link "Service Guarantee" [ref=e292] [cursor=pointer]:
                  - /url: /pro-dashboard/profile
                  - img [ref=e293]
                  - text: Service Guarantee
        - generic [ref=e295]:
          - heading "Stay Updated" [level=4] [ref=e296]
          - paragraph [ref=e297]: Get home maintenance tips and exclusive offers.
          - generic [ref=e298]:
            - generic [ref=e299]:
              - img [ref=e300]
              - textbox "Enter your email" [ref=e303]
            - button "Subscribe Now" [ref=e304] [cursor=pointer]
          - link "Chat on WhatsApp" [ref=e305] [cursor=pointer]:
            - /url: https://wa.me/60162104127
            - img [ref=e306]
            - text: Chat on WhatsApp
      - generic [ref=e309]:
        - generic [ref=e310]:
          - generic [ref=e311]: "Follow us:"
          - generic [ref=e312]:
            - link "Facebook" [ref=e313] [cursor=pointer]:
              - /url: https://facebook.com/iprofixer
              - img [ref=e314]
            - link "Instagram" [ref=e316] [cursor=pointer]:
              - /url: https://instagram.com/iprofixer
              - img [ref=e317]
            - link "LinkedIn" [ref=e320] [cursor=pointer]:
              - /url: https://linkedin.com/company/iprofixer
              - img [ref=e321]
            - link "Twitter" [ref=e325] [cursor=pointer]:
              - /url: https://twitter.com/iprofixer
              - img [ref=e326]
            - link "YouTube" [ref=e328] [cursor=pointer]:
              - /url: https://youtube.com/iprofixer
              - img [ref=e329]
        - generic [ref=e332]:
          - generic [ref=e333]: "We accept:"
          - generic [ref=e334]:
            - img [ref=e335]
            - img [ref=e337]
            - img [ref=e339]
            - generic [ref=e341]:
              - img [ref=e342]
              - generic [ref=e344]: Pay
      - generic [ref=e346]:
        - paragraph [ref=e347]: © 2026 iPROFIXER — IPROS EDUCTECH SDN BHD. All rights reserved.
        - generic [ref=e348]:
          - link "Privacy Policy" [ref=e349] [cursor=pointer]:
            - /url: /privacy
          - link "Terms of Service" [ref=e350] [cursor=pointer]:
            - /url: /terms
          - link "Cookies" [ref=e351] [cursor=pointer]:
            - /url: /cookie-policy
    - button "Back to top" [ref=e352] [cursor=pointer]:
      - img [ref=e353]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { customerSignup, customerLogin, proSignup, proLogin } from './helpers.js';
  3   | 
  4   | const t = Date.now();
  5   | const proEmail = `prodash_${t}@test.com`;
  6   | const custEmail = `custforpro_${t}@test.com`;
  7   | const password = 'Test1234!';
  8   | 
  9   | test.beforeAll(async ({ browser }) => {
  10  |   const page = await browser.newPage();
  11  |   await proSignup(page, proEmail, password);
  12  |   await page.close();
  13  |   const page2 = await browser.newPage();
  14  |   await customerSignup(page2, custEmail, password);
  15  |   await page2.close();
  16  | });
  17  | 
  18  | test('18 - Pro dashboard overview loads', async ({ page }) => {
  19  |   await proLogin(page, proEmail, password);
  20  |   await page.waitForLoadState('networkidle');
  21  |   await page.waitForTimeout(2000);
  22  |   expect(page.url()).toContain('dashboard');
  23  |   console.log('✅ Pro dashboard loaded');
  24  | });
  25  | 
  26  | test('19 - Pro jobs page loads with tabs', async ({ page }) => {
  27  |   await proLogin(page, proEmail, password);
  28  |   await page.goto('/pro-dashboard/jobs');
  29  |   await page.waitForLoadState('networkidle');
  30  |   await page.waitForTimeout(3000);
  31  |   const body = await page.locator('body').innerText();
  32  |   const hasTabs = body.toLowerCase().includes('available') || 
  33  |                   body.toLowerCase().includes('active') || 
  34  |                   body.toLowerCase().includes('completed') ||
  35  |                   body.toLowerCase().includes('job');
  36  |   expect(hasTabs).toBeTruthy();
  37  |   console.log('✅ Jobs page loaded');
  38  | });
  39  | 
  40  | test('20 - Pro schedule page loads', async ({ page }) => {
  41  |   await proLogin(page, proEmail, password);
  42  |   await page.goto('/pro-dashboard/schedule');
  43  |   await page.waitForLoadState('networkidle');
  44  |   await page.waitForTimeout(2000);
  45  |   await expect(page.locator('body')).toBeVisible();
  46  |   console.log('✅ Schedule page loaded');
  47  | });
  48  | 
  49  | test('21 - Pro earnings page shows RM', async ({ page }) => {
  50  |   await proLogin(page, proEmail, password);
  51  |   await page.goto('/pro-dashboard/earnings');
  52  |   await page.waitForLoadState('networkidle');
  53  |   await page.waitForTimeout(3000);
  54  |   const body = await page.locator('body').innerText();
  55  |   const hasRM = body.includes('RM') || body.toLowerCase().includes('earning') || body.toLowerCase().includes('transaction');
  56  |   expect(hasRM).toBeTruthy();
  57  |   console.log('✅ Earnings page loaded with RM');
  58  | });
  59  | 
  60  | test('22 - Pro reviews page loads', async ({ page }) => {
  61  |   await proLogin(page, proEmail, password);
  62  |   await page.goto('/pro-dashboard/reviews');
  63  |   await page.waitForLoadState('networkidle');
  64  |   await page.waitForTimeout(2000);
  65  |   await expect(page.locator('body')).toBeVisible();
  66  |   console.log('✅ Reviews page loaded');
  67  | });
  68  | 
  69  | test('23 - Pro profile page shows email', async ({ page }) => {
  70  |   await proLogin(page, proEmail, password);
  71  |   await page.goto('/pro-dashboard/profile');
  72  |   await page.waitForLoadState('networkidle');
  73  |   await page.waitForTimeout(3000);
  74  |   const body = await page.locator('body').innerText();
> 75  |   expect(body).toContain(proEmail);
      |                ^ Error: expect(received).toContain(expected) // indexOf
  76  |   console.log('✅ Pro profile shows email');
  77  | });
  78  | 
  79  | test('24 - Pro profile update saves', async ({ page }) => {
  80  |   await proLogin(page, proEmail, password);
  81  |   await page.goto('/pro-dashboard/profile');
  82  |   await page.waitForLoadState('networkidle');
  83  |   await page.waitForTimeout(2000);
  84  |   const phoneInput = page.locator('input[name="phone"], input[placeholder*="Phone"]');
  85  |   if (await phoneInput.count() > 0) {
  86  |     await phoneInput.fill('0188887777');
  87  |     const saveBtn = page.locator('button:has-text("Save"), button:has-text("Update"), button[type="submit"]');
  88  |     if (await saveBtn.count() > 0) {
  89  |       await saveBtn.first().click();
  90  |       await page.waitForTimeout(3000);
  91  |       const body = await page.locator('body').innerText();
  92  |       const saved = body.toLowerCase().includes('saved') || 
  93  |                     body.toLowerCase().includes('updated') || 
  94  |                     body.toLowerCase().includes('success');
  95  |       expect(saved).toBeTruthy();
  96  |       console.log('✅ Pro profile updated');
  97  |     }
  98  |   }
  99  | });
  100 | 
```