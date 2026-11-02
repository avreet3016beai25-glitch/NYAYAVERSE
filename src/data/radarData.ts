import { RadarIncident } from '../types';

export interface StateSummary {
  name: string;
  code: string;
  totalReports: number;
  riskIndex: 'Low' | 'Moderate' | 'High' | 'Severe';
  topIssue: string;
}

export const STATE_SUMMARIES: Record<string, StateSummary> = {
  'Maharashtra': { name: 'Maharashtra', code: 'MH', totalReports: 1420, riskIndex: 'High', topIssue: 'E-Commerce Return Refusals & Dark Patterns' },
  'Delhi NCR': { name: 'Delhi NCR', code: 'DL', totalReports: 1680, riskIndex: 'Severe', topIssue: 'Restaurant MRP Violations & Service Charges' },
  'Karnataka': { name: 'Karnataka', code: 'KA', totalReports: 1290, riskIndex: 'High', topIssue: 'EdTech Course Refunds & Ghost Subscriptions' },
  'Tamil Nadu': { name: 'Tamil Nadu', code: 'TN', totalReports: 940, riskIndex: 'Moderate', topIssue: 'Electronics Warranty Denials & Fake Spares' },
  'Telangana': { name: 'Telangana', code: 'TS', totalReports: 880, riskIndex: 'Moderate', topIssue: 'Food Delivery Drip Fees & Cloud Kitchen Hygiene' },
  'Gujarat': { name: 'Gujarat', code: 'GJ', totalReports: 810, riskIndex: 'Moderate', topIssue: 'Counterfeit Branded Goods & Textile Claims' },
  'Uttar Pradesh': { name: 'Uttar Pradesh', code: 'UP', totalReports: 1530, riskIndex: 'Severe', topIssue: 'UPI / Phishing Payment Scams & Fake Seed Claims' },
  'West Bengal': { name: 'West Bengal', code: 'WB', totalReports: 760, riskIndex: 'Moderate', topIssue: 'Airline Ticket Cancellation Drip Charges' },
  'Rajasthan': { name: 'Rajasthan', code: 'RJ', totalReports: 620, riskIndex: 'Low', topIssue: 'Tourist Overcharging & Dual Menu Pricing' },
  'Kerala': { name: 'Kerala', code: 'KL', totalReports: 510, riskIndex: 'Low', topIssue: 'Ayurvedic Magic Cure Advertisements' },
  'Punjab': { name: 'Punjab', code: 'PB', totalReports: 490, riskIndex: 'Low', topIssue: 'Visa & Study Abroad Consultancy Refund Traps' },
  'Madhya Pradesh': { name: 'Madhya Pradesh', code: 'MP', totalReports: 580, riskIndex: 'Moderate', topIssue: 'Packaged Seed & Fertilizer Quality Issues' },
};

