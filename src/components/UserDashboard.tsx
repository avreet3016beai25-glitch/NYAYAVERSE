import React, { useState, useEffect } from 'react';
import { UserStats, TruthReport } from '../types';
import { getUserStats, getScanHistory, getSavedComplaints } from '../services/storage';
import { sound } from '../services/sound';
import { 
  Award, 
  TrendingUp, 
  Shield, 
  FileText, 
  Gavel, 
  Flame, 
  CheckCircle2, 
  Download, 
  RefreshCw,
  ExternalLink,
  ChevronRight
} from './icons';

interface UserDashboardProps {
  onNavigateToTab: (tab: any) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  onNavigateToTab,
}) => {
  const [stats, setStats] = useState<UserStats>(getUserStats());
  const [history, setHistory] = useState<TruthReport[]>(getScanHistory());
  const [complaints, setComplaints] = useState<any[]>(getSavedComplaints());

  const badges = [
    { id: 'cadet', name: 'Nyaya Cadet', icon: 'Shield', description: 'Initiated the Consumer Protection Journey' },
    { id: 'first_scan', name: 'Truth Seeker', icon: 'FileText', description: 'Executed First Document Vision Scan' },
    { id: 'mrp_defender', name: 'MRP Guardian', icon: 'TrendingUp', description: 'Defended Against Illegal Overcharging' },
    { id: 'dark_pattern_slayer', name: 'Dark Pattern Slayer', icon: 'Flame', description: 'Survive Shady E-Commerce Scams' },
    { id: 'nyaya_judge', name: 'Citizen Judge', icon: 'Gavel', description: 'Delivered Sound Rulings in AI Courtroom' },
    { id: 'legal_eagle', name: 'Legal Advocate', icon: 'Award', description: 'Composed Formal Pre-Litigation Legal Notice' },
  ];

  const getConsumerIQLevel = (score: number) => {
    if (score >= 90) return { title: 'Nyaya Sentinel', color: 'text-cyan-300' };
    if (score >= 75) return { title: 'Senior Consumer Guardian', color: 'text-purple-300' };
    if (score >= 60) return { title: 'Vigilant Investigator', color: 'text-blue-300' };
    return { title: 'Consumer Apprentice', color: 'text-slate-300' };
  };

  const levelInfo = getConsumerIQLevel(stats.consumerIQ);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-cyan-500/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 text-xs font-mono mb-2">
            <Award size={13} className="text-cyan-400" />
            <span>CITIZEN INTELLIGENCE DOSSIER</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
            CONSUMER <span className="text-cyan-400">DASHBOARD</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
            Personal telemetry tracking your Consumer Protection IQ, simulated saved capital, completed courtroom trials, and statutory complaint notices.
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300">
          Rank: <strong className={levelInfo.color}>{levelInfo.title}</strong>
        </div>
      </div>

      {/* Top 4 Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Consumer IQ */}
        <div className="glass-panel p-5 rounded-2xl border border-cyan-500/30 bg-slate-950/80 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
            <span>CONSUMER IQ SCORE</span>
            <Shield size={16} />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-black text-3xl text-white">{stats.consumerIQ}</span>
            <span className="text-xs font-mono text-slate-400">/100</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full bg-cyan-400" style={{ width: `${stats.consumerIQ}%` }}></div>
          </div>
        </div>

        {/* Metric 2: Money Saved / Protected */}
        <div className="glass-panel p-5 rounded-2xl border border-emerald-500/30 bg-slate-950/80 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
            <span>PROTECTED SAVINGS</span>
            <TrendingUp size={16} />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-black text-3xl text-white">
              ₹{stats.moneySaved.toLocaleString('en-IN')}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono block">
            Calculated / Simulated Protection
          </span>
        </div>

        {/* Metric 3: Scans & Courtroom Cases */}
        <div className="glass-panel p-5 rounded-2xl border border-purple-500/30 bg-slate-950/80 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-purple-400">
            <span>COURTROOM ADJUDICATIONS</span>
            <Gavel size={16} />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-black text-3xl text-white">
              {stats.courtroomWins}
            </span>
            <span className="text-xs font-mono text-slate-400">Victories</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono block">
            {stats.scansCount} Truth Scans Completed
          </span>
        </div>

        {/* Metric 4: Scam Survival High Score */}
        <div className="glass-panel p-5 rounded-2xl border border-amber-500/30 bg-slate-950/80 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-amber-400">
            <span>SCAM SURVIVAL EXP</span>
            <Flame size={16} />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-black text-3xl text-white">
              {stats.scamSurvivalScore}
            </span>
            <span className="text-xs font-mono text-slate-400">XP</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono block">
            High Score in Trap Detection
          </span>
        </div>
      </div>

      {/* Achievement Badges System */}
      <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 bg-slate-950/90 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
            <Award size={16} className="text-cyan-400" />
            <span>Unlocked Citizen Accolades ({stats.badgesUnlocked.length} / {badges.length})</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">Auto-persisted in local dossier</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {badges.map((b) => {
            const isUnlocked = stats.badgesUnlocked.includes(b.id);
            return (
              <div
                key={b.id}
                className={`p-3.5 rounded-xl border flex flex-col items-center text-center transition ${
                  isUnlocked
                    ? 'bg-cyan-950/40 border-cyan-400/60 shadow-[0_0_15px_rgba(0,242,254,0.15)]'
                    : 'bg-slate-900/40 border-slate-800 opacity-40'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${
                  isUnlocked ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-500'
                }`}>
                  <Award size={20} />
                </div>
                <h4 className="text-xs font-bold text-white mb-0.5">{b.name}</h4>
                <p className="text-[10px] text-slate-400 leading-tight">{b.description}</p>
                <span className={`text-[9px] font-mono mt-2 uppercase px-1.5 py-0.5 rounded ${
                  isUnlocked ? 'bg-cyan-950 text-cyan-300' : 'bg-slate-800 text-slate-500'
                }`}>
                  {isUnlocked ? 'UNLOCKED' : 'LOCKED'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Saved Complaints & Recent Investigation History Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Saved Legal Notices */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-950 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-cyan-300 flex items-center gap-2">
              <FileText size={15} />
              <span>Drafted Legal Notices ({complaints.length})</span>
            </h3>
            <button
              onClick={() => onNavigateToTab('complaint-generator')}
              className="text-xs text-cyan-400 hover:text-cyan-200"
            >
              Compose New +
            </button>
          </div>

          {complaints.length > 0 ? (
            <div className="space-y-2">
              {complaints.map((c, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <strong className="text-white">{c.company}</strong>
                    <span className="text-cyan-400 font-mono font-bold">{c.amount}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Product: {c.product} • Type: {c.type}
                  </p>
                  <span className="text-[10px] font-mono text-slate-500">
                    Drafted on: {c.date} (ID: {c.id})
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 py-4 text-center">
              No complaint notices drafted yet. Use the "Justice in 60s" tool to generate pre-litigation notices.
            </p>
          )}
        </div>

        {/* Truth Scanner Recent Activity */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-950 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-cyan-300 flex items-center gap-2">
              <Shield size={15} />
              <span>Recent Truth Scans ({history.length})</span>
            </h3>
            <button
              onClick={() => onNavigateToTab('truth-scanner')}
              className="text-xs text-cyan-400 hover:text-cyan-200"
            >
              Run Scan +
            </button>
          </div>

          {history.length > 0 ? (
            <div className="space-y-2">
              {history.slice(0, 4).map((h, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <strong className="text-white line-clamp-1">{h.sourceTitle}</strong>
                    <span className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border ${
                      h.riskLevel === 'CRITICAL' ? 'bg-rose-950 text-rose-300 border-rose-500/30' : 'bg-cyan-950 text-cyan-300 border-cyan-500/30'
                    }`}>
                      {h.riskLevel}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{h.summary}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 py-4 text-center">
              No scans executed yet. Open Truth Scanner to examine any receipt, screenshot, or ad.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
