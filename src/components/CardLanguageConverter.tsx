import React, { useState } from "react";
import { SupportedLanguage, SUPPORTED_LANGUAGES } from "../types";
import { Languages, Check, ArrowRightLeft } from "lucide-react";

interface CardLanguageConverterProps {
  currentLang: SupportedLanguage;
  onSelectLanguage: (lang: SupportedLanguage) => void;
  showOriginalToggle?: boolean;
  isShowingOriginal?: boolean;
  onToggleOriginal?: () => void;
  compact?: boolean;
  idPrefix?: string;
}

const POPULAR_LANGS: { code: SupportedLanguage; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "hi", label: "हिन्दी" },
  { code: "mr", label: "मराठी" },
  { code: "bn", label: "বাংলা" },
  { code: "ta", label: "தமிழ்" },
  { code: "te", label: "తెలుగు" },
  { code: "gu", label: "ગુજરાતી" }
];

export const CardLanguageConverter: React.FC<CardLanguageConverterProps> = ({
  currentLang,
  onSelectLanguage,
  showOriginalToggle = true,
  isShowingOriginal = false,
  onToggleOriginal,
  compact = false,
  idPrefix = "conv"
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentMeta = SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  return (
    <div className="relative inline-flex items-center flex-wrap gap-1.5" id={`${idPrefix}-converter`}>
      {/* Quick language selection pills */}
      <div className="inline-flex items-center p-0.5 bg-slate-200/80 dark:bg-slate-800 rounded-full border border-slate-300/80 dark:border-slate-700 text-[11px]">
        <button
          type="button"
          id={`${idPrefix}-dropdown-btn`}
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-slate-800 dark:text-slate-100 hover:bg-white dark:hover:bg-slate-700 transition-colors shadow-2xs"
          title="Choose from all 13 supported Indian languages"
        >
          <Languages className="h-3 w-3 text-blue-600 dark:text-blue-400" />
          <span className="truncate max-w-[80px]">{currentMeta.nativeName}</span>
        </button>

        {!compact && (
          <div className="hidden sm:inline-flex items-center gap-0.5 pr-1">
            {POPULAR_LANGS.slice(0, 4).map((lang) => (
              <button
                key={lang.code}
                type="button"
                id={`${idPrefix}-pill-${lang.code}`}
                onClick={() => onSelectLanguage(lang.code)}
                className={`px-2 py-0.5 rounded-full font-medium transition-colors ${
                  currentLang === lang.code
                    ? "bg-blue-900 dark:bg-blue-600 text-white font-bold shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Show Original English Toggle */}
      {showOriginalToggle && currentLang !== "en" && onToggleOriginal && (
        <button
          type="button"
          id={`${idPrefix}-toggle-original`}
          onClick={onToggleOriginal}
          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full border transition-colors ${
            isShowingOriginal
              ? "bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-700"
              : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
          }`}
          title="Toggle between converted regional language and original English"
        >
          <ArrowRightLeft className="h-2.5 w-2.5" />
          <span>{isShowingOriginal ? "Original EN" : "Converted"}</span>
        </button>
      )}

      {/* Dropdown for all 13 Languages */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="absolute left-0 sm:right-0 top-full mt-1.5 w-64 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-in fade-in zoom-in-95 duration-100"
            id={`${idPrefix}-menu`}
          >
            <div className="px-2.5 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span>Convert to Language</span>
              <span className="text-[9px] text-blue-600 dark:text-blue-400">13 Official Languages</span>
            </div>
            <div className="max-h-56 overflow-y-auto py-1 space-y-0.5">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  id={`${idPrefix}-lang-opt-${lang.code}`}
                  onClick={() => {
                    onSelectLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                    currentLang === lang.code
                      ? "bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 font-bold"
                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <div>
                    <span className="font-semibold">{lang.nativeName}</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-400 ml-1.5">({lang.name})</span>
                  </div>
                  {currentLang === lang.code && (
                    <Check className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
