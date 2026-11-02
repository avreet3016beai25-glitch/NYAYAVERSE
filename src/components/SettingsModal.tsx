import React, { useState } from 'react';
import { Theme } from '../types';
import { getStoredGeminiKey, saveGeminiKey } from '../services/gemini';
import { sound } from '../services/sound';
import { Settings, X, Lock, CheckCircle2, RefreshCw, Sun, Moon } from './icons';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  theme,
  onToggleTheme,
  soundEnabled,
  onToggleSound,
}) => {

  const [apiKey, setApiKey] = useState(getStoredGeminiKey());
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    saveGeminiKey(apiKey);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleResetData = () => {
    if (confirm('Reset demo stats, scan history, and saved complaint drafts in your local browser?')) {
      sound.playClick();
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="glass-panel max-w-md w-full p-6 sm:p-8 rounded-2xl border-2 border-cyan-400/60 shadow-[0_0_50px_rgba(0,242,254,0.3)] bg-slate-950 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Settings size={18} className="text-cyan-400" />
            <h3 className="font-display font-bold text-base text-white">Platform Configuration</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Gemini API Key Section */}
        <form onSubmit={handleSaveKey} className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-mono text-cyan-300 font-semibold flex items-center gap-1.5">
                <Lock size={13} />
                <span>Google Gemini API Key (Optional)</span>
              </label>
              <span className="text-[10px] text-slate-400 font-mono">Local Only</span>
            </div>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-xs outline-none focus:border-cyan-400"
            />
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              When configured, Nyaya AI uses live Gemini 1.5 Flash models. When empty, it uses our built-in Indian consumer legal reasoning engine. Your key is stored strictly inside your browser's localStorage.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs"
            >
              {savedSuccess ? 'Key Saved ✓' : 'Save Configuration'}
            </button>
            {apiKey && (
              <button
                type="button"
                onClick={() => {
                  setApiKey('');
                  saveGeminiKey('');
                }}
                className="text-xs text-rose-400 underline font-mono"
              >
                Clear Key
              </button>
            )}
          </div>
        </form>

        {/* Theme Mode Toggle */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              {theme === 'dark' ? <Moon size={14} className="text-purple-400" /> : <Sun size={14} className="text-amber-400" />}
              <span>Appearance Mode</span>
            </h4>
            <p className="text-[11px] text-slate-400">Toggle between Dark Cyber and Clean Light UI</p>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onToggleTheme();
            }}
            className="px-3.5 py-1.5 rounded-lg text-xs font-mono border transition flex items-center gap-1.5 bg-slate-900 text-cyan-300 border-slate-700 hover:border-cyan-400"
          >
            {theme === 'dark' ? 'DARK MODE' : 'LIGHT MODE'}
          </button>
        </div>

        {/* Sound FX Toggle */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-white">Cyber Synthesizer Audio FX</h4>
            <p className="text-[11px] text-slate-400">Web Audio API tones for clicks, scans and gavels</p>
          </div>
          <button
            onClick={() => {
              onToggleSound();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition ${
              soundEnabled
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                : 'bg-slate-900 text-slate-500 border-slate-700'
            }`}
          >
            {soundEnabled ? 'ENABLED' : 'MUTED'}
          </button>
        </div>

        {/* Data Reset */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-slate-300">Local Dossier Data</h4>
            <p className="text-[11px] text-slate-400">Reset scores, saved scans and complaints</p>
          </div>
          <button
            onClick={handleResetData}
            className="px-3 py-1.5 rounded-lg bg-slate-900 text-rose-400 hover:bg-rose-950/40 border border-slate-800 text-xs font-mono"
          >
            Reset Data
          </button>
        </div>

        <div className="pt-3 border-t border-slate-800 text-center">
          <span className="text-[10px] font-mono text-slate-500">
            NYAYAVERSE v1.0 • Built for THINK 2 BUILD HACKATHON
          </span>
        </div>
      </div>
    </div>
  );
};
