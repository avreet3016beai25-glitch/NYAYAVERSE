import React, { useState } from 'react';
import { NavTab, Language, Theme } from '../types';
import { sound } from '../services/sound';
import { 
  Shield, 
  Volume2, 
  VolumeX, 
  Search, 
  Sparkles, 
  Settings, 
  BookOpen, 
  HelpCircle,
  Gavel,
  MapPin,
  Flame,
  Award,
  Sun,
  Moon,
  Phone,
  Eye,
  FileText,
  BarChart3,
  Bot
} from './icons';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  language: Language;
  onToggleLanguage: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenCommandPalette: () => void;
  onOpenDailyChallenge: () => void;
  onOpenSettings: () => void;
  onOpenOfficialResources: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  language,
  onToggleLanguage,
  theme,
  onToggleTheme,
  soundEnabled,
  onToggleSound,
  onOpenCommandPalette,
  onOpenDailyChallenge,
  onOpenSettings,
  onOpenOfficialResources,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavTab; labelEn: string; labelHi: string }[] = [
    { id: 'home', labelEn: 'Overview', labelHi: 'होम' },
    { id: 'truth-scanner', labelEn: 'Truth Scanner', labelHi: 'ट्रुथ स्कैनर' },
    { id: 'courtroom', labelEn: 'AI Courtroom', labelHi: 'एआई अदालत' },
    { id: 'radar', labelEn: 'Consumer Radar', labelHi: 'कंज्यूमर रडार' },
    { id: 'scam-survival', labelEn: 'Scam Arena', labelHi: 'स्कैम गेम' },
    { id: 'money-detective', labelEn: 'Money Detective', labelHi: 'मनी डिटेक्टिव' },
    { id: 'complaint-generator', labelEn: 'Notice in 60s', labelHi: '60s न्याय' },
    { id: 'rights', labelEn: 'Rights Guide', labelHi: 'अधिकार' },
    { id: 'dashboard', labelEn: 'Dashboard', labelHi: 'डैशबोर्ड' },
  ];

  const handleNav = (tab: NavTab) => {
    sound.playClick();
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF7F2]/95 dark:bg-[#090D16]/95 border-b border-stone-200/80 dark:border-slate-800 backdrop-blur-md transition-colors duration-200">
      {/* Top minimal helpline strip */}
      <div className="bg-[#F0ECE1] dark:bg-slate-900/90 border-b border-stone-200 dark:border-slate-800/80 px-4 py-1.5 text-[11px] text-stone-600 dark:text-stone-300 flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-6xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span className="font-semibold text-stone-900 dark:text-stone-100">THINK 2 BUILD HACKATHON 2026</span>
            <span className="hidden sm:inline text-stone-400 dark:text-slate-500">•</span>
            <span className="hidden sm:inline text-stone-600 dark:text-stone-400">National Consumer Protection AI Platform</span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenOfficialResources}
              className="text-stone-700 dark:text-stone-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-semibold flex items-center gap-1.5 transition"
            >
              <Phone size={12} className="text-emerald-600" />
              <span>NCH Helpline 1915</span>
            </button>

            <button
              onClick={onOpenDailyChallenge}
              className="hidden md:flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 hover:bg-amber-500/20 text-[10px] font-semibold transition"
            >
              <Sparkles size={11} className="text-amber-500" />
              <span>Daily Challenge (+50 XP)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo & Brand (Clean & Minimal) */}
          <div 
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-sm transition-transform group-hover:scale-105">
              <Shield size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight text-stone-900 dark:text-white">
                  NYAYAVERSE
                </span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300">
                  AI
                </span>
              </div>
              <p className="text-[10px] font-medium tracking-wider text-stone-500 dark:text-stone-400 uppercase">
                {language === 'hi' ? 'उपभोक्ता न्याय मंच' : 'Consumer Justice'}
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    active
                      ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-sm'
                      : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <span>{language === 'hi' ? item.labelHi : item.labelEn}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search */}
            <button
              onClick={() => { sound.playClick(); onOpenCommandPalette(); }}
              className="p-2 sm:px-3 sm:py-2 rounded-full border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-600 dark:text-stone-300 hover:border-stone-400 text-xs font-medium transition flex items-center gap-1.5 shadow-sm"
              title="Search and Jump (Ctrl + K)"
            >
              <Search size={14} />
              <span className="hidden xl:inline">Search</span>
            </button>

            {/* Language Toggle */}
            <button
              onClick={() => { sound.playClick(); onToggleLanguage(); }}
              className="px-2.5 py-1.5 rounded-full border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-800 dark:text-stone-200 text-xs font-bold transition shadow-sm hover:border-stone-400"
              title="Switch Language / भाषा बदलें"
            >
              {language === 'en' ? 'हिन्दी' : 'EN'}
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={() => { sound.playClick(); onToggleTheme(); }}
              className="p-2 rounded-full border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-700 dark:text-stone-300 hover:border-stone-400 text-xs transition shadow-sm"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-stone-700" />}
            </button>

            {/* Sound Toggle */}
            <button
              onClick={onToggleSound}
              className="p-2 rounded-full border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-700 dark:text-stone-300 hover:border-stone-400 text-xs transition shadow-sm"
              title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
            >
              {soundEnabled ? <Volume2 size={15} className="text-emerald-600" /> : <VolumeX size={15} className="text-stone-400" />}
            </button>

            {/* Settings */}
            <button
              onClick={() => { sound.playClick(); onOpenSettings(); }}
              className="p-2 rounded-full border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-700 dark:text-stone-300 hover:border-stone-400 text-xs transition shadow-sm"
              title="Settings"
            >
              <Settings size={15} />
            </button>

            {/* Primary Action Button (Matches the top-right DONATE pill button in reference image) */}
            <button
              onClick={() => handleNav('truth-scanner')}
              className="hidden sm:flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#10b981] hover:bg-[#059669] text-white text-xs font-semibold tracking-wider uppercase shadow-sm hover:shadow transition-all"
            >
              <Eye size={14} />
              <span>Start Scan</span>
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full border border-stone-200 dark:border-slate-700 text-stone-700 dark:text-stone-300"
              aria-label="Toggle navigation menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`h-0.5 w-full bg-stone-800 dark:bg-stone-200 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`h-0.5 w-full bg-stone-800 dark:bg-stone-200 transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`h-0.5 w-full bg-stone-800 dark:bg-stone-200 transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 dark:border-slate-800 bg-[#FAF7F2] dark:bg-[#090D16] px-4 pt-4 pb-6 space-y-2 shadow-xl">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`p-2.5 rounded-xl text-xs font-semibold text-left transition ${
                  currentTab === item.id
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                    : 'bg-white dark:bg-slate-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-slate-700'
                }`}
              >
                <span>{language === 'hi' ? item.labelHi : item.labelEn}</span>
              </button>
            ))}
          </div>
          <div className="pt-3 border-t border-stone-200 dark:border-slate-800 flex justify-between items-center text-xs">
            <button onClick={onOpenDailyChallenge} className="text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
              <Sparkles size={14} /> Daily Challenge (+50 XP)
            </button>
            <button onClick={onOpenOfficialResources} className="text-emerald-700 dark:text-emerald-400 font-bold underline">
              NCH Helpline 1915
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
