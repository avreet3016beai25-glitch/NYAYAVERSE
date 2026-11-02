import React, { useState, useEffect } from 'react';
import { SCAM_GAME_PRODUCT, SCAM_TRAPS } from '../data/scamGameData';
import { ScamTrap } from '../types';
import { sound } from '../services/sound';
import { updateUserStats } from '../services/storage';
import { 
  Flame, 
  Clock, 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Award, 
  RefreshCw, 
  ShoppingCart, 
  ExternalLink,
  ChevronRight,
  Info,
  Zap,
  Lock,
  Eye
} from './icons';

export const ScamSurvival: React.FC = () => {
  const [wallet, setWallet] = useState<number>(10000);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(120);
  const [difficulty, setDifficulty] = useState<'Cadet' | 'Agent' | 'Vigilante'>('Cadet');
  const [gameActive, setGameActive] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [discoveredTraps, setDiscoveredTraps] = useState<string[]>([]);
  const [activeTrapInspection, setActiveTrapInspection] = useState<ScamTrap | null>(null);
  const [showOtpModal, setShowOtpModal] = useState<boolean>(false);
  const [otpInputValue, setOtpInputValue] = useState<string>('');
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'payment'>('cart');
  const [fallenTraps, setFallenTraps] = useState<string[]>([]);
  const [nyayaVisionMode, setNyayaVisionMode] = useState<boolean>(false);

  // Timer countdown when game is active
  useEffect(() => {
    if (!gameActive || gameOver || timeLeft <= 0) {
      if (gameActive && timeLeft <= 0) {
        finishGame();
      }
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [gameActive, gameOver, timeLeft]);

  const startGame = () => {
    sound.playScan();
    setWallet(10000);
    setScore(0);
    setTimeLeft(difficulty === 'Cadet' ? 150 : difficulty === 'Agent' ? 100 : 70);
    setDiscoveredTraps([]);
    setFallenTraps([]);
    setActiveTrapInspection(null);
    setShowOtpModal(false);
    setCheckoutStep('cart');
    setNyayaVisionMode(false);
    setGameActive(true);
    setGameOver(false);
  };

  const handleInspectTrap = (trapId: string) => {
    if (!gameActive || gameOver) return;
    const trap = SCAM_TRAPS.find((t) => t.id === trapId);
    if (!trap) return;

    sound.playClick();
    setActiveTrapInspection(trap);

    if (!discoveredTraps.includes(trapId)) {
      sound.playSuccess();
      const updated = [...discoveredTraps, trapId];
      setDiscoveredTraps(updated);
      setScore((s) => s + 150);

      // Check if all 7 traps spotted
      if (updated.length === SCAM_TRAPS.length) {
        finishGame(updated);
      }
    }
  };

  const handleFallForTrap = (trapId: string, penalty: number) => {
    if (fallenTraps.includes(trapId)) return;
    sound.playAlert();
    setFallenTraps((prev) => [...prev, trapId]);
    setWallet((w) => Math.max(0, w - penalty));

    const trap = SCAM_TRAPS.find((t) => t.id === trapId);
    if (trap) {
      setActiveTrapInspection(trap);
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpInputValue.length === 6) {
      handleFallForTrap('trap-otp-fraud', 3000);
      setShowOtpModal(false);
      setOtpInputValue('');
    }
  };

  const finishGame = (finalDiscovered = discoveredTraps) => {
    setGameOver(true);
    setGameActive(false);
    sound.playSuccess();

    updateUserStats((s) => ({
      ...s,
      scamSurvivalScore: Math.max(s.scamSurvivalScore, score + finalDiscovered.length * 100),
      consumerIQ: Math.min(100, s.consumerIQ + 6),
      badgesUnlocked: Array.from(new Set([...s.badgesUnlocked, 'dark_pattern_slayer']))
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in">
      {/* Feature Badge & Header */}
      <div className="glass-panel p-6 rounded-2xl border border-rose-500/30 bg-slate-950/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/70 border border-rose-500/40 text-rose-300 text-xs font-mono mb-2 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
            <Flame size={13} className="text-rose-400" />
            <span>FEATURE 4: INTERACTIVE DARK PATTERN CYBER ARENA</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
            SCAM SURVIVAL <span className="text-rose-400">ARENA</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
            Enter a simulated predatory shopping store. Hunt and flag all 7 deceptive dark patterns before your virtual ₹10,000 wallet is drained by drip fees and OTP traps.
          </p>
        </div>

        {/* Live Scoreboard, Wallet & Timer */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 font-mono text-xs">
            <span className="text-[10px] text-slate-400 block uppercase">Virtual Wallet</span>
            <span className={`text-sm font-bold ${wallet < 5000 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`}>
              ₹{wallet.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 font-mono text-xs">
            <span className="text-[10px] text-slate-400 block uppercase">Score</span>
            <span className="text-sm font-bold text-cyan-400">{score} XP</span>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 font-mono text-xs">
            <span className="text-[10px] text-slate-400 block uppercase">Timer</span>
            <span className={`text-sm font-bold flex items-center gap-1 ${timeLeft < 20 ? 'text-rose-400 animate-ping' : 'text-amber-400'}`}>
              <Clock size={13} />
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Pre-Game Setup View */}
      {!gameActive && !gameOver && (
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border-2 border-rose-500/40 text-center space-y-6 bg-slate-950/90 shadow-[0_0_50px_rgba(244,63,94,0.15)]">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-rose-950/60 border-2 border-rose-500/50 flex items-center justify-center text-rose-300 shadow-[0_0_30px_rgba(244,63,94,0.4)]">
            <Flame size={40} />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="font-display font-black text-2xl text-white">ARE YOU READY FOR THE CYBER BAZAAR?</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              You will be dropped inside "FLASHLOOT BAZAAR INDIA". Shady sellers will use fake countdown clocks, inflated strikethrough prices, astroturfed AI reviews, drip fees at checkout, unverified UPI redirects, and fake OTP prompts.
            </p>
          </div>

          {/* Difficulty Tiers */}
          <div className="flex items-center justify-center gap-3">
            {(['Cadet', 'Agent', 'Vigilante'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => { sound.playClick(); setDifficulty(lvl); }}
                className={`px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition border ${
                  difficulty === lvl
                    ? 'bg-rose-500/20 text-rose-300 border-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.3)] scale-105'
                    : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                {lvl} {lvl === 'Cadet' ? '(150s • Beginner)' : lvl === 'Agent' ? '(100s • Normal)' : '(70s • Hardcore)'}
              </button>
            ))}
          </div>

          <button
            onClick={startGame}
            className="px-10 py-4 rounded-xl bg-gradient-to-r from-rose-500 via-amber-500 to-cyan-400 text-slate-950 font-display font-black text-sm uppercase tracking-wider hover:shadow-[0_0_35px_rgba(244,63,94,0.5)] transition hover:scale-105"
          >
            Enter Predatory Simulation Now
          </button>
        </div>
      )}

      {/* ACTIVE SHOPPING SIMULATION: The Shady Storefront */}
      {gameActive && !gameOver && (
        <div className="space-y-4">
          {/* Cyber HUD Lens Bar */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono">
            <span className="text-slate-400">
              Traps Discovered: <strong className="text-cyan-400">{discoveredTraps.length} / {SCAM_TRAPS.length}</strong>
            </span>
            <button
              onClick={() => {
                sound.playClick();
                setNyayaVisionMode(!nyayaVisionMode);
              }}
              className={`px-3 py-1.5 rounded-lg border transition flex items-center gap-1.5 ${
                nyayaVisionMode
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                  : 'bg-slate-950 text-slate-400 border-slate-700'
              }`}
            >
              <Eye size={14} className={nyayaVisionMode ? 'text-cyan-400 animate-pulse' : 'text-slate-500'} />
              <span>Nyaya Vision Scanner: {nyayaVisionMode ? 'ACTIVE' : 'OFF'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* The Shady Store Container */}
            <div className="lg:col-span-8 glass-panel rounded-2xl border-2 border-rose-500/40 overflow-hidden bg-slate-950/95 shadow-2xl">
              {/* Shady Store Banner */}
              <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-purple-600 px-4 py-2.5 flex items-center justify-between text-xs text-slate-950 font-black">
                <span className="font-display tracking-wider">⚡ FLASHLOOT BAZAAR INDIA — 92.5% OFF CARNIVAL</span>
                <span className="font-mono text-[10px] bg-black text-amber-300 px-2 py-0.5 rounded">
                  SIMULATED E-STORE
                </span>
              </div>

              <div className="p-6 space-y-6">
                {/* Trap 1: False Urgency Looping Countdown */}
                <div
                  onClick={() => handleInspectTrap('trap-false-urgency')}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                    discoveredTraps.includes('trap-false-urgency')
                      ? 'bg-emerald-950/40 border-emerald-500/40'
                      : nyayaVisionMode
                      ? 'bg-rose-950/80 border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.5)]'
                      : 'bg-rose-950/40 border-rose-500/40 hover:scale-[1.01]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                    <span className="text-xs font-mono font-bold text-rose-300 uppercase">
                      FLASH SALE EXPIRES IN: 01:42 MINS!
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">14 customers viewing this!</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                      {discoveredTraps.includes('trap-false-urgency') ? 'FLAGGED ✓' : 'FLAG TRAP'}
                    </span>
                  </div>
                </div>

                {/* Product Core Details */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-5 bg-slate-900 rounded-xl p-6 flex flex-col items-center justify-center border border-slate-800 text-center">
                    <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 mb-3 shadow-[0_0_20px_rgba(0,242,254,0.2)]">
                      <Zap size={44} />
                    </div>
                    <span className="text-xs font-mono text-cyan-300">QuantumBass ANC Studio</span>
                  </div>

                  <div className="sm:col-span-7 space-y-3">
                    <h3 className="font-display font-black text-lg text-white">
                      {SCAM_GAME_PRODUCT.name}
                    </h3>

                    {/* Trap 2: Inflated Fake 92.5% Discount */}
                    <div
                      onClick={() => handleInspectTrap('trap-fake-discount')}
                      className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                        discoveredTraps.includes('trap-fake-discount')
                          ? 'bg-emerald-950/40 border-emerald-500/40'
                          : nyayaVisionMode
                          ? 'bg-slate-900 border-cyan-400 shadow-[0_0_15px_rgba(0,242,254,0.4)]'
                          : 'bg-slate-900/90 border-slate-700 hover:border-cyan-400'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-black font-mono text-cyan-300">
                            ₹{SCAM_GAME_PRODUCT.salePrice}
                          </span>
                          <span className="text-sm line-through text-slate-500 font-mono">
                            MRP ₹{SCAM_GAME_PRODUCT.fakeOriginalPrice}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-rose-500 text-slate-950">
                            92.5% OFF
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                          (Inflated reference baseline)
                        </span>
                      </div>

                      <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                        {discoveredTraps.includes('trap-fake-discount') ? 'FLAGGED ✓' : 'FLAG TRAP'}
                      </span>
                    </div>

                    {/* Trap 6: Fake Government Seal */}
                    <div
                      onClick={() => handleInspectTrap('trap-fake-support')}
                      className={`p-2.5 rounded-lg border text-xs cursor-pointer transition flex items-center justify-between ${
                        discoveredTraps.includes('trap-fake-support')
                          ? 'bg-emerald-950/40 border-emerald-500/40'
                          : nyayaVisionMode
                          ? 'bg-amber-950/60 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                          : 'bg-slate-900 border-slate-700 hover:border-amber-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Shield size={14} className="text-amber-400" />
                        <span className="text-[11px] text-slate-200">
                          {SCAM_GAME_PRODUCT.sellerTrustBadge}
                        </span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                        {discoveredTraps.includes('trap-fake-support') ? 'FLAGGED ✓' : 'FLAG TRAP'}
                      </span>
                    </div>

                    {/* Buy / Checkout Trigger */}
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => setCheckoutStep('checkout')}
                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 transition"
                      >
                        Buy Now (Proceed to Cart)
                      </button>
                      <button
                        onClick={() => setShowOtpModal(true)}
                        className="px-4 py-3 rounded-xl bg-purple-600/30 border border-purple-500/40 text-purple-200 text-xs font-semibold hover:bg-purple-600/50"
                      >
                        Unlock VIP Coupon
                      </button>
                    </div>
                  </div>
                </div>

                {/* Trap 4: Drip Pricing & Surcharges at Checkout */}
                {checkoutStep === 'checkout' && (
                  <div
                    onClick={() => handleInspectTrap('trap-drip-fees')}
                    className={`p-4 rounded-xl border cursor-pointer transition space-y-2 ${
                      discoveredTraps.includes('trap-drip-fees')
                        ? 'bg-emerald-950/40 border-emerald-500/40'
                        : nyayaVisionMode
                        ? 'bg-rose-950/80 border-rose-400'
                        : 'bg-slate-900 border-rose-500/40 hover:scale-[1.01]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-white">
                      <span>ORDER SUMMARY AT PAYMENT GATEWAY</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono">
                        {discoveredTraps.includes('trap-drip-fees') ? 'FLAGGED ✓' : 'FLAG DRIP FEES'}
                      </span>
                    </div>
                    <div className="space-y-1 text-xs font-mono text-slate-300">
                      <div className="flex justify-between">
                        <span>Base Earbud Price:</span>
                        <span>₹1,499.00</span>
                      </div>
                      <div className="flex justify-between text-rose-400">
                        <span>+ Mandatory Transit Handling:</span>
                        <span>₹299.00</span>
                      </div>
                      <div className="flex justify-between text-rose-400">
                        <span>+ Eco-Packaging Surcharge:</span>
                        <span>₹199.00</span>
                      </div>
                      <div className="flex justify-between font-bold text-white pt-1 border-t border-slate-800">
                        <span>Final Payable Total:</span>
                        <span className="text-cyan-300">₹1,997.00 (+33.2% Markup)</span>
                      </div>
                    </div>

                    {/* Trap 5: Phishing Payment Gateway Redirect */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInspectTrap('trap-phishing-payment');
                      }}
                      className="pt-2"
                    >
                      <button
                        className="w-full py-2.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 hover:bg-emerald-400"
                      >
                        <span>Pay via Unverified Private UPI Redirect</span>
                        <span className="text-[10px] bg-black text-amber-300 px-1.5 py-0.5 rounded">
                          {discoveredTraps.includes('trap-phishing-payment') ? 'FLAGGED ✓' : 'FLAG PAYMENT TRAP'}
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Trap 3: Astroturfed Bot Reviews */}
                <div
                  onClick={() => handleInspectTrap('trap-bot-reviews')}
                  className={`p-4 rounded-xl border cursor-pointer transition space-y-3 ${
                    discoveredTraps.includes('trap-bot-reviews')
                      ? 'bg-emerald-950/40 border-emerald-500/40'
                      : nyayaVisionMode
                      ? 'bg-slate-900 border-cyan-400'
                      : 'bg-slate-900/80 border-slate-700 hover:border-cyan-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">Customer Reviews (38,419)</span>
                      <span className="text-amber-400 text-xs">★★★★★ 5.0</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                      {discoveredTraps.includes('trap-bot-reviews') ? 'FLAGGED ✓' : 'FLAG BOT REVIEWS'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded bg-slate-950 text-slate-300 border border-slate-800">
                      <span className="text-[10px] text-cyan-400 block font-mono">John Doe #84819</span>
                      "Best thing I ever bought! 100% cure for hearing problems. Arrived in 2 minutes!"
                    </div>
                    <div className="p-2 rounded bg-slate-950 text-slate-300 border border-slate-800">
                      <span className="text-[10px] text-cyan-400 block font-mono">Jane Smith #10928</span>
                      "Original Apple AirPods killer! Govt approved e-store best experience."
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trap Inspector & Live Forensic Panel */}
            <div className="lg:col-span-4 space-y-4">
              <div className="glass-panel p-5 rounded-2xl border border-cyan-500/30 bg-slate-950/90 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                  <span className="font-bold">TRAPS SPOTTED</span>
                  <span>{discoveredTraps.length} / {SCAM_TRAPS.length}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
                    style={{ width: `${(discoveredTraps.length / SCAM_TRAPS.length) * 100}%` }}
                  ></div>
                </div>

                <div className="space-y-1 text-xs">
                  {SCAM_TRAPS.map((t) => {
                    const spotted = discoveredTraps.includes(t.id);
                    return (
                      <div
                        key={t.id}
                        onClick={() => handleInspectTrap(t.id)}
                        className={`p-2 rounded-lg border text-[11px] font-mono flex items-center justify-between cursor-pointer ${
                          spotted
                            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400'
                        }`}
                      >
                        <span>{t.trapType}</span>
                        <span>{spotted ? '✓ SPOTTED (+150 XP)' : 'HIDDEN TRAP'}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Active Trap Forensic Details */}
              {activeTrapInspection && (
                <div className="glass-panel p-5 rounded-2xl border-2 border-cyan-400/50 bg-slate-950/95 space-y-3">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono">
                    <Shield size={16} />
                    <span>FORENSIC ANALYSIS</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{activeTrapInspection.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {activeTrapInspection.explanation}
                  </p>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-300">
                    Statute: <strong>{activeTrapInspection.legalGuideline}</strong>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Trap 7: OTP Fraud Pop-up Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel max-w-sm w-full p-6 rounded-2xl border-2 border-rose-500 bg-slate-950 space-y-4 shadow-[0_0_40px_rgba(244,63,94,0.4)]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">SECURITY VERIFICATION (FAKE)</span>
              <button onClick={() => setShowOtpModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <p className="text-xs text-slate-300">
              Enter the 6-digit Bank OTP sent to your phone to "Confirm 90% Discount Voucher":
            </p>
            <form onSubmit={handleOtpSubmit} className="space-y-3">
              <input
                type="password"
                maxLength={6}
                value={otpInputValue}
                onChange={(e) => setOtpInputValue(e.target.value)}
                placeholder="• • • • • •"
                className="w-full text-center tracking-widest text-lg p-3 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-rose-400 font-mono"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    handleInspectTrap('trap-otp-fraud');
                    setShowOtpModal(false);
                  }}
                  className="flex-1 py-2 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold"
                >
                  Flag as OTP Fraud
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-rose-500 text-slate-950 text-xs font-bold"
                >
                  Submit OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GAME OVER & FINAL LEARNING REPORT */}
      {gameOver && (
        <div className="glass-panel p-8 sm:p-10 rounded-2xl border-2 border-cyan-400/60 shadow-[0_0_50px_rgba(0,242,254,0.2)] bg-slate-950/95 space-y-6 text-center">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 shadow-[0_0_30px_rgba(0,242,254,0.4)]">
            <Award size={40} />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block">
              MISSION DEBRIEFING
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
              FINAL SCAM SURVIVAL REPORT
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
              You detected {discoveredTraps.length} out of {SCAM_TRAPS.length} traps. Your remaining virtual wallet: <strong className="text-emerald-400">₹{wallet.toLocaleString('en-IN')}</strong>
            </p>
          </div>

          {/* Final Scorecard Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 uppercase block">Scam IQ Score</span>
              <span className="font-display font-black text-2xl text-cyan-300">
                {Math.round((discoveredTraps.length / SCAM_TRAPS.length) * 100)}%
              </span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 uppercase block">Total Points</span>
              <span className="font-display font-black text-2xl text-purple-300">{score} XP</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 uppercase block">Unlocked Badge</span>
              <span className="font-display font-bold text-xs text-amber-300 mt-2 block">
                DARK PATTERN SLAYER
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-3 pt-4">
            <button
              onClick={startGame}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 transition"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
