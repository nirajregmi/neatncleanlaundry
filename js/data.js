/* ============ SITE DATA (edit content, rates and photos here) ============ */

const WA = '9779851066612'; // WhatsApp number (+977 9851066612)

const CATS = {
  'Traditional & Heavy Ethnic': { icon: '🥻', items: ['Sari', 'Suit', 'Lenga', 'Kurtha Surwal', 'Woolens'] },
  'Home & Heavy Bulk':          { icon: '🛏️', items: ['Blanket', 'Carpet', 'Curtains / Parda', 'Car / Bike Seat Cover'] },
  'Everyday & Outdoor Gear':    { icon: '👕', items: ['Shirt', 'Pants', 'Down-Jacket', 'Sleeping Bag'] }
};

const HERO_ITEMS = ['Shirt', 'Pants', 'Sari'];

const ADDONS = ['Dry Clean', 'Press / Iron', 'Starch', 'Dyeing (color)', 'Leather Spray', 'Sari Roll', 'Spotting / Stain Removal'];

const SPEC = [
  ['🧼', 'Dry Clean', 'Gentle solvent-based cleaning for suits, saris, woolens and delicate fabrics that need more care than a regular wash.'],
  ['🪡', 'Press / Iron', 'Crisp, wrinkle-free finish with steam ironing and roller pressing.'],
  ['🌾', 'Starch', 'Structured, festive-ready drape for cotton saris and kurtha surwal.'],
  ['🎨', 'Dyeing (color)', 'Revive faded fabrics or refresh colour on traditional garments.'],
  ['🧴', 'Leather Spray', 'Protective spray treatment that conditions and guards leather items.'],
  ['🌀', 'Sari Roll', 'Neatly rolled saris, ready to gift, store or wear.'],
  ['🔍', 'Spotting / Stain Removal', 'Targeted spot treatment before the wash — so stains are handled, not spread.']
];

const STEPS = [
  ['🏬', 'Showroom', 'Bring your garments to our showroom: each piece is checked and noted on arrival.'],
  ['🔍', 'Stain Treatment', 'Spotting and stain removal is done first, fabric by fabric.'],
  ['💨', 'Air Dry / Machine-Hydro Dry', 'Delicate and traditional pieces are air dried; sturdier loads go through machine / hydro drying.'],
  ['♨️', 'Steam Iron & Roller Press', 'Steam ironing and roller pressing for a sharp, even finish.'],
  ['🎁', 'Expert Packing', 'Folded, rolled and packed with care, ready for pickup or delivery.']
];

const B2B = [
  ['🛏️', 'Hostels', 'Regular bulk bedding and uniform laundry on a schedule that suits you.'],
  ['🏘️', 'Apartments', 'Resident-friendly service for blankets, curtains and everyday wear.'],
  ['🏠', 'Housing', 'Community-scale laundry management for housing complexes.'],
  ['🏦', 'Banks', 'Crisp, professional uniforms and linen for branch staff.'],
  ['💼', 'Corporate Companies', 'Reliable staff-uniform and office-linen handling.'],
  ['🛕', 'Ashrams', 'Respectful care for traditional garments, blankets and bulk linen.']
];

const FAQ = [
  ['How do you handle heavy bulk deliveries?', 'Bulk loads receive premium doorstep handling — we carry heavy loads up to the top floor of your building.'],
  ['Which garments are your specialty?', 'Sari, Suit, Woolens, Lenga, Kurtha Surwal and other traditional garments, plus home items like blankets, carpets and curtains.'],
  ['How are my clothes dried?', 'Delicate and traditional pieces are air dried; suitable items are machine / hydro dried. Then steam ironed or roller pressed.'],
  ['Do you offer dry cleaning?', 'Yes — we dry clean suits, saris, lenga, woolens, jackets and other delicate or heavy garments, then steam iron or press them and pack them with care.'],
  ['Do you work with businesses?', 'Yes — hostels, apartments, housing, banks, corporate companies and ashrams.']
];

const PROMISES = [
  ['🏬', 'Showroom experience'],
  ['🧴', 'Stain treated first'],
  ['♨️', 'Steam iron & roller press'],
  ['🎁', 'Expert packing']
];

// [target number, suffix, label] — facts from our own service list
const STATS = [
  [20, '+', 'Years of experience'],
  [STEPS.length, '', 'Step care process'],
  [SPEC.length, '', 'Specialty treatments'],
  [B2B.length, '', 'Sectors served']
];

// Photos — paste your own image URLs here. Empty = illustrated placeholder.
const PHOTOS = {
  ba: [
    { label: 'Stain removal', before: 'images/stain-before.jpg', after: 'images/stain-after.jpg' },
    { label: 'Dyeing',        before: 'images/stain-after.jpg',  after: 'images/dye-after.jpg' },
    { label: 'Press / Iron',  before: 'images/press-before.jpg', after: 'images/press-after.jpg' }
  ],
  gallery: [
    { src: '', icon: '🏬', cap: 'Our showroom' },
    { src: '', icon: '♨️', cap: 'Steam ironing & roller pressing' },
    { src: '', icon: '🎁', cap: 'Expert packing' }
  ]
};

// Dummy reviews — replace with real, permitted customer reviews
const REVIEWS = [
  { n: 'Sita Sharma', t: 'My silk Sari came back spotless and beautifully rolled. The stain I thought was permanent is gone!' },
  { n: 'Rajesh Shrestha', t: 'Sent all our hostel blankets and curtains in one bulk load. Delivered up to the top floor, no fuss.' },
  { n: 'Anita Gurung', t: 'Perfect pressing on my Lenga before the wedding. Everything was packed so carefully. Highly recommend.' }
];

/* ============ SEASONAL BANNER [English, Nepali] ============ */
const SEASONS = {
  festive: ['🪔 Dashain & Tihar season — book your Sari, Suit & Lenga care early!', '🪔 दशैं–तिहारको सिजन — सारी, सुट र लेहेंगाको हेरचाह अहिले नै बुक गर्नुहोस्!'],
  winter:  ['🧥 Winter care — woolens, blankets, down-jackets & sleeping bags.', '🧥 जाडोको हेरचाह — ऊनी, कम्बल, डाउन ज्याकेट र स्लिपिङ ब्याग।'],
  wedding: ['💍 Wedding season — Sari, Lenga & Kurtha Surwal, pressed and packed.', '💍 विवाहको सिजन — सारी, लेहेंगा र कुर्था सुरुवाल, प्रेस र प्याकिङसहित।'],
  monsoon: ['☔ Monsoon care — blankets, curtains & carpets, machine/hydro dried.', '☔ वर्षाको हेरचाह — कम्बल, पर्दा र कार्पेट, मेसिन/हाइड्रो ड्राइ।']
};

/* ============ NEPALI TRANSLATIONS (keyed by data-i attribute) ============ */
const NE = {
  nav_services: 'सेवाहरू',
  nav_specialty: 'विशेषता',
  nav_process: 'प्रक्रिया',
  nav_bulk: 'बल्क / संस्थागत',
  nav_faq: 'प्रश्नोत्तर',
  nav_find: 'हामीलाई भेट्नुहोस्',
  nav_book: 'पिकअप बुक गर्नुहोस्',
  hero_h: 'पारम्परिक पहिरनलाई चाहिन्छ <span class="grad-text">कोमल र विशेषज्ञ</span> हेरचाह।',
  hero_p: 'सारी, सुट, लेहेंगा, कुर्था सुरुवाल र ऊनी कपडादेखि कम्बल, कार्पेट र पर्दासम्म — ड्राइक्लिन, प्रेस, स्टार्च, डाइङ, लेदर स्प्रे, सारी रोल र दाग हटाउने विशेषज्ञ सेवा।',
  cta_book: 'पिकअप बुक गर्नुहोस्',
  cta_browse: 'सामान हेर्नुहोस्',
  h_items: 'सामान र <span class="grad-text">कोट अनुरोध</span>',
  h_spec: 'हाम्रा <span class="grad-text">विशेष</span> सेवाहरू',
  h_ba: '<span class="grad-text">पहिले</span> र पछि',
  h_proc: 'प्रत्यक्ष <span class="grad-text">कार्यप्रवाह</span> ट्र्याकर',
  h_gal: 'हाम्रो <span class="grad-text">शोरूम</span> भित्र',
  h_rev: 'ग्राहकहरू के <span class="grad-text">भन्छन्</span>',
  h_bulk: 'बल्क र <span class="text-mint">संस्थागत</span> लुगा व्यवस्थापन',
  h_faq: 'जान्न <span class="grad-text">उपयोगी</span>',
  h_find: 'हामीलाई <span class="grad-text">भेट्नुहोस्</span>',
  h_pick: 'पिकअप बुक गर्नुहोस्'
};
