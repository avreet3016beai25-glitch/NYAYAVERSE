import { ScamTrap } from '../types';

export interface GameProduct {
  id: string;
  name: string;
  category: string;
  fakeOriginalPrice: number;
  salePrice: number;
  realMarketPrice: number;
  imageDescription: string;
  rating: number;
  reviewCount: number;
  seller: string;
  sellerTrustBadge: string;
}

export const SCAM_GAME_PRODUCT: GameProduct = {
  id: 'prod-ultra-audio',
  name: 'QuantumBass ANC Pro 9000 Wireless Studio Earbuds',
  category: 'Electronics & Audio',
  fakeOriginalPrice: 19999,
  salePrice: 1499, // 92.5% Fake Discount
  realMarketPrice: 1200,
  imageDescription: 'Sleek matte-black cyberpunk wireless earbuds with glowing LED neon rings.',
  rating: 4.98,
  reviewCount: 38419,
  seller: 'ApexDirect Super Global Express',
  sellerTrustBadge: 'Certified Official Indian Govt Quality Seal (Fake)',
};

export const SCAM_TRAPS: ScamTrap[] = [
  {
    id: 'trap-false-urgency',
    elementId: 'timer-badge',
    trapType: 'False Urgency',
    title: 'Deceptive Countdown Panic Clock',
    description: 'A 2-minute flashing countdown clock threatening that the price will jump by 10x if not purchased immediately.',
    penaltyAmount: 1500,
    explanation: 'The timer is a client-side JavaScript loop designed to trigger impulse buying. Under CCPA Dark Pattern Guidelines 2023, creating artificial time scarcity is strictly banned.',
    legalGuideline: 'CCPA Dark Pattern Guidelines 2023 (Annexure 1: False Urgency)'
  },
  {
    id: 'trap-fake-discount',
    elementId: 'price-strike',
    trapType: 'Fake Discount',
    title: 'Inflated Baseline MRP (Fake 92.5% Cut)',
    description: 'Strikethrough price of ₹19,999 when this generic unbranded earbud is sold across wholesale markets for ₹1,200.',
    penaltyAmount: 2000,
    explanation: 'Sellers artificially inflate the reference MRP to manufacture an illusion of a mammoth bargain. This constitutes an unfair trade practice under Section 2(47) of CPA 2019.',
    legalGuideline: 'Consumer Protection Act, 2019 Section 2(47) (Deceptive Price Indication)'
  },
  {
    id: 'trap-bot-reviews',
    elementId: 'reviews-section',
    trapType: 'Bot Reviews',
    title: 'Astroturfed AI Bot Testimonials',
    description: '38,419 reviews with identical 5-star ratings, generic stock profile avatars, and copied praise words.',
    penaltyAmount: 1200,
    explanation: 'Fabricating or paying for online consumer feedback violates BIS Standard IS 19000:2022 and CCPA guidelines against fake reviews.',
    legalGuideline: 'Bureau of Indian Standards (BIS) IS 19000:2022'
  },
  {
    id: 'trap-drip-fees',
    elementId: 'checkout-fees',
    trapType: 'Drip Pricing',
    title: 'Sneaky Cart Additions at Checkout',
    description: 'Surprise ₹299 "Mandatory Warehousing Insurance" + ₹199 "Green Speed Packaging" added only on the payment screen.',
    penaltyAmount: 1800,
    explanation: 'Drip pricing conceals the total payable price until the customer has already invested time and intent into purchasing. Prohibited under CCPA Dark Patterns 2023.',
    legalGuideline: 'CCPA Dark Pattern Guidelines 2023 (Annexure 1: Drip Pricing & Basket Sneaking)'
  },
  {
    id: 'trap-phishing-payment',
    elementId: 'payment-methods',
    trapType: 'Phishing Payment',
    title: 'Suspicious Third-Party Payment Redirect',
    description: 'Button redirects away from verified RBI-authorized gateways to an unverified private UPI link asking to pay into a personal savings account.',
    penaltyAmount: 2500,
    explanation: 'Legitimate e-commerce portals use authorized Payment Aggregators (Razorpay, PayU, BillDesk) registered with the Reserve Bank of India, not direct P2P UPI transfers.',
    legalGuideline: 'RBI Guidelines on Regulation of Payment Aggregators and Payment Gateways'
  },
  {
    id: 'trap-fake-support',
    elementId: 'support-seal',
    trapType: 'Fake Support',
    title: 'Counterfeit Government Seal & WhatsApp Support',
    description: 'A bogus badge claiming "Ministry of Commerce Approved Portal" paired with a personal unverified mobile number.',
    penaltyAmount: 1000,
    explanation: 'No Indian government ministry certifies individual commercial discounts or consumer portals. Misuse of national symbols or government identity violates the Emblems and Names Act, 1950.',
    legalGuideline: 'The Emblems and Names (Prevention of Improper Use) Act, 1950'
  },
  {
    id: 'trap-otp-fraud',
    elementId: 'otp-popup',
    trapType: 'OTP Trap',
    title: 'Fraudulent Pre-Authorization OTP Prompt',
    description: 'A prompt asking you to enter your 6-digit Bank OTP under the pretense of "Unlocking VIP Special Discount".',
    penaltyAmount: 3000,
    explanation: 'Bank OTPs authenticate debit or credit card debits or UPI mandates, NEVER promo codes or discount access. Sharing an OTP gives scammers full access to drain your funds.',
    legalGuideline: 'RBI Cyber Security Framework for Banks & Consumer Alert 2023'
  }
];
