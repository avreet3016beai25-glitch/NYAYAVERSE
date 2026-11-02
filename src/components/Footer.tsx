import React from 'react';
import { NavTab } from '../types';
import { sound } from '../services/sound';
import { Shield, Scale, ExternalLink, Heart } from './icons';

interface FooterProps {
  onSelectTab: (tab: NavTab) => void;
  onOpenOfficialResources: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onOpenOfficialResources,
}) => {
  return (
    <footer className="w-full glass-panel border-t border-cyan-500/20 bg-[#030712] pt-12 pb-8 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Vision */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
                <Shield size={18} />
              </div>
              <span className="font-display font-black text-lg text-white tracking-wider">
                NYAYAVERSE
              </span>
            </div>
            <p className="text-[11px] font-mono uppercase text-cyan-400 tracking-widest font-bold">
              DETECT. DEFEND. DEMAND JUSTICE.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              "Every consumer deserves to know the truth before losing their money."
            </p>
            <div className="pt-2 text-[10px] font-mono text-slate-500">
              Built for THINK 2 BUILD HACKATHON 2026
            </div>
          </div>

          {/* Interactive Tools */}
          <div className="space-y-2">
            <h4 className="font-display font-bold text-xs uppercase text-cyan-300 tracking-wider">
              Investigation Tools
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => { sound.playClick(); onSelectTab('truth-scanner'); }} className="hover:text-cyan-300 transition">
                  Truth Scanner AI
                </button>
              </li>
              <li>
                <button onClick={() => { sound.playClick(); onSelectTab('nyaya-ai'); }} className="hover:text-cyan-300 transition">
                  AI Legal Investigator
                </button>
              </li>
              <li>
                <button onClick={() => { sound.playClick(); onSelectTab('courtroom'); }} className="hover:text-cyan-300 transition">
                  AI Virtual Courtroom
                </button>
              </li>
              <li>
                <button onClick={() => { sound.playClick(); onSelectTab('radar'); }} className="hover:text-cyan-300 transition">
                  Consumer Radar India
                </button>
              </li>
              <li>
                <button onClick={() => { sound.playClick(); onSelectTab('scam-survival'); }} className="hover:text-cyan-300 transition">
                  Scam Survival Simulation
                </button>
              </li>
            </ul>
          </div>

          {/* Citizen Legal Rights */}
          <div className="space-y-2">
            <h4 className="font-display font-bold text-xs uppercase text-cyan-300 tracking-wider">
              Statutory Redressal
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => { sound.playClick(); onSelectTab('complaint-generator'); }} className="hover:text-cyan-300 transition">
                  Justice in 60s (Notice Draft)
                </button>
              </li>
              <li>
                <button onClick={() => { sound.playClick(); onSelectTab('money-detective'); }} className="hover:text-cyan-300 transition">
                  Money Detective Calculator
                </button>
              </li>
              <li>
                <button onClick={() => { sound.playClick(); onSelectTab('rights'); }} className="hover:text-cyan-300 transition">
                  6 Consumer Rights Universe
                </button>
              </li>
              <li>
                <button onClick={() => { sound.playClick(); onSelectTab('dashboard'); }} className="hover:text-cyan-300 transition">
                  Citizen IQ Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Official Resources & Helplines */}
          <div className="space-y-2">
            <h4 className="font-display font-bold text-xs uppercase text-cyan-300 tracking-wider">
              Official Indian Helplines
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-mono">National Consumer Helpline</span>
                <strong className="text-white font-mono text-sm">📞 1915</strong>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-mono">National Cyber Crime Portal</span>
                <strong className="text-white font-mono text-sm">📞 1930</strong>
              </div>
              <button
                onClick={onOpenOfficialResources}
                className="text-xs text-cyan-400 hover:text-cyan-200 underline font-mono flex items-center gap-1"
              >
                <span>View All 7 Government Portals →</span>
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <p>
            © 2026 NYAYAVERSE Technologies. All statutory provisions referenced under Consumer Protection Act, 2019.
          </p>
          <p className="text-slate-400">
            Empowering 1.4 Billion Consumers Across Bharat.
          </p>
        </div>
      </div>
    </footer>
  );
};
