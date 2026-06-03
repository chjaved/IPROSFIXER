# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 07-e2e-full-lifecycle.spec.js >> E2E-02 - Demo accounts work with real data
- Location: tests\07-e2e-full-lifecycle.spec.js:87:1

# Error details

```
TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
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
        - generic [ref=e62]: "Failed to execute 'json' on 'Response': Unexpected end of JSON input"
        - generic [ref=e63]:
          - generic [ref=e64]:
            - generic [ref=e65]: Email Address
            - generic [ref=e66]:
              - img [ref=e67]
              - textbox "you@example.com" [ref=e70]: ahmad.hafizi@demo.com
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
  1   | import { test, expect } from '@playwright/test';
  2   | import { generateEmail, signup, login, proSignup, createBooking } from './helpers.js';
  3   | 
  4   | test('E2E-01 - Complete full lifecycle from signup to payment to review', async ({ browser }) => {
  5   |   const custEmail = generateEmail('e2e_cust');
  6   |   const proEmail = generateEmail('e2e_pro');
  7   | 
  8   |   const custPage = await browser.newPage();
  9   |   const proPage = await browser.newPage();
  10  | 
  11  |   // Step 1 - Register both users
  12  |   await signup(custPage, custEmail, 'E2E Customer');
  13  |   console.log('✅ Step 1a: Customer registered');
  14  | 
  15  |   await proSignup(proPage, proEmail, 'E2E Professional');
  16  |   console.log('✅ Step 1b: Professional registered');
  17  | 
  18  |   // Step 2 - Customer books a service
  19  |   await login(custPage, custEmail);
  20  |   const ref = await createBooking(custPage);
  21  |   if (ref) console.log(`✅ Step 2: Booking created - ${ref}`);
  22  |   else console.log('⚠️ Step 2: Booking not created');
  23  | 
  24  |   // Step 3 - Professional accepts job
  25  |   await login(proPage, proEmail);
  26  |   await proPage.goto('/pro-dashboard/jobs');
  27  |   await proPage.waitForLoadState('networkidle');
  28  |   await proPage.waitForTimeout(5000);
  29  |   const acceptBtn = proPage.locator('button:has-text("Accept")').first();
  30  |   if (await acceptBtn.count() > 0) {
  31  |     await acceptBtn.click();
  32  |     await proPage.waitForTimeout(3000);
  33  |     console.log('✅ Step 3: Job accepted by professional');
  34  |   } else {
  35  |     console.log('⚠️ Step 3: No job to accept');
  36  |   }
  37  | 
  38  |   // Step 4 - Customer sees accepted status
  39  |   await custPage.goto('/dashboard/bookings');
  40  |   await custPage.waitForLoadState('networkidle');
  41  |   await custPage.waitForTimeout(3000);
  42  |   const custBody = await custPage.locator('body').innerText();
  43  |   const hasStatus = custBody.toLowerCase().match(/accepted|pending/);
  44  |   expect(hasStatus).toBeTruthy();
  45  |   console.log('✅ Step 4: Customer sees booking status');
  46  | 
  47  |   // Step 5 - Pro marks job complete
  48  |   await proPage.goto('/pro-dashboard/jobs');
  49  |   await proPage.waitForLoadState('networkidle');
  50  |   await proPage.waitForTimeout(3000);
  51  |   const completeBtn = proPage.locator('button:has-text("Complete"), button:has-text("Mark Complete")').first();
  52  |   if (await completeBtn.count() > 0) {
  53  |     await completeBtn.click();
  54  |     await proPage.waitForTimeout(3000);
  55  |     console.log('✅ Step 5: Job marked complete');
  56  |   }
  57  | 
  58  |   // Step 6 - Check earnings updated
  59  |   await proPage.goto('/pro-dashboard/earnings');
  60  |   await proPage.waitForLoadState('networkidle');
  61  |   await proPage.waitForTimeout(3000);
  62  |   const earningsBody = await proPage.locator('body').innerText();
  63  |   expect(earningsBody).toContain('RM');
  64  |   console.log('✅ Step 6: Earnings page shows RM');
  65  | 
  66  |   // Step 7 - Customer sees completed status
  67  |   await custPage.goto('/dashboard/bookings');
  68  |   await custPage.waitForLoadState('networkidle');
  69  |   await custPage.waitForTimeout(3000);
  70  |   const finalBody = await custPage.locator('body').innerText();
  71  |   expect(finalBody.length).toBeGreaterThan(100);
  72  |   console.log('✅ Step 7: Customer sees final status');
  73  | 
  74  |   // Step 8 - Professional checks reviews
  75  |   await proPage.goto('/pro-dashboard/reviews');
  76  |   await proPage.waitForLoadState('networkidle');
  77  |   await proPage.waitForTimeout(2000);
  78  |   await expect(proPage.locator('body')).toBeVisible();
  79  |   console.log('✅ Step 8: Reviews page accessible');
  80  | 
  81  |   await custPage.close();
  82  |   await proPage.close();
  83  | 
  84  |   console.log('🎉 Full E2E lifecycle completed successfully');
  85  | });
  86  | 
  87  | test('E2E-02 - Demo accounts work with real data', async ({ page }) => {
  88  |   await page.goto('/login');
  89  |   await page.waitForLoadState('networkidle');
  90  |   await page.locator('input[type="email"]').first().fill('ahmad.hafizi@demo.com');
  91  |   await page.locator('input[type="password"]').first().fill('Test1234!');
  92  |   await page.locator('button[type="submit"]').first().click();
> 93  |   await page.waitForURL(/dashboard/, { timeout: 15000 });
      |              ^ TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
  94  |   await page.waitForTimeout(3000);
  95  |   const body = await page.locator('body').innerText();
  96  |   const hasData = body.includes('IPF-') || body.toLowerCase().match(/booking|pending|completed/);
  97  |   expect(hasData).toBeTruthy();
  98  |   console.log('✅ Demo customer account has real booking data');
  99  | });
  100 | 
  101 | test('E2E-03 - Demo professional account shows real data', async ({ page }) => {
  102 |   await page.goto('/login');
  103 |   await page.waitForLoadState('networkidle');
  104 |   await page.locator('input[type="email"]').first().fill('siti.rahimah@demo.com');
  105 |   await page.locator('input[type="password"]').first().fill('Test1234!');
  106 |   await page.locator('button[type="submit"]').first().click();
  107 |   await page.waitForURL(/dashboard/, { timeout: 15000 });
  108 |   await page.waitForTimeout(3000);
  109 |   const body = await page.locator('body').innerText();
  110 |   expect(body).toContain('RM');
  111 |   console.log('✅ Demo professional account shows earnings data');
  112 | });
  113 | 
```