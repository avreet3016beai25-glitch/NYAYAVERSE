import React, { useState } from 'react';
import { sound } from '../services/sound';
import { 
  BarChart3, 
  TrendingUp, 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Info,
  DollarSign,
  ChevronRight,
  FileText
} from './icons';

interface MoneyDetectiveProps {
  initialQuery?: string;
  onNavigateToComplaint?: (data?: any) => void;
}

export const MoneyDetective: React.FC<MoneyDetectiveProps> = ({
  initialQuery,
  onNavigateToComplaint,
}) => {
  const [advertisedPrice, setAdvertisedPrice] = useState<number>(999);
  const [originalMRP, setOriginalMRP] = useState<number>(4999);
  const [actualChargedPrice, setActualChargedPrice] = useState<number>(1499);
  const [deliveryFee, setDeliveryFee] = useState<number>(149);
  const [convenienceFee, setConvenienceFee] = useState<number>(99);
  const [packagingFee, setPackagingFee] = useState<number>(49);
  const [quantity, setQuantity] = useState<number>(1);

  // Financial calculations
  const totalBaseAdvertised = advertisedPrice * quantity;
  const totalAdditionalFees = (deliveryFee + convenienceFee + packagingFee) * quantity;
  const totalActuallyPaid = (actualChargedPrice + deliveryFee + convenienceFee + packagingFee) * quantity;
  const priceDiscrepancy = totalActuallyPaid - totalBaseAdvertised;
  const effectiveInflationPercent = totalBaseAdvertised > 0 ? (priceDiscrepancy / totalBaseAdvertised) * 100 : 0;
  const advertisedDiscountPercent = originalMRP > 0 ? Math.round(((originalMRP - advertisedPrice) / originalMRP) * 100) : 0;
  const realEffectiveDiscountPercent = originalMRP > 0 ? Math.round(((originalMRP - actualChargedPrice) / originalMRP) * 100) : 0;
  const isMRPExceeded = actualChargedPrice > originalMRP;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-cyan-500/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 text-xs font-mono mb-2">
            <BarChart3 size={13} className="text-cyan-400" />
            <span>FINANCIAL INTELLIGENCE CALCULATOR</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
            MONEY DETECTIVE <span className="text-cyan-400">ANALYZER</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
            Calculate effective discounts, unbundle hidden drip fees, detect MRP violations, and evaluate whether pricing discrepancies require regulatory investigation.
          </p>
        </div>

        {/* Responsible Legal Guidance Notice */}
        <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-slate-300 max-w-md flex items-start gap-2.5">
          <Info size={16} className="text-cyan-400 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            <strong className="text-white">Legal Evaluation Notice:</strong> An observed price difference indicates fees requiring verification (e.g. Drip Pricing vs reasonable logistics), rather than automatically declaring every commercial markup illegal.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Parameters Panel */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-cyan-500/30 bg-slate-950/90 space-y-4">
          <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider text-cyan-300 flex items-center gap-2">
            <span>Transaction Parameters</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-mono mb-1">
                Advertised Price (₹ per unit)
              </label>
              <input
                type="number"
                value={advertisedPrice}
                onChange={(e) => setAdvertisedPrice(Math.max(0, Number(e.target.value)))}
                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-mono mb-1">
                Original Printed MRP (₹ per unit)
              </label>
              <input
                type="number"
                value={originalMRP}
                onChange={(e) => setOriginalMRP(Math.max(0, Number(e.target.value)))}
                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-mono mb-1">
                Actual Charged Price at Checkout (₹ per unit)
              </label>
              <input
                type="number"
                value={actualChargedPrice}
                onChange={(e) => setActualChargedPrice(Math.max(0, Number(e.target.value)))}
                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono outline-none focus:border-cyan-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-mono mb-1">Delivery / Surge (₹)</label>
                <input
                  type="number"
                  value={deliveryFee}
                  onChange={(e) => setDeliveryFee(Math.max(0, Number(e.target.value)))}
                  className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Convenience Fee (₹)</label>
                <input
                  type="number"
                  value={convenienceFee}
                  onChange={(e) => setConvenienceFee(Math.max(0, Number(e.target.value)))}
                  className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-mono mb-1">Packaging Fee (₹)</label>
                <input
                  type="number"
                  value={packagingFee}
                  onChange={(e) => setPackagingFee(Math.max(0, Number(e.target.value)))}
                  className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results & Interactive Visualization Panel */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Metric Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="glass-panel p-4 rounded-xl border border-cyan-500/30">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Actual Amount Paid</span>
              <span className="font-display font-black text-xl text-white">
                ₹{totalActuallyPaid.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-slate-400 font-mono block mt-1">
                for {quantity} unit(s)
              </span>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-rose-500/30">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Extra Paid Over Ad</span>
              <span className="font-display font-black text-xl text-rose-400">
                +₹{priceDiscrepancy.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-rose-300 font-mono block mt-1">
                (+{effectiveInflationPercent.toFixed(1)}% Drip Markup)
              </span>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-purple-500/30">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Discount Illusion</span>
              <span className="font-display font-black text-xl text-purple-300">
                {realEffectiveDiscountPercent}% vs {advertisedDiscountPercent}%
              </span>
              <span className="text-[10px] text-slate-400 font-mono block mt-1">
                (Real vs Claimed Cut)
              </span>
            </div>
          </div>

          {/* Interactive Visual Comparison Bar Chart */}
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 bg-slate-950/90 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 font-bold">
              <BarChart3 size={15} />
              <span>Cost Component Breakdown Visualization</span>
            </h4>

            {/* Visual comparative bar */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1 text-slate-300">
                  <span>Initial Advertised Price</span>
                  <span className="text-cyan-400 font-bold">₹{totalBaseAdvertised}</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-cyan-400"
                    style={{ width: `${Math.min(100, (totalBaseAdvertised / totalActuallyPaid) * 100)}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1 text-slate-300">
                  <span>Ancillary Surcharges (Drip Fees)</span>
                  <span className="text-rose-400 font-bold">+₹{totalAdditionalFees}</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-rose-500"
                    style={{ width: `${Math.min(100, (totalAdditionalFees / totalActuallyPaid) * 100)}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1 text-slate-300">
                  <span>Total Final Paid</span>
                  <span className="text-emerald-400 font-bold">₹{totalActuallyPaid}</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 w-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Nuanced Legal Assessment as specifically required */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-950 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-purple-300 flex items-center gap-2 font-bold">
              <Scale size={16} />
              <span>Regulatory Compliance Assessment:</span>
            </h4>

            {isMRPExceeded ? (
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-slate-200 space-y-1">
                <span className="font-bold text-rose-300 block">⚠️ Critical Concern: Selling Above Printed MRP</span>
                <p>
                  Actual unit price of ₹{actualChargedPrice} exceeds printed MRP of ₹{originalMRP} by ₹{actualChargedPrice - originalMRP}. Under Rule 18(2) of Legal Metrology (Packaged Commodities) Rules, selling above MRP is a statutory offense.
                </p>
              </div>
            ) : priceDiscrepancy > 0 ? (
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs text-slate-200 space-y-1">
                <span className="font-bold text-amber-300 block">⚠️ Scrutiny Required: Potential Drip Pricing Pattern</span>
                <p>
                  The final checkout cost rose by {effectiveInflationPercent.toFixed(1)}% due to unbundled fees. If these surcharges were not disclosed prominently on the first product listing page, they may constitute "Drip Pricing" under the CCPA Dark Pattern Guidelines 2023.
                </p>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-slate-200 space-y-1">
                <span className="font-bold text-emerald-300 block">✓ Clear Compliance: Transparent Pricing</span>
                <p>
                  No undisclosed drip pricing or MRP violation detected based on supplied figures.
                </p>
              </div>
            )}

            {priceDiscrepancy > 0 && onNavigateToComplaint && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    sound.playClick();
                    onNavigateToComplaint({
                      product: 'Commodity with Disputed Pricing',
                      amount: `₹${priceDiscrepancy}`,
                      narrative: `Complainant was advertised ₹${advertisedPrice} but was billed ₹${totalActuallyPaid} including undisclosed ancillary fees totaling ₹${totalAdditionalFees}.`
                    });
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs flex items-center gap-1.5"
                >
                  <FileText size={14} />
                  <span>Generate Formal Notice for This Overcharge →</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
