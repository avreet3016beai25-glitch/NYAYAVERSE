import { TruthReport } from '../types';

export interface PresetCase {
  id: string;
  title: string;
  category: string;
  sourceType: string;
  sampleImageDescription: string;
  rawText: string;
  report: TruthReport;
}

export const SCANNER_PRESETS: PresetCase[] = [
  {
    id: 'restaurant-mrp',
    title: 'Cafe / Restaurant Overcharging on Packaged Water',
    category: 'MRP Violation & Forced Service Charge',
    sourceType: 'Dining Receipt / Bill',
    sampleImageDescription: 'Invoice showing packaged water priced at ₹65 (Printed MRP ₹20) + 10% Mandatory Service Charge.',
    rawText: `THE ROYALE BISTRO & LOUNGE
Connaught Place, New Delhi - 110001
GSTIN: 07AAAAA0000A1Z5
Date: 02-Nov-2026 | Bill No: RB-94821

1x Mineral Water (Himalayan Spring 1L) .... Rs 65.00
1x Veg Club Sandwich ...................... Rs 280.00
1x Cold Coffee Frappe ..................... Rs 190.00
Subtotal: Rs 535.00
Mandatory Service Charge @ 10%: Rs 53.50
CGST @ 2.5%: Rs 14.71
SGST @ 2.5%: Rs 14.71
TOTAL PAYABLE: Rs 617.92`,
    report: {
      id: 'TR-MRP-2026-01',
      timestamp: new Date().toISOString(),
      sourceType: 'Restaurant Receipt',
      sourceTitle: 'The Royale Bistro & Lounge Bill #RB-94821',
      riskLevel: 'CRITICAL',
      riskScore: 88,
      summary: 'High probability of dual violations: Selling pre-packaged commodity above Maximum Retail Price (MRP) and levying mandatory service charge against CCPA guidelines.',
      detectedFlags: [
        {
          flag: 'Above-MRP Pricing on Packaged Commodity',
          severity: 'danger',
          description: 'Himalayan Spring Water charged at ₹65.00, whereas standard notified MRP is ₹20.00.',
          legalSection: 'Legal Metrology Act, 2009 (Section 36) & Packaged Commodities Rules 2011 (Rule 18(2))'
        },
        {
          flag: 'Forced Mandatory Service Charge',
          severity: 'danger',
          description: 'A 10% service charge (₹53.50) added by default without explicit voluntary consent.',
          legalSection: 'CCPA Guidelines for Prevention of Unfair Trade Practices in Hotels & Restaurants (July 2022)'
        },
        {
          flag: 'GST Calculated on Disputed Service Charge',
          severity: 'warning',
          description: 'Goods and Services Tax is applied on top of an unauthorized mandatory charge.',
          legalSection: 'Consumer Protection Act, 2019 Section 2(47) (Unfair Trade Practice)'
        }
      ],
      extractedEvidence: [
        { label: 'Charged Item', value: 'Himalayan Spring 1L Mineral Water', status: 'violation' },
        { label: 'Charged Price', value: '₹65.00', status: 'violation' },
        { label: 'Printed MRP', value: '₹20.00 (Exceeded by +₹45.00 / 225%)', status: 'violation' },
        { label: 'Service Charge', value: '₹53.50 (10% Default)', status: 'violation' },
        { label: 'Restaurant GSTIN', value: '07AAAAA0000A1Z5 (Valid)', status: 'ok' },
      ],
      legalAnalysis: 'Under Rule 18(2) of the Legal Metrology (Packaged Commodities) Rules, 2011, no institution or individual can sell packaged commodities at a price higher than the MRP printed on the package. Furthermore, CCPA guidelines issued on July 4, 2022 explicitly state hotels and restaurants shall not collect service charge by default or name it under any other fee.',
      consumerRightsViolated: [
        'Right to be Protected against Unfair Trade Practices (Sec 2(47) CPA 2019)',
        'Right to Choice & Informed Pricing'
      ],
      recommendedSteps: [
        'Politely request restaurant management to remove the Service Charge and charge water at printed MRP.',
        'If refused, pay under protest and get an invoice clearly itemizing the excess charges.',
        'File an instant complaint on National Consumer Helpline (NCH App or call 1915).',
        'Lodge an e-Daakhil claim for refund of excess ₹98.50 plus punitive compensation for harassment.'
      ]
    }
  },
  {
    id: 'fake-flash-sale',
    title: 'E-Commerce Fake 90% Flash Sale with Artificial Urgency',
    category: 'Dark Patterns & Deceptive Pricing',
    sourceType: 'Shopping Screenshot',
    sampleImageDescription: 'Product page advertising "90% OFF MEGA SALE - Only ₹999 (MRP ₹9,999)" with a 4-minute fake countdown timer.',
    rawText: `FLASHDEAL INDIA - MEGA DIWALI CARNIVAL
SonicPro Ultra Wireless ANC Headphones
PRICE: Rs 999  (Original MRP: Rs 9,999 - Save 90%)
HURRY! Deal expires in: 03:42 mins
Warning: 23 customers are checking out this item right now!
Stock remaining: Only 1 left in your pincode!
Customer Reviews: 5.0 / 5.0 (14,200 reviews)
"Amazing sound quality, delivered in 1 hour!" - Verified Buyer`,
    report: {
      id: 'TR-DRK-2026-02',
      timestamp: new Date().toISOString(),
      sourceType: 'E-Commerce Screenshot',
      sourceTitle: 'SonicPro Ultra Headphones Flash Deal',
      riskLevel: 'HIGH',
      riskScore: 79,
      summary: 'Multiple dark patterns detected: Artificial Urgency, Inflated Baseline MRP to simulate non-existent 90% discount, and unverified repetitive bot reviews.',
      detectedFlags: [
        {
          flag: 'False Urgency (Dark Pattern)',
          severity: 'danger',
          description: 'A 3-minute countdown clock designed to induce panic buying; timer resets upon page reload.',
          legalSection: 'CCPA Guidelines for Prevention and Regulation of Dark Patterns, 2023 (Annexure 1 - False Urgency)'
        },
        {
          flag: 'Inflated MRP / Deceptive Discounting',
          severity: 'danger',
          description: 'Comparable market value for generic OEM headphones is ₹1,100; MRP ₹9,999 is fabricated to claim false 90% cut.',
          legalSection: 'Consumer Protection Act, 2019 Section 2(28) (Misleading Advertisement)'
        },
        {
          flag: 'Synthetic / Astro-turfed Reviews',
          severity: 'warning',
          description: '14,200 flawless 5-star ratings for an unbranded gadget with no verified seller address.',
          legalSection: 'BIS Standard IS 19000:2022 (Online Consumer Reviews Principles)'
        }
      ],
      extractedEvidence: [
        { label: 'Advertised MRP', value: '₹9,999 (Suspect artificial inflation)', status: 'suspicious' },
        { label: 'Sale Price', value: '₹999 (Apparent 90% discount)', status: 'suspicious' },
        { label: 'Urgency Mechanism', value: 'Looping 4-minute countdown timer', status: 'violation' },
        { label: 'Seller Details', value: 'Unregistered third-party seller', status: 'violation' },
        { label: 'Return Policy', value: 'No returns on flash sale items', status: 'violation' },
      ],
      legalAnalysis: 'Under the Central Consumer Protection Authority (CCPA) Dark Patterns Guidelines 2023, misleading users by falsely creating a sense of scarcity or urgency constitutes an illegal dark pattern. Additionally, claiming "No Returns" on online orders violates Consumer Protection (E-Commerce) Rules 2020.',
      consumerRightsViolated: [
        'Right to be Informed of Genuine Product Characteristics and True Baseline Pricing',
        'Right to Redressal (Denial of return violates E-Commerce Rules)'
      ],
      recommendedSteps: [
        'Do not submit OTP or credit card details on unverified flash sale portals.',
        'Perform a reverse image search on the product to identify actual market pricing.',
        'Check if seller provides a valid grievance officer name, email, and Indian registered address.',
        'Report the domain to National Cyber Crime Reporting Portal (cybercrime.gov.in) if non-delivery occurs.'
      ]
    }
  },
  {
    id: 'miracle-supplement',
    title: 'Ayurvedic "100% Diabetes Reversal" Supplement Label',
    category: 'Misleading Health Claims & Missing Mandatory FSSAI Info',
    sourceType: 'Product Label / Packaging',
    sampleImageDescription: 'Bottle label claiming "Guaranteed 100% Diabetes Cure in 14 Days - Approved by Doctors" without FSSAI logo or batch number.',
    rawText: `VEDIC MIRACLE HERBS
DIABO-CURE ULTRA CAPSULES (60 Caps)
"100% Guaranteed Cure for Type-1 and Type-2 Diabetes in 14 Days!"
Recommended by All Top Ayurvedic Doctors of India.
No Diet Restrictions Required. Stop Insulin Permanently!
Proprietary Herbal Blend: Karela, Jamun, Shilajit, Swarna Bhasma.
Mfg by: Miracle Health Labs, Rishikesh (UK)
Price: Rs 2,499.00`,
    report: {
      id: 'TR-MED-2026-03',
      timestamp: new Date().toISOString(),
      sourceType: 'Health Supplement Label',
      sourceTitle: 'Vedic Miracle Herbs Diabo-Cure Packaging',
      riskLevel: 'CRITICAL',
      riskScore: 94,
      summary: 'Severe public health and legal violation: Claiming to cure incurable chronic disorders (Diabetes) is strictly prohibited by law, along with missing mandatory regulatory disclosures.',
      detectedFlags: [
        {
          flag: 'Prohibited Disease Cure Claim',
          severity: 'danger',
          description: 'Claiming guaranteed cure for diabetes is illegal and endangers consumer lives.',
          legalSection: 'Drugs and Magic Remedies (Objectionable Advertisements) Act, 1954 (Schedule item 17)'
        },
        {
          flag: 'Missing FSSAI / AYUSH License Number',
          severity: 'danger',
          description: 'No 14-digit FSSAI registration number or valid AYUSH manufacturing license printed.',
          legalSection: 'Food Safety and Standards (Packaging and Labelling) Regulations, 2011'
        },
        {
          flag: 'Absence of Batch, Mfg & Expiry Dates',
          severity: 'danger',
          description: 'Commodity lacks mandatory traceability identifiers required for ingestible products.',
          legalSection: 'Legal Metrology (Packaged Commodities) Rules, 2011 (Rule 6)'
        }
      ],
      extractedEvidence: [
        { label: 'Therapeutic Claim', value: '100% Guaranteed Diabetes Cure in 14 Days', status: 'violation' },
        { label: 'Mandatory FSSAI Logo', value: 'ABSENT', status: 'violation' },
        { label: 'Batch & Expiry Date', value: 'ABSENT', status: 'violation' },
        { label: 'AYUSH License No.', value: 'Not displayed', status: 'violation' },
        { label: 'Advisory Warning', value: 'Instructs stopping prescribed insulin (Fatal risk)', status: 'violation' },
      ],
      legalAnalysis: 'Under the Drugs and Magic Remedies (Objectionable Advertisements) Act 1954, no person shall participate in any publication of advertisement referring to drugs for the diagnosis, cure, mitigation, treatment or prevention of diabetes. Doing so attracts criminal prosecution with imprisonment up to 6 months to 1 year.',
      consumerRightsViolated: [
        'Right to Safety (Protection against hazardous and deceptive health remedies)',
        'Right to Information regarding genuine ingredients and legitimate certifications'
      ],
      recommendedSteps: [
        'Immediately cease consumption and do NOT alter prescribed medical treatments or insulin.',
        'File an urgent report with the Central Consumer Protection Authority (CCPA) at cp-daakhil@nic.in.',
        'Lodge a grievance on the FSSAI Food Safety Grievance portal (FoSCoS).',
        'Preserve the physical bottle, receipt, and shipping box as primary forensic evidence.'
      ]
    }
  },
  {
    id: 'drip-pricing-travel',
    title: 'Airline / Travel Portal Drip Pricing & Pre-Ticked Insurance',
    category: 'Hidden Fees & Basket Sneaking',
    sourceType: 'Checkout Screenshot',
    sampleImageDescription: 'Flight booking page where base fare jumped from ₹3,200 to ₹5,480 via unselected convenience fees, carbon offset, and pre-ticked travel insurance.',
    rawText: `SKYWAYS BOOKING ENGINE - ORDER SUMMARY
Flight: DEL -> BLR (Economy Saver)
Base Airfare: Rs 3,200.00
Passenger Service Fee: Rs 450.00
Fuel Charge: Rs 380.00
Pre-selected Convenience Fee: Rs 499.00
Pre-ticked Travel Protection Shield: Rs 399.00
Carbon Neutral Contribution (Opt-out hidden): Rs 150.00
Seat Selection Fee: Rs 400.00
TOTAL FINAL AMOUNT: Rs 5,478.00`,
    report: {
      id: 'TR-DRP-2026-04',
      timestamp: new Date().toISOString(),
      sourceType: 'Travel Booking Invoice',
      sourceTitle: 'Skyways Booking DEL-BLR Summary',
      riskLevel: 'HIGH',
      riskScore: 76,
      summary: 'Drip Pricing and Basket Sneaking detected. The final payable price increased by 71% over the initial advertised airfare through unbundled default add-ons.',
      detectedFlags: [
        {
          flag: 'Basket Sneaking (Pre-ticked Insurance & Green Fee)',
          severity: 'danger',
          description: 'Travel insurance (₹399) and carbon fee (₹150) pre-selected without prior affirmative opt-in by the consumer.',
          legalSection: 'CCPA Dark Pattern Guidelines, 2023 (Section 5 - Basket Sneaking)'
        },
        {
          flag: 'Drip Pricing (Hidden Mandatory Convenience Fee)',
          severity: 'danger',
          description: '₹499 convenience fee undisclosed during flight search, surfaced only on final payment gateway.',
          legalSection: 'CCPA Dark Pattern Guidelines, 2023 (Section 5 - Drip Pricing)'
        }
      ],
      extractedEvidence: [
        { label: 'Advertised Search Fare', value: '₹3,200.00', status: 'ok' },
        { label: 'Convenience Fee', value: '₹499.00 (Mandatory drip fee)', status: 'violation' },
        { label: 'Pre-selected Insurance', value: '₹399.00 (Opt-out dark pattern)', status: 'violation' },
        { label: 'Hidden Carbon Addon', value: '₹150.00 (Sneaked into cart)', status: 'violation' },
        { label: 'Final Inflation Rate', value: '+71.2% over search price', status: 'violation' },
      ],
      legalAnalysis: 'CCPA Dark Pattern Guidelines (2023) categorically proscribe "Basket Sneaking"—the inclusion of additional items, products, services or payments at checkout without the express consent of the user. Also, Drip Pricing where elements of prices are not revealed upfront is an unfair trade practice.',
      consumerRightsViolated: [
        'Right to Choice (Forced inclusion of non-mandatory ancillaries)',
        'Right to Transparent Pricing'
      ],
      recommendedSteps: [
        'Uncheck the pre-selected Travel Protection Shield and Carbon Contribution prior to payment.',
        'Choose zero-convenience fee payment methods (e.g. UPI / NetBanking) if offered by the platform.',
        'Take full-page screenshots of the initial advertised fare versus the checkout page.',
        'File an institutional complaint on INGRAM portal citing CCPA Dark Pattern Guidelines 2023.'
      ]
    }
  },
  {
    id: 'warranty-void-trap',
    title: 'Electronics "Warranty Void if Seal Broken" Rejection Email',
    category: 'Unfair Contract Terms & Warranty Denial',
    sourceType: 'Customer Support Email',
    sampleImageDescription: 'Brand email refusing repair of a 4-month-old laptop claiming "opening the external RAM panel voided all warranty protection".',
    rawText: `From: support@techgadgets-india.com
To: ananya.sharma@email.com
Subject: RE: RMA-48190 Laptop Display Flickering Issue

Dear Customer,
We have examined your laptop at our authorized service centre. Our technicians noticed that the screw sticker on the RAM expansion door was broken.
Per Section 14.2 of our Warranty Terms: "Any breaking of chassis stickers or customer inspection voids the manufacturer warranty entirely."
Hence, your warranty claim is REJECTED.
Estimated repair cost for motherboard replacement: Rs 18,400 + 18% GST.
Please authorize payment within 48 hours to proceed.`,
    report: {
      id: 'TR-WRN-2026-05',
      timestamp: new Date().toISOString(),
      sourceType: 'Customer Support Email',
      sourceTitle: 'TechGadgets RMA Rejection Notice #RMA-48190',
      riskLevel: 'HIGH',
      riskScore: 82,
      summary: 'Unfair Contract Term detected. Blanket "Warranty Void if Seal Broken" clauses for user-upgradable parts (RAM/SSD) have been held unenforceable when unrelated to the actual defect (Display flickering).',
      detectedFlags: [
        {
          flag: 'Unfair Contract Term (Section 2(46) CPA 2019)',
          severity: 'danger',
          description: 'Imposing unreasonable conditions that cause significant change in consumer rights.',
          legalSection: 'Consumer Protection Act, 2019 Section 2(46) (Unfair Contract)'
        },
        {
          flag: 'Deficiency of Service (Section 2(11) CPA 2019)',
          severity: 'danger',
          description: 'Refusal to repair a manufacturing display defect during the 1-year warranty period.',
          legalSection: 'Consumer Protection Act, 2019 Section 2(11)'
        }
      ],
      extractedEvidence: [
        { label: 'Product Age', value: '4 Months (Within 1-Year Warranty)', status: 'ok' },
        { label: 'Defect Reported', value: 'Display Flickering', status: 'ok' },
        { label: 'Denial Reason', value: 'External RAM expansion sticker broken', status: 'violation' },
        { label: 'Causation Link', value: 'No evidence RAM access caused display fault', status: 'violation' },
        { label: 'Demanded Payment', value: '₹21,712 (Unjustified)', status: 'violation' },
      ],
      legalAnalysis: 'Under Section 2(46) of the Consumer Protection Act 2019, terms in a contract between a consumer and manufacturer that impose excessive conditions or exclude service obligations are deemed unfair contracts. The manufacturer must prove that the customer action directly caused the display fault.',
      consumerRightsViolated: [
        'Right to Redressal against Deficient Goods and Services',
        'Right to Fair Warranty Terms'
      ],
      recommendedSteps: [
        'Send a formal reply stating the RAM slot is a user-accessible feature and not the cause of display flickering.',
        'Quote Section 2(46) & Section 2(11) of the Consumer Protection Act, 2019.',
        'Use our Justice in 60s tool to generate a formal pre-litigation legal notice to the manufacturer.',
        'Escalate to the District Consumer Disputes Redressal Commission (DCDRC) via e-Daakhil if unremedied in 15 days.'
      ]
    }
  },
  {
    id: 'edtech-refund-trap',
    title: 'EdTech "100% Placement or Full Refund" Deceptive Agreement',
    category: 'Misleading Commercial Commitments & Dark Contract Clauses',
    sourceType: 'Enrollment Agreement Clause',
    sampleImageDescription: 'Online boot-camp agreement promising full refund upon no job, but burying 48 impossible conditions in 8pt footnote.',
    rawText: `FUTURECODERS BOOTCAMP ADMISSION COMMITMENT
"100% Job Guarantee in Top Tech Firms or 100% Fees Refund!"
Course Fee: Rs 1,20,000.00
Clause 88.4 (Sub-clause vii): Refund Guarantee Eligibility:
- Student must maintain 99.8% live attendance with zero network disconnections.
- Student must apply to minimum 350 job openings per month.
- Student must accept any unpaid internship offered anywhere in India within 4 hours of notification.
- Failure to comply with any single item automatically forfeits all refund rights.`,
    report: {
      id: 'TR-EDT-2026-06',
      timestamp: new Date().toISOString(),
      sourceType: 'Training Agreement',
      sourceTitle: 'FutureCoders Job Guarantee Contract',
      riskLevel: 'CRITICAL',
      riskScore: 92,
      summary: 'Deceptive advertising paired with unconscionable contract terms. Advertising unconditional placement while burying impossible qualifying hurdles is an unfair trade practice.',
      detectedFlags: [
        {
          flag: 'Misleading Advertisement Guarantee',
          severity: 'danger',
          description: 'Promoting 100% refund guarantee while conditions make refund mathematically impossible.',
          legalSection: 'Consumer Protection Act, 2019 Section 2(28) & CCPA EdTech Advisory 2022'
        },
        {
          flag: 'Unconscionable Contract Conditions',
          severity: 'danger',
          description: 'Requiring 99.8% attendance and forcing acceptance of unpaid positions under threat of fee forfeiture.',
          legalSection: 'Indian Contract Act 1872 (Section 23) & CPA 2019 Section 2(46)'
        }
      ],
      extractedEvidence: [
        { label: 'Upfront Marketing Claim', value: '100% Job Guarantee or 100% Refund', status: 'violation' },
        { label: 'Burying Clause', value: 'Clause 88.4 (Sub-clause vii)', status: 'violation' },
        { label: 'Attendance Hurdle', value: '99.8% without single technical dropout', status: 'violation' },
        { label: 'Forced Unpaid Work', value: 'Mandates accepting unpaid internships', status: 'violation' },
        { label: 'Total Paid Fees', value: '₹1,20,000.00', status: 'violation' },
      ],
      legalAnalysis: 'CCPA issued a comprehensive advisory on EdTech platforms in 2022 cautioning companies against misleading claims regarding 100% job placement, guaranteed packages, and impossible refund restrictions. The Supreme Court and NCDRC have repeatedly ruled that misleading students with illusory job promises violates Section 2(47).',
      consumerRightsViolated: [
        'Right to Education without Deceptive Enticement',
        'Right to Redressal and Full Refund of Educational Fees'
      ],
      recommendedSteps: [
        'Preserve all promotional webinars, WhatsApp chats with sales counsellors, and brochure PDFs.',
        'File a formal grievance on the Ministry of Consumer Affairs INGRAM portal.',
        'Report the misleading advertisement directly to ASCI (Advertising Standards Council of India).',
        'Lodge a consumer case in DCDRC for recovery of ₹1,20,000 with interest and compensation for mental agony.'
      ]
    }
  }
];
