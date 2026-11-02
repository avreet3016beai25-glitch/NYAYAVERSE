export type Language = 'en' | 'hi';
export type Theme = 'dark' | 'light';

export type NavTab = 
  | 'home'
  | 'truth-scanner'
  | 'nyaya-ai'
  | 'courtroom'
  | 'radar'
  | 'scam-survival'
  | 'money-detective'
  | 'complaint-generator'
  | 'rights'
  | 'dashboard';

export interface ThreatItem {
  id: string;
  timestamp: string;
  category: 'Overcharging' | 'Dark Pattern' | 'Fake Product' | 'Payment Fraud' | 'Misleading Ad' | 'Expired Goods';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  title: string;
  entity: string;
  amount?: string;
  status: 'Investigating' | 'Verified' | 'Resolved' | 'Action Taken';
}

export interface TruthReport {
  id: string;
  timestamp: string;
  sourceType: string;
  sourceTitle: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  riskScore: number; // 0 - 100
  summary: string;
  detectedFlags: {
    flag: string;
    severity: 'warning' | 'danger' | 'info';
    description: string;
    legalSection: string;
  }[];
  extractedEvidence: {
    label: string;
    value: string;
    status: 'ok' | 'violation' | 'suspicious';
  }[];
  legalAnalysis: string;
  consumerRightsViolated: string[];
  recommendedSteps: string[];
}

export interface CourtroomCase {
  id: string;
  title: string;
  category: string;
  disputedAmount: string;
  complexity: 'Easy' | 'Moderate' | 'Complex';
  brief: string;
  consumerName: string;
  sellerName: string;
  evidence: {
    title: string;
    type: 'invoice' | 'photo' | 'email' | 'chat' | 'lab_report';
    description: string;
    content: string;
    highlight: string;
  }[];
  consumerArgument: {
    statement: string;
    keyPoints: string[];
    demandedRelief: string;
  };
  sellerArgument: {
    statement: string;
    keyPoints: string[];
    defenseClause: string;
  };
  verdictOptions: {
    id: string;
    title: string;
    description: string;
    isCorrect: boolean;
    compensationAwarded?: string;
  }[];
  actualJudicialVerdict: {
    winner: 'consumer' | 'seller' | 'partial';
    legalCitations: string[];
    fullReasoning: string;
    precedentCase: string;
    actionableTakeaway: string;
  };
}

export interface RadarIncident {
  id: string;
  state: string;
  city: string;
  coords: [number, number]; // [x, y] in SVG canvas percentage
  category: 'Online Shopping' | 'Fake Products' | 'Overcharging' | 'Banking & Payments' | 'Misleading Ads' | 'Food Safety';
  title: string;
  date: string;
  reportedAmount: string;
  status: 'Verified by Nyaya' | 'Community Reported' | 'Under Investigation';
  description: string;
  victimAction: string;
}

export interface ScamTrap {
  id: string;
  elementId: string;
  trapType: 'False Urgency' | 'Fake Discount' | 'Bot Reviews' | 'Drip Pricing' | 'Phishing Payment' | 'Fake Support' | 'OTP Trap';
  title: string;
  description: string;
  penaltyAmount: number;
  explanation: string;
  legalGuideline: string;
}

export interface ConsumerRight {
  id: string;
  number: number;
  title: string;
  tagline: string;
  iconName: string;
  description: string;
  statutoryBasis: string;
  realWorldScenario: {
    situation: string;
    trap: string;
    solution: string;
  };
  landmarkCase: {
    title: string;
    year: string;
    verdict: string;
  };
  myths: {
    myth: string;
    fact: string;
  }[];
}

export interface UserStats {
  consumerIQ: number;
  moneySaved: number;
  scansCount: number;
  courtroomWins: number;
  scamSurvivalScore: number;
  badgesUnlocked: string[];
  savedComplaints: number;
}
