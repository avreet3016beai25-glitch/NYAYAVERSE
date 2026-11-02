import React, { useState, useEffect, useRef } from 'react';
import { NavTab, Language } from '../types';
import { sound } from '../services/sound';
import { ThreatMonitor } from './ThreatMonitor';
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
  ChevronRight
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
  const [searchQuery, setSearchQuery] = useState('');
  const [counterIncidents, setCounterIncidents] = useState(1482910);
  const [counterSavedCr, setCounterSavedCr] = useState(42.84);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 4 Signature Unique Suites
  const signatureSuites = [
    {
      id: 'truth-scanner' as NavTab,
      badge: 'FEATURE 1',
      title: 'Truth Scanner AI',
      tagline: 'Computer Vision & Forensic Evidence Scanner',
      desc: 'Inspect bills, screenshots, and labels with visual bounding-box red flags & statutory metrology analysis.',
      icon: Eye,
      accent: 'from-cyan-500/20 to-blue-600/20 border-cyan-400/40 text-cyan-300',
      btnText: 'Launch Vision Scanner'
    },
    {
      id: 'courtroom' as NavTab,
      badge: 'FEATURE 2',
      title: 'AI Courtroom Bench',
      tagline: 'Interactive Virtual Consumer Commission',
      desc: 'Preside over 5 realistic trials, scrutinize evidence exhibits, cross-examine arguments, strike the gavel, and issue orders.',
      icon: Gavel,
      accent: 'from-purple-500/20 to-cyan-600/20 border-purple-400/40 text-purple-300',
      btnText: 'Take the Bench'
    },
    {
      id: 'radar' as NavTab,
      badge: 'FEATURE 3',
      title: 'Consumer Radar India',
      tagline: 'Real-Time Geospatial Cyber Threat Map',
      desc: 'Tactical intelligence map tracking consumer exploitation, overcharging hotspots, and anonymous citizen reporting.',
      icon: MapPin,
      accent: 'from-blue-500/20 to-emerald-600/20 border-blue-400/40 text-blue-300',
      btnText: 'Open Radar View'
    },
    {
      id: 'scam-survival' as NavTab,
      badge: 'FEATURE 4',
      title: 'Scam Survival Arena',
      tagline: 'Interactive Dark Pattern Cyber Simulation',
      desc: 'Survive inside a simulated predatory e-commerce store with ₹10,000 wallet, timer, and 7 huntable dark pattern traps.',
      icon: Flame,
      accent: 'from-rose-500/20 to-amber-600/20 border-rose-400/40 text-rose-300',
      btnText: 'Enter Cyber Arena'
    }
  ];

  const suggestedQueries = [
    { text: language === 'hi' ? 'मुझसे MRP से अधिक लिया गया' : 'I was charged more than MRP.', tab: 'money-detective' as NavTab },
    { text: language === 'hi' ? 'मुझे नकली उत्पाद मिला' : 'I received a fake product.', tab: 'truth-scanner' as NavTab },
    { text: language === 'hi' ? 'मेरा रिफंड खारिज कर दिया गया' : 'My refund was rejected.', tab: 'nyaya-ai' as NavTab },
    { text: language === 'hi' ? 'मैं फर्जी छूट के झांसे में आ गया' : 'I fell for a fake discount.', tab: 'scam-survival' as NavTab },
    { text: language === 'hi' ? 'कंपनी मुझे गुमराह कर रही है' : 'A company is misleading me.', tab: 'courtroom' as NavTab },
  ];

  // Animated canvas shield and cyber particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let angle = 0;
    const width = (canvas.width = 380);
    const height = (canvas.height = 380);
    const centerX = width / 2;
    const centerY = height / 2;

    const particles: { x: number; y: number; vx: number; vy: number; radius: number; alpha: number }[] = [];
    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 242, 254, ${p.alpha})`;
        ctx.fill();
      });

      ctx.save();
      ctx.translate(centerX, centerY);

      // Rotating hexagon ring
      ctx.save();
      ctx.rotate(angle);
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const rad = (i * Math.PI) / 3;
        const x = Math.cos(rad) * 140;
        const y = Math.sin(rad) * 140;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 12]);
      ctx.stroke();
      ctx.restore();

      // Middle counter-rotating ring
      ctx.save();
      ctx.rotate(-angle * 1.4);
      ctx.beginPath();
      ctx.arc(0, 0, 110, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.35)';
      ctx.lineWidth = 2;
      ctx.setLineDash([20, 25]);
      ctx.stroke();
      ctx.restore();

      // Glowing core
      const gradient = ctx.createRadialGradient(0, 0, 10, 0, 0, 95);
      gradient.addColorStop(0, 'rgba(0, 242, 254, 0.28)');
      gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.12)');
      gradient.addColorStop(1, 'rgba(3, 7, 18, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, 95, 0, Math.PI * 2);
      ctx.fill();

      // 3D Justice Shield path
      ctx.beginPath();
      ctx.moveTo(0, -65);
      ctx.lineTo(55, -45);
      ctx.lineTo(48, 25);
      ctx.quadraticCurveTo(30, 65, 0, 80);
      ctx.quadraticCurveTo(-30, 65, -48, 25);
      ctx.lineTo(-55, -45);
      ctx.closePath();

      ctx.fillStyle = 'rgba(10, 18, 38, 0.85)';
      ctx.fill();
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 3.5;
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 18;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Inner Justice Scale
      ctx.beginPath();
      ctx.moveTo(0, -32);
      ctx.lineTo(0, 48);
      ctx.moveTo(-32, -18);
      ctx.lineTo(32, -18);
      ctx.moveTo(-32, -18);
      ctx.lineTo(-38, 10);
      ctx.lineTo(-26, 10);
      ctx.closePath();
      ctx.moveTo(32, -18);
      ctx.lineTo(26, 10);
      ctx.lineTo(38, 10);
      ctx.closePath();
      ctx.moveTo(-18, 48);
      ctx.lineTo(18, 48);

      ctx.strokeStyle = '#e0f2fe';
      ctx.lineWidth = 2.2;
      ctx.stroke();

      ctx.restore();

      angle += 0.008;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, []);

  // Micro counter ticking
  useEffect(() => {
    const interval = setInterval(() => {
      setCounterIncidents((prev) => prev + Math.floor(Math.random() * 2) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    sound.playClick();
    const qLower = searchQuery.toLowerCase();
    if (qLower.includes('mrp') || qLower.includes('price') || qLower.includes('overcharg')) {
      onNavigate('money-detective', searchQuery);
    } else if (qLower.includes('fake') || qLower.includes('bill') || qLower.includes('scan') || qLower.includes('screenshot')) {
      onNavigate('truth-scanner', searchQuery);
    } else if (qLower.includes('court') || qLower.includes('case') || qLower.includes('judge')) {
      onNavigate('courtroom', searchQuery);
    } else if (qLower.includes('scam') || qLower.includes('game') || qLower.includes('discount')) {
      onNavigate('scam-survival', searchQuery);
    } else {
      onNavigate('nyaya-ai', searchQuery);
    }
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-16 px-4 sm:px-6 lg:px-8 cyber-grid">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-10">
        {/* Live Threat Monitor Banner */}
        <div>
          <ThreatMonitor />
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 text-xs font-mono shadow-[0_0_15px_rgba(0,242,254,0.15)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>THE INTERNET OF CONSUMER JUSTICE</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">BHARAT 2026</span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-5xl tracking-tight text-white leading-[1.15]">
              THE NEXT TIME SOMEONE TRIES TO FOOL YOU,{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent neon-text-cyan">
                BE READY.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Your money. Your rights. Your power. One intelligent platform to detect consumer exploitation and fight back.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border-l-4 border-cyan-400 border border-slate-800 text-slate-300 text-xs sm:text-sm italic">
              "Every consumer deserves to know the truth before losing their money."
              <span className="block font-mono text-[10px] text-cyan-400 uppercase tracking-widest not-italic mt-1">
                — NYAYAVERSE CORE DOCTRINE
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => { sound.playClick(); onNavigate('truth-scanner'); }}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm tracking-wide flex items-center gap-2 hover:shadow-[0_0_25px_rgba(0,242,254,0.5)] hover:scale-105 transition-all"
              >
                <Search size={18} />
                <span>Start Investigation</span>
                <ArrowUpRight size={16} />
              </button>

              <button
                onClick={() => { sound.playClick(); onNavigate('rights'); }}
                className="px-6 py-3.5 rounded-xl glass-panel text-cyan-300 hover:text-white border border-cyan-500/40 hover:border-cyan-400 text-sm font-semibold flex items-center gap-2 hover:bg-cyan-500/10 transition-all"
              >
                <Scale size={18} className="text-cyan-400" />
                <span>Explore Your Rights</span>
              </button>

              <button
                onClick={() => { sound.playClick(); onNavigate('courtroom'); }}
                className="px-5 py-3.5 rounded-xl bg-slate-900/90 text-slate-300 hover:text-purple-300 border border-purple-500/30 hover:border-purple-400 text-sm font-semibold flex items-center gap-2 hover:bg-purple-950/30 transition-all"
              >
                <Play size={16} className="text-purple-400" />
                <span>Enter Courtroom</span>
              </button>
            </div>
          </div>

          {/* 3D Shield Display */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] flex items-center justify-center">
              <canvas
                ref={canvasRef}
                className="w-full h-full cursor-pointer hover:scale-105 transition-transform"
                title="Nyayaverse Shield of Justice"
                onClick={() => sound.playScan()}
              />
              <div className="absolute bottom-2 text-center">
                <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400/80 bg-slate-950/80 px-2 py-0.5 rounded border border-cyan-500/20">
                  DEFENSIVE SHIELD ACTIVE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 🌟 4 UNIQUE SIGNATURE SUITES (FEATURED SHOWCASE) */}
        <div className="space-y-4 pt-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
                CORE INNOVATION SUITES
              </span>
              <h2 className="font-display font-black text-xl sm:text-2xl text-white">
                4 SIGNATURE UNIQUE PLATFORM EXPERIENCES
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Direct access to each specialized investigative suite
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {signatureSuites.map((suite) => {
              const Icon = suite.icon;
              return (
                <div
                  key={suite.id}
                  onClick={() => {
                    sound.playClick();
                    onNavigate(suite.id);
                  }}
                  className={`p-5 rounded-2xl cursor-pointer border transition-all duration-300 flex flex-col justify-between bg-gradient-to-b ${suite.accent} hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(0,242,254,0.25)] group`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-950/90 text-cyan-400 border border-slate-800 font-bold">
                        {suite.badge}
                      </span>
                      <Icon size={20} className="group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-base text-white group-hover:text-cyan-300 transition-colors">
                        {suite.title}
                      </h3>
                      <span className="text-[11px] font-mono text-slate-300 font-semibold block mt-0.5">
                        {suite.tagline}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      {suite.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono font-bold text-white mt-4">
                    <span>{suite.btnText}</span>
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform text-cyan-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass-panel p-4 rounded-xl border border-cyan-500/20 flex items-center gap-4">
            <div className="relative w-14 h-14 flex items-center justify-center rounded-xl bg-cyan-950/60 border border-cyan-400/40 text-cyan-300">
              <span className="font-display font-black text-xl">88</span>
              <span className="text-[10px] absolute bottom-1 text-cyan-400 font-mono">/100</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-mono text-cyan-400 uppercase font-bold">Readiness</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
              <h4 className="text-sm font-bold text-white">Consumer Protection Score</h4>
              <p className="text-[11px] text-slate-400 font-mono">High Vigilance Level</p>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-cyan-500/20 flex items-center gap-4">
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-blue-950/60 border border-blue-400/40 text-blue-300">
              <AlertTriangle size={24} className="text-blue-400" />
            </div>
            <div>
              <span className="text-xs font-mono text-blue-400 uppercase font-bold">Demonstration Counter</span>
              <h4 className="text-base font-display font-bold text-white">
                {counterIncidents.toLocaleString('en-IN')}+
              </h4>
              <p className="text-[11px] text-slate-400 font-mono">Reported Issues Across India</p>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-cyan-500/20 flex items-center gap-4">
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-purple-950/60 border border-purple-400/40 text-purple-300">
              <Award size={24} className="text-purple-400" />
            </div>
            <div>
              <span className="text-xs font-mono text-purple-400 uppercase font-bold">Simulated Impact</span>
              <h4 className="text-base font-display font-bold text-white">
                ₹{counterSavedCr.toFixed(2)} Crore
              </h4>
              <p className="text-[11px] text-slate-400 font-mono">Money Potentially Saved</p>
            </div>
          </div>
        </div>

        {/* Interactive Search Bar: "What happened to you today?" */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border-2 border-cyan-500/30 shadow-[0_0_40px_rgba(0,242,254,0.15)] bg-slate-950/80">
          <div className="text-center sm:text-left mb-4">
            <h3 className="font-display font-bold text-lg sm:text-xl text-white flex items-center justify-center sm:justify-start gap-2">
              <Search className="text-cyan-400" size={22} />
              <span>What happened to you today?</span>
            </h3>
            <p className="text-xs text-slate-400">
              Describe your problem, paste an offer, or select an issue below to launch the corresponding forensic tool:
            </p>
          </div>

          <form onSubmit={handleSearchSubmit} className="relative mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g., I was charged more than MRP for mineral water, or my flight refund was rejected..."
              className="w-full pl-5 pr-32 py-4 rounded-xl bg-slate-900 border border-cyan-500/40 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 text-white placeholder-slate-500 text-sm sm:text-base outline-none transition"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 px-5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs sm:text-sm hover:opacity-95 transition flex items-center gap-1.5"
            >
              <span>Investigate</span>
              <ArrowUpRight size={16} />
            </button>
          </form>

          <div className="space-y-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
              Suggested consumer challenges (Click to launch):
            </span>
            <div className="flex flex-wrap gap-2">
              {suggestedQueries.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    sound.playClick();
                    onNavigate(item.tab, item.text);
                  }}
                  className="px-3.5 py-2 rounded-lg bg-slate-900/90 hover:bg-cyan-950/50 border border-slate-700 hover:border-cyan-400/60 text-xs text-slate-300 hover:text-cyan-300 transition-all flex items-center gap-2 group"
                >
                  <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform">→</span>
                  <span>{item.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
