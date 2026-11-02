import { Language } from '../types';

export const translations = {
  en: {
    brand: 'NYAYAVERSE',
    tagline: 'DETECT. DEFEND. DEMAND JUSTICE.',
    vision: 'Every consumer deserves to know the truth before losing their money.',
    heroHeadline: 'THE NEXT TIME SOMEONE TRIES TO FOOL YOU, BE READY.',
    heroSubtitle: 'Your money. Your rights. Your power. One intelligent platform to detect consumer exploitation and fight back.',
    searchPlaceholder: 'What happened to you today? (e.g. Overcharged, refund denied, fake product)',
    startInvestigation: 'Start Investigation',
    exploreRights: 'Explore Your Rights',
    threatMonitor: 'LIVE CONSUMER THREAT MONITOR',
    protectionScore: 'Consumer Protection Score',
    totalReported: 'Total Reported Incidents (Demo)',
    moneySaved: 'Simulated Consumer Savings',
    nav: {
      home: 'Command Centre',
      truthScanner: 'Truth Scanner',
      nyayaAi: 'AI Investigator',
      courtroom: 'AI Courtroom',
      radar: 'Consumer Radar',
      scamSurvival: 'Scam Survival',
      moneyDetective: 'Money Detective',
      complaints: 'Justice 60s',
      rights: 'Rights Universe',
      dashboard: 'Dashboard',
    },
    threatStatus: {
      simulatedNotice: 'Simulated Real-Time Threat Intelligence Feed (India)',
    },
    quickSuggestions: [
      { text: 'I was charged more than MRP', tab: 'money-detective' },
      { text: 'I received a fake product', tab: 'truth-scanner' },
      { text: 'My refund was rejected', tab: 'nyaya-ai' },
      { text: 'I fell for a fake discount', tab: 'scam-survival' },
      { text: 'A company is misleading me', tab: 'courtroom' },
    ],
    officialHelpline: 'National Consumer Helpline: 1915',
  },
  hi: {
    brand: 'न्यायावर्स',
    tagline: 'पहचानें। रक्षा करें। न्याय मांगें।',
    vision: 'हर उपभोक्ता को अपना पैसा खोने से पहले सच जानने का अधिकार है।',
    heroHeadline: 'अगली बार जब कोई आपको धोखा देने की कोशिश करे, तो तैयार रहें।',
    heroSubtitle: 'आपका पैसा। आपके अधिकार। आपकी शक्ति। उपभोक्ता शोषण को पकड़ने और लड़ने का एक शक्तिशाली एआई मंच।',
    searchPlaceholder: 'आज आपके साथ क्या हुआ? (जैसे एमआरपी से ज्यादा वसूली, रिफंड नहीं मिला, नकली सामान)',
    startInvestigation: 'जांच शुरू करें',
    exploreRights: 'अपने अधिकार जानें',
    threatMonitor: 'लाइव उपभोक्ता खतरा मॉनिटर',
    protectionScore: 'उपभोक्ता सुरक्षा स्कोर',
    totalReported: 'कुल दर्ज मामले (डेमो डेटा)',
    moneySaved: 'बचत अनुमान (अनुकरण डेटा)',
    nav: {
      home: 'कमांड सेंटर',
      truthScanner: 'ट्रुथ स्कैनर',
      nyayaAi: 'न्याय एआई',
      courtroom: 'एआई अदालत',
      radar: 'कंज्यूमर रडार',
      scamSurvival: 'स्कैम सर्वाइवल',
      moneyDetective: 'मनी डिटेक्टिव',
      complaints: '60 सेकंड न्याय',
      rights: 'अधिकार ब्रह्मांड',
      dashboard: 'डैशबोर्ड',
    },
    threatStatus: {
      simulatedNotice: 'सिम्युलेटेड रियल-टाइम थ्रेट इंटेलिजेंस फीड (भारत)',
    },
    quickSuggestions: [
      { text: 'मुझसे MRP से अधिक शुल्क लिया गया', tab: 'money-detective' },
      { text: 'मुझे नकली उत्पाद प्राप्त हुआ', tab: 'truth-scanner' },
      { text: 'मेरा रिफंड खारिज कर दिया गया', tab: 'nyaya-ai' },
      { text: 'मैं फर्जी छूट के झांसे में आ गया', tab: 'scam-survival' },
      { text: 'कंपनी भ्रामक विज्ञापन दे रही है', tab: 'courtroom' },
    ],
    officialHelpline: 'राष्ट्रीय उपभोक्ता हेल्पलाइन: 1915',
  }
};

export function getTranslation(lang: Language) {
  return translations[lang] || translations.en;
}
