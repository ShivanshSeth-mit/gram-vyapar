import React, { useState, useRef, useEffect } from "react";
import { SupportedLanguage, UserProfile, SUPPORTED_LANGUAGES } from "../types";
import { translations } from "../data/translations";
import {
  Landmark,
  Languages,
  FolderDown,
  ShieldCheck,
  HelpCircle,
  Sparkles,
  User,
  ChevronDown,
  Check,
  Moon,
  Sun
} from "lucide-react";

interface HeaderProps {
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onOpenSavedModal: () => void;
  onOpenTutorial: () => void;
  onOpenLoginModal: () => void;
  onOpenAiAssistant: () => void;
  onGoHome?: () => void;
  currentUser: UserProfile | null;
  savedCount?: number;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  onOpenSavedModal,
  onOpenTutorial,
  onOpenLoginModal,
  onOpenAiAssistant,
  onGoHome,
  currentUser,
  savedCount = 0,
  isDarkMode = false,
  onToggleDarkMode
}) => {
  const t = translations[currentLang];
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeLangMeta = SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 bg-blue-900 text-white border-b border-blue-800 shadow-lg" id="main-header">
      {/* Geometric accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-green-500 to-amber-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Portal Emblem & Title - Geometric Balance */}
        <div className="flex items-center gap-3">
          <div
            onClick={onGoHome}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onGoHome?.();
              }
            }}
            title={currentLang === "hi" ? "होम पेज पर जाएं" : "Go to Home page"}
            aria-label="Gram Vyapar Home"
            className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md shrink-0 cursor-pointer hover:scale-105 active:scale-95 hover:bg-slate-50 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <div className="w-5 h-5 border-[3.5px] border-blue-900 rounded-xs rotate-45 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-blue-900 rounded-xs" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1
                id="portal-header-title"
                onClick={onGoHome}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onGoHome?.();
                  }
                }}
                title={currentLang === "hi" ? "होम पेज पर जाएं" : "Go to Home page"}
                className="text-lg sm:text-xl font-bold tracking-tight uppercase leading-none text-white cursor-pointer hover:text-amber-300 transition-colors select-none focus:outline-none focus:ring-1 focus:ring-amber-400 rounded-xs"
              >
                {t.portalTitle}
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-blue-800 text-blue-200 border border-blue-700">
                <ShieldCheck className="h-3 w-3 text-green-400" />
                AI Advisory
              </span>
            </div>
            <p className="text-[10px] text-blue-200 uppercase tracking-widest mt-1 font-medium">
              MSME AI Advisory Platform • {t.tagline}
            </p>
          </div>
        </div>

        {/* Right action controls: Language Switcher + AI Assistant + Guide + User / Login */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-2.5">
          {/* 13 Regional Languages Dropdown */}
          <div className="relative" ref={dropdownRef} id="lang-dropdown-wrapper">
            <button
              type="button"
              id="lang-dropdown-trigger"
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-800/90 hover:bg-blue-800 text-white rounded-full border border-blue-700 text-xs font-semibold shadow-xs transition-colors"
              title="Change Portal Language (13 Regional Languages)"
            >
              <Languages className="h-3.5 w-3.5 text-blue-300" />
              <span className="font-bold">{activeLangMeta.nativeName}</span>
              <span className="text-[10px] text-blue-300 hidden md:inline">({activeLangMeta.name})</span>
              <ChevronDown className="h-3 w-3 text-blue-300 ml-0.5" />
            </button>

            {isLangDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-64 max-h-80 overflow-y-auto bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 text-slate-800 animate-in fade-in zoom-in-95 duration-150"
                id="lang-dropdown-menu"
              >
                <div className="px-3.5 py-1.5 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Select Language (13 Languages)
                </div>
                <div className="divide-y divide-slate-50">
                  {SUPPORTED_LANGUAGES.map((lang) => {
                    const isSelected = currentLang === lang.code;
                    return (
                      <button
                        key={lang.code}
                        id={`lang-select-${lang.code}`}
                        type="button"
                        onClick={() => {
                          onLanguageChange(lang.code);
                          setIsLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-blue-50 transition-colors ${
                          isSelected ? "bg-blue-50/80 font-bold text-blue-900" : "text-slate-700"
                        }`}
                      >
                        <div>
                          <p className="font-bold text-slate-900 leading-tight">
                            {lang.nativeName}
                          </p>
                          <p className="text-[10px] text-slate-500">
                            {lang.name} • {lang.region}
                          </p>
                        </div>
                        {isSelected && <Check className="h-3.5 w-3.5 text-blue-900" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* AI Assistant Quick Trigger Button in Header */}
          <button
            type="button"
            id="header-ai-chat-btn"
            onClick={onOpenAiAssistant}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-amber-300 bg-blue-800/90 hover:bg-blue-800 rounded-full border border-amber-500/40 transition-colors shadow-xs"
            title="Ask Udyam AI Assistant"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span className="hidden sm:inline">AI Advisor</span>
          </button>

          {/* Step-by-step Tutorial Walkthrough Button */}
          <button
            type="button"
            id="open-tutorial-btn"
            onClick={onOpenTutorial}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-800/90 hover:bg-blue-800 rounded-full border border-blue-700 transition-colors shadow-xs"
            title="Interactive App Tutorial"
          >
            <HelpCircle className="h-3.5 w-3.5 text-blue-300" />
            <span className="hidden sm:inline">Guide</span>
          </button>

          {/* Saved Reports Lookup Button */}
          <button
            id="saved-reports-btn"
            onClick={onOpenSavedModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-800/90 hover:bg-blue-800 rounded-full border border-blue-700 transition-colors shadow-xs"
            title="Access Saved Dossiers"
          >
            <FolderDown className="h-3.5 w-3.5 text-blue-300" />
            <span className="hidden md:inline">{t.searchSaved}</span>
            {savedCount > 0 && (
              <span className="bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {savedCount}
              </span>
            )}
          </button>

          {/* Dark / Light Mode Toggle Button */}
          {onToggleDarkMode && (
            <button
              type="button"
              id="theme-toggle-btn"
              onClick={onToggleDarkMode}
              className="flex items-center justify-center w-8 h-8 text-white bg-blue-800/90 hover:bg-blue-800 rounded-full border border-blue-700 transition-colors shadow-xs"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="h-4 w-4 text-amber-300" /> : <Moon className="h-4 w-4 text-blue-200" />}
            </button>
          )}

          {/* User Profile / Login Interface Trigger */}
          <button
            type="button"
            id="header-login-btn"
            onClick={onOpenLoginModal}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-full transition-all shadow-xs ${
              currentUser?.isLoggedIn
                ? "bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400"
                : "bg-white hover:bg-slate-100 text-blue-900 border border-white"
            }`}
          >
            <User className="h-3.5 w-3.5" />
            <span>
              {currentUser?.isLoggedIn
                ? currentUser.name.split(" ")[0]
                : t.loginTitle || "Sign In"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
