import React, { useState } from 'react';
import { DAILY_CHALLENGES } from '../data/dailyChallenges';
import { sound } from '../services/sound';
import { updateUserStats } from '../services/storage';
import { Sparkles, CheckCircle2, AlertTriangle, X, Award } from './icons';

interface DailyChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DailyChallengeModal: React.FC<DailyChallengeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [answered, setAnswered] = useState<boolean>(false);
  const challenge = DAILY_CHALLENGES[0];

  if (!isOpen) return null;

  const handleSelect = (idx: number) => {
    if (answered) return;
    sound.playClick();
    setSelectedOptionIdx(idx);
    setAnswered(true);

    const isCorrect = challenge.options[idx].isCorrect;
    if (isCorrect) {
      sound.playSuccess();
      updateUserStats((s) => ({
        ...s,
        consumerIQ: Math.min(100, s.consumerIQ + 3)
      }));
    } else {
      sound.playAlert();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="glass-panel max-w-lg w-full p-6 sm:p-8 rounded-2xl border-2 border-cyan-400/60 shadow-[0_0_40px_rgba(0,242,254,0.3)] bg-slate-950 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-amber-400" />
            <h3 className="font-display font-bold text-base text-white">Daily Consumer Challenge</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
          <span>DAY 1 OF 30 STREAK</span>
          <span className="text-amber-400">+{challenge.xpReward} XP Reward</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
          {challenge.question}
        </p>

        <div className="space-y-2 pt-2">
          {challenge.options.map((opt, idx) => {
            const isSelected = selectedOptionIdx === idx;
            return (
              <div
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`p-3 rounded-xl border text-xs cursor-pointer transition ${
                  answered
                    ? opt.isCorrect
                      ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                      : isSelected
                      ? 'bg-rose-950/50 border-rose-500 text-rose-200'
                      : 'bg-slate-900 border-slate-800 opacity-50'
                    : 'bg-slate-900 border-slate-700 hover:border-cyan-400 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{opt.text}</span>
                  {answered && opt.isCorrect && (
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 ml-2" />
                  )}
                  {answered && isSelected && !opt.isCorrect && (
                    <AlertTriangle size={16} className="text-rose-400 shrink-0 ml-2" />
                  )}
                </div>

                {answered && isSelected && (
                  <p className="mt-2 text-[11px] font-mono pt-1.5 border-t border-slate-800 text-slate-300">
                    {opt.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {answered && (
          <div className="pt-2 flex justify-between items-center text-xs font-mono text-slate-400">
            <span>Statute: {challenge.statute}</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
