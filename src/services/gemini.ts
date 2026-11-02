// NYAYAVERSE AI Intelligence Service
// Handles Gemini API integration when user configures key, with deep local Indian Consumer Law engine fallback.

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  citations?: string[];
  actionPlan?: string[];
  evidenceChecklist?: string[];
  isLiveAI?: boolean;
}

const GEMINI_API_KEY_STORAGE = 'nyayaverse_gemini_api_key';

export function getStoredGeminiKey(): string {
  try {
    return localStorage.getItem(GEMINI_API_KEY_STORAGE) || '';
  } catch {
    return '';
  }
}

export function saveGeminiKey(key: string) {
  try {
    if (key.trim()) {
      localStorage.setItem(GEMINI_API_KEY_STORAGE, key.trim());
    } else {
      localStorage.removeItem(GEMINI_API_KEY_STORAGE);
    }
  } catch {}
}

const LEGAL_KNOWLEDGE_BASE = [
  {
    keywords: ['mrp', 'overcharg', 'price', 'water', 'popcorn', 'restaurant', 'charge above', 'multiplex', 'bottle'],
    topic: 'MRP Overcharging & Service Charge Violations',
    statutes: [
      'Legal Metrology Act, 2009: Section 36 (Penalty for sale of non-standard packages)',
      'Legal Metrology (Packaged Commodities) Rules, 2011: Rule 18(2)',
      'CCPA Guidelines for Prevention of Unfair Trade Practices in Hotels & Restaurants (July 4, 2022)'
    ],
    summary: 'Charging even 10 paise above the printed Maximum Retail Price (MRP) on any pre-packaged commodity is a statutory violation across all states in India. Furthermore, restaurants and hotels cannot levy mandatory service charges by default.',
    evidenceChecklist: [
      'Original tax invoice/receipt itemizing the overcharged commodity',
      'Clear high-resolution photo of the product showing the printed MRP and batch details',
      'Photo of the restaurant menu or counter signage',
      'Proof of payment (UPI transaction ID, credit card slip)'
    ],
    actionPlan: [
      '1. Object immediately at the cash counter and demand billing at printed MRP.',
      '2. If the vendor insists, pay under written protest and preserve the stamped invoice.',
      '3. Lodge a spot complaint on National Consumer Helpline (Call 1915 or WhatsApp 8800001915).',
      '4. File an online petition with the Controller of Legal Metrology in your respective State.',
      '5. File a claim on e-Daakhil for refund of excess amount plus compensation for unfair trade practice.'
    ]
  },
  {
    keywords: ['fake', 'counterfeit', 'replica', 'duplicate', 'damaged', 'broken', 'wrong product', 'brick', 'soap', 'unboxing'],
    topic: 'Counterfeit & Damaged Goods Redressal',
    statutes: [
      'Consumer Protection Act, 2019: Sections 84-87 (Product Liability of Manufacturer & Seller)',
      'Consumer Protection (E-Commerce) Rules, 2020: Rule 4 & Rule 6 (Liabilities of Marketplace)',
      'Indian Penal Code / BNS: Cheating and Dishonestly Inducing Delivery of Property'
    ],
    summary: 'E-commerce marketplaces and direct sellers are jointly liable for counterfeit, damaged, or mismatched goods. The platform cannot evade liability by hiding behind third-party intermediary status when it manages payment, fulfillment, or catalog verification.',
    evidenceChecklist: [
      'Single uncut video showing package unboxing, shipping label, and inner contents',
      'Product invoice with IMEI, barcode, or serial number',
      'Photos of manufacturing flaws or serial number mismatches',
      'Customer support chat logs and formal rejection emails'
    ],
    actionPlan: [
      '1. Immediately raise a return ticket in the mobile application attaching the unboxing photos.',
      '2. If automated support rejects the claim citing "OTP was delivered", escalate to the platform Nodal Grievance Officer in writing.',
      '3. Cite Rule 6 of Consumer Protection (E-Commerce) Rules 2020 and NCDRC Precedent 224/2021.',
      '4. Dispute the payment with your card issuing bank for "Goods Not Received as Described" (Chargeback).',
      '5. Register an immediate grievance on National Consumer Helpline (NCH 1915).'
    ]
  },
  {
    keywords: ['refund', 'cancel', 'return', 'denied', 'reject', 'sale item', 'clearance', 'no refund', 'no return'],
    topic: 'Refund Refusal & "No Return Policy" Legality',
    statutes: [
      'Consumer Protection Act, 2019: Section 2(47) (Unfair Trade Practice) & Section 2(46) (Unfair Contract)',
      'Consumer Protection (E-Commerce) Rules, 2020: Rule 5(3)(b) & Rule 7',
      'NCDRC Ruling: Tata Motors vs Rajesh Tyagi & E-Commerce Standards'
    ],
    summary: 'A blanket "No Refund / No Exchange" clause printed on receipts or website footers does not extinguish statutory consumer rights. If goods are defective, deficient, non-conforming, or delivered late, refusal to refund constitutes an Unfair Trade Practice.',
    evidenceChecklist: [
      'Purchase invoice and proof of payment',
      'Written communication notifying seller within return window',
      'Screenshot of product page showing advertised return/exchange policy',
      'Return rejection email or ticket transcripts'
    ],
    actionPlan: [
      '1. Send a formal legal grievance via email to the company official Grievance Officer.',
      '2. State that blanket "No Refund" policies violate Section 2(47) of Consumer Protection Act 2019.',
      '3. Give a strict 7-day deadline for refund processing.',
      '4. Use Nyayaverse "Justice in 60s" tool to generate and dispatch a formal Legal Notice.',
      '5. File an electronic consumer petition via the e-Daakhil portal (edaakhil.nic.in).'
    ]
  },
  {
    keywords: ['upi', 'bank', 'cyber', 'fraud', 'otp', 'scam', 'unauthorized', 'deduct', 'phishing', 'apk'],
    topic: 'Unauthorized Electronic Banking & Payment Scams',
    statutes: [
      'RBI Circular DBR.No.Leg.BC.78/09.07.005/2017-18: Customer Protection - Limiting Liability in Unauthorized Electronic Banking Transactions',
      'Information Technology Act, 2000: Section 43A & Section 66D',
      'National Cyber Crime Reporting Portal (1930 Helpline)'
    ],
    summary: 'Under RBI guidelines, if an unauthorized transaction occurs without customer fault (e.g. third-party breach or system glitch) and is reported within 3 working days, customer liability is ZERO. Even in cases of customer negligence, reporting within 4-7 days caps liability.',
    evidenceChecklist: [
      'Bank statement showing the unauthorized debit and transaction UTR numbers',
      'SMS alerts received from the bank',
      'Call recording or screenshot of the phishing SMS / APK link',
      'Immediate written complaint acknowledgment from your bank branch'
    ],
    actionPlan: [
      '1. Call 1930 (National Cyber Crime Helpline) IMMEDIATELY within the golden hour to freeze fraudulent beneficiary wallets.',
      '2. Notify your home bank within 3 working days to invoke zero liability protection under RBI Circular 2017-18.',
      '3. Block associated debit/credit cards and UPI handles via bank mobile app.',
      '4. File an official cyber report on cybercrime.gov.in and obtain an acknowledgment number.',
      '5. If the bank fails to resolve within 30 days, escalate to the RBI Banking Ombudsman (cms.rbi.org.in).'
    ]
  },
  {
    keywords: ['dark pattern', 'subscription', 'auto debit', 'recurring', 'trial', 'drip', 'urgency', 'timer', 'pre-ticked'],
    topic: 'Dark Patterns & Deceptive Digital Architecture',
    statutes: [
      'CCPA Guidelines for Prevention and Regulation of Dark Patterns, 2023',
      'RBI Circular on e-Mandate Framework for Recurring Online Transactions (2021)',
      'Consumer Protection Act, 2019: Section 18 & Section 89'
    ],
    summary: 'The Central Consumer Protection Authority has codified 13 illegal dark patterns including False Urgency, Basket Sneaking, Confirm Shaming, Forced Action, Subscription Traps, and Drip Pricing. Exploiting these constitutes a punishable offense under CPA 2019.',
    evidenceChecklist: [
      'Screen recording or screenshots of the confusing multi-screen cancellation funnel',
      'Bank or credit card statement highlighting unauthorized auto-debits',
      'Email confirmation of original trial sign-up',
      'Evidence showing cancellation was requested prior to debit date'
    ],
    actionPlan: [
      '1. Contact your credit card or bank issuer to revoke the recurring e-mandate immediately.',
      '2. Send a formal protest to the platform quoting CCPA Dark Pattern Guidelines 2023 (Section 5).',
      '3. Demand immediate reversal of all unauthorized auto-debits.',
      '4. File an institutional grievance with CCPA at cp-daakhil@nic.in for systematic consumer entrapment.',
      '5. Lodge an online complaint on the INGRAM consumer portal.'
    ]
  }
];

