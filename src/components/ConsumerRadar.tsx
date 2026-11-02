import React, { useState, useMemo } from 'react';
import { RadarIncident } from '../types';
import { INITIAL_RADAR_INCIDENTS, STATE_SUMMARIES } from '../data/radarData';
import { getUserRadarReports, saveUserRadarReport } from '../services/storage';
import { sound } from '../services/sound';
import { 
  MapPin, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  Sparkles, 
  Shield, 
  Clock, 
  ChevronRight,
  X,
  FileText,
  Info,
  Zap,
  BarChart3
} from './icons';

export const ConsumerRadar: React.FC = () => {
  const [userReports, setUserReports] = useState<RadarIncident[]>(getUserRadarReports());
  const allIncidents = useMemo(() => [...userReports, ...INITIAL_RADAR_INCIDENTS], [userReports]);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [activeIncident, setActiveIncident] = useState<RadarIncident | null>(allIncidents[0]);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // New report form state
  const [formState, setFormState] = useState({
    state: 'Maharashtra',
    city: 'Mumbai',
    category: 'Online Shopping' as RadarIncident['category'],
    title: '',
    reportedAmount: '₹',
    description: '',
  });

  const categories = [
    'All',
    'Online Shopping',
    'Fake Products',
    'Overcharging',
    'Banking & Payments',
    'Misleading Ads',
    'Food Safety'
  ];

  const states = ['All', ...Object.keys(STATE_SUMMARIES)];
  const statuses = ['All', 'Verified by Nyaya', 'Community Reported', 'Under Investigation'];

  const filteredIncidents = useMemo(() => {
    return allIncidents.filter((inc) => {
      const matchCat = selectedCategory === 'All' || inc.category === selectedCategory;
      const matchState = selectedState === 'All' || inc.state === selectedState;
      const matchStatus = selectedStatus === 'All' || inc.status === selectedStatus;
      return matchCat && matchState && matchStatus;
    });
  }, [allIncidents, selectedCategory, selectedState, selectedStatus]);

  const handleSelectIncident = (inc: RadarIncident) => {
    sound.playClick();
    setActiveIncident(inc);
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title.trim() || !formState.description.trim()) return;

    sound.playSuccess();
    const newReport: RadarIncident = {
      id: `rad-usr-${Date.now().toString().slice(-4)}`,
      state: formState.state,
      city: formState.city,
      coords: [30 + Math.random() * 30, 30 + Math.random() * 45],
      category: formState.category,
      title: formState.title,
      date: new Date().toISOString().split('T')[0],
      reportedAmount: formState.reportedAmount || '₹0',
      status: 'Community Reported',
      description: formState.description,
      victimAction: 'Pending review by Nyaya automated verification pipeline.'
    };

    saveUserRadarReport(newReport);
    setUserReports([newReport, ...userReports]);
    setActiveIncident(newReport);
    setIsReportModalOpen(false);
    setFormState({
      state: 'Maharashtra',
      city: 'Mumbai',
      category: 'Online Shopping',
      title: '',
      reportedAmount: '₹',
      description: '',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in">
      {/* Feature Badge & Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-cyan-500/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-400/40 text-cyan-300 text-xs font-mono mb-2 shadow-[0_0_15px_rgba(0,242,254,0.2)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>FEATURE 3: REAL-TIME GEOSPATIAL CYBER THREAT RADAR</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
            CONSUMER RADAR <span className="text-cyan-400">INDIA</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
            Tactical geospatial intelligence mapping consumer exploitation patterns, dark patterns, and counterfeit syndicates across 28+ Indian States & Union Territories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => { sound.playClick(); setIsReportModalOpen(true); }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:scale-105 transition"
          >
            <Zap size={14} />
            <span>+ Report Incident Anonymously</span>
          </button>
        </div>
      </div>

      {/* Demonstration Notice */}
      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-slate-300 flex items-center gap-2.5">
        <Info size={16} className="text-cyan-400 shrink-0" />
        <span className="text-[11px]">
          <strong className="text-white">Demonstration Telemetry:</strong> Hotspots represent active simulated telemetry and verified community reports across India for hackathon evaluation.
        </span>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-panel p-4 rounded-xl border border-cyan-500/20 bg-slate-950/80 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filter */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Filter size={14} className="text-cyan-400" />
            <span>Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs outline-none focus:border-cyan-400 font-sans"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* State Filter */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>State:</span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs outline-none focus:border-cyan-400 font-sans"
            >
              {states.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs outline-none focus:border-cyan-400 font-sans"
            >
              {statuses.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-xs font-mono text-cyan-400">
          Tracking <strong>{filteredIncidents.length}</strong> active telemetry hotspots
        </div>
      </div>

      {/* Main Grid: Interactive Map + Incident Intel Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Tactical Radar SVG Map */}
        <div className="lg:col-span-7 glass-panel p-4 sm:p-6 rounded-2xl border-2 border-cyan-500/30 bg-slate-950/90 relative overflow-hidden min-h-[500px]">
          {/* Radar Sweep Effect */}
          <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
            <div className="w-[420px] h-[420px] rounded-full border border-cyan-500/30 animate-pulse"></div>
            <div className="w-[300px] h-[300px] rounded-full border border-cyan-500/20 absolute"></div>
            <div className="w-[180px] h-[180px] rounded-full border border-cyan-500/20 absolute"></div>
            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent absolute animate-radar-sweep"></div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4 relative z-10">
            <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              TACTICAL RADAR TELEMETRY: BHARAT
            </span>
            <span>20.5937° N, 78.9629° E</span>
          </div>

          {/* Interactive Tactical SVG Map of India with Hotspot Pins */}
          <div className="relative w-full aspect-[4/4.5] max-h-[520px] mx-auto z-10 flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full filter drop-shadow-[0_0_20px_rgba(0,242,254,0.15)]"
            >
              {/* Tactical Subcontinent Vector Geometry */}
              <path
                d="M32 10 L44 8 L54 14 L58 22 L66 22 L70 28 L64 36 L72 44 L66 52 L56 60 L48 76 L40 88 L34 82 L30 68 L24 54 L20 42 L26 32 L24 22 Z"
                fill="rgba(10, 18, 38, 0.85)"
                stroke="#00f2fe"
                strokeWidth="0.9"
                strokeDasharray="2, 1"
              />

              {/* Major State Sector Lines */}
              <line x1="24" y1="42" x2="64" y2="36" stroke="rgba(0, 242, 254, 0.2)" strokeWidth="0.5" />
              <line x1="30" y1="68" x2="66" y2="52" stroke="rgba(0, 242, 254, 0.2)" strokeWidth="0.5" />
              <line x1="40" y1="15" x2="40" y2="85" stroke="rgba(0, 242, 254, 0.15)" strokeWidth="0.4" strokeDasharray="1, 1" />
              <line x1="50" y1="20" x2="50" y2="75" stroke="rgba(0, 242, 254, 0.12)" strokeWidth="0.4" strokeDasharray="1, 1" />

              {/* Hotspot Nodes with Pulse Rings */}
              {filteredIncidents.map((inc) => {
                const isSelected = activeIncident?.id === inc.id;
                return (
                  <g
                    key={inc.id}
                    onClick={() => handleSelectIncident(inc)}
                    className="cursor-pointer group"
                  >
                    {/* Pulsing ring */}
                    <circle
                      cx={inc.coords[0]}
                      cy={inc.coords[1]}
                      r={isSelected ? 4.5 : 2.8}
                      className={isSelected ? 'fill-cyan-400/30 stroke-cyan-400 stroke-1 animate-ping' : 'fill-cyan-500/20 stroke-cyan-400 stroke-[0.6]'}
                    />
                    {/* Hotspot Core */}
                    <circle
                      cx={inc.coords[0]}
                      cy={inc.coords[1]}
                      r={isSelected ? 2.2 : 1.4}
                      className={
                        inc.status === 'Verified by Nyaya'
                          ? 'fill-rose-400'
                          : inc.status === 'Under Investigation'
                          ? 'fill-amber-400'
                          : 'fill-cyan-400'
                      }
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-3 border-t border-slate-800 relative z-10">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-400"></span> Verified Violation
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span> Under Investigation
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span> Community Reported
              </span>
            </div>
            <span className="text-cyan-400">Click any node to inspect telemetry</span>
          </div>
        </div>

        {/* Selected Incident Telemetry & State Vulnerability Drawer */}
        <div className="lg:col-span-5 space-y-4">
          {activeIncident ? (
            <div className="glass-panel p-6 rounded-2xl border-2 border-cyan-500/40 bg-slate-950/95 shadow-[0_0_30px_rgba(0,242,254,0.15)] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-bold">
                  {activeIncident.category}
                </span>
                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                  activeIncident.status === 'Verified by Nyaya'
                    ? 'bg-rose-500/15 text-rose-300 border-rose-500/40'
                    : 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                }`}>
                  {activeIncident.status}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-1">{activeIncident.title}</h3>
                <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1 text-cyan-400 font-bold">
                    <MapPin size={12} />
                    {activeIncident.city}, {activeIncident.state}
                  </span>
                  <span>•</span>
                  <span>Logged: {activeIncident.date}</span>
                </div>
              </div>

              {activeIncident.reportedAmount && (
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">Disputed Extortion Value:</span>
                  <span className="text-sm font-mono font-bold text-rose-400">{activeIncident.reportedAmount}</span>
                </div>
              )}

              <div className="space-y-1">
                <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
                  Incident Narrative:
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800 font-sans">
                  {activeIncident.description}
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
                  Redressal Action:
                </h4>
                <p className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800 font-sans">
                  {activeIncident.victimAction}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-800">
                <span>Verification: <strong>{activeIncident.status}</strong></span>
                <span className="text-cyan-400">HOTSPOT ID: {activeIncident.id}</span>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-8 rounded-2xl border border-slate-800 text-center text-slate-400 text-xs">
              Select any hotspot on the map to inspect incident details.
            </div>
          )}

          {/* State Vulnerability Leaderboard */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 bg-slate-950 space-y-3">
            <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
              <BarChart3 size={14} />
              <span>State Consumer Vulnerability Index (Demo)</span>
            </h4>
            <div className="space-y-2 text-xs font-mono">
              {Object.values(STATE_SUMMARIES).slice(0, 4).map((st) => (
                <div key={st.code} className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">{st.name} ({st.code})</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      st.riskIndex === 'Severe' ? 'text-rose-400 bg-rose-950/40 border border-rose-500/30' : 'text-amber-400 bg-amber-950/40 border border-amber-500/30'
                    }`}>
                      {st.riskIndex} Risk
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="line-clamp-1">{st.topIssue}</span>
                    <span className="text-cyan-300 shrink-0 font-bold">{st.totalReports} reports</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Anonymous Report Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="glass-panel max-w-lg w-full p-6 sm:p-8 rounded-2xl border-2 border-cyan-400/60 shadow-[0_0_40px_rgba(0,242,254,0.3)] bg-slate-950 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-cyan-400" />
                <h3 className="font-display font-bold text-base text-white">Report Incident Anonymously</h3>
              </div>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Your submission will be immediately anonymized and plotted onto the tactical Consumer Radar to alert fellow citizens across your state.
            </p>

            <form onSubmit={handleSubmitReport} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-mono mb-1">State</label>
                  <select
                    value={formState.state}
                    onChange={(e) => setFormState({ ...formState, state: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none"
                  >
                    {Object.keys(STATE_SUMMARIES).map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-mono mb-1">City / Area</label>
                  <input
                    type="text"
                    required
                    value={formState.city}
                    onChange={(e) => setFormState({ ...formState, city: e.target.value })}
                    placeholder="e.g. Mumbai, Bandra"
                    className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-mono mb-1">Category</label>
                  <select
                    value={formState.category}
                    onChange={(e) => setFormState({ ...formState, category: e.target.value as any })}
                    className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none"
                  >
                    {categories.filter(c => c !== 'All').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-mono mb-1">Disputed Amount</label>
                  <input
                    type="text"
                    value={formState.reportedAmount}
                    onChange={(e) => setFormState({ ...formState, reportedAmount: e.target.value })}
                    placeholder="₹500.00"
                    className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Headline</label>
                <input
                  type="text"
                  required
                  value={formState.title}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  placeholder="e.g. Charged ₹80 on ₹20 water bottle in cinema"
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Incident Description</label>
                <textarea
                  required
                  rows={3}
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  placeholder="Detail the merchant name, exact refusal reason, dates..."
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold uppercase tracking-wider"
                >
                  Plot Hotspot onto Radar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
