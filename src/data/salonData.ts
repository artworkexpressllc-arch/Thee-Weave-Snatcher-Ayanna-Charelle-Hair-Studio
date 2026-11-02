import { ServiceItem, ServiceAddOn, PortfolioItem, Testimonial, BusinessPolicy } from '../types';

export const SALON_INFO = {
  stylistName: 'Ayanna Charelle',
  brandName: 'Thee Weave Snatcher',
  businessLegalName: 'Bundled Beauty by Ayanna Charelle',
  licenseStatus: 'Licensed Cosmetologist (State of Michigan)',
  yearsInBusiness: 'Professional stylist since 2009 · Licensed 2013',
  phone: '(616) 438-2940',
  email: 'theeweavesnatcher@gmail.com',
  streetAddress: '865 28th St SE (Mane Attraction Salon)',
  cityStateZip: 'Grand Rapids, MI 49508',
  sourceStyleSeatUrl: 'https://www.styleseat.com/m/v/theeweavesnatcher',
  instagramHandles: ['@theeweavesnatcher', '@OHSHEMAD'],
  depositAmount: 0,
  heroTagline: 'Flawless Extensions, Seamless Melts & Healthy Hair Mastery',
  heroSubtitle: 'Grand Rapids premier hair extensionist specializing in long-lasting sew-ins, high-precision quick weaves, and diamond-gloss silk presses with uncompromising healthy hair care.',
};

export const BUSINESS_HOURS = [
  { day: 'Tuesday', hours: '9:00 AM – 6:00 PM', isOpen: true },
  { day: 'Wednesday', hours: '9:00 AM – 6:00 PM', isOpen: true },
  { day: 'Thursday', hours: '9:00 AM – 6:00 PM', isOpen: true },
  { day: 'Friday', hours: '9:00 AM – 6:00 PM', isOpen: true },
  { day: 'Saturday', hours: '8:00 AM – 4:00 PM', isOpen: true },
  { day: 'Sunday', hours: 'Closed (VIP upon inquiry)', isOpen: false },
  { day: 'Monday', hours: 'Closed', isOpen: false },
];

