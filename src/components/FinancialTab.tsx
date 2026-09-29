import React, { useState } from "react";
import { FinancialPlanCalculation, GovernmentScheme, PartnerBank, SupportedLanguage } from "../types";
import { translations } from "../data/translations";
import { formatINR } from "../utils/calculator";
import { SchemeAndBankSelector } from "./SchemeAndBankSelector";
import { MoneyRoadmapSection } from "./MoneyRoadmapSection";
import {
  Landmark,
  BadgePercent,
  Calendar,
  Clock,
  CheckCircle2,
  FileText,
  TrendingDown,
  Building2,
  HelpCircle,
  Download,
  AlertCircle,
  Sliders,
  DollarSign,
  Briefcase
} from "lucide-react";

interface FinancialTabProps {
  plan: FinancialPlanCalculation;
  currentLang: SupportedLanguage;
  onAdjustMargin?: (newMargin: number) => void;
  selectedScheme: GovernmentScheme;
  selectedBank: PartnerBank;
  onSelectScheme: (scheme: GovernmentScheme) => void;
  onSelectBank: (bank: PartnerBank) => void;
  onAskAiAboutScheme?: (schemeName: string) => void;
}

export const FinancialTab: React.FC<FinancialTabProps> = ({
  plan,
  currentLang,
  onAdjustMargin,
  selectedScheme,
  selectedBank,
  onSelectScheme,
  onSelectBank,
  onAskAiAboutScheme
}) => {
  const t = translations[currentLang];
  const [showAllQuarters, setShowAllQuarters] = useState(false);
  const [activeMarginInput, setActiveMarginInput] = useState<number>(plan.marginCapital);

  const displayedSchedule = showAllQuarters ? plan.schedule : plan.schedule.slice(0, 8);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setActiveMarginInput(val);
    if (onAdjustMargin) {
      onAdjustMargin(val);
    }
  };

  return (
    <div className="space-y-8" id="financial-tab-content">
      {/* 1. Multiple Schemes & Partner Banks Interactive Selection & Details */}
      <SchemeAndBankSelector
        selectedScheme={selectedScheme}
        selectedBank={selectedBank}
        onSelectScheme={onSelectScheme}
        onSelectBank={onSelectBank}
        onAskAiAboutScheme={onAskAiAboutScheme}
        currentLang={currentLang}
        projectCost={plan.totalProjectCost}
        socialCategory={plan.socialCategory}
      />

      {/* 2. Large 3-Number Financial Structuring Summary Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors" id="summary-card-3numbers">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
              <span className="text-xs font-bold text-blue-900 dark:text-blue-400 uppercase tracking-wider">
                {plan.marginPercentage}% Promoter Margin Money Model ({plan.socialCategory || "General"})
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mt-1">
              Financial Structuring & Loan Sizing
            </h2>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <Sliders className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span>Interactive Calculator</span>
          </div>
        </div>

        {/* The 3 large numbers with Geometric Balance border accents */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Margin Capital */}
          <div className="bg-white dark:bg-slate-800/80 rounded-xl p-5 border border-slate-200 dark:border-slate-700 border-l-4 border-l-slate-600 dark:border-l-slate-400 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {t.summaryMargin}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                plan.marginPercentage === 5
                  ? "bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600"
              }`}>
                {plan.marginPercentage}% Contribution ({plan.socialCategory || "General"})
              </span>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {formatINR(plan.marginCapital)}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
              Your own seed capital / savings invested into enterprise setup.
            </p>
          </div>

          {/* Card 2: Total Project Cost */}
          <div className="bg-white dark:bg-slate-800/80 rounded-xl p-5 border border-slate-200 dark:border-slate-700 border-l-4 border-l-blue-600 dark:border-l-blue-500 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 dark:text-blue-400">
                {t.summaryProjectCost}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                100% Capital Outlay
              </span>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-blue-900 dark:text-blue-300 tracking-tight">
              {formatINR(plan.totalProjectCost)}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 font-medium">
              Calculated as Available Margin ÷ {(plan.marginPercentage / 100).toFixed(2)} ({Math.round(100 / plan.marginPercentage)}x multiplier).
            </p>
          </div>

          {/* Card 3: Maximum Loan Eligibility */}
          <div className="bg-blue-900 dark:bg-blue-950 text-white rounded-xl p-5 border border-blue-800 dark:border-blue-800 border-l-4 border-l-blue-400 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
                {t.summaryLoan}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-800 dark:bg-blue-900 text-white border border-blue-700">
                {100 - plan.marginPercentage}% Bank Debt & Subsidy
              </span>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {formatINR(plan.loanEligibility)}
            </p>
            <p className="text-xs text-blue-200 mt-2 font-medium">
              Calculated as Total Project Cost × {((100 - plan.marginPercentage) / 100).toFixed(2)} under matched government scheme.
            </p>
          </div>
        </div>

        {/* Margin adjustment slider */}
        {onAdjustMargin && (
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-tight">Tweak Margin Money:</span>
              <input
                type="range"
                min={20000}
                max={1000000}
                step={10000}
                value={activeMarginInput}
                onChange={handleSliderChange}
                className="w-44 accent-blue-900 dark:accent-blue-500 cursor-pointer"
              />
              <span className="text-xs font-black text-blue-900 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
                {formatINR(activeMarginInput)}
              </span>
            </div>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Drag slider to see immediate scheme auto-switch!
            </span>
          </div>
        )}
      </div>

      {/* 3. NEW ROADMAP FOR MONEY: Where to Spend & Where to Save */}
      <MoneyRoadmapSection
        totalProjectCost={plan.totalProjectCost}
        marginCapital={plan.marginCapital}
        loanEligibility={plan.loanEligibility}
        businessCategory={plan.matchedScheme.name}
        currentLang={currentLang}
      />

      {/* 4. Scheme Auto-Selection Logic & Matched Scheme Banner */}
      <div className="bg-blue-900 dark:bg-blue-950 text-white rounded-2xl p-6 sm:p-7 shadow-sm border border-blue-800 transition-colors" id="scheme-match-banner">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white text-blue-900 mb-3 shadow-xs">
              <CheckCircle2 className="h-4 w-4 text-blue-900" />
              <span>{t.youQualifyFor}: {plan.matchedScheme.name}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              {plan.matchedScheme.name}
            </h3>

            {/* Scheme Reasoning in one line */}
            <p className="text-xs sm:text-sm text-blue-100 mt-2 font-medium bg-blue-800/80 dark:bg-blue-900/80 p-3.5 rounded-xl border border-blue-700 leading-relaxed">
              <strong className="text-white uppercase tracking-wider text-[11px] block mb-0.5">Selection Logic:</strong> {plan.matchedScheme.reasoning}
            </p>

            {plan.matchedScheme.subsidyAssistance && (
              <p className="text-xs text-blue-200 mt-2.5 flex items-center gap-1.5 font-medium">
                <Landmark className="h-3.5 w-3.5 text-blue-300 shrink-0" />
                <span>{plan.matchedScheme.subsidyAssistance}</span>
              </p>
            )}
          </div>

          {/* Scheme Quick Badge box */}
          <div className="bg-blue-800/70 dark:bg-blue-900/70 p-4 rounded-xl border border-blue-700 text-center min-w-[200px]">
            <p className="text-[10px] text-blue-200 uppercase tracking-wider font-bold">Max Loan Cap</p>
            <p className="text-2xl font-black text-white mt-0.5">{formatINR(plan.matchedScheme.maxLoan)}</p>
            <p className="text-xs text-blue-300 mt-1 font-semibold">{plan.matchedScheme.conditionDescription}</p>
          </div>
        </div>

        {/* Key Scheme Parameters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-blue-800">
          <div className="bg-blue-800/60 dark:bg-blue-900/60 p-3.5 rounded-xl border border-blue-700/50">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 block">{t.interestRate}</span>
            <p className="text-lg font-black text-white mt-0.5">{plan.matchedScheme.interestRate}% p.a.</p>
            <span className="text-[10px] text-green-300 font-medium">Subsidized Rate</span>
          </div>

          <div className="bg-blue-800/60 dark:bg-blue-900/60 p-3.5 rounded-xl border border-blue-700/50">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 block">{t.tenure}</span>
            <p className="text-lg font-black text-white mt-0.5">{plan.matchedScheme.tenureYears} Years</p>
            <span className="text-[10px] text-blue-200 font-medium">{plan.totalQuarters} Quarters</span>
          </div>

          <div className="bg-blue-800/60 dark:bg-blue-900/60 p-3.5 rounded-xl border border-blue-700/50">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 block">{t.moratoriumPeriod}</span>
            <p className="text-lg font-black text-white mt-0.5">{plan.matchedScheme.moratoriumMonths} Months</p>
            <span className="text-[10px] text-blue-200 font-medium">Grace Period</span>
          </div>

          <div className="bg-blue-800/60 dark:bg-blue-900/60 p-3.5 rounded-xl border border-blue-700/50">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 block">{t.quarterlyEmi}</span>
            <p className="text-lg font-black text-white mt-0.5">{formatINR(plan.regularQuarterlyEmi)}</p>
            <span className="text-[10px] text-blue-200 font-medium">Every 3 Months</span>
          </div>
        </div>
      </div>

      {/* 5. Moratorium Clarification Callout Banner */}
      <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 border-l-4 border-l-blue-600 dark:border-l-blue-500 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 transition-colors" id="moratorium-callout">
        <AlertCircle className="h-5 w-5 text-blue-900 dark:text-blue-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">
            Moratorium Grace Period Policy ({plan.matchedScheme.moratoriumMonths} Months / {plan.moratoriumQuarters} Quarter)
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            {t.moratoriumNote}
          </p>
          <div className="mt-2 text-[11px] text-blue-900 dark:text-blue-300 font-semibold bg-blue-50 dark:bg-blue-950/60 inline-block px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
            During Quarter 1{plan.moratoriumQuarters > 1 ? ` & 2` : ""}: You pay interest-only {formatINR(plan.moratoriumQuarterlyPayment)} per quarter. Regular principal amortization begins afterwards.
          </div>
        </div>
      </div>

      {/* 6. Working Capital & Monthly Cash Flow Snapshot */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors" id="cashflow-estimator">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Operational Viability & Debt Service
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mt-1">
              {t.cashflowTitle}
            </h3>
          </div>

          {/* DSCR Safety Badge */}
          <div className="bg-green-50 dark:bg-green-950/60 border border-green-200 dark:border-green-800 px-3.5 py-1.5 rounded-full flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-700 dark:text-green-400" />
            <div>
              <span className="text-xs font-black text-green-900 dark:text-green-300 uppercase tracking-tight">
                DSCR: {plan.dscr}x ({t.dscrSafe})
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{t.monthlyRevenue}</span>
            <p className="text-xl font-black text-slate-900 dark:text-white mt-1">{formatINR(plan.monthlyEstimatedRevenue)}</p>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">~20% monthly asset velocity</span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{t.monthlyExpenses}</span>
            <p className="text-xl font-black text-red-700 dark:text-red-400 mt-1">{formatINR(plan.monthlyTotalOpex)}</p>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Raw material, rent & wages</span>
          </div>

          <div className="bg-green-50 dark:bg-green-950/60 p-4 rounded-xl border border-green-200 dark:border-green-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-green-800 dark:text-green-300">{t.netCashflow}</span>
            <p className="text-xl font-black text-green-900 dark:text-green-200 mt-1">{formatINR(plan.monthlyNetCashflow)}</p>
            <span className="text-[11px] text-green-700 dark:text-green-400 font-medium">Pre-tax monthly surplus</span>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/60 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300">Monthly EMI Obligation</span>
            <p className="text-xl font-black text-blue-900 dark:text-blue-200 mt-1">{formatINR(plan.monthlyEmiEquivalent)}</p>
            <span className="text-[11px] text-blue-700 dark:text-blue-400 font-medium">Quarterly EMI ÷ 3</span>
          </div>
        </div>

        {/* Operating cost breakdown detail */}
        <div className="mt-4 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between text-xs text-slate-600 dark:text-slate-400 gap-2">
          <span>Assumed Monthly Breakdown: <strong>Raw Material/Stock:</strong> {formatINR(plan.monthlyRawMaterial)}</span>
          <span>• <strong>Rent & Electricity:</strong> {formatINR(plan.monthlyRentUtilities)}</span>
          <span>• <strong>Helper Wages:</strong> {formatINR(plan.monthlyWages)}</span>
        </div>
      </div>

      {/* 7. Repayment Schedule Visual Chart */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors" id="repayment-chart-card">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Amortization Trend
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mt-1">
              Loan Balance Reduction Over {plan.matchedScheme.tenureYears} Years ({plan.totalQuarters} Quarters)
            </h3>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-xs bg-blue-900 dark:bg-blue-500" />
              <span className="text-slate-700 dark:text-slate-300">Outstanding Balance</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-xs bg-blue-400" />
              <span className="text-slate-700 dark:text-slate-300">Quarterly Principal Paid</span>
            </div>
          </div>
        </div>

        {/* Interactive SVG Bar/Line Amortization Visualizer */}
        <div className="w-full h-52 bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200 dark:border-slate-700 flex flex-col justify-end">
          <div className="h-full w-full flex items-end justify-between gap-1 sm:gap-2">
            {plan.schedule.map((item) => {
              const maxLoan = plan.loanEligibility;
              const heightPercent = Math.max(4, Math.round((item.openingBalance / maxLoan) * 100));

              return (
                <div
                  key={item.quarter}
                  className="flex-1 flex flex-col items-center justify-end h-full group relative"
                >
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center z-20 pointer-events-none">
                    <div className="bg-slate-900 text-white text-[10px] py-1 px-2 rounded-md whitespace-nowrap shadow-lg">
                      <p className="font-bold">Quarter {item.quarter} (Yr {item.year})</p>
                      <p>Balance: {formatINR(item.openingBalance)}</p>
                      <p>EMI: {formatINR(item.totalEmi)}</p>
                    </div>
                    <div className="h-1 w-1 border-4 border-transparent border-t-slate-900" />
                  </div>

                  {/* Balance bar */}
                  <div
                    className={`w-full rounded-t-xs transition-all duration-300 ${
                      item.isMoratorium
                        ? "bg-amber-400"
                        : "bg-blue-900 dark:bg-blue-500 group-hover:bg-blue-700"
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />

                  {/* Label for selective quarters */}
                  {(item.quarter === 1 || item.quarter % 4 === 0 || item.quarter === plan.totalQuarters) && (
                    <span className="text-[9px] text-slate-500 dark:text-slate-400 font-bold mt-1">
                      Q{item.quarter}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 mt-2 px-1">
          <span>Start: Loan {formatINR(plan.loanEligibility)}</span>
          <span className="text-amber-700 dark:text-amber-400 font-semibold">Q1{plan.moratoriumQuarters > 1 ? "-Q2" : ""}: Moratorium Grace</span>
          <span>End (Yr {plan.matchedScheme.tenureYears}): Balance ₹0</span>
        </div>
      </div>

      {/* 8. Quarterly Repayment Schedule Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors" id="repayment-schedule-table">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
                {t.repaymentScheduleTitle}
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
              Factor in moratorium period • Subsidized interest calculated on reducing balance
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              id="toggle-quarters-btn"
              onClick={() => setShowAllQuarters(!showAllQuarters)}
              className="text-xs font-bold px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors uppercase tracking-tight"
            >
              {showAllQuarters ? "Show First 8 Quarters" : `View All ${plan.totalQuarters} Quarters`}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">{t.tableQuarter}</th>
                <th className="py-3 px-4">{t.tableOpening}</th>
                <th className="py-3 px-4">{t.tablePrincipal}</th>
                <th className="py-3 px-4">{t.tableInterest}</th>
                <th className="py-3 px-4">{t.tableTotalEmi}</th>
                <th className="py-3 px-4">{t.tableClosing}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              {displayedSchedule.map((row) => (
                <tr
                  key={row.quarter}
                  className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors ${
                    row.isMoratorium ? "bg-amber-50/40 dark:bg-amber-950/20" : ""
                  }`}
                >
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>Q{row.quarter} (Yr {row.year})</span>
                    {row.isMoratorium && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-200">
                        Grace
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300 font-medium">{formatINR(row.openingBalance)}</td>
                  <td className="py-3 px-4 text-blue-900 dark:text-blue-400 font-bold">
                    {row.isMoratorium ? "₹0 (Grace)" : formatINR(row.principalPaid)}
                  </td>
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300">{formatINR(row.interestPaid)}</td>
                  <td className="py-3 px-4 text-slate-900 dark:text-white font-bold">{formatINR(row.totalEmi)}</td>
                  <td className="py-3 px-4 text-slate-800 dark:text-slate-300 font-semibold">{formatINR(row.closingBalance)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50 dark:bg-slate-800/80 font-bold text-slate-900 dark:text-white border-t-2 border-slate-300 dark:border-slate-700">
                <td className="py-3 px-4">Total Repayment</td>
                <td className="py-3 px-4">—</td>
                <td className="py-3 px-4 text-blue-900 dark:text-blue-400">{formatINR(plan.loanEligibility)} (Principal)</td>
                <td className="py-3 px-4">{formatINR(plan.totalInterestPayable)} (Interest)</td>
                <td className="py-3 px-4 text-blue-950 dark:text-blue-300 font-black">{formatINR(plan.totalRepaymentAmount)}</td>
                <td className="py-3 px-4">₹0 (Paid Off)</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* 9. Next Steps to Apply & Required Documents Checklist */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors" id="next-steps-checklist">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-900 dark:text-blue-300">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">{t.nextStepTitle}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t.nextStepDesc}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-[10px] uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2.5">
              Where to Submit this Dossier
            </h4>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
              <li className="flex items-start gap-2">
                <span className="h-4 w-4 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                <span><strong>District Industries Centre (DIC):</strong> Office of General Manager DIC for MSME Margin Money recommendation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-4 w-4 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                <span><strong>State Channelising Agency (SCA):</strong> State Backward Classes / SC-ST / Women Finance Development Corporation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-4 w-4 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                <span><strong>Lead Bank Branch / Gramin Bank:</strong> Bank of Baroda, SBI, PNB, or your local Regional Rural Bank (RRB).</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-[10px] uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2.5">
              {t.requiredDocuments}
            </h4>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>{t.doc1}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>{t.doc2}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>{t.doc3}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>{t.doc4}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Official Disclaimer */}
        <div className="mt-5 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed border border-slate-200 dark:border-slate-700">
          {t.disclaimer}
        </div>
      </div>
    </div>
  );
};
