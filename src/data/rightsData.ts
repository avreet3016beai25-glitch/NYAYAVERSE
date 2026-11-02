import { ConsumerRight } from '../types';

export const CONSUMER_RIGHTS: ConsumerRight[] = [
  {
    id: 'right-safety',
    number: 1,
    title: 'Right to Safety',
    tagline: 'Protection against goods and services that endanger life or health',
    iconName: 'Shield',
    description: 'The right to be protected against the marketing of goods and services which are hazardous to life, property, or well-being. This covers electrical appliances without ISI marks, adulterated foods, unsafe cosmetics, and malfunctioning vehicles.',
    statutoryBasis: 'Section 2(9)(i) of the Consumer Protection Act, 2019',
    realWorldScenario: {
      situation: 'A geyser or phone battery purchased online catches fire due to sub-standard internal wiring.',
      trap: 'Brand tells the victim: "You used a third-party plug, our liability is zero."',
      solution: 'Under Product Liability (Section 84 CPA 2019), the manufacturer and distributor are strictly liable for harm caused by defective design or absence of safety warnings.'
    },
    landmarkCase: {
      title: 'Spring Meadows Hospital vs Harjol Ahluwalia (Supreme Court of India)',
      year: '1998',
      verdict: 'The Supreme Court ruled that hospital negligence causing permanent brain damage to a child violates the right to safety, holding medical services strictly accountable under consumer law.'
    },
    myths: [
      {
        myth: 'If I sign a disclaimer saying "Use at your own risk", the manufacturer cannot be sued.',
        fact: 'False. You cannot contract out of fundamental safety liabilities. Blanket injury disclaimers are void under Section 23 of the Indian Contract Act.'
      },
      {
        myth: 'Foreign imported products do not need Bureau of Indian Standards (BIS) safety markings.',
        fact: 'False. Products under mandatory BIS quality control orders cannot be sold in India without genuine ISI/CRS marks, regardless of origin.'
      }
    ]
  },
  {
    id: 'right-informed',
    number: 2,
    title: 'Right to be Informed',
    tagline: 'Know the quality, quantity, potency, purity, standard, and true price',
    iconName: 'Eye',
    description: 'The right to be informed about the quality, quantity, potency, purity, standard, and price of goods or services, so as to protect the consumer against unfair trade practices. Mandates clear MRP, expiry dates, net weight, FSSAI numbers, and country of origin.',
    statutoryBasis: 'Section 2(9)(ii) of the Consumer Protection Act, 2019 & Legal Metrology Act, 2009',
    realWorldScenario: {
      situation: 'An e-commerce app shows a shirt priced at ₹799, but conceals that return shipping costs ₹250 until after purchase.',
      trap: 'The seller hides key warranty, delivery, and return exclusions inside an unlinked sub-page.',
      solution: 'Rule 5 of E-Commerce Rules 2020 mandates upfront disclosure of all contractual terms, country of origin, and return fees before transaction completion.'
    },
    landmarkCase: {
      title: 'MRF Ltd vs Union of India & CCPA Deceptive Tyres Ruling',
      year: '2022',
      verdict: 'Advertising claims of "Unpuncturable Mileage" without certified independent lab verification violated the consumer’s right to accurate product information.'
    },
    myths: [
      {
        myth: 'Shops can refuse to tell you the manufacturer details or country of origin.',
        fact: 'False. The Legal Metrology (Packaged Commodities) Rules mandate disclosure of manufacturer, packer/importer, and country of origin on every package.'
      },
      {
        myth: 'MRP is only a "recommendation" and sellers can add arbitrary cooling charges.',
        fact: 'False. The "M" in MRP stands for MAXIMUM. Selling even 50 paise above MRP is a statutory offense under Section 36 of Legal Metrology Act.'
      }
    ]
  },
  {
    id: 'right-choose',
    number: 3,
    title: 'Right to Choose',
    tagline: 'Access to a variety of goods and services at competitive prices',
    iconName: 'Layers',
    description: 'The right to be assured, wherever possible, of access to a variety of goods, technologies, and services at competitive prices. Protects against monopolies, tied-selling, pre-ticked checkboxes, and forced purchase of unnecessary ancillaries.',
    statutoryBasis: 'Section 2(9)(iii) of the Consumer Protection Act, 2019 & Competition Act, 2002',
    realWorldScenario: {
      situation: 'A cinema hall bans outside drinking water but sells its own ₹20 water bottles for ₹120 inside.',
      trap: 'Forcing captive consumers into an artificial monopoly with no viable alternative.',
      solution: 'State Consumer Commissions have ruled multiplexes must provide free, clean, potable drinking water fountains if outside water is restricted.'
    },
    landmarkCase: {
      title: 'Competition Commission of India vs Google Android Tying Ruling',
      year: '2022',
      verdict: 'CCI fined Google ₹1,337 Crore for abusing market dominance by mandating pre-installation of entire Google Mobile Suite, denying consumers and OEMs genuine choice.'
    },
    myths: [
      {
        myth: 'A school can force parents to purchase uniforms and books only from one designated vendor.',
        fact: 'False. CBSE and State Education Departments have repeatedly clarified that tied-selling of uniforms and books is an unfair trade practice.'
      },
      {
        myth: 'Flight booking websites can pre-tick travel insurance for you.',
        fact: 'False. CCPA 2023 Guidelines classify pre-ticked checkboxes as illegal "Basket Sneaking".'
      }
    ]
  },
  {
    id: 'right-heard',
    number: 4,
    title: 'Right to be Heard',
    tagline: 'Your grievances must receive due consideration at appropriate forums',
    iconName: 'Bot',
    description: 'The right to be heard and to be assured that consumer interests will receive due consideration in appropriate forums. Requires businesses to have dedicated Grievance Officers and empowers consumers to appear before consumer commissions without mandatory expensive lawyers.',
    statutoryBasis: 'Section 2(9)(iv) of the Consumer Protection Act, 2019',
    realWorldScenario: {
      situation: 'A bank customer loses ₹50,000 to an unauthorized phishing debit and reports it within 2 hours. The bank branch manager dismisses the customer and refuses to log the complaint.',
      trap: 'Institutions stonewalling victims to avoid internal incident reporting.',
      solution: 'Under RBI circular DBR.No.Leg.BC.78/2017-18, reporting unauthorized transactions within 3 days triggers ZERO customer liability, and banks must acknowledge complaints within 48 hours.'
    },
    landmarkCase: {
      title: 'State Bank of India vs Baby P.P. (NCDRC)',
      year: '2020',
      verdict: 'The National Commission ruled that banks cannot brush aside unauthorized transactions when the customer acts diligently, awarding full reimbursement plus compensation.'
    },
    myths: [
      {
        myth: 'You need an expensive advocate to file a case in the Consumer Forum.',
        fact: 'False. Any consumer can argue their own case in person or file complaints electronically via e-Daakhil without hiring a lawyer.'
      },
      {
        myth: 'Companies can close your support ticket without providing a written explanation.',
        fact: 'False. E-commerce platforms must provide a ticket number and resolve grievances within 30 days under Rule 4(5) of E-Commerce Rules 2020.'
      }
    ]
  },
  {
    id: 'right-redressal',
    number: 5,
    title: 'Right to Redressal',
    tagline: 'Fair settlement of genuine claims including replacement, refund, or damages',
    iconName: 'Scale',
    description: 'The right to seek redressal against unfair trade practices or restrictive trade practices or unscrupulous exploitation of consumers. Includes right to full refund, product replacement, repair, removal of defects, and compensation for harassment, injury, or mental agony.',
    statutoryBasis: 'Section 2(9)(v) of the Consumer Protection Act, 2019 (Sections 34-42 Redressal Commissions)',
    realWorldScenario: {
      situation: 'A builder delays handing over a residential flat by 4 years while continuing to collect interest.',
      trap: 'Builder cites boilerplate clauses stating "Delays due to market forces grant the developer indefinite extension."',
      solution: 'The Supreme Court in Pioneer Urban Land vs Govindan Raghavan held that one-sided agreements cannot bar consumers from claiming a full refund with interest under CPA.'
    },
    landmarkCase: {
      title: 'Pioneer Urban Land & Infrastructure Ltd vs Govindan Raghavan (Supreme Court)',
      year: '2019',
      verdict: 'The Supreme Court ruled that one-sided builder-buyer agreements are an unfair trade practice. Homebuyers cannot be compelled to wait indefinitely and are entitled to full refund with interest.'
    },
    myths: [
      {
        myth: '"Goods once sold will not be taken back" is legal and binding.',
        fact: 'False. Printing "No refund / No exchange" does not override statutory rights if goods are defective, deficient, or do not match advertised claims.'
      },
      {
        myth: 'You cannot claim money for mental agony or litigation stress in consumer court.',
        fact: 'False. Consumer Commissions regularly award compensation for mental agony, harassment, and travel expenses under Section 39.'
      }
    ]
  },
  {
    id: 'right-education',
    number: 6,
    title: 'Right to Consumer Education',
    tagline: 'The knowledge and skill to be an informed consumer throughout life',
    iconName: 'BookOpen',
    description: 'The right to acquire the knowledge and skill to be an informed consumer throughout life. Ignorance of consumers is the primary enabler of exploitation. Platforms like NYAYAVERSE embody this right by translating obscure legal jargon into actionable digital power.',
    statutoryBasis: 'Section 2(9)(vi) of the Consumer Protection Act, 2019 ("Jago Grahak Jago" Mandate)',
    realWorldScenario: {
      situation: 'A predatory loan app charges 120% APR hidden under daily service processing fees.',
      trap: 'Concealing the effective annual percentage rate (APR) from financially vulnerable borrowers.',
      solution: 'Educated consumers demand Key Fact Statements (KFS) mandated by RBI before taking digital credit.'
    },
    landmarkCase: {
      title: 'Common Cause vs Union of India (Supreme Court Consumer Welfare Directive)',
      year: '1993',
      verdict: 'The Supreme Court mandated that consumer education must be actively disseminated through educational curriculums, mass media, and state infrastructure.'
    },
    myths: [
      {
        myth: 'Terms and conditions cannot be challenged once you click "I Agree".',
        fact: 'False. Section 2(46) of the Consumer Protection Act 2019 specifically empowers courts to strike down unconscionable and unfair contract terms.'
      },
      {
        myth: 'Consumer court cases take 10 years just like civil suits.',
        fact: 'False. Consumer forums are summary tribunals designed for speedy disposal, and e-Daakhil allows instant virtual hearings from home.'
      }
    ]
  }
];