export const SERVICES_CATALOG: ServiceItem[] = [
  // Sew-in Extensions
  {
    id: 'sewin-traditional',
    name: 'Traditional Sew-In (Leave Out)',
    category: 'sew-in',
    price: 165,
    durationMinutes: 180,
    popular: true,
    description: 'Flat, tension-free foundation braid down, protective scalp oiling, net application, and precision installation of 2 to 3 bundles with your natural hair left out for styling versatility. Includes blending trim and signature thermal curl or flat iron.',
    requirements: [
      'Hair must be cleanly shampooed, thoroughly blown out, and detangled unless adding Wash & Blowout service.',
      'Provide 2–3 bundles of clean, dry extensions free of cut tracks and excess thread.',
    ],
    image: '/src/assets/images/portfolio_sewin_extensions_1793587466591.jpg'
  },
  {
    id: 'sewin-closure',
    name: 'HD Lace Closure Sew-In',
    category: 'sew-in',
    price: 185,
    durationMinutes: 210,
    popular: true,
    description: 'Complete protective style with zero natural hair left out. Custom bleaching of knots, plucked hairline, scalp tone matching, protective mesh net, and secure sewing of 4x4, 5x5, or 6x6 closure with up to 3 bundles. Finished with custom styling.',
    requirements: [
      'HD lace or transparent lace closure recommended for optimum melt.',
      'Drop off lace 24–48 hours in advance if requesting extensive custom blonde bleaching.',
    ],
    image: '/src/assets/images/portfolio_closure_install_1793587468450.jpg'
  },
  {
    id: 'sewin-frontal',
    name: 'Lace Frontal Sew-In (13x4 / 13x6)',
    category: 'sew-in',
    price: 220,
    durationMinutes: 240,
    description: 'Ear-to-ear natural lace hairline customization with bleached knots, customized hairline thinning, skin-tone tinting, skin-safe adhesive application, and up to 3 bundles installed. Complete with styling.',
    requirements: [
      'Frontal must be new or previously installed by Ayanna Charelle.',
      'Lace must not be heavily scarred or stained from previous adhesives.',
    ],
    image: '/src/assets/images/portfolio_closure_install_1793587468450.jpg'
  },
  {
    id: 'sewin-versatile',
    name: 'Versatile 2-Way / Flip-Over Sew-In',
    category: 'sew-in',
    price: 190,
    durationMinutes: 210,
    description: 'Engineered braid pattern that allows parting down the middle, side part, or pulled up into a high ponytail/bun with perimeter leave-out. Ideal for active lifestyles and maximum versatility.',
    requirements: [
      'Natural perimeter must be at least 4–5 inches for adequate coverage.',
      '3 bundles recommended for full density.',
    ],
    image: '/src/assets/images/portfolio_sewin_extensions_1793587466591.jpg'
  },

  // Quick Weaves
  {
    id: 'quickweave-sleek',
    name: 'Signature Sleek Quick Weave',
    category: 'quick-weave',
    price: 110,
    durationMinutes: 120,
    popular: true,
    description: 'Protective morning glory cap method ensuring zero glue touches your natural hair. Hair is braided or molded flat, protected with dual caps and protective barrier shield, followed by precision bonded track placement and silky flat iron or curls.',
    requirements: [
      'Bring 2–3 bundles or packs of human hair.',
      'Natural hair must be clean and oil-free prior to appointment.',
    ],
    image: '/src/assets/images/portfolio_quickweave_bob_1793587467762.jpg'
  },
  {
    id: 'quickweave-bob',
    name: 'Precision Bob Cut Quick Weave',
    category: 'quick-weave',
    price: 125,
    durationMinutes: 150,
    popular: true,
    description: 'Ayanna Charelle’s renowned razor-sharp bob. Protective cap base, precision track bonding, customized shear shaping, razor beveling, and feathering for an effortless, neck-grazing blunt or asymmetrical finish.',
    requirements: [
      'Recommended hair: 10” and 12” human hair or high-grade virgin bundles for clean blunt lines.',
    ],
    image: '/src/assets/images/portfolio_quickweave_bob_1793587467762.jpg'
  },
  {
    id: 'quickweave-27piece',
    name: '27-Piece Pixie / Short Cut Quick Weave',
    category: 'quick-weave',
    price: 135,
    durationMinutes: 150,
    description: 'Sculpted short cut styling using short weave tracks. Expert molded foundation, layered tapering, razor texturizing, and custom molding for a sleek, fierce, low-maintenance cut.',
    requirements: [
      'Requires short track hair (e.g. 27-piece pack or 8” hair) plus closure piece or human molding hair.',
    ],
  },

  // Silk Press & Natural Hair Care
  {
    id: 'silk-press-signature',
    name: 'Diamond Gloss Silk Press',
    category: 'silk-press',
    price: 80,
    durationMinutes: 90,
    popular: true,
    description: 'Deep clarifying shampoo, moisture balancing conditioner, tension blow-dry with thermal protectant, and titanium flat iron smoothing with body, bounce, and zero chemical damage. Long-lasting movement that reverts with water.',
    requirements: [
      'Natural hair is handled with extreme heat care. Recommended trim every 8–10 weeks for optimal health.',
    ],
    image: '/src/assets/images/portfolio_silk_press_1793587466771.jpg'
  },
  {
    id: 'silk-press-steam',
    name: 'Steam Hydration Silk Press & Treatment',
    category: 'silk-press',
    price: 105,
    durationMinutes: 120,
    popular: true,
    description: 'The ultimate healthy hair experience. Includes ultrasonic micro-mist steam bath with deep penetrating protein/moisture hair masque, scalp exfoliation, precision split-end dusting, and ultra-silky press.',
    requirements: [
      'Perfect for dry, brittle, heat-compromised hair or post-protective styles.',
    ],
    image: '/src/assets/images/portfolio_silk_press_1793587466771.jpg'
  },
  {
    id: 'natural-detox-trim',
    name: 'Scalp Detox, Hair Mask & Precision Cut',
    category: 'silk-press',
    price: 95,
    durationMinutes: 90,
    description: 'Clarifying clay or apple cider detox for product buildup, intensive hydration conditioning under dryer, scalp massage, and comprehensive health haircut/shaping (up to 2 inches) with round brush blowout or press.',
  },

  // Maintenance & Restoration
  {
    id: 'maint-wash-tighten',
    name: 'Weave Maintenance: Wash, Tighten & Re-Style',
    category: 'maintenance',
    price: 95,
    durationMinutes: 120,
    description: 'Thorough cleansing of your scalp and installed bundles, complete under-hood dryer drying to prevent mildew, needle tightening of any loose tracks, edge oiling, and fresh flat-iron or curl finish.',
    requirements: [
      'Recommended between week 3 and 5 of your sew-in install.',
    ],
  },
  {
    id: 'maint-removal',
    name: 'Safe Weave Removal, Wash & Blowout',
    category: 'maintenance',
    price: 65,
    durationMinutes: 75,
    description: 'Careful cutting of weave threads without clipping natural hair, shed hair detangling, clarifying wash, deep conditioning, and thorough blowout.',
  },

  // Cuts & Color
  {
    id: 'cut-precision-bob',
    name: 'Stand-Alone Precision Bob or Layered Cut',
    category: 'cut-color',
    price: 50,
    durationMinutes: 45,
    description: 'Customized haircut on your natural hair or previously installed unit. Features razor graduation, face-framing layers, or blunt perimeter shaping.',
  },
  {
    id: 'color-bundle-custom',
    name: 'Custom Bundle Coloring (Per Bundle)',
    category: 'cut-color',
    price: 35,
    durationMinutes: 60,
    description: 'Professional bleaching, lifting, toning, or custom fashion coloring of 1 virgin hair bundle. (For 3 bundles, select quantity 3). Bundles must be dropped off 48 hours prior to appointment.',
    requirements: [
      'Virgin 100% human hair only. Must be dropped off 48–72 hours prior to install.',
    ],
  },

  // Eyebrows & Finishing
  {
    id: 'brows-razor-arch',
    name: 'Signature Razor Eyebrow Arch',
    category: 'brows',
    price: 15,
    durationMinutes: 15,
    description: 'Clean, defined eyebrow shaping using a sanitized precision razor, trimming long hairs, and filling in with brow powder for an elegant sculpted look.',
  },
  {
    id: 'brows-wax-shape',
    name: 'Eyebrow Waxing & Precision Sculpting',
    category: 'brows',
    price: 20,
    durationMinutes: 20,
    description: 'Gentle warm wax hair removal along the brow line, precision plucking, and soothing aloe finish.',
  },
];