export const INITIAL_RADAR_INCIDENTS: RadarIncident[] = [
  {
    id: 'rad-mh-01',
    state: 'Maharashtra',
    city: 'Mumbai (Bandra)',
    coords: [28, 58],
    category: 'Overcharging',
    title: 'Multiplex selling ₹20 popcorn combo water for ₹110',
    date: '2026-11-01',
    reportedAmount: '₹90.00',
    status: 'Verified by Nyaya',
    description: 'Multiplex cashier refused to dispense regular water and charged 5.5x over printed MRP on branded sealed bottle.',
    victimAction: 'Reported to Legal Metrology Inspector; refund and ₹10,000 spot penalty issued.'
  },
  {
    id: 'rad-dl-01',
    state: 'Delhi NCR',
    city: 'New Delhi (Connaught Place)',
    coords: [37, 30],
    category: 'Overcharging',
    title: 'Restaurant levying mandatory 10% Service Charge',
    date: '2026-11-02',
    reportedAmount: '₹480.00',
    status: 'Verified by Nyaya',
    description: 'Diner manager claimed service charge is compulsory under restaurant house rules despite CCPA July 2022 ban.',
    victimAction: 'Complainant called NCH 1915 on spot; restaurant removed charge from bill.'
  },
  {
    id: 'rad-ka-01',
    state: 'Karnataka',
    city: 'Bengaluru (Koramangala)',
    coords: [40, 78],
    category: 'Online Shopping',
    title: 'Quick Commerce charging ₹15 "Handling" + ₹25 "Rain Surge" on sunny day',
    date: '2026-10-31',
    reportedAmount: '₹40.00',
    status: 'Under Investigation',
    description: '10-minute grocery app added automated phantom surge fees when local weather was 28°C and clear.',
    victimAction: 'Class action complaint drafted via Nyayaverse Justice 60s tool.'
  },
  {
    id: 'rad-up-01',
    state: 'Uttar Pradesh',
    city: 'Lucknow (Hazratganj)',
    coords: [50, 36],
    category: 'Banking & Payments',
    title: 'Fake Electricity Disconnection SMS with APK malware link',
    date: '2026-11-01',
    reportedAmount: '₹34,500.00',
    status: 'Verified by Nyaya',
    description: 'Fraudulent SMS claiming power bill overdue by 2 hours. User downloaded malicious APK that mirrored bank OTPs.',
    victimAction: 'Victim contacted 1930 Cyber Crime Helpline within 1 hour; lien placed on fraudulent beneficiary account.'
  },
  {
    id: 'rad-ts-01',
    state: 'Telangana',
    city: 'Hyderabad (Hitec City)',
    coords: [42, 62],
    category: 'Fake Products',
    title: 'Duplicate High-End GPU Graphics Card Delivered Without Chips',
    date: '2026-10-29',
    reportedAmount: '₹62,000.00',
    status: 'Verified by Nyaya',
    description: 'Online electronics store sent chassis with weighted dummy heatsinks instead of RTX 4070.',
    victimAction: 'Unboxing video verified; full bank chargeback processed.'
  },
  {
    id: 'rad-tn-01',
    state: 'Tamil Nadu',
    city: 'Chennai (T. Nagar)',
    coords: [46, 80],
    category: 'Misleading Ads',
    title: 'Jeweller advertising "0% Making Charges" with hidden 18% wastage markup',
    date: '2026-10-28',
    reportedAmount: '₹14,200.00',
    status: 'Community Reported',
    description: 'Store billboard claimed zero making fees but charged 18% non-deductible wastage on 22kt gold jewellery.',
    victimAction: 'Reported to Bureau of Indian Standards (BIS Care) and CCPA.'
  },
  {
    id: 'rad-kl-01',
    state: 'Kerala',
    city: 'Kochi (Ernakulam)',
    coords: [36, 86],
    category: 'Food Safety',
    title: 'Packaged Fruit Juice lacking manufacturing date & FSSAI registration',
    date: '2026-10-30',
    reportedAmount: '₹160.00',
    status: 'Verified by Nyaya',
    description: 'Imported artisanal juice sold in high-end supermarket with obscured expiration date sticker pasted over old date.',
    victimAction: 'Food Safety Officer inspected retail premises and confiscated affected batch.'
  },
  {
    id: 'rad-wb-01',
    state: 'West Bengal',
    city: 'Kolkata (Salt Lake)',
    coords: [68, 48],
    category: 'Online Shopping',
    title: 'Apparel website refusal to refund damaged festive saree',
    date: '2026-10-27',
    reportedAmount: '₹4,899.00',
    status: 'Under Investigation',
    description: 'Silk saree arrived with permanent bleach stains; seller stated "Festive sale items are strictly final sale".',
    victimAction: 'Notice served under Consumer Protection (E-Commerce) Rules 2020.'
  },
  {
    id: 'rad-gj-01',
    state: 'Gujarat',
    city: 'Ahmedabad (SG Highway)',
    coords: [24, 45],
    category: 'Misleading Ads',
    title: 'EV Scooter showroom promising 180km range; actual delivers 42km',
    date: '2026-10-26',
    reportedAmount: '₹1,25,000.00',
    status: 'Community Reported',
    description: 'Dealer advertised IDC range as guaranteed real-world highway range in peak summer.',
    victimAction: 'Joint consumer forum complaint lodged for product deficiency.'
  },
  {
    id: 'rad-rj-01',
    state: 'Rajasthan',
    city: 'Jaipur (Amer)',
    coords: [32, 38],
    category: 'Overcharging',
    title: 'Heritage Cafe operating dual menus charging 3x to foreign & non-local tourists',
    date: '2026-10-25',
    reportedAmount: '₹1,450.00',
    status: 'Verified by Nyaya',
    description: 'Disparate pricing menus given based on spoken language for identical mineral water and packaged snacks.',
    victimAction: 'Department of Consumer Affairs notice issued to proprietor.'
  }
];
