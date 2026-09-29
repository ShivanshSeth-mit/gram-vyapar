import React, { useState } from "react";
import { SupportedLanguage } from "../types";
import { formatINR } from "../utils/calculator";
import {
  TrendingDown,
  TrendingUp,
  ShieldAlert,
  PiggyBank,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  Info,
  DollarSign,
  AlertTriangle,
  Lightbulb,
  CheckSquare,
  Square
} from "lucide-react";

interface MoneyRoadmapSectionProps {
  totalProjectCost: number;
  marginCapital: number;
  loanEligibility: number;
  businessCategory: string;
  currentLang: SupportedLanguage;
}

export const MoneyRoadmapSection: React.FC<MoneyRoadmapSectionProps> = ({
  totalProjectCost,
  marginCapital,
  loanEligibility,
  businessCategory,
  currentLang
}) => {
  const [activeFilter, setActiveFilter] = useState<"all" | "spend" | "save" | "timeline">("all");
  const [checkedSavings, setCheckedSavings] = useState<Record<string, boolean>>({
    premise: true,
    power: true,
    bulk: false,
    marketing: true,
    tools: false
  });

  const isHindi = currentLang === "hi";
  const isMarathi = currentLang === "mr";

  // Calculations based on Total Project Cost
  const machineryAllocation = Math.round(totalProjectCost * 0.45);
  const rawMaterialAllocation = Math.round(totalProjectCost * 0.25);
  const workingCapitalBuffer = Math.round(totalProjectCost * 0.18);
  const complianceAllocation = Math.round(totalProjectCost * 0.06);
  const siteSetupAllocation = Math.round(totalProjectCost * 0.06);

  // Savings Estimates
  const savingsOptions = [
    {
      id: "premise",
      title: isHindi
        ? "कार्यशाला / परिसर किराया बचत"
        : isMarathi
        ? "परिसर भाडे बचत"
        : "Premise / Workshop Rent Optimization",
      desc: isHindi
        ? "शहरी महंगे परिसर के बजाय ग्रामीण / पैतृक भूमि का उपयोग करें अथवा 60 दिनों का किराया-मुक्त फिट-आउट समय मांगें।"
        : isMarathi
        ? "महागड्या जागेऐवजी ग्रामीण किंवा स्वतःच्या जागेचा वापर करा अथवा सुरुवातीला भाडे सवलत मिळवा."
        : "Operate from village/ancestral premises or negotiate a 60-day rent-free fit-out period with landlord.",
      estimatedSavingsPct: 0.08,
      tag: isHindi ? "₹30,000 - ₹60,000 बचत" : "Save ₹30k - ₹60k"
    },
    {
      id: "power",
      title: isHindi
        ? "रियायती औद्योगिक बिजली एवं सोलर छूट"
        : isMarathi
        ? "औद्योगिक वीज सवलत व सोलर लाभ"
        : "Subsidized Industrial Power & Green Tariff",
      desc: isHindi
        ? "घरेलू बिजली के बजाय एमएसएमई औद्योगिक टैरिफ कनेक्शन लें और राज्य सरकार की 20% बिजली बिल सब्सिडी का दावा करें।"
        : isMarathi
        ? "घरगुती विजेऐवजी एमएसएमई औद्योगिक कनेक्शन घ्या व वीज बिलात 20% सबसिडी मिळवा."
        : "Apply for MSME industrial tariff instead of commercial/domestic rates to claim up to 20% state power subsidy.",
      estimatedSavingsPct: 0.04,
      tag: isHindi ? "20% मासिक बिजली बचत" : "20% Power Bill Cut"
    },
    {
      id: "tools",
      title: isHindi
        ? "प्रमाणित सेकंडरी / रीफर्बिश्ड सहायक उपकरण"
        : isMarathi
        ? "प्रमाणित दुय्यम / रिफर्बिश्ड उपकरणे"
        : "Certified Refurbished Auxiliary Tools",
      desc: isHindi
        ? "पैकिंग मशीन, वजन कांटे और गैर-महत्वपूर्ण सहायक औजारों के लिए नई के बजाय रीफर्बिश्ड प्रमाणित मशीनें खरीदें।"
        : isMarathi
        ? "पॅकिंग आणि लहान हत्यारांसाठी संपूर्ण नवीन ऐवजी प्रमाणित रिफर्बिश्ड टूल्स खरेदी करा."
        : "Procure certified refurbished units for secondary packaging, weighing scales, and non-core auxiliary tools.",
      estimatedSavingsPct: 0.05,
      tag: isHindi ? "25% औजार बचत" : "Save 25% on Tools"
    },
    {
      id: "marketing",
      title: isHindi
        ? "शून्य लागत हाइपर-लोकल प्रचार रणनीति"
        : isMarathi
        ? "विनामूल्य स्थानिक प्रचार तंत्र"
        : "Zero-Cost Hyper-Local Community Marketing",
      desc: isHindi
        ? "महंगी एजेंसियों के बजाय व्हाट्सएप बिजनेस कैटलॉग, स्थानीय हाट-बाजारों में मुफ्त नमूना वितरण व वर्ड-ऑफ-माउथ का उपयोग करें।"
        : isMarathi
        ? "मोठ्या जाहिरातींऐवजी व्हॉट्सॲप बिझनेस, स्थानिक आठवडी बाजार आणि नमुना वितरणावर भर द्या."
        : "Leverage WhatsApp Business catalogs, village haat/mandi demo stalls, and direct referral networks rather than print/ads.",
      estimatedSavingsPct: 0.03,
      tag: isHindi ? "₹20,000+ बचत" : "Save ₹20,000+"
    },
    {
      id: "bulk",
      title: isHindi
        ? "एसएचजी / सहकारी संघों से थोक कच्चा माल"
        : isMarathi
        ? "बचत गट / सहकारातून कच्चा माल"
        : "Raw Material Aggregation via SHG / Cooperatives",
      desc: isHindi
        ? "अकेले फुटकर खरीदने के बजाय स्थानीय स्वयं सहायता समूहों (SHGs) या किसान उत्पादक संगठनों (FPO) के साथ सामूहिक थोक ऑर्डर दें।"
        : isMarathi
        ? "किरकोळ खरेदीऐवजी स्थानिक बचत गट किंवा शेतकरी उत्पादक कंपन्यांसोबत थेट ठोक खरेदी करा."
        : "Pool purchase orders with regional Self Help Groups or Farmer Producer Organizations (FPOs) to unlock tier-1 wholesale pricing.",
      estimatedSavingsPct: 0.06,
      tag: isHindi ? "12% - 15% मार्जिन लाभ" : "12-15% Volume Cut"
    }
  ];

  const totalCalculatedSavings = savingsOptions.reduce((acc, opt) => {
    if (checkedSavings[opt.id]) {
      return acc + Math.round(totalProjectCost * opt.estimatedSavingsPct);
    }
    return acc;
  }, 0);

  const toggleSaving = (id: string) => {
    setCheckedSavings((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors"
      id="money-roadmap-root"
    >
      {/* Header Banner */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
              {isHindi ? "वित्तीय आवंटन एवं बचत रोडमैप" : isMarathi ? "पैशांचे नियोजन व बचत आराखडा" : "Capital Allocation & Savings Roadmap"}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">
              {businessCategory}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            {isHindi
              ? "पूंजी व्यय रोडमैप: कहां खर्च करें और कहां बचत करें?"
              : isMarathi
              ? "भांडवल नियोजन: कुठे खर्च करावा आणि कुठे पैसे वाचवावे?"
              : "Where to Spend & Where to Save Your Project Capital"}
          </h3>

          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl font-medium leading-relaxed">
            {isHindi
              ? `कुल परियोजना लागत ${formatINR(totalProjectCost)} के आधार पर अनुशंसित चरणबद्ध आवंटन। व्यावसायिक सफलता हेतु आवश्यक उत्पादक संपत्तियों में निवेश करें तथा अनावश्यक ओवरहेड खर्चों में भारी बचत करें।`
              : isMarathi
              ? `एकूण प्रकल्प खर्च ${formatINR(totalProjectCost)} साठी शास्त्रोक्त नियोजन. उत्पादक साधनांवर योग्य खर्च करा आणि अनावश्यक खर्च वाचवा.`
              : `Milestone-based financial deployment blueprint for your total project cost of ${formatINR(totalProjectCost)}. Protect quality while maximizing capital efficiency.`}
          </p>
        </div>

        {/* Total Cost Highlight Card */}
        <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 min-w-[220px] text-right sm:text-left">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            {isHindi ? "कुल परियोजना लागत" : isMarathi ? "एकूण प्रकल्प खर्च" : "Total Project Capital"}
          </span>
          <p className="text-2xl font-black text-blue-900 dark:text-blue-300 mt-0.5">
            {formatINR(totalProjectCost)}
          </p>
          <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 mt-1.5 pt-1.5 border-t border-slate-200 dark:border-slate-700">
            <span>{isHindi ? "मार्जिन:" : "Margin:"} <strong>{formatINR(marginCapital)}</strong></span>
            <span>{isHindi ? "ऋण:" : "Loan:"} <strong>{formatINR(loanEligibility)}</strong></span>
          </div>
        </div>
      </div>

      {/* Proportional Capital Allocation Visual Progress Bar */}
      <div className="my-6">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
          <span className="flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span>{isHindi ? "परियोजना लागत का विभाजन (100%)" : "Project Capital Split (100%)"}</span>
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            {isHindi ? "उत्पादक संपत्तियां + कार्यशील पूंजी बफर" : "Productive Assets + Working Capital Buffer"}
          </span>
        </div>

        {/* Multi-colored Segmented Bar */}
        <div className="w-full h-4 rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-inner">
          <div
            style={{ width: "45%" }}
            className="bg-blue-600 dark:bg-blue-500 transition-all hover:brightness-110"
            title={`Machinery: 45% (${formatINR(machineryAllocation)})`}
          />
          <div
            style={{ width: "25%" }}
            className="bg-emerald-600 dark:bg-emerald-500 transition-all hover:brightness-110"
            title={`Raw Inventory: 25% (${formatINR(rawMaterialAllocation)})`}
          />
          <div
            style={{ width: "18%" }}
            className="bg-amber-500 dark:bg-amber-400 transition-all hover:brightness-110"
            title={`Working Capital Buffer: 18% (${formatINR(workingCapitalBuffer)})`}
          />
          <div
            style={{ width: "6%" }}
            className="bg-purple-600 dark:bg-purple-400 transition-all hover:brightness-110"
            title={`Compliance & Licenses: 6% (${formatINR(complianceAllocation)})`}
          />
          <div
            style={{ width: "6%" }}
            className="bg-slate-500 dark:bg-slate-400 transition-all hover:brightness-110"
            title={`Site Setup & Power: 6% (${formatINR(siteSetupAllocation)})`}
          />
        </div>

        {/* Bar Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-3 text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-500 shrink-0" />
            <span>{isHindi ? "मशीनरी (45%)" : "Machinery (45%)"}: <strong>{formatINR(machineryAllocation)}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-500 shrink-0" />
            <span>{isHindi ? "कच्चा माल (25%)" : "Raw Stock (25%)"}: <strong>{formatINR(rawMaterialAllocation)}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 dark:bg-amber-400 shrink-0" />
            <span>{isHindi ? "कैश बफर (18%)" : "Cash Buffer (18%)"}: <strong>{formatINR(workingCapitalBuffer)}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600 dark:bg-purple-400 shrink-0" />
            <span>{isHindi ? "लाइसेंस (6%)" : "Licenses (6%)"}: <strong>{formatINR(complianceAllocation)}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-500 dark:bg-slate-400 shrink-0" />
            <span>{isHindi ? "शेड व बिजली (6%)" : "Site/Power (6%)"}: <strong>{formatINR(siteSetupAllocation)}</strong></span>
          </div>
        </div>
      </div>

      {/* Filter Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl my-6">
        <button
          type="button"
          onClick={() => setActiveFilter("all")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeFilter === "all"
              ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          {isHindi ? "समस्त मार्गदर्शन (All)" : isMarathi ? "सर्व मार्गदर्शन" : "Complete Roadmap"}
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter("spend")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeFilter === "spend"
              ? "bg-blue-900 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <TrendingDown className="h-3.5 w-3.5 text-blue-300" />
          <span>{isHindi ? "कहां अवश्य खर्च करें (Must Spend)" : "Where You Must Spend"}</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter("save")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeFilter === "save"
              ? "bg-emerald-700 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <PiggyBank className="h-3.5 w-3.5 text-emerald-300" />
          <span>{isHindi ? "पैसे कहां बचाएं (Smart Savings)" : "Where to Save & Cut Cost"}</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter("timeline")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeFilter === "timeline"
              ? "bg-amber-700 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Calendar className="h-3.5 w-3.5 text-amber-300" />
          <span>{isHindi ? "माह-दर-माह समयरेखा (Timeline)" : "Phase-by-Phase Timeline"}</span>
        </button>
      </div>

      {/* Main 2-Column Grid: Must Spend vs Where to Save */}
      {(activeFilter === "all" || activeFilter === "spend" || activeFilter === "save") && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* COLUMN 1: WHERE YOU MUST SPEND (Crucial Quality Allocations) */}
          {(activeFilter === "all" || activeFilter === "spend") && (
            <div className="space-y-4" id="must-spend-column">
              <div className="flex items-center justify-between pb-2 border-b border-blue-100 dark:border-blue-900/40">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 flex items-center justify-center font-bold">
                    <TrendingDown className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">
                      {isHindi ? "कहां अवश्य खर्च करें (गुणवत्ता निवेश)" : "Where You MUST Spend (Zero Compromise)"}
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                      {isHindi ? "यहां कटौती करने से व्यापार में भारी नुकसान होता है" : "Cutting corners here risks enterprise failure"}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-black text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800">
                  {formatINR(machineryAllocation + rawMaterialAllocation + complianceAllocation)}
                </span>
              </div>

              {/* Item 1: Core Machinery & Warranty */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">
                    1. {isHindi ? "वारंटी युक्त मुख्य मशीनरी व उपकरण" : "Core Machinery with Direct OEM Warranty"}
                  </span>
                  <span className="text-[11px] font-bold text-blue-900 dark:text-blue-300 font-mono">
                    ~{formatINR(machineryAllocation)} (45%)
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                  {isHindi
                    ? "बिना गारंटी वाली पुरानी या घटिया मशीनों से बचें। अधिकृत निर्माता से कम से कम 1 वर्ष की ऑन-साइट सर्विस वारंटी और स्पेयर पार्ट्स की उपलब्धता सुनिश्चित करें।"
                    : "Never buy unbranded core machines without spare parts availability. Require a minimum 1-year on-site manufacturer warranty."}
                </p>
                <div className="mt-2 text-[11px] text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 p-2 rounded-xl font-medium">
                  💡 {isHindi ? "बैंक ऋण सीधे विक्रेता के बैंक खाते में आरटीजीएस होगा।" : "Bank will disburse quotation amount directly to vendor via RTGS."}
                </div>
              </div>

              {/* Item 2: High Quality Initial Raw Stock */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">
                    2. {isHindi ? "उच्च गुणवत्ता वाला प्रथम 90-दिवसीय कच्चा माल" : "Grade-A Raw Inventory for Initial 90 Days"}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 font-mono">
                    ~{formatINR(rawMaterialAllocation)} (25%)
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                  {isHindi
                    ? "शुरुआती ग्राहकों को सर्वोत्तम गुणवत्ता वाले उत्पाद दें। पहले 3 महीनों में घटिया कच्चे माल से बनाया गया उत्पाद आपके ब्रांड की प्रतिष्ठा हमेशा के लिए समाप्त कर सकता है।"
                    : "Your first batch establishes local market reputation. High-grade raw inputs ensure product consistency and repeat orders."}
                </p>
              </div>

              {/* Item 3: Working Capital & Receivables Buffer */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">
                    3. {isHindi ? "3 माह का आपातकालीन कार्यशील पूंजी रिज़र्व" : "90-Day Working Capital & Liquidity Buffer"}
                  </span>
                  <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 font-mono">
                    ~{formatINR(workingCapitalBuffer)} (18%)
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                  {isHindi
                    ? "दुकानदार और डीलर उत्पाद बिकने के बाद 30 से 60 दिन में भुगतान करते हैं। बिजली बिल, मजदूरी और दैनिक व्यय के लिए नकद रिज़र्व अवश्य सुरक्षित रखें।"
                    : "Retailers typically demand 30-45 day credit cycles. Maintain this buffer strictly for rent, utilities, and wages without taking high-interest loans."}
                </p>
              </div>

              {/* Item 4: Statutory Licenses */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">
                    4. {isHindi ? "वैधानिक लाइसेंस, FSSAI एवं उद्योग प्रमाणीकरण" : "Statutory Compliance & FSSAI / Udyam Certification"}
                  </span>
                  <span className="text-[11px] font-bold text-purple-800 dark:text-purple-300 font-mono">
                    ~{formatINR(complianceAllocation)} (6%)
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                  {isHindi
                    ? "उद्यम पंजीकरण, ट्रेड लाइसेंस, खाद्य लाइसेंस (FSSAI) और अग्नि/प्रदूषण प्रमाण पत्र समय पर लें ताकि कोई विधिक बाधा न आए।"
                    : "Mandatory for bank loan subsidy release. Avoid sudden local authority notices or store shutdowns."}
                </p>
              </div>
            </div>
          )}

          {/* COLUMN 2: WHERE TO SAVE (Strategic Cost Cutting) */}
          {(activeFilter === "all" || activeFilter === "save") && (
            <div className="space-y-4" id="where-to-save-column">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-100 dark:border-emerald-900/40">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 flex items-center justify-center font-bold">
                    <PiggyBank className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">
                      {isHindi ? "पैसे कहां बचाएं (लागत घटाने की रणनीति)" : "Where You MUST Save (Smart Cost-Cutting)"}
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                      {isHindi ? "इन 5 रणनीतियों से पूंजी की भारी बचत करें" : "Tick strategies below to simulate your capital preservation"}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  {isHindi ? `बचत: ${formatINR(totalCalculatedSavings)}` : `Saved: ${formatINR(totalCalculatedSavings)}`}
                </span>
              </div>

              {/* Interactive Checklist Cards for Savings */}
              {savingsOptions.map((opt) => {
                const isChecked = checkedSavings[opt.id];
                const optSavingAmount = Math.round(totalProjectCost * opt.estimatedSavingsPct);

                return (
                  <div
                    key={opt.id}
                    onClick={() => toggleSaving(opt.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer select-none ${
                      isChecked
                        ? "bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800"
                        : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 opacity-75"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <button
                          type="button"
                          className="mt-0.5 text-emerald-700 dark:text-emerald-400 focus:outline-none"
                          aria-label="Toggle saving"
                        >
                          {isChecked ? (
                            <CheckSquare className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                          ) : (
                            <Square className="h-4 w-4 text-slate-400" />
                          )}
                        </button>
                        <div>
                          <span className={`text-xs font-bold ${
                            isChecked ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"
                          }`}>
                            {opt.title}
                          </span>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                            {opt.desc}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200 font-mono">
                          +{formatINR(optSavingAmount)}
                        </span>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {opt.tag}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Total Savings Milestone Box */}
              <div className="p-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl shadow-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">
                      {isHindi ? "आपकी संभावित कुल पूंजी बचत" : "Your Total Projected Capital Saved"}
                    </span>
                    <p className="text-xl font-black mt-0.5">
                      {formatINR(totalCalculatedSavings)}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full font-bold">
                      {Math.round((totalCalculatedSavings / totalProjectCost) * 100)}% {isHindi ? "परियोजना बचत" : "Project Saved"}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-emerald-100 mt-2">
                  {isHindi
                    ? "बचाई गई इस पूंजी को आप अतिरिक्त कार्यशील पूंजी बफर अथवा समय से पूर्व ऋण चुकाने में उपयोग कर सकते हैं।"
                    : "Deploy these preserved funds into your debt repayment buffer or marketing reinvestment."}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SECTION 3: PHASE-BY-PHASE TIMELINE ROADMAP */}
      {(activeFilter === "all" || activeFilter === "timeline") && (
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800" id="roadmap-timeline-section">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-4 w-4 text-blue-700 dark:text-blue-400" />
            <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">
              {isHindi ? "चरणबद्ध व्यय समयरेखा (महीने 1 से 6)" : "Phase-by-Phase Spending Timeline (Months 1 to 6)"}
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Phase 1 */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300">
                  {isHindi ? "चरण 1: माह 1 - 2" : "Phase 1: Months 1 - 2"}
                </span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono">
                  ~50% {isHindi ? "पूंजी" : "Capital"}
                </span>
              </div>
              <h5 className="font-bold text-xs text-slate-900 dark:text-white">
                {isHindi ? "परिसर स्थापना एवं मशीनरी ऑर्डर" : "Shed Lease & Machinery Procurement"}
              </h5>
              <ul className="text-[11px] text-slate-600 dark:text-slate-400 mt-2 space-y-1.5">
                <li>• {isHindi ? "उद्यम पंजीकरण एवं बैंक ऋण संवितरण" : "Udyam registration & bank loan drawdown"}</li>
                <li>• {isHindi ? "मशीनरी निर्माता को अग्रिम भुगतान (RTGS)" : "Vendor machine invoice advance (via bank)"}</li>
                <li>• {isHindi ? "औद्योगिक बिजली कनेक्शन व शेड तैयारी" : "Power connection & workshop civil layout"}</li>
              </ul>
            </div>

            {/* Phase 2 */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300">
                  {isHindi ? "चरण 2: माह 3 - 4" : "Phase 2: Months 3 - 4"}
                </span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono">
                  ~30% {isHindi ? "पूंजी" : "Capital"}
                </span>
              </div>
              <h5 className="font-bold text-xs text-slate-900 dark:text-white">
                {isHindi ? "कच्चा माल खरीद एवं ट्रायल बैच" : "Raw Material Inflow & Trial Batch Run"}
              </h5>
              <ul className="text-[11px] text-slate-600 dark:text-slate-400 mt-2 space-y-1.5">
                <li>• {isHindi ? "मशीनरी स्थापना व ऑपरेटर टेस्टिंग" : "Machine commissioning & calibration"}</li>
                <li>• {isHindi ? "थोक कच्चे माल का पहला 90-दिवसीय स्टॉक" : "First 90-day bulk raw stock arrival"}</li>
                <li>• {isHindi ? "पैकेजिंग सामग्री व FSSAI/गुणवत्ता लैब टेस्ट" : "Packaging printing & FSSAI / quality seal"}</li>
              </ul>
            </div>

            {/* Phase 3 */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300">
                  {isHindi ? "चरण 3: माह 5 - 6" : "Phase 3: Months 5 - 6"}
                </span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono">
                  ~20% {isHindi ? "पूंजी" : "Capital"}
                </span>
              </div>
              <h5 className="font-bold text-xs text-slate-900 dark:text-white">
                {isHindi ? "व्यावसायिक बिक्री एवं नकदी बफर" : "Commercial Launch & Working Capital Cycle"}
              </h5>
              <ul className="text-[11px] text-slate-600 dark:text-slate-400 mt-2 space-y-1.5">
                <li>• {isHindi ? "स्थानीय हाट, दुकानों व डीलरों को प्रथम आपूर्ति" : "Retail distribution & introductory sampling"}</li>
                <li>• {isHindi ? "30-दिवसीय उधारी चक्र व नकद प्रवाह संतुलन" : "Managing 30-day retail receivables cycle"}</li>
                <li>• {isHindi ? "मोरेटोरियम के बाद नियमित ईएमआई भुगतान प्रारंभ" : "Begin scheduled bank EMI post-moratorium"}</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
