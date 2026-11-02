import React from 'react';
import { NavTab } from '../types';
import { sound } from '../services/sound';
import { Shield, Scale, ExternalLink, Heart, Phone } from './icons';

interface FooterProps {
  onSelectTab: (tab: NavTab) => void;
  onOpenOfficialResources: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onOpenOfficialResources,
}) => {
  return (
    <footer className="w-full bg-[#F4EFE6] dark:bg-[#070A12] border-t border-stone-200 dark:border-slate-800/80 pt-16 pb-12 text-stone-600 dark:text-stone-400 text-xs transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand & Vision */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 flex items-center justify-center">
                <Shield size={16} />
              </div>
              <span className="font-black text-lg text-stone-900 dark:text-stone-100 tracking-tight">
                NYAYAVERSE
              </span>
            </div>
            <p className="text-[10px] font-mono uppercase text-emerald-700 dark:text-emerald-400 tracking-wider font-bold">
              DETECT. DEFEND. DEMAND JUSTICE.
            </p>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              "Every consumer deserves to know the truth before losing their money."
            </p>
            <div className="pt-2 text-[11px] font-semibold text-stone-500 dark:text-stone-500">
              Built for THINK 2 BUILD HACKATHON 2026
            </div>
          </div>

          {/* Interactive Tools */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase text-stone-900 dark:text-stone-100 tracking-wider">
              Investigation Tools
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => { sound.playClick(); onSelectTab('truth-scanner'); }} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  Truth Scanner AI
                </button>
              </li>
              <li>
                <button onClick={() => { sound.playClick(); onSelectTab('nyaya-ai'); }} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  Nyaya AI Assistant
                </button>
              </li>
              <li>
                <button onClick={() => { sound.playClick(); onSelectTab('courtroom'); }} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  AI Virtual Courtroom
                </button>
              </li>
              <li>
                <button onClick={() => { sound.playClick(); onSelectTab('radar'); }} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  Consumer Radar India
                </button>
              </li>
              <li>
                <button onClick={() => { sound.playClick(); onSelectTab('scam-survival'); }} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  Scam Survival Arena
                </button>
              </li>
            </ul>
          </div>

          {/* Statutory Redressal */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase text-stone-900 dark:text-stone-100 tracking-wider">
              Legal Redressal
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => { sound.playClick(); onSelectTab('complaint-generator'); }} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  Justice in 60s (Notice Draft)
                </button>
              </li>
              <li>
                <button onClick={() => { sound.playClick(); onSelectTab('money-detective'); }} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  Money Detective Calculator
                </button>
              </li>
              <li>
                <button onClick={() => { sound.playClick(); onSelectTab('rights'); }} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  6 Consumer Rights Universe
                </button>
              </li>
              <li>
                <button onClick={() => { sound.playClick(); onSelectTab('dashboard'); }} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  Citizen IQ Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Official Helplines */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase text-stone-900 dark:text-stone-100 tracking-wider">
              Emergency Helplines
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800">
                <span className="text-[10px] text-stone-500 block">National Consumer Helpline</span>
                <strong className="text-stone-900 dark:text-stone-100 font-bold text-sm">📞 1915 (24/7 Toll-Free)</strong>
              </div>
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800">
                <span className="text-[10px] text-stone-500 block">Cyber Crime Helpline</span>
                <strong className="text-stone-900 dark:text-stone-100 font-bold text-sm">📞 1930</strong>
              </div>
              <button
                onClick={onOpenOfficialResources}
                className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline font-semibold flex items-center gap-1 pt-1"
              >
                <span>View All 7 Government Portals →</span>
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="pt-8 border-t border-stone-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500 font-medium">
          <p>
            © 2026 NYAYAVERSE. Statutory provisions referenced under Consumer Protection Act, 2019.
          </p>
          <p className="text-stone-600 dark:text-stone-400">
            Empowering 1.4 Billion Consumers Across Bharat.
          </p>
        </div>
      </div>
    </footer>
  );
};
