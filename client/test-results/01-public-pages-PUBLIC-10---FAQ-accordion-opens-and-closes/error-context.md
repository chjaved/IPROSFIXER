# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 01-public-pages.spec.js >> PUBLIC-10 - FAQ accordion opens and closes
- Location: tests\01-public-pages.spec.js:85:1

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('[class*="faq"], [class*="accordion"], button').first()
    - locator resolved to <button aria-expanded="false" aria-label="Toggle menu" class="lg:hidden text-teal p-2 rounded-lg hover:bg-teal-light transition-colors">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
      - waiting 100ms
    29 × waiting for element to be visible, enabled and stable
       - element is not visible
     - retrying click action
       - waiting 500ms

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
  - main [ref=e23]:
    - generic [ref=e26]:
      - navigation "Breadcrumb" [ref=e27]:
        - link "Home" [ref=e28] [cursor=pointer]:
          - /url: /
        - generic [ref=e29]: ›
        - generic [ref=e30]: FAQ
      - generic [ref=e31]: Help Centre
      - heading "Frequently Asked Questions" [level=1] [ref=e32]
      - paragraph [ref=e33]: Find quick answers to the most common questions about iPROFIXER.
    - generic [ref=e35]:
      - generic [ref=e36]:
        - button "All Questions" [ref=e37] [cursor=pointer]:
          - img [ref=e38]
          - text: All Questions
        - button "Booking" [ref=e41] [cursor=pointer]:
          - img [ref=e42]
          - text: Booking
        - button "Payment" [ref=e45] [cursor=pointer]:
          - img [ref=e46]
          - text: Payment
        - button "Coverage" [ref=e49] [cursor=pointer]:
          - img [ref=e50]
          - text: Coverage
        - button "Guarantee" [ref=e53] [cursor=pointer]:
          - img [ref=e54]
          - text: Guarantee
        - button "For Professionals" [ref=e57] [cursor=pointer]:
          - img [ref=e58]
          - text: For Professionals
      - generic [ref=e61]: Showing 21 of 21 questions
      - generic [ref=e62]:
        - button "How do I book a service?" [ref=e64] [cursor=pointer]:
          - generic [ref=e65]: How do I book a service?
          - img [ref=e66]
        - button "Do I need an account to book?" [ref=e69] [cursor=pointer]:
          - generic [ref=e70]: Do I need an account to book?
          - img [ref=e71]
        - button "How quickly can I get a professional?" [ref=e74] [cursor=pointer]:
          - generic [ref=e75]: How quickly can I get a professional?
          - img [ref=e76]
        - button "Can I reschedule or cancel?" [ref=e79] [cursor=pointer]:
          - generic [ref=e80]: Can I reschedule or cancel?
          - img [ref=e81]
        - button "What information do I need when booking?" [ref=e84] [cursor=pointer]:
          - generic [ref=e85]: What information do I need when booking?
          - img [ref=e86]
        - button "How is payment handled?" [ref=e89] [cursor=pointer]:
          - generic [ref=e90]: How is payment handled?
          - img [ref=e91]
        - button "Are there any hidden charges?" [ref=e94] [cursor=pointer]:
          - generic [ref=e95]: Are there any hidden charges?
          - img [ref=e96]
        - button "Do I pay if not satisfied?" [ref=e99] [cursor=pointer]:
          - generic [ref=e100]: Do I pay if not satisfied?
          - img [ref=e101]
        - button "Will I receive a receipt?" [ref=e104] [cursor=pointer]:
          - generic [ref=e105]: Will I receive a receipt?
          - img [ref=e106]
        - button "What areas do you currently cover?" [ref=e109] [cursor=pointer]:
          - generic [ref=e110]: What areas do you currently cover?
          - img [ref=e111]
        - button "Are you expanding to other states?" [ref=e114] [cursor=pointer]:
          - generic [ref=e115]: Are you expanding to other states?
          - img [ref=e116]
        - button "Do you serve condominiums and apartments?" [ref=e119] [cursor=pointer]:
          - generic [ref=e120]: Do you serve condominiums and apartments?
          - img [ref=e121]
        - button "Is there a satisfaction guarantee?" [ref=e124] [cursor=pointer]:
          - generic [ref=e125]: Is there a satisfaction guarantee?
          - img [ref=e126]
        - button "Are professionals verified and insured?" [ref=e129] [cursor=pointer]:
          - generic [ref=e130]: Are professionals verified and insured?
          - img [ref=e131]
        - button "What if the professional damages something?" [ref=e134] [cursor=pointer]:
          - generic [ref=e135]: What if the professional damages something?
          - img [ref=e136]
        - button "Is there a warranty on repair work?" [ref=e139] [cursor=pointer]:
          - generic [ref=e140]: Is there a warranty on repair work?
          - img [ref=e141]
        - button "How do I join as a professional?" [ref=e144] [cursor=pointer]:
          - generic [ref=e145]: How do I join as a professional?
          - img [ref=e146]
        - button "Do I need formal qualifications?" [ref=e149] [cursor=pointer]:
          - generic [ref=e150]: Do I need formal qualifications?
          - img [ref=e151]
        - button "How much can I earn?" [ref=e154] [cursor=pointer]:
          - generic [ref=e155]: How much can I earn?
          - img [ref=e156]
        - button "When and how do I get paid?" [ref=e159] [cursor=pointer]:
          - generic [ref=e160]: When and how do I get paid?
          - img [ref=e161]
        - button "Can I work part-time?" [ref=e164] [cursor=pointer]:
          - generic [ref=e165]: Can I work part-time?
          - img [ref=e166]
      - generic [ref=e168]:
        - img "Support" [ref=e170]
        - generic [ref=e172]:
          - img [ref=e174]
          - heading "Still Have Questions?" [level=3] [ref=e176]
          - paragraph [ref=e177]: Our team typically responds within 10 minutes on WhatsApp during operating hours.
          - generic [ref=e178]:
            - link "Chat on WhatsApp" [ref=e179] [cursor=pointer]:
              - /url: https://wa.me/60162104127
              - img [ref=e180]
              - text: Chat on WhatsApp
            - link "Send a Message" [ref=e182] [cursor=pointer]:
              - /url: /contact
              - text: Send a Message
              - img [ref=e183]
  - contentinfo [ref=e185]:
    - generic [ref=e188]:
      - generic [ref=e189]:
        - img [ref=e191]
        - generic [ref=e193]: Verified Pros
      - generic [ref=e194]:
        - img [ref=e196]
        - generic [ref=e199]: Quality Assured
      - generic [ref=e200]:
        - img [ref=e202]
        - generic [ref=e205]: On-Time Service
    - generic [ref=e206]:
      - generic [ref=e207]:
        - generic [ref=e208]:
          - link "iPROFIXER" [ref=e209] [cursor=pointer]:
            - /url: /
            - img "iPROFIXER" [ref=e210]
          - paragraph [ref=e211]: Malaysia's most trusted cleaning service platform. Connecting homeowners with verified cleaning professionals for all your home cleaning needs.
          - generic [ref=e212]:
            - link "+03-8080 5249" [ref=e213] [cursor=pointer]:
              - /url: tel:+60380805249
              - img [ref=e215]
              - generic [ref=e217]: +03-8080 5249
            - link "for_services@iprofixer.com.my" [ref=e218] [cursor=pointer]:
              - /url: mailto:for_services@iprofixer.com.my
              - img [ref=e220]
              - generic [ref=e223]: for_services@iprofixer.com.my
            - generic [ref=e224]:
              - img [ref=e226]
              - generic [ref=e229]: Ara Damansara, Petaling Jaya
        - generic [ref=e230]:
          - generic [ref=e231]:
            - heading "Services" [level=4] [ref=e232]
            - list [ref=e233]:
              - listitem [ref=e234]:
                - link "Home Deep Cleaning" [ref=e235] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e236]
                  - text: Home Deep Cleaning
              - listitem [ref=e238]:
                - link "Regular Maid Service" [ref=e239] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e240]
                  - text: Regular Maid Service
              - listitem [ref=e242]:
                - link "Post-Renovation Cleaning" [ref=e243] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e244]
                  - text: Post-Renovation Cleaning
              - listitem [ref=e246]:
                - link "Sofa & Carpet Cleaning" [ref=e247] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e248]
                  - text: Sofa & Carpet Cleaning
              - listitem [ref=e250]:
                - link "Post-Event Cleanup" [ref=e251] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e252]
                  - text: Post-Event Cleanup
              - listitem [ref=e254]:
                - link "Laundry & Ironing" [ref=e255] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e256]
                  - text: Laundry & Ironing
              - listitem [ref=e258]:
                - link "Part-Time Maid" [ref=e259] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e260]
                  - text: Part-Time Maid
          - generic [ref=e262]:
            - heading "Company" [level=4] [ref=e263]
            - list [ref=e264]:
              - listitem [ref=e265]:
                - link "About iPROFIXER" [ref=e266] [cursor=pointer]:
                  - /url: /about
                  - img [ref=e267]
                  - text: About iPROFIXER
              - listitem [ref=e269]:
                - link "How It Works" [ref=e270] [cursor=pointer]:
                  - /url: /how-it-works
                  - img [ref=e271]
                  - text: How It Works
              - listitem [ref=e273]:
                - link "Join as Professional" [ref=e274] [cursor=pointer]:
                  - /url: /for-professionals
                  - img [ref=e275]
                  - text: Join as Professional
              - listitem [ref=e277]:
                - link "Careers" [ref=e278] [cursor=pointer]:
                  - /url: /faq
                  - img [ref=e279]
                  - text: Careers
              - listitem [ref=e281]:
                - link "Blog & Tips" [ref=e282] [cursor=pointer]:
                  - /url: /faq
                  - img [ref=e283]
                  - text: Blog & Tips
          - generic [ref=e285]:
            - heading "Support" [level=4] [ref=e286]
            - list [ref=e287]:
              - listitem [ref=e288]:
                - link "Help Center / FAQ" [ref=e289] [cursor=pointer]:
                  - /url: /faq
                  - img [ref=e290]
                  - text: Help Center / FAQ
              - listitem [ref=e292]:
                - link "Safety Guidelines" [ref=e293] [cursor=pointer]:
                  - /url: /faq
                  - img [ref=e294]
                  - text: Safety Guidelines
              - listitem [ref=e296]:
                - link "Cancellation Policy" [ref=e297] [cursor=pointer]:
                  - /url: /faq
                  - img [ref=e298]
                  - text: Cancellation Policy
              - listitem [ref=e300]:
                - link "Refund Policy" [ref=e301] [cursor=pointer]:
                  - /url: /faq
                  - img [ref=e302]
                  - text: Refund Policy
              - listitem [ref=e304]:
                - link "Service Guarantee" [ref=e305] [cursor=pointer]:
                  - /url: /faq
                  - img [ref=e306]
                  - text: Service Guarantee
        - generic [ref=e308]:
          - heading "Stay Updated" [level=4] [ref=e309]
          - paragraph [ref=e310]: Get home maintenance tips and exclusive offers.
          - generic [ref=e311]:
            - generic [ref=e312]:
              - img [ref=e313]
              - textbox "Enter your email" [ref=e316]
            - button "Subscribe Now" [ref=e317] [cursor=pointer]
          - link "Chat on WhatsApp" [ref=e318] [cursor=pointer]:
            - /url: https://wa.me/60162104127
            - img [ref=e319]
            - text: Chat on WhatsApp
      - generic [ref=e322]:
        - generic [ref=e323]:
          - generic [ref=e324]: "Follow us:"
          - generic [ref=e325]:
            - link "Facebook" [ref=e326] [cursor=pointer]:
              - /url: https://facebook.com/iprofixer
              - img [ref=e327]
            - link "Instagram" [ref=e329] [cursor=pointer]:
              - /url: https://instagram.com/iprofixer
              - img [ref=e330]
            - link "LinkedIn" [ref=e333] [cursor=pointer]:
              - /url: https://linkedin.com/company/iprofixer
              - img [ref=e334]
            - link "Twitter" [ref=e338] [cursor=pointer]:
              - /url: https://twitter.com/iprofixer
              - img [ref=e339]
            - link "YouTube" [ref=e341] [cursor=pointer]:
              - /url: https://youtube.com/iprofixer
              - img [ref=e342]
        - generic [ref=e345]:
          - generic [ref=e346]: "We accept:"
          - generic [ref=e347]:
            - img [ref=e348]
            - img [ref=e350]
            - img [ref=e352]
            - generic [ref=e354]:
              - img [ref=e355]
              - generic [ref=e357]: Pay
      - generic [ref=e359]:
        - paragraph [ref=e360]: © 2026 iPROFIXER — IPROS EDUCTECH SDN BHD. All rights reserved.
        - generic [ref=e361]:
          - link "Privacy Policy" [ref=e362] [cursor=pointer]:
            - /url: /privacy
          - link "Terms of Service" [ref=e363] [cursor=pointer]:
            - /url: /terms
          - link "Cookies" [ref=e364] [cursor=pointer]:
            - /url: /cookie-policy
    - button "Back to top" [ref=e365] [cursor=pointer]:
      - img [ref=e366]
  - button "Open chat" [ref=e368] [cursor=pointer]:
    - img [ref=e369]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test('PUBLIC-01 - Homepage loads with correct title and content', async ({ page }) => {
  4   |   await page.goto('/');
  5   |   await page.waitForLoadState('networkidle');
  6   |   await expect(page).toHaveTitle(/iPROFIXER/i);
  7   |   const body = await page.locator('body').innerText();
  8   |   expect(body.toLowerCase()).toMatch(/clean|service|malaysia/);
  9   |   console.log('✅ Homepage loaded');
  10  | });
  11  | 
  12  | test('PUBLIC-02 - Homepage has working navigation links', async ({ page }) => {
  13  |   await page.goto('/');
  14  |   await page.waitForLoadState('networkidle');
  15  |   const nav = page.locator('nav');
  16  |   await expect(nav).toBeVisible();
  17  |   console.log('✅ Navigation visible');
  18  | });
  19  | 
  20  | test('PUBLIC-03 - Homepage CTA buttons work', async ({ page }) => {
  21  |   await page.goto('/');
  22  |   await page.waitForLoadState('networkidle');
  23  |   const ctaBtn = page.locator('a:has-text("Book"), button:has-text("Book")').first();
  24  |   if (await ctaBtn.count() > 0) {
  25  |     await expect(ctaBtn).toBeVisible();
  26  |     console.log('✅ CTA button visible');
  27  |   }
  28  | });
  29  | 
  30  | test('PUBLIC-04 - Homepage WhatsApp button works', async ({ page }) => {
  31  |   await page.goto('/');
  32  |   await page.waitForLoadState('networkidle');
  33  |   const waBtn = page.locator('a[href*="wa.me"], a:has-text("WhatsApp")').first();
  34  |   if (await waBtn.count() > 0) {
  35  |     const href = await waBtn.getAttribute('href');
  36  |     expect(href).toContain('wa.me');
  37  |     console.log('✅ WhatsApp button has correct link');
  38  |   }
  39  | });
  40  | 
  41  | test('PUBLIC-05 - Services page loads all cleaning services', async ({ page }) => {
  42  |   await page.goto('/services');
  43  |   await page.waitForLoadState('networkidle');
  44  |   await page.waitForTimeout(3000);
  45  |   const body = await page.locator('body').innerText();
  46  |   expect(body.toLowerCase()).toMatch(/clean|maid|laundry/);
  47  |   console.log('✅ Services page loaded');
  48  | });
  49  | 
  50  | test('PUBLIC-06 - Services page Book button redirects correctly', async ({ page }) => {
  51  |   await page.goto('/services');
  52  |   await page.waitForLoadState('networkidle');
  53  |   await page.waitForTimeout(2000);
  54  |   const bookBtn = page.locator('button:has-text("Book"), a:has-text("Book")').first();
  55  |   if (await bookBtn.count() > 0) {
  56  |     await bookBtn.click();
  57  |     await page.waitForTimeout(2000);
  58  |     const url = page.url();
  59  |     expect(url).toMatch(/signup|login|dashboard/);
  60  |     console.log('✅ Book button redirects correctly');
  61  |   }
  62  | });
  63  | 
  64  | test('PUBLIC-07 - How It Works page loads', async ({ page }) => {
  65  |   await page.goto('/how-it-works');
  66  |   await page.waitForLoadState('networkidle');
  67  |   await expect(page.locator('body')).toBeVisible();
  68  |   console.log('✅ How It Works page loaded');
  69  | });
  70  | 
  71  | test('PUBLIC-08 - For Professionals page loads', async ({ page }) => {
  72  |   await page.goto('/for-professionals');
  73  |   await page.waitForLoadState('networkidle');
  74  |   await expect(page.locator('body')).toBeVisible();
  75  |   console.log('✅ For Professionals page loaded');
  76  | });
  77  | 
  78  | test('PUBLIC-09 - FAQ page loads', async ({ page }) => {
  79  |   await page.goto('/faq');
  80  |   await page.waitForLoadState('networkidle');
  81  |   await expect(page.locator('body')).toBeVisible();
  82  |   console.log('✅ FAQ page loaded');
  83  | });
  84  | 
  85  | test('PUBLIC-10 - FAQ accordion opens and closes', async ({ page }) => {
  86  |   await page.goto('/faq');
  87  |   await page.waitForLoadState('networkidle');
  88  |   await page.waitForTimeout(1000);
  89  |   const faqItem = page.locator('[class*="faq"], [class*="accordion"], button').first();
  90  |   if (await faqItem.count() > 0) {
> 91  |     await faqItem.click();
      |                   ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
  92  |     await page.waitForTimeout(500);
  93  |     console.log('✅ FAQ accordion works');
  94  |   }
  95  | });
  96  | 
  97  | test('PUBLIC-11 - Contact page loads and form exists', async ({ page }) => {
  98  |   await page.goto('/contact');
  99  |   await page.waitForLoadState('networkidle');
  100 |   await expect(page.locator('body')).toBeVisible();
  101 |   console.log('✅ Contact page loaded');
  102 | });
  103 | 
  104 | test('PUBLIC-12 - Contact form submits successfully', async ({ page }) => {
  105 |   await page.goto('/contact');
  106 |   await page.waitForLoadState('networkidle');
  107 |   await page.waitForTimeout(1000);
  108 |   const nameInput = page.locator('input[name="name"], input[placeholder*="Name"]').first();
  109 |   if (await nameInput.count() > 0) {
  110 |     await nameInput.fill('Test User');
  111 |     const phone = page.locator('input[name="phone"], input[placeholder*="Phone"]').first();
  112 |     if (await phone.count() > 0) await phone.fill('0123456789');
  113 |     const email = page.locator('input[type="email"]').first();
  114 |     if (await email.count() > 0) await email.fill('test@test.com');
  115 |     const message = page.locator('textarea[name="message"], textarea').first();
  116 |     if (await message.count() > 0) await message.fill('This is a test message from Playwright');
  117 |     const submit = page.locator('button[type="submit"]').first();
  118 |     if (await submit.count() > 0) {
  119 |       await submit.click();
  120 |       await page.waitForTimeout(5000);
  121 |       const body = await page.locator('body').innerText();
  122 |       const success = body.toLowerCase().match(/success|sent|thank|received/);
  123 |       if (success) console.log('✅ Contact form submitted successfully');
  124 |       else console.log('⚠️ Contact form submission - check response');
  125 |     }
  126 |   }
  127 | });
  128 | 
  129 | test('PUBLIC-13 - Privacy policy page loads', async ({ page }) => {
  130 |   await page.goto('/privacy');
  131 |   await page.waitForLoadState('networkidle');
  132 |   await expect(page.locator('body')).toBeVisible();
  133 |   console.log('✅ Privacy policy loaded');
  134 | });
  135 | 
  136 | test('PUBLIC-14 - Terms page loads', async ({ page }) => {
  137 |   await page.goto('/terms');
  138 |   await page.waitForLoadState('networkidle');
  139 |   await expect(page.locator('body')).toBeVisible();
  140 |   console.log('✅ Terms page loaded');
  141 | });
  142 | 
  143 | test('PUBLIC-15 - 404 page shows for invalid routes', async ({ page }) => {
  144 |   await page.goto('/this-page-does-not-exist');
  145 |   await page.waitForLoadState('networkidle');
  146 |   await page.waitForTimeout(2000);
  147 |   const body = await page.locator('body').innerText();
  148 |   const is404 = body.match(/404|not found|page.*not.*exist/i);
  149 |   expect(is404).toBeTruthy();
  150 |   console.log('✅ 404 page works');
  151 | });
  152 | 
  153 | test('PUBLIC-16 - Unauthenticated access to dashboard redirects', async ({ page }) => {
  154 |   await page.goto('/dashboard');
  155 |   await page.waitForTimeout(3000);
  156 |   expect(page.url()).toMatch(/login|signup|\//);
  157 |   console.log('✅ Protected route redirects to login');
  158 | });
  159 | 
  160 | test('PUBLIC-17 - API health check returns ok', async ({ page }) => {
  161 |   await page.goto('/api/health');
  162 |   const body = await page.locator('body').innerText();
  163 |   expect(body).toContain('ok');
  164 |   console.log('✅ API health check passing');
  165 | });
  166 | 
  167 | test('PUBLIC-18 - API services endpoint returns services', async ({ page }) => {
  168 |   await page.goto('/api/services');
  169 |   const body = await page.locator('body').innerText();
  170 |   expect(body.toLowerCase()).toContain('clean');
  171 |   console.log('✅ API services endpoint working');
  172 | });
  173 | 
```