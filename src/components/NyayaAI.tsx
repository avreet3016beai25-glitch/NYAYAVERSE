import React, { useState, useEffect, useRef } from 'react';
import { AIMessage } from '../services/gemini';
import { askNyayaAI, getStoredGeminiKey } from '../services/gemini';
import { sound } from '../services/sound';
import { speechService } from '../services/speech';
import { 
  Bot, 
  User, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Send, 
  Sparkles, 
  Scale, 
  CheckCircle2, 
  FileText, 
  Clock, 
  HelpCircle,
  Zap,
  Info,
  ChevronRight
} from './icons';

interface NyayaAIProps {
  initialQuery?: string;
  onNavigateToComplaint?: (context?: any) => void;
}

export const NyayaAI: React.FC<NyayaAIProps> = ({
  initialQuery,
  onNavigateToComplaint,
}) => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      role: 'assistant',
      content: `### ⚖️ Nyaya AI Initialized
Greetings. I am your specialized AI Consumer Protection Investigator for India.

Describe any consumer dispute, unfair charge, warranty refusal, or deceptive marketing practice in plain words. I will assess your legal standing, cite exact sections under the **Consumer Protection Act, 2019**, specify evidence to preserve, and outline your formal escalation path.

*You can speak via the microphone or choose one of the common investigations below.*`,
      timestamp: '09:00',
      isLiveAI: !!getStoredGeminiKey(),
      actionPlan: [
        'Describe the dispute factually with dates and amounts',
        'State whether you made written communication with the merchant',
        'Review generated evidence checklist and action roadmap'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState(initialQuery || '');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingIdx, setSpeakingIdx] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const hasGeminiKey = !!getStoredGeminiKey();

  const suggestedPrompts = [
    'Can a restaurant make service charge mandatory under law?',
    'E-commerce seller delivered duplicate phone and rejected return',
    'Airline cancelled flight and deducted 95% cancellation fee',
    'Bank delayed reporting of unauthorized ₹35,000 UPI debit',
    'Fitness app auto-debited ₹2,999 after I cancelled free trial',
    'Cosmetics brand made fake 100% cure claims causing skin allergy'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleSend(initialQuery);
    }
  }, []);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || loading) return;

    sound.playClick();
    const userMsg: AIMessage = {
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);
    sound.playScan();

    try {
      const response = await askNyayaAI(text, messages);
      setMessages((prev) => [...prev, response]);
      sound.playSuccess();
    } catch {
      const fallback: AIMessage = {
        role: 'assistant',
        content: 'Apologies, an error occurred while processing your query. Please rephrase or inspect the evidence checklist below.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallback]);
      sound.playAlert();
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVoice = () => {
    if (!speechService.isSupported()) {
      alert('Speech recognition is not supported in this browser. Please use Chrome/Edge or type your message.');
      return;
    }

    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
    } else {
      sound.playClick();
      setIsListening(true);
      speechService.startListening(
        (recognized) => {
          setInputValue(recognized);
          setIsListening(false);
          handleSend(recognized);
        },
        () => setIsListening(false),
        () => setIsListening(false)
      );
    }
  };

  const handleSpeakText = (text: string, idx: number) => {
    if (speakingIdx === idx) {
      speechService.stopSpeaking();
      setSpeakingIdx(null);
    } else {
      sound.playClick();
      setSpeakingIdx(idx);
      speechService.speak(text);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header & Status Indicator */}
      <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-950/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-display font-black text-2xl text-white">NYAYA AI</span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-500/30">
              LEGAL INVESTIGATOR
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Intelligent dialogue to diagnostic-analyze consumer disputes, explain Indian statutes in plain language, and generate formal evidence checklists.
          </p>
        </div>

        {/* Engine Transparency Badge as requested */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono">
          <span className={`w-2 h-2 rounded-full ${hasGeminiKey ? 'bg-emerald-400 animate-ping' : 'bg-cyan-400'}`}></span>
          <span className="text-slate-300">
            Engine: <strong className={hasGeminiKey ? 'text-emerald-300' : 'text-cyan-300'}>{hasGeminiKey ? 'Live Gemini 1.5 Flash' : 'Nyaya Legal Reasoning Engine'}</strong>
          </span>
        </div>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
          Suggested investigations (Click to ask):
        </span>
        <div className="flex flex-wrap gap-2">
          {suggestedPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 text-xs text-slate-300 hover:text-cyan-300 transition text-left"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="glass-panel rounded-2xl border border-cyan-500/20 bg-slate-950/90 min-h-[460px] max-h-[580px] overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg, idx) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={idx}
              className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shrink-0">
                  <Bot size={18} />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 space-y-3 ${
                  isUser
                    ? 'bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border border-cyan-400/40 text-slate-100'
                    : 'bg-slate-900/90 border border-slate-800 text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-800 pb-1.5 mb-2">
                  <span className="font-semibold text-cyan-300">
                    {isUser ? 'You' : 'Nyaya AI Investigator'}
                  </span>
                  <div className="flex items-center gap-2">
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => handleSpeakText(msg.content, idx)}
                        className="text-slate-400 hover:text-cyan-300"
                        title={speakingIdx === idx ? 'Stop voice reading' : 'Read aloud with AI voice'}
                      >
                        {speakingIdx === idx ? <VolumeX size={14} className="text-amber-400" /> : <Volume2 size={14} />}
                      </button>
                    )}
                  </div>
                </div>

                {/* Render formatted text content */}
                <div className="text-xs sm:text-sm whitespace-pre-line leading-relaxed font-sans">
                  {msg.content}
                </div>

                {/* Action Plan Chips if present */}
                {msg.actionPlan && msg.actionPlan.length > 0 && !isUser && (
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-cyan-500/20 space-y-1.5 mt-2">
                    <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block font-bold">
                      ⚡ Action Plan Highlights:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {msg.actionPlan.map((action, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Direct Action to launch complaint generator */}
                {!isUser && idx > 0 && onNavigateToComplaint && (
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => onNavigateToComplaint({ narrative: msg.content })}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-semibold flex items-center gap-1 transition"
                    >
                      <FileText size={13} />
                      <span>Draft Legal Notice with this Plan →</span>
                    </button>
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0">
                  <User size={18} />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-3 items-center text-cyan-400 text-xs font-mono">
            <Bot size={18} className="animate-spin" />
            <span>Analyzing situation against Indian Consumer Statutes & Precedents...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form with Voice Button */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="glass-panel p-3 rounded-2xl border border-cyan-500/30 flex items-center gap-2 bg-slate-950/90"
      >
        {/* Voice Input Button */}
        <button
          type="button"
          onClick={handleToggleVoice}
          className={`p-3 rounded-xl transition ${
            isListening
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50 animate-pulse'
              : 'bg-slate-900 text-slate-400 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40'
          }`}
          title={isListening ? 'Listening... click to stop' : 'Describe your problem using voice (Web Speech)'}
        >
          {isListening ? <MicOff size={18} /> : <Mic size={18} />}
        </button>

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={isListening ? 'Listening to your voice...' : 'Describe what happened (e.g., flight cancelled, refused refund, above MRP...)'}
          className="flex-1 bg-transparent px-3 py-2 text-white placeholder-slate-500 text-xs sm:text-sm outline-none"
        />

        <button
          type="submit"
          disabled={!inputValue.trim() || loading}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
        >
          <span>Ask</span>
          <ChevronRight size={15} />
        </button>
      </form>
    </div>
  );
};
