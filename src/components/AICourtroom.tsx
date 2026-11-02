import React, { useState } from 'react';
import { CourtroomCase } from '../types';
import { COURTROOM_CASES } from '../data/courtroomCases';
import { sound } from '../services/sound';
import { updateUserStats } from '../services/storage';
import { 
  Gavel, 
  Scale, 
  FileText, 
  User, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight, 
  Sparkles, 
  Info,
  Shield,
  Eye,
  Download,
  X,
  Award
} from './icons';

export const AICourtroom: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<CourtroomCase>(COURTROOM_CASES[0]);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [selectedVerdictId, setSelectedVerdictId] = useState<string | null>(null);
  const [verdictRevealed, setVerdictRevealed] = useState<boolean>(false);
  const [gavelStriking, setGavelStriking] = useState<boolean>(false);
  const [inspectingExhibit, setInspectingExhibit] = useState<any | null>(null);
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);

  const rounds = [
    { num: 1, name: 'Case Briefing' },
    { num: 2, name: 'Evidence Exhibits' },
    { num: 3, name: "Consumer Testimony" },
    { num: 4, name: "Seller Defense" },
    { num: 5, name: 'Judicial Decision' },
    { num: 6, name: 'Verdict & Law' },
  ];

  const handleSelectCase = (c: CourtroomCase) => {
    sound.playClick();
    setSelectedCase(c);
    setCurrentRound(1);
    setSelectedVerdictId(null);
    setVerdictRevealed(false);
    setShowCertificateModal(false);
  };

  const handleNextRound = () => {
    sound.playClick();
    if (currentRound < 6) {
      setCurrentRound(currentRound + 1);
    }
  };

  const handlePreviousRound = () => {
    sound.playClick();
    if (currentRound > 1) {
      setCurrentRound(currentRound - 1);
    }
  };

  const handleDeliverVerdict = () => {
    if (!selectedVerdictId) return;
    setGavelStriking(true);
    sound.playGavel();

    setTimeout(() => {
      setGavelStriking(false);
      setVerdictRevealed(true);
      setCurrentRound(6);

      const chosenOption = selectedCase.verdictOptions.find(o => o.id === selectedVerdictId);
      if (chosenOption?.isCorrect) {
        sound.playSuccess();
        updateUserStats(s => ({
          ...s,
          courtroomWins: s.courtroomWins + 1,
          consumerIQ: Math.min(100, s.consumerIQ + 5),
          badgesUnlocked: Array.from(new Set([...s.badgesUnlocked, 'nyaya_judge']))
        }));
      } else {
        sound.playAlert();
      }
    }, 850);
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in transition-transform duration-200 ${gavelStriking ? 'translate-y-1 scale-[0.995]' : ''}`}>
      {/* Feature Badge & Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-purple-500/25">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-400/40 text-purple-300 text-xs font-mono mb-2 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
            <Gavel size={13} className="text-purple-400" />
            <span>FEATURE 2: INTERACTIVE VIRTUAL CONSUMER COURT</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
            AI COURTROOM <span className="text-purple-400">BENCH</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
            Preside over 5 landmark consumer disputes. Scrutinize forensic exhibits, evaluate witness cross-examinations, strike the gavel, and issue enforceable statutory decrees.
          </p>
        </div>

        {/* Mandatory Educational Notice */}
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-slate-300 max-w-md flex items-start gap-2.5">
          <Info size={16} className="text-purple-400 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            <strong className="text-white">Educational Simulation:</strong> Cases represent real dispute patterns governed by NCDRC and Supreme Court precedents under the Consumer Protection Act, 2019.
          </p>
        </div>
      </div>

      {/* Case Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {COURTROOM_CASES.map((c) => (
          <button
            key={c.id}
            onClick={() => handleSelectCase(c)}
            className={`p-3 rounded-xl text-left border transition-all ${
              selectedCase.id === c.id
                ? 'bg-purple-950/50 border-purple-400 text-purple-200 shadow-[0_0_20px_rgba(139,92,246,0.3)] scale-[1.01]'
                : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <span className="text-[10px] font-mono block text-cyan-400 uppercase tracking-wider mb-1">
              Claim: {c.disputedAmount}
            </span>
            <h4 className="text-xs font-bold text-white line-clamp-1">{c.title}</h4>
            <span className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{c.category}</span>
          </button>
        ))}
      </div>

      {/* 6-Round Judicial Progress Bar */}
      <div className="glass-panel p-3 rounded-2xl border border-purple-500/20 bg-slate-950/80">
        <div className="flex items-center justify-between gap-1 overflow-x-auto py-1">
          {rounds.map((r) => {
            const isCompleted = r.num < currentRound;
            const isCurrent = r.num === currentRound;
            return (
              <button
                key={r.num}
                onClick={() => {
                  sound.playClick();
                  setCurrentRound(r.num);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition shrink-0 ${
                  isCurrent
                    ? 'bg-gradient-to-r from-purple-600/30 to-cyan-600/30 border border-purple-400 text-purple-200 shadow-md'
                    : isCompleted
                    ? 'text-cyan-300 hover:bg-slate-900'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isCurrent ? 'bg-purple-500 text-slate-950' : isCompleted ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
                }`}>
                  {r.num}
                </span>
                <span>{r.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Courtroom Bench Stage */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border-2 border-purple-500/40 shadow-[0_0_40px_rgba(139,92,246,0.18)] bg-slate-950/95 space-y-6">
        {/* Active Proceeding Heading */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-purple-500/20">
          <div>
            <span className="text-xs font-mono text-purple-400 uppercase tracking-widest font-bold">
              JUDICIAL BENCH • ROUND {currentRound} OF 6
            </span>
            <h2 className="text-xl font-display font-black text-white">{selectedCase.title}</h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Subject: <strong className="text-cyan-400">{selectedCase.category}</strong> | Disputed: <strong className="text-emerald-400">{selectedCase.disputedAmount}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300">
              Complainant: <strong className="text-white">{selectedCase.consumerName}</strong>
            </span>
          </div>
        </div>

        {/* ROUND 1: Briefing & Facts */}
        {currentRound === 1 && (
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                <FileText size={16} />
                <span>Undisputed Factual Background</span>
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed font-sans">
                {selectedCase.brief}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-cyan-400 uppercase font-bold">Complainant / Citizen</span>
                <h4 className="text-sm font-bold text-white">{selectedCase.consumerName}</h4>
                <p className="text-xs text-slate-400">Claiming deficiency of service, refund denial, and mental distress.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-purple-400 uppercase font-bold">Opposite Party / Merchant</span>
                <h4 className="text-sm font-bold text-white">{selectedCase.sellerName}</h4>
                <p className="text-xs text-slate-400">Denying statutory liability citing user terms and intermediary protections.</p>
              </div>
            </div>
          </div>
        )}

        {/* ROUND 2: Evidence Exhibits Inspector */}
        {currentRound === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                <Eye size={16} />
                <span>Examine Forensic Exhibits ({selectedCase.evidence.length})</span>
              </h3>
              <span className="text-xs text-slate-400 font-mono">Click any exhibit to inspect in high resolution</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedCase.evidence.map((exhibit, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    sound.playClick();
                    setInspectingExhibit(exhibit);
                  }}
                  className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 hover:border-cyan-400 cursor-pointer space-y-2 flex flex-col justify-between transition-all hover:scale-[1.02]"
                >
                  <div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                      {exhibit.type.toUpperCase()} EXHIBIT
                    </span>
                    <h4 className="text-xs font-bold text-white mt-2 mb-1">{exhibit.title}</h4>
                    <p className="text-xs text-slate-300">{exhibit.description}</p>
                    <div className="mt-2 p-2 rounded bg-slate-950 text-[11px] font-mono text-cyan-200 border border-slate-800">
                      {exhibit.content}
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-800 text-[11px] text-amber-300 font-mono">
                    Forensic Significance: {exhibit.highlight}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ROUND 3: Consumer's Side */}
        {currentRound === 3 && (
          <div className="p-6 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                <User size={20} />
              </div>
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                  ORAL SUBMISSION & TESTIMONY
                </span>
                <h3 className="text-base font-bold text-white">{selectedCase.consumerName}</h3>
              </div>
            </div>

            <blockquote className="p-4 rounded-xl bg-slate-900/90 border-l-4 border-cyan-400 text-sm text-slate-200 italic leading-relaxed">
              "{selectedCase.consumerArgument.statement}"
            </blockquote>

            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-cyan-300 font-bold">Key Legal Grounds:</h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedCase.consumerArgument.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-800/80 text-xs font-mono text-emerald-300">
              Demanded Relief: <strong>{selectedCase.consumerArgument.demandedRelief}</strong>
            </div>
          </div>
        )}

        {/* ROUND 4: Seller's Side */}
        {currentRound === 4 && (
          <div className="p-6 rounded-2xl bg-purple-950/20 border border-purple-500/30 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300">
                <Shield size={20} />
              </div>
              <div>
                <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold">
                  OPPOSITE PARTY SUBMISSION
                </span>
                <h3 className="text-base font-bold text-white">{selectedCase.sellerName}</h3>
              </div>
            </div>

            <blockquote className="p-4 rounded-xl bg-slate-900/90 border-l-4 border-purple-400 text-sm text-slate-200 italic leading-relaxed">
              "{selectedCase.sellerArgument.statement}"
            </blockquote>

            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-purple-300 font-bold">Defense Submissions:</h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedCase.sellerArgument.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">▪</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 text-xs font-mono text-slate-300 border border-slate-800">
              Contract Clause Cited by Defense: <span className="text-purple-300">{selectedCase.sellerArgument.defenseClause}</span>
            </div>
          </div>
        )}

        {/* ROUND 5: Judicial Decision (User As Judge) */}
        {currentRound === 5 && (
          <div className="space-y-4">
            <div className="text-center space-y-1 mb-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-400/40 text-purple-300 mb-2 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                <Gavel size={28} className={gavelStriking ? 'animate-bounce text-amber-400' : ''} />
              </div>
              <h3 className="font-display font-black text-lg text-white">THE BENCH DELIBERATION</h3>
              <p className="text-xs text-slate-400">
                Weigh the submissions against the Consumer Protection Act 2019 and choose the statutory judgment:
              </p>
            </div>

            <div className="space-y-3">
              {selectedCase.verdictOptions.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedVerdictId(opt.id);
                  }}
                  className={`p-4 rounded-xl cursor-pointer border transition-all ${
                    selectedVerdictId === opt.id
                      ? 'bg-purple-950/60 border-purple-400 shadow-[0_0_25px_rgba(139,92,246,0.35)] scale-[1.01]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      selectedVerdictId === opt.id ? 'border-purple-400 bg-purple-500' : 'border-slate-600'
                    }`}>
                      {selectedVerdictId === opt.id && <span className="w-2 h-2 rounded-full bg-slate-950"></span>}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white mb-1">{opt.title}</h4>
                      <p className="text-xs text-slate-300">{opt.description}</p>
                      {opt.compensationAwarded && (
                        <span className="inline-block mt-2 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                          Proposed Redressal: {opt.compensationAwarded}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center pt-4">
              <button
                disabled={!selectedVerdictId || gavelStriking}
                onClick={handleDeliverVerdict}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-slate-950 font-display font-black text-sm uppercase tracking-wider flex items-center gap-2 hover:shadow-[0_0_35px_rgba(139,92,246,0.5)] transition disabled:opacity-40"
              >
                <Gavel size={18} />
                <span>{gavelStriking ? 'STRIKING THE GAVEL...' : 'Deliver Official Judgment (Order Decree)'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ROUND 6: The Verdict, Law & Official Commission Decree */}
        {currentRound === 6 && (
          <div className="space-y-6 animate-fade-in">
            {/* Judicial Order Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-cyan-950/60 border-2 border-purple-400/60 shadow-[0_0_35px_rgba(139,92,246,0.25)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-mono text-purple-300 font-bold">
                  <Gavel size={16} />
                  <span>OFFICIAL DISTRICT REDRESSAL COMMISSION ORDER</span>
                </span>
                <button
                  onClick={() => {
                    sound.playSuccess();
                    setShowCertificateModal(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 text-xs font-mono flex items-center gap-1.5 hover:bg-cyan-500/30 transition"
                >
                  <Award size={14} />
                  <span>View Official Decree Certificate</span>
                </button>
              </div>

              <h3 className="font-display font-black text-xl text-white">
                JUDGMENT IN FAVOR OF:{' '}
                <span className="text-cyan-400 uppercase">
                  {selectedCase.actualJudicialVerdict.winner.toUpperCase()}
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {selectedCase.actualJudicialVerdict.fullReasoning}
              </p>
            </div>

            {/* Applicable Statutory Citations */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <h4 className="text-xs font-mono uppercase text-cyan-400 tracking-wider flex items-center gap-2 font-bold">
                <Scale size={15} />
                <span>Statutory Authority & Precedents:</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300 font-mono">
                {selectedCase.actualJudicialVerdict.legalCitations.map((cite, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-cyan-400 font-bold">§</span>
                    <span>{cite}</span>
                  </li>
                ))}
              </ul>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-400 mt-2">
                <strong>Precedent Ruling:</strong> {selectedCase.actualJudicialVerdict.precedentCase}
              </div>
            </div>

            {/* Real Life Takeaway */}
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-1.5">
              <h4 className="text-xs font-mono uppercase text-emerald-300 font-bold flex items-center gap-1.5">
                <CheckCircle2 size={15} />
                <span>What Consumers Should Do in Real Life:</span>
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                {selectedCase.actualJudicialVerdict.actionableTakeaway}
              </p>
            </div>
          </div>
        )}

        {/* Stepper Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={handlePreviousRound}
            disabled={currentRound === 1}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white disabled:opacity-30 transition"
          >
            ← Previous Round
          </button>

          <span className="text-xs font-mono text-slate-500">
            Round {currentRound} of 6
          </span>

          <button
            onClick={handleNextRound}
            disabled={currentRound === 6}
            className="px-5 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/50 text-xs font-mono text-purple-200 hover:text-white disabled:opacity-30 transition flex items-center gap-1"
          >
            <span>Next Round</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Exhibit Forensic Magnifier Modal */}
      {inspectingExhibit && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="glass-panel max-w-lg w-full p-6 sm:p-8 rounded-2xl border-2 border-cyan-400/60 shadow-[0_0_40px_rgba(0,242,254,0.3)] bg-slate-950 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Eye size={18} className="text-cyan-400" />
                <h3 className="text-sm font-bold text-white">{inspectingExhibit.title}</h3>
              </div>
              <button onClick={() => setInspectingExhibit(null)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-cyan-200 space-y-2">
              <span className="text-[10px] text-slate-400 block uppercase">EXHIBIT TRANSCRIPT / DATA:</span>
              <p className="whitespace-pre-wrap">{inspectingExhibit.content}</p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {inspectingExhibit.description}
            </p>

            <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300">
              Forensic Weight: {inspectingExhibit.highlight}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setInspectingExhibit(null)}
                className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs"
              >
                Close Exhibit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official Judgment Certificate Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="glass-panel max-w-xl w-full p-8 rounded-3xl border-2 border-purple-400 shadow-[0_0_60px_rgba(139,92,246,0.4)] bg-[#090b16] space-y-6 relative overflow-hidden text-center">
            {/* Top Seal Stamp */}
            <div className="w-16 h-16 mx-auto rounded-full bg-purple-500/20 border-2 border-purple-400 flex items-center justify-center text-purple-300 shadow-[0_0_20px_rgba(139,92,246,0.4)]">
              <Scale size={32} />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-purple-400 block font-bold">
                DISTRICT CONSUMER DISPUTES REDRESSAL COMMISSION
              </span>
              <h2 className="font-display font-black text-2xl text-white">
                OFFICIAL DECREE OF JUDGMENT
              </h2>
              <p className="text-xs font-mono text-slate-400">
                Order No: DCDRC/NYAYA/{Date.now().toString().slice(-6)}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200 text-left space-y-2 font-mono">
              <div><strong>Case:</strong> {selectedCase.title}</div>
              <div><strong>Complainant:</strong> {selectedCase.consumerName}</div>
              <div><strong>Respondent:</strong> {selectedCase.sellerName}</div>
              <div><strong>Disputed Value:</strong> {selectedCase.disputedAmount}</div>
              <div><strong>Statutory Finding:</strong> {selectedCase.actualJudicialVerdict.legalCitations[0]}</div>
              <div className="text-emerald-400 pt-1 border-t border-slate-800">
                <strong>Ordered Relief:</strong> Full refund with punitive compensation as mandated under CPA 2019.
              </div>
            </div>

            <div className="flex justify-between items-center text-xs font-mono text-slate-400 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  sound.playSuccess();
                  window.print();
                }}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-cyan-300 hover:text-white flex items-center gap-1.5"
              >
                <Download size={14} />
                <span>Print Decree</span>
              </button>
              <button
                onClick={() => setShowCertificateModal(false)}
                className="px-6 py-2 rounded-xl bg-purple-500 text-slate-950 font-bold"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
