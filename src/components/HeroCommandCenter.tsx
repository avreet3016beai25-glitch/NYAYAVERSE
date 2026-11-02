import React, { useState } from 'react';
import { NavTab, Language } from '../types';
import { sound } from '../services/sound';
import { 
  Shield, 
  Search, 
  Scale, 
  ArrowUpRight, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  Eye, 
  Award,
  AlertTriangle,
  Play,
  Gavel,
  MapPin,
  Flame,
  FileText,
  ChevronRight,
  Phone,
  ArrowDown,
  BarChart3,
  Bot,
  BookOpen
} from './icons';

interface HeroCommandCenterProps {
  onNavigate: (tab: NavTab, initialQuery?: string) => void;
  language: Language;
  onOpenDailyChallenge: () => void;
}

export const HeroCommandCenter: React.FC<HeroCommandCenterProps> = ({
  onNavigate,
  language,
  onOpenDailyChallenge,
}) => {
  const [activeScenario, setActiveScenario] = useState<number>(0);

  const scenarios = [
    {
      id: 0,
      icon: '🥤',
      label: language === 'hi' ? 'MRP से अधिक शुल्क' : 'Charged above MRP',
      title: language === 'hi' ? 'होटल, कैफे या हवाई अड्डे पर MRP से अधिक वसूली?' : 'Charged above printed MRP on water or snacks at an airport or cafe?',
      violation: language === 'hi' ? 'विधिक मापविज्ञान नियम 18(2) एवं उपभोक्ता संरक्षण अधिनियम धारा 2(47)' : 'Legal Metrology (Packaged Commodities) Rule 18(2) & CPA 2019 Sec 2(47)',
      analysis: language === 'hi' 
        ? 'पैक्ड सामान (जैसे सीलबंद पानी, कोल्ड ड्रिंक) पर प्रिंटेड MRP से एक भी रुपया अतिरिक्त लेना गैरकानूनी है। कोई भी सेवा शुल्क या कूलिंग चार्ज इस पर लागू नहीं हो सकता।'
        : 'Charging even ₹1 above the printed MRP on pre-packaged goods (sealed water bottles, beverages, snacks) is strictly illegal under Indian law. No service charge, chilling surcharge, or airport markup is legally permitted.',
      remedy: language === 'hi' ? '100% अतिरिक्त राशि की वापसी + ₹10,000 तक का हर्जाना' : 'Full refund of excess amount + statutory compensation up to ₹10,000',
      actionTab: 'money-detective' as NavTab,
      actionText: language === 'hi' ? 'मनी डिटेक्टिव खोलें' : 'Calculate Illegal Markup',
      secondaryTab: 'complaint-generator' as NavTab,
      secondaryText: language === 'hi' ? '60 सेकंड में नोटिस बनाएं' : 'Draft Legal Notice'
    },
    {
      id: 1,
      icon: '📦',
      label: language === 'hi' ? 'नकली उत्पाद / रिफंड अस्वीकार' : 'Fake item / Refund denied',
      title: language === 'hi' ? 'ई-कॉमर्स प्लेटफॉर्म ने नकली माल दिया या रिटर्न से इनकार किया?' : 'Received a counterfeit, damaged, or wrong item and return was denied?',
      violation: language === 'hi' ? 'उपभोक्ता संरक्षण अधिनियम धारा 2(11) (सेवा में कमी) एवं 2(47)' : 'CPA 2019 Section 2(11) (Deficiency in Service) & Section 2(47)',
      analysis: language === 'hi'
        ? 'ई-कॉमर्स नियम 2020 के तहत विक्रेता और प्लेटफॉर्म दोनों भ्रामक या दोषपूर्ण उत्पाद के लिए उत्तरदायी हैं। "नो रिटर्न पॉलिसी" दोषपूर्ण सामान पर लागू नहीं हो सकती।'
        : 'Under CPA 2019 and E-Commerce Rules 2020, sellers and marketplace platforms are strictly liable for defective, counterfeit, or unsealed goods. Blanket "No Return" clauses are legally void when goods are substandard.',
      remedy: language === 'hi' ? 'पूर्ण उत्पाद वापसी या प्रतिस्थापन + मानसिक उत्पीड़न का मुआवजा' : 'Immediate replacement or full refund + compensation for harassment',
      actionTab: 'truth-scanner' as NavTab,
      actionText: language === 'hi' ? 'ट्रुथ स्कैनर में जांचें' : 'Scan Invoice & Product Photo',
      secondaryTab: 'nyaya-ai' as NavTab,
      secondaryText: language === 'hi' ? 'न्याय एआई से पूछें' : 'Consult Nyaya AI'
    },
    {
      id: 2,
      icon: '⏳',
      label: language === 'hi' ? 'फर्जी छूट व ड्रिप प्राइसिंग' : 'Fake discounts & drip pricing',
      title: language === 'hi' ? 'नकली उलटी गिनती (Fake Countdown) या चेकआउट पर छुपे शुल्क?' : 'Misled by fake countdown timers or hidden fees sneaked at checkout?',
      violation: language === 'hi' ? 'CCPA डार्क पैटर्न दिशानिर्देश 2023 (False Urgency & Drip Pricing)' : 'CCPA Guidelines for Prevention of Dark Patterns 2023 (False Urgency & Drip Pricing)',
      analysis: language === 'hi'
        ? 'नकली टाइमर चलाकर जल्दबाजी पैदा करना या सर्च में कम कीमत दिखाकर पेमेंट पर मनमाने अतिरिक्त शुल्क जोड़ना केंद्र सरकार द्वारा प्रतिबंधित डार्क पैटर्न है।'
        : 'Artificial countdown clocks resetting on refresh and hidden pre-ticked add-ons (insurance, convience fees, seat charges) are classified as illegal Dark Patterns by CCPA, carrying fines up to ₹10 Lakhs.',
      remedy: language === 'hi' ? 'अनुचित शुल्क की वापसी + CCPA में शिकायत दर्ज' : 'Direct refund of sneaked charges + CCPA regulatory complaint',
      actionTab: 'scam-survival' as NavTab,
      actionText: language === 'hi' ? 'स्कैम एरिना में डार्क पैटर्न पहचानें' : 'Test in Scam Survival Arena',
      secondaryTab: 'money-detective' as NavTab,
      secondaryText: language === 'hi' ? 'वास्तविक छूट गणना' : 'Verify Real Discount'
    },
    {
      id: 3,
      icon: '💳',
      label: language === 'hi' ? 'अनचाहे सब्सक्रिप्शन' : 'Unwanted subscriptions',
      title: language === 'hi' ? 'ऐप या जिम सदस्यता रद्द करने के बाद भी खाते से पैसे कट गए?' : 'Charged recurring subscription fees after cancellation or free trial?',
      violation: language === 'hi' ? 'CCPA सब्सक्रिप्शन ट्रैप एवं RBI आवर्ती भुगतान दिशानिर्देश' : 'CCPA Subscription Trap Rules & RBI E-Mandate Directives',
      analysis: language === 'hi'
        ? 'रद्द करने की प्रक्रिया को जानबूझकर जटिल बनाना या सहमति के बिना कार्ड से पैसे काटना प्रतिबंधित है। ग्राहक को पूर्व-अधिसूचना के बिना कोई शुल्क नहीं काटा जा सकता।'
        : 'Hiding the cancellation link behind tedious hurdles or charging after cancellation constitutes an illegal "Subscription Trap" under CCPA 2023 and violates RBI recurring transaction rules.',
      remedy: language === 'hi' ? 'अवैध कटौती की 100% रिवर्सल + बैंक चार्जबैक' : 'Immediate 100% charge reversal + formal bank chargeback dispute',
      actionTab: 'complaint-generator' as NavTab,
      actionText: language === 'hi' ? '15-दिवसीय कानूनी नोटिस बनाएं' : 'Draft 15-Day Legal Notice',
      secondaryTab: 'nyaya-ai' as NavTab,
      secondaryText: language === 'hi' ? 'सबूत सुरक्षित चेकलिस्ट' : 'Preservation Checklist'
    }
  ];

  const handleAction = (tab: NavTab) => {
    sound.playClick();
    onNavigate(tab);
  };

  const scrollToSection = (id: string) => {
    sound.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      {/* 1. HERO SECTION (Clean, Minimal, Airy Editorial Design matching user reference) */}
      <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Top small category pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-200/60 dark:bg-slate-800/80 border border-stone-300/60 dark:border-slate-700/60 text-[11px] font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-6 sm:mb-8 transition-all hover:bg-stone-200 dark:hover:bg-slate-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{language === 'hi' ? 'अखिल भारतीय उपभोक्ता सुरक्षा मंच' : 'India\'s Consumer Justice Platform'}</span>
          <span className="text-stone-400 dark:text-slate-500">•</span>
          <span className="text-emerald-700 dark:text-emerald-400 font-mono">CPA 2019 COMPLIANT</span>
        </div>

        <div className="revolving-justice-wrap mb-7 sm:mb-9" aria-label="Rotating justice emblem">
          <div className="revolving-justice-glow"></div>
          <img
            src="/justice-orbit.svg"
            alt="Nyayaverse justice shield"
            className="revolving-justice-image"
          />
          <div className="revolving-justice-core" aria-hidden="true">
            <Scale size={24} />
          </div>
        </div>

        {/* The Signature Big Editorial Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[102px] font-black tracking-tight leading-[1.08] text-stone-900 dark:text-stone-100 max-w-5xl">
          <span>Consumer</span>{' '}
          <span className="inline-flex items-center align-middle mx-1.5 sm:mx-3 relative group">
            <span className="relative inline-flex items-center justify-center w-28 sm:w-40 md:w-52 lg:w-64 h-12 sm:h-16 md:h-20 lg:h-24 rounded-full overflow-hidden shadow-lg border-2 border-stone-800/10 dark:border-white/20 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white select-none transition-transform duration-300 group-hover:scale-105">
              {/* Decorative inner elements */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/30 via-transparent to-black/30 pointer-events-none"></div>
              <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 z-10">
                <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
                  <Scale size={20} className="sm:w-6 sm:h-6 text-amber-300" />
                </div>
                <div className="text-left hidden xs:block">
                  <div className="text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider text-emerald-100 flex items-center gap-1">
                    <span>100% LEGAL</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping"></span>
                  </div>
                  <div className="text-[9px] sm:text-[11px] md:text-xs font-medium text-white/90">
                    Citizen Shield
                  </div>
                </div>
              </div>
            </span>
          </span>{' '}
          <span>Justice</span>
          <br />
          <span className="block mt-2 sm:mt-3 text-stone-900 dark:text-white">
            {language === 'hi' ? 'आपका संवैधानिक अधिकार' : 'is Your Right'}
          </span>
        </h1>

        {/* Clear, reassuring value proposition that explains the entire site */}
        <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-stone-600 dark:text-stone-300 max-w-2xl font-normal leading-relaxed">
          {language === 'hi' 
            ? 'भारत का पहला समग्र उपभोक्ता न्याय प्लेटफॉर्म। अनुचित मूल्य निर्धारण पहचानें, फर्जी छूट व डार्क पैटर्न बेनकाब करें, वर्चुअल कोर्ट ट्रायल में अपने अधिकारों को समझें, और 60 सेकंड में कानूनी नोटिस तैयार करें।'
            : 'India\'s unified consumer protection intelligence platform. Detect deceptive pricing, unmask dark patterns, adjudicate simulated dispute trials, and generate court-ready legal notices under the Consumer Protection Act, 2019 — in under 60 seconds.'}
        </p>

        {/* Pill Action Buttons (Matching reference image) */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={() => handleAction('truth-scanner')}
            className="px-8 py-3.5 rounded-full bg-[#10b981] hover:bg-[#059669] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
          >
            <Eye size={16} />
            <span>{language === 'hi' ? 'बिल या विज्ञापन स्कैन करें' : 'Start Free Scan'}</span>
          </button>

          <button
            onClick={() => scrollToSection('what-we-do')}
            className="text-stone-800 dark:text-stone-200 text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center gap-2 hover:opacity-80 transition group"
          >
            <span>{language === 'hi' ? 'प्लेटफॉर्म कैसे काम करता है' : 'How Nyayaverse Works'}</span>
            <span className="w-8 h-8 rounded-full border border-stone-300 dark:border-stone-700 flex items-center justify-center group-hover:border-stone-500 dark:group-hover:border-stone-400 transition-colors">
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </button>
        </div>

        {/* Calm citizen impact metric pills */}
        <div className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-stone-500 dark:text-stone-400 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>1,482,910+ Simulated Incidents Analyzed</span>
          </div>
          <div className="hidden sm:inline text-stone-300 dark:text-stone-700">•</div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span>₹42.84 Cr Protected / Citizen Savings</span>
          </div>
          <div className="hidden sm:inline text-stone-300 dark:text-stone-700">•</div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>National Redressal Ready (NCH 1915 & e-Daakhil)</span>
          </div>
        </div>
      </section>

      {/* 2. STATUTORY TRUST BANNER STRIPE (Matching reference image logo ribbon) */}
      <div className="w-full bg-[#f2ede4] dark:bg-slate-900/80 border-y border-stone-300/60 dark:border-slate-800/80 py-4 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left badge */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400">
            <div className="w-6 h-6 rounded-full bg-stone-300/70 dark:bg-slate-800 flex items-center justify-center text-stone-700 dark:text-stone-300">
              <Shield size={13} />
            </div>
            <span>Statutory Compliance</span>
          </div>

          {/* Center statutory pillars */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-medium text-stone-700 dark:text-stone-300">
            <div className="flex items-center gap-1.5 hover:text-emerald-600 transition cursor-default">
              <Scale size={14} className="text-emerald-600" />
              <span>CPA 2019 (Act No. 35)</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-emerald-600 transition cursor-default">
              <Zap size={14} className="text-cyan-600" />
              <span>CCPA Dark Patterns 2023</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-emerald-600 transition cursor-default">
              <Phone size={14} className="text-blue-600" />
              <span>NCH Helpline 1915</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-emerald-600 transition cursor-default">
              <FileText size={14} className="text-purple-600" />
              <span>e-Daakhil Ready</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-emerald-600 transition cursor-default">
              <Award size={14} className="text-amber-600" />
              <span>Legal Metrology Act</span>
            </div>
          </div>

          {/* Right scroll down button */}
          <button
            onClick={() => scrollToSection('what-we-do')}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition group"
          >
            <span>Scroll Down</span>
            <div className="w-7 h-7 rounded-full border border-stone-400/60 dark:border-slate-700 flex items-center justify-center group-hover:border-stone-800 dark:group-hover:border-stone-300 transition-colors">
              <ArrowDown size={12} className="group-hover:translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>

      {/* 3. WHAT WE DO SECTION (The exact 3 cards layout from the reference image) */}
      <section id="what-we-do" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold tracking-wide uppercase mb-4">
            <CheckCircle2 size={13} />
            <span>What Nyayaverse Does</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-stone-900 dark:text-stone-100 leading-tight">
            {language === 'hi' 
              ? 'प्रत्येक भारतीय उपभोक्ता को सशक्त एवं सुरक्षित बनाना' 
              : 'Providing Instant Defense & Legal Power For Every Indian Shopper'}
          </h2>

          <div className="mt-4 flex items-center justify-center">
            <button
              onClick={() => scrollToSection('complete-suite')}
              className="text-stone-700 dark:text-stone-300 text-xs font-semibold tracking-wider uppercase flex items-center gap-2 hover:opacity-80 transition group"
            >
              <span>{language === 'hi' ? 'सभी 8 सुविधाओं को देखें' : 'Learn More About Features'}</span>
              <span className="w-6 h-6 rounded-full border border-stone-300 dark:border-stone-700 flex items-center justify-center">
                <ArrowUpRight size={12} />
              </span>
            </button>
          </div>
        </div>

        {/* 3 Spacious Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1 */}
          <div className="rounded-[32px] bg-white dark:bg-slate-900/90 border border-stone-200/90 dark:border-slate-800 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-slate-800 flex items-center justify-center text-stone-800 dark:text-stone-200 mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                <Search size={22} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 mb-3 tracking-tight">
                {language === 'hi' ? 'सबूत व धोखाधड़ी जांचें' : 'Detect & Scan Evidence'}
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                {language === 'hi'
                  ? 'खरीदारी के बिल, स्क्रीनशॉट या विज्ञापन अपलोड करें। कंप्यूटर विज़न स्कैनर छुपी हुई ड्रिप प्राइसिंग, अवैध MRP मार्कअप और फर्जी छूट टाइमर को तुरंत पकड़ता है।'
                  : 'Upload shopping bills, restaurant receipts, product labels, or flash sale screenshots. Our forensic engine identifies illegal MRP markups, hidden drip pricing, and fake countdowns with exact legal sections.'}
              </p>
            </div>

            <div className="pt-8 mt-6 border-t border-stone-100 dark:border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 dark:text-stone-400">
                <span className="px-2.5 py-1 rounded-full bg-stone-100 dark:bg-slate-800 text-[11px]">#TruthScanner</span>
                <span className="hidden sm:inline px-2.5 py-1 rounded-full bg-stone-100 dark:bg-slate-800 text-[11px]">#CPA2019</span>
              </div>
              <button
                onClick={() => handleAction('truth-scanner')}
                aria-label="Launch Truth Scanner"
                className="w-10 h-10 rounded-full border border-stone-300 dark:border-slate-700 flex items-center justify-center text-stone-800 dark:text-stone-200 group-hover:bg-[#10b981] group-hover:border-[#10b981] group-hover:text-white transition-all shadow-sm"
              >
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-[32px] bg-white dark:bg-slate-900/90 border border-stone-200/90 dark:border-slate-800 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-slate-800 flex items-center justify-center text-stone-800 dark:text-stone-200 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                <Gavel size={22} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 mb-3 tracking-tight">
                {language === 'hi' ? 'वर्चुअल अदालत में समझें' : 'Adjudicate Real Disputes'}
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                {language === 'hi'
                  ? 'एआई कोर्टरूम में न्यायाधीश बनें। 5 वास्तविक विवादों (जैसे अनबॉक्सिंग विवाद, हवाई अड्डा पानी ओवरचार्ज) की सुनवाई करें, साक्ष्य देखें और हथौड़ा चलाकर फैसला दें।'
                  : 'Take the bench in our interactive AI Courtroom. Preside over 5 realistic disputes, examine evidence exhibits, cross-examine seller defenses, strike the virtual gavel, and learn actual court precedents.'}
              </p>
            </div>

            <div className="pt-8 mt-6 border-t border-stone-100 dark:border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 dark:text-stone-400">
                <span className="px-2.5 py-1 rounded-full bg-stone-100 dark:bg-slate-800 text-[11px]">#AICourtroom</span>
                <span className="hidden sm:inline px-2.5 py-1 rounded-full bg-stone-100 dark:bg-slate-800 text-[11px]">#Precedents</span>
              </div>
              <button
                onClick={() => handleAction('courtroom')}
                aria-label="Open AI Courtroom"
                className="w-10 h-10 rounded-full border border-stone-300 dark:border-slate-700 flex items-center justify-center text-stone-800 dark:text-stone-200 group-hover:bg-purple-600 group-hover:border-purple-600 group-hover:text-white transition-all shadow-sm"
              >
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-[32px] bg-white dark:bg-slate-900/90 border border-stone-200/90 dark:border-slate-800 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-slate-800 flex items-center justify-center text-stone-800 dark:text-stone-200 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <FileText size={22} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 mb-3 tracking-tight">
                {language === 'hi' ? '60 सेकंड में नोटिस बनाएं' : 'Generate Legal Notices'}
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                {language === 'hi'
                  ? 'उपभोक्ता संरक्षण अधिनियम 2019 की सटीक धाराओं के साथ पेशेवर प्री-मुकदमा कानूनी नोटिस और जिला आयोग (DCDRC) की शिकायत 60 सेकंड में तैयार करें।'
                  : 'Turn commercial exploitation into enforceable legal demand. Compose court-ready pre-litigation notices and DCDRC consumer commission complaints citing operative sections 2(47), 2(11), and 84-87.'}
              </p>
            </div>

            <div className="pt-8 mt-6 border-t border-stone-100 dark:border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 dark:text-stone-400">
                <span className="px-2.5 py-1 rounded-full bg-stone-100 dark:bg-slate-800 text-[11px]">#NoticeIn60s</span>
                <span className="hidden sm:inline px-2.5 py-1 rounded-full bg-stone-100 dark:bg-slate-800 text-[11px]">#eDaakhil</span>
              </div>
              <button
                onClick={() => handleAction('complaint-generator')}
                aria-label="Open Complaint Generator"
                className="w-10 h-10 rounded-full border border-stone-300 dark:border-slate-700 flex items-center justify-center text-stone-800 dark:text-stone-200 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all shadow-sm"
              >
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. "WHAT HAPPENED TO YOU?" INTERACTIVE GRIEVANCE SELECTOR (Instant clarity on how the site helps right now) */}
      <section className="py-16 sm:py-24 bg-stone-100/60 dark:bg-slate-900/40 border-y border-stone-200/80 dark:border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200/70 dark:bg-slate-800 text-stone-700 dark:text-stone-300 text-xs font-semibold tracking-wide uppercase mb-3">
              <Sparkles size={13} className="text-amber-500" />
              <span>Instant Grievance Resolver</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
              {language === 'hi' ? 'आज आपके साथ क्या अनुचित हुआ?' : 'What Happened To You Today?'}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
              {language === 'hi' ? 'अपनी समस्या चुनें और तुरंत भारतीय कानून के तहत उपाय व कानूनी कदम प्राप्त करें' : 'Select your common grievance to discover the exact legal remedy under Indian statutes'}
            </p>
          </div>

          {/* Scenario Tab Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
            {scenarios.map((sc, idx) => {
              const active = activeScenario === idx;
              return (
                <button
                  key={sc.id}
                  onClick={() => { sound.playClick(); setActiveScenario(idx); }}
                  className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                    active
                      ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-md'
                      : 'bg-white dark:bg-slate-800/80 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-slate-700 hover:border-stone-400'
                  }`}
                >
                  <span>{sc.icon}</span>
                  <span>{sc.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Grievance Legal Solution Card */}
          {(() => {
            const sc = scenarios[activeScenario];
            return (
              <div className="rounded-[28px] bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm max-w-4xl mx-auto transition-all">
                <div className="flex items-start gap-4">
                  <div className="text-3xl sm:text-4xl">{sc.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                      {sc.title}
                    </h3>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs font-semibold mb-4 border border-rose-200 dark:border-rose-900/50">
                      <AlertTriangle size={13} />
                      <span>{sc.violation}</span>
                    </div>

                    <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed mb-5">
                      {sc.analysis}
                    </p>

                    <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/40 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                        <div>
                          <span className="font-bold">Your Statutory Remedy: </span>
                          <span>{sc.remedy}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => handleAction(sc.actionTab)}
                        className="px-6 py-2.5 rounded-full bg-[#10b981] hover:bg-[#059669] text-white text-xs font-semibold tracking-wider uppercase shadow transition-all flex items-center gap-2"
                      >
                        <span>{sc.actionText}</span>
                        <ArrowUpRight size={14} />
                      </button>

                      <button
                        onClick={() => handleAction(sc.secondaryTab)}
                        className="px-6 py-2.5 rounded-full bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-stone-800 dark:text-stone-200 text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2"
                      >
                        <span>{sc.secondaryText}</span>
                        <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* 5. THE COMPLETE NYAYAVERSE SUITE (Comprehensive 8-Feature Overview with zero clutter) */}
      <section id="complete-suite" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200/70 dark:bg-slate-800 text-stone-700 dark:text-stone-300 text-xs font-semibold tracking-wide uppercase mb-3">
            <Shield size={13} className="text-emerald-600" />
            <span>Complete Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
            {language === 'hi' ? 'न्यायवर्स का संपूर्ण रक्षा तंत्र' : 'The Complete Nyayaverse Suite'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-400">
            {language === 'hi'
              ? 'जांच, साक्ष्य विश्लेषण, वर्चुअल ट्रायल, वित्तीय फोरेंसिक और कानूनी नोटिस - सब कुछ एक ही मंच पर।'
              : 'Every tool an Indian citizen needs to uncover commercial malpractice, calculate damages, and enforce legal accountability.'}
          </p>
        </div>

        {/* 8 Features Clean Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Feature 1 */}
          <div 
            onClick={() => handleAction('truth-scanner')}
            className="p-6 rounded-[24px] bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 hover:border-emerald-500/50 hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Search size={20} />
              </div>
              <div className="text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-wider mb-1">Tool 01</div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2">Truth Scanner AI</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Computer vision scanner for receipts, food labels, contracts, and flash sale discounts with risk ratings.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-stone-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-600">
              <span>Launch Scanner</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Feature 2 */}
          <div 
            onClick={() => handleAction('nyaya-ai')}
            className="p-6 rounded-[24px] bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 hover:border-cyan-500/50 hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Bot size={20} />
              </div>
              <div className="text-[10px] font-mono text-cyan-600 font-bold uppercase tracking-wider mb-1">Tool 02</div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2">Nyaya AI Assistant</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Conversational legal adviser with hands-free voice recognition, Indian statutes, and evidence preservation checklists.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-stone-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-cyan-600">
              <span>Consult AI</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Feature 3 */}
          <div 
            onClick={() => handleAction('courtroom')}
            className="p-6 rounded-[24px] bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 hover:border-purple-500/50 hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Gavel size={20} />
              </div>
              <div className="text-[10px] font-mono text-purple-600 font-bold uppercase tracking-wider mb-1">Tool 03</div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2">AI Courtroom Bench</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Preside as judge over 5 realistic trials, scrutinize evidence exhibits, strike the gavel, and issue enforceable orders.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-stone-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-purple-600">
              <span>Take The Bench</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Feature 4 */}
          <div 
            onClick={() => handleAction('radar')}
            className="p-6 rounded-[24px] bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MapPin size={20} />
              </div>
              <div className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-wider mb-1">Tool 04</div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2">Consumer Radar India</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Geospatial intelligence map tracking verified overcharging hotspots, fake sellers, and anonymous citizen reporting.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-stone-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-blue-600">
              <span>Explore Radar</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Feature 5 */}
          <div 
            onClick={() => handleAction('scam-survival')}
            className="p-6 rounded-[24px] bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 hover:border-rose-500/50 hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Flame size={20} />
              </div>
              <div className="text-[10px] font-mono text-rose-600 font-bold uppercase tracking-wider mb-1">Tool 05</div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2">Scam Survival Arena</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Interactive predatory e-commerce simulator with ₹10,000 wallet, timer, and 7 huntable dark pattern traps.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-stone-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-rose-600">
              <span>Play Game</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Feature 6 */}
          <div 
            onClick={() => handleAction('money-detective')}
            className="p-6 rounded-[24px] bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 hover:border-amber-500/50 hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 size={20} />
              </div>
              <div className="text-[10px] font-mono text-amber-600 font-bold uppercase tracking-wider mb-1">Tool 06</div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2">Money Detective</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Forensic calculator unmasking bogus discounts, delivery markups, surge fees, and comparing base prices.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-stone-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-amber-600">
              <span>Calculate Fees</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Feature 7 */}
          <div 
            onClick={() => handleAction('complaint-generator')}
            className="p-6 rounded-[24px] bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 hover:border-indigo-500/50 hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText size={20} />
              </div>
              <div className="text-[10px] font-mono text-indigo-600 font-bold uppercase tracking-wider mb-1">Tool 07</div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2">Justice in 60 Seconds</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                4-step wizard composing formal pre-litigation notices and DCDRC court complaint drafts with export options.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-stone-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-indigo-600">
              <span>Generate Notice</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Feature 8 */}
          <div 
            onClick={() => handleAction('rights')}
            className="p-6 rounded-[24px] bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 hover:border-emerald-500/50 hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen size={20} />
              </div>
              <div className="text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-wider mb-1">Tool 08</div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2">Rights Universe</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Visual guide for the 6 statutory consumer rights under CPA 2019, landmark judgments, and Myth vs Fact quiz cards.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-stone-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-600">
              <span>Explore Rights</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. REAL-WORLD PROOF BREAKDOWN (Side-by-Side Reality Check) */}
      <section className="py-16 sm:py-24 bg-[#FAF7F2] dark:bg-slate-950/60 border-t border-stone-200/80 dark:border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
              {language === 'hi' ? 'वास्तविक उदाहरण: एयरपोर्ट पानी की बोतल' : 'Real-World Proof: The Airport Water Overcharge'}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
              {language === 'hi' ? 'देखें कि कैसे सामान्य व्यावसायिक धोखाधड़ी को कानूनी शक्ति में बदला जाता है' : 'How an everyday deception is dissected into a winning legal claim'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* The Unfair Commercial Practice */}
            <div className="p-7 rounded-[28px] bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-800 dark:text-rose-300 text-xs font-bold uppercase tracking-wider">
                    Commercial Malpractice
                  </span>
                  <span className="text-xs font-mono text-rose-600 font-bold">VIOLATION</span>
                </div>
                <h4 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-2">
                  Cafe charges ₹70 on ₹20 printed MRP bottle
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                  Cafe serves a sealed packaged mineral water bottle with printed MRP ₹20, but bill lists ₹70 + ₹7 service charge. Seller claims: "Airports and premium lounges are exempt from MRP laws."
                </p>
                <div className="space-y-2 text-xs text-rose-800 dark:text-rose-300 bg-white/70 dark:bg-slate-900/60 p-3.5 rounded-xl border border-rose-200/50 dark:border-rose-900/30 font-mono">
                  <div>❌ Claimed Price: ₹77.00</div>
                  <div>❌ Lawful MRP: ₹20.00</div>
                  <div>❌ Illegal Extortion: ₹57.00 per customer</div>
                </div>
              </div>
            </div>

            {/* The Nyayaverse Enforcement */}
            <div className="p-7 rounded-[28px] bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
                    Nyayaverse Resolution
                  </span>
                  <span className="text-xs font-mono text-emerald-600 font-bold">JUSTICE SERVED</span>
                </div>
                <h4 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-2">
                  Automatic Citation & Redressal Precedent
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                  Scanner detects Legal Metrology Rule 18(2) & Supreme Court ruling in <em>Federation of Hotels & Restaurants v. Union of India</em>. Over-the-counter takeaway bottles cannot exceed printed MRP anywhere in India.
                </p>
                <div className="space-y-2 text-xs text-emerald-900 dark:text-emerald-300 bg-white/70 dark:bg-slate-900/60 p-3.5 rounded-xl border border-emerald-200/50 dark:border-emerald-900/30 font-mono">
                  <div>✓ Statutory Section: CPA 2019 Sec 2(47)</div>
                  <div>✓ Ready Output: 15-day pre-litigation notice</div>
                  <div>✓ National Benchmark: ₹10,000 compensation awarded</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. OFFICIAL GOVERNMENT EMERGENCY HELPLINES */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="rounded-[32px] bg-stone-900 dark:bg-slate-900 text-stone-100 p-8 sm:p-12 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-500/30">
                <Shield size={12} />
                <span>Verified Redressal Directory</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-3">
                Need Immediate Government Escalation?
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                Nyayaverse drafts all evidence and formal notices, while seamlessly connecting you directly to official Indian statutory helplines and portals.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full md:w-auto">
              <a 
                href="tel:1915"
                className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition text-center"
              >
                <div className="text-xl sm:text-2xl font-black text-emerald-400">1915</div>
                <div className="text-[11px] font-semibold text-stone-200">National Consumer Helpline</div>
                <div className="text-[10px] text-stone-400">Toll-Free (24/7)</div>
              </a>

              <a 
                href="tel:1930"
                className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition text-center"
              >
                <div className="text-xl sm:text-2xl font-black text-cyan-400">1930</div>
                <div className="text-[11px] font-semibold text-stone-200">National Cyber Crime</div>
                <div className="text-[10px] text-stone-400">Financial Fraud Helpline</div>
              </a>

              <a 
                href="https://edaakhil.nic.in"
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition text-center"
              >
                <div className="text-sm sm:text-base font-bold text-amber-300">e-Daakhil</div>
                <div className="text-[11px] font-semibold text-stone-200">E-Filing Portal</div>
                <div className="text-[10px] text-stone-400">edaakhil.nic.in</div>
              </a>

              <a 
                href="tel:1800112100"
                className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition text-center"
              >
                <div className="text-sm sm:text-base font-bold text-rose-300">FSSAI</div>
                <div className="text-[11px] font-semibold text-stone-200">Food Safety Grievance</div>
                <div className="text-[10px] text-stone-400">1800-11-2100</div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINAL CALL TO ACTION (Inspiring & Clear) */}
      <section className="py-16 sm:py-24 text-center px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight mb-4">
          {language === 'hi' ? 'जागरूक बनें। सुरक्षित रहें। न्याय मांगें।' : 'Detect. Defend. Demand Justice.'}
        </h2>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 max-w-xl mx-auto mb-8">
          {language === 'hi'
            ? 'किसी भी उपभोक्ता को अपने हक से वंचित नहीं रहना चाहिए। आज ही किसी भी संदिग्ध बिल या प्रस्ताव की जांच करें।'
            : 'No citizen should have to lose their hard-earned money to deceptive trade practices. Expose your first deceptive bill or offer right now.'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => handleAction('truth-scanner')}
            className="px-8 py-3.5 rounded-full bg-[#10b981] hover:bg-[#059669] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-md hover:shadow-lg transition-all"
          >
            {language === 'hi' ? 'निःशुल्क स्कैनर शुरू करें' : 'Launch Truth Scanner'}
          </button>

          <button
            onClick={() => handleAction('nyaya-ai')}
            className="px-8 py-3.5 rounded-full bg-stone-200/80 hover:bg-stone-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-stone-800 dark:text-stone-200 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all flex items-center gap-2"
          >
            <span>{language === 'hi' ? 'न्याय एआई से बात करें' : 'Talk with Nyaya AI'}</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </section>
    </div>
  );
};
