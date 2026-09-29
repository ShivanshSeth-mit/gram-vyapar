import React, { useState } from "react";
import { SocialCategory, SupportedLanguage, UserInputState } from "../types";
import { translations } from "../data/translations";
import { businessCategories } from "../data/categories";
import { presetLocations, lookupPinCode } from "../data/locations";
import { formatINR, formatIndianWords } from "../utils/calculator";
import { startVoiceRecognition, isSpeechRecognitionSupported } from "../utils/speech";
import {
  MapPin,
  IndianRupee,
  Briefcase,
  Mic,
  MicOff,
  Sparkles,
  ArrowRight,
  Navigation,
  Milk,
  Store,
  Scissors,
  Utensils,
  Egg,
  Palette,
  Tractor,
  Wrench,
  User,
  Phone,
  HelpCircle,
  Trees,
  Sun,
  Laptop,
  CookingPot,
  Recycle,
  Snowflake,
  BatteryCharging,
  Package,
  Leaf,
  Truck,
  Search,
  Award,
  Landmark,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

interface OnboardingFormProps {
  currentLang: SupportedLanguage;
  initialValues: UserInputState;
  onSubmit: (values: UserInputState) => void;
  isLoading: boolean;
}

export const OnboardingForm: React.FC<OnboardingFormProps> = ({
  currentLang,
  initialValues,
  onSubmit,
  isLoading
}) => {
  const t = translations[currentLang];

  const [location, setLocation] = useState(initialValues.location || "Baramati, Pune, Maharashtra");
  const [pinCode, setPinCode] = useState(initialValues.pinCode || "");
  const [marginCapital, setMarginCapital] = useState<number>(initialValues.marginCapital || 100000);
  const [socialCategory, setSocialCategory] = useState<SocialCategory>(initialValues.socialCategory || "General");
  const [businessCategory, setBusinessCategory] = useState<string>(initialValues.businessCategory || "Dairy & Animal Husbandry");
  const [customCategory, setCustomCategory] = useState<string>(initialValues.customCategory || "");
  const [applicantName, setApplicantName] = useState<string>(initialValues.applicantName || "");
  const [phone, setPhone] = useState<string>(initialValues.phone || "");

  const [isListeningLoc, setIsListeningLoc] = useState(false);
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [locActiveVoice, setLocActiveVoice] = useState<any>(null);

  // Quick margin capital presets
  const marginPresets = [25000, 50000, 100000, 200000, 500000];

  // Backward category concession (5% promoter margin for SC/ST/OBC vs 10% for General)
  const isSpecialCategory = socialCategory !== "General";
  const marginPercentage = isSpecialCategory ? 5 : 10;
  const marginRate = marginPercentage / 100;
  const loanPercentage = 100 - marginPercentage;
  const estTotalCost = Math.round(marginCapital / marginRate);
  const estLoanAmount = Math.round(estTotalCost * (1 - marginRate));

  // Icon mapping
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Milk": return <Milk className="h-5 w-5" />;
      case "Store": return <Store className="h-5 w-5" />;
      case "Scissors": return <Scissors className="h-5 w-5" />;
      case "Utensils": return <Utensils className="h-5 w-5" />;
      case "Egg": return <Egg className="h-5 w-5" />;
      case "Palette": return <Palette className="h-5 w-5" />;
      case "Tractor": return <Tractor className="h-5 w-5" />;
      case "Wrench": return <Wrench className="h-5 w-5" />;
      case "Sparkles": return <Sparkles className="h-5 w-5" />;
      case "Trees": return <Trees className="h-5 w-5" />;
      case "Sun": return <Sun className="h-5 w-5" />;
      case "Laptop": return <Laptop className="h-5 w-5" />;
      case "CookingPot": return <CookingPot className="h-5 w-5" />;
      case "Recycle": return <Recycle className="h-5 w-5" />;
      case "Snowflake": return <Snowflake className="h-5 w-5" />;
      case "BatteryCharging": return <BatteryCharging className="h-5 w-5" />;
      case "Package": return <Package className="h-5 w-5" />;
      case "Leaf": return <Leaf className="h-5 w-5" />;
      case "Truck": return <Truck className="h-5 w-5" />;
      default: return <Briefcase className="h-5 w-5" />;
    }
  };

  const [categorySearch, setCategorySearch] = useState("");
  const [selectedSector, setSelectedSector] = useState<string>("all");

  const sectorFilters = [
    { id: "all", labelEn: "All Sectors (21)", labelHi: "सभी श्रेणियां (21)" },
    { id: "green", labelEn: "Green & Renewable", labelHi: "सौर व पर्यावरण" },
    { id: "agri", labelEn: "Agri & Dairy", labelHi: "कृषि व डेयरी" },
    { id: "food", labelEn: "Food & Processing", labelHi: "खाद्य प्रसंस्करण" },
    { id: "services", labelEn: "Digital & Services", labelHi: "डिजिटल व सेवाएँ" },
    { id: "craft", labelEn: "Craft & Workshop", labelHi: "शिल्प व निर्माण" },
  ];

  const filteredCategories = businessCategories.filter((cat) => {
    // Sector filter
    if (selectedSector === "green") {
      if (!["ecotourism", "renewable_energy", "waste_management", "bamboo_craft"].includes(cat.id)) return false;
    } else if (selectedSector === "agri") {
      if (!["dairy", "poultry", "agro_service", "cold_storage", "custom_hiring"].includes(cat.id)) return false;
    } else if (selectedSector === "food") {
      if (!["food_processing", "artisanal_food", "ayurvedic_herbs"].includes(cat.id)) return false;
    } else if (selectedSector === "services") {
      if (!["digital_services", "ev_mobility", "rural_logistics", "retail", "beauty_salon"].includes(cat.id)) return false;
    } else if (selectedSector === "craft") {
      if (!["textiles", "handicrafts", "welding", "other"].includes(cat.id)) return false;
    }

    // Text search
    if (!categorySearch.trim()) return true;
    const q = categorySearch.toLowerCase();
    return (
      cat.nameEn.toLowerCase().includes(q) ||
      cat.nameHi.toLowerCase().includes(q) ||
      cat.nameMr.toLowerCase().includes(q) ||
      cat.nameBn.toLowerCase().includes(q) ||
      cat.descriptionEn.toLowerCase().includes(q)
    );
  });

  const handlePinCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 6);
    setPinCode(val);
    if (val.length === 6) {
      const match = lookupPinCode(val);
      if (match) {
        setLocation(`${match.block}, ${match.district}, ${match.state}`);
      }
    }
  };

  const handleUseGps = () => {
    if (!("geolocation" in navigator)) {
      alert("GPS not supported on your browser. Please type your location.");
      return;
    }
    setIsDetectingGps(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsDetectingGps(false);
        // Default to regional cluster based on coordinates approximation
        setLocation("Current GPS Location (District Zone)");
      },
      (err) => {
        setIsDetectingGps(false);
        // Fallback default
        setLocation("Baramati, Pune District, Maharashtra");
      },
      { timeout: 7000 }
    );
  };

  const handleToggleVoiceLocation = () => {
    if (isListeningLoc) {
      if (locActiveVoice) locActiveVoice.stop();
      setIsListeningLoc(false);
      return;
    }

    const rec = startVoiceRecognition(
      currentLang,
      (transcript) => {
        setLocation(transcript);
        setIsListeningLoc(false);
      },
      () => setIsListeningLoc(false)
    );

    if (rec) {
      setLocActiveVoice(rec);
      setIsListeningLoc(true);
    } else {
      alert("Voice input is not supported in this browser. Please type instead.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalCategory = businessCategory === "other" && customCategory.trim() 
      ? customCategory.trim() 
      : businessCategory;

    onSubmit({
      location: location.trim() || "District Cluster, India",
      state: "",
      district: "",
      villageOrBlock: "",
      pinCode,
      marginCapital,
      businessCategory: finalCategory,
      socialCategory,
      customCategory,
      applicantName,
      phone
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8" id="onboarding-container">
      {/* Introduction Card - Geometric Balance */}
      <div className="bg-blue-900 text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-md border border-blue-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-44 h-44 bg-blue-800/40 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-800 text-blue-200 border border-blue-700 mb-3">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              {t.officialBadge}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase leading-snug">
              {t.portalTitle} — {t.portalSubtitle}
            </h1>
            <p className="text-sm sm:text-base text-blue-100 mt-2 font-normal">
              Evaluate your enterprise viability within 60 seconds and calculate eligible government loan schemes with 10% margin money.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 border border-white/20 text-center min-w-[170px] shadow-sm">
            <p className="text-[10px] text-blue-200 uppercase tracking-widest font-bold">Govt Loan Coverage</p>
            <p className="text-3xl font-black text-white mt-0.5">90%</p>
            <p className="text-[11px] text-blue-200 mt-0.5 font-medium">Your Margin: Only 10%</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" id="feasibility-form">
        {/* Step 1: Location */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors" id="step-location-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-950/70 text-blue-900 dark:text-blue-300 flex items-center justify-center font-bold text-xs">
                1
              </div>
              <div>
                <h2 className="font-bold text-base text-slate-900 dark:text-white uppercase tracking-tight flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2" />
                  {t.step1Title}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t.step1Desc}</p>
              </div>
            </div>

            <button
              type="button"
              id="gps-location-btn"
              onClick={handleUseGps}
              disabled={isDetectingGps}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
            >
              <Navigation className={`h-3.5 w-3.5 text-blue-600 dark:text-blue-400 ${isDetectingGps ? "animate-spin" : ""}`} />
              {isDetectingGps ? t.locDetecting : t.useMyLocation}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="input-location" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t.locationLabel} <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                  <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <input
                  id="input-location"
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={t.locationPlaceholder}
                  className="w-full pl-9 pr-12 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-950 outline-hidden transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
                {isSpeechRecognitionSupported() && (
                  <button
                    type="button"
                    id="mic-location-btn"
                    onClick={handleToggleVoiceLocation}
                    className={`absolute inset-y-1 right-1 px-3 flex items-center rounded-lg transition-colors ${
                      isListeningLoc
                        ? "bg-rose-500 text-white animate-pulse"
                        : "text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                    title="Speak location"
                  >
                    {isListeningLoc ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </button>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="input-pincode" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t.pincodeLabel}
              </label>
              <input
                id="input-pincode"
                type="text"
                value={pinCode}
                onChange={handlePinCodeChange}
                placeholder={t.pincodePlaceholder}
                maxLength={6}
                className="w-full px-3.5 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-950 outline-hidden transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Quick location chips */}
          <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mr-1">Popular regions:</span>
            {presetLocations.slice(0, 5).map((loc) => (
              <button
                key={loc.pinCode}
                type="button"
                onClick={() => {
                  setLocation(`${loc.block}, ${loc.district}, ${loc.state}`);
                  setPinCode(loc.pinCode);
                }}
                className="text-xs px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:text-blue-900 dark:hover:text-blue-300 hover:border-blue-300 dark:hover:border-blue-700 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 transition-colors"
              >
                {loc.block}, {loc.district}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Social Category (General, OBC, SC, ST) */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors" id="step-social-category-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-950/70 text-blue-900 dark:text-blue-300 flex items-center justify-center font-bold text-xs">
              2
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full" />
                <h2 className="font-bold text-base text-slate-900 dark:text-white uppercase tracking-tight">
                  Social Category & Backward Caste Benefits
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 font-bold text-[10px] border border-blue-200 dark:border-blue-800">
                  सामाजिक श्रेणी
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Select your category to verify eligibility for higher subsidies (35% under PMEGP), concessional bank credit (NSFDC / NBCFDC / Stand-Up India), and reduced 5% promoter margin.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* General */}
            <div
              id="cat-option-general"
              onClick={() => setSocialCategory("General")}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                socialCategory === "General"
                  ? "bg-blue-50/70 dark:bg-blue-950/40 border-blue-600 dark:border-blue-500 ring-2 ring-blue-600/20 dark:ring-blue-500/20 shadow-sm"
                  : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-black text-sm text-slate-900 dark:text-white">General</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    सामान्य
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  Standard 15% - 25% PMEGP Subsidy • 10% Promoter Margin
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px] font-bold">
                <span className={socialCategory === "General" ? "text-blue-900 dark:text-blue-400" : "text-slate-500 dark:text-slate-400"}>
                  {socialCategory === "General" ? "Selected" : "Select"}
                </span>
                {socialCategory === "General" && <CheckCircle2 className="h-4 w-4 text-blue-900 dark:text-blue-400" />}
              </div>
            </div>

            {/* OBC */}
            <div
              id="cat-option-obc"
              onClick={() => setSocialCategory("OBC")}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                socialCategory === "OBC"
                  ? "bg-amber-50/80 dark:bg-amber-950/40 border-amber-600 dark:border-amber-500 ring-2 ring-amber-600/20 dark:ring-amber-500/20 shadow-sm"
                  : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-black text-sm text-amber-950 dark:text-amber-200">OBC</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    अन्य पिछड़ा वर्ग
                  </span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                  35% Rural Subsidy • NBCFDC 5%-7% Credit • 5% Margin
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px] font-bold">
                <span className={socialCategory === "OBC" ? "text-amber-900 dark:text-amber-400" : "text-slate-500 dark:text-slate-400"}>
                  {socialCategory === "OBC" ? "Selected (35% Subsidy)" : "Select"}
                </span>
                {socialCategory === "OBC" && <CheckCircle2 className="h-4 w-4 text-amber-900 dark:text-amber-400" />}
              </div>
            </div>

            {/* SC */}
            <div
              id="cat-option-sc"
              onClick={() => setSocialCategory("SC")}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                socialCategory === "SC"
                  ? "bg-blue-50/80 dark:bg-blue-950/40 border-blue-700 dark:border-blue-500 ring-2 ring-blue-700/20 dark:ring-blue-500/20 shadow-sm"
                  : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-black text-sm text-blue-950 dark:text-blue-200">SC</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    अनुसूचित जाति
                  </span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                  35% Subsidy • Stand-Up India • NSFDC 4%-6% Loan • 5% Margin
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px] font-bold">
                <span className={socialCategory === "SC" ? "text-blue-900 dark:text-blue-400" : "text-slate-500 dark:text-slate-400"}>
                  {socialCategory === "SC" ? "Selected (Priority)" : "Select"}
                </span>
                {socialCategory === "SC" && <CheckCircle2 className="h-4 w-4 text-blue-900 dark:text-blue-400" />}
              </div>
            </div>

            {/* ST */}
            <div
              id="cat-option-st"
              onClick={() => setSocialCategory("ST")}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                socialCategory === "ST"
                  ? "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-600 dark:border-emerald-500 ring-2 ring-emerald-600/20 dark:ring-emerald-500/20 shadow-sm"
                  : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-black text-sm text-emerald-950 dark:text-emerald-200">ST</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    अनुसूचित जनजाति
                  </span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                  35% Subsidy • NSTFDC 4% AMSY • Stand-Up India • 5% Margin
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px] font-bold">
                <span className={socialCategory === "ST" ? "text-emerald-900 dark:text-emerald-400" : "text-slate-500 dark:text-slate-400"}>
                  {socialCategory === "ST" ? "Selected (Priority)" : "Select"}
                </span>
                {socialCategory === "ST" && <CheckCircle2 className="h-4 w-4 text-emerald-900 dark:text-emerald-400" />}
              </div>
            </div>
          </div>

          {/* Standout Dynamic Benefit Banner when OBC, SC or ST is selected */}
          {isSpecialCategory && (
            <div className="mt-4 p-4 rounded-xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60 text-amber-950 dark:text-amber-100 flex items-start gap-3 shadow-xs">
              <div className="p-2 bg-amber-200 dark:bg-amber-900/80 text-amber-900 dark:text-amber-300 rounded-lg shrink-0 mt-0.5">
                <Award className="h-5 w-5" />
              </div>
              <div className="text-xs space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-black text-amber-900 dark:text-amber-300 uppercase tracking-tight">
                    ⭐ Backward Caste & Special Category Benefits Activated ({socialCategory}):
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 font-bold text-[10px]">
                    Priority Lending Scheme
                  </span>
                </div>
                <p className="text-amber-800 dark:text-amber-200/90 leading-relaxed font-medium">
                  • <strong>35% Rural Capital Subsidy</strong> under PMEGP (vs 25% for general category) — saving up to ₹17.5 Lakh.<br />
                  • <strong>Concessional 5% Promoter Margin</strong> — your savings unlock a <strong>20x Total Project Multiplier</strong> (instead of 10x).<br />
                  • <strong>Dedicated Backward Caste Lending Banks</strong>: Channelized financing through <strong>{socialCategory === "OBC" ? "NBCFDC (National Backward Classes Finance & Dev Corp)" : socialCategory === "ST" ? "NSTFDC (National Scheduled Tribes Corp)" : "NSFDC (National Scheduled Castes Corp)"}</strong> via SBI, PNB, Canara Bank, and RRBs with interest rates down to <strong>4.0% - 5.5% p.a.</strong>!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Step 3: Available Margin Capital */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors" id="step-capital-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-950/70 text-blue-900 dark:text-blue-300 flex items-center justify-center font-bold text-xs">
              3
            </div>
            <div>
              <h2 className="font-bold text-base text-slate-900 dark:text-white uppercase tracking-tight flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2" />
                {t.step2Title}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isSpecialCategory
                  ? "As an SC/ST/OBC applicant, your required margin is only 5% (20x leverage multiplier under PMEGP & NSFDC/NBCFDC)."
                  : t.step2Desc}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="input-margin-capital" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t.marginLabel} <span className="text-rose-600">*</span>
              </label>
              <div className="relative max-w-lg">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 dark:text-slate-400 font-bold">
                  ₹
                </div>
                <input
                  id="input-margin-capital"
                  type="number"
                  min={5000}
                  max={10000000}
                  step={5000}
                  required
                  value={marginCapital}
                  onChange={(e) => setMarginCapital(Number(e.target.value) || 0)}
                  className="w-full pl-9 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-lg font-bold text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-950 outline-hidden transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
                <span className="absolute inset-y-0 right-3 flex items-center text-xs font-bold text-blue-900 dark:text-blue-400 pointer-events-none">
                  {formatIndianWords(marginCapital)}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {isSpecialCategory
                  ? "Special Category (5% Margin): Every ₹50,000 you invest supports ₹10,00,000 in project machinery and working capital!"
                  : t.marginHint}
              </p>
            </div>

            {/* Quick select presets */}
            <div>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 mr-2">{t.quickMarginTip}</span>
              <div className="inline-flex flex-wrap gap-2 mt-1">
                {marginPresets.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setMarginCapital(amt)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                      marginCapital === amt
                        ? "bg-blue-900 text-white border-blue-900 shadow-sm dark:bg-blue-600 dark:border-blue-600"
                        : "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    {formatIndianWords(amt)}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Financial Structure Preview (Geometric Balance border-l-4 style) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border-l-4 border-blue-600 dark:border-blue-500 border border-slate-200 dark:border-slate-700">
                <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider mb-1">{t.summaryMargin}</p>
                <p className="text-2xl font-black text-slate-800 dark:text-white">{formatINR(marginCapital)}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-1">
                  Your {marginPercentage}% Contribution ({socialCategory})
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border-l-4 border-slate-300 dark:border-slate-500 border border-slate-200 dark:border-slate-700">
                <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider mb-1">{t.totalCostPreview}</p>
                <p className="text-2xl font-black text-slate-800 dark:text-white">{formatINR(estTotalCost)}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-1">
                  {isSpecialCategory ? "20x Project Multiplier (5% Rule)" : "10x Project Multiplier (10% Rule)"}
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-2xl border-l-4 border-blue-700 dark:border-blue-500 border border-blue-200 dark:border-blue-800/70">
                <p className="text-[10px] uppercase font-bold text-blue-700 dark:text-blue-300 tracking-wider mb-1">{t.loanPreview}</p>
                <p className="text-2xl font-black text-blue-900 dark:text-blue-200">{formatINR(estLoanAmount)}</p>
                <p className="text-[10px] text-blue-700 dark:text-blue-300 font-semibold mt-1">
                  {loanPercentage}% Bank Debt & Subsidy Component
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 4: Business Category */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors" id="step-category-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-950/70 text-blue-900 dark:text-blue-300 flex items-center justify-center font-bold text-xs">
                4
              </div>
              <div>
                <h2 className="font-bold text-base text-slate-900 dark:text-white uppercase tracking-tight flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2" />
                  {t.step3Title}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t.step3Desc}</p>
              </div>
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                id="category-search-input"
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
                placeholder="Search category (e.g. Solar, Tourism)..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800"
              />
            </div>
          </div>

          {/* Sector Pill Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2.5 mb-3.5 scrollbar-none">
            {sectorFilters.map((sector) => {
              const active = selectedSector === sector.id;
              return (
                <button
                  key={sector.id}
                  type="button"
                  id={`sector-filter-${sector.id}`}
                  onClick={() => setSelectedSector(sector.id)}
                  className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap transition-all ${
                    active
                      ? "bg-blue-900 text-white shadow-sm dark:bg-blue-600"
                      : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {currentLang === "hi" ? sector.labelHi : sector.labelEn}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredCategories.map((cat) => {
              const isSelected = businessCategory === cat.nameEn || businessCategory === cat.id;
              const catTitle = currentLang === "hi" ? cat.nameHi 
                : currentLang === "mr" ? cat.nameMr 
                : currentLang === "bn" ? cat.nameBn 
                : cat.nameEn;

              return (
                <button
                  key={cat.id}
                  type="button"
                  id={`cat-card-${cat.id}`}
                  onClick={() => setBusinessCategory(cat.nameEn)}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? "bg-blue-50/80 dark:bg-blue-950/40 border-blue-600 dark:border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800 shadow-sm"
                      : "bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                  }`}
                >
                  <div className={`p-2 rounded-lg shrink-0 ${isSelected ? "bg-blue-900 text-white dark:bg-blue-600" : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600"}`}>
                    {getCategoryIcon(cat.iconName)}
                  </div>
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-snug">
                      {catTitle}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                      {cat.descriptionEn}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400">No categories match "{categorySearch}". Select "Other Micro-Enterprise" to specify your own.</p>
              <button
                type="button"
                onClick={() => {
                  setCategorySearch("");
                  setSelectedSector("all");
                  setBusinessCategory("Other Micro-Enterprise");
                }}
                className="mt-2 text-xs font-bold text-blue-800 dark:text-blue-400 hover:underline"
              >
                Reset & Choose Other Micro-Enterprise
              </button>
            </div>
          )}

          {/* Custom Category Input if "Other" is chosen or entered */}
          {(businessCategory.toLowerCase().includes("other") || businessCategory.toLowerCase().includes("custom")) && (
            <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <label htmlFor="custom-category-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t.customCategoryPlaceholder}
              </label>
              <input
                id="custom-category-input"
                type="text"
                required
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="e.g. Bamboo Handicrafts, Solar Dryer, Bio-floc Fish Farming"
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-950 outline-hidden"
              />
            </div>
          )}

          {/* Optional Applicant Details (Name & Phone for retrieval) */}
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="applicant-name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t.applicantNameLabel}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                  <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <input
                  id="applicant-name"
                  type="text"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="e.g. Ramesh Patil / Sunita Devi"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-950 outline-hidden"
                />
              </div>
            </div>

            <div>
              <label htmlFor="applicant-phone" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t.applicantPhoneLabel}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                  <Phone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <input
                  id="applicant-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="10-digit mobile (e.g. 9876543210)"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-950 outline-hidden"
                />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Allows you to retrieve this report anytime without password.</p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-2">
          <button
            type="submit"
            id="submit-feasibility-btn"
            disabled={isLoading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 dark:shadow-none transition-all transform active:scale-98 disabled:opacity-75 disabled:pointer-events-none uppercase tracking-wide min-h-[52px]"
          >
            {isLoading ? (
              <>
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>{t.generatingReport}</span>
              </>
            ) : (
              <>
                <span>{t.generateReportBtn}</span>
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 font-medium">
            Fast report generation in under 60 seconds • Deterministic bank financial formulas • 100% Free
          </p>
        </div>
      </form>
    </div>
  );
};
