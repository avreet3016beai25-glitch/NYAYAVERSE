export interface DailyChallenge {
  id: string;
  dayNumber: number;
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  statute: string;
  xpReward: number;
}

export const DAILY_CHALLENGES: DailyChallenge[] = [
  {
    id: 'dc-01',
    dayNumber: 1,
    question: 'A restaurant bill includes a 10% "Service Charge" (₹250). When you ask the manager to remove it, he insists it is compulsory. What is the legal truth under CCPA guidelines?',
    options: [
      {
        text: 'Service charge is mandatory if printed on the menu card.',
        isCorrect: false,
        explanation: 'Printing on the menu does NOT make an illegal charge mandatory.'
      },
      {
        text: 'Service charge is strictly voluntary; restaurants cannot force consumers to pay it.',
        isCorrect: true,
        explanation: 'CCPA Guidelines (July 4, 2022) explicitly bar hotels and restaurants from levying service charges automatically or by default.'
      },
      {
        text: 'Only foreign tourists can opt out of service charge.',
        isCorrect: false,
        explanation: 'The guideline applies equally to all consumers in India.'
      }
    ],
    statute: 'CCPA Guidelines for Prevention of Unfair Trade Practices in Hotels & Restaurants (2022)',
    xpReward: 50
  },
  {
    id: 'dc-02',
    dayNumber: 2,
    question: 'You order a pair of shoes online during a clearance sale. The bill states: "Sale items are strictly non-refundable." The shoe arrives with a detached sole. Can you demand a full refund?',
    options: [
      {
        text: 'Yes. "No return" policies cannot override statutory rights against defective goods.',
        isCorrect: true,
        explanation: 'Under Consumer Protection (E-Commerce) Rules 2020, platforms must accept returns of defective goods regardless of sale terms.'
      },
      {
        text: 'No. You agreed to the clearance terms when purchasing.',
        isCorrect: false,
        explanation: 'Unfair contract terms cannot strip basic protection against defective goods.'
      },
      {
        text: 'Only if you paid via Credit Card chargeback.',
        isCorrect: false,
        explanation: 'Your legal remedy applies across all payment modes.'
      }
    ],
    statute: 'Consumer Protection (E-Commerce) Rules, 2020 & CPA 2019 Section 2(47)',
    xpReward: 50
  },
  {
    id: 'dc-03',
    dayNumber: 3,
    question: 'A movie theatre kiosk charges ₹80 for a sealed 500ml bottle of water that has a printed MRP of ₹20. What can you do?',
    options: [
      {
        text: 'Nothing, multiplexes are private property with separate pricing licenses.',
        isCorrect: false,
        explanation: 'The Legal Metrology Act applies to all commercial retail sales across India.'
      },
      {
        text: 'Report the overcharging; dual MRP or charging above printed MRP on sealed goods is illegal.',
        isCorrect: true,
        explanation: 'Rule 18(2) of Legal Metrology (Packaged Commodities) Rules forbids selling packaged commodities above the printed MRP.'
      },
      {
        text: 'Pay ₹80 but demand a special multiplex tax receipt.',
        isCorrect: false,
        explanation: 'There is no special multiplex tax permitting above-MRP pricing.'
      }
    ],
    statute: 'Legal Metrology Act, 2009 (Section 36)',
    xpReward: 50
  }
];
