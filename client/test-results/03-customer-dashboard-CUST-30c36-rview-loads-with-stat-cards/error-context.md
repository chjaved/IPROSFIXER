# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 03-customer-dashboard.spec.js >> CUST-01 - Dashboard overview loads with stat cards
- Location: tests\03-customer-dashboard.spec.js:14:1

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "dashboard"
Received string:    "https://iprosfixer.vercel.app/"
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
  - main [ref=e30]:
    - region "iPROFIXER home services Malaysia hero" [ref=e31]:
      - generic [ref=e32]:
        - generic [ref=e33]:
          - generic [ref=e34]:
            - img [ref=e35]
            - text: Vetted Pros · KL, PJ & Selangor
          - heading "Malaysia's Most Trusted Cleaning Service Platform" [level=1] [ref=e38]
          - paragraph [ref=e39]: Book vetted cleaning professionals for your home — deep cleaning, regular maid service, post-reno cleanup and more. Serving KL, PJ and all Klang Valley.
          - generic [ref=e40]:
            - generic [ref=e41]: ✓ Background Checked
            - generic [ref=e42]: ✓ Insured on Every Job
            - generic [ref=e43]: ✓ Pay After the Job
          - generic [ref=e44]:
            - link "Book a Cleaner Now →" [ref=e45] [cursor=pointer]:
              - /url: https://wa.me/60162104127?text=Hi%2C%20I%20need%20help%20booking%20a%20cleaning%20service.
            - link "Chat on WhatsApp" [ref=e46] [cursor=pointer]:
              - /url: https://wa.me/60162104127?text=Hi%2C%20I%20need%20help%20booking%20a%20cleaning%20service.
              - img [ref=e47]
              - text: Chat on WhatsApp
          - generic [ref=e49]:
            - link "New Customer? Sign Up Now" [ref=e50] [cursor=pointer]:
              - /url: /signup
              - img [ref=e51]
              - generic [ref=e53]:
                - generic [ref=e54]: New Customer?
                - generic [ref=e55]: Sign Up Now
            - link "Browse Our Services" [ref=e56] [cursor=pointer]:
              - /url: /services
              - img [ref=e57]
              - generic [ref=e59]:
                - generic [ref=e60]: Browse
                - generic [ref=e61]: Our Services
          - generic [ref=e62]:
            - generic [ref=e63]:
              - img "Malaysian homeowner" [ref=e64]
              - img "Malaysian homeowner" [ref=e65]
              - img "Malaysian homeowner" [ref=e66]
              - img "Malaysian homeowner" [ref=e67]
              - img "Malaysian homeowner" [ref=e68]
            - paragraph [ref=e69]:
              - strong [ref=e70]: 9,000+ homeowners
              - text: trust us across Klang Valley
        - generic [ref=e72]:
          - img "Southeast Asian professional handyman at work in a Malaysian home" [ref=e73]
          - generic [ref=e75]:
            - img [ref=e77]
            - generic [ref=e79]:
              - generic [ref=e80]: Verified & Insured
              - generic [ref=e81]: 500+ Professionals
          - generic [ref=e82]:
            - generic [ref=e83]:
              - img [ref=e84]
              - img [ref=e86]
              - img [ref=e88]
              - img [ref=e90]
              - img [ref=e92]
            - generic [ref=e94]: 4.9 / 5.0
            - generic [ref=e95]: 9,641 reviews
          - generic [ref=e97]:
            - generic [ref=e98]:
              - img "Malaysian homeowner" [ref=e99]
              - img "Malaysian homeowner" [ref=e100]
              - img "Malaysian homeowner" [ref=e101]
            - generic [ref=e102]:
              - generic [ref=e103]: 9,000+ happy clients
              - generic [ref=e104]: Across Klang Valley
    - region "iPROFIXER statistics" [ref=e105]:
      - generic [ref=e107]:
        - generic [ref=e108]:
          - generic [ref=e109]: 0+
          - generic [ref=e110]: Cleaning jobs completed
        - generic [ref=e111]:
          - generic [ref=e112]: 0%
          - generic [ref=e113]: Customer satisfaction
        - generic [ref=e114]:
          - generic [ref=e115]: 0+
          - generic [ref=e116]: Vetted cleaning professionals
        - generic [ref=e117]:
          - generic [ref=e118]: "0"
          - generic [ref=e119]: Cities in Klang Valley
    - region "Home services available in Malaysia" [ref=e120]:
      - generic [ref=e121]:
        - generic [ref=e122]:
          - generic [ref=e123]: What We Cover
          - heading "Cleaning Services We Cover" [level=2] [ref=e124]
          - paragraph [ref=e125]: One platform for all your cleaning needs — from daily maintenance to deep cleaning.
        - generic [ref=e126]:
          - generic [ref=e127]:
            - generic [ref=e128]:
              - img "Professional deep cleaning service in Kuala Lumpur" [ref=e129]
              - img [ref=e132]
            - generic [ref=e135]:
              - heading "Home Deep Cleaning" [level=3] [ref=e136]
              - paragraph [ref=e137]: Top-to-bottom deep clean covering kitchen, bathrooms, bedrooms and living areas. Eco-friendly products.
              - link "Book Now →" [ref=e138] [cursor=pointer]:
                - /url: https://wa.me/60162104127
          - generic [ref=e139]:
            - generic [ref=e140]:
              - img "Trusted regular maid service in Selangor" [ref=e141]
              - img [ref=e144]
            - generic [ref=e149]:
              - heading "Regular Maid Service" [level=3] [ref=e150]
              - paragraph [ref=e151]: Flexible 4–8 hour cleaning sessions — weekly, bi-weekly or one-off bookings. Vetted & insured.
              - link "Book Now →" [ref=e152] [cursor=pointer]:
                - /url: https://wa.me/60162104127
          - generic [ref=e153]:
            - generic [ref=e154]:
              - img "Post-renovation cleaning service in Malaysia" [ref=e155]
              - img [ref=e158]
            - generic [ref=e160]:
              - heading "Post-Renovation Cleaning" [level=3] [ref=e161]
              - paragraph [ref=e162]: Industrial-grade clean to remove cement dust, paint splatters and construction residue.
              - link "Book Now →" [ref=e163] [cursor=pointer]:
                - /url: https://wa.me/60162104127
          - generic [ref=e164]:
            - generic [ref=e165]:
              - img "Sofa and carpet cleaning service" [ref=e166]
              - img [ref=e169]
            - generic [ref=e171]:
              - heading "Sofa & Carpet Cleaning" [level=3] [ref=e172]
              - paragraph [ref=e173]: Deep extraction cleaning for fabric sofas, mattresses, carpets and rugs — stain removal included.
              - link "Book Now →" [ref=e174] [cursor=pointer]:
                - /url: https://wa.me/60162104127
          - generic [ref=e175]:
            - generic [ref=e176]:
              - img "Post-event cleanup service in Malaysia" [ref=e177]
              - img [ref=e180]
            - generic [ref=e182]:
              - heading "Post-Event Cleanup" [level=3] [ref=e183]
              - paragraph [ref=e184]: After your kenduri, birthday or gathering — restore your home fast. Waste disposal included.
              - link "Book Now →" [ref=e185] [cursor=pointer]:
                - /url: https://wa.me/60162104127
          - generic [ref=e186]:
            - generic [ref=e187]:
              - img "Professional laundry and ironing service" [ref=e188]
              - img [ref=e191]
            - generic [ref=e194]:
              - heading "Laundry & Ironing" [level=3] [ref=e195]
              - paragraph [ref=e196]: Wash, dry and fold — free pickup and same-day delivery to your door. 48-hour turnaround.
              - link "Book Now →" [ref=e197] [cursor=pointer]:
                - /url: https://wa.me/60162104127
          - generic [ref=e198]:
            - generic [ref=e199]:
              - img "Part-time maid service in Klang Valley" [ref=e200]
              - img [ref=e203]
            - generic [ref=e205]:
              - heading "Part-Time Maid" [level=3] [ref=e206]
              - paragraph [ref=e207]: 4-hour or 8-hour daily cleaning and household help by vetted maids. Regular or one-time.
              - link "Book Now →" [ref=e208] [cursor=pointer]:
                - /url: https://wa.me/60162104127
        - link "Book via WhatsApp" [ref=e210] [cursor=pointer]:
          - /url: https://wa.me/60162104127
          - img [ref=e211]
          - text: Book via WhatsApp
    - region "How iPROFIXER booking works" [ref=e213]:
      - generic [ref=e214]:
        - generic [ref=e215]:
          - generic [ref=e216]: Simple Process
          - heading "Booking Takes Less Than 2 Minutes" [level=2] [ref=e217]
          - paragraph [ref=e218]: We've made it as simple as possible. Here's how it works.
        - generic [ref=e219]:
          - generic [ref=e220]:
            - generic [ref=e221]:
              - img "Malaysian person using smartphone to book cleaning service" [ref=e222]
              - generic [ref=e224]: "1"
            - generic [ref=e225]:
              - heading "Tell us what you need" [level=3] [ref=e226]
              - paragraph [ref=e227]: Pick your service and area. Takes 30 seconds.
            - generic [ref=e228]: →
          - generic [ref=e229]:
            - generic [ref=e230]:
              - img "Malaysian cleaning professional profile photo" [ref=e231]
              - generic [ref=e233]: "2"
            - generic [ref=e234]:
              - heading "We match you with a pro" [level=3] [ref=e235]
              - paragraph [ref=e236]: You'll get a WhatsApp message with your matched professional within 15 minutes.
            - generic [ref=e237]: →
          - generic [ref=e238]:
            - generic [ref=e239]:
              - img "Southeast Asian cleaner working in Malaysian home" [ref=e240]
              - generic [ref=e242]: "3"
            - generic [ref=e243]:
              - heading "They show up and do the job" [level=3] [ref=e244]
              - paragraph [ref=e245]: Vetted, insured, on time. You can track them live.
            - generic [ref=e246]: →
          - generic [ref=e247]:
            - generic [ref=e248]:
              - img "Mobile payment using e-wallet app in Malaysia" [ref=e249]
              - generic [ref=e251]: "4"
            - generic [ref=e252]:
              - heading "Pay after. Rate your pro" [level=3] [ref=e253]
              - paragraph [ref=e254]: Cash, DuitNow, TnG or GrabPay. Only pay when you're satisfied.
        - generic [ref=e256]:
          - img [ref=e257]
          - text: Not happy? We send a replacement for free.
    - region "iPROFIXER for homeowners and professionals" [ref=e260]:
      - generic [ref=e262]:
        - generic [ref=e263]:
          - generic [ref=e264]:
            - img "Happy homeowner relaxing in clean Malaysian home" [ref=e265]
            - generic [ref=e267]: FOR HOMEOWNERS
          - generic [ref=e268]:
            - heading "Find someone you can actually trust" [level=3] [ref=e269]
            - paragraph [ref=e270]: We check every professional before they join. Background check, IC verification, skills test and insurance.
            - list [ref=e271]:
              - listitem [ref=e272]:
                - img [ref=e273]
                - text: Fixed upfront pricing - no surprises
              - listitem [ref=e276]:
                - img [ref=e277]
                - text: Same-day bookings available
              - listitem [ref=e280]:
                - img [ref=e281]
                - text: Live tracking when your pro is on the way
              - listitem [ref=e284]:
                - img [ref=e285]
                - text: Free replacement if you're not satisfied
            - link "Book Your First Service →" [ref=e288] [cursor=pointer]:
              - /url: https://wa.me/60162104127
        - generic [ref=e289]:
          - generic [ref=e290]:
            - img "Confident Southeast Asian professional ready for work" [ref=e291]
            - generic [ref=e293]: FOR PROFESSIONALS
          - generic [ref=e294]:
            - heading "Earn more. Work on your own terms." [level=3] [ref=e295]
            - paragraph [ref=e296]: Join 500+ professionals already earning through iPROFIXER. Set your own hours, pick your own jobs and get paid straight after every booking.
            - list [ref=e297]:
              - listitem [ref=e298]:
                - img [ref=e299]
                - text: Free to join - no monthly fee
              - listitem [ref=e302]:
                - img [ref=e303]
                - text: Set your own rates and availability
              - listitem [ref=e306]:
                - img [ref=e307]
                - text: Get client requests in your city
              - listitem [ref=e310]:
                - img [ref=e311]
                - text: Payments secured on every job
            - link "Join as a Professional →" [ref=e314] [cursor=pointer]:
              - /url: /for-professionals
    - region "Customer reviews for iPROFIXER home services" [ref=e315]:
      - generic [ref=e316]:
        - generic [ref=e317]:
          - generic [ref=e318]: Real Reviews
          - heading "What Our Customers Say" [level=2] [ref=e319]
          - generic [ref=e320]:
            - img "Google" [ref=e321]
            - generic [ref=e326]:
              - generic [ref=e327]:
                - img [ref=e328]
                - img [ref=e330]
                - img [ref=e332]
                - img [ref=e334]
                - img [ref=e336]
                - generic [ref=e338]: "4.9"
              - generic [ref=e339]: Based on 9,641 Google reviews
        - generic [ref=e340]:
          - generic [ref=e341]:
            - generic "5 star rating" [ref=e342]:
              - img [ref=e343]
              - img [ref=e345]
              - img [ref=e347]
              - img [ref=e349]
              - img [ref=e351]
            - paragraph [ref=e353]: "\"Booked a deep clean after moving into my new place. The team came on time, knew exactly what they were doing and the house smelled amazing after. Will definitely book again.\""
            - generic [ref=e354]:
              - img "Ahmad Hafizi from Petaling Jaya - iPROFIXER customer review" [ref=e355]
              - generic [ref=e356]:
                - paragraph [ref=e357]: Ahmad Hafizi
                - paragraph [ref=e358]: Petaling Jaya
          - generic [ref=e359]:
            - generic "5 star rating" [ref=e360]:
              - img [ref=e361]
              - img [ref=e363]
              - img [ref=e365]
              - img [ref=e367]
              - img [ref=e369]
            - paragraph [ref=e371]: "\"Post-reno cleaning after my renovation. The cement dust, paint splatters - all gone. I was honestly shocked at how good the result was.\""
            - generic [ref=e372]:
              - img "Raj Kumar from Cheras - iPROFIXER customer review" [ref=e373]
              - generic [ref=e374]:
                - paragraph [ref=e375]: Raj Kumar
                - paragraph [ref=e376]: Cheras
          - generic [ref=e377]:
            - generic "5 star rating" [ref=e378]:
              - img [ref=e379]
              - img [ref=e381]
              - img [ref=e383]
              - img [ref=e385]
              - img [ref=e387]
            - paragraph [ref=e389]: "\"My regular cleaner Kak Siti has been coming every week for 3 months now. Always the same person, knows how I like things. That consistency is priceless.\""
            - generic [ref=e390]:
              - img "Nurul Kasih from Ara Damansara - iPROFIXER customer review" [ref=e391]
              - generic [ref=e392]:
                - paragraph [ref=e393]: Nurul Kasih
                - paragraph [ref=e394]: Ara Damansara
          - generic [ref=e395]:
            - generic "5 star rating" [ref=e396]:
              - img [ref=e397]
              - img [ref=e399]
              - img [ref=e401]
              - img [ref=e403]
              - img [ref=e405]
            - paragraph [ref=e407]: "\"Sofa cleaning service was excellent. My 5-year-old sofa looks brand new again. The stains are completely gone and it smells fresh.\""
            - generic [ref=e408]:
              - img "James Lim from Bangsar South - iPROFIXER customer review" [ref=e409]
              - generic [ref=e410]:
                - paragraph [ref=e411]: James Lim
                - paragraph [ref=e412]: Bangsar South
          - generic [ref=e413]:
            - generic "5 star rating" [ref=e414]:
              - img [ref=e415]
              - img [ref=e417]
              - img [ref=e419]
              - img [ref=e421]
              - img [ref=e423]
            - paragraph [ref=e425]: "\"Booked post-event cleanup after my daughter's birthday party. 2 hours later the house looked like nothing happened. Complete lifesaver.\""
            - generic [ref=e426]:
              - img "Lily Heng from Subang Jaya - iPROFIXER customer review" [ref=e427]
              - generic [ref=e428]:
                - paragraph [ref=e429]: Lily Heng
                - paragraph [ref=e430]: Subang Jaya
          - generic [ref=e431]:
            - generic "5 star rating" [ref=e432]:
              - img [ref=e433]
              - img [ref=e435]
              - img [ref=e437]
              - img [ref=e439]
              - img [ref=e441]
            - paragraph [ref=e443]: "\"Mattress cleaning service was thorough. The UV sanitisation really worked - my allergies have improved so much. Highly recommend!\""
            - generic [ref=e444]:
              - img "Azman Mokhtar from Shah Alam - iPROFIXER customer review" [ref=e445]
              - generic [ref=e446]:
                - paragraph [ref=e447]: Azman Mokhtar
                - paragraph [ref=e448]: Shah Alam
    - region "Coverage areas in Klang Valley" [ref=e449]:
      - generic [ref=e450]:
        - generic [ref=e451]:
          - generic [ref=e452]: Coverage
          - heading "We Come to You - Across All of Klang Valley" [level=2] [ref=e453]
          - paragraph [ref=e454]: Currently active in 12 cities. Expanding soon.
        - generic [ref=e455]:
          - generic [ref=e456]: Kuala Lumpur
          - generic [ref=e457]: Petaling Jaya
          - generic [ref=e458]: Shah Alam
          - generic [ref=e459]: Subang Jaya
          - generic [ref=e460]: Cheras
          - generic [ref=e461]: Klang
          - generic [ref=e462]: Cyberjaya
          - generic [ref=e463]: Putrajaya
          - generic [ref=e464]: Ampang
          - generic [ref=e465]: Bangsar
          - generic [ref=e466]: Mont Kiara
          - generic [ref=e467]: Damansara
        - paragraph [ref=e468]:
          - text: Don't see your area?
          - link "WhatsApp us" [ref=e469] [cursor=pointer]:
            - /url: https://wa.me/60162104127
          - text: "- we may still be able to help."
    - region "Frequently asked questions about iPROFIXER" [ref=e470]:
      - generic [ref=e471]:
        - generic [ref=e472]:
          - generic [ref=e473]: FAQ
          - heading "Questions People Ask Before Booking" [level=2] [ref=e474]
        - generic [ref=e475]:
          - button "Is iPROFIXER a home services company or a marketplace?" [ref=e477] [cursor=pointer]:
            - generic [ref=e478]: Is iPROFIXER a home services company or a marketplace?
            - img [ref=e479]
          - button "How quickly can a cleaner come to my home?" [ref=e482] [cursor=pointer]:
            - generic [ref=e483]: How quickly can a cleaner come to my home?
            - img [ref=e484]
          - button "How much does it cost?" [ref=e487] [cursor=pointer]:
            - generic [ref=e488]: How much does it cost?
            - img [ref=e489]
          - button "Do I pay before or after the job?" [ref=e492] [cursor=pointer]:
            - generic [ref=e493]: Do I pay before or after the job?
            - img [ref=e494]
          - button "What if I'm not happy with the service?" [ref=e497] [cursor=pointer]:
            - generic [ref=e498]: What if I'm not happy with the service?
            - img [ref=e499]
          - button "I'm a cleaner. Can I join?" [ref=e502] [cursor=pointer]:
            - generic [ref=e503]: I'm a cleaner. Can I join?
            - img [ref=e504]
    - region "Book home services in Malaysia" [ref=e506]:
      - generic [ref=e507]:
        - heading "Ready to Book? Let's Sort It Out Today." [level=2] [ref=e508]
        - paragraph [ref=e509]: Over 9,000 homeowners have trusted us. Your turn.
        - generic [ref=e510]:
          - link "Book a Service →" [ref=e511] [cursor=pointer]:
            - /url: https://wa.me/60162104127?text=Hi%2C%20I%20need%20help%20booking%20a%20home%20service.
          - link "Chat on WhatsApp" [ref=e512] [cursor=pointer]:
            - /url: https://wa.me/60162104127?text=Hi%2C%20I%20need%20help%20booking%20a%20home%20service.
            - img [ref=e513]
            - text: Chat on WhatsApp
  - contentinfo [ref=e515]:
    - generic [ref=e518]:
      - generic [ref=e519]:
        - img [ref=e521]
        - generic [ref=e523]: Verified Pros
      - generic [ref=e524]:
        - img [ref=e526]
        - generic [ref=e529]: Quality Assured
      - generic [ref=e530]:
        - img [ref=e532]
        - generic [ref=e535]: On-Time Service
    - generic [ref=e536]:
      - generic [ref=e537]:
        - generic [ref=e538]:
          - link "iPROFIXER" [ref=e539] [cursor=pointer]:
            - /url: /
            - img "iPROFIXER" [ref=e540]
          - paragraph [ref=e541]: Malaysia's most trusted cleaning service platform. Connecting homeowners with verified cleaning professionals for all your home cleaning needs.
          - generic [ref=e542]:
            - link "+03-8080 5249" [ref=e543] [cursor=pointer]:
              - /url: tel:+60380805249
              - img [ref=e545]
              - generic [ref=e547]: +03-8080 5249
            - link "for_services@iprofixer.com.my" [ref=e548] [cursor=pointer]:
              - /url: mailto:for_services@iprofixer.com.my
              - img [ref=e550]
              - generic [ref=e553]: for_services@iprofixer.com.my
            - generic [ref=e554]:
              - img [ref=e556]
              - generic [ref=e559]: Ara Damansara, Petaling Jaya
        - generic [ref=e560]:
          - generic [ref=e561]:
            - heading "Services" [level=4] [ref=e562]
            - list [ref=e563]:
              - listitem [ref=e564]:
                - link "Home Deep Cleaning" [ref=e565] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e566]
                  - text: Home Deep Cleaning
              - listitem [ref=e568]:
                - link "Regular Maid Service" [ref=e569] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e570]
                  - text: Regular Maid Service
              - listitem [ref=e572]:
                - link "Post-Renovation Cleaning" [ref=e573] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e574]
                  - text: Post-Renovation Cleaning
              - listitem [ref=e576]:
                - link "Sofa & Carpet Cleaning" [ref=e577] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e578]
                  - text: Sofa & Carpet Cleaning
              - listitem [ref=e580]:
                - link "Post-Event Cleanup" [ref=e581] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e582]
                  - text: Post-Event Cleanup
              - listitem [ref=e584]:
                - link "Laundry & Ironing" [ref=e585] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e586]
                  - text: Laundry & Ironing
              - listitem [ref=e588]:
                - link "Part-Time Maid" [ref=e589] [cursor=pointer]:
                  - /url: /services
                  - img [ref=e590]
                  - text: Part-Time Maid
          - generic [ref=e592]:
            - heading "Company" [level=4] [ref=e593]
            - list [ref=e594]:
              - listitem [ref=e595]:
                - link "About iPROFIXER" [ref=e596] [cursor=pointer]:
                  - /url: /about
                  - img [ref=e597]
                  - text: About iPROFIXER
              - listitem [ref=e599]:
                - link "How It Works" [ref=e600] [cursor=pointer]:
                  - /url: /how-it-works
                  - img [ref=e601]
                  - text: How It Works
              - listitem [ref=e603]:
                - link "Join as Professional" [ref=e604] [cursor=pointer]:
                  - /url: /for-professionals
                  - img [ref=e605]
                  - text: Join as Professional
              - listitem [ref=e607]:
                - link "Careers" [ref=e608] [cursor=pointer]:
                  - /url: /
                  - img [ref=e609]
                  - text: Careers
              - listitem [ref=e611]:
                - link "Blog & Tips" [ref=e612] [cursor=pointer]:
                  - /url: /
                  - img [ref=e613]
                  - text: Blog & Tips
          - generic [ref=e615]:
            - heading "Support" [level=4] [ref=e616]
            - list [ref=e617]:
              - listitem [ref=e618]:
                - link "Help Center / FAQ" [ref=e619] [cursor=pointer]:
                  - /url: /faq
                  - img [ref=e620]
                  - text: Help Center / FAQ
              - listitem [ref=e622]:
                - link "Safety Guidelines" [ref=e623] [cursor=pointer]:
                  - /url: /
                  - img [ref=e624]
                  - text: Safety Guidelines
              - listitem [ref=e626]:
                - link "Cancellation Policy" [ref=e627] [cursor=pointer]:
                  - /url: /
                  - img [ref=e628]
                  - text: Cancellation Policy
              - listitem [ref=e630]:
                - link "Refund Policy" [ref=e631] [cursor=pointer]:
                  - /url: /
                  - img [ref=e632]
                  - text: Refund Policy
              - listitem [ref=e634]:
                - link "Service Guarantee" [ref=e635] [cursor=pointer]:
                  - /url: /
                  - img [ref=e636]
                  - text: Service Guarantee
        - generic [ref=e638]:
          - heading "Stay Updated" [level=4] [ref=e639]
          - paragraph [ref=e640]: Get home maintenance tips and exclusive offers.
          - generic [ref=e641]:
            - generic [ref=e642]:
              - img [ref=e643]
              - textbox "Enter your email" [ref=e646]
            - button "Subscribe Now" [ref=e647] [cursor=pointer]
          - link "Chat on WhatsApp" [ref=e648] [cursor=pointer]:
            - /url: https://wa.me/60162104127
            - img [ref=e649]
            - text: Chat on WhatsApp
      - generic [ref=e652]:
        - generic [ref=e653]:
          - generic [ref=e654]: "Follow us:"
          - generic [ref=e655]:
            - link "Facebook" [ref=e656] [cursor=pointer]:
              - /url: https://facebook.com/iprofixer
              - img [ref=e657]
            - link "Instagram" [ref=e659] [cursor=pointer]:
              - /url: https://instagram.com/iprofixer
              - img [ref=e660]
            - link "LinkedIn" [ref=e663] [cursor=pointer]:
              - /url: https://linkedin.com/company/iprofixer
              - img [ref=e664]
            - link "Twitter" [ref=e668] [cursor=pointer]:
              - /url: https://twitter.com/iprofixer
              - img [ref=e669]
            - link "YouTube" [ref=e671] [cursor=pointer]:
              - /url: https://youtube.com/iprofixer
              - img [ref=e672]
        - generic [ref=e675]:
          - generic [ref=e676]: "We accept:"
          - generic [ref=e677]:
            - img [ref=e678]
            - img [ref=e680]
            - img [ref=e682]
            - generic [ref=e684]:
              - img [ref=e685]
              - generic [ref=e687]: Pay
      - generic [ref=e689]:
        - paragraph [ref=e690]: © 2026 iPROFIXER — IPROS EDUCTECH SDN BHD. All rights reserved.
        - generic [ref=e691]:
          - link "Privacy Policy" [ref=e692] [cursor=pointer]:
            - /url: /privacy
          - link "Terms of Service" [ref=e693] [cursor=pointer]:
            - /url: /terms
          - link "Cookies" [ref=e694] [cursor=pointer]:
            - /url: /cookie-policy
    - button "Back to top" [ref=e695] [cursor=pointer]:
      - img [ref=e696]
  - button "Open chat" [ref=e698] [cursor=pointer]:
    - img [ref=e699]
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
> 18  |   expect(page.url()).toContain('dashboard');
      |                      ^ Error: expect(received).toContain(expected) // indexOf
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
  49  |   await expect(bookBtn.first()).toBeVisible({ timeout: 5000 });
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
```