export async function askNyayaAI(userQuery: string, history: AIMessage[] = []): Promise<AIMessage> {
  const geminiKey = getStoredGeminiKey();

  if (geminiKey) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `You are Nyaya AI, an expert, sharp, and empathetic consumer rights and consumer protection legal investigator for India.
User situation: "${userQuery}"

Provide a structured, authoritative answer containing:
1. Executive Summary & Assessment of Rights
2. Relevant Indian Consumer Laws (cite exact sections: CPA 2019, Legal Metrology, CCPA Guidelines 2023, RBI Circulars, etc.)
3. Crucial Evidence Checklist to preserve
4. Concrete 5-Step Action Plan (including NCH 1915, e-Daakhil, Grievance Officer)
5. Important Warning or Next Step.
Keep tone futuristic, empowering, professional, and clear.`
                }
              ]
            }
          ]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return {
            role: 'assistant',
            content: text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            citations: ['Consumer Protection Act, 2019', 'CCPA Directives & Indian Judicial Precedents'],
            actionPlan: [
              'Preserve unboxing / purchase / invoice evidence immediately',
              'Lodge formal written notice with Seller Nodal Grievance Officer',
              'Register complaint on National Consumer Helpline (NCH 1915)',
              'Escalate to e-Daakhil District Consumer Forum if unresolved in 15 days'
            ],
            isLiveAI: true,
          };
        }
      }
    } catch (e) {
      console.warn('Gemini API call failed, falling back to Nyaya Knowledge Engine:', e);
    }
  }

  // Fallback to our deep structured Indian Consumer Legal Engine
  const queryLower = userQuery.toLowerCase();
  const matched = LEGAL_KNOWLEDGE_BASE.find(k => k.keywords.some(word => queryLower.includes(word))) || LEGAL_KNOWLEDGE_BASE[2];

  const content = `### ⚖️ Nyaya Intelligence Assessment: ${matched.topic}

**Situation Analysis:**
Based on your description, this scenario directly intersects with critical consumer protection safeguards under Indian law. ${matched.summary}

**📌 Applicable Statutory Laws & Precedents:**
${matched.statutes.map(s => `- **${s}**`).join('\n')}

**🔍 Crucial Evidence Checklist (Preserve Immediately):**
${matched.evidenceChecklist.map(e => `✓ ${e}`).join('\n')}

**⚡ Structured 5-Step Action Plan:**
${matched.actionPlan.join('\n')}

*⚠️ Note: This analysis is powered by Nyayaverse's Indian Consumer Law Engine for educational and diagnostic empowerment. You can use our Justice in 60s tool to generate a formal pre-litigation legal notice.*`;

  return {
    role: 'assistant',
    content,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    citations: matched.statutes,
    actionPlan: matched.actionPlan,
    evidenceChecklist: matched.evidenceChecklist,
    isLiveAI: false,
  };
}
