# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 01-public.spec.js >> PUBLIC-03 - Services page loads with 7 cleaning services
- Location: tests\01-public.spec.js:24:1

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "RM"
Received string:    "Home
Services
How It Works
For Pros
FAQ
Login
Sign Up
Home
›
Services
MARKETPLACE
Cleaning Services·
Browse independently listed cleaning vendors across 12 major Malaysian cities. Compare, choose and book — all on the app.·
DEEP CLEANING
REGULAR MAID SERVICE
SPECIALISED CLEANING
LAUNDRY & IRONING
DEEP CLEANING
DEEP CLEANING
HOME DEEP CLEANING·
Top-to-bottom deep clean covering kitchen, bathrooms, bedrooms and living areas.·
Eco-friendly products
3–8 hour packages
Satisfaction guaranteed
BOOK NOW
KITCHEN DEEP CLEAN·
Complete kitchen transformation with grease removal, cabinet wipe-down and full sanitisation.·
Degreaser treatment
All surfaces covered
Odour elimination
BOOK NOW
BATHROOM DEEP CLEAN·
Complete bathroom sanitisation with tile scrubbing, limescale removal and mirror polishing.·
Anti-bacterial treatment
Grout cleaning
Streak-free mirrors
BOOK NOW
MAID SERVICE
REGULAR MAID SERVICE
REGULAR MAID SERVICE·
Flexible 4–8 hour cleaning sessions — weekly, bi-weekly or one-off bookings.·
Vetted & insured
Flexible scheduling
Cancel anytime
BOOK NOW
PART-TIME MAID·
4-hour or 8-hour daily cleaning and household help by vetted maids.·
Same cleaner every visit
Regular or one-time
All household chores
BOOK NOW
POST-EVENT CLEANUP·
After your kenduri, birthday or gathering — restore your home fast.·
Same-day availability
Waste disposal included
2–4 hour rapid clean
BOOK NOW
SPECIALISED
SPECIALISED CLEANING
POST-RENOVATION CLEANING·
Industrial-grade clean to remove cement dust, paint splatters and construction residue.·
Tile & glass polishing
Dust extraction equipment
Same-day available
BOOK NOW
SOFA & CARPET CLEANING·
Deep extraction cleaning for fabric sofas, mattresses, carpets and rugs.·
Steam extraction
Stain & odour removal
Quick dry technology
BOOK NOW
MATTRESS & UPHOLSTERY·
Steam and UV cleaning for mattresses and upholstered furniture to eliminate dust mites.·
UV sanitisation
Dust mite elimination
Allergen-friendly
BOOK NOW
LAUNDRY
LAUNDRY & IRONING
WASH & FOLD SERVICE·
Professional washing, drying and folding for everyday clothes, bedsheets and towels.·
Free pickup & delivery
48-hour turnaround
Eco-friendly detergent
BOOK NOW
IRONING & PRESSING·
Crisp, wrinkle-free ironing for office wear, traditional attire and delicate fabrics.·
Steam pressing available
Garment protection
Same-day service
BOOK NOW
LAUNDRY & IRONING·
Complete laundry solution with wash, dry, fold and iron. Free pickup and delivery.·
Free pickup & delivery
48-hour turnaround
Steam ironing available
BOOK NOW
DOWNLOAD NOW
CLIENT OR VENDOR? JOIN THE MARKETPLACE.·
Clients — download the app and book a vetted cleaning pro in minutes. Vendors — list your services, set your rates, and grow your business on iPROFIXER.·
NEW CUSTOMER?
Sign Up Now
PROFESSIONAL?
Join as Pro
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
        - generic [ref=e30]: Services
      - generic [ref=e31]: Marketplace
      - heading "Cleaning Services" [level=1] [ref=e32]
      - paragraph [ref=e33]: Browse independently listed cleaning vendors across 12 major Malaysian cities. Compare, choose and book — all on the app.
    - generic [ref=e35]:
      - link "Deep Cleaning" [ref=e36] [cursor=pointer]:
        - /url: "#deep-clean"
      - link "Regular Maid Service" [ref=e37] [cursor=pointer]:
        - /url: "#regular-maid"
      - link "Specialised Cleaning" [ref=e38] [cursor=pointer]:
        - /url: "#specialised"
      - link "Laundry & Ironing" [ref=e39] [cursor=pointer]:
        - /url: "#laundry"
    - generic [ref=e41]:
      - generic [ref=e42]:
        - generic [ref=e43]:
          - img "Deep Cleaning" [ref=e44]
          - generic [ref=e47]:
            - generic [ref=e48]: Deep Cleaning
            - heading "Deep Cleaning" [level=2] [ref=e49]
        - generic [ref=e50]:
          - generic [ref=e51]:
            - img "Home Deep Cleaning" [ref=e53]
            - generic [ref=e55]:
              - heading "Home Deep Cleaning" [level=3] [ref=e56]
              - paragraph [ref=e57]: Top-to-bottom deep clean covering kitchen, bathrooms, bedrooms and living areas.
              - generic [ref=e58]:
                - generic [ref=e59]:
                  - img [ref=e60]
                  - text: Eco-friendly products
                - generic [ref=e63]:
                  - img [ref=e64]
                  - text: 3–8 hour packages
                - generic [ref=e67]:
                  - img [ref=e68]
                  - text: Satisfaction guaranteed
              - button "Book Now" [ref=e71] [cursor=pointer]
          - generic [ref=e72]:
            - img "Kitchen Deep Clean" [ref=e74]
            - generic [ref=e76]:
              - heading "Kitchen Deep Clean" [level=3] [ref=e77]
              - paragraph [ref=e78]: Complete kitchen transformation with grease removal, cabinet wipe-down and full sanitisation.
              - generic [ref=e79]:
                - generic [ref=e80]:
                  - img [ref=e81]
                  - text: Degreaser treatment
                - generic [ref=e84]:
                  - img [ref=e85]
                  - text: All surfaces covered
                - generic [ref=e88]:
                  - img [ref=e89]
                  - text: Odour elimination
              - button "Book Now" [ref=e92] [cursor=pointer]
          - generic [ref=e93]:
            - img "Bathroom Deep Clean" [ref=e95]
            - generic [ref=e97]:
              - heading "Bathroom Deep Clean" [level=3] [ref=e98]
              - paragraph [ref=e99]: Complete bathroom sanitisation with tile scrubbing, limescale removal and mirror polishing.
              - generic [ref=e100]:
                - generic [ref=e101]:
                  - img [ref=e102]
                  - text: Anti-bacterial treatment
                - generic [ref=e105]:
                  - img [ref=e106]
                  - text: Grout cleaning
                - generic [ref=e109]:
                  - img [ref=e110]
                  - text: Streak-free mirrors
              - button "Book Now" [ref=e113] [cursor=pointer]
      - generic [ref=e114]:
        - generic [ref=e115]:
          - img "Regular Maid Service" [ref=e116]
          - generic [ref=e119]:
            - generic [ref=e120]: Maid Service
            - heading "Regular Maid Service" [level=2] [ref=e121]
        - generic [ref=e122]:
          - generic [ref=e123]:
            - img "Regular Maid Service" [ref=e125]
            - generic [ref=e127]:
              - heading "Regular Maid Service" [level=3] [ref=e128]
              - paragraph [ref=e129]: Flexible 4–8 hour cleaning sessions — weekly, bi-weekly or one-off bookings.
              - generic [ref=e130]:
                - generic [ref=e131]:
                  - img [ref=e132]
                  - text: Vetted & insured
                - generic [ref=e135]:
                  - img [ref=e136]
                  - text: Flexible scheduling
                - generic [ref=e139]:
                  - img [ref=e140]
                  - text: Cancel anytime
              - button "Book Now" [ref=e143] [cursor=pointer]
          - generic [ref=e144]:
            - img "Part-Time Maid" [ref=e146]
            - generic [ref=e148]:
              - heading "Part-Time Maid" [level=3] [ref=e149]
              - paragraph [ref=e150]: 4-hour or 8-hour daily cleaning and household help by vetted maids.
              - generic [ref=e151]:
                - generic [ref=e152]:
                  - img [ref=e153]
                  - text: Same cleaner every visit
                - generic [ref=e156]:
                  - img [ref=e157]
                  - text: Regular or one-time
                - generic [ref=e160]:
                  - img [ref=e161]
                  - text: All household chores
              - button "Book Now" [ref=e164] [cursor=pointer]
          - generic [ref=e165]:
            - img "Post-Event Cleanup" [ref=e167]
            - generic [ref=e169]:
              - heading "Post-Event Cleanup" [level=3] [ref=e170]
              - paragraph [ref=e171]: After your kenduri, birthday or gathering — restore your home fast.
              - generic [ref=e172]:
                - generic [ref=e173]:
                  - img [ref=e174]
                  - text: Same-day availability
                - generic [ref=e177]:
                  - img [ref=e178]
                  - text: Waste disposal included
                - generic [ref=e181]:
                  - img [ref=e182]
                  - text: 2–4 hour rapid clean
              - button "Book Now" [ref=e185] [cursor=pointer]
      - generic [ref=e186]:
        - generic [ref=e187]:
          - img "Specialised Cleaning" [ref=e188]
          - generic [ref=e191]:
            - generic [ref=e192]: Specialised
            - heading "Specialised Cleaning" [level=2] [ref=e193]
        - generic [ref=e194]:
          - generic [ref=e195]:
            - img "Post-Renovation Cleaning" [ref=e197]
            - generic [ref=e199]:
              - heading "Post-Renovation Cleaning" [level=3] [ref=e200]
              - paragraph [ref=e201]: Industrial-grade clean to remove cement dust, paint splatters and construction residue.
              - generic [ref=e202]:
                - generic [ref=e203]:
                  - img [ref=e204]
                  - text: Tile & glass polishing
                - generic [ref=e207]:
                  - img [ref=e208]
                  - text: Dust extraction equipment
                - generic [ref=e211]:
                  - img [ref=e212]
                  - text: Same-day available
              - button "Book Now" [ref=e215] [cursor=pointer]
          - generic [ref=e216]:
            - img "Sofa & Carpet Cleaning" [ref=e218]
            - generic [ref=e220]:
              - heading "Sofa & Carpet Cleaning" [level=3] [ref=e221]
              - paragraph [ref=e222]: Deep extraction cleaning for fabric sofas, mattresses, carpets and rugs.
              - generic [ref=e223]:
                - generic [ref=e224]:
                  - img [ref=e225]
                  - text: Steam extraction
                - generic [ref=e228]:
                  - img [ref=e229]
                  - text: Stain & odour removal
                - generic [ref=e232]:
                  - img [ref=e233]
                  - text: Quick dry technology
              - button "Book Now" [ref=e236] [cursor=pointer]
          - generic [ref=e237]:
            - img "Mattress & Upholstery" [ref=e239]
            - generic [ref=e241]:
              - heading "Mattress & Upholstery" [level=3] [ref=e242]
              - paragraph [ref=e243]: Steam and UV cleaning for mattresses and upholstered furniture to eliminate dust mites.
              - generic [ref=e244]:
                - generic [ref=e245]:
                  - img [ref=e246]
                  - text: UV sanitisation
                - generic [ref=e249]:
                  - img [ref=e250]
                  - text: Dust mite elimination
                - generic [ref=e253]:
                  - img [ref=e254]
                  - text: Allergen-friendly
              - button "Book Now" [ref=e257] [cursor=pointer]
      - generic [ref=e258]:
        - generic [ref=e259]:
          - img "Laundry & Ironing" [ref=e260]
          - generic [ref=e263]:
            - generic [ref=e264]: Laundry
            - heading "Laundry & Ironing" [level=2] [ref=e265]
        - generic [ref=e266]:
          - generic [ref=e267]:
            - img "Wash & Fold Service" [ref=e269]
            - generic [ref=e271]:
              - heading "Wash & Fold Service" [level=3] [ref=e272]
              - paragraph [ref=e273]: Professional washing, drying and folding for everyday clothes, bedsheets and towels.
              - generic [ref=e274]:
                - generic [ref=e275]:
                  - img [ref=e276]
                  - text: Free pickup & delivery
                - generic [ref=e279]:
                  - img [ref=e280]
                  - text: 48-hour turnaround
                - generic [ref=e283]:
                  - img [ref=e284]
                  - text: Eco-friendly detergent
              - button "Book Now" [ref=e287] [cursor=pointer]
          - generic [ref=e288]:
            - img "Ironing & Pressing" [ref=e290]
            - generic [ref=e292]:
              - heading "Ironing & Pressing" [level=3] [ref=e293]
              - paragraph [ref=e294]: Crisp, wrinkle-free ironing for office wear, traditional attire and delicate fabrics.
              - generic [ref=e295]:
                - generic [ref=e296]:
                  - img [ref=e297]
                  - text: Steam pressing available
                - generic [ref=e300]:
                  - img [ref=e301]
                  - text: Garment protection
                - generic [ref=e304]:
                  - img [ref=e305]
                  - text: Same-day service
              - button "Book Now" [ref=e308] [cursor=pointer]
          - generic [ref=e309]:
            - img "Laundry & Ironing" [ref=e311]
            - generic [ref=e313]:
              - heading "Laundry & Ironing" [level=3] [ref=e314]
              - paragraph [ref=e315]: Complete laundry solution with wash, dry, fold and iron. Free pickup and delivery.
              - generic [ref=e316]:
                - generic [ref=e317]:
                  - img [ref=e318]
                  - text: Free pickup & delivery
                - generic [ref=e321]:
                  - img [ref=e322]
                  - text: 48-hour turnaround
                - generic [ref=e325]:
                  - img [ref=e326]
                  - text: Steam ironing available
              - button "Book Now" [ref=e329] [cursor=pointer]
    - generic [ref=e330]:
      - img "Southeast Asian professional team" [ref=e332]
      - generic [ref=e334]:
        - generic [ref=e335]: Download Now
        - heading "Client or Vendor? Join the Marketplace." [level=2] [ref=e336]
        - paragraph [ref=e337]: Clients — download the app and book a vetted cleaning pro in minutes. Vendors — list your services, set your rates, and grow your business on iPROFIXER.
        - generic [ref=e338]:
          - link "New Customer? Sign Up Now" [ref=e339] [cursor=pointer]:
            - /url: /signup
            - img [ref=e340]
            - generic [ref=e342]:
              - generic [ref=e343]: New Customer?
              - generic [ref=e344]: Sign Up Now
          - link "Professional? Join as Pro" [ref=e345] [cursor=pointer]:
            - /url: /pro-signup
            - img [ref=e346]
            - generic [ref=e348]:
              - generic [ref=e349]: Professional?
              - generic [ref=e350]: Join as Pro
  - contentinfo [ref=e351]:
    - generic [ref=e354]:
      - generic [ref=e355]:
        - img [ref=e357]
        - generic [ref=e359]: Verified Pros
      - generic [ref=e360]:
        - img [ref=e362]
        - generic [ref=e365]: Quality Assured
      - generic [ref=e366]:
        - img [ref=e368]
        - generic [ref=e371]: On-Time Service
    - generic [ref=e372]:
      - generic [ref=e373]:
        - generic [ref=e374]:
          - link "iPROFIXER" [ref=e375] [cursor=pointer]:
            - /url: /
            - img "iPROFIXER" [ref=e376]
          - paragraph [ref=e377]: Malaysia's most trusted cleaning service platform. Connecting homeowners with verified cleaning professionals for all your home cleaning needs.
          - generic [ref=e378]:
            - link "+03-8080 5249" [ref=e379] [cursor=pointer]:
              - /url: tel:+60380805249
              - img [ref=e381]
              - generic [ref=e383]: +03-8080 5249
            - link "for_services@iprofixer.com.my" [ref=e384] [cursor=pointer]:
              - /url: mailto:for_services@iprofixer.com.my
              - img [ref=e386]
              - generic [ref=e389]: for_services@iprofixer.com.my
            - generic [ref=e390]:
              - img [ref=e392]
              - generic [ref=e395]: Ara Damansara, Petaling Jaya
        - generic [ref=e396]:
          - generic [ref=e397]:
            - heading "Services" [level=4] [ref=e398]
            - list [ref=e399]:
              - listitem [ref=e400]:
                - link "Home Deep Cleaning" [ref=e401] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e402]
                  - text: Home Deep Cleaning
              - listitem [ref=e404]:
                - link "Regular Maid Service" [ref=e405] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e406]
                  - text: Regular Maid Service
              - listitem [ref=e408]:
                - link "Post-Renovation Cleaning" [ref=e409] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e410]
                  - text: Post-Renovation Cleaning
              - listitem [ref=e412]:
                - link "Sofa & Carpet Cleaning" [ref=e413] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e414]
                  - text: Sofa & Carpet Cleaning
              - listitem [ref=e416]:
                - link "Post-Event Cleanup" [ref=e417] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e418]
                  - text: Post-Event Cleanup
              - listitem [ref=e420]:
                - link "Laundry & Ironing" [ref=e421] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e422]
                  - text: Laundry & Ironing
              - listitem [ref=e424]:
                - link "Part-Time Maid" [ref=e425] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e426]
                  - text: Part-Time Maid
          - generic [ref=e428]:
            - heading "Company" [level=4] [ref=e429]
            - list [ref=e430]:
              - listitem [ref=e431]:
                - link "About iPROFIXER" [ref=e432] [cursor=pointer]:
                  - /url: /about
                  - img [ref=e433]
                  - text: About iPROFIXER
              - listitem [ref=e435]:
                - link "How It Works" [ref=e436] [cursor=pointer]:
                  - /url: /how-it-works
                  - img [ref=e437]
                  - text: How It Works
              - listitem [ref=e439]:
                - link "Join as Professional" [ref=e440] [cursor=pointer]:
                  - /url: /for-professionals
                  - img [ref=e441]
                  - text: Join as Professional
              - listitem [ref=e443]:
                - link "Careers" [ref=e444] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e445]
                  - text: Careers
              - listitem [ref=e447]:
                - link "Blog & Tips" [ref=e448] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e449]
                  - text: Blog & Tips
          - generic [ref=e451]:
            - heading "Support" [level=4] [ref=e452]
            - list [ref=e453]:
              - listitem [ref=e454]:
                - link "Help Center / FAQ" [ref=e455] [cursor=pointer]:
                  - /url: /faq
                  - img [ref=e456]
                  - text: Help Center / FAQ
              - listitem [ref=e458]:
                - link "Safety Guidelines" [ref=e459] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e460]
                  - text: Safety Guidelines
              - listitem [ref=e462]:
                - link "Cancellation Policy" [ref=e463] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e464]
                  - text: Cancellation Policy
              - listitem [ref=e466]:
                - link "Refund Policy" [ref=e467] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e468]
                  - text: Refund Policy
              - listitem [ref=e470]:
                - link "Service Guarantee" [ref=e471] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e472]
                  - text: Service Guarantee
        - generic [ref=e474]:
          - heading "Stay Updated" [level=4] [ref=e475]
          - paragraph [ref=e476]: Get home maintenance tips and exclusive offers.
          - generic [ref=e477]:
            - generic [ref=e478]:
              - img [ref=e479]
              - textbox "Enter your email" [ref=e482]
            - button "Subscribe Now" [ref=e483] [cursor=pointer]
          - link "Chat on WhatsApp" [ref=e484] [cursor=pointer]:
            - /url: https://wa.me/60162104127
            - img [ref=e485]
            - text: Chat on WhatsApp
      - generic [ref=e488]:
        - generic [ref=e489]:
          - generic [ref=e490]: "Follow us:"
          - generic [ref=e491]:
            - link "Facebook" [ref=e492] [cursor=pointer]:
              - /url: https://facebook.com/iprofixer
              - img [ref=e493]
            - link "Instagram" [ref=e495] [cursor=pointer]:
              - /url: https://instagram.com/iprofixer
              - img [ref=e496]
            - link "LinkedIn" [ref=e499] [cursor=pointer]:
              - /url: https://linkedin.com/company/iprofixer
              - img [ref=e500]
            - link "Twitter" [ref=e504] [cursor=pointer]:
              - /url: https://twitter.com/iprofixer
              - img [ref=e505]
            - link "YouTube" [ref=e507] [cursor=pointer]:
              - /url: https://youtube.com/iprofixer
              - img [ref=e508]
        - generic [ref=e511]:
          - generic [ref=e512]: "We accept:"
          - generic [ref=e513]:
            - img [ref=e514]
            - img [ref=e516]
            - img [ref=e518]
            - generic [ref=e520]:
              - img [ref=e521]
              - generic [ref=e523]: Pay
      - generic [ref=e525]:
        - paragraph [ref=e526]: © 2026 iPROFIXER — IPROS EDUCTECH SDN BHD. All rights reserved.
        - generic [ref=e527]:
          - link "Privacy Policy" [ref=e528] [cursor=pointer]:
            - /url: /privacy
          - link "Terms of Service" [ref=e529] [cursor=pointer]:
            - /url: /terms
          - link "Cookies" [ref=e530] [cursor=pointer]:
            - /url: /cookie-policy
    - button "Back to top" [ref=e531] [cursor=pointer]:
      - img [ref=e532]
  - button "Open chat" [ref=e534] [cursor=pointer]:
    - img [ref=e535]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test('PUBLIC-01 - Homepage loads with correct title', async ({ page }) => {
  4   |   await page.goto('/');
  5   |   await page.waitForLoadState('networkidle');
  6   |   await expect(page).toHaveTitle(/iPROFIXER/i);
  7   |   const h1 = page.locator('h1').first();
  8   |   await expect(h1).toBeVisible();
  9   |   const body = await page.locator('body').innerText();
  10  |   expect(body.toLowerCase()).toContain('clean');
  11  |   console.log('✅ Homepage loaded correctly');
  12  | });
  13  | 
  14  | test('PUBLIC-02 - Homepage has navigation links', async ({ page }) => {
  15  |   await page.goto('/');
  16  |   await page.waitForLoadState('networkidle');
  17  |   const nav = page.locator('nav');
  18  |   await expect(nav).toBeVisible();
  19  |   const loginLink = page.locator('a:has-text("Login"), button:has-text("Login")');
  20  |   await expect(loginLink.first()).toBeVisible();
  21  |   console.log('✅ Navigation links visible');
  22  | });
  23  | 
  24  | test('PUBLIC-03 - Services page loads with 7 cleaning services', async ({ page }) => {
  25  |   await page.goto('/services');
  26  |   await page.waitForLoadState('networkidle');
  27  |   await page.waitForTimeout(3000);
  28  |   const body = await page.locator('body').innerText();
  29  |   expect(body.toLowerCase()).toContain('clean');
> 30  |   expect(body).toContain('RM');
      |                ^ Error: expect(received).toContain(expected) // indexOf
  31  |   console.log('✅ Services page loaded');
  32  | });
  33  | 
  34  | test('PUBLIC-04 - Services Book button redirects to signup when not logged in', async ({ page }) => {
  35  |   await page.goto('/services');
  36  |   await page.waitForLoadState('networkidle');
  37  |   await page.waitForTimeout(2000);
  38  |   const bookBtn = page.locator('button:has-text("Book"), a:has-text("Book")').first();
  39  |   if (await bookBtn.count() > 0) {
  40  |     await bookBtn.click();
  41  |     await page.waitForTimeout(2000);
  42  |     const url = page.url();
  43  |     expect(url).toMatch(/signup|login/);
  44  |     console.log('✅ Book button redirects to signup when not logged in');
  45  |   }
  46  | });
  47  | 
  48  | test('PUBLIC-05 - How It Works page loads', async ({ page }) => {
  49  |   await page.goto('/how-it-works');
  50  |   await page.waitForLoadState('networkidle');
  51  |   await expect(page.locator('body')).toBeVisible();
  52  |   const body = await page.locator('body').innerText();
  53  |   expect(body.length).toBeGreaterThan(100);
  54  |   console.log('✅ How It Works page loaded');
  55  | });
  56  | 
  57  | test('PUBLIC-06 - For Professionals page loads', async ({ page }) => {
  58  |   await page.goto('/for-professionals');
  59  |   await page.waitForLoadState('networkidle');
  60  |   await expect(page.locator('body')).toBeVisible();
  61  |   console.log('✅ For Professionals page loaded');
  62  | });
  63  | 
  64  | test('PUBLIC-07 - FAQ page loads', async ({ page }) => {
  65  |   await page.goto('/faq');
  66  |   await page.waitForLoadState('networkidle');
  67  |   await expect(page.locator('body')).toBeVisible();
  68  |   console.log('✅ FAQ page loaded');
  69  | });
  70  | 
  71  | test('PUBLIC-08 - Login page has all required fields', async ({ page }) => {
  72  |   await page.goto('/login');
  73  |   await page.waitForLoadState('networkidle');
  74  |   await expect(page.locator('input[type="email"]').first()).toBeVisible();
  75  |   await expect(page.locator('input[type="password"]').first()).toBeVisible();
  76  |   await expect(page.locator('button[type="submit"]').first()).toBeVisible();
  77  |   console.log('✅ Login page has all fields');
  78  | });
  79  | 
  80  | test('PUBLIC-09 - Signup page has all required fields', async ({ page }) => {
  81  |   await page.goto('/signup');
  82  |   await page.waitForLoadState('networkidle');
  83  |   await expect(page.locator('input[type="email"]').first()).toBeVisible();
  84  |   await expect(page.locator('input[type="password"]').first()).toBeVisible();
  85  |   await expect(page.locator('button[type="submit"]').first()).toBeVisible();
  86  |   console.log('✅ Signup page has all fields');
  87  | });
  88  | 
  89  | test('PUBLIC-10 - Pro signup page has professional fields', async ({ page }) => {
  90  |   await page.goto('/pro-signup');
  91  |   await page.waitForLoadState('networkidle');
  92  |   const body = await page.locator('body').innerText();
  93  |   expect(body.toLowerCase()).toMatch(/professional|service|category/);
  94  |   console.log('✅ Pro signup page has professional fields');
  95  | });
  96  | 
  97  | test('PUBLIC-11 - Privacy policy page loads', async ({ page }) => {
  98  |   await page.goto('/privacy');
  99  |   await page.waitForLoadState('networkidle');
  100 |   await expect(page.locator('body')).toBeVisible();
  101 |   console.log('✅ Privacy policy loaded');
  102 | });
  103 | 
  104 | test('PUBLIC-12 - Terms page loads', async ({ page }) => {
  105 |   await page.goto('/terms');
  106 |   await page.waitForLoadState('networkidle');
  107 |   await expect(page.locator('body')).toBeVisible();
  108 |   console.log('✅ Terms page loaded');
  109 | });
  110 | 
  111 | test('PUBLIC-13 - Direct navigation to dashboard redirects to login', async ({ page }) => {
  112 |   await page.goto('/dashboard');
  113 |   await page.waitForTimeout(3000);
  114 |   const url = page.url();
  115 |   expect(url).toMatch(/login|signup|\//);
  116 |   console.log('✅ Unauthenticated dashboard access redirects correctly');
  117 | });
  118 | 
  119 | test('PUBLIC-14 - Direct navigation to pro-dashboard redirects to login', async ({ page }) => {
  120 |   await page.goto('/pro-dashboard');
  121 |   await page.waitForTimeout(3000);
  122 |   const url = page.url();
  123 |   expect(url).toMatch(/login|signup|\//);
  124 |   console.log('✅ Unauthenticated pro-dashboard access redirects correctly');
  125 | });
  126 | 
```