export const SERVICE_ADDONS: ServiceAddOn[] = [
  {
    id: 'addon-steam',
    name: 'Steam Hydration Therapy Treatment',
    price: 25,
    durationMinutes: 20,
    description: 'Infuses deep moisture into the hair cuticle, increasing elasticity and reducing frizz.',
  },
  {
    id: 'addon-trim',
    name: 'Split-End Precision Dusting / Trim',
    price: 25,
    durationMinutes: 15,
    description: 'Removes dead, split ends to preserve healthy length without losing overall hair length.',
  },
  {
    id: 'addon-bundlewash',
    name: 'Used Bundle Deep Cleansing & Co-Wash (Per Bundle)',
    price: 15,
    durationMinutes: 20,
    description: 'Disinfects, cleanses buildup, and restores luster to previously worn hair bundles.',
  },
  {
    id: 'addon-scalp-oil',
    name: 'Stimulating Scalp Peppermint & Tea Tree Oil Massage',
    price: 15,
    durationMinutes: 15,
    description: 'Invigorates follicles, relieves tension, and prevents dry itchy scalp under installs.',
  },
  {
    id: 'addon-eyebrow',
    name: 'Eyebrow Razor Arch Add-On',
    price: 15,
    durationMinutes: 15,
    description: 'Crisp eyebrow shaping to complete your full salon transformation.',
  },
];

