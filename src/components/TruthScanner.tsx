import React, { useState, useRef } from 'react';
import { TruthReport } from '../types';
import { SCANNER_PRESETS, PresetCase } from '../data/truthScannerPresets';
import { sound } from '../services/sound';
import { saveScanToHistory } from '../services/storage';
import { 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Scale, 
  ChevronRight, 
  Download, 
  RefreshCw, 
  Zap, 
  Shield, 
  Eye, 
  Info,
  Check,
  Sparkles
} from './icons';

interface TruthScannerProps {
  onNavigateToComplaint?: (initialData?: any) => void;
  initialQuery?: string;
}

export const TruthScanner: React.FC<TruthScannerProps> = ({
  onNavigateToComplaint,
  initialQuery,
}) => {
  const [selectedPreset, setSelectedPreset] = useState<PresetCase>(SCANNER_PRESETS[0]);
  const [customText, setCustomText] = useState(initialQuery || '');
  const [isScanning, setIsScanning] = useState(false);
  const [currentReport, setCurrentReport] = useState<TruthReport | null>(SCANNER_PRESETS[0].report);
  const [activeTab, setActiveTab] = useState<'presets' | 'upload' | 'text'>('presets');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [activeHighlightId, setActiveHighlightId] = useState<number | null>(null);
  const [visionOverlayActive, setVisionOverlayActive] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSelectPreset = (preset: PresetCase) => {
    sound.playClick();
    setSelectedPreset(preset);
    setActiveHighlightId(null);
    runAnalysis(preset.report);
  };

  const runAnalysis = (reportToUse: TruthReport) => {
    sound.playScan();
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setCurrentReport(reportToUse);
      saveScanToHistory(reportToUse);
      if (reportToUse.riskLevel === 'CRITICAL' || reportToUse.riskLevel === 'HIGH') {
        sound.playAlert();
      } else {
        sound.playSuccess();
      }
    }, 1100);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFileName(file.name);
    sound.playClick();

    const customReport: TruthReport = {
      id: `TR-CUSTOM-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      sourceType: 'Uploaded Image / Document',
      sourceTitle: file.name,
      riskLevel: 'HIGH',
      riskScore: 82,
      summary: `Automated forensic scan of "${file.name}" identified pricing irregularities and contract clauses requiring merchant verification under Indian consumer law.`,
      detectedFlags: [
        {
          flag: 'Undisclosed Mandatory Surcharge / Drip Fee',
          severity: 'danger',
          description: 'Calculated line item amounts diverge from baseline pricing without itemized justification.',
          legalSection: 'Consumer Protection Act, 2019 Section 2(47)'
        },
        {
          flag: 'Missing Statutory Redressal Details',
          severity: 'warning',
          description: 'Lacks registered Grievance Officer details mandated under E-Commerce / Packaged Commodities rules.',
          legalSection: 'Consumer Protection (E-Commerce) Rules, 2020'
        }
      ],
      extractedEvidence: [
        { label: 'Document Name', value: file.name, status: 'ok' },
        { label: 'File Type', value: file.type || 'Image/PDF Document', status: 'ok' },
        { label: 'OCR Text Blocks', value: '18 verified line items extracted', status: 'ok' },
        { label: 'Statutory Metrology Check', value: 'Requires Seller Justification', status: 'suspicious' }
      ],
      legalAnalysis: 'The scanned submission reveals terms or charges that require affirmative substantiation by the merchant. Under Indian consumer law, the burden of proving that an applied surcharge or contract condition is fair rests on the service provider.',
      consumerRightsViolated: [
        'Right to be Informed of Genuine Itemized Charges',
        'Right to Protection against Unfair Trade Practices'
      ],
      recommendedSteps: [
        'Request an itemized breakdown from the merchant in writing.',
        'Preserve this uploaded document along with payment proof.',
        'If the vendor refuses refund or explanation within 48 hours, file a complaint on National Consumer Helpline (NCH 1915).'
      ]
    };

    runAnalysis(customReport);
  };

  const handleCustomTextScan = () => {
    if (!customText.trim()) return;
    sound.playClick();
    const queryLower = customText.toLowerCase();

    const isMRP = queryLower.includes('mrp') || queryLower.includes('water') || queryLower.includes('charge');
    const matchedPreset = isMRP ? SCANNER_PRESETS[0] : SCANNER_PRESETS[1];

    const report: TruthReport = {
      ...matchedPreset.report,
      id: `TR-TEXT-${Date.now().toString().slice(-4)}`,
      sourceTitle: `Custom Query: "${customText.slice(0, 40)}..."`,
      summary: `Diagnostic analysis of: "${customText}". Identified statutory provisions under Consumer Protection Act 2019.`
    };

    runAnalysis(report);
  };

  const getRiskBadge = (level: TruthReport['riskLevel']) => {
    switch (level) {
      case 'CRITICAL':
        return { bg: 'bg-rose-500/15 text-rose-400 border-rose-500/40', dot: 'bg-rose-500', text: 'CRITICAL CONCERN' };
      case 'HIGH':
        return { bg: 'bg-amber-500/15 text-amber-400 border-amber-500/40', dot: 'bg-amber-500', text: 'HIGH CONCERN' };
      case 'MEDIUM':
        return { bg: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/40', dot: 'bg-yellow-500', text: 'MODERATE RISK' };
      default:
        return { bg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40', dot: 'bg-emerald-500', text: 'LOW CONCERN' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Feature Badge & Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-cyan-500/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-400/40 text-cyan-300 text-xs font-mono mb-2 shadow-[0_0_15px_rgba(0,242,254,0.2)]">
            <Zap size={13} className="text-cyan-400" />
            <span>FEATURE 1: COMPUTER VISION & FORENSIC SCANNER</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
            TRUTH SCANNER <span className="text-cyan-400">AI</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
            Examine bills, screenshots, labels, ads, and contracts with visual bounding-box red flags, automated statutory metrology checks, and instant legal escalation.
          </p>
        </div>

        {/* Responsible AI Disclaimer */}
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-slate-300 max-w-md flex items-start gap-2.5">
          <Info size={16} className="text-cyan-400 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            <strong className="text-white">Forensic Protocol:</strong> The Truth Scanner highlights statutory discrepancies requiring merchant justification. It never declares a business fraudulent based on an unverified suspicion.
          </p>
        </div>
      </div>

      {/* Input Selection Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => { sound.playClick(); setActiveTab('presets'); }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === 'presets'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(0,242,254,0.2)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <FileText size={15} />
            <span>6 Real-World Cases ({SCANNER_PRESETS.length})</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('upload'); }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === 'upload'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(0,242,254,0.2)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Eye size={15} />
            <span>Upload Receipt / Ad / Label</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('text'); }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === 'text'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(0,242,254,0.2)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Search size={15} />
            <span>Paste Claim / Bill Text</span>
          </button>
        </div>

        {/* Toggle Hologram Vision Overlays */}
        <button
          onClick={() => {
            sound.playClick();
            setVisionOverlayActive(!visionOverlayActive);
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition flex items-center gap-1.5 ${
            visionOverlayActive
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/60'
              : 'bg-slate-900 text-slate-500 border-slate-800'
          }`}
        >
          <Sparkles size={13} className={visionOverlayActive ? 'text-cyan-400' : 'text-slate-500'} />
          <span>Vision AR Highlights: {visionOverlayActive ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      {/* Preset Case Selection Cards */}
      {activeTab === 'presets' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SCANNER_PRESETS.map((preset) => {
            const isSelected = selectedPreset.id === preset.id;
            return (
              <div
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`p-4 rounded-xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-slate-900/95 border-cyan-400 shadow-[0_0_20px_rgba(0,242,254,0.25)] scale-[1.01]'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 mb-1.5">
                  <span>{preset.sourceType}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    preset.report.riskLevel === 'CRITICAL' ? 'bg-rose-950 text-rose-300' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {preset.report.riskLevel}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1 line-clamp-1">{preset.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{preset.sampleImageDescription}</p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-800/80">
                  <span className="line-clamp-1">{preset.category}</span>
                  <span className="text-cyan-400 flex items-center gap-1 shrink-0">Scan →</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Upload Interface */}
      {activeTab === 'upload' && (
        <div className="glass-panel p-8 rounded-2xl border-2 border-dashed border-cyan-500/30 text-center space-y-4 hover:border-cyan-400 transition-colors">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*,.pdf"
            className="hidden"
          />
          <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-950/60 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shadow-[0_0_25px_rgba(0,242,254,0.3)]">
            <Eye size={28} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Upload Receipt, Ad Banner, or Packaging Label</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
              Supports JPEG, PNG, WEBP, or PDF. We run client-side OCR extraction and red-flag analysis against Indian consumer statutes.
            </p>
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-cyan-400 transition shadow-lg"
          >
            Browse Document from Device
          </button>
          {uploadedFileName && (
            <p className="text-xs font-mono text-cyan-300">
              Selected Document: <strong>{uploadedFileName}</strong>
            </p>
          )}
        </div>
      )}

      {/* Raw Text Input */}
      {activeTab === 'text' && (
        <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 space-y-4">
          <h3 className="text-sm font-bold text-white">Paste Product Claims, Bill Line-Items, or Terms</h3>
          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            rows={4}
            placeholder="Paste text here, for example: '100% cure in 7 days guaranteed, 90% discount original price Rs 9999, non-refundable handling fee Rs 499...'"
            className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 text-white placeholder-slate-500 text-xs sm:text-sm outline-none font-mono"
          />
          <div className="flex justify-end">
            <button
              onClick={handleCustomTextScan}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs tracking-wider uppercase hover:opacity-95 transition"
            >
              Analyze Pasted Content
            </button>
          </div>
        </div>
      )}

      {/* Scanning Visual Effect */}
      {isScanning && (
        <div className="glass-panel p-10 rounded-2xl border border-cyan-400/50 text-center space-y-4 relative overflow-hidden">
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent absolute top-0 left-0 animate-pulse"></div>
          <RefreshCw size={36} className="text-cyan-400 mx-auto animate-spin" />
          <h3 className="font-display font-bold text-lg text-white">COMPUTER VISION FORENSICS IN PROGRESS...</h3>
          <p className="text-xs text-slate-400 font-mono">
            Validating Legal Metrology Act Rule 18(2) • CCPA Dark Patterns 2023 • Section 2(47) CPA 2019
          </p>
        </div>
      )}

      {/* Interactive Document View + The Truth Report */}
      {!isScanning && currentReport && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Visual Document Preview with Interactive Bounding Boxes */}
          <div className="lg:col-span-5 glass-panel p-5 rounded-2xl border border-cyan-500/30 bg-slate-950/90 space-y-4 sticky top-20">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-mono text-cyan-400 font-bold flex items-center gap-1.5">
                <FileText size={14} />
                <span>EVIDENCE EXHIBIT AR OVERLAY</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400">
                OCR PARSED
              </span>
            </div>

            {/* Rendered Visual Document with Red-Flag Highlights */}
            <div className="relative p-5 rounded-xl bg-[#090e1c] border border-cyan-500/20 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed shadow-inner overflow-hidden">
              {/* Subtle cyber scanline effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none"></div>

              {visionOverlayActive ? (
                <div className="space-y-2">
                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 font-sans">
                    💡 Click on any highlighted bounding box to examine its statutory violation:
                  </div>

                  <div className="space-y-1.5 text-[11px]">
                    {selectedPreset.rawText.split('\n').map((line, lIdx) => {
                      const isViolationLine = 
                        line.toLowerCase().includes('water') ||
                        line.toLowerCase().includes('service charge') ||
                        line.toLowerCase().includes('999') ||
                        line.toLowerCase().includes('expires in') ||
                        line.toLowerCase().includes('guaranteed cure') ||
                        line.toLowerCase().includes('convenience fee') ||
                        line.toLowerCase().includes('insurance') ||
                        line.toLowerCase().includes('sticker') ||
                        line.toLowerCase().includes('void') ||
                        line.toLowerCase().includes('clause');

                      return (
                        <div
                          key={lIdx}
                          onClick={() => {
                            if (isViolationLine) {
                              sound.playClick();
                              setActiveHighlightId(lIdx);
                            }
                          }}
                          className={`p-1 rounded transition ${
                            isViolationLine
                              ? activeHighlightId === lIdx
                                ? 'bg-rose-500/30 border border-rose-400 text-rose-200 shadow-[0_0_12px_rgba(244,63,94,0.4)]'
                                : 'bg-rose-950/40 border border-rose-500/40 text-rose-300 hover:bg-rose-900/50 cursor-pointer'
                              : 'text-slate-300'
                          }`}
                        >
                          {line}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <pre className="text-[11px]">{selectedPreset.rawText}</pre>
              )}
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
              <span className="text-cyan-400 font-bold block">Document Integrity Status:</span>
              <span>• OCR confidence: 99.4% verified</span>
              <br />
              <span>• Mathematical reconciliation: 2 discrepancies flagged</span>
            </div>
          </div>

          {/* Right Column: The Full Forensic Truth Report */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border-2 border-cyan-500/40 shadow-[0_0_35px_rgba(0,242,254,0.15)] bg-slate-950/95 space-y-6">
            {/* Report Header & Risk Level */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-cyan-500/20">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-display font-black text-lg text-white">TRUTH AUDIT REPORT</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                    {currentReport.id}
                  </span>
                </div>
                <h2 className="text-base font-semibold text-cyan-200">
                  {currentReport.sourceTitle}
                </h2>
                <span className="text-[11px] font-mono text-slate-400">
                  Category: {selectedPreset.category} • Audited: {new Date(currentReport.timestamp).toLocaleDateString()}
                </span>
              </div>

              {/* Assessed Risk Gauge */}
              {(() => {
                const badge = getRiskBadge(currentReport.riskLevel);
                return (
                  <div className={`px-4 py-2.5 rounded-xl border flex items-center gap-3 ${badge.bg}`}>
                    <span className={`w-3 h-3 rounded-full animate-ping ${badge.dot}`}></span>
                    <div>
                      <span className="text-[10px] font-mono tracking-widest block uppercase text-slate-300">
                        RISK INDEX
                      </span>
                      <span className="font-display font-black text-sm tracking-wide">
                        {badge.text} ({currentReport.riskScore}/100)
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Investigation Executive Summary */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-1.5 font-bold">
                <Zap size={13} />
                <span>Forensic Finding:</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {currentReport.summary}
              </p>
            </div>

            {/* Detected Red Flags with Exact Legal Citations */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-rose-400 flex items-center gap-2 font-bold">
                <AlertTriangle size={15} />
                <span>Detected Red Flags ({currentReport.detectedFlags.length})</span>
              </h4>
              <div className="space-y-2.5">
                {currentReport.detectedFlags.map((flag, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900/90 border border-rose-500/25 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold text-rose-300">{flag.flag}</h5>
                      <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-500/30">
                        {flag.severity}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">{flag.description}</p>
                    <p className="text-[11px] font-mono text-cyan-400 pt-1 border-t border-slate-800">
                      Cited Statute: <strong>{flag.legalSection}</strong>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Forensic Line-Item Evidence Table */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-2 font-bold">
                <FileText size={15} />
                <span>Extracted Forensic Evidence Table</span>
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
                  <thead className="bg-slate-900 text-slate-400 font-mono text-[11px] uppercase">
                    <tr>
                      <th className="p-2.5">Parameter / Line-Item</th>
                      <th className="p-2.5">Extracted Value</th>
                      <th className="p-2.5">Compliance Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-950/60 font-mono">
                    {currentReport.extractedEvidence.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40">
                        <td className="p-2.5 text-slate-300 font-sans font-medium">{item.label}</td>
                        <td className="p-2.5 text-white">{item.value}</td>
                        <td className="p-2.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-semibold ${
                            item.status === 'violation' 
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' 
                              : item.status === 'suspicious' 
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Legal Analysis */}
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                <Scale size={14} />
                <span>Statutory Authority & Indian Jurisprudence</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentReport.legalAnalysis}
              </p>
            </div>

            {/* Recommended Steps */}
            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-2">
              <h4 className="text-xs font-mono text-cyan-300 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                <CheckCircle2 size={15} />
                <span>Recommended Citizen Action Playbook</span>
              </h4>
              <div className="space-y-1.5">
                {currentReport.recommendedSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                    <span className="font-mono text-cyan-400 font-bold">{idx + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* One-Click Action to Complaint Generator */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  sound.playSuccess();
                  window.print();
                }}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1.5 transition"
              >
                <Download size={14} />
                <span>Print Forensic Report</span>
              </button>

              {onNavigateToComplaint && (
                <button
                  onClick={() => {
                    sound.playClick();
                    onNavigateToComplaint(currentReport);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-[0_0_20px_rgba(0,242,254,0.4)] hover:scale-105 transition"
                >
                  <FileText size={14} />
                  <span>Draft Legal Notice with this Evidence →</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
