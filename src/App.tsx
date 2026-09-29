/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
  SupportedLanguage,
  UserInputState,
  FeasibilityReportData,
  FinancialPlanCalculation,
  StoredReportItem,
  GovernmentScheme,
  PartnerBank,
  UserProfile,
  SocialCategory
} from "./types";
import { translations } from "./data/translations";
import { businessCategories } from "./data/categories";
import { AVAILABLE_SCHEMES, PARTNER_BANKS } from "./data/schemesAndBanks";
import { calculateFinancialPlan, formatINR } from "./utils/calculator";
import { Header } from "./components/Header";
import { OnboardingForm } from "./components/OnboardingForm";
import { FeasibilityTab } from "./components/FeasibilityTab";
import { FinancialTab } from "./components/FinancialTab";
import { SavedReportsModal } from "./components/SavedReportsModal";
import { ReportDossierModal } from "./components/ReportDossierModal";
import { OnboardingTutorialModal } from "./components/OnboardingTutorialModal";
import { FeedbackCard } from "./components/FeedbackCard";
import { LoginModal } from "./components/LoginModal";
import { AiAssistantModal } from "./components/AiAssistantModal";
import {
  auth,
  onAuthStateChanged,
  getUserProfileFromFirestore,
  syncUserProfileToFirestore
} from "./lib/firebase";
import {
  FileText,
  Calculator,
  ArrowLeft,
  Share2,
  Download,
  Sparkles,
  MapPin,
  Bot,
  MessageSquare,
  Info
} from "lucide-react";

