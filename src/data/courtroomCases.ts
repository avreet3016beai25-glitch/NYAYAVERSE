import { CourtroomCase } from '../types';

export const COURTROOM_CASES: CourtroomCase[] = [
  {
    id: 'case-unboxing-phone',
    title: 'Case #2026/DCDRC/892: The Unboxing Disaster',
    category: 'E-Commerce & Defective Goods',
    disputedAmount: '₹74,999',
    complexity: 'Moderate',
    brief: 'A consumer ordered a brand new flagship smartphone during a festival sale. Upon delivery, the sealed box contained a refurbished, scratched device of an older model. The platform rejected the refund claiming "Customer signed delivery OTP which constitutes full acceptance."',
    consumerName: 'Arjun Verma (Complainant)',
    sellerName: 'MegaCart Logistics & QuickRetail India Ltd.',
    evidence: [
      {
        title: 'Exhibit A: Complete Continuous Unboxing Video',
        type: 'photo',
        description: 'Single uncut video showing delivery package opening, serial number check, and revealing old scratched device inside.',
        content: 'Timestamp 14:15 IST (Delivery at 14:10 IST). Shows intact tamper tape opened in front of camera.',
        highlight: 'Continuous uncut unboxing video establishes goods were defective at delivery point.'
      },
      {
        title: 'Exhibit B: Serial Number Mismatch Certificate',
        type: 'invoice',
        description: 'Official invoice serial IMEI #982144 vs physical phone IMEI #410291.',
        content: 'Invoice IMEI does not match IMEI displayed on the inner hardware settings screen.',
        highlight: 'Definite proof of wrong/tampered shipment dispatched.'
      },
      {
        title: 'Exhibit C: Seller Standard Rejection Email',
        type: 'email',
        description: 'MegaCart automated rejection stating OTP signature waives return inspection rights.',
        content: '"Since OTP was shared with delivery agent, package was verified intact. Return closed."',
        highlight: 'Seller attempting to use delivery OTP as waiver of product quality guarantees.'
      }
    ],
    consumerArgument: {
      statement: 'I paid ₹74,999 in advance for a brand new smartphone. The box was sealed, but the device inside was old and damaged. Signing an OTP only confirms physical handover of an opaque cardboard box, not inner hardware functionality. The seller is liable under Product Liability.',
      keyPoints: [
        'Uncut video proves goods were switched prior to unboxing.',
        'Consumer Protection (E-Commerce) Rules 2020 require platforms to honor returns of counterfeit or mismatched items.',
        'OTP at doorstep is merely proof of courier parcel delivery, not inner quality inspection.'
      ],
      demandedRelief: 'Full refund of ₹74,999 + ₹25,000 compensation for mental harassment and litigation costs.'
    },
    sellerArgument: {
      statement: 'Our warehouse has barcoded automated sorting with zero human tampering. The buyer shared the secure OTP with the delivery executive. As per our Terms of Use, OTP sharing constitutes conclusive proof of satisfactory physical inspection. The buyer or courier may have swapped the phone after handover.',
      keyPoints: [
        'Secure OTP mechanism was designed specifically to prevent delivery fraud.',
        'Platform is merely an intermediary marketplace protected under Section 79 of IT Act.',
        'Buyer waited 2 hours after delivery to report the issue.'
      ],
      defenseClause: 'MegaCart Marketplace Terms: "Delivery completed via OTP confirmation absolves platform from transit claims."'
    },
    verdictOptions: [
      {
        id: 'verdict-pro-consumer',
        title: 'Order Full Refund + ₹30,000 Punitive Damages Against Seller & Platform',
        description: 'Hold both platform and seller jointly liable for deficiency of service and unfair trade practice.',
        isCorrect: true,
        compensationAwarded: '₹74,999 Refund + ₹30,000 Damages'
      },
      {
        id: 'verdict-pro-seller',
        title: 'Dismiss Complaint: OTP Signature Waives Right to Inspect Inner Goods',
        description: 'Hold that the consumer took full responsibility by disclosing the delivery OTP.',
        isCorrect: false
      },
      {
        id: 'verdict-partial',
        title: 'Order Replacement Only with No Compensation for Harassment',
        description: 'Allow seller 30 days to send another device without any penalty.',
        isCorrect: false
      }
    ],
    actualJudicialVerdict: {
      winner: 'consumer',
      legalCitations: [
        'Consumer Protection Act, 2019: Section 2(47) (Unfair Trade Practice), Section 84-86 (Product Liability)',
        'Consumer Protection (E-Commerce) Rules, 2020: Rule 4(4) & Rule 6 (Duties of Sellers on Marketplace)',
        'NCDRC Landmark: Amazon Seller Services Pvt Ltd vs. Gopal Sharma (2021)'
      ],
      fullReasoning: 'The National Consumer Disputes Redressal Commission (NCDRC) has unequivocally clarified that a delivery OTP confirms receipt of a sealed parcel, NOT the veracity, genuineness, or working condition of the enclosed commodity. Under Section 86 of CPA 2019, an e-commerce marketplace cannot hide behind intermediary status if it handles logistics, payments, or fulfillment. The unboxing video and IMEI mismatch provide conclusive evidence of deficiency of service.',
      precedentCase: 'NCDRC Revision Petition No. 224/2021: Amazon vs. Gopal Sharma — "The delivery executive does not open the box before taking OTP. Expecting consumer to know inner contents before OTP is absurd."',
      actionableTakeaway: 'Always record a single continuous video while opening high-value e-commerce deliveries, showing shipping label, barcode, and box opening. If rejected, cite Rule 6 of E-Commerce Rules 2020 and NCDRC Precedent 224/2021.'
    }
  },
  {
    id: 'case-water-mrp',
    title: 'Case #2026/CC/412: The ₹70 Airport Cafe Water Bottle',
    category: 'Legal Metrology & Overcharging MRP',
    disputedAmount: '₹50 (Excess Charged)',
    complexity: 'Easy',
    brief: 'A consumer purchased a 1-litre sealed bottle of packaged drinking water at an airport lounge cafe. The bottle had a printed MRP of ₹20, but the cafe billed ₹70, claiming "We provide ambient seating, air conditioning, and luxury ambience which justifies premium pricing."',
    consumerName: 'Kavita Menon (Complainant)',
    sellerName: 'AeroBites Hospitality Pvt. Ltd. (Airport Terminal 3)',
    evidence: [
      {
        title: 'Exhibit A: Physical Water Bottle with Clear Batch MRP',
        type: 'photo',
        description: 'Sealed mineral water bottle showing printed MRP of ₹20.00 (inclusive of all taxes).',
        content: 'Manufacturer: Aquafresh Beverages. MRP: ₹20.00 stamped by manufacturer.',
        highlight: 'Manufacturer stamped MRP of ₹20 is clearly legible and unmodified.'
      },
      {
        title: 'Exhibit B: Itemized Tax Invoice #AB-1092',
        type: 'invoice',
        description: 'Invoice showing "1x Packaged Mineral Water: ₹70.00" with GST added.',
        content: 'Cafe billed single sealed packaged bottle for takeaway over the counter.',
        highlight: 'Item was sold as an over-the-counter sealed takeaway without table service.'
      }
    ],
    consumerArgument: {
      statement: 'I purchased a sealed bottle over the counter for takeaway. Under the Legal Metrology Act and Supreme Court precedents, charging a penny above the printed MRP on a pre-packaged commodity is a statutory offense. The cafe cannot cite air-conditioning to justify breaking the law on takeaway goods.',
      keyPoints: [
        'Packaged commodities cannot be sold above printed MRP anywhere in India.',
        'This was a takeaway purchase at counter, not dining or cooked food service.',
        'Section 36 of Legal Metrology Act imposes mandatory penalties on overcharging.'
      ],
      demandedRelief: 'Refund of excess ₹50 + ₹50,000 punitive damages deposited to Consumer Welfare Fund to deter systemic extortion of airport passengers.'
    },
    sellerArgument: {
      statement: 'We are a luxury dining lounge operating in a high-rent airport terminal. In Federation of Hotels & Restaurant Associations of India (FHRAI) vs Union of India, the Supreme Court held that hotels provide services alongside food and drinks, making MRP inapplicable.',
      keyPoints: [
        'Airport concession fees and operating rentals are extraordinarily high.',
        'Customers enjoy aesthetic decor, security, and climate control.',
        'The Supreme Court FHRAI 2017 ruling protects hospitality establishments.'
      ],
      defenseClause: 'FHRAI vs Union of India (2017) SC: "Serving of food and drinks in hotel is an indivisible contract of service."'
    },
    verdictOptions: [
      {
        id: 'verdict-pro-consumer',
        title: 'Rule in Favor of Consumer: Counter Takeaway Cannot Charge Above MRP',
        description: 'Hold that FHRAI applies only to seated restaurant service, not over-the-counter sales of pre-packaged bottles.',
        isCorrect: true,
        compensationAwarded: '₹50 Refund + ₹25,000 Penalty to Consumer Welfare Fund'
      },
      {
        id: 'verdict-pro-seller',
        title: 'Dismiss Complaint: Airport Outlets Have Free Pricing Power',
        description: 'Allow airport lounges to charge any price due to high commercial rentals.',
        isCorrect: false
      },
      {
        id: 'verdict-split',
        title: 'Order Refund of ₹50 Only with No Further Investigation',
        description: 'Treat it as a minor isolated billing typo.',
        isCorrect: false
      }
    ],
    actualJudicialVerdict: {
      winner: 'consumer',
      legalCitations: [
        'Legal Metrology Act, 2009: Section 36 (Penalty for selling, etc., of non-standard packages)',
        'Legal Metrology (Packaged Commodities) Rules, 2011: Rule 18(2)',
        'Supreme Court Clarification: FHRAI vs UOI (2017) strictly limited to seated composite restaurant service'
      ],
      fullReasoning: 'The Court and State Consumer Commissions have distinguished seated dining from over-the-counter takeaway sales. When a customer purchases a sealed packaged bottle over the counter without table service or cutlery, it is a pure sale of goods governed strictly by the Legal Metrology Act. Charging ₹70 on a ₹20 MRP bottle is a direct violation of Rule 18(2). Dual MRP or markup on takeaway packaged water is illegal.',
      precedentCase: 'NCDRC & Delhi State Commission in Big Cinemas / Airport Kiosks Rulings: "No cinema hall, multiplex, or airport kiosk can charge over MRP for packaged water sold across counters."',
      actionableTakeaway: 'If an airport counter or kiosk charges above MRP for sealed bottles or chips, verify if it was a takeaway sale. If yes, demand payment at MRP. If forced, keep the bill and bottle photo and lodge an INGRAM or Legal Metrology complaint.'
    }
  },
  {
    id: 'case-dark-subscription',
    title: 'Case #2026/SCDRC/114: The Ghost Gym App Subscription',
    category: 'Dark Patterns & Unauthorized Billing',
    disputedAmount: '₹14,995 (5 Months Auto-Debited)',
    complexity: 'Moderate',
    brief: 'A consumer enrolled in a "₹1 for 7 Days" fitness trial. The consumer explicitly cancelled via app settings on Day 4. Despite cancellation, the app billed ₹2,999 every month for 5 consecutive months without sending SMS notifications or OTP prompts.',
    consumerName: 'Rohan Deshmukh (Complainant)',
    sellerName: 'FitPulse Technologies Pte Ltd.',
    evidence: [
      {
        title: 'Exhibit A: In-App Cancellation Confirmation Screenshot',
        type: 'photo',
        description: 'Screenshot timestamped Day 4 stating "Your subscription will not renew."',
        content: 'Clear green banner: "Trial cancelled. You will not be charged on renewal date."',
        highlight: 'Irrefutable proof of timely cancellation within trial window.'
      },
      {
        title: 'Exhibit B: Bank Account Statement',
        type: 'invoice',
        description: '5 recurring auto-debits of ₹2,999.00 totaling ₹14,995.00 via international mandate.',
        content: 'Merchant name: FITPULSE-BILLING-ONLINE SG. No 2FA authentication invoked.',
        highlight: 'Continuous illegal recurring debits without e-mandate pre-debit notifications.'
      },
      {
        title: 'Exhibit C: Support Tickets & Obstruction Tactics',
        type: 'chat',
        description: 'Customer support chat making user navigate 8 confusing screens ("Confirm Shaming").',
        content: '"Are you sure? 98% of people who cancel gain 10kg! Click here to reconsider."',
        highlight: 'Classic confirm-shaming and obstruction dark patterns.'
      }
    ],
    consumerArgument: {
      statement: 'I cancelled my trial properly within 4 days. The company ignored my cancellation, exploited an international card token to bypass RBI two-factor authentication, and took ₹14,995 without my consent.',
      keyPoints: [
        'Proof of timely cancellation within 7-day trial period.',
        'Violation of RBI E-Mandate Circular requiring 24-hour pre-debit SMS alerts.',
        'Use of illegal Dark Patterns (Obstruction, Confirm Shaming, Subscription Trap).'
      ],
      demandedRelief: 'Full refund of ₹14,995 + 18% interest + ₹40,000 compensation for banking distress.'
    },
    sellerArgument: {
      statement: 'The complainant cancelled the "Diet Plan" add-on but failed to cancel the separate "Personalized Workout Tier" buried under sub-menu 4B. Our terms clearly state that all promotional sign-ups enroll in bundled tiers.',
      keyPoints: [
        'Separate multi-tier structure outlined in 42-page Terms of Service.',
        'The cardholder authorized recurring international billing upon initial ₹1 payment.',
        'FitPulse is headquartered outside India and not bound by RBI circulars.'
      ],
      defenseClause: 'FitPulse Terms 19.3: "Subscriptions comprise independent modules requiring individual deactivation."'
    },
    verdictOptions: [
      {
        id: 'verdict-pro-consumer',
        title: 'Order Full Refund + 18% Interest + ₹50,000 Dark Pattern Penalty',
        description: 'Declare multi-tiered unbundling a deceptive subscription trap under CCPA 2023 Dark Pattern Guidelines.',
        isCorrect: true,
        compensationAwarded: '₹14,995 Refund + 18% Interest + ₹50,000 Compensation'
      },
      {
        id: 'verdict-pro-seller',
        title: 'Dismiss Claim: User Failed to Read 42-Page Terms of Service',
        description: 'Hold that consumer should have individually untangled buried sub-module cancellations.',
        isCorrect: false
      },
      {
        id: 'verdict-neutral',
        title: 'Order Refund of Last 1 Month Only',
        description: 'Hold consumer partly responsible for not checking bank statements every month.',
        isCorrect: false
      }
    ],
    actualJudicialVerdict: {
      winner: 'consumer',
      legalCitations: [
        'CCPA Dark Pattern Guidelines, 2023: Section 5 (Subscription Trap & Confirm Shaming)',
        'RBI Circular on Framework for Processing of e-mandate for Recurring Transactions (2021)',
        'Consumer Protection Act, 2019: Section 2(47) (Unfair Trade Practice)'
      ],
      fullReasoning: 'Under the CCPA Dark Patterns Guidelines 2023, a "Subscription Trap" includes making cancellation unduly complex, concealing the cancellation process, or continuing to debit consumers after they have expressed intent to cancel. Foreign entities collecting funds from Indian residents are fully subject to the Consumer Protection Act 2019 if they target Indian consumers. The RBI e-mandate rules mandate prior 24-hour notification for recurring charges.',
      precedentCase: 'Delhi State Consumer Commission in Spotify / OTT Dark Pattern Inquiries: "A consumer cannot be trapped in a labyrinth of menus to cancel what was advertised as a 1-click trial."',
      actionableTakeaway: 'Always keep cancellation confirmation emails/screenshots. If an unauthorized recurring charge occurs, immediately instruct your bank to freeze the card mandate and dispute the charge under RBI unauthorized electronic transactions guidelines.'
    }
  },
  {
    id: 'case-miracle-cream',
    title: 'Case #2026/NCDRC/605: The "100% Acne Eraser" Miracle Cream',
    category: 'Misleading Ads & Hazardous Cosmetics',
    disputedAmount: '₹3,500 (Product) + ₹1,50,000 (Medical Treatment)',
    complexity: 'Complex',
    brief: 'A cosmetics startup ran heavy social media advertisements claiming "100% Permanent Acne Cure in 3 Days or 10x Refund Guaranteed", endorsed by popular influencers. The user suffered chemical dermatitis and severe skin peeling due to unlisted steroids.',
    consumerName: 'Dr. Priya Nambiar (Complainant)',
    sellerName: 'GlowRadiance Beauty Corp.',
    evidence: [
      {
        title: 'Exhibit A: Government Certified Dermatological Forensic Lab Report',
        type: 'lab_report',
        description: 'Chemical analysis reveals 2.5% Clobetasol Propionate (potent steroid) unlisted on ingredient label.',
        content: 'Detected schedule-H steroid without prescription warning or statutory label.',
        highlight: 'Illegal inclusion of prescription steroid in over-the-counter cosmetic.'
      },
      {
        title: 'Exhibit B: Social Media Ad Video & Influencer Endorsement',
        type: 'photo',
        description: 'Promotional video claiming "All Natural Ayurvedic 0% Chemicals - Cures Acne Forever".',
        content: 'Influencer with 2M followers claiming product cleared skin overnight with zero side effects.',
        highlight: 'Grossly deceptive advertising with false endorsement violating CCPA 2022 Guidelines.'
      },
      {
        title: 'Exhibit C: Hospital Treatment Bills & Specialist Diagnosis',
        type: 'invoice',
        description: '₹1,50,000 in dermatology laser and barrier repair treatment receipts.',
        content: 'Diagnosis: Topical Steroid Induced Rosacea & Chemical Contact Dermatitis.',
        highlight: 'Direct medical causation between product use and severe physical injury.'
      }
    ],
    consumerArgument: {
      statement: 'The company advertised an all-natural herbal cream. Instead, it was secretly laced with high-potency topical steroids that permanently damaged my skin barrier and required months of painful dermatological treatment. Both the brand and the influencer must be held accountable.',
      keyPoints: [
        'Cosmetic adulterated with banned Schedule-H prescription steroids.',
        'Misleading advertising violating CCPA Endorsement Guidelines 2022.',
        'Severe bodily harm triggering Product Liability under Section 84 of CPA 2019.'
      ],
      demandedRelief: 'Product refund ₹3,500 + Full medical expenses ₹1,50,000 + ₹5,00,000 Product Liability Compensation.'
    },
    sellerArgument: {
      statement: 'Our terms include a standard disclaimer: "Results may vary. Patch test recommended." The complainant may have had pre-existing allergy or sensitivity. The lab report tested a sample not authenticated by our batch custodian.',
      keyPoints: [
        'Customer did not perform mandatory patch test before facial application.',
        'Third-party contract manufacturer was responsible for packaging and formulation.',
        'Social media ads contained standard "Dramatization" disclaimers.'
      ],
      defenseClause: 'GlowRadiance Packaging: "For external use only. Company bears no liability for individual skin reactions."'
    },
    verdictOptions: [
      {
        id: 'verdict-pro-consumer',
        title: 'Award Full Medical Costs ₹1,50,000 + ₹5,00,000 Product Liability Damages',
        description: 'Hold manufacturer strictly liable for unlisted steroids and misleading endorsements.',
        isCorrect: true,
        compensationAwarded: '₹1,53,500 Medical & Product + ₹5,00,000 Product Liability'
      },
      {
        id: 'verdict-pro-seller',
        title: 'Dismiss Claim Based on "Patch Test Recommended" Disclaimer',
        description: 'Hold that consumer should have tested product on arm first.',
        isCorrect: false
      },
      {
        id: 'verdict-partial',
        title: 'Refund ₹3,500 Product Cost Only',
        description: 'Treat bodily injury as an unforeseen medical allergy.',
        isCorrect: false
      }
    ],
    actualJudicialVerdict: {
      winner: 'consumer',
      legalCitations: [
        'Consumer Protection Act, 2019: Chapter VI (Product Liability, Sections 84-87)',
        'CCPA Guidelines for Prevention of Misleading Advertisements and Endorsements for Misleading Advertisements, 2022',
        'Drugs and Cosmetics Act, 1940: Section 17C (Misbranded / Adulterated Cosmetics)'
      ],
      fullReasoning: 'Under Chapter VI of CPA 2019, a product manufacturer is strictly liable in product liability action if the product contains a manufacturing defect, design defect, deviates from specifications, or fails to contain adequate instructions/warnings. Furthermore, adulterating a cosmetic with unlisted prescription steroids is a criminal act under the Drugs and Cosmetics Act. CCPA 2022 Guidelines hold advertisers strictly liable for claims that cannot be scientifically substantiated.',
      precedentCase: 'NCDRC Landmark in Emami Fair & Handsome / Hindustan Unilever Glow & Handsome Challenges: "Cosmetic brands cannot make unsubstantiated medical claims of permanent skin alteration without rigorous double-blind clinical trials."',
      actionableTakeaway: 'Always demand lab testing if an over-the-counter cosmetic causes sudden severe reactions. Preserve unused product and packaging. Product liability under CPA 2019 allows claiming compensation for all resultant medical treatments.'
    }
  },
  {
    id: 'case-airline-cancellation',
    title: 'Case #2026/DCDRC/338: The 95% Flight Cancellation "Convenience Fee"',
    category: 'Aviation & Unfair Contract Terms',
    disputedAmount: '₹8,550 (Withheld on ₹9,000 Ticket)',
    complexity: 'Moderate',
    brief: 'A consumer booked two domestic flights for ₹9,000 under a "Zero Cancellation Charges Promo". Due to a sudden medical emergency, the consumer cancelled 5 days prior to departure. The airline refunded only ₹450, pocketing ₹8,550 as "Non-refundable Carrier Convenience & Regulatory Processing Surcharges".',
    consumerName: 'Vikramaditya Roy (Complainant)',
    sellerName: 'SwiftJet Commercial Airlines Ltd.',
    evidence: [
      {
        title: 'Exhibit A: Promotional Booking Confirmation',
        type: 'invoice',
        description: 'Email header boldly displaying "Zero Cancellation Fee Plan Included".',
        content: 'Promotional tagline: "Fly Stress-Free! Cancel anytime up to 24 hours before flight for 0% fee."',
        highlight: 'Prominently marketed as zero cancellation fee.'
      },
      {
        title: 'Exhibit B: Cancellation Credit Note',
        type: 'invoice',
        description: 'Refund statement showing Base Fare refunded ₹0, Fuel Surcharge refunded ₹0, Convenience Fee withheld ₹8,550.',
        content: 'Total Paid: ₹9,000. Total Refunded: ₹450 (Only airport UDF returned).',
        highlight: '95% of ticket cost confiscated through arbitrary reclassification of fees.'
      },
      {
        title: 'Exhibit C: DGCA Passenger Charter Guidelines',
        type: 'email',
        description: 'Directorate General of Civil Aviation (DGCA) CAR Series M, Part IV.',
        content: 'Regulations mandate cancellation charges cannot exceed the basic fare and fuel surcharge must be refunded.',
        highlight: 'Direct breach of statutory DGCA civil aviation requirements.'
      }
    ],
    consumerArgument: {
      statement: 'The airline advertised a Zero Cancellation promo to entice me to book. When I had to cancel 5 days in advance, they refunded a ridiculous ₹450 out of ₹9,000 by renaming cancellation charges into "non-refundable convenience fees". This is a textbook unfair trade practice in violation of DGCA guidelines.',
      keyPoints: [
        'Blatant contradiction between advertised zero cancellation and 95% deduction.',
        'DGCA Civil Aviation Requirements mandate refund of all statutory fees and taxes upon cancellation.',
        'Renaming cancellation charges into convenience fees is deceptive dark pattern reclassification.'
      ],
      demandedRelief: 'Full refund of balance ₹8,550 + ₹20,000 compensation for unfair trade practice.'
    },
    sellerArgument: {
      statement: 'The "Zero Cancellation" promotion applied strictly to the airline basic tariff (which was ₹0 under special promotional unbundled pricing). All remaining charges comprised fuel surcharges, software maintenance, and dynamic capacity allocation fees which are non-refundable under Tariff Rules.',
      keyPoints: [
        'Airlines have deregulated freedom under DGCA rules to unbundle ancillary services.',
        'Complainant consented to the Detailed Tariff Conditions checkbox during web checkout.',
        'Airline suffered revenue loss due to late cancellation.'
      ],
      defenseClause: 'SwiftJet Carrier Regulations Clause 22: "Ancillary and operational surcharges are entirely non-refundable irrespective of cancellation notice."'
    },
    verdictOptions: [
      {
        id: 'verdict-pro-consumer',
        title: 'Order Full Refund of ₹8,550 + ₹25,000 Punitive Damages Against Airline',
        description: 'Rule that unbundling tariffs to render zero-cancellation promotions meaningless is an unfair trade practice.',
        isCorrect: true,
        compensationAwarded: '₹8,550 Refund + ₹25,000 Compensation'
      },
      {
        id: 'verdict-pro-seller',
        title: 'Dismiss Complaint: Airline Exercised Valid Ancillary Pricing Discretion',
        description: 'Hold that terms of carriage allow withholding ancillary surcharges.',
        isCorrect: false
      },
      {
        id: 'verdict-partial',
        title: 'Refund 50% of the Withheld Amount without Damages',
        description: 'Order a compromise refund of ₹4,275.',
        isCorrect: false
      }
    ],
    actualJudicialVerdict: {
      winner: 'consumer',
      legalCitations: [
        'DGCA Civil Aviation Requirements (CAR): Section 3, Series M, Part IV (Refund of Airline Tickets)',
        'Consumer Protection Act, 2019: Section 2(47) (Unfair Trade Practice) & Section 2(46) (Unfair Contract)',
        'Delhi State Consumer Disputes Redressal Commission: Air India / SpiceJet Cancellation Ruling (2022)'
      ],
      fullReasoning: 'DGCA CAR regulations unequivocally state that under no circumstances can the cancellation charge exceed the bare basic fare, and the airline cannot levy additional processing or administrative charges for processing a refund. Advertising "Zero Cancellation" while secretly reclassifying 95% of ticket price into non-refundable ancillary buckets is a fraudulent trap under Section 2(47) of CPA 2019.',
      precedentCase: 'NCDRC in Indigo / GoAir Passenger Complaints: "Airlines cannot deceive traveling public by promoting zero fee cancellation while virtually pocketing the entire ticket price under fabricated headings."',
      actionableTakeaway: 'When airlines refuse ticket refunds, cite DGCA CAR Section 3, Series M, Part IV directly. If they stonewall, file an AirSewa grievance followed immediately by a DCDRC complaint on e-Daakhil.'
    }
  }
];
