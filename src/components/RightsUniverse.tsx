import React, { useState } from 'react';
import { CONSUMER_RIGHTS } from '../data/rightsData';
import { ConsumerRight } from '../types';
import { sound } from '../services/sound';
import { 
  Shield, 
  Eye, 
  Scale, 
  BookOpen, 
  Bot, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight,
  X,
  HelpCircle
} from './icons';

export const RightsUniverse: React.FC = () => {
  const [selectedRight, setSelectedRight] = useState<ConsumerRight>(CONSUMER_RIGHTS[0]);
  const [activeMythIdx, setActiveMythIdx] = useState<number | null>(null);
  const [revealedMyths, setRevealedMyths] = useState<number[]>([]);

  const handleSelectRight = (r: ConsumerRight) => {
    sound.playClick();
    setSelectedRight(r);
    setActiveMythIdx(null);
  };

  const handleToggleMyth = (idx: number) => {
    sound.playClick();
    if (!revealedMyths.includes(idx)) {
      setRevealedMyths([...revealedMyths, idx]);
    }
    setActiveMythIdx(activeMythIdx === idx ? null : idx);
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Shield': return <Shield size={24} className="text-cyan-400" />;
      case 'Eye': return <Eye size={24} className="text-blue-400" />;
      case 'Scale': return <Scale size={24} className="text-purple-400" />;
      case 'Bot': return <Bot size={24} className="text-emerald-400" />;
      case 'BookOpen': return <BookOpen size={24} className="text-amber-400" />;
      default: return <Shield size={24} className="text-cyan-400" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-cyan-500/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 text-xs font-mono mb-2">
            <Sparkles size={13} className="text-cyan-400" />
            <span>INTERACTIVE STATUTORY REALM</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
            CONSUMER RIGHTS <span className="text-cyan-400">UNIVERSE</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
            Explore the six fundamental statutory pillars of the Consumer Protection Act, 2019 through interactive case laws, real-life traps, and myth-busting challenges.
          </p>
        </div>
      </div>

      {/* 3D-Style Holographic Rights Selector Spheres */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {CONSUMER_RIGHTS.map((r) => {
          const isSelected = selectedRight.id === r.id;
          return (
            <div
              key={r.id}
              onClick={() => handleSelectRight(r)}
              className={`p-4 rounded-2xl cursor-pointer transition-all border flex flex-col items-center text-center relative overflow-hidden group ${
                isSelected
                  ? 'bg-gradient-to-b from-cyan-950/80 to-slate-900 border-cyan-400 shadow-[0_0_25px_rgba(0,242,254,0.3)] scale-105'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              {/* Radial glow for selected sphere */}
              {isSelected && (
                <div className="absolute inset-0 bg-cyan-500/10 rounded-2xl pointer-events-none animate-pulse"></div>
              )}

              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                {getIcon(r.iconName)}
              </div>

              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-0.5">
                RIGHT #{r.number}
              </span>
              <h3 className="text-xs font-bold text-white leading-tight">{r.title}</h3>
            </div>
          );
        })}
      </div>

      {/* Main Interactive Deep Dive Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border-2 border-cyan-500/40 shadow-[0_0_40px_rgba(0,242,254,0.15)] bg-slate-950/90 space-y-6">
        {/* Right Title & Statutory Basis */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-cyan-500/20">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">
              STATUTORY RIGHT #{selectedRight.number}
            </span>
            <h2 className="font-display font-black text-2xl text-white">
              {selectedRight.title}
            </h2>
            <p className="text-xs sm:text-sm text-cyan-300 font-medium mt-0.5">
              "{selectedRight.tagline}"
            </p>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300">
            Statute: <strong className="text-cyan-400">{selectedRight.statutoryBasis}</strong>
          </div>
        </div>

        {/* Core Statutory Description */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed">
          {selectedRight.description}
        </div>

        {/* Real-World Scenario & Trap Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
            <span className="text-[11px] font-mono text-rose-400 uppercase font-bold flex items-center gap-1.5">
              <AlertTriangle size={14} />
              <span>Real-Life Consumer Trap:</span>
            </span>
            <h4 className="text-xs font-bold text-white">{selectedRight.realWorldScenario.situation}</h4>
            <p className="text-xs text-rose-300 bg-slate-950/60 p-2.5 rounded-lg border border-rose-950">
              Trap: "{selectedRight.realWorldScenario.trap}"
            </p>
          </div>

          <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
            <span className="text-[11px] font-mono text-emerald-400 uppercase font-bold flex items-center gap-1.5">
              <CheckCircle2 size={14} />
              <span>Statutory Legal Solution:</span>
            </span>
            <p className="text-xs text-slate-200 leading-relaxed bg-slate-950/60 p-2.5 rounded-lg border border-emerald-950">
              {selectedRight.realWorldScenario.solution}
            </p>
          </div>
        </div>

        {/* Landmark Indian Judicial Ruling */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-purple-500/30 space-y-2">
          <span className="text-[11px] font-mono text-purple-400 uppercase font-bold flex items-center gap-1.5">
            <Scale size={14} />
            <span>Landmark Indian Judicial Precedent ({selectedRight.landmarkCase.year}):</span>
          </span>
          <h4 className="text-xs font-bold text-white">{selectedRight.landmarkCase.title}</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            {selectedRight.landmarkCase.verdict}
          </p>
        </div>

        {/* Interactive Myth vs Fact Challenge Cards */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-sm text-cyan-300 flex items-center gap-2">
              <HelpCircle size={16} />
              <span>Myth vs Fact Challenge (Click to flip & reveal legal truth)</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">
              {selectedRight.myths.length} Interactive Cards
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selectedRight.myths.map((m, idx) => {
              const isRevealed = activeMythIdx === idx;
              return (
                <div
                  key={idx}
                  onClick={() => handleToggleMyth(idx)}
                  className={`p-4 rounded-xl cursor-pointer border transition-all ${
                    isRevealed
                      ? 'bg-slate-900 border-cyan-400 shadow-[0_0_15px_rgba(0,242,254,0.2)]'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-500/30">
                      COMMON MYTH
                    </span>
                    <span className="text-xs text-cyan-400 font-mono">
                      {isRevealed ? 'Tap to close' : 'Tap to reveal fact →'}
                    </span>
                  </div>

                  <p className="text-xs text-white font-medium mb-3">"{m.myth}"</p>

                  {isRevealed && (
                    <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-200 animate-fade-in space-y-1">
                      <span className="text-[10px] font-mono text-emerald-400 font-bold block uppercase">
                        ✓ STATUTORY FACT
                      </span>
                      <p>{m.fact}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