export default function App() {
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>("en");
  const [view, setView] = useState<"onboarding" | "dashboard">("onboarding");
  const [activeTab, setActiveTab] = useState<"feasibility" | "financial">("feasibility");
  const [isLoading, setIsLoading] = useState(false);

  // Dark Mode Theme State with local storage persistence and system preference detection
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("udyam_theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("udyam_theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("udyam_theme", "light");
      }
    } catch {
      // ignore
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // User Authentication profile state
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem("udyam_current_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Scheme and Bank Selection
  const [selectedScheme, setSelectedScheme] = useState<GovernmentScheme>(AVAILABLE_SCHEMES[0]);
  const [selectedBank, setSelectedBank] = useState<PartnerBank>(PARTNER_BANKS[0]);

  // User input state
  const [userInput, setUserInput] = useState<UserInputState>({
    location: "Baramati, Pune District, Maharashtra",
    state: "Maharashtra",
    district: "Pune",
    villageOrBlock: "Baramati",
    pinCode: "413102",
    marginCapital: 100000,
    businessCategory: "Dairy & Animal Husbandry",
    applicantName: "Ramesh Patil",
    phone: "9876543210"
  });

  // Feasibility Report Data
  const [feasibilityData, setFeasibilityData] = useState<FeasibilityReportData | null>(null);

  // Financial Plan Calculation
  const [financialPlan, setFinancialPlan] = useState<FinancialPlanCalculation>(() => {
    return calculateFinancialPlan(100000, undefined, AVAILABLE_SCHEMES[0].id, PARTNER_BANKS[0].id);
  });

  // Modal states
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isDossierModalOpen, setIsDossierModalOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [aiAssistantQuery, setAiAssistantQuery] = useState("");
  const [savedCount, setSavedCount] = useState(1);

  // Auto-prompt tutorial once for first-time visitors
  useEffect(() => {
    const seen = localStorage.getItem("udyam_tutorial_completed");
    if (!seen) {
      setIsTutorialOpen(true);
    }
  }, []);

  // Listen to Firebase Auth state changes and sync profile with Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        try {
          const profile = await getUserProfileFromFirestore(fbUser.uid);
          if (profile) {
            setCurrentUser(profile);
            localStorage.setItem("udyam_current_user", JSON.stringify(profile));
            if (profile.phone) {
              setUserInput((prev) => ({ ...prev, phone: profile.phone, applicantName: profile.name || prev.applicantName }));
            }
          } else {
            const newProfile: UserProfile = {
              id: fbUser.uid,
              name: fbUser.displayName || fbUser.email?.split("@")[0] || "Entrepreneur",
              email: fbUser.email || undefined,
              phone: fbUser.phoneNumber || "",
              role: "entrepreneur",
              isLoggedIn: true,
              avatarColor: "bg-blue-600"
            };
            setCurrentUser(newProfile);
            localStorage.setItem("udyam_current_user", JSON.stringify(newProfile));
            await syncUserProfileToFirestore(newProfile);
          }
        } catch (e) {
          console.warn("Error synchronizing profile from Firebase:", e);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const t = translations[currentLang];

  // Helper to re-calculate financial plan when margin, category, scheme or bank changes
  const updateFinancialPlan = (
    margin: number,
    categoryName?: string,
    schemeId?: string,
    bankId?: string,
    socialCat?: SocialCategory
  ) => {
    const matchedCategory = businessCategories.find(
      (c) => c.nameEn.toLowerCase() === (categoryName || userInput.businessCategory).toLowerCase()
    );
    const resolvedSocialCategory = socialCat !== undefined ? socialCat : userInput.socialCategory;
    const updated = calculateFinancialPlan(
      margin,
      matchedCategory,
      schemeId || selectedScheme.id,
      bankId || selectedBank.id,
      resolvedSocialCategory
    );
    setFinancialPlan(updated);
  };

  const handleSchemeSelect = (scheme: GovernmentScheme) => {
    setSelectedScheme(scheme);
    updateFinancialPlan(userInput.marginCapital, userInput.businessCategory, scheme.id, selectedBank.id, userInput.socialCategory);
  };

  const handleBankSelect = (bank: PartnerBank) => {
    setSelectedBank(bank);
    updateFinancialPlan(userInput.marginCapital, userInput.businessCategory, selectedScheme.id, bank.id, userInput.socialCategory);
  };

  const handleAskAiAboutScheme = (schemeName: string) => {
    setAiAssistantQuery(
      `Can you explain the subsidy rules, collateral requirements, and document checklist for ${schemeName}?`
    );
    setIsAiAssistantOpen(true);
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    localStorage.setItem("udyam_current_user", JSON.stringify(user));
    if (user.phone) {
      setUserInput((prev) => ({ ...prev, phone: user.phone, applicantName: user.name || prev.applicantName }));
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("udyam_current_user");
  };

  const handleFormSubmit = async (values: UserInputState) => {
    setUserInput(values);
    setIsLoading(true);

    // Update financial calculations immediately with selected social category (SC/ST/OBC gets 5% margin)
    updateFinancialPlan(
      values.marginCapital,
      values.businessCategory,
      selectedScheme.id,
      selectedBank.id,
      values.socialCategory
    );

    try {
      // Call backend API for NLP / Gemini Feasibility Report
      const res = await fetch("/api/feasibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location: values.location,
          businessCategory: values.businessCategory,
          marginCapital: values.marginCapital,
          language: currentLang
        })
      });

      const json = await res.json();
      if (json.success && json.data) {
        setFeasibilityData(json.data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.warn("Using built-in domain report fallback:", err);
      // Construct rich fallback report so user is never blocked
      const fallbackReport: FeasibilityReportData = {
        marketReach: {
          summary: `Strong daily liquid customer demand in ${values.location} connecting local village centers and daily haats.`,
          consumerBase: "15,000 - 24,000 consumers within 5–10 km radius",
          channels: ["Local Cooperative Mandi", "Direct Village Retail Points", "Weekly Haat Stalls", "WhatsApp Community Orders"]
        },
        opportunityAnalysis: {
          summary: "Value-added processing and hygienic local packaging unlock 30% higher margins than loose raw commodity trade.",
          niches: ["Locally branded packaged items", "Morning fresh subscription delivery", "Direct supply to local schools & dhabas"]
        },
        swot: {
          strengths: ["10% low margin money requirement under govt scheme", "Immediate daily cash flow turnaround", "Proximity to raw village inputs"],
          weaknesses: ["Cold storage / power backup vulnerability", "Working capital tied in seasonal inventory"],
          opportunities: ["Government interest subvention and back-ended capital subsidy", "Expansion into neighboring weekly haats"],
          threats: ["Pre-monsoon raw material inflation", "Customer credit ledger (udhaar) default risks"]
        },
        threatsIdentification: {
          summary: "Seasonal monsoon slumps and delayed payments from single buyers require active cash reserves.",
          risks: ["Power cuts requiring generator backup", "Seasonal demand swings during agricultural sowing months", "Supply chain transport delays"]
        },
        competitorMapping: {
          summary: `Moderate competition with 3-4 existing unorganized players in ${values.location} block; high room for organized hygiene.`,
          existingCount: 4,
          densityLevel: "Moderate (Room for Value-Add)",
          competitorInsights: "Existing operators sell loose unbranded goods. Packaged, clean products build instant household loyalty."
        },
        productMarketValue: {
          summary: "Recommended regional selling price delivers 22% - 30% net operating margin.",
          priceRange: "Competitive Village Retail Band",
          marginEstimate: "24% - 28% Net Operating Margin",
          benchmarkNote: `Calibrated for regional purchasing power in ${values.location}.`
        }
      };
      setFeasibilityData(fallbackReport);
    } finally {
      setIsLoading(false);
      setView("dashboard");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSelectSavedReport = (saved: StoredReportItem) => {
    setUserInput({
      location: saved.location,
      state: "",
      district: "",
      villageOrBlock: "",
      pinCode: "",
      marginCapital: saved.marginCapital,
      businessCategory: saved.businessCategory,
      applicantName: "",
      phone: saved.phone
    });
    setFeasibilityData(saved.reportData);
    updateFinancialPlan(saved.marginCapital, saved.businessCategory, selectedScheme.id, selectedBank.id);
    setView("dashboard");
  };

  const handleAdjustMargin = (newMargin: number) => {
    setUserInput((prev) => ({ ...prev, marginCapital: newMargin }));
    updateFinancialPlan(newMargin, userInput.businessCategory, selectedScheme.id, selectedBank.id, userInput.socialCategory);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans text-slate-900 dark:text-slate-100 transition-colors" id="udyam-app-root">
      {/* Official Government Portal Header with 13 Regional Languages */}
      <Header
        currentLang={currentLang}
        onLanguageChange={(lang) => setCurrentLang(lang)}
        onOpenSavedModal={() => setIsSavedModalOpen(true)}
        onOpenTutorial={() => setIsTutorialOpen(true)}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onOpenAiAssistant={() => {
          setAiAssistantQuery("");
          setIsAiAssistantOpen(true);
        }}
        onGoHome={() => {
          setView("onboarding");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        currentUser={currentUser}
        savedCount={savedCount}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {view === "onboarding" ? (
          <>
            {/* Quick Tutorial Onboarding Banner */}
            <div className="max-w-4xl mx-auto px-4 pt-4 -mb-2">
              <div className="bg-blue-50/90 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/80 rounded-2xl p-3 sm:px-4 sm:py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs transition-colors">
                <div className="flex items-center gap-2.5 text-blue-950 dark:text-blue-200 font-medium">
                  <span className="p-1 rounded-md bg-blue-900 text-amber-300 shrink-0">
                    <Info className="h-4 w-4" />
                  </span>
                  <span>
                    {currentLang === "hi"
                      ? "नये उद्यमी हैं? 1-मिनट की सचित्र मार्गदर्शिका देखें (पूंजी, ऋण, 8+ योजनाएं व रिपोर्ट)।"
                      : "New to Gram Vyapar? Take our 1-minute visual tutorial on margin money, schemes & bank reports."}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    id="banner-open-ai-btn"
                    onClick={() => {
                      setAiAssistantQuery("What business opportunities are supported under government subsidy schemes?");
                      setIsAiAssistantOpen(true);
                    }}
                    className="px-3 py-1 bg-amber-100 dark:bg-amber-900/60 hover:bg-amber-200 dark:hover:bg-amber-800 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700 rounded-full font-bold text-[11px] whitespace-nowrap transition-colors flex items-center gap-1"
                  >
                    <Sparkles className="h-3 w-3 text-amber-700 dark:text-amber-400" />
                    <span>Ask AI</span>
                  </button>
                  <button
                    type="button"
                    id="banner-open-tutorial-btn"
                    onClick={() => setIsTutorialOpen(true)}
                    className="px-3.5 py-1 bg-blue-900 hover:bg-blue-950 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-full font-bold text-[11px] whitespace-nowrap shadow-xs transition-colors"
                  >
                    {currentLang === "hi" ? "ट्यूटोरियल शुरू करें" : "Start Tour"}
                  </button>
                </div>
              </div>
            </div>

            <OnboardingForm
              currentLang={currentLang}
              initialValues={userInput}
              onSubmit={handleFormSubmit}
              isLoading={isLoading}
            />
          </>
        ) : (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6" id="dashboard-view">
            {/* Dashboard Top Action Navigation */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4 transition-colors">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  id="back-to-inputs-btn"
                  onClick={() => setView("onboarding")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors uppercase tracking-tight"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>{t.backToForm}</span>
                </button>

                <div>
                  <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight leading-tight">
                    {userInput.businessCategory}
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                    <span>{userInput.location}</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons: Ask AI + PDF Dossier + WhatsApp Share */}
              <div className="flex items-center flex-wrap gap-2">
                <button
                  type="button"
                  id="dashboard-ask-ai-btn"
                  onClick={() => {
                    setAiAssistantQuery(`I am starting ${userInput.businessCategory} with ₹${userInput.marginCapital.toLocaleString('en-IN')} margin in ${userInput.location}. What advice can you give?`);
                    setIsAiAssistantOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold rounded-full transition-colors shadow-2xs"
                >
                  <Sparkles className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Ask AI Assistant</span>
                </button>

                <button
                  type="button"
                  id="view-dossier-btn"
                  onClick={() => setIsDossierModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-bold rounded-full shadow-xs transition-colors uppercase tracking-tight"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>{t.downloadPdf}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsDossierModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-900 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold rounded-full transition-colors uppercase tracking-tight"
                >
                  <Share2 className="h-3.5 w-3.5 text-blue-800 dark:text-blue-400" />
                  <span className="hidden sm:inline">{t.shareWhatsApp}</span>
                </button>
              </div>
            </div>

            {/* Prominent Two-Tab Navigation in Geometric Balance Pill Form */}
            <div className="flex bg-slate-200/90 dark:bg-slate-800 p-1.5 rounded-full mb-6 max-w-md mx-auto shadow-inner" id="dashboard-tabs">
              <button
                type="button"
                id="tab-btn-feasibility"
                onClick={() => setActiveTab("feasibility")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs sm:text-sm font-bold transition-all uppercase tracking-tight ${
                  activeTab === "feasibility"
                    ? "bg-blue-900 dark:bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>{t.tabFeasibility}</span>
              </button>

              <button
                type="button"
                id="tab-btn-financial"
                onClick={() => setActiveTab("financial")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs sm:text-sm font-bold transition-all uppercase tracking-tight ${
                  activeTab === "financial"
                    ? "bg-blue-900 dark:bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Calculator className="h-4 w-4" />
                <span>{t.tabFinancial}</span>
              </button>
            </div>

            {/* Tab 1: Feasibility Report */}
            {activeTab === "feasibility" && feasibilityData && (
              <FeasibilityTab
                data={feasibilityData}
                location={userInput.location}
                businessCategory={userInput.businessCategory}
                currentLang={currentLang}
              />
            )}

            {/* Tab 2: Financial Plan with Multiple Scheme & Bank Selection */}
            {activeTab === "financial" && (
              <FinancialTab
                plan={financialPlan}
                currentLang={currentLang}
                onAdjustMargin={handleAdjustMargin}
                selectedScheme={selectedScheme}
                selectedBank={selectedBank}
                onSelectScheme={handleSchemeSelect}
                onSelectBank={handleBankSelect}
                onAskAiAboutScheme={handleAskAiAboutScheme}
              />
            )}

            {/* Non-intrusive Post-Report User Feedback System */}
            <FeedbackCard
              currentLang={currentLang}
              businessCategory={userInput.businessCategory}
              location={userInput.location}
              marginCapital={userInput.marginCapital}
            />
          </div>
        )}
      </main>

      {/* Floating 24/7 AI Assistant Widget Button */}
      <div className="fixed bottom-5 right-5 z-40" id="floating-ai-widget">
        <button
          type="button"
          id="floating-ai-btn"
          onClick={() => {
            setAiAssistantQuery("");
            setIsAiAssistantOpen(true);
          }}
          className="group flex items-center gap-2.5 px-4 py-3 bg-blue-900 hover:bg-blue-950 text-white rounded-full shadow-2xl border-2 border-amber-400 hover:scale-105 transition-all"
        >
          <div className="relative">
            <Bot className="h-5 w-5 text-amber-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full" />
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-black uppercase tracking-tight leading-none text-white">
              Gram Vyapar AI
            </p>
            <p className="text-[9px] text-amber-200 font-semibold mt-0.5">
              Ask Schemes & Subsidies
            </p>
          </div>
        </button>
      </div>

      {/* Footer in Geometric Balance theme */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 text-center text-xs text-slate-500 dark:text-slate-400 transition-colors" id="portal-footer">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="w-2 h-2 bg-blue-600 rounded-full" />
            <p className="font-bold uppercase tracking-wider text-slate-900 dark:text-white text-xs">
              ग्राम व्यापार (Gram Vyapar)
            </p>
            <span className="w-2 h-2 bg-blue-600 rounded-full" />
          </div>
          <p className="font-medium text-slate-600 dark:text-slate-300">
            Hyper-Local AI Business Advisory & Smart Government Scheme Calculator
          </p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            Available in 13 Indian Languages • 8+ Government Schemes • 6 Partner Banks • AI Grounded MSME Guidance
          </p>
        </div>
      </footer>

      {/* Step-by-Step Onboarding Tutorial Walkthrough Modal */}
      <OnboardingTutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
      />

      {/* Saved Reports Lookup Modal */}
      <SavedReportsModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        onSelectReport={handleSelectSavedReport}
        currentLang={currentLang}
      />

      {/* User Login / Register Interface Modal (Required Before Use) */}
      <LoginModal
        isOpen={isLoginModalOpen || !currentUser?.isLoggedIn}
        onClose={() => setIsLoginModalOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
        currentLang={currentLang}
        requireAuthBeforeUse={!currentUser?.isLoggedIn}
      />

      {/* Interactive AI Assistant Modal */}
      <AiAssistantModal
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        currentLang={currentLang}
        initialQuery={aiAssistantQuery}
        context={{
          location: userInput.location,
          businessCategory: userInput.businessCategory,
          marginCapital: userInput.marginCapital,
          projectCost: financialPlan.totalProjectCost,
          selectedScheme: selectedScheme.name,
          selectedBank: selectedBank.name
        }}
      />

      {/* Official Bank Dossier & PDF Export Modal */}
      {feasibilityData && (
        <ReportDossierModal
          isOpen={isDossierModalOpen}
          onClose={() => setIsDossierModalOpen(false)}
          userInput={userInput}
          feasibility={feasibilityData}
          financialPlan={financialPlan}
          currentLang={currentLang}
          onReportSaved={() => setSavedCount((c) => c + 1)}
        />
      )}
    </div>
  );
}