export const PORTFOLIO_GALLERY: PortfolioItem[] = [
  {
    id: 'look-1',
    title: 'Middle-Part Body Wave Sew-In',
    category: 'sew-in',
    image: '/src/assets/images/portfolio_sewin_extensions_1793587466591.jpg',
    description: 'Flawless traditional leave-out sew-in featuring 3 bundles of 26” Brazilian body wave hair, flat braid foundation, and loose barrel waves.',
    duration: '3 hours',
    price: 165,
    serviceId: 'sewin-traditional',
  },
  {
    id: 'look-2',
    title: 'Diamond Shine Silk Press & Curtain Bangs',
    category: 'silk-press',
    image: '/src/assets/images/portfolio_silk_press_1793587466771.jpg',
    description: 'Healthy natural hair pressed with thermal steam treatment, soft face-framing curtain bangs, and weightless bounce with zero chemical processing.',
    duration: '1 hr 30 min',
    price: 80,
    serviceId: 'silk-press-signature',
  },
  {
    id: 'look-3',
    title: 'Razor-Sharp Asymmetrical Bob Quick Weave',
    category: 'quick-weave',
    image: '/src/assets/images/portfolio_quickweave_bob_1793587467762.jpg',
    description: 'Sleek angled bob cut installed via the protective cap method. Razor beveled edges, deep side part, and mirror glass shine.',
    duration: '2 hours',
    price: 125,
    serviceId: 'quickweave-bob',
  },
  {
    id: 'look-4',
    title: 'HD Lace Closure Melt with Honey Highlights',
    category: 'sew-in',
    image: '/src/assets/images/portfolio_closure_install_1793587468450.jpg',
    description: '5x5 HD lace closure sew-in install with custom toned chocolate and caramel blonde highlights. Scalp melt effect with invisible lace edges.',
    duration: '3 hrs 30 min',
    price: 185,
    serviceId: 'sewin-closure',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    clientName: 'Brittany M.',
    serviceRendered: 'Traditional Sew-In & Custom Cut',
    rating: 5,
    date: '3 weeks ago',
    city: 'Grand Rapids, MI',
    reviewText: 'Ayanna is the only person I trust with my sew-ins! Her braid down is completely flat with ZERO tension on my edges. My weave stayed laid for 8 weeks and my natural hair grew an inch. The best in West Michigan hands down.',
  },
  {
    id: 'rev-2',
    clientName: 'Keisha R.',
    serviceRendered: 'Steam Hydration Silk Press',
    rating: 5,
    date: '1 month ago',
    city: 'Wyoming, MI',
    reviewText: 'I have thick 4C hair that usually puffs right back up, but Ayanna’s steam press had my hair like pure silk for three whole weeks without heat damage. When I washed it, my curls bounced right back! Book her, you will not regret it.',
  },
  {
    id: 'rev-3',
    clientName: 'Danielle W.',
    serviceRendered: 'Precision Bob Quick Weave',
    rating: 5,
    date: '2 months ago',
    city: 'Muskegon, MI',
    reviewText: 'That bob cut is lethal! She took her time with the razor and shears and got my angle so sharp. People stop me everywhere I go asking where I got my hair done. Her salon suite is peaceful, clean, and she starts right on time.',
  },
  {
    id: 'rev-4',
    clientName: 'Aaliyah T.',
    serviceRendered: 'HD Lace Closure Sew-In',
    rating: 5,
    date: '3 months ago',
    city: 'Grand Rapids, MI',
    reviewText: 'Where is the lace?! It literally looks like the hair is growing directly out of my scalp. Ayanna is so knowledgeable about hair health and always treats her clients with royalty. 10/10 experience every visit.',
  },
];

