import React, { useState, useMemo } from "react";
import { GovernmentScheme, PartnerBank, SupportedLanguage, SocialCategory } from "../types";
import {
  getLocalizedSchemes,
  getLocalizedBanks,
  getLocalizedScheme,
  getLocalizedBank
} from "../data/localizedSchemesAndBanks";
import { getSchemeById, getBankById } from "../data/schemesAndBanks";
import { formatINR } from "../utils/calculator";
import {
  Landmark,
  Building2,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  FileCheck2,
  BadgePercent,
  Calendar,
  Sparkles,
  PhoneCall,
  Clock,
  HelpCircle,
  Award,
  ChevronRight,
  Info,
  Scale,
  Users,
  ArrowRight
} from "lucide-react";

interface SchemeAndBankSelectorProps {
  selectedScheme: GovernmentScheme;
  selectedBank: PartnerBank;
  onSelectScheme: (scheme: GovernmentScheme) => void;
  onSelectBank: (bank: PartnerBank) => void;
  onAskAiAboutScheme?: (schemeName: string) => void;
  currentLang: SupportedLanguage;
  projectCost: number;
  socialCategory?: SocialCategory;
}

export const SchemeAndBankSelector: React.FC<SchemeAndBankSelectorProps> = ({
  selectedScheme,
  selectedBank,
  onSelectScheme,
  onSelectBank,
  onAskAiAboutScheme,
  currentLang,
  projectCost,
  socialCategory
}) => {
  const [activeTab, setActiveTab] = useState<"schemes" | "banks" | "backward_caste">(
    socialCategory && socialCategory !== "General" ? "backward_caste" : "schemes"
  );
  const [casteFilter, setCasteFilter] = useState<"ALL" | "SC" | "ST" | "OBC">(
    socialCategory && socialCategory !== "General" ? (socialCategory as "SC" | "ST" | "OBC") : "ALL"
  );

  const isHindi = currentLang === "hi";
  const isMarathi = currentLang === "mr";

  // Localized lists
  const allSchemes = useMemo(() => getLocalizedSchemes(currentLang), [currentLang]);
  const allBanks = useMemo(() => getLocalizedBanks(currentLang), [currentLang]);
  const localizedSelectedScheme = useMemo(() => getLocalizedScheme(selectedScheme, currentLang), [selectedScheme, currentLang]);
  const localizedSelectedBank = useMemo(() => getLocalizedBank(selectedBank, currentLang), [selectedBank, currentLang]);

  const handleSelectPair = (schemeId: string, bankId: string) => {
    const rawScheme = getSchemeById(schemeId);
    const rawBank = getBankById(bankId);
    if (rawScheme) onSelectScheme(getLocalizedScheme(rawScheme, currentLang));
    if (rawBank) onSelectBank(getLocalizedBank(rawBank, currentLang));
  };

  return (
    <div className="space-y-6" id="scheme-bank-selector-container">
      {/* Dynamic Social Category Benefit Banner */}
      {socialCategory && socialCategory !== "General" && (
        <div className="bg-amber-50/95 dark:bg-amber-950/40 border border-amber-300/80 dark:border-amber-800/80 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 shadow-xs transition-colors">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-300 shrink-0">
              <Award className="h-5 w-5 text-amber-800 dark:text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-950 dark:text-amber-200">
                  {socialCategory} {isHindi ? "विशेष लाभार्थी विशेषाधिकार सक्रिय" : isMarathi ? "विशेष लाभार्थी सवलत सक्रिय" : "Beneficiary Privileges Active"}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-800 text-amber-950 dark:text-amber-200 font-bold text-[10px]">
                  {isHindi ? "विशेष लाभ" : "Special Privilege"}
                </span>
              </div>
              <p className="text-xs text-amber-900 dark:text-amber-300/90 mt-0.5 max-w-2xl font-medium leading-relaxed">
                {isHindi
                  ? `आप ${socialCategory} आवेदक के रूप में मात्र 5% प्रमोटर मार्जिन, ग्रामीण क्षेत्रों में 35% PMEGP पूंजीगत सब्सिडी तथा NSFDC, NBCFDC एवं NSTFDC के माध्यम से 4% से 6% रियायती शीर्ष ऋण के पात्र हैं।`
                  : isMarathi
                  ? `आपण ${socialCategory} प्रवर्गासाठी केवळ 5% स्वतःचे भांडवल, 35% ग्रामीण सबसिडी आणि 4% ते 6% सवलतीच्या व्याजदरासाठी पात्र आहात.`
                  : `As a ${socialCategory} applicant, you are entitled to a reduced 5% promoter margin, up to 35% PMEGP rural subsidy, and concessional 4%–6% apex credit via NSFDC, NBCFDC, and NSTFDC partner bank networks.`}
              </p>
            </div>
          </div>

          <button
            type="button"
            id="view-backward-caste-btn"
            onClick={() => {
              setActiveTab("backward_caste");
              if (socialCategory === "SC" || socialCategory === "ST" || socialCategory === "OBC") {
                setCasteFilter(socialCategory);
              }
            }}
            className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
          >
            <span>{isHindi ? "पिछड़ा वर्ग बैंक देखें" : isMarathi ? "मागासवर्गीय बँका पहा" : "Inspect Backward Caste Banks"}</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Tab Switcher: Schemes vs Banks vs Backward Caste Financing */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
              <span className="text-xs font-bold text-blue-900 dark:text-blue-400 uppercase tracking-wider">
                {isHindi ? "सरकारी योजनाएं एवं ऋण प्रदाता बैंक" : isMarathi ? "शासकीय योजना व बँका" : "Government Schemes & Lending Banks"}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mt-1">
              {isHindi ? "योजना एवं बैंक का चयन करें" : isMarathi ? "योजना व बँक निवडा" : "Choose Scheme & Lending Bank"}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {isHindi
                ? "योजना व बैंक का चयन करके तुरंत ब्याज दर, सब्सिडी और भुगतान समय सारिणी का पुनर्गणना देखें।"
                : "Select an official government credit scheme and partner bank to inspect terms and recalculate your repayment schedule."}
            </p>
          </div>

          <div className="flex flex-wrap items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700 gap-1">
            <button
              type="button"
              id="tab-schemes-btn"
              onClick={() => setActiveTab("schemes")}
              className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === "schemes"
                  ? "bg-blue-900 text-white shadow-xs dark:bg-blue-600"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Landmark className="h-3.5 w-3.5" />
              <span>{isHindi ? `समस्त योजनाएं (${allSchemes.length})` : `All Schemes (${allSchemes.length})`}</span>
            </button>
            <button
              type="button"
              id="tab-banks-btn"
              onClick={() => setActiveTab("banks")}
              className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === "banks"
                  ? "bg-blue-900 text-white shadow-xs dark:bg-blue-600"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Building2 className="h-3.5 w-3.5" />
              <span>{isHindi ? `प्रमुख बैंक (${allBanks.length})` : `Commercial Banks (${allBanks.length})`}</span>
            </button>
            <button
              type="button"
              id="tab-backward-caste-btn"
              onClick={() => setActiveTab("backward_caste")}
              className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === "backward_caste"
                  ? "bg-amber-700 text-white shadow-xs"
                  : "text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-200 dark:border-amber-800"
              }`}
            >
              <Award className="h-3.5 w-3.5 text-amber-500" />
              <span>{isHindi ? "पिछड़ा वर्ग वित्त (SC/ST/OBC)" : "Backward Caste Financing (SC/ST/OBC)"}</span>
            </button>
          </div>
        </div>

        {/* Section 1: Government Scheme Selection Cards */}
        {activeTab === "schemes" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {allSchemes.map((scheme) => {
                const isSelected = selectedScheme.id === scheme.id;
                const isEligible = projectCost <= scheme.maxLoan;

                return (
                  <div
                    key={scheme.id}
                    id={`scheme-card-${scheme.id}`}
                    onClick={() => onSelectScheme(scheme)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between relative ${
                      isSelected
                        ? "bg-blue-50/70 dark:bg-blue-950/40 border-blue-600 dark:border-blue-500 ring-2 ring-blue-600/20 shadow-md"
                        : "bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-sm"
                    }`}
                  >
                    <div>
                      {/* Badge Top */}
                      <div className="flex items-center justify-between gap-1 mb-2.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                          {scheme.code || "GOVT"}
                        </span>
                        {scheme.highlightBadge && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                            {scheme.highlightBadge}
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                        {scheme.name}
                      </h4>

                      <div className="mt-3 space-y-1.5 text-xs">
                        <div className="flex justify-between text-slate-600 dark:text-slate-400">
                          <span>{isHindi ? "अधिकतम ऋण सीमा:" : "Max Loan Cap:"}</span>
                          <span className="font-bold text-slate-900 dark:text-slate-100">{formatINR(scheme.maxLoan)}</span>
                        </div>
                        <div className="flex justify-between text-slate-600 dark:text-slate-400">
                          <span>{isHindi ? "ब्याज दर:" : "Interest Rate:"}</span>
                          <span className="font-bold text-blue-900 dark:text-blue-400">{scheme.interestRate}% p.a.</span>
                        </div>
                        <div className="flex justify-between text-slate-600 dark:text-slate-400">
                          <span>{isHindi ? "अवधि व छूट:" : "Tenure & Grace:"}</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {scheme.tenureYears} {isHindi ? "वर्ष" : "Yrs"} ({scheme.moratoriumMonths}{isHindi ? " माह छूट" : "m Grace"})
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                      <span className={`text-[11px] font-bold flex items-center gap-1 ${
                        isSelected ? "text-blue-900 dark:text-blue-400 font-black" : "text-slate-500 dark:text-slate-400"
                      }`}>
                        {isSelected ? (
                          <>
                            <CheckCircle2 className="h-3.5 w-3.5 text-blue-900 dark:text-blue-400" />
                            <span>{isHindi ? "चयनित योजना" : "Selected Scheme"}</span>
                          </>
                        ) : (
                          <span>{isHindi ? "चुनने के लिए क्लिक करें" : "Click to Select"}</span>
                        )}
                      </span>
                      <ChevronRight className={`h-4 w-4 ${isSelected ? "text-blue-900 dark:text-blue-400" : "text-slate-400"}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Section 2: Partner Bank Selection Cards */}
        {activeTab === "banks" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allBanks.map((bank) => {
                const isSelected = selectedBank.id === bank.id;

                return (
                  <div
                    key={bank.id}
                    id={`bank-card-${bank.id}`}
                    onClick={() => onSelectBank(bank)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? "bg-blue-50/70 dark:bg-blue-950/40 border-blue-600 dark:border-blue-500 ring-2 ring-blue-600/20 shadow-md"
                        : "bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-sm"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-900 dark:bg-blue-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                          {bank.logoInitial}
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                          ⏱ {bank.branchTurnaround}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                        {bank.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        {bank.ruralNetworkRating}
                      </p>

                      <div className="mt-3 bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700 space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-400">{isHindi ? "आधार ऋण दर:" : "Base Lending Rate:"}</span>
                          <span className="font-bold text-blue-900 dark:text-blue-400">{bank.baseInterestRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-400">{isHindi ? "प्रोसेसिंग शुल्क:" : "Processing Fee:"}</span>
                          <span className="font-medium text-slate-800 dark:text-slate-200 text-[11px]">{bank.processingFeeText}</span>
                        </div>
                      </div>

                      <ul className="mt-3 space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                        {bank.specialPerks.slice(0, 2).map((perk, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">✓</span>
                            <span className="line-clamp-1">{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                      <span className={`text-[11px] font-bold flex items-center gap-1 ${
                        isSelected ? "text-blue-900 dark:text-blue-400 font-black" : "text-slate-500 dark:text-slate-400"
                      }`}>
                        {isSelected ? (
                          <>
                            <CheckCircle2 className="h-3.5 w-3.5 text-blue-900 dark:text-blue-400" />
                            <span>{isHindi ? "चयनित बैंक" : "Selected Bank"}</span>
                          </>
                        ) : (
                          <span>{isHindi ? "बैंक चुनें" : "Select Bank"}</span>
                        )}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                        📞 {bank.helpline}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Section 3: Backward Caste Financing & Apex Banks Dedicated Section */}
        {activeTab === "backward_caste" && (
          <div className="space-y-6" id="backward-caste-dedicated-panel">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-amber-50/80 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-amber-900 dark:text-amber-300" />
                <span className="text-xs font-bold text-amber-950 dark:text-amber-200 uppercase tracking-tight">
                  {isHindi ? "जाति समूह के अनुसार फ़िल्टर करें:" : "Filter by Beneficiary Caste Group:"}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {(["ALL", "SC", "ST", "OBC"] as const).map((caste) => (
                  <button
                    key={caste}
                    type="button"
                    onClick={() => setCasteFilter(caste)}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                      casteFilter === caste
                        ? "bg-amber-800 text-white shadow-2xs"
                        : "bg-white dark:bg-slate-800 text-amber-900 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-slate-700 border border-amber-200 dark:border-amber-800"
                    }`}
                  >
                    {caste === "ALL" ? (isHindi ? "समस्त पिछड़ा वर्ग" : "All Backward Classes") : caste}
                  </button>
                ))}
              </div>
            </div>

            {/* Part A: Apex Backward Class Development Corporations & Channel Banks */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="h-4 w-4 text-amber-800 dark:text-amber-400" />
                <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  {isHindi
                    ? "राष्ट्रीय शीर्ष वित्त निगम (सार्वजनिक बैंकों एवं आरआरबी के माध्यम से उपलब्ध)"
                    : "National Apex Financial Corporations (Channelized via Public Sector Banks & RRBs)"}
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 1. NSFDC - Scheduled Castes */}
                {(casteFilter === "ALL" || casteFilter === "SC" || casteFilter === "ST") && (
                  <div className="bg-white dark:bg-slate-800/80 rounded-2xl p-5 border border-amber-200 dark:border-amber-800 hover:border-amber-400 transition-all flex flex-col justify-between shadow-xs">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 uppercase">
                          SC & ST Apex
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                          4.0% - 6.0% p.a.
                        </span>
                      </div>

                      <h5 className="font-bold text-slate-900 dark:text-white text-sm leading-tight">
                        NSFDC (National Scheduled Castes Finance & Dev Corp)
                      </h5>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        Channelized through State Bank of India, Punjab National Bank, and State SC/ST Corporations.
                      </p>

                      <div className="mt-3.5 space-y-2 text-xs">
                        <div className="p-2.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-100 dark:border-slate-700 space-y-1">
                          <p className="font-bold text-slate-800 dark:text-slate-200 text-[11px]">Key Concessional Programs:</p>
                          <p className="text-slate-600 dark:text-slate-400 text-[11px]">• <strong>Mahila Samriddhi:</strong> 4.0% p.a. for SC women</p>
                          <p className="text-slate-600 dark:text-slate-400 text-[11px]">• <strong>Micro-Credit:</strong> 5.0% p.a. up to ₹1,40,000</p>
                          <p className="text-slate-600 dark:text-slate-400 text-[11px]">• <strong>Term Loan:</strong> 6%–8% p.a. up to ₹50 Lakhs</p>
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400 pt-1">
                          <span>Promoter Margin:</span>
                          <span className="font-bold text-emerald-700 dark:text-emerald-400">Only 5% (95% Funded)</span>
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400">
                          <span>Processing Charge:</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">100% Nil / Free</span>
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400">
                          <span>National Toll-Free:</span>
                          <span className="font-mono text-blue-900 dark:text-blue-400 font-bold">1800 11 0505</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        id="select-nsfdc-pair-btn"
                        onClick={() => handleSelectPair("nsfdc_nbcfdc", "nsfdc_apex")}
                        className="w-full py-2 bg-blue-900 hover:bg-blue-950 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <span>{isHindi ? "NSFDC योजना एवं बैंक लागू करें" : "Apply NSFDC Scheme & Partner Bank"}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. NBCFDC - Other Backward Classes (OBC) */}
                {(casteFilter === "ALL" || casteFilter === "OBC") && (
                  <div className="bg-white dark:bg-slate-800/80 rounded-2xl p-5 border border-amber-200 dark:border-amber-800 hover:border-amber-400 transition-all flex flex-col justify-between shadow-xs">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 uppercase">
                          OBC Apex Body
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                          5.0% - 6.5% p.a.
                        </span>
                      </div>

                      <h5 className="font-bold text-slate-900 dark:text-white text-sm leading-tight">
                        NBCFDC (National Backward Classes Finance & Dev Corp)
                      </h5>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        Channelized through Canara Bank, Regional Rural Banks (RRBs), and State Backward Classes Corporations.
                      </p>

                      <div className="mt-3.5 space-y-2 text-xs">
                        <div className="p-2.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-100 dark:border-slate-700 space-y-1">
                          <p className="font-bold text-slate-800 dark:text-slate-200 text-[11px]">Key Concessional Programs:</p>
                          <p className="text-slate-600 dark:text-slate-400 text-[11px]">• <strong>Shilp Sampada:</strong> 5.0% p.a. for artisans & crafts</p>
                          <p className="text-slate-600 dark:text-slate-400 text-[11px]">• <strong>New Swarnima:</strong> 5.0% p.a. for OBC women</p>
                          <p className="text-slate-600 dark:text-slate-400 text-[11px]">• <strong>General Term Loan:</strong> 5%–7% p.a. up to ₹15 Lakhs</p>
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400 pt-1">
                          <span>Promoter Margin:</span>
                          <span className="font-bold text-emerald-700 dark:text-emerald-400">Only 5% (95% Funded)</span>
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400">
                          <span>Processing Charge:</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">100% Nil / Free</span>
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400">
                          <span>National Toll-Free:</span>
                          <span className="font-mono text-blue-900 dark:text-blue-400 font-bold">1800 102 3399</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        id="select-nbcfdc-pair-btn"
                        onClick={() => handleSelectPair("nsfdc_nbcfdc", "nbcfdc_apex")}
                        className="w-full py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <span>{isHindi ? "NBCFDC योजना लागू करें" : "Apply NBCFDC Scheme & Bank"}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. NSTFDC - Scheduled Tribes */}
                {(casteFilter === "ALL" || casteFilter === "ST") && (
                  <div className="bg-white dark:bg-slate-800/80 rounded-2xl p-5 border border-amber-200 dark:border-amber-800 hover:border-amber-400 transition-all flex flex-col justify-between shadow-xs">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 uppercase">
                          ST Tribal Apex
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                          4.0% - 5.5% p.a.
                        </span>
                      </div>

                      <h5 className="font-bold text-slate-900 dark:text-white text-sm leading-tight">
                        NSTFDC (National Scheduled Tribes Finance & Dev Corp)
                      </h5>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        Channelized through Gramin Banks, SBI, and Tribal Integrated Development Agencies (ITDA).
                      </p>

                      <div className="mt-3.5 space-y-2 text-xs">
                        <div className="p-2.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-100 dark:border-slate-700 space-y-1">
                          <p className="font-bold text-slate-800 dark:text-slate-200 text-[11px]">Key Concessional Programs:</p>
                          <p className="text-slate-600 dark:text-slate-400 text-[11px]">• <strong>AMSY:</strong> 4.0% flat for tribal women</p>
                          <p className="text-slate-600 dark:text-slate-400 text-[11px]">• <strong>Micro-Credit Scheme:</strong> 5.0% p.a. for SHGs</p>
                          <p className="text-slate-600 dark:text-slate-400 text-[11px]">• <strong>Tribal Term Loan:</strong> 6.0% p.a. up to ₹50 Lakhs</p>
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400 pt-1">
                          <span>Promoter Margin:</span>
                          <span className="font-bold text-emerald-700 dark:text-emerald-400">Only 5% - 10%</span>
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400">
                          <span>Processing Charge:</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">100% Nil / Free</span>
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400">
                          <span>National Toll-Free:</span>
                          <span className="font-mono text-blue-900 dark:text-blue-400 font-bold">1800 11 0031</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        id="select-nstfdc-pair-btn"
                        onClick={() => handleSelectPair("nsfdc_nbcfdc", "nstfdc_apex")}
                        className="w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <span>{isHindi ? "NSTFDC योजना लागू करें" : "Apply NSTFDC Scheme & Bank"}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Part B: Statutory Mandates at All Scheduled Commercial Banks */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
              <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <Scale className="h-4 w-4 text-blue-900 dark:text-blue-400" />
                <span>{isHindi ? "अनुसूचित जाति, जनजाति एवं पिछड़े वर्ग हेतु वैधानिक बैंक नियम" : "Statutory Banking Mandates for SC, ST & OBC Micro-Entrepreneurs"}</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Mandate 1: Stand-Up India Legal Branch Requirement */}
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">Stand-Up India Statutory Quota</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300">
                      ₹10L – ₹1 Crore
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    By Reserve Bank of India mandate, <strong>every commercial bank branch in India</strong> (SBI, PNB, Bank of Baroda, Canara, etc.) MUST sanction at least one loan to an SC or ST borrower.
                  </p>
                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Tenure: Up to 7 Years (18m Grace)</span>
                    <button
                      type="button"
                      onClick={() => handleSelectPair("standup_india", "sbi")}
                      className="text-xs font-bold text-blue-900 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <span>Select with SBI</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* Mandate 2: DRI 4.0% Collateral-Free Scheme */}
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">DRI (Differential Rate of Interest) Scheme</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300">
                      Flat 4.0% p.a.
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Under RBI guidelines, all Public Sector Banks allocate priority credit at an ultra-low <strong>4.0% annual interest rate</strong> with zero collateral and zero processing fee for backward caste micro-entrepreneurs.
                  </p>
                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">100% Collateral-Free Priority Loan</span>
                    <button
                      type="button"
                      onClick={() => handleSelectPair("dri_scheme", "pnb")}
                      className="text-xs font-bold text-blue-900 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <span>Select with PNB</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Deep-Dive Scheme Details Panel */}
      <div
        className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200 dark:border-slate-800 border-l-4 border-l-blue-600 dark:border-l-blue-500 transition-colors"
        id="selected-scheme-details-card"
      >
        <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300">
                {isHindi ? "आधिकारिक योजना विवरणिका" : "Official Scheme Dossier"}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">
                {isHindi ? "ऋण प्रदाता बैंक:" : "Partner Bank:"} {localizedSelectedBank.name}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              {localizedSelectedScheme.name}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-3xl font-medium leading-relaxed">
              {localizedSelectedScheme.reasoning}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {onAskAiAboutScheme && (
              <button
                type="button"
                id="ask-ai-scheme-btn"
                onClick={() => onAskAiAboutScheme(localizedSelectedScheme.name)}
                className="px-4 py-2 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <span>{isHindi ? "एआई से इस योजना पर पूछें" : "Ask AI About This Scheme"}</span>
              </button>
            )}

            {localizedSelectedScheme.portalUrl && (
              <a
                href={localizedSelectedScheme.portalUrl}
                target="_blank"
                rel="noreferrer"
                id="scheme-portal-link"
                className="px-4 py-2 bg-blue-900 hover:bg-blue-950 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>{localizedSelectedScheme.officialPortal || (isHindi ? "आधिकारिक पोर्टल पर जाएं" : "Visit Official Portal")}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Highlight Grid: Subsidy, Collateral & Bank Turnaround */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          {/* Card 1: Subsidy Assistance */}
          <div className="bg-emerald-50/70 dark:bg-emerald-950/30 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800/80">
            <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300 font-bold text-xs uppercase tracking-wide mb-1">
              <Award className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              <span>{isHindi ? "पूंजीगत सब्सिडी अनुदान" : "Capital Subsidy Grant"}</span>
            </div>
            <p className="text-xl font-black text-emerald-950 dark:text-emerald-200">
              {localizedSelectedScheme.subsidyPercentage ? `Up to ${localizedSelectedScheme.subsidyPercentage}% Subsidy` : (isHindi ? "ब्याज अनुदान" : "Interest Subvention")}
            </p>
            <p className="text-xs text-emerald-800 dark:text-emerald-300/80 mt-1 leading-relaxed">
              {localizedSelectedScheme.subsidyAssistance || "Standard priority sector micro-lending rebate."}
            </p>
          </div>

          {/* Card 2: Collateral Requirement */}
          <div className="bg-blue-50/70 dark:bg-blue-950/30 p-4 rounded-2xl border border-blue-200 dark:border-blue-800/80">
            <div className="flex items-center gap-2 text-blue-900 dark:text-blue-300 font-bold text-xs uppercase tracking-wide mb-1">
              <ShieldCheck className="h-4 w-4 text-blue-700 dark:text-blue-400" />
              <span>{isHindi ? "संपार्श्विक (गारंटी) नियम" : "Collateral Requirement"}</span>
            </div>
            <p className="text-xl font-black text-blue-950 dark:text-blue-200">
              {isHindi ? "शून्य तृतीय-पक्ष गारंटी" : "Zero Third-Party Collateral"}
            </p>
            <p className="text-xs text-blue-800 dark:text-blue-300/80 mt-1 leading-relaxed">
              {localizedSelectedScheme.collateralRequirement || "Covered under CGTMSE guarantee trust for loans up to ₹10 Lakhs."}
            </p>
          </div>

          {/* Card 3: Bank Processing Window */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold text-xs uppercase tracking-wide mb-1">
              <Clock className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              <span>{isHindi ? "शाखा निस्तारण समय" : "Bank Processing Window"}</span>
            </div>
            <p className="text-xl font-black text-slate-900 dark:text-white">
              {localizedSelectedBank.branchTurnaround}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {isHindi
                ? `${localizedSelectedBank.shortName} द्वारा जन समर्थ / उद्यम पोर्टल डिजिटल एकीकरण के माध्यम से।`
                : `At ${localizedSelectedBank.shortName} via Jan Samarth / Udyam portal digital integration.`}
            </p>
          </div>
        </div>

        {/* Eligibility & Documents 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          {/* Eligibility Criteria */}
          <div>
            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span>{isHindi ? "पात्रता दिशानिर्देश" : "Eligibility Guidelines"}</span>
            </h4>
            <ul className="space-y-2.5">
              {(localizedSelectedScheme.eligibilityCriteria || [
                "Indian citizen aged 18 years and above",
                "New micro-enterprise in manufacturing, services, or trading",
                "No past credit defaults with any nationalized or scheduled bank",
                socialCategory && socialCategory !== "General"
                  ? `Promoter must contribute only 5% margin money (concessional for ${socialCategory})`
                  : "Promoter must contribute 10% margin money (5% if belonging to SC/ST/OBC/Women)"
              ]).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0 mt-1.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Documents Required */}
          <div>
            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <FileCheck2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>{isHindi ? "बैंक शाखा हेतु अनिवार्य दस्तावेज" : "Mandatory Documents for Bank Branch"}</span>
            </h4>
            <ul className="space-y-2.5">
              {(localizedSelectedScheme.documentsRequired || [
                "Aadhaar Card and PAN Card (KYC)",
                "Gram Panchayat / Block residence certificate",
                "Vendor quotations for machinery and tools",
                "Detailed Project Report (DPR) downloaded from Udyam Sahayak",
                "Caste Certificate issued by Competent Authority (SDM/Tehsildar) for SC/ST/OBC concessions"
              ]).map((doc, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 shrink-0 mt-1.5" />
                  <span className="leading-relaxed">{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
