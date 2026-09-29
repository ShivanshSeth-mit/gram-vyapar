import React, { useState, useMemo } from "react";
import { FeasibilityReportData, SupportedLanguage, SUPPORTED_LANGUAGES } from "../types";
import { translations } from "../data/translations";
import { speakText, stopSpeaking } from "../utils/speech";
import { convertFeasibilityReport } from "../utils/languageConvert";
import { getFeasibilityLabels } from "../utils/feasibilityLocalization";
import { CardLanguageConverter } from "./CardLanguageConverter";
import {
  Users,
  Lightbulb,
  Grid2X2,
  AlertTriangle,
  Store,
  Tag,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
  MapPin,
  ShieldAlert,
  Languages,
  Award,
  Sparkles
} from "lucide-react";

interface FeasibilityTabProps {
  data: FeasibilityReportData;
  location: string;
  businessCategory: string;
  currentLang: SupportedLanguage;
}

export const FeasibilityTab: React.FC<FeasibilityTabProps> = ({
  data,
  location,
  businessCategory,
  currentLang
}) => {
  // Accordion expand states (all open by default for comprehensive viewing)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    market: true,
    opportunity: true,
    swot: true,
    threats: true,
    competitors: true,
    pricing: true
  });

  // Per-card language selection overrides (allows converting each section individually or using global currentLang)
  const [cardLanguages, setCardLanguages] = useState<Record<string, SupportedLanguage>>({});
  const [showOriginal, setShowOriginal] = useState<Record<string, boolean>>({});
  const [activeSpeechCard, setActiveSpeechCard] = useState<string | null>(null);

  const toggleExpand = (section: string) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Resolve target language for a specific card
  const getCardLang = (cardKey: string): SupportedLanguage => {
    if (showOriginal[cardKey]) return "en";
    return cardLanguages[cardKey] || currentLang;
  };

  const handleSetCardLang = (cardKey: string, lang: SupportedLanguage) => {
    setCardLanguages((prev) => ({ ...prev, [cardKey]: lang }));
    setShowOriginal((prev) => ({ ...prev, [cardKey]: false }));
  };

  const handleToggleOriginal = (cardKey: string) => {
    setShowOriginal((prev) => ({ ...prev, [cardKey]: !prev[cardKey] }));
  };

  // Convert report data per card's active language
  const marketData = useMemo(() => {
    const lang = getCardLang("market");
    return convertFeasibilityReport(data, lang);
  }, [data, cardLanguages.market, showOriginal.market, currentLang]);

  const oppData = useMemo(() => {
    const lang = getCardLang("opportunity");
    return convertFeasibilityReport(data, lang);
  }, [data, cardLanguages.opportunity, showOriginal.opportunity, currentLang]);

  const swotData = useMemo(() => {
    const lang = getCardLang("swot");
    return convertFeasibilityReport(data, lang);
  }, [data, cardLanguages.swot, showOriginal.swot, currentLang]);

  const threatsData = useMemo(() => {
    const lang = getCardLang("threats");
    return convertFeasibilityReport(data, lang);
  }, [data, cardLanguages.threats, showOriginal.threats, currentLang]);

  const competitorData = useMemo(() => {
    const lang = getCardLang("competitors");
    return convertFeasibilityReport(data, lang);
  }, [data, cardLanguages.competitors, showOriginal.competitors, currentLang]);

  const pricingData = useMemo(() => {
    const lang = getCardLang("pricing");
    return convertFeasibilityReport(data, lang);
  }, [data, cardLanguages.pricing, showOriginal.pricing, currentLang]);

  // Read aloud in active language
  const handleSpeak = (sectionKey: string, textToRead?: string) => {
    if (activeSpeechCard === sectionKey) {
      stopSpeaking();
      setActiveSpeechCard(null);
      return;
    }

    if (!textToRead) return;
    stopSpeaking();
    setActiveSpeechCard(sectionKey);
    const targetSpeechLang = getCardLang(sectionKey);
    speakText(textToRead, targetSpeechLang);
  };

  // Helper for Competitor Density
  const getDensityBadge = (density: string = "Moderate") => {
    const d = density.toLowerCase();
    if (d.includes("low")) {
      return { text: "Low Competition (High Room)", color: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800", percent: 30 };
    }
    if (d.includes("high")) {
      return { text: "High Competition (Differentiation Needed)", color: "bg-rose-100 dark:bg-rose-950/60 text-rose-900 dark:text-rose-300 border-rose-300 dark:border-rose-800", percent: 85 };
    }
    return { text: "Moderate Density (Healthy Demand)", color: "bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-800", percent: 55 };
  };

  const densityMeta = getDensityBadge(data.competitorMapping?.densityLevel);

  // Global label sets for active languages
  const oppLabels = getFeasibilityLabels(getCardLang("opportunity"));
  const swotLabels = getFeasibilityLabels(getCardLang("swot"));
  const threatsLabels = getFeasibilityLabels(getCardLang("threats"));
  const compLabels = getFeasibilityLabels(getCardLang("competitors"));
  const pricingLabels = getFeasibilityLabels(getCardLang("pricing"));
  const marketLabels = getFeasibilityLabels(getCardLang("market"));

  // Global translations dictionary based on current active language
  const t = translations[currentLang];

  return (
    <div className="space-y-6" id="feasibility-tab-content">
      {/* 1. Overview Banner - With Quick Multi-Language Conversion Bar */}
      <div className="bg-blue-900 text-white rounded-2xl p-5 sm:p-6 shadow-sm border border-blue-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest block">
              Hyper-Local Market Intelligence • 13 Indian Languages
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-tight mt-1">
              Feasibility Study: {businessCategory}
            </h2>
            <p className="text-xs text-blue-200 mt-1 flex items-center gap-1.5 font-medium">
              <MapPin className="h-3.5 w-3.5 text-blue-400 shrink-0" />
              <span>Assessed for <strong>{location}</strong> cluster (5–10 km radius)</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-blue-800/80 px-3.5 py-1.5 rounded-full border border-blue-700 text-blue-100">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Multi-lingual AI Feasibility</span>
            </span>
          </div>
        </div>

        {/* Quick Language Switcher Bar directly in banner */}
        <div className="pt-2 border-t border-blue-800/70 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-1.5 text-xs text-blue-200 font-medium">
            <Languages className="h-4 w-4 text-amber-400" />
            <span className="font-semibold">Convert Report Language:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { code: "hi", name: "हिन्दी" },
              { code: "mr", name: "मराठी" },
              { code: "bn", name: "বাংলা" },
              { code: "ta", name: "தமிழ்" },
              { code: "te", name: "తెలుగు" },
              { code: "gu", name: "ગુજરાતી" },
              { code: "pa", name: "ਪੰਜਾਬੀ" },
              { code: "en", name: "English" }
            ].map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  const target = lang.code as SupportedLanguage;
                  setCardLanguages({
                    market: target,
                    opportunity: target,
                    swot: target,
                    threats: target,
                    competitors: target,
                    pricing: target
                  });
                  setShowOriginal({});
                }}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                  getCardLang("opportunity") === lang.code
                    ? "bg-amber-400 text-blue-950 shadow-xs scale-105"
                    : "bg-blue-800/60 hover:bg-blue-800 text-blue-100 border border-blue-700/60"
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Market Reach (div#card-market-reach) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors" id="card-market-reach">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300">
                <Users className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 uppercase tracking-tight">
                {translations[getCardLang("market")].marketReachTitle || t.marketReachTitle}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <CardLanguageConverter
                idPrefix="market"
                currentLang={getCardLang("market")}
                onSelectLanguage={(lang) => handleSetCardLang("market", lang)}
                isShowingOriginal={showOriginal.market}
                onToggleOriginal={() => handleToggleOriginal("market")}
              />

              <button
                type="button"
                id="voice-btn-market"
                onClick={() => handleSpeak("market", marketData.marketReach?.summary)}
                className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full border transition-colors ${
                  activeSpeechCard === "market"
                    ? "bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800"
                    : "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700"
                }`}
              >
                {activeSpeechCard === "market" ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />}
                <span>{activeSpeechCard === "market" ? t.stopVoice : t.listenVoice}</span>
              </button>

              <button
                type="button"
                onClick={() => toggleExpand("market")}
                className="p-1.5 text-slate-400 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {expanded.market ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Plain Language Summary Sentence */}
          <div className="mt-3.5 p-4 bg-gradient-to-r from-blue-50/80 to-indigo-50/40 dark:from-slate-800/80 dark:to-slate-800/40 border border-blue-100 dark:border-slate-800 rounded-xl shadow-2xs">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[10px] uppercase font-bold text-blue-700 dark:text-blue-400 tracking-wider">
                {marketLabels.marketReachSummaryLabel}
              </p>
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                {SUPPORTED_LANGUAGES.find(l => l.code === getCardLang("market"))?.nativeName}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
              "{marketData.marketReach?.summary}"
            </p>
          </div>
        </div>

        {expanded.market && (
          <div className="p-5 bg-slate-50/50 dark:bg-slate-900/50 space-y-4">
            <div className="bg-white dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                {marketLabels.consumerBaseLabel}
              </span>
              <p className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100">
                {marketData.marketReach?.consumerBase || "15,000 - 25,000 residents in surrounding village panchayats"}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">
                {marketLabels.distributionChannelsLabel}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {marketData.marketReach?.channels?.map((ch, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-800/80 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-2.5">
                    <div className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0" />
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{ch}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Opportunity Analysis (div#card-opportunity) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors" id="card-opportunity">
        {/* Child 1: Header + Summary container */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800">
          {/* Child 1 > div:nth-of-type(1) */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300">
                <Lightbulb className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 uppercase tracking-tight">
                {translations[getCardLang("opportunity")].opportunityTitle || t.opportunityTitle}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <CardLanguageConverter
                idPrefix="opp"
                currentLang={getCardLang("opportunity")}
                onSelectLanguage={(lang) => handleSetCardLang("opportunity", lang)}
                isShowingOriginal={showOriginal.opportunity}
                onToggleOriginal={() => handleToggleOriginal("opportunity")}
              />

              <button
                type="button"
                id="voice-btn-opportunity"
                onClick={() => handleSpeak("opportunity", oppData.opportunityAnalysis?.summary)}
                className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full border transition-colors ${
                  activeSpeechCard === "opportunity"
                    ? "bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800"
                    : "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700"
                }`}
              >
                {activeSpeechCard === "opportunity" ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />}
                <span>{activeSpeechCard === "opportunity" ? t.stopVoice : t.listenVoice}</span>
              </button>

              <button
                type="button"
                onClick={() => toggleExpand("opportunity")}
                className="p-1.5 text-slate-400 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {expanded.opportunity ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Child 1 > div:nth-of-type(2): Opportunity Summary Box (CSS Selector 1 Target) */}
          <div className="mt-3.5 p-4 bg-gradient-to-r from-blue-50/80 to-indigo-50/50 dark:from-slate-800/80 dark:to-slate-800/40 border border-blue-200/80 dark:border-blue-900/40 rounded-xl shadow-2xs">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[10px] uppercase font-bold text-blue-700 dark:text-blue-400 tracking-wider">
                {oppLabels.opportunitySummaryLabel}
              </p>
              <span className="text-[10px] font-semibold text-blue-800 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/80 px-2 py-0.5 rounded-full">
                {SUPPORTED_LANGUAGES.find(l => l.code === getCardLang("opportunity"))?.nativeName}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
              "{oppData.opportunityAnalysis?.summary}"
            </p>
          </div>
        </div>

        {/* Child 2: Underserved Niches Container (CSS Selector 2 Target) */}
        {expanded.opportunity && (
          <div className="p-5 bg-slate-50/60 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block">
                {oppLabels.underservedNichesTitle}
              </span>
              <span className="text-[10px] text-blue-700 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-900">
                {oppLabels.translatedTo} {SUPPORTED_LANGUAGES.find(l => l.code === getCardLang("opportunity"))?.nativeName}
              </span>
            </div>

            <div className="space-y-2.5">
              {oppData.opportunityAnalysis?.niches?.map((niche, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-800/90 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-700 shadow-2xs hover:border-blue-300 dark:hover:border-blue-700 transition-all flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">{niche}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                      {oppLabels.marginPremiumNote}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. SWOT Analysis (div#card-swot) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors" id="card-swot">
        {/* Child 1: Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300">
                <Grid2X2 className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 uppercase tracking-tight">
                {translations[getCardLang("swot")].swotTitle || t.swotTitle}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <CardLanguageConverter
                idPrefix="swot"
                currentLang={getCardLang("swot")}
                onSelectLanguage={(lang) => handleSetCardLang("swot", lang)}
                isShowingOriginal={showOriginal.swot}
                onToggleOriginal={() => handleToggleOriginal("swot")}
              />

              <button
                type="button"
                id="voice-btn-swot"
                onClick={() => handleSpeak("swot", "Strengths: " + swotData.swot?.strengths.join(". ") + ". Weaknesses: " + swotData.swot?.weaknesses.join(". "))}
                className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full border transition-colors ${
                  activeSpeechCard === "swot"
                    ? "bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800"
                    : "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700"
                }`}
              >
                {activeSpeechCard === "swot" ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />}
                <span>{activeSpeechCard === "swot" ? t.stopVoice : t.listenVoice}</span>
              </button>

              <button
                type="button"
                onClick={() => toggleExpand("swot")}
                className="p-1.5 text-slate-400 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {expanded.swot ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            {swotLabels.swotSubtitle}
          </p>
        </div>

        {/* Child 2: Body container */}
        {expanded.swot && (
          <div className="p-5 bg-slate-50/50 dark:bg-slate-900/50">
            {/* Child 2 > div:nth-of-type(1): 2x2 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Grid Child 1: Strengths (CSS Selector 3 Target) */}
              <div className="p-4 bg-emerald-50/80 dark:bg-emerald-950/40 rounded-xl border border-emerald-200/90 dark:border-emerald-800/60 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                    {translations[getCardLang("swot")].swotS || t.swotS}
                  </p>
                  <span className="text-[9px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/60 px-1.5 py-0.5 rounded">
                    {SUPPORTED_LANGUAGES.find(l => l.code === getCardLang("swot"))?.nativeName}
                  </span>
                </div>
                <ul className="space-y-2">
                  {swotData.swot?.strengths?.map((s, idx) => (
                    <li key={idx} className="text-xs text-emerald-950 dark:text-emerald-200 leading-relaxed font-medium flex items-start gap-2">
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Grid Child 2: Weaknesses (CSS Selector 4 Target) */}
              <div className="p-4 bg-rose-50/80 dark:bg-rose-950/40 rounded-xl border border-rose-200/90 dark:border-rose-800/60 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wider">
                    {translations[getCardLang("swot")].swotW || t.swotW}
                  </p>
                  <span className="text-[9px] font-bold text-rose-700 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/60 px-1.5 py-0.5 rounded">
                    {SUPPORTED_LANGUAGES.find(l => l.code === getCardLang("swot"))?.nativeName}
                  </span>
                </div>
                <ul className="space-y-2">
                  {swotData.swot?.weaknesses?.map((w, idx) => (
                    <li key={idx} className="text-xs text-rose-950 dark:text-rose-200 leading-relaxed font-medium flex items-start gap-2">
                      <span className="text-rose-700 dark:text-rose-400 font-bold">•</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Grid Child 3: Opportunities (CSS Selector 5 Target) */}
              <div className="p-4 bg-sky-50/80 dark:bg-sky-950/40 rounded-xl border border-sky-200/90 dark:border-sky-800/60 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-bold text-sky-800 dark:text-sky-300 uppercase tracking-wider">
                    {translations[getCardLang("swot")].swotO || t.swotO}
                  </p>
                  <span className="text-[9px] font-bold text-sky-700 dark:text-sky-400 bg-sky-100 dark:bg-sky-900/60 px-1.5 py-0.5 rounded">
                    {SUPPORTED_LANGUAGES.find(l => l.code === getCardLang("swot"))?.nativeName}
                  </span>
                </div>
                <ul className="space-y-2">
                  {swotData.swot?.opportunities?.map((o, idx) => (
                    <li key={idx} className="text-xs text-sky-950 dark:text-sky-200 leading-relaxed font-medium flex items-start gap-2">
                      <span className="text-sky-700 dark:text-sky-400 font-bold">•</span>
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Grid Child 4: Threats (CSS Selector 6 Target) */}
              <div className="p-4 bg-amber-50/80 dark:bg-amber-950/40 rounded-xl border border-amber-200/90 dark:border-amber-800/60 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                    {translations[getCardLang("swot")].swotT || t.swotT}
                  </p>
                  <span className="text-[9px] font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/60 px-1.5 py-0.5 rounded">
                    {SUPPORTED_LANGUAGES.find(l => l.code === getCardLang("swot"))?.nativeName}
                  </span>
                </div>
                <ul className="space-y-2">
                  {swotData.swot?.threats?.map((tr, idx) => (
                    <li key={idx} className="text-xs text-amber-950 dark:text-amber-200 leading-relaxed font-medium flex items-start gap-2">
                      <span className="text-amber-700 dark:text-amber-400 font-bold">•</span>
                      <span>{tr}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. Threats Identification (div#card-threats) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors" id="card-threats">
        {/* Child 1: Header + Summary container */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800">
          {/* Child 1 > div:nth-of-type(1) */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 uppercase tracking-tight">
                {translations[getCardLang("threats")].threatsTitle || t.threatsTitle}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <CardLanguageConverter
                idPrefix="threats"
                currentLang={getCardLang("threats")}
                onSelectLanguage={(lang) => handleSetCardLang("threats", lang)}
                isShowingOriginal={showOriginal.threats}
                onToggleOriginal={() => handleToggleOriginal("threats")}
              />

              <button
                type="button"
                id="voice-btn-threats"
                onClick={() => handleSpeak("threats", threatsData.threatsIdentification?.summary)}
                className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full border transition-colors ${
                  activeSpeechCard === "threats"
                    ? "bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800"
                    : "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700"
                }`}
              >
                {activeSpeechCard === "threats" ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />}
                <span>{activeSpeechCard === "threats" ? t.stopVoice : t.listenVoice}</span>
              </button>

              <button
                type="button"
                onClick={() => toggleExpand("threats")}
                className="p-1.5 text-slate-400 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {expanded.threats ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Child 1 > div:nth-of-type(2): Threats Summary Box (CSS Selector 8 Target) */}
          <div className="mt-3.5 p-4 bg-gradient-to-r from-amber-50/80 to-orange-50/50 dark:from-slate-800/80 dark:to-slate-800/40 border border-amber-200/80 dark:border-amber-900/40 rounded-xl shadow-2xs">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[10px] uppercase font-bold text-orange-700 dark:text-orange-400 tracking-wider">
                {threatsLabels.threatsSummaryLabel}
              </p>
              <span className="text-[10px] font-semibold text-orange-800 dark:text-orange-300 bg-orange-100 dark:bg-orange-950/80 px-2 py-0.5 rounded-full">
                {SUPPORTED_LANGUAGES.find(l => l.code === getCardLang("threats"))?.nativeName}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
              "{threatsData.threatsIdentification?.summary}"
            </p>
          </div>
        </div>

        {/* Child 2: Threats Risks List Container (CSS Selector 7 Target) */}
        {expanded.threats && (
          <div className="p-5 bg-slate-50/60 dark:bg-slate-900/60 space-y-2.5 border-t border-slate-100 dark:border-slate-800">
            {threatsData.threatsIdentification?.risks?.map((risk, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800/90 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-700 shadow-2xs hover:border-amber-300 dark:hover:border-amber-700 transition-colors flex items-start gap-3">
                <ShieldAlert className="h-4 w-4 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{risk}</p>
                  <p className="text-[11px] text-blue-900 dark:text-blue-300 mt-0.5 font-medium">
                    {threatsLabels.threatMitigationTip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 6. Competitor Mapping (div#card-competitors) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors" id="card-competitors">
        {/* Child 1: Header + Summary container */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800">
          {/* Child 1 > div:nth-of-type(1) */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300">
                <Store className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 uppercase tracking-tight">
                {translations[getCardLang("competitors")].competitorTitle || t.competitorTitle}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <CardLanguageConverter
                idPrefix="comp"
                currentLang={getCardLang("competitors")}
                onSelectLanguage={(lang) => handleSetCardLang("competitors", lang)}
                isShowingOriginal={showOriginal.competitors}
                onToggleOriginal={() => handleToggleOriginal("competitors")}
              />

              <button
                type="button"
                id="voice-btn-competitor"
                onClick={() => handleSpeak("competitor", competitorData.competitorMapping?.summary)}
                className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full border transition-colors ${
                  activeSpeechCard === "competitor"
                    ? "bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800"
                    : "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700"
                }`}
              >
                {activeSpeechCard === "competitor" ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />}
                <span>{activeSpeechCard === "competitor" ? t.stopVoice : t.listenVoice}</span>
              </button>

              <button
                type="button"
                onClick={() => toggleExpand("competitors")}
                className="p-1.5 text-slate-400 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {expanded.competitors ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Child 1 > div:nth-of-type(2): Competitor Summary Box (CSS Selector 9 Target) */}
          <div className="mt-3.5 p-4 bg-gradient-to-r from-blue-50/80 to-slate-50 dark:from-slate-800/80 dark:to-slate-800/40 border border-blue-200/80 dark:border-slate-700/80 rounded-xl shadow-2xs">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[10px] uppercase font-bold text-blue-700 dark:text-blue-400 tracking-wider">
                {compLabels.competitorSummaryLabel}
              </p>
              <span className="text-[10px] font-semibold text-blue-800 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/80 px-2 py-0.5 rounded-full">
                {SUPPORTED_LANGUAGES.find(l => l.code === getCardLang("competitors"))?.nativeName}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
              "{competitorData.competitorMapping?.summary}"
            </p>
          </div>
        </div>

        {/* Child 2: Competitor Expanded Details */}
        {expanded.competitors && (
          <div className="p-5 bg-slate-50/50 dark:bg-slate-900/50 space-y-4">
            <div className="bg-white dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {compLabels.competitorDensityLabel}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-tight px-2.5 py-0.5 rounded-full border ${densityMeta.color}`}>
                  {densityMeta.text}
                </span>
              </div>

              <div className="flex items-center space-x-1.5 my-2">
                <div className={`h-2 flex-1 rounded-full ${densityMeta.percent >= 20 ? "bg-blue-600 dark:bg-blue-500" : "bg-slate-200 dark:bg-slate-700"}`} />
                <div className={`h-2 flex-1 rounded-full ${densityMeta.percent >= 40 ? "bg-blue-600 dark:bg-blue-500" : "bg-slate-200 dark:bg-slate-700"}`} />
                <div className={`h-2 flex-1 rounded-full ${densityMeta.percent >= 60 ? "bg-blue-600 dark:bg-blue-500" : "bg-slate-200 dark:bg-slate-700"}`} />
                <div className={`h-2 flex-1 rounded-full ${densityMeta.percent >= 80 ? "bg-blue-600 dark:bg-blue-500" : "bg-slate-200 dark:bg-slate-700"}`} />
                <div className={`h-2 flex-1 rounded-full ${densityMeta.percent >= 95 ? "bg-blue-600 dark:bg-blue-500" : "bg-slate-200 dark:bg-slate-700"}`} />
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-2">
                {densityMeta.percent <= 40 ? "Low density: Healthy room for new entrant." : densityMeta.percent <= 70 ? "Moderate density: Strong demand with active competitors." : "High density: Focus on product freshness & direct home delivery."}
              </p>
            </div>

            {/* Simulated Block Map Pin Cluster Graphic */}
            <div className="bg-white dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-2 block">
                Visual Spatial Mapping in {location}
              </span>
              <div className="relative h-44 w-full bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden flex items-center justify-center p-3">
                <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 0 50 Q 150 120 400 30 T 800 100" stroke="#64748b" strokeWidth="4" fill="none" />
                  <path d="M 200 0 Q 250 100 220 200" stroke="#64748b" strokeWidth="3" fill="none" />
                  <circle cx="210" cy="80" r="30" fill="transparent" stroke="#64748b" strokeDasharray="3 3" />
                </svg>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                  <span className="px-2.5 py-1 rounded-md bg-blue-900 dark:bg-blue-600 text-white text-[10px] font-bold shadow-sm flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-green-400" />
                    YOUR PROPOSED UNIT
                  </span>
                  <div className="h-3 w-0.5 bg-blue-900 dark:bg-blue-600" />
                </div>

                <div className="absolute top-6 left-12 flex flex-col items-center">
                  <span className="px-1.5 py-0.5 rounded bg-slate-700 dark:bg-slate-600 text-white text-[9px] font-medium shadow-xs">
                    Competitor 1 (Haat)
                  </span>
                </div>

                <div className="absolute bottom-8 right-16 flex flex-col items-center">
                  <span className="px-1.5 py-0.5 rounded bg-slate-700 dark:bg-slate-600 text-white text-[9px] font-medium shadow-xs">
                    Competitor 2 (Mandi)
                  </span>
                </div>

                <div className="absolute top-10 right-28 flex flex-col items-center">
                  <span className="px-1.5 py-0.5 rounded bg-slate-700 dark:bg-slate-600 text-white text-[9px] font-medium shadow-xs">
                    Competitor 3 (Roadside)
                  </span>
                </div>
              </div>

              <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-900/60 rounded-lg text-xs text-slate-700 dark:text-slate-300">
                <span className="font-bold text-slate-900 dark:text-slate-100 mr-1">Competitive Edge:</span>
                {competitorData.competitorMapping?.competitorInsights}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 7. Product Market Value (div#card-product-value) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors" id="card-product-value">
        {/* Child 1: Header + Summary container */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300">
                <Tag className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 uppercase tracking-tight">
                {translations[getCardLang("pricing")].productValueTitle || t.productValueTitle}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <CardLanguageConverter
                idPrefix="pricing"
                currentLang={getCardLang("pricing")}
                onSelectLanguage={(lang) => handleSetCardLang("pricing", lang)}
                isShowingOriginal={showOriginal.pricing}
                onToggleOriginal={() => handleToggleOriginal("pricing")}
              />

              <button
                type="button"
                id="voice-btn-pricing"
                onClick={() => handleSpeak("pricing", pricingData.productMarketValue?.summary)}
                className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full border transition-colors ${
                  activeSpeechCard === "pricing"
                    ? "bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800"
                    : "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700"
                }`}
              >
                {activeSpeechCard === "pricing" ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />}
                <span>{activeSpeechCard === "pricing" ? t.stopVoice : t.listenVoice}</span>
              </button>

              <button
                type="button"
                onClick={() => toggleExpand("pricing")}
                className="p-1.5 text-slate-400 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {expanded.pricing ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="mt-3.5 p-4 bg-gradient-to-r from-blue-50/80 to-slate-50 dark:from-slate-800/80 dark:to-slate-800/40 border border-blue-200/80 dark:border-slate-700 rounded-xl shadow-2xs">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[10px] uppercase font-bold text-blue-700 dark:text-blue-400 tracking-wider">
                {pricingLabels.recommendedPriceLabel} & {pricingLabels.netProfitMarginLabel}
              </p>
              <span className="text-[10px] font-semibold text-blue-800 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/80 px-2 py-0.5 rounded-full">
                {SUPPORTED_LANGUAGES.find(l => l.code === getCardLang("pricing"))?.nativeName}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
              "{pricingData.productMarketValue?.summary}"
            </p>
          </div>
        </div>

        {/* Child 2: Expanded Body */}
        {expanded.pricing && (
          <div className="p-5 bg-slate-50/50 dark:bg-slate-900/50">
            {/* Child 2 > div:nth-of-type(1): 2-Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Grid Child 1: Recommended Selling Price (CSS Selector 10 Target) */}
              <div className="bg-white dark:bg-slate-800/90 p-4 rounded-xl border border-blue-100 dark:border-slate-700 shadow-2xs hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {pricingLabels.recommendedPriceLabel}
                </span>
                <p className="text-xl font-black text-blue-900 dark:text-blue-300 mt-1">
                  {pricingData.productMarketValue?.priceRange || "Competitive Local Range"}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  {pricingLabels.purchasingPowerNote}
                </p>
              </div>

              {/* Grid Child 2: Net Operating Profit Margin (CSS Selector 11 Target) */}
              <div className="bg-white dark:bg-slate-800/90 p-4 rounded-xl border border-emerald-100 dark:border-slate-700 shadow-2xs hover:border-emerald-300 dark:hover:border-emerald-600 transition-colors">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {pricingLabels.netProfitMarginLabel}
                </span>
                <p className="text-xl font-black text-emerald-700 dark:text-emerald-400 mt-1">
                  {pricingData.productMarketValue?.marginEstimate || "22% - 30%"}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  {pricingLabels.costCoverageNote}
                </p>
              </div>
            </div>

            {/* Child 2 > div:nth-of-type(2): Regional Benchmark Note (CSS Selector 12 Target) */}
            <div className="mt-3 p-3.5 bg-white dark:bg-slate-800/90 rounded-xl border border-slate-200/80 dark:border-slate-700 shadow-2xs text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
              <Award className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 dark:text-slate-100 mr-1.5">
                  {pricingLabels.regionalBenchmarkLabel}:
                </span>
                <span>
                  {pricingData.productMarketValue?.benchmarkNote || "Calibrated for purchasing habits in agricultural and semi-urban panchayats."}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
