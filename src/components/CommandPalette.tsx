import React, { useState, useEffect } from 'react';
import { NavTab } from '../types';
import { sound } from '../services/sound';
import { 
  Search, 
  Shield, 
  FileText, 
  Gavel, 
  MapPin, 
  Flame, 
  BarChart3, 
  BookOpen, 
  Award, 
  X,
  ChevronRight
} from './icons';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: NavTab, query?: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectTab,
}) => {
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        sound.playClick();
        if (isOpen) onClose();
        else {
          // Trigger open
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { title: 'Truth Scanner AI', subtitle: 'Analyze receipt, screenshot or ad for hidden traps', tab: 'truth-scanner' as NavTab, icon: Search },
    { title: 'AI Investigator (Nyaya AI)', subtitle: 'Diagnostic chat with Indian consumer law guidance', tab: 'nyaya-ai' as NavTab, icon: Shield },
    { title: 'AI Courtroom', subtitle: 'Step onto the bench and adjudicate 5 realistic disputes', tab: 'courtroom' as NavTab, icon: Gavel },
    { title: 'Consumer Radar India', subtitle: 'Geospatial threat map of consumer exploitation across states', tab: 'radar' as NavTab, icon: MapPin },
    { title: 'Scam Survival Game', subtitle: 'Identify dark patterns in simulated shady shop', tab: 'scam-survival' as NavTab, icon: Flame },
    { title: 'Money Detective Calculator', subtitle: 'Calculate true discount, drip markups & MRP breaches', tab: 'money-detective' as NavTab, icon: BarChart3 },
    { title: 'Justice in 60s Notice Generator', subtitle: 'Draft formal pre-litigation legal notice under CPA 2019', tab: 'complaint-generator' as NavTab, icon: FileText },
    { title: 'Consumer Rights Universe', subtitle: 'Explore 6 statutory consumer rights with myth-busting', tab: 'rights' as NavTab, icon: BookOpen },
    { title: 'Citizen Dashboard', subtitle: 'Track Consumer IQ, saved capital & unlocked badges', tab: 'dashboard' as NavTab, icon: Award },
  ];

  const filtered = actions.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  const handleAction = (tab: NavTab) => {
    sound.playClick();
    onSelectTab(tab, query);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-20 p-4 animate-fade-in">
      <div className="glass-panel max-w-xl w-full rounded-2xl border-2 border-cyan-400/60 shadow-[0_0_50px_rgba(0,242,254,0.3)] bg-slate-950 overflow-hidden space-y-2">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search size={18} className="text-cyan-400 shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, tool, or consumer problem..."
            className="w-full bg-transparent text-white placeholder-slate-500 text-sm outline-none font-mono"
          />
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white text-xs font-mono px-2 py-1 rounded bg-slate-900 border border-slate-800"
          >
            ESC
          </button>
        </div>

        {/* Action List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.map((action, idx) => {
            const Icon = action.icon;
            return (
              <div
                key={idx}
                onClick={() => handleAction(action.tab)}
                className="p-3 rounded-xl hover:bg-slate-900/90 cursor-pointer flex items-center justify-between group transition border border-transparent hover:border-cyan-500/30"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 transition">
                    <Icon size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-cyan-300">
                      {action.title}
                    </h4>
                    <p className="text-[11px] text-slate-400">{action.subtitle}</p>
                  </div>
                </div>
                <ChevronRight size={14} className="text-slate-600 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1" />
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="p-6 text-center text-xs text-slate-500">
              No matching tools found. Press Enter to investigate with Nyaya AI.
            </div>
          )}
        </div>

        <div className="p-3 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400 px-4">
          <span>Tip: Press <strong>ESC</strong> to exit</span>
          <span className="text-cyan-400">NYAYAVERSE Command Bus</span>
        </div>
      </div>
    </div>
  );
};
