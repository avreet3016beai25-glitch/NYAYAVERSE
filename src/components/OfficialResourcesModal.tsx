import React from 'react';
import { sound } from '../services/sound';
import { ExternalLink, Shield, X, CheckCircle2 } from './icons';

interface OfficialResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfficialResourcesModal: React.FC<OfficialResourcesModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const resources = [
    {
      title: 'National Consumer Helpline (NCH 1915)',
      desc: 'Central Ministry toll-free helpline and INGRAM grievance redressal portal.',
      url: 'https://consumerhelpline.gov.in',
      phone: '1915 / SMS: 8800001915',
      authority: 'Department of Consumer Affairs, Govt. of India'
    },
    {
      title: 'e-Daakhil Consumer Commission Portal',
      desc: 'Official electronic filing portal for District, State, and National Consumer Commissions.',
      url: 'https://edaakhil.nic.in',
      authority: 'National Consumer Disputes Redressal Commission (NCDRC)'
    },
    {
      title: 'National Cyber Crime Reporting Portal (1930)',
      desc: 'Instant reporting of UPI fraud, phishing, unauthorized debits, and banking scams.',
      url: 'https://cybercrime.gov.in',
      phone: '1930',
      authority: 'Ministry of Home Affairs'
    },
    {
      title: 'RBI Complaint Management System (CMS)',
      desc: 'Ombudsman portal for unauthorized banking transactions and digital payment failures.',
      url: 'https://cms.rbi.org.in',
      authority: 'Reserve Bank of India'
    },
    {
      title: 'BIS Care Portal & App',
      desc: 'Verify ISI mark, Hallmark purity on gold, and CRS certification on electronics.',
      url: 'https://www.bis.gov.in',
      authority: 'Bureau of Indian Standards'
    },
    {
      title: 'FSSAI Consumer Grievance Portal (FoSCoS)',
      desc: 'Lodge complaints against adulterated food, expired packaged foods, and cloud kitchens.',
      url: 'https://foscos.fssai.gov.in',
      authority: 'Food Safety and Standards Authority of India'
    },
    {
      title: 'ASCI Misleading Ads Portal',
      desc: 'File complaints against misleading endorsements, false claims, and offensive advertisements.',
      url: 'https://www.ascionline.in',
      authority: 'Advertising Standards Council of India'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="glass-panel max-w-2xl w-full p-6 sm:p-8 rounded-2xl border-2 border-cyan-400/60 shadow-[0_0_50px_rgba(0,242,254,0.3)] bg-slate-950 space-y-4 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Shield size={20} className="text-cyan-400" />
            <div>
              <h3 className="font-display font-bold text-base text-white">
                Official Government Grievance Portals (India)
              </h3>
              <span className="text-[10px] font-mono text-slate-400">
                Verified Indian statutory authorities & official helplines
              </span>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-3">
          {resources.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition flex items-start justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-white">{item.title}</h4>
                  {item.phone && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                      📞 {item.phone}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300">{item.desc}</p>
                <span className="text-[10px] font-mono text-cyan-400 block">
                  Authority: {item.authority}
                </span>
              </div>

              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500/20 text-cyan-300 border border-slate-700 text-xs font-mono flex items-center gap-1 shrink-0"
              >
                <span>Visit</span>
                <ExternalLink size={12} />
              </a>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
};
