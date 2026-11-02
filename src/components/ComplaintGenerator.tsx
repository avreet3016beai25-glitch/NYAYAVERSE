import React, { useState, useEffect } from 'react';
import { sound } from '../services/sound';
import { saveComplaint } from '../services/storage';
import { 
  FileText, 
  CheckCircle2, 
  Copy, 
  Download, 
  ExternalLink, 
  Scale, 
  Shield, 
  AlertTriangle,
  ChevronRight,
  Sparkles,
  Printer
} from './icons';

interface ComplaintGeneratorProps {
  initialData?: any;
}

export const ComplaintGenerator: React.FC<ComplaintGeneratorProps> = ({
  initialData,
}) => {
  const [step, setStep] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);
  const [generatedDoc, setGeneratedDoc] = useState<string | null>(null);

  // Form Fields
  const [consumerName, setConsumerName] = useState<string>('');
  const [consumerEmail, setConsumerEmail] = useState<string>('');
  const [consumerCity, setConsumerCity] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [companyAddress, setCompanyAddress] = useState<string>('');
  const [productName, setProductName] = useState<string>('');
  const [purchaseDate, setPurchaseDate] = useState<string>('');
  const [disputedAmount, setDisputedAmount] = useState<string>('₹');
  const [complaintType, setComplaintType] = useState<string>('Deficiency of Service & Refund Refusal');
  const [incidentNarrative, setIncidentNarrative] = useState<string>('');
  const [desiredRelief, setDesiredRelief] = useState<string>('Full refund of disputed amount with 18% p.a. interest, plus ₹25,000 compensation for harassment and mental agony.');

  // Pre-fill from initialData if passed from Truth Scanner or Money Detective
  useEffect(() => {
    if (initialData) {
      if (initialData.sourceTitle) setProductName(initialData.sourceTitle);
      if (initialData.product) setProductName(initialData.product);
      if (initialData.amount) setDisputedAmount(initialData.amount);
      if (initialData.narrative) setIncidentNarrative(initialData.narrative);
      if (initialData.summary) setIncidentNarrative(initialData.summary);
    }
  }, [initialData]);

  const complaintTypes = [
    'Deficiency of Service & Refund Refusal',
    'Selling Above Maximum Retail Price (MRP)',
    'Defective / Damaged / Mismatched Goods (Product Liability)',
    'Dark Patterns & Deceptive Pricing Architecture',
    'Misleading Advertisement & False Guarantees',
    'Unauthorized Electronic Banking / Payment Deductions',
    'Hazardous / Non-Compliant Food or Cosmetic Goods'
  ];

  const handleGenerateNotice = () => {
    sound.playSuccess();
    const today = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const noticeText = `FORMAL PRE-LITIGATION LEGAL NOTICE & GRIEVANCE DEMAND
UNDER THE CONSUMER PROTECTION ACT, 2019 (ACT NO. 35 OF 2019)

DATE: ${today}
REF NO: NYAYA/PRE-NOTICE/${Date.now().toString().slice(-6)}

TO:
The Managing Director / Grievance Officer,
${companyName || '[Opposite Party / Merchant Name]'},
${companyAddress || '[Registered Commercial Address / Email]'}

FROM:
${consumerName || 'Complainant / Aggrieved Consumer'}
${consumerCity ? `Location: ${consumerCity}` : ''}
${consumerEmail ? `Email: ${consumerEmail}` : ''}

SUBJECT: FORMAL NOTICE FOR ${complaintType.toUpperCase()} IN RESPECT OF "${productName || 'DISPUTED COMMODITY'}" — TRANSACTION AMOUNT: ${disputedAmount}

Sir / Madam,

Under instructions from the Complainant named above, this formal pre-litigation legal notice is hereby served upon you under the provisions of the Consumer Protection Act, 2019:

1. TRANSACTION BACKGROUND:
On or about ${purchaseDate || 'the specified date of transaction'}, the Complainant purchased / engaged services for "${productName || 'the product/service'}" from your platform/outlet for a total consideration of ${disputedAmount}.

2. STATEMENT OF WRONGFUL ACT & GRIEVANCE:
${incidentNarrative || 'The product/service was delivered defective/non-conforming, or was subjected to unfair trade practices, drip markups, and arbitrary rejection of statutory refund/rectification rights.'}

3. STATUTORY INFRACTIONS & VIOLATIONS:
Your aforesaid actions constitute clear actionable defaults under the law of the land:
a) Section 2(47) of the Consumer Protection Act, 2019 — Unfair Trade Practices;
b) Section 2(11) of the Consumer Protection Act, 2019 — Deficiency in Service;
c) Consumer Protection (E-Commerce) Rules, 2020 / Legal Metrology Act, 2009;
d) CCPA Guidelines for Prevention and Regulation of Dark Patterns, 2023.

4. SPECIFIC DEMANDS FOR RELIEF:
You are hereby called upon to comply with the following demands within FIFTEEN (15) DAYS of receipt of this notice:
a) ${desiredRelief};
b) Issue a written letter of apology acknowledging rectification of system deficiencies.

5. RESERVATION OF RIGHTS:
Please note that in the event of your failure or refusal to comply with the aforesaid demands within 15 days, the Complainant shall forthwith lodge formal statutory proceedings before the competent District Consumer Disputes Redressal Commission (DCDRC) via the e-Daakhil portal (edaakhil.nic.in), and lodge an institutional complaint with the Central Consumer Protection Authority (CCPA), holding you strictly liable for all consequential legal expenses, litigation costs, and punitive damages.

Yours sincerely,

___________________________
${consumerName || 'Complainant (Aggrieved Consumer)'}
Generated via NYAYAVERSE Digital Justice Infrastructure (Think 2 Build Initiative)`;

    setGeneratedDoc(noticeText);

    // Save to LocalStorage
    saveComplaint({
      id: `CMP-${Date.now().toString().slice(-4)}`,
      date: today,
      company: companyName || 'Opposite Party',
      product: productName || 'Commodity',
      amount: disputedAmount,
      type: complaintType,
      text: noticeText
    });

    setStep(4);
  };

  const handleCopy = () => {
    if (!generatedDoc) return;
    navigator.clipboard.writeText(generatedDoc);
    sound.playClick();
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadTxt = () => {
    if (!generatedDoc) return;
    sound.playClick();
    const element = document.createElement('a');
    const file = new Blob([generatedDoc], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `Legal_Notice_${(companyName || 'Consumer_Complaint').replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-cyan-500/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 text-xs font-mono mb-2">
            <Scale size={13} className="text-cyan-400" />
            <span>STATUTORY COMPLAINT COMPOSER</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
            JUSTICE IN 60 SECONDS <span className="text-cyan-400">GENERATOR</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
            Generate formal pre-litigation legal notices and DCDRC complaint drafts formatted to official standards under the Consumer Protection Act, 2019.
          </p>
        </div>

        {/* Official helpline badges */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-300">
            NCH 1915
          </span>
          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-300">
            e-Daakhil
          </span>
        </div>
      </div>

      {/* Stepper Wizard Progress */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
        {[
          { s: 1, label: 'Parties' },
          { s: 2, label: 'Transaction' },
          { s: 3, label: 'Incident & Relief' },
          { s: 4, label: 'Legal Notice' }
        ].map((item) => (
          <div
            key={item.s}
            onClick={() => {
              if (item.s <= step || generatedDoc) setStep(item.s);
            }}
            className={`p-2.5 rounded-xl border cursor-pointer transition ${
              step === item.s
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                : step > item.s
                ? 'bg-slate-900 border-slate-800 text-slate-300'
                : 'bg-slate-950 border-slate-800 text-slate-600'
            }`}
          >
            <span className="block text-[10px] text-slate-400">Step {item.s}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Form Steps */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/30 bg-slate-950/90">
        {/* Step 1: Parties */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 text-xs flex items-center justify-center font-black">1</span>
              <span>Identification of Parties (Complainant & Opposite Party)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-mono mb-1">
                  Your Full Name (Optional - or leave blank for template)
                </label>
                <input
                  type="text"
                  value={consumerName}
                  onChange={(e) => setConsumerName(e.target.value)}
                  placeholder="e.g. Rajesh Kumar"
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Your Email / Phone</label>
                <input
                  type="text"
                  value={consumerEmail}
                  onChange={(e) => setConsumerEmail(e.target.value)}
                  placeholder="e.g. rajesh@email.com"
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Company / Seller / Outlet Name *</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. QuickDeal India Logistics Pvt. Ltd."
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Opposite Party Email / Address</label>
                <input
                  type="text"
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                  placeholder="e.g. grievance@quickdeal.in"
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => { sound.playClick(); setStep(2); }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
              >
                <span>Proceed to Transaction Particulars</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Transaction Particulars */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 text-xs flex items-center justify-center font-black">2</span>
              <span>Transaction Particulars & Disputed Value</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-mono mb-1">Product or Service Name *</label>
                <input
                  type="text"
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. Air Cooler Model AC-20 / Flight Ticket DEL-BOM"
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Date of Purchase / Billing</label>
                <input
                  type="date"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Disputed Amount (₹) *</label>
                <input
                  type="text"
                  required
                  value={disputedAmount}
                  onChange={(e) => setDisputedAmount(e.target.value)}
                  placeholder="e.g. ₹14,999.00"
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none font-mono focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Legal Category of Complaint</label>
                <select
                  value={complaintType}
                  onChange={(e) => setComplaintType(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400"
                >
                  {complaintTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => { sound.playClick(); setStep(1); }}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300"
              >
                ← Back
              </button>
              <button
                onClick={() => { sound.playClick(); setStep(3); }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
              >
                <span>Proceed to Incident Description</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Incident Narrative & Desired Relief */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 text-xs flex items-center justify-center font-black">3</span>
              <span>Incident Narrative & Relief Claimed</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-mono mb-1">
                  Chronological Incident Description (What went wrong, dates, company refusal) *
                </label>
                <textarea
                  required
                  rows={4}
                  value={incidentNarrative}
                  onChange={(e) => setIncidentNarrative(e.target.value)}
                  placeholder="Detail the facts: e.g. I purchased the phone on 15 Oct. Upon delivery on 18 Oct, the package contained an old scratched model. I emailed the seller on 18 Oct with unboxing video, but support rejected return on 19 Oct stating OTP was verified..."
                  className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">
                  Desired Relief / Demands
                </label>
                <textarea
                  rows={2}
                  value={desiredRelief}
                  onChange={(e) => setDesiredRelief(e.target.value)}
                  placeholder="Full refund with 18% interest, compensation for mental agony, litigation costs..."
                  className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => { sound.playClick(); setStep(2); }}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300"
              >
                ← Back
              </button>
              <button
                onClick={handleGenerateNotice}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_20px_rgba(0,242,254,0.3)]"
              >
                <Sparkles size={14} />
                <span>Generate Statutory Notice (60s)</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: The Generated Legal Notice & Escalation Blueprint */}
        {step === 4 && generatedDoc && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-cyan-500/20">
              <div>
                <h3 className="font-display font-black text-lg text-white">
                  FORMAL STATUTORY PRE-LITIGATION NOTICE
                </h3>
                <span className="text-[11px] font-mono text-cyan-400">
                  Ready for dispatch via Registered Post / Email / e-Daakhil
                </span>
              </div>

              {/* Action Buttons: Copy, Download, Print */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-200 flex items-center gap-1.5 transition"
                >
                  <Copy size={13} />
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Notice'}</span>
                </button>

                <button
                  onClick={handleDownloadTxt}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-200 flex items-center gap-1.5 transition"
                >
                  <Download size={13} />
                  <span>Download .txt</span>
                </button>

                <button
                  onClick={() => { sound.playClick(); window.print(); }}
                  className="px-3.5 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 transition"
                >
                  <Printer size={13} />
                  <span>Print View</span>
                </button>
              </div>
            </div>

            {/* Document Preview Box */}
            <pre className="p-5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs whitespace-pre-wrap overflow-x-auto leading-relaxed max-h-[420px] overflow-y-auto">
              {generatedDoc}
            </pre>

            {/* Evidence Checklist to accompany notice */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                <CheckCircle2 size={14} />
                <span>Evidence Checklist to Enclose with Notice:</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                <label className="flex items-center gap-2 p-2 rounded bg-slate-950 border border-slate-800">
                  <input type="checkbox" defaultChecked className="accent-cyan-400" />
                  <span>Tax Invoice / Cash Memo with GSTIN</span>
                </label>
                <label className="flex items-center gap-2 p-2 rounded bg-slate-950 border border-slate-800">
                  <input type="checkbox" defaultChecked className="accent-cyan-400" />
                  <span>Payment Receipt / UPI UTR / Bank Statement</span>
                </label>
                <label className="flex items-center gap-2 p-2 rounded bg-slate-950 border border-slate-800">
                  <input type="checkbox" defaultChecked className="accent-cyan-400" />
                  <span>Unboxing Video / Product Damage Photos</span>
                </label>
                <label className="flex items-center gap-2 p-2 rounded bg-slate-950 border border-slate-800">
                  <input type="checkbox" defaultChecked className="accent-cyan-400" />
                  <span>Written Refusal Emails / Chat Screenshots</span>
                </label>
              </div>
            </div>

            {/* 4-Tier Escalation Process as specified in requirements */}
            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-3">
              <h4 className="text-xs font-mono text-cyan-300 uppercase tracking-wider font-bold">
                Suggested 4-Tier Escalation Roadmap:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-cyan-400 block font-bold">TIER 1 (Day 1 - 7)</span>
                  <strong className="text-white block font-sans">Internal Grievance</strong>
                  <p className="text-[11px] text-slate-400">Email notice to merchant Grievance Officer.</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-cyan-400 block font-bold">TIER 2 (Day 8 - 15)</span>
                  <strong className="text-white block font-sans">NCH Helpline 1915</strong>
                  <p className="text-[11px] text-slate-400">Lodge INGRAM ticket at consumerhelpline.gov.in.</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-cyan-400 block font-bold">TIER 3 (Day 16+)</span>
                  <strong className="text-white block font-sans">e-Daakhil DCDRC</strong>
                  <p className="text-[11px] text-slate-400">File electronic petition on edaakhil.nic.in.</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-cyan-400 block font-bold">TIER 4 (Systemic)</span>
                  <strong className="text-white block font-sans">CCPA Class Action</strong>
                  <p className="text-[11px] text-slate-400">Petition Central Consumer Protection Authority.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
