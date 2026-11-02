import React, { useState, useEffect } from 'react';
import { ThreatItem } from '../types';
import { AlertTriangle, Clock, MapPin, RefreshCw, Zap } from './icons';

const SIMULATED_THREATS: ThreatItem[] = [
  {
    id: 'th-1',
    timestamp: 'Just now',
    category: 'Dark Pattern',
    severity: 'high',
    location: 'Bengaluru, KA',
    title: 'Pre-checked ₹499 flight seat insurance sneaked at payment',
    entity: 'FlyQuick Online',
    amount: '₹499.00',
    status: 'Investigating'
  },
  {
    id: 'th-2',
    timestamp: '2m ago',
    category: 'Overcharging',
    severity: 'critical',
    location: 'New Delhi, DL',
    title: 'Cafe charging ₹75 on ₹20 MRP packaged water bottle',
    entity: 'Capital Lounge',
    amount: '₹55.00 excess',
    status: 'Verified'
  },
  {
    id: 'th-3',
    timestamp: '5m ago',
    category: 'Payment Fraud',
    severity: 'critical',
    location: 'Lucknow, UP',
    title: 'Fake electricity disconnection SMS with malware APK',
    entity: 'UP Power Impersonator',
    amount: '₹34,000.00',
    status: 'Action Taken'
  },
  {
    id: 'th-4',
    timestamp: '8m ago',
    category: 'Fake Product',
    severity: 'high',
    location: 'Mumbai, MH',
    title: 'Flagship phone box delivered with refurbished used model',
    entity: 'MegaMart Seller #49',
    amount: '₹68,999.00',
    status: 'Investigating'
  },
  {
    id: 'th-5',
    timestamp: '12m ago',
    category: 'Misleading Ad',
    severity: 'medium',
    location: 'Hyderabad, TS',
    title: 'Herbal syrup claiming "100% cure for blood sugar in 7 days"',
    entity: 'Sanjeevani Wellness Labs',
    amount: '₹1,999.00',
    status: 'Verified'
  },
  {
    id: 'th-6',
    timestamp: '15m ago',
    category: 'Dark Pattern',
    severity: 'high',
    location: 'Kolkata, WB',
    title: 'Subscription trap: cancellation hidden behind 9-step survey',
    entity: 'FitPulse Fitness App',
    amount: '₹2,999.00/mo',
    status: 'Investigating'
  }
];

export const ThreatMonitor: React.FC = () => {
  const [threats, setThreats] = useState<ThreatItem[]>(SIMULATED_THREATS);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % threats.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [threats.length]);

  const currentThreat = threats[activeIdx];

  const severityColor = (sev: ThreatItem['severity']) => {
    switch (sev) {
      case 'critical': return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      case 'high': return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'medium': return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }
  };

  return (
    <div className="w-full glass-panel border border-cyan-500/30 rounded-xl p-3 sm:p-4 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950 shadow-lg">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2 mb-2 border-b border-cyan-500/15">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-md bg-cyan-500/20 text-cyan-400">
            <Zap size={14} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-xs uppercase tracking-wider text-cyan-300">
                LIVE CONSUMER THREAT MONITOR
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-900/40 text-cyan-400 border border-cyan-500/30 animate-pulse">
                SIMULATED FEED
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              Real-time demonstration stream tracking deceptive trade practices across India
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            ACTIVE MONITORING
          </span>
          <span className="text-slate-600">|</span>
          <span>{threats.length} THREATS IN QUEUE</span>
        </div>
      </div>

      {/* Active Rotating Alert */}
      {currentThreat && (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="flex items-center gap-3">
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold border ${severityColor(currentThreat.severity)}`}>
              {currentThreat.severity}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-200">
                  {currentThreat.title}
                </span>
                {currentThreat.amount && (
                  <span className="text-xs font-mono text-cyan-400 font-bold">
                    [{currentThreat.amount}]
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono mt-0.5">
                <span className="text-slate-300">Entity: {currentThreat.entity}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-400">
                  <MapPin size={11} className="text-cyan-400" />
                  {currentThreat.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-400">
                  <Clock size={11} />
                  {currentThreat.timestamp}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-center">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {currentThreat.status}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
