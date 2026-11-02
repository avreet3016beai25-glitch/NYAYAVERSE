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
  Moon
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

  const navItems: { id: NavTab; labelEn: string; labelHi: string; icon: string }[] = [
    { id: 'home', labelEn: 'Command Centre', labelHi: 'कमांड सेंटर', icon: 'Shield' },
    { id: 'truth-scanner', labelEn: 'Truth Scanner', labelHi: 'ट्रुथ स्कैनर', icon: 'Search' },
    { id: 'nyaya-ai', labelEn: 'AI Investigator', labelHi: 'न्याय एआई', icon: 'Bot' },
    { id: 'courtroom', labelEn: 'AI Courtroom', labelHi: 'एआई अदालत', icon: 'Gavel' },
    { id: 'radar', labelEn: 'Consumer Radar', labelHi: 'कंज्यूमर रडार', icon: 'MapPin' },
    { id: 'scam-survival', labelEn: 'Scam Survival', labelHi: 'स्कैम गेम', icon: 'Flame' },
    { id: 'money-detective', labelEn: 'Money Detective', labelHi: 'मनी डिटेक्टिव', icon: 'BarChart' },
    { id: 'complaint-generator', labelEn: 'Justice in 60s', labelHi: '60s न्याय', icon: 'FileText' },
    { id: 'rights', labelEn: 'Rights Universe', labelHi: 'अधिकार', icon: 'BookOpen' },
    { id: 'dashboard', labelEn: 'Dashboard', labelHi: 'डैशबोर्ड', icon: 'Award' },
  ];

  const handleNav = (tab: NavTab) => {
    sound.playClick();
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-cyan-500/20 bg-[#030712]/90 backdrop-blur-md">
      {/* Top micro-banner */}
      <div className="bg-gradient-to-r from-cyan-950/60 via-blue-950/40 to-purple-950/60 px-4 py-1 text-xs text-slate-300 border-b border-cyan-500/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="font-mono text-cyan-300 font-medium">THINK 2 BUILD HACKATHON 2026</span>
          <span className="hidden sm:inline text-slate-400">| National Consumer Protection AI Initiative</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenOfficialResources}
            className="text-xs text-cyan-400 hover:text-cyan-200 underline flex items-center gap-1 transition"
          >
            <span>Govt Helpline: 1915</span>
          </button>
          <button
            onClick={onOpenDailyChallenge}
            className="hidden md:flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 text-[11px] transition"
          >
            <Sparkles size={12} className="text-amber-400" />
            <span>Daily Challenge +50 XP</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-purple-600/30 border border-cyan-400/40 shadow-[0_0_15px_rgba(0,242,254,0.3)] group-hover:shadow-[0_0_25px_rgba(0,242,254,0.6)] transition-all">
              <Shield size={22} className="text-cyan-400 transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 rounded-xl border border-cyan-400/30 animate-pulse"></div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-xl tracking-wider bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                  NYAYAVERSE
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  AI v2.6
                </span>
              </div>
              <p className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                {language === 'hi' ? 'पहचानें • रक्षा करें • न्याय' : 'Detect • Defend • Demand'}
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    active
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(0,242,254,0.2)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
                  }`}
                >
                  <span>{language === 'hi' ? item.labelHi : item.labelEn}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Tools & Toggles */}
          <div className="flex items-center gap-2">
            {/* Command Palette Button */}
            <button
              onClick={() => { sound.playClick(); onOpenCommandPalette(); }}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 text-xs transition font-mono"
              title="Search and Jump (Ctrl + K)"
            >
              <Search size={14} className="text-cyan-400" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden md:inline text-[10px] px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">⌘K</kbd>
            </button>

            {/* Language Toggle (EN / HI) */}
            <button
              onClick={() => { sound.playClick(); onToggleLanguage(); }}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 text-xs font-mono font-semibold transition"
              title="Switch Language / भाषा बदलें"
            >
              {language === 'en' ? 'हिन्दी' : 'EN'}
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={() => { sound.playClick(); onToggleTheme(); }}
              className="p-2 rounded-lg bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 text-xs transition"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-blue-500" />}
            </button>

            {/* Sound Toggle */}
            <button
              onClick={onToggleSound}
              className="p-2 rounded-lg bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 text-xs transition"
              title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
            >
              {soundEnabled ? <Volume2 size={16} className="text-cyan-400" /> : <VolumeX size={16} className="text-slate-500" />}
            </button>

            {/* Settings Modal */}
            <button
              onClick={() => { sound.playClick(); onOpenSettings(); }}
              className="p-2 rounded-lg bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 text-xs transition"
              title="AI & Platform Settings"
            >
              <Settings size={16} className="text-slate-400 hover:text-cyan-300" />
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-cyan-300"
            >
              <span className="sr-only">Open menu</span>
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`h-0.5 w-full bg-cyan-400 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`h-0.5 w-full bg-cyan-400 transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`h-0.5 w-full bg-cyan-400 transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-cyan-500/20 bg-[#030712]/95 px-4 pt-3 pb-6 space-y-1.5 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`p-2.5 rounded-lg text-xs font-medium text-left transition flex items-center gap-2 ${
                  currentTab === item.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50'
                    : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>{language === 'hi' ? item.labelHi : item.labelEn}</span>
              </button>
            ))}
          </div>
          <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
            <button onClick={onOpenDailyChallenge} className="text-amber-400 flex items-center gap-1">
              <Sparkles size={14} /> Daily Challenge (+50 XP)
            </button>
            <button onClick={onOpenOfficialResources} className="text-cyan-400 underline">
              Official Helpline 1915
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