export const BUSINESS_POLICIES: BusinessPolicy[] = [
  {
    title: 'No Upfront Payment Required',
    summary: 'Simple, direct booking with zero upfront deposit.',
    rules: [
      'No credit card or deposit is required to submit an appointment request.',
      'Your appointment details are delivered instantly by email to both you and Ayanna Charelle.',
      'Full service payment is paid directly at the salon at the conclusion of your appointment via Cash, Zelle, Card, or Apple Pay.',
    ],
  },
  {
    title: 'Cancellation & Rescheduling Courtesy',
    summary: 'Advance notice ensures respect for both the stylist and waiting clients.',
    rules: [
      'Please provide at least 24 hours advance notice if you need to reschedule or cancel your appointment.',
      'You can reschedule or cancel directly online through your email confirmation link or the Lookup tool.',
      'No-shows without communication limit future online booking access.',
    ],
  },
  {
    title: 'Late Arrival & Grace Period',
    summary: 'Punctuality ensures every client receives unhurried, detailed attention.',
    rules: [
      'There is a 15-minute grace period.',
      'At 15 minutes past your scheduled appointment time, please send a quick text.',
      'At 20 minutes late, the appointment may need to be rescheduled to avoid delaying subsequent clients.',
    ],
  },
  {
    title: 'Hair Preparation Guidelines',
    summary: 'Proper hair prep guarantees flawless results and maximum style longevity.',
    rules: [
      'Hair must be cleanly washed, completely detangled, and blown out straight from roots to ends with minimal heavy oils or grease.',
      'Bundles must be completely clean, dry, thread-free, and organized by length.',
    ],
  },
  {
    title: 'Salon Suite Etiquette & Guests',
    summary: 'Mane Attraction Salon provides an intimate, relaxing, and focused beauty environment.',
    rules: [
      'Due to salon suite space constraints and client relaxation, no extra guests or unattended children are permitted unless actively receiving service.',
      'Please silence phones or use earbuds for personal video/audio calls during your service.',
    ],
  },
];

export const EXTRACTION_AUDIT_REPORT = {
  extractedAt: '2026-11-01',
  sourceUrl: 'http://styleseat.com/theeweavesnatcher',
  profileHandle: 'theeweavesnatcher',
  stylistName: 'Ayanna Charelle',
  businessBrand: 'Thee Weave Snatcher (Bundled Beauty by Ayanna Charelle)',
  location: 'Mane Attraction Salon, 865 28th St SE, Grand Rapids, MI 49508',
  verifiedSpecialties: [
    'Traditional Leave-Out Sew-In',
    'HD Lace Closure Sew-In',
    'Lace Frontal Installation',
    'Quick Weaves (Protective Cap Bob & Sleek Long)',
    'Diamond Gloss Silk Press',
    'Steam Hydration Treatment',
    'Precision Cuts & Razor Bobs',
    'Eyebrow Arching & Waxing',
  ],
  pricingStructure: {
    sewIns: '$165 – $240',
    quickWeaves: '$110 – $135',
    silkPress: '$80 – $105',
    maintenance: '$45 – $95',
    haircuts: '$45 – $50',
    deposit: 'No upfront deposit required ($0)',
  },
  credentials: [
    'Licensed Cosmetologist (Michigan State Board)',
    '15+ Years Extension Expertise (Started professional styling in 2009, Licensed 2013)',
    'Mane Attraction Salon resident suite specialist',
  ],
  independentMigrationBenefits: [
    'Eliminates StyleSeat 2.75% - 5.25% client booking fees and platform surcharges',
    'No upfront customer credit card entry required for booking',
    'Automated email notification directly dispatched to stylist & customer',
    'Custom high-end salon branding tailored to luxury hair extensions rather than a generic marketplace',
    'Local Grand Rapids SEO optimization (Schema.org HairSalon structured data & Google Map grounding)',
  ],
  ownerActionChecklist: [
    { item: 'Stylist Notification Email', status: 'Configured for theeweavesnatcher@gmail.com' },
    { item: 'Customer Confirmation Email', status: 'Automated direct dispatch on submission' },
    { item: 'Point custom domain (e.g. theeweavesnatcher.com)', status: 'Configured with canonical SEO routes and sitemap' },
  ],
};
