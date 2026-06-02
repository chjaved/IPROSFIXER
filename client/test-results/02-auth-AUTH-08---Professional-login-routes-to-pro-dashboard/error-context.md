# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 02-auth.spec.js >> AUTH-08 - Professional login routes to pro dashboard
- Location: tests\02-auth.spec.js:78:1

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "pro-dashboard"
Received string:    "https://iprosfixer.vercel.app/dashboard"
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
          - generic [ref=e25]: Hi, Siti
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
  2   | import { customerSignup, customerLogin, proSignup, proLogin } from './helpers.js';
  3   | 
  4   | const t = Date.now();
  5   | const custEmail = `auth_cust_${t}@test.com`;
  6   | const proEmail = `auth_pro_${t}@test.com`;
  7   | const password = 'Test1234!';
  8   | 
  9   | test('AUTH-01 - Customer signup with valid data succeeds', async ({ page }) => {
  10  |   await customerSignup(page, custEmail, password);
  11  |   expect(page.url()).toContain('dashboard');
  12  |   const body = await page.locator('body').innerText();
  13  |   expect(body.toLowerCase()).not.toContain('error');
  14  |   console.log('✅ Customer signup succeeded');
  15  | });
  16  | 
  17  | test('AUTH-02 - Customer login with correct credentials works', async ({ page }) => {
  18  |   await customerLogin(page, custEmail, password);
  19  |   expect(page.url()).toContain('dashboard');
  20  |   console.log('✅ Customer login succeeded');
  21  | });
  22  | 
  23  | test('AUTH-03 - Customer login routes to customer dashboard not pro dashboard', async ({ page }) => {
  24  |   await customerLogin(page, custEmail, password);
  25  |   expect(page.url()).toMatch(/\/dashboard/);
  26  |   expect(page.url()).not.toContain('pro-dashboard');
  27  |   console.log('✅ Customer routed to correct dashboard');
  28  | });
  29  | 
  30  | test('AUTH-04 - Wrong password shows error', async ({ page }) => {
  31  |   await page.goto('/login');
  32  |   await page.waitForLoadState('networkidle');
  33  |   await page.locator('input[type="email"]').first().fill(custEmail);
  34  |   await page.locator('input[type="password"]').first().fill('wrongpassword');
  35  |   await page.locator('button[type="submit"]').first().click();
  36  |   await page.waitForTimeout(4000);
  37  |   const body = await page.locator('body').innerText();
  38  |   const hasError = body.toLowerCase().match(/invalid|incorrect|wrong|error|failed/);
  39  |   expect(hasError).toBeTruthy();
  40  |   console.log('✅ Wrong password shows error');
  41  | });
  42  | 
  43  | test('AUTH-05 - Empty form shows validation error', async ({ page }) => {
  44  |   await page.goto('/login');
  45  |   await page.waitForLoadState('networkidle');
  46  |   await page.locator('button[type="submit"]').first().click();
  47  |   await page.waitForTimeout(2000);
  48  |   expect(page.url()).toContain('login');
  49  |   console.log('✅ Empty form validation works');
  50  | });
  51  | 
  52  | test('AUTH-06 - Duplicate email signup shows error', async ({ page }) => {
  53  |   await page.goto('/signup');
  54  |   await page.waitForLoadState('networkidle');
  55  |   await page.fill('input[name="name"]', 'Duplicate User');
  56  |   await page.locator('input[type="email"]').first().fill(custEmail);
  57  |   await page.fill('input[name="phone"]', '0123456789');
  58  |   await page.locator('input[type="password"]').first().fill(password);
  59  |   const confirm = page.locator('input[name="confirmPassword"], input[placeholder*="Confirm"]');
  60  |   if (await confirm.count() > 0) await confirm.fill(password);
  61  |   const checkbox = page.locator('input[type="checkbox"]');
  62  |   const count = await checkbox.count();
  63  |   for (let i = 0; i < count; i++) await checkbox.nth(i).check();
  64  |   await page.locator('button[type="submit"]').first().click();
  65  |   await page.waitForTimeout(5000);
  66  |   const body = await page.locator('body').innerText();
  67  |   const hasError = body.toLowerCase().match(/already|exists|duplicate|error|taken/);
  68  |   expect(hasError).toBeTruthy();
  69  |   console.log('✅ Duplicate email shows error');
  70  | });
  71  | 
  72  | test('AUTH-07 - Professional signup succeeds and routes to pro dashboard', async ({ page }) => {
  73  |   await proSignup(page, proEmail, password);
  74  |   expect(page.url()).toContain('dashboard');
  75  |   console.log('✅ Professional signup succeeded');
  76  | });
  77  | 
  78  | test('AUTH-08 - Professional login routes to pro dashboard', async ({ page }) => {
  79  |   await proLogin(page, proEmail, password);
> 80  |   expect(page.url()).toContain('pro-dashboard');
      |                      ^ Error: expect(received).toContain(expected) // indexOf
  81  |   console.log('✅ Professional routed to pro dashboard');
  82  | });
  83  | 
  84  | test('AUTH-09 - Customer cannot access pro dashboard', async ({ page }) => {
  85  |   await customerLogin(page, custEmail, password);
  86  |   await page.goto('/pro-dashboard');
  87  |   await page.waitForTimeout(3000);
  88  |   expect(page.url()).not.toContain('pro-dashboard');
  89  |   console.log('✅ Customer blocked from pro dashboard');
  90  | });
  91  | 
  92  | test('AUTH-10 - Professional cannot access customer dashboard', async ({ page }) => {
  93  |   await proLogin(page, proEmail, password);
  94  |   await page.goto('/dashboard');
  95  |   await page.waitForTimeout(3000);
  96  |   expect(page.url()).not.toContain('/dashboard/bookings');
  97  |   console.log('✅ Professional blocked from customer dashboard');
  98  | });
  99  | 
  100 | test('AUTH-11 - Logout clears session and redirects', async ({ page }) => {
  101 |   await customerLogin(page, custEmail, password);
  102 |   await page.waitForTimeout(2000);
  103 |   const logout = page.locator('button:has-text("Logout"), a:has-text("Logout"), button:has-text("Sign Out")');
  104 |   if (await logout.count() > 0) {
  105 |     await logout.first().click();
  106 |     await page.waitForTimeout(3000);
  107 |     expect(page.url()).not.toContain('dashboard');
  108 |     await page.goto('/dashboard');
  109 |     await page.waitForTimeout(2000);
  110 |     expect(page.url()).not.toContain('dashboard');
  111 |     console.log('✅ Logout clears session');
  112 |   }
  113 | });
  114 | 
  115 | test('AUTH-12 - Token persists after page refresh', async ({ page }) => {
  116 |   await customerLogin(page, custEmail, password);
  117 |   await page.reload();
  118 |   await page.waitForTimeout(3000);
  119 |   expect(page.url()).toContain('dashboard');
  120 |   console.log('✅ Token persists after refresh');
  121 | });
  122 | 
```