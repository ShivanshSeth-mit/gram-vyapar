import { SupportedLanguage } from "../types";

export interface TranslationStrings {
  portalTitle: string;
  portalSubtitle: string;
  tagline: string;
  officialBadge: string;
  langName: string;
  
  // Onboarding
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;

  locationLabel: string;
  locationPlaceholder: string;
  pincodeLabel: string;
  pincodePlaceholder: string;
  useMyLocation: string;
  locDetecting: string;

  marginLabel: string;
  marginHint: string;
  quickMarginTip: string;
  totalCostPreview: string;
  loanPreview: string;

  businessLabel: string;
  selectCategory: string;
  customCategoryPlaceholder: string;
  applicantNameLabel: string;
  applicantPhoneLabel: string;
  generateReportBtn: string;
  generatingReport: string;

  // Tabs
  tabFeasibility: string;
  tabFinancial: string;
  backToForm: string;
  shareWhatsApp: string;
  downloadPdf: string;
  saveReport: string;
  searchSaved: string;

  // Feasibility Cards
  marketReachTitle: string;
  opportunityTitle: string;
  swotTitle: string;
  threatsTitle: string;
  competitorTitle: string;
  productValueTitle: string;

  swotS: string;
  swotW: string;
  swotO: string;
  swotT: string;
  showDetails: string;
  hideDetails: string;
  listenVoice: string;
  stopVoice: string;

  // Feasibility Card Localization
  opportunitySummaryLabel?: string;
  underservedNichesTitle?: string;
  marginPremiumNote?: string;
  swotSubtitle?: string;
  threatsSummaryLabel?: string;
  threatMitigationTip?: string;
  competitorSummaryLabel?: string;
  competitorDensityLabel?: string;
  recommendedPriceLabel?: string;
  purchasingPowerNote?: string;
  netProfitMarginLabel?: string;
  costCoverageNote?: string;
  regionalBenchmarkLabel?: string;
  convertLanguageBtn?: string;
  translating?: string;
  translatedTo?: string;
  showOriginal?: string;
  showConverted?: string;
  changeLanguage?: string;

  // Financial Tab
  summaryMargin: string;
  summaryProjectCost: string;
  summaryLoan: string;
  youQualifyFor: string;
  schemeReasoningTitle: string;
  keyParameters: string;
  interestRate: string;
  tenure: string;
  moratoriumPeriod: string;
  quarterlyEmi: string;

  repaymentScheduleTitle: string;
  moratoriumNote: string;
  tableQuarter: string;
  tableOpening: string;
  tablePrincipal: string;
  tableInterest: string;
  tableTotalEmi: string;
  tableClosing: string;

  cashflowTitle: string;
  monthlyRevenue: string;
  monthlyExpenses: string;
  netCashflow: string;
  dscrLabel: string;
  dscrSafe: string;

  // CTAs
  nextStepTitle: string;
  nextStepDesc: string;
  findBranchBtn: string;
  requiredDocuments: string;
  doc1: string;
  doc2: string;
  doc3: string;
  doc4: string;
  disclaimer: string;

  // Schemes, Banks & AI
  exploreSchemes: string;
  selectBank: string;
  schemeDetails: string;
  subsidyAmount: string;
  viewSchemePortal: string;
  eligibilityTitle: string;
  docChecklist: string;
  askAiAboutScheme: string;
  aiAdvisorTitle: string;
  aiAdvisorSubtitle: string;
  loginTitle: string;
  loginDesc: string;
  logout: string;
}

export const translations: Record<SupportedLanguage, TranslationStrings> = {
  en: {
    portalTitle: "Gram Vyapar",
    portalSubtitle: "Government Scheme & Feasibility Advisory",
    tagline: "Empowering Rural & Semi-Urban Micro-Entrepreneurs in India",
    officialBadge: "Ministry of MSME & Rural Banking Guidance",
    langName: "English",

    step1Title: "1. Business Location",
    step1Desc: "Village, Block or District in India",
    step2Title: "2. Your Margin Money",
    step2Desc: "Your 10% own contribution in ₹",
    step3Title: "3. Business Category",
    step3Desc: "Select your sector or craft",

    locationLabel: "Village / Block / District",
    locationPlaceholder: "e.g. Baramati, Pune or Mohanlalganj, Lucknow",
    pincodeLabel: "PIN Code (Optional)",
    pincodePlaceholder: "e.g. 411001",
    useMyLocation: "Use GPS Location",
    locDetecting: "Detecting Location...",

    marginLabel: "Your Available Margin Capital (₹)",
    marginHint: "This is your own savings (10% self-contribution). Govt will fund up to 90%.",
    quickMarginTip: "Quick select:",
    totalCostPreview: "Estimated Total Project Cost (100%):",
    loanPreview: "Eligible Government Loan (90%):",

    businessLabel: "Proposed Business Category",
    selectCategory: "Choose your business type",
    customCategoryPlaceholder: "Enter specific business name (e.g. Bamboo Basket Weaving)",
    applicantNameLabel: "Entrepreneur Name (Optional)",
    applicantPhoneLabel: "Mobile Number (For saving report)",
    generateReportBtn: "Generate Feasibility & Scheme Report",
    generatingReport: "Analyzing Local Market & Calculating Schemes...",

    tabFeasibility: "Feasibility Report",
    tabFinancial: "Financial Plan & Schemes",
    backToForm: "Edit Details",
    shareWhatsApp: "Share via WhatsApp",
    downloadPdf: "Download Bank PDF",
    saveReport: "Save Report",
    searchSaved: "Saved Reports",

    marketReachTitle: "Market Reach & Customers",
    opportunityTitle: "Opportunity & Local Niches",
    swotTitle: "SWOT Viability Matrix",
    threatsTitle: "Local Threats & Risk Mitigation",
    competitorTitle: "Competitor Mapping & Density",
    productValueTitle: "Fair Pricing & Margin Estimates",

    swotS: "Strengths (ताकत)",
    swotW: "Weaknesses (कमजोरी)",
    swotO: "Opportunities (अवसर)",
    swotT: "Threats (चुनौतियां)",
    showDetails: "View Details",
    hideDetails: "Hide Details",
    listenVoice: "Listen in Audio",
    stopVoice: "Stop Audio",

    summaryMargin: "Your Margin (10%)",
    summaryProjectCost: "Total Project Cost (100%)",
    summaryLoan: "Bank Loan Eligible (90%)",
    youQualifyFor: "Matched Scheme",
    schemeReasoningTitle: "Why this scheme matches your enterprise:",
    keyParameters: "Core Parameters",
    interestRate: "Annual Interest Rate",
    tenure: "Total Loan Tenure",
    moratoriumPeriod: "Moratorium (Grace Period)",
    quarterlyEmi: "Quarterly EMI (Post-Moratorium)",

    repaymentScheduleTitle: "Quarterly Amortization & Repayment Schedule",
    moratoriumNote: "During the moratorium grace period, only quarterly interest is serviced. Principal repayment begins thereafter.",
    tableQuarter: "Quarter",
    tableOpening: "Opening Balance",
    tablePrincipal: "Principal Paid",
    tableInterest: "Interest Paid",
    tableTotalEmi: "Total Quarterly Payment",
    tableClosing: "Closing Balance",

    cashflowTitle: "Monthly Cash Flow & Operating Viability",
    monthlyRevenue: "Est. Monthly Sales / Turnover",
    monthlyExpenses: "Est. Monthly Operating Expenses",
    netCashflow: "Net Surplus Cash Flow",
    dscrLabel: "Debt Service Coverage Ratio (DSCR)",
    dscrSafe: "Healthy repayment buffer (DSCR > 1.5)",

    nextStepTitle: "Recommended Action Plan for Bank Visit",
    nextStepDesc: "Visit your local District Industries Centre (DIC) or Lead Bank Branch with this printout.",
    findBranchBtn: "Locate Nearest Bank Branch",
    requiredDocuments: "Essential Documentation Checklist",
    doc1: "Aadhaar Card & PAN Card (KYC)",
    doc2: "Gram Panchayat / Village Residence Certificate",
    doc3: "Quotations from Authorized Machinery Vendors",
    doc4: "Printout of this Udyam Sahayak Feasibility Report",
    disclaimer: "Government schemes, subsidies and lending rates are indicative and subject to official bank verification, credit underwriting, and scheme guidelines.",

    exploreSchemes: "Explore Government Schemes & Partner Banks",
    selectBank: "Select Lending Partner Bank",
    schemeDetails: "Scheme Details & Benefits",
    subsidyAmount: "Government Capital Subsidy",
    viewSchemePortal: "Visit Official Portal",
    eligibilityTitle: "Eligibility Guidelines",
    docChecklist: "Documents Required",
    askAiAboutScheme: "Ask AI About This Scheme",
    aiAdvisorTitle: "Gram Vyapar AI Assistant",
    aiAdvisorSubtitle: "Ask anything about schemes, subsidies & bank rules",
    loginTitle: "Sign In / Register",
    loginDesc: "Access saved project reports, manage applications & get personalized advisory",
    logout: "Sign Out"
  },

  hi: {
    portalTitle: "ग्राम व्यापार",
    portalSubtitle: "सरकारी योजना एवं व्यवहार्यता सलाहकार",
    tagline: "ग्रामीण और अर्ध-शहरी सूक्ष्म उद्यमियों का सशक्तिकरण",
    officialBadge: "सूक्ष्म, लघु एवं मध्यम उद्यम मंत्रालय एवं ग्रामीण बैंकिंग मार्गदर्शन",
    langName: "हिन्दी",

    step1Title: "1. उद्यम का स्थान",
    step1Desc: "भारत में आपका गाँव, ब्लॉक या जिला",
    step2Title: "2. आपका मार्जिन धन",
    step2Desc: "₹ में आपका 10% स्वयं का अंशदान",
    step3Title: "3. व्यापार की श्रेणी",
    step3Desc: "अपना कार्यक्षेत्र या शिल्प चुनें",

    locationLabel: "गाँव / ब्लॉक / कस्बा / जिला",
    locationPlaceholder: "उदा. बारामती, पुणे या मोहनलालगंज, लखनऊ",
    pincodeLabel: "पिन कोड (वैकल्पिक)",
    pincodePlaceholder: "उदा. 411001",
    useMyLocation: "जीपीएस स्थान का उपयोग करें",
    locDetecting: "स्थान खोजा जा रहा है...",

    marginLabel: "आपकी उपलब्ध मार्जिन पूंजी (₹)",
    marginHint: "यह आपकी स्वयं की बचत है (10% अंशदान)। सरकार 90% तक ऋण सहायता देती है।",
    quickMarginTip: "त्वरित चयन:",
    totalCostPreview: "अनुमानित कुल परियोजना लागत (100%):",
    loanPreview: "पात्र सरकारी बैंक ऋण (90%):",

    businessLabel: "प्रस्तावित व्यापार श्रेणी",
    selectCategory: "व्यापार का प्रकार चुनें",
    customCategoryPlaceholder: "विशिष्ट व्यापार नाम लिखें (जैसे बांस टोकरी निर्माण)",
    applicantNameLabel: "उद्यमी का नाम (वैकल्पिक)",
    applicantPhoneLabel: "मोबाइल नंबर (रिपोर्ट सुरक्षित रखने हेतु)",
    generateReportBtn: "व्यवहार्यता एवं योजना रिपोर्ट तैयार करें",
    generatingReport: "स्थानीय बाजार विश्लेषण और ऋण गणना जारी है...",

    tabFeasibility: "व्यवहार्यता रिपोर्ट",
    tabFinancial: "वित्तीय योजना एवं योजनाएं",
    backToForm: "विवरण बदलें",
    shareWhatsApp: "व्हाट्सएप पर साझा करें",
    downloadPdf: "बैंक हेतु पीडीएफ डाउनलोड करें",
    saveReport: "रिपोर्ट सुरक्षित करें",
    searchSaved: "सुरक्षित रिपोर्ट",

    marketReachTitle: "बाजार पहुंच एवं ग्राहक आधार",
    opportunityTitle: "स्थानीय अवसर एवं विशिष्ट मांग",
    swotTitle: "SWOT व्यवहार्यता विश्लेषण",
    threatsTitle: "जोखिम एवं समाधान उपाय",
    competitorTitle: "स्थानीय प्रतिस्पर्धी मैपिंग",
    productValueTitle: "उचित मूल्य एवं मुनाफा अनुमान",

    swotS: "ताकत (Strengths)",
    swotW: "कमजोरी (Weaknesses)",
    swotO: "अवसर (Opportunities)",
    swotT: "चुनौतियां (Threats)",
    showDetails: "विस्तार से देखें",
    hideDetails: "संक्षेप करें",
    listenVoice: "आवाज़ में सुनें",
    stopVoice: "आवाज़ रोकें",

    summaryMargin: "आपकी मार्जिन राशि (10%)",
    summaryProjectCost: "कुल परियोजना लागत (100%)",
    summaryLoan: "पात्र बैंक ऋण (90%)",
    youQualifyFor: "योग्य सरकारी योजना",
    schemeReasoningTitle: "यह योजना आपके उद्यम के लिए क्यों उपयुक्त है:",
    keyParameters: "मुख्य वित्तीय मापदंड",
    interestRate: "वार्षिक ब्याज दर",
    tenure: "ऋण चुकाने की अवधि",
    moratoriumPeriod: "मोरेटोरियम (छूट अवधि)",
    quarterlyEmi: "त्रैमासिक ईएमआई (किस्त)",

    repaymentScheduleTitle: "त्रैमासिक ऋण चुकौती एवं किस्त अनुसूची",
    moratoriumNote: "मोरेटोरियम अवधि के दौरान केवल ब्याज का भुगतान किया जाता है। मूलधन की किस्त इसके बाद शुरू होती है।",
    tableQuarter: "तिमाही",
    tableOpening: "प्रारंभिक शेष",
    tablePrincipal: "मूलधन भुगतान",
    tableInterest: "ब्याज भुगतान",
    tableTotalEmi: "कुल तिमाही किस्त",
    tableClosing: "अंतिम शेष",

    cashflowTitle: "मासिक नकदी प्रवाह एवं संचालन व्यवहार्यता",
    monthlyRevenue: "अनुमानित मासिक बिक्री / टर्नओवर",
    monthlyExpenses: "अनुमानित मासिक परिचालन खर्च",
    netCashflow: "शुद्ध मासिक बचत / नकद प्रवाह",
    dscrLabel: "ऋण सेवा कवरेज अनुपात (DSCR)",
    dscrSafe: "सुरक्षित ऋण पुनर्भुगतान क्षमता (DSCR > 1.5)",

    nextStepTitle: "बैंक आवेदन हेतु आगामी कदम",
    nextStepDesc: "इस रिपोर्ट को लेकर अपने निकटतम जिला उद्योग केंद्र (DIC) या अग्रणी बैंक शाखा में जाएं।",
    findBranchBtn: "निकटतम बैंक शाखा खोजें",
    requiredDocuments: "आवश्यक दस्तावेजों की सूची",
    doc1: "आधार कार्ड एवं पैन कार्ड (पहचान व पता)",
    doc2: "ग्राम पंचायत निवास प्रमाण पत्र",
    doc3: "मशीनरी व उपकरणों का अधिकृत कोटेशन",
    doc4: "इस उद्यम सहायक व्यवहार्यता रिपोर्ट की प्रति",
    disclaimer: "सरकारी योजनाएं, सब्सिडी और ब्याज दरें बैंक की अंतिम समीक्षा, पात्रता एवं आधिकारिक नियमों के अधीन हैं।",

    exploreSchemes: "सरकारी योजनाएं एवं ऋणदाता बैंक चुनें",
    selectBank: "पसंदीदा बैंक चुनें",
    schemeDetails: "योजना का विवरण एवं लाभ",
    subsidyAmount: "सरकारी पूंजी सब्सिडी",
    viewSchemePortal: "सरकारी पोर्टल पर जाएं",
    eligibilityTitle: "पात्रता एवं शर्तें",
    docChecklist: "आवश्यक कागजात",
    askAiAboutScheme: "इस योजना पर एआई से पूछें",
    aiAdvisorTitle: "ग्राम व्यापार एआई सहायक",
    aiAdvisorSubtitle: "योजनाओं, सब्सिडी और बैंक नियमों पर त्वरित उत्तर पाएं",
    loginTitle: "लॉगिन / पंजीकरण",
    loginDesc: "सुरक्षित रिपोर्ट देखने और ऋण सलाह पाने हेतु लॉगिन करें",
    logout: "लॉग आउट"
  },

  mr: {
    portalTitle: "ग्राम व्यापार",
    portalSubtitle: "शासकीय योजना व व्यवहार्यता सल्लागार",
    tagline: "ग्रामीण व निम-शहरी सूक्ष्म उद्योजकांचे सक्षमीकरण",
    officialBadge: "सूक्ष्म, लघु व मध्यम उद्योग मंत्रालय व ग्रामीण बँकिंग मार्गदर्शन",
    langName: "मराठी",

    step1Title: "1. व्यवसायाचे ठिकाण",
    step1Desc: "महाराष्ट्रातील गाव, तालुका किंवा जिल्हा",
    step2Title: "2. आपले मार्जिन भांडवल",
    step2Desc: "₹ मध्ये 10% स्वतःचे योगदान",
    step3Title: "3. व्यवसायाचा प्रकार",
    step3Desc: "आपला उद्योग किंवा हस्तकला निवडा",

    locationLabel: "गाव / तालुका / जिल्हा",
    locationPlaceholder: "उदा. बारामती, पुणे किंवा कराड, सातारा",
    pincodeLabel: "पिन कोड (पर्यायी)",
    pincodePlaceholder: "उदा. 411001",
    useMyLocation: "GPS द्वारे ठिकाण शोधा",
    locDetecting: "ठिकाण शोधत आहे...",

    marginLabel: "उपलब्ध मार्जिन भांडवल (₹)",
    marginHint: "ही आपली स्वतःची बचत आहे (10% योगदान). शासन 90% पर्यंत बँक कर्ज देते.",
    quickMarginTip: "त्वरित निवड:",
    totalCostPreview: "एकूण प्रकल्प खर्च (100%):",
    loanPreview: "पात्र शासकीय बँक कर्ज (90%):",

    businessLabel: "प्रस्तावित व्यवसाय",
    selectCategory: "व्यवसायाचा प्रकार निवडा",
    customCategoryPlaceholder: "विशिष्ट व्यवसाय लिहा (उदा. बांबू हस्तकला किंवा शेळीपालन)",
    applicantNameLabel: "उद्योजकाचे नाव (पर्यायी)",
    applicantPhoneLabel: "मोबाईल नंबर (अहवाल सेव्ह करण्यासाठी)",
    generateReportBtn: "व्यवहार्यता व योजना अहवाल तयार करा",
    generatingReport: "स्थानिक बाजारपेठ विश्लेषण व कर्ज मोजणी सुरू आहे...",

    tabFeasibility: "व्यवहार्यता अहवाल",
    tabFinancial: "आर्थिक नियोजन व योजना",
    backToForm: "माहिती बदला",
    shareWhatsApp: "व्हॉट्सॲपवर पाठवा",
    downloadPdf: "बँक PDF डाउनलोड करा",
    saveReport: "अहवाल सेव्ह करा",
    searchSaved: "जतन केलेले अहवाल",

    marketReachTitle: "बाजारपेठ पोहोच व ग्राहक",
    opportunityTitle: "स्थानिक संधी व वाव",
    swotTitle: "SWOT व्यवसाय विश्लेषण",
    threatsTitle: "जोखीम व उपाययोजना",
    competitorTitle: "स्थानिक स्पर्धा नकाशा",
    productValueTitle: "वाजवी दर व नफा अंदाज",

    swotS: "सामर्थ्य (Strengths)",
    swotW: "मर्यादा (Weaknesses)",
    swotO: "संधी (Opportunities)",
    swotT: "धोके (Threats)",
    showDetails: "सविस्तर पहा",
    hideDetails: "संक्षिप्त करा",
    listenVoice: "आवाजात ऐका",
    stopVoice: "आवाज थांबवा",

    summaryMargin: "आपले मार्जिन (10%)",
    summaryProjectCost: "एकूण प्रकल्प खर्च (100%)",
    summaryLoan: "पात्र बँक कर्ज (90%)",
    youQualifyFor: "पात्र शासकीय योजना",
    schemeReasoningTitle: "ही योजना आपल्या व्यवसायासाठी का योग्य आहे:",
    keyParameters: "मुख्य निकष",
    interestRate: "वार्षिक व्याजदर",
    tenure: "कर्ज परतफेड कालावधी",
    moratoriumPeriod: "मोरेटोरियम (सूट कालावधी)",
    quarterlyEmi: "त्रैमासिक हप्ता (ईएमआय)",

    repaymentScheduleTitle: "त्रैमासिक कर्ज परतफेड वेळापत्रक",
    moratoriumNote: "मोरेटोरियम कालावधीत फक्त व्याजाचा भरणा करावा लागतो. मुद्दल परतफेड नंतर सुरू होते.",
    tableQuarter: "तिमाही",
    tableOpening: "सुरुवातीची बाकी",
    tablePrincipal: "मुद्दल भरणा",
    tableInterest: "व्याज भरणा",
    tableTotalEmi: "एकूण तिमाही हप्ता",
    tableClosing: "अखेरची बाकी",

    cashflowTitle: "मासिक रोख प्रवाह व व्यवसाय नफा",
    monthlyRevenue: "अंदाजे मासिक विक्री / उलाढाल",
    monthlyExpenses: "अंदाजे मासिक खर्च",
    netCashflow: "निव्वळ शिल्लक नफा",
    dscrLabel: "कर्ज सेवा कव्हरेज प्रमाण (DSCR)",
    dscrSafe: "सुरक्षित परतफेड क्षमता (DSCR > 1.5)",

    nextStepTitle: "बँक भेटीसाठी पुढील पावले",
    nextStepDesc: "हा अहवाल घेऊन आपल्या जवळच्या जिल्हा उद्योग केंद्र (DIC) किंवा बँक शाखेत जा.",
    findBranchBtn: "जवळची बँक शाखा शोधा",
    requiredDocuments: "आवश्यक कागदपत्रांची यादी",
    doc1: "आधार कार्ड व पॅन कार्ड",
    doc2: "ग्रामपंचायत रहिवासी दाखला",
    doc3: "मशिनरीचे अधिकृत कोटेशन",
    doc4: "या अहवालाची प्रिंट",
    disclaimer: "शासकीय योजना, सबसिडी व व्याजदर बँकेच्या अंतिम मंजुरीवर अवलंबून असतात.",

    exploreSchemes: "शासकीय योजना व बँकांची निवड करा",
    selectBank: "कर्ज देणारी बँक निवडा",
    schemeDetails: "योजनेचे तपशील व लाभ",
    subsidyAmount: "शासकीय अनुदान (सबसिडी)",
    viewSchemePortal: "शासकीय पोर्टल उघडा",
    eligibilityTitle: "पात्रता निकष",
    docChecklist: "लागणारी कागदपत्रे",
    askAiAboutScheme: "या योजनेबद्दल AI ला विचारा",
    aiAdvisorTitle: "ग्राम व्यापार AI सल्लागार",
    aiAdvisorSubtitle: "योजना, अनुदान व बँक नियमांवर थेट उत्तरे मिळवा",
    loginTitle: "लॉगिन / नोंदणी",
    loginDesc: "जतन केलेले अहवाल पाहण्यासाठी व मार्गदर्शन मिळवण्यासाठी लॉगिन करा",
    logout: "लॉग आउट"
  },

  bn: {
    portalTitle: "গ্রাম ব্যাপার",
    portalSubtitle: "সরকারি প্রকল্প ও ব্যবসায়িক সম্ভাব্যতা উপদেষ্টা",
    tagline: "গ্রামীণ ও আধা-শহুরে ক্ষুদ্র উদ্যোক্তাদের ক্ষমতায়ন",
    officialBadge: "এমএসএমই মন্ত্রণালয় ও গ্রামীণ ব্যাংকিং সহায়তা",
    langName: "বাংলা",

    step1Title: "১. ব্যবসার অবস্থান",
    step1Desc: "ভারতের গ্রাম, ব্লক বা জেলা",
    step2Title: "২. আপনার নিজস্ব মূলধন",
    step2Desc: "টাকায় আপনার ১০% নিজস্ব অনুদান",
    step3Title: "৩. ব্যবসার ধরণ",
    step3Desc: "আপনার পছন্দের ক্ষেত্র বা শিল্প নির্বাচন করুন",

    locationLabel: "গ্রাম / ব্লক / জেলা",
    locationPlaceholder: "যেমনঃ বর্ধমান, মেদিনীপুর বা বারাসাত",
    pincodeLabel: "পিন কোড (ঐচ্ছিক)",
    pincodePlaceholder: "যেমনঃ ৭০০০০১",
    useMyLocation: "জিপিএস অবস্থান ব্যবহার করুন",
    locDetecting: "অবস্থান শনাক্ত হচ্ছে...",

    marginLabel: "আপনার মার্জিন মূলধন (₹)",
    marginHint: "এটি আপনার সঞ্চয় (১০% নিজস্ব অংশ)। সরকার ৯০% পর্যন্ত ব্যাংক ঋণ দেয়।",
    quickMarginTip: "দ্রুত নির্বাচন:",
    totalCostPreview: "আনুমানিক মোট প্রকল্প ব্যয় (১০০%):",
    loanPreview: "যোগ্য সরকারি ব্যাংক ঋণ (৯০%):",

    businessLabel: "প্রস্তাবিত ব্যবসার ক্ষেত্র",
    selectCategory: "ব্যবসার ধরণ বেছে নিন",
    customCategoryPlaceholder: "নির্দিষ্ট ব্যবসার নাম লিখুন (যেমন বাঁশের কাজ)",
    applicantNameLabel: "উদ্যোক্তার নাম (ঐচ্ছিক)",
    applicantPhoneLabel: "মোবাইল নম্বর (রিপোর্ট সেভ করার জন্য)",
    generateReportBtn: "সম্ভাব্যতা ও ঋণ রিপোর্ট তৈরি করুন",
    generatingReport: "স্থানীয় বাজার বিশ্লেষণ ও ঋণ হিসাব চলছে...",

    tabFeasibility: "সম্ভাব্যতা রিপোর্ট",
    tabFinancial: "আর্থিক পরিকল্পনা ও প্রকল্পসমূহ",
    backToForm: "তথ্য সংশোধন",
    shareWhatsApp: "হোয়াটসঅ্যাপে শেয়ার করুন",
    downloadPdf: "ব্যাংক পিডিএফ ডাউনলোড",
    saveReport: "রিপোর্ট সেভ করুন",
    searchSaved: "সংরক্ষিত রিপোর্ট",

    marketReachTitle: "বাজারের পরিধি ও গ্রাহক",
    opportunityTitle: "স্থানীয় সুযোগ ও সম্ভাবনা",
    swotTitle: "SWOT বিশ্লেষণ",
    threatsTitle: "ঝুঁকি ও প্রতিকার",
    competitorTitle: "প্রতিযোগীদের পর্যালোচনা",
    productValueTitle: "ন্যায্য মূল্য ও লাভের হার",

    swotS: "শক্তি (Strengths)",
    swotW: "দুর্বলতা (Weaknesses)",
    swotO: "সুযোগ (Opportunities)",
    swotT: "ঝুঁকি (Threats)",
    showDetails: "বিস্তারিত দেখুন",
    hideDetails: "সংক্ষিপ্ত করুন",
    listenVoice: "অডিওতে শুনুন",
    stopVoice: "অডিও বন্ধ করুন",

    summaryMargin: "আপনার মার্জিন (১০%)",
    summaryProjectCost: "মোট প্রকল্প ব্যয় (১০০%)",
    summaryLoan: "যোগ্য ব্যাংক ঋণ (৯০%)",
    youQualifyFor: "উপযুক্ত সরকারি প্রকল্প",
    schemeReasoningTitle: "কেন এই প্রকল্পটি আপনার জন্য উপযুক্ত:",
    keyParameters: "মূল মানদণ্ড",
    interestRate: "বার্ষিক সুদের হার",
    tenure: "ঋণ পরিশোধের সময়কাল",
    moratoriumPeriod: "মোরেটোরিয়াম (ছাড়ের সময়)",
    quarterlyEmi: "ত্রৈমাসিক কিস্তি (ইএমআই)",

    repaymentScheduleTitle: "ত্রৈমাসিক ঋণ পরিশোধ তালিকা",
    moratoriumNote: "মোরেটোরিয়ামের সময় কেবল সুদের অর্থ দিতে হয়। আসল পরিশোধ পরে শুরু হয়।",
    tableQuarter: "ত্রৈমাসিক",
    tableOpening: "প্রাথমিক স্থিতি",
    tablePrincipal: "আসল পরিশোধ",
    tableInterest: "সুদ পরিশোধ",
    tableTotalEmi: "মোট কিস্তি",
    tableClosing: "সমাপ্তি স্থিতি",

    cashflowTitle: "মাসিক নগদ প্রবাহ ও লাভজনকতা",
    monthlyRevenue: "আনুমানিক মাসিক বিক্রয়",
    monthlyExpenses: "আনুমানিক মাসিক খরচ",
    netCashflow: "মাসিক নিট উদ্বৃত্ত",
    dscrLabel: "ঋণ সেবা কভারেজ অনুপাত (DSCR)",
    dscrSafe: "নিরাপদ পরিশোধ ক্ষমতা (DSCR > ১.৫)",

    nextStepTitle: "ব্যাংক আবেদনের পদক্ষেপ",
    nextStepDesc: "এই রিপোর্টটি নিয়ে নিকটস্থ জেলা শিল্প কেন্দ্র (DIC) বা ব্যাংক শাখায় যান।",
    findBranchBtn: "নিকটস্থ ব্যাংক শাখা খুঁজুন",
    requiredDocuments: "প্রয়োজনীয় নথিপত্র",
    doc1: "আধার কার্ড ও প্যান কার্ড",
    doc2: "গ্রাম পঞ্চায়েত সার্টিফিকেট",
    doc3: "মেশিনারিজের কোটেশন",
    doc4: "এই রিপোর্টের কপি",
    disclaimer: "সরকারি প্রকল্প ও সুদের হার ব্যাংকের অনুমোদন ও নিয়মের অধীন।",

    exploreSchemes: "সরকারি প্রকল্প ও ব্যাংক নির্বাচন করুন",
    selectBank: "ঋণদাতা ব্যাংক বেছে নিন",
    schemeDetails: "প্রকল্পের বিবরণ ও সুবিধা",
    subsidyAmount: "সরকারি অনুদান (ভর্তুকি)",
    viewSchemePortal: "অফিসিয়াল পোর্টাল দেখুন",
    eligibilityTitle: "যোগ্যতার শর্তাবলী",
    docChecklist: "প্রয়োজনীয় কাগজপত্র",
    askAiAboutScheme: "এই প্রকল্পে AI কে প্রশ্ন করুন",
    aiAdvisorTitle: "গ্রাম ব্যাপার AI সহায়ক",
    aiAdvisorSubtitle: "প্রকল্প, ভর্তুকি ও ব্যাংকের নিয়ম নিয়ে সরাসরি জানুন",
    loginTitle: "লগইন / রেজিস্টার",
    loginDesc: "রিপোর্ট ও পরামর্শ পেতে লগইন করুন",
    logout: "লগ আউট"
  },

  ta: {
    portalTitle: "கிராம வியாபாரம்",
    portalSubtitle: "அரசு திட்டம் & சாத்தியக்கூறு வழிகாட்டி",
    tagline: "கிராமப்புற மற்றும் சிறு தொழில்முனைவோர் மேம்பாடு",
    officialBadge: "MSME அமைச்சகம் & கிராமப்புற வங்கி வழிகாட்டுதல்",
    langName: "தமிழ்",

    step1Title: "1. தொழில் அமைவிடம்",
    step1Desc: "உங்கள் கிராமம், வட்டம் அல்லது மாவட்டம்",
    step2Title: "2. உங்கள் பங்கு மூலதனம்",
    step2Desc: "ரூபாயில் 10% உங்கள் சுய பங்களிப்பு",
    step3Title: "3. தொழில் வகை",
    step3Desc: "உங்கள் துறை அல்லது கைவினை தேர்வு செய்யவும்",

    locationLabel: "கிராமம் / வட்டம் / மாவட்டம்",
    locationPlaceholder: "எ.கா. பொள்ளாச்சி, கோவை அல்லது தஞ்சாவூர்",
    pincodeLabel: "அஞ்சல் குறியீடு (விருப்பமானது)",
    pincodePlaceholder: "எ.கா. 641001",
    useMyLocation: "GPS இருப்பிடத்தைப் பயன்படுத்துக",
    locDetecting: "இருப்பிடம் கண்டறியப்படுகிறது...",

    marginLabel: "உங்கள் இருப்பு பங்குத்தொகை (₹)",
    marginHint: "இது உங்கள் சேமிப்பு (10%). அரசு 90% வரை வங்கி கடன் வழங்குகிறது.",
    quickMarginTip: "விரைவு தேர்வு:",
    totalCostPreview: "மதிப்பிடப்பட்ட மொத்த திட்டச் செலவு (100%):",
    loanPreview: "தகுதியான அரசு வங்கி கடன் (90%):",

    businessLabel: "திட்டமிடப்பட்ட தொழில் வகை",
    selectCategory: "தொழில் வகையைத் தேர்வு செய்க",
    customCategoryPlaceholder: "குறிப்பிட்ட தொழில் பெயர் உள்ளிடவும்",
    applicantNameLabel: "தொழில்முனைவோர் பெயர் (விருப்பமானது)",
    applicantPhoneLabel: "மொபைல் எண் (அறிக்கையை சேமிக்க)",
    generateReportBtn: "சாத்தியக்கூறு மற்றும் திட்ட அறிக்கை பெறுக",
    generatingReport: "சந்தை பகுப்பாய்வு மற்றும் கடன் கணக்கீடு நடைபெறுகிறது...",

    tabFeasibility: "சாத்தியக்கூறு அறிக்கை",
    tabFinancial: "நிதி திட்டம் & திட்டங்கள்",
    backToForm: "விவரங்களை மாற்று",
    shareWhatsApp: "வாட்ஸ்அப்பில் பகிர்க",
    downloadPdf: "வங்கி PDF பதிவிறக்குக",
    saveReport: "அறிக்கையை சேமிக்க",
    searchSaved: "சேமிக்கப்பட்ட அறிக்கைகள்",

    marketReachTitle: "சந்தை அணுகல் & வாடிக்கையாளர்கள்",
    opportunityTitle: "உள்ளூர் வாய்ப்புகள்",
    swotTitle: "SWOT பகுப்பாய்வு",
    threatsTitle: "அபாயங்கள் & தீர்வுகள்",
    competitorTitle: "போட்டியாளர்கள் மதிப்பீடு",
    productValueTitle: "நியாயமான விலை & லாப வரம்பு",

    swotS: "பலங்கள் (Strengths)",
    swotW: "பலவீனங்கள் (Weaknesses)",
    swotO: "வாய்ப்புகள் (Opportunities)",
    swotT: "சவால்கள் (Threats)",
    showDetails: "விவரங்களை காண்க",
    hideDetails: "சுருக்குக",
    listenVoice: "குரல் வழியே கேட்க",
    stopVoice: "குரலை நிறுத்து",

    summaryMargin: "உங்கள் பங்கு (10%)",
    summaryProjectCost: "திட்டச் செலவு (100%)",
    summaryLoan: "வங்கி கடன் தகுதி (90%)",
    youQualifyFor: "பொருத்தமான அரசு திட்டம்",
    schemeReasoningTitle: "இத்திட்டம் உங்கள் தொழிலுக்கு எவ்வாறு பொருந்துகிறது:",
    keyParameters: "முக்கிய அளவீடுகள்",
    interestRate: "ஆண்டு வட்டி விகிதம்",
    tenure: "கடன் காலம்",
    moratoriumPeriod: "தவணைச் சலுகை காலம்",
    quarterlyEmi: "காலாண்டு தவணைத் தொகை",

    repaymentScheduleTitle: "காலாண்டு கடன் திருப்பிச் செலுத்தும் அட்டவணை",
    moratoriumNote: "சலுகை காலத்தில் வட்டி மட்டும் செலுத்தப்படும். அசல் தொகை பின்னர் தொடங்கும்.",
    tableQuarter: "காலாண்டு",
    tableOpening: "தொடக்க இருப்பு",
    tablePrincipal: "அசல் செலுத்தியது",
    tableInterest: "வட்டி செலுத்தியது",
    tableTotalEmi: "மொத்த காலாண்டு தவணை",
    tableClosing: "இறுதி இருப்பு",

    cashflowTitle: "மாதாந்திர பணப்புழக்கம் & சாத்தியக்கூறு",
    monthlyRevenue: "மதிப்பிடப்பட்ட மாதாந்திர விற்பனை",
    monthlyExpenses: "மதிப்பிடப்பட்ட மாதாந்திர செலவு",
    netCashflow: "நிகர உபரி லாபம்",
    dscrLabel: "கடன் சேவை பாதுகாப்பு விகிதம் (DSCR)",
    dscrSafe: "பாதுகாப்பான திருப்பிச் செலுத்தும் திறன் (DSCR > 1.5)",

    nextStepTitle: "வங்கி அணுகலுக்கான அடுத்த கட்டம்",
    nextStepDesc: "இந்த அறிக்கையுடன் மாவட்ட தொழில் மையம் (DIC) அல்லது வங்கி கிளைக்கு செல்லவும்.",
    findBranchBtn: "அருகிலுள்ள வங்கி கிளையைக் காண்க",
    requiredDocuments: "தேவையான ஆவணங்கள்",
    doc1: "ஆதார் அட்டை & பான் அட்டை",
    doc2: "கிராம ஊராட்சி இருப்பிடச் சான்றிதழ்",
    doc3: "இயந்திரங்கள் மற்றும் கருவிகளுக்கான விலைப்புள்ளி",
    doc4: "இந்த கிராம வியாபாரம் அறிக்கை",
    disclaimer: "அரசு மானியங்கள் மற்றும் வட்டி விகிதங்கள் வங்கி விதிமுறைகளுக்கு உட்பட்டவை.",

    exploreSchemes: "அரசு திட்டங்கள் & வங்கிகளை ஆராய்க",
    selectBank: "கடன் வழங்கும் வங்கியைத் தேர்வு செய்க",
    schemeDetails: "திட்ட விவரங்கள் & நன்மைகள்",
    subsidyAmount: "அரசு மூலதன மானியம்",
    viewSchemePortal: "அதிகாரப்பூர்வ இணையதளம்",
    eligibilityTitle: "தகுதி நிபந்தனைகள்",
    docChecklist: "தேவைப்படும் ஆவணங்கள்",
    askAiAboutScheme: "இந்த திட்டம் குறித்து AI-யிடம் கேட்கவும்",
    aiAdvisorTitle: "கிராம வியாபாரம் AI வழிகாட்டி",
    aiAdvisorSubtitle: "திட்டங்கள், மானியங்கள் மற்றும் வங்கி விதிகள் பற்றி கேளுங்கள்",
    loginTitle: "உள்நுழைக / பதிவு செய்க",
    loginDesc: "சேமித்த அறிக்கைகளைப் பார்க்க உள்நுழையவும்",
    logout: "வெளியேறு"
  },

  te: {
    portalTitle: "గ్రామ వ్యాపార",
    portalSubtitle: "ప్రభుత్వ పథకాలు & సాధ్యాసాధ్యాల సలహాదారు",
    tagline: "గ్రామీణ మరియు చిన్న తరహా పారిశ్రామికవేత్తల సాధికారత",
    officialBadge: "MSME మంత్రిత్వ శాఖ & గ్రామీణ బ్యాంకింగ్ మార్గదర్శకత్వం",
    langName: "తెలుగు",

    step1Title: "1. వ్యాపార స్థలం",
    step1Desc: "మీ గ్రామం, మండలం లేదా జిల్లా",
    step2Title: "2. మీ మార్జిన్ పెట్టుబడి",
    step2Desc: "₹ లో మీ 10% సొంత పెట్టుబడి",
    step3Title: "3. వ్యాపార వర్గం",
    step3Desc: "మీ రంగం లేదా నైపుణ్యాన్ని ఎంచుకోండి",

    locationLabel: "గ్రామం / మండలం / జిల్లా",
    locationPlaceholder: "ఉదా. బాపట్ల, గుంటూరు లేదా సిద్దిపేట",
    pincodeLabel: "పిన్ కోడ్ (ఐచ్ఛికం)",
    pincodePlaceholder: "ఉదా. 500001",
    useMyLocation: "GPS స్థానాన్ని ఉపయోగించండి",
    locDetecting: "స్థానాన్ని గుర్తిస్తోంది...",

    marginLabel: "మీ వద్ద ఉన్న మార్జిన్ మూలధనం (₹)",
    marginHint: "ఇది మీ సొంత పొదుపు (10%). ప్రభుత్వం 90% వరకు బ్యాంకు రుణాన్ని అందిస్తుంది.",
    quickMarginTip: "త్వరిత ఎంపిక:",
    totalCostPreview: "అంచనా మొత్తం ప్రాజెక్ట్ వ్యయం (100%):",
    loanPreview: "అర్హతగల ప్రభుత్వ బ్యాంకు రుణం (90%):",

    businessLabel: "ప్రతిపాదిత వ్యాపార వర్గం",
    selectCategory: "వ్యాపార రకాన్ని ఎంచుకోండి",
    customCategoryPlaceholder: "నిర్దిష్ట వ్యాపార పేరు రాయండి",
    applicantNameLabel: "పారిశ్రామికవేత్త పేరు (ఐచ్ఛికం)",
    applicantPhoneLabel: "మొబైల్ నంబర్ (నివేదికను దాచడానికి)",
    generateReportBtn: "సాధ్యాసాధ్యాలు & పథక నివేదిక పొందండి",
    generatingReport: "స్థానిక మార్కెట్ విశ్లేషణ మరియు రుణ గణన జరుగుతోంది...",

    tabFeasibility: "సాధ్యాసాధ్యాల నివేదిక",
    tabFinancial: "ఆర్థిక ప్రణాళిక & పథకాలు",
    backToForm: "వివరాలను మార్చండి",
    shareWhatsApp: "వాట్సాప్‌లో భాగస్వామ్యం చేయండి",
    downloadPdf: "బ్యాంక్ PDF డౌన్‌లోడ్",
    saveReport: "నివేదికను దాచండి",
    searchSaved: "సేవ్ చేసిన నివేదికలు",

    marketReachTitle: "మార్కెట్ పరిధి & వినియోగదారులు",
    opportunityTitle: "స్థానిక అవకాశాలు",
    swotTitle: "SWOT విశ్లేషణ",
    threatsTitle: "నష్టభయాలు & పరిష్కారాలు",
    competitorTitle: "పోటీదారుల అంచనా",
    productValueTitle: "ధర & లాభాల అంచనా",

    swotS: "బలాలు (Strengths)",
    swotW: "బలహీనతలు (Weaknesses)",
    swotO: "అవకాశాలు (Opportunities)",
    swotT: "సవాళ్లు (Threats)",
    showDetails: "వివరాలు చూడండి",
    hideDetails: "దాచండి",
    listenVoice: "వాయిస్ వినండి",
    stopVoice: "వాయిస్ ఆపండి",

    summaryMargin: "మీ వాటా (10%)",
    summaryProjectCost: "ప్రాజెక్ట్ ఖర్చు (100%)",
    summaryLoan: "బ్యాంకు రుణం (90%)",
    youQualifyFor: "అర్హతగల ప్రభుత్వ పథకం",
    schemeReasoningTitle: "ఈ పథకం మీ వ్యాపారానికి ఎందుకు సరిపోతుంది:",
    keyParameters: "ముఖ్య నిబంధనలు",
    interestRate: "వార్షిక వడ్డీ రేటు",
    tenure: "రుణ కాలపరిమితి",
    moratoriumPeriod: "మొరటోరియం (మినహాయింపు కాలం)",
    quarterlyEmi: "త్రైమాసిక వాయిదా (EMI)",

    repaymentScheduleTitle: "త్రైమాసిక రుణ చెల్లింపుల షెడ్యూల్",
    moratoriumNote: "మొరటోరియం కాలంలో వడ్డీ మాత్రమే చెల్లించబడుతుంది. అసలు చెల్లింపు తర్వాత ప్రారంభమవుతుంది.",
    tableQuarter: "త్రైమాసికం",
    tableOpening: "ప్రారంభ నిల్వ",
    tablePrincipal: "అసలు చెల్లింపు",
    tableInterest: "వడ్డీ చెల్లింపు",
    tableTotalEmi: "మొత్తం వాయిదా",
    tableClosing: "ముగింపు నిల్వ",

    cashflowTitle: "నెలవారీ నగదు ప్రవాహం & లాభదాయకత",
    monthlyRevenue: "అంచనా నెలవారీ అమ్మకాలు",
    monthlyExpenses: "అంచనా నెలవారీ ఖర్చులు",
    netCashflow: "నికర నెలవారీ మిగులు",
    dscrLabel: "రుణ సేవా కవరేజ్ నిష్పత్తి (DSCR)",
    dscrSafe: "సురక్షిత చెల్లింపు సామర్థ్యం (DSCR > 1.5)",

    nextStepTitle: "బ్యాంకు దరఖాస్తుకు తదుపరి చర్యలు",
    nextStepDesc: "ఈ నివేదికతో మీ సమీప జిల్లా పరిశ్రమల కేంద్రం (DIC) లేదా బ్యాంకును సంప్రదించండి.",
    findBranchBtn: "సమీప బ్యాంక్ బ్రాంచ్ కనుగొనండి",
    requiredDocuments: "అవసరమైన పత్రాలు",
    doc1: "ఆధార్ కార్డు మరియు పాన్ కార్డు",
    doc2: "గ్రామ పంచాయతీ నివాస ధృవీకరణ పత్రం",
    doc3: "యంత్రాల అధికారిక కొటేషన్లు",
    doc4: "ఈ నివేదిక ముద్రణ ప్రతి",
    disclaimer: "ప్రభుత్వ పథకాలు, సబ్సిడీలు మరియు వడ్డీ రేట్లు బ్యాంకు మార్గదర్శకాలకు లోబడి ఉంటాయి.",

    exploreSchemes: "ప్రభుత్వ పథకాలు & బ్యాంకులను అన్వేషించండి",
    selectBank: "రుణం ఇచ్చే బ్యాంకును ఎంచుకోండి",
    schemeDetails: "పథకం వివరాలు & ప్రయోజనాలు",
    subsidyAmount: "ప్రభుత్వ మూలధన సబ్సిడీ",
    viewSchemePortal: "అధికారిక వెబ్‌సైట్‌ను సందర్శించండి",
    eligibilityTitle: "అర్హత నిబంధనలు",
    docChecklist: "అవసరమైన డాక్యుమెంట్లు",
    askAiAboutScheme: "ఈ పథకంపై AI ని అడగండి",
    aiAdvisorTitle: "గ్రామ వ్యాపార AI సహాయక్",
    aiAdvisorSubtitle: "పథకాలు, సబ్సిడీలు మరియు బ్యాంకింగ్ నిబంధనలపై తక్షణ సమాధానాలు",
    loginTitle: "లాగిన్ / రిజిస్ట్రేషన్",
    loginDesc: "సేవ్ చేసిన నివేదికలను యాక్సెస్ చేయడానికి లాగిన్ అవ్వండి",
    logout: "లాగ్ అవుట్"
  },

  gu: {
    portalTitle: "ગ્રામ વ્યાપાર",
    portalSubtitle: "સરકારી યોજના અને વ્યવહાર્યતા સલાહકાર",
    tagline: "ગ્રામીણ અને અર્ધ-શહેરી સૂક્ષ્મ ઉદ્યોગસાહસિકોનું સશક્તિકરણ",
    officialBadge: "MSME મંત્રાલય અને ગ્રામીણ બેંકિંગ માર્ગદર્શન",
    langName: "ગુજરાતી",

    step1Title: "1. વ્યવસાયનું સ્થળ",
    step1Desc: "તમારું ગામ, તાલુકો અથવા જિલ્લો",
    step2Title: "2. તમારું માર્જિન નાણાં",
    step2Desc: "રૂપિયામાં 10% તમારું પોતાનું યોગદાન",
    step3Title: "3. વ્યવસાયની શ્રેણી",
    step3Desc: "તમારું ક્ષેત્ર અથવા હસ્તકલા પસંદ કરો",

    locationLabel: "ગામ / તાલુકો / જિલ્લો",
    locationPlaceholder: "દા.ત. બારડોલી, સુરત અથવા આણંદ",
    pincodeLabel: "પિન કોડ (વૈકલ્પિક)",
    pincodePlaceholder: "દા.ત. 380001",
    useMyLocation: "GPS સ્થાનનો ઉપયોગ કરો",
    locDetecting: "સ્થાન શોધી રહ્યું છે...",

    marginLabel: "તમારી ઉપલબ્ધ માર્જિન મૂડી (₹)",
    marginHint: "આ તમારી પોતાની બચત છે (10%). સરકાર 90% સુધી બેંક લોન આપે છે.",
    quickMarginTip: "ઝડપી પસંદગી:",
    totalCostPreview: "કુલ અંદાજિત પ્રોજેક્ટ ખર્ચ (100%):",
    loanPreview: "પાત્ર સરકારી બેંક લોન (90%):",

    businessLabel: "સૂચિત વ્યવસાય શ્રેણી",
    selectCategory: "વ્યવસાયનો પ્રકાર પસંદ કરો",
    customCategoryPlaceholder: "ચોક્કસ વ્યવસાયનું નામ લખો",
    applicantNameLabel: "ઉદ્યોગસાહસિકનું નામ (વૈકલ્પિક)",
    applicantPhoneLabel: "મોબાઇલ નંબર (રિપોર્ટ સાચવવા માટે)",
    generateReportBtn: "વ્યવહાર્યતા અને લોન રિપોર્ટ મેળવો",
    generatingReport: "બજાર વિશ્લેષણ અને લોન ગણતરી ચાલુ છે...",

    tabFeasibility: "વ્યવહાર્યતા અહેવાલ",
    tabFinancial: "નાણાકીય યોજના અને યોજનાઓ",
    backToForm: "વિગતો બદલો",
    shareWhatsApp: "વોટ્સએપ પર શેર કરો",
    downloadPdf: "બેંક PDF ડાઉનલોડ કરો",
    saveReport: "રિપોર્ટ સાચવો",
    searchSaved: "સાચવેલા રિપોર્ટ્સ",

    marketReachTitle: "બજાર પહોંચ અને ગ્રાહકો",
    opportunityTitle: "સ્થાનિક તકો",
    swotTitle: "SWOT વિશ્લેષણ",
    threatsTitle: "જોખમો અને ઉપાયો",
    competitorTitle: "સ્થાનિક હરીફાઈ નકશો",
    productValueTitle: "વાજબી કિંમત અને નફાનો અંદાજ",

    swotS: "શક્તિ (Strengths)",
    swotW: "નબળાઈઓ (Weaknesses)",
    swotO: "તકો (Opportunities)",
    swotT: "પડકારો (Threats)",
    showDetails: "વિગતો જુઓ",
    hideDetails: "સંક્ષિપ્ત કરો",
    listenVoice: "અવાજ સાંભળો",
    stopVoice: "અવાજ બંધ કરો",

    summaryMargin: "તમારું માર્જિન (10%)",
    summaryProjectCost: "કુલ પ્રોજેક્ટ ખર્ચ (100%)",
    summaryLoan: "પાત્ર બેંક લોન (90%)",
    youQualifyFor: "યોગ્ય સરકારી યોજના",
    schemeReasoningTitle: "આ યોજના તમારા વ્યવસાય માટે કેમ યોગ્ય છે:",
    keyParameters: "મુખ્ય માપદંડો",
    interestRate: "વાર્ષિક વ્યાજ દર",
    tenure: "લોન ચૂકવણી સમયગાળો",
    moratoriumPeriod: "મોરેટોરિયમ (છૂટછાટ ગાળો)",
    quarterlyEmi: "ત્રિમાસિક હપ્તો (EMI)",

    repaymentScheduleTitle: "ત્રિમાસિક લોન ચુકવણી સમયપત્રક",
    moratoriumNote: "મોરેટોરિયમ સમયગાળા દરમિયાન માત્ર વ્યાજ ચૂકવવાનું રહે છે. મુદ્દલ ચુકવણી પછી શરૂ થાય છે.",
    tableQuarter: "ત્રિમાસિક",
    tableOpening: "શરૂઆતની બાકી",
    tablePrincipal: "મુદ્દલ ચુકવણી",
    tableInterest: "વ્યાજ ચુકવણી",
    tableTotalEmi: "કુલ હપ્તો",
    tableClosing: "આખરી બાકી",

    cashflowTitle: "માસિક રોકડ પ્રવાહ અને નફાકારકતા",
    monthlyRevenue: "અંદાજિત માસિક વેચાણ",
    monthlyExpenses: "અંદાજિત માસિક ખર્ચ",
    netCashflow: "ચોખ્ખો માસિક નફો",
    dscrLabel: "ડેટ સર્વિસ કવરેજ રેશિયો (DSCR)",
    dscrSafe: "સુરક્ષિત ચુકવણી ક્ષમતા (DSCR > 1.5)",

    nextStepTitle: "બેંક લોન અરજી માટેના પગલાં",
    nextStepDesc: "આ રિપોર્ટ લઈને તમારા નજીકના જિલ્લા ઉદ્યોગ કેન્દ્ર (DIC) અથવા બેંક શાખાની મુલાકાત લો.",
    findBranchBtn: "નજીકની બેંક શાખા શોધો",
    requiredDocuments: "જરૂરી દસ્તાવેજોની યાદી",
    doc1: "આધાર કાર્ડ અને પાન કાર્ડ",
    doc2: "ગ્રામ પંચાયત રહેઠાણ પ્રમાણપત્ર",
    doc3: "મશીનરીના અધિકૃત ક્વોટેશન",
    doc4: "આ અહેવાલની પ્રિન્ટ",
    disclaimer: "સરકારી યોજનાઓ, સબસિડી અને વ્યાજ દરો બેંકના નિયમોને આધીન છે.",

    exploreSchemes: "સરકારી યોજનાઓ અને બેંકો પસંદ કરો",
    selectBank: "લોન આપતી બેંક પસંદ કરો",
    schemeDetails: "યોજનાની વિગતો અને લાભો",
    subsidyAmount: "સરકારી મૂડી સબસિડી",
    viewSchemePortal: "સત્તાવાર પોર્ટલની મુલાકાત લો",
    eligibilityTitle: "પાત્રતાના માપદંડો",
    docChecklist: "જરૂરી કાગળો",
    askAiAboutScheme: "આ યોજના વિશે AI ને પૂછો",
    aiAdvisorTitle: "ગ્રામ વ્યાપાર AI સહાયક",
    aiAdvisorSubtitle: "યોજનાઓ, સબસિડી અને બેંકિંગ નિયમો પર ઝડપી જવાબો મેળવો",
    loginTitle: "લૉગિન / નોંધણી",
    loginDesc: "સાચવેલા અહેવાલો જોવા માટે લૉગિન કરો",
    logout: "લૉગ આઉટ"
  },

  kn: {
    portalTitle: "ಗ್ರಾಮ ವ್ಯಾಪಾರ",
    portalSubtitle: "ಸರ್ಕಾರಿ ಯೋಜನೆ ಮತ್ತು ಕಾರ್ಯಸಾಧ್ಯತಾ ಸಲಹೆಗಾರ",
    tagline: "ಗ್ರಾಮೀಣ ಮತ್ತು ಅರೆ-ನಗರ ಸೂಕ್ಷ್ಮ ಉದ್ಯಮಿಗಳ ಸಬಲೀಕರಣ",
    officialBadge: "MSME ಸಚಿವಾಲಯ ಮತ್ತು ಗ್ರಾಮೀಣ ಬ್ಯಾಂಕಿಂಗ್ ಮಾರ್ಗದರ್ಶನ",
    langName: "ಕನ್ನಡ",

    step1Title: "1. ವ್ಯಾಪಾರ ಸ್ಥಳ",
    step1Desc: "ನಿಮ್ಮ ಗ್ರಾಮ, ತಾಲೂಕು ಅಥವಾ ಜಿಲ್ಲೆ",
    step2Title: "2. ನಿಮ್ಮ ಮಾರ್ಜಿನ್ ಬಂಡವಾಳ",
    step2Desc: "ರೂಪಾಯಿಗಳಲ್ಲಿ ನಿಮ್ಮ 10% ಸ್ವಂತ ಕೊಡುಗೆ",
    step3Title: "3. ವ್ಯಾಪಾರ ವರ್ಗ",
    step3Desc: "ನಿಮ್ಮ ಕ್ಷೇತ್ರ ಅಥವಾ ಕರಕುಶಲತೆಯನ್ನು ಆರಿಸಿ",

    locationLabel: "ಗ್ರಾಮ / ತಾಲೂಕು / ಜಿಲ್ಲೆ",
    locationPlaceholder: "ಉದಾ. ಮಂಡ್ಯ, ಮೈಸೂರು ಅಥವಾ ಧಾರವಾಡ",
    pincodeLabel: "ಪಿನ್ ಕೋಡ್ (ಐಚ್ಛಿಕ)",
    pincodePlaceholder: "ಉದಾ. 560001",
    useMyLocation: "GPS ಸ್ಥಳವನ್ನು ಬಳಸಿ",
    locDetecting: "ಸ್ಥಳವನ್ನು ಗುರುತಿಸಲಾಗುತ್ತಿದೆ...",

    marginLabel: "ನಿಮ್ಮ ಲಭ್ಯವಿರುವ ಮಾರ್ಜಿನ್ ಬಂಡವಾಳ (₹)",
    marginHint: "ಇದು ನಿಮ್ಮ ಸ್ವಂತ ಉಳಿತಾಯ (10%). ಸರ್ಕಾರವು 90% ರವರೆಗೆ ಸಾಲವನ್ನು ನೀಡುತ್ತದೆ.",
    quickMarginTip: "ತ್ವರಿತ ಆಯ್ಕೆ:",
    totalCostPreview: "ಅಂದಾಜು ಒಟ್ಟು ಯೋಜನಾ ವೆಚ್ಚ (100%):",
    loanPreview: "ಅರ್ಹ ಸರ್ಕಾರಿ ಬ್ಯಾಂಕ್ ಸಾಲ (90%):",

    businessLabel: "ಪ್ರಸ್ತಾಪಿತ ವ್ಯಾಪಾರ ವರ್ಗ",
    selectCategory: "ವ್ಯಾಪಾರದ ಪ್ರಕಾರವನ್ನು ಆರಿಸಿ",
    customCategoryPlaceholder: "ನಿರ್ದಿಷ್ಟ ವ್ಯಾಪಾರ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
    applicantNameLabel: "ಉದ್ಯಮಿಯ ಹೆಸರು (ಐಚ್ಛಿಕ)",
    applicantPhoneLabel: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ (ವರದಿ ಉಳಿಸಲು)",
    generateReportBtn: "ಕಾರ್ಯಸಾಧ್ಯತೆ ಮತ್ತು ಸಾಲದ ವರದಿ ಪಡೆಯಿರಿ",
    generatingReport: "ಮಾರುಕಟ್ಟೆ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಸಾಲದ ಲೆಕ್ಕಾಚಾರ ನಡೆಯುತ್ತಿದೆ...",

    tabFeasibility: "ಕಾರ್ಯಸಾಧ್ಯತಾ ವರದಿ",
    tabFinancial: "ಹಣಕಾಸು ಯೋಜನೆ ಮತ್ತು ಯೋಜನೆಗಳು",
    backToForm: "ವಿವರಗಳನ್ನು ಬದಲಾಯಿಸಿ",
    shareWhatsApp: "ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ",
    downloadPdf: "ಬ್ಯಾಂಕ್ PDF ಡೌನ್‌ಲೋಡ್",
    saveReport: "ವರದಿ ಉಳಿಸಿ",
    searchSaved: "ಉಳಿಸಿದ ವರದಿಗಳು",

    marketReachTitle: "ಮಾರುಕಟ್ಟೆ ವ್ಯಾಪ್ತಿ ಮತ್ತು ಗ್ರಾಹಕರು",
    opportunityTitle: "ಸ್ಥಳೀಯ ಅವಕಾಶಗಳು",
    swotTitle: "SWOT ವಿಶ್ಲೇಷಣೆ",
    threatsTitle: "ಅಪಾಯಗಳು ಮತ್ತು ಪರಿಹಾರಗಳು",
    competitorTitle: "ಸ್ಪರ್ಧಿಗಳ ನಕ್ಷೆ",
    productValueTitle: "ಬೆಲೆ ಮತ್ತು ಲಾಭದ ಅಂದಾಜು",

    swotS: "ಸಾಮರ್ಥ್ಯಗಳು (Strengths)",
    swotW: "ದೌರ್ಬಲ್ಯಗಳು (Weaknesses)",
    swotO: "ಅವಕಾಶಗಳು (Opportunities)",
    swotT: "ಸವಾಲುಗಳು (Threats)",
    showDetails: "ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    hideDetails: "ಮರೆಮಾಡಿ",
    listenVoice: "ಧ್ವನಿಯಲ್ಲಿ ಆಲಿಸಿ",
    stopVoice: "ಧ್ವನಿ ನಿಲ್ಲಿಸಿ",

    summaryMargin: "ನಿಮ್ಮ ಮಾರ್ಜಿನ್ (10%)",
    summaryProjectCost: "ಒಟ್ಟು ಯೋಜನಾ ವೆಚ್ಚ (100%)",
    summaryLoan: "ಅರ್ಹ ಬ್ಯಾಂಕ್ ಸಾಲ (90%)",
    youQualifyFor: "ಅರ್ಹ ಸರ್ಕಾರಿ ಯೋಜನೆ",
    schemeReasoningTitle: "ಈ ಯೋಜನೆಯು ನಿಮ್ಮ ಉದ್ಯಮಕ್ಕೆ ಏಕೆ ಸೂಕ್ತವಾಗಿದೆ:",
    keyParameters: "ಮುಖ್ಯ ಮಾನದಂಡಗಳು",
    interestRate: "ವಾರ್ಷಿಕ ಬಡ್ಡಿ ದರ",
    tenure: "ಸಾಲ ಮರುಪಾವತಿ ಅವಧಿ",
    moratoriumPeriod: "ಮೊರಟೋರಿಯಂ (ರಿಯಾಯಿತಿ ಅವಧಿ)",
    quarterlyEmi: "ತ್ರೈಮಾಸಿಕ ಕಂತು (EMI)",

    repaymentScheduleTitle: "ತ್ರೈಮಾಸಿಕ ಸಾಲ ಮರುಪಾವತಿ ವೇಳಾಪಟ್ಟಿ",
    moratoriumNote: "ರಿಯಾಯಿತಿ ಅವಧಿಯಲ್ಲಿ ಬಡ್ಡಿಯನ್ನು ಮಾತ್ರ ಪಾವತಿಸಲಾಗುತ್ತದೆ. ಅಸಲು ಮರುಪಾವತಿ ನಂತರ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ.",
    tableQuarter: "ತ್ರೈಮಾಸಿಕ",
    tableOpening: "ಆರಂಭಿಕ ಬಾಕಿ",
    tablePrincipal: "ಪಾವತಿಸಿದ ಅಸಲು",
    tableInterest: "ಪಾವತಿಸಿದ ಬಡ್ಡಿ",
    tableTotalEmi: "ಒಟ್ಟು ತ್ರೈಮಾಸಿಕ ಕಂತು",
    tableClosing: "ಅಂತಿಮ ಬಾಕಿ",

    cashflowTitle: "ಮಾಸಿಕ ನಗದು ಹರಿವು ಮತ್ತು ಲಾಭದಾಯಕತೆ",
    monthlyRevenue: "ಅಂದಾಜು ಮಾಸಿಕ ಮಾರಾಟ",
    monthlyExpenses: "ಅಂದಾಜು ಮಾಸಿಕ ವೆಚ್ಚ",
    netCashflow: "ನಿವ್ವಳ ಮಾಸಿಕ ಉಳಿತಾಯ",
    dscrLabel: "ಸಾಲ ಸೇವಾ ವ್ಯಾಪ್ತಿ ಅನುಪಾತ (DSCR)",
    dscrSafe: "ಸುರಕ್ಷಿತ ಮರುಪಾವತಿ ಸಾಮರ್ಥ್ಯ (DSCR > 1.5)",

    nextStepTitle: "ಬ್ಯಾಂಕ್ ಸಾಲಕ್ಕಾಗಿ ಮುಂದಿನ ಕ್ರಮಗಳು",
    nextStepDesc: "ಈ ವರದಿಯೊಂದಿಗೆ ನಿಮ್ಮ ಹತ್ತಿರದ ಜಿಲ್ಲಾ ಕೈಗಾರಿಕಾ ಕೇಂದ್ರ (DIC) ಅಥವಾ ಬ್ಯಾಂಕ್ ಶಾಖೆಯನ್ನು ಭೇಟಿ ಮಾಡಿ.",
    findBranchBtn: "ಹತ್ತಿರದ ಬ್ಯಾಂಕ್ ಶಾಖೆಯನ್ನು ಹುಡುಕಿ",
    requiredDocuments: "ಅಗತ್ಯ ದಾಖಲೆಗಳು",
    doc1: "ಆಧಾರ್ ಕಾರ್ಡ್ ಮತ್ತು ಪಾನ್ ಕಾರ್ಡ್",
    doc2: "ಗ್ರಾಮ ಪಂಚಾಯತ್ ವಾಸಸ್ಥಳ ಪ್ರಮಾಣಪತ್ರ",
    doc3: "ಯಂತ್ರೋಪಕರಣಗಳ ಅಧಿಕೃತ ಕೊಟೇಶನ್",
    doc4: "ಈ ವರದಿಯ ಮುದ್ರಿತ ಪ್ರತಿ",
    disclaimer: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು ಮತ್ತು ಬಡ್ಡಿ ದರಗಳು ಬ್ಯಾಂಕ್ ನಿಯಮಗಳಿಗೆ ಒಳಪಟ್ಟಿರುತ್ತವೆ.",

    exploreSchemes: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು ಮತ್ತು ಬ್ಯಾಂಕ್‌ಗಳನ್ನು ಅನ್ವೇಷಿಸಿ",
    selectBank: "ಸಾಲ ನೀಡುವ ಬ್ಯಾಂಕ್ ಆಯ್ಕೆಮಾಡಿ",
    schemeDetails: "ಯೋಜನೆಯ ವಿವರಗಳು ಮತ್ತು ಪ್ರಯೋಜನಗಳು",
    subsidyAmount: "ಸರ್ಕಾರಿ ಬಂಡವಾಳ ಸಬ್ಸಿಡಿ",
    viewSchemePortal: "ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ಗೆ ಭೇಟಿ ನೀಡಿ",
    eligibilityTitle: "ಅರ್ಹತಾ ಮಾನದಂಡಗಳು",
    docChecklist: "ಅಗತ್ಯ ದಾಖಲೆಗಳು",
    askAiAboutScheme: "ಈ ಯೋಜನೆಯ ಬಗ್ಗೆ AI ಅನ್ನು ಕೇಳಿ",
    aiAdvisorTitle: "ಗ್ರಾಮ ವ್ಯಾಪಾರ AI ಸಹಾಯಕ",
    aiAdvisorSubtitle: "ಯೋಜನೆಗಳು, ಸಬ್ಸಿಡಿಗಳು ಮತ್ತು ಬ್ಯಾಂಕಿಂಗ್ ನಿಯಮಗಳ ಬಗ್ಗೆ ತಕ್ಷಣ ಮಾಹಿತಿ ಪಡೆಯಿರಿ",
    loginTitle: "ಲಾಗಿನ್ / ನೋಂದಣಿ",
    loginDesc: "ಉಳಿಸಿದ ವರದಿಗಳನ್ನು ನೋಡಲು ಲಾಗಿನ್ ಆಗಿ",
    logout: "ಲಾಗ್ ಔಟ್"
  },

  ml: {
    portalTitle: "ഗ്രാമ വ്യാപാരം",
    portalSubtitle: "സർക്കാർ പദ്ധതി & ബിസിനസ് സാധ്യതാ ഉപദേശകൻ",
    tagline: "ഗ്രാമീണ, ചെറുകിട സംരംഭകരുടെ ശാക്തീകരണം",
    officialBadge: "MSME മന്ത്രാലയവും ഗ്രാമീണ ബാങ്കിംഗ് മാർഗ്ഗനിർദ്ദേശവും",
    langName: "മലയാളം",

    step1Title: "1. സംരംഭത്തിന്റെ സ്ഥലം",
    step1Desc: "നിങ്ങളുടെ ഗ്രാമം, ബ്ലോക്ക് അല്ലെങ്കിൽ ജില്ല",
    step2Title: "2. നിങ്ങളുടെ മൂലധനം",
    step2Desc: "രൂപയിൽ നിങ്ങളുടെ 10% സ്വന്തം വിഹിതം",
    step3Title: "3. ബിസിനസ് വിഭാഗം",
    step3Desc: "നിങ്ങളുടെ മേഖലയോ തൊഴിലോ തിരഞ്ഞെടുക്കുക",

    locationLabel: "ഗ്രാമം / ബ്ലോക്ക് / ജില്ല",
    locationPlaceholder: "ഉദാ. പാലക്കാട്, വയനാട് അല്ലെങ്കിൽ കോട്ടയം",
    pincodeLabel: "പിൻ കോഡ് (നിർബന്ധമില്ല)",
    pincodePlaceholder: "ഉദാ. 682001",
    useMyLocation: "GPS ലൊക്കേഷൻ ഉപയോഗിക്കുക",
    locDetecting: "ലൊക്കേഷൻ കണ്ടെത്തുന്നു...",

    marginLabel: "നിങ്ങളുടെ ലഭ്യമായ മാർജിൻ തുക (₹)",
    marginHint: "ഇത് നിങ്ങളുടെ സമ്പാദ്യമാണ് (10%). ബാക്കി 90% വരെ ബാങ്ക് വായ്പ ലഭിക്കും.",
    quickMarginTip: "വേഗത്തിൽ തിരഞ്ഞെടുക്കാം:",
    totalCostPreview: "ആകെ കണക്കാക്കിയ പ്രോജക്ട് ചെലവ് (100%):",
    loanPreview: "അർഹമായ സർക്കാർ ബാങ്ക് വായ്പ (90%):",

    businessLabel: "നിർദ്ദിഷ്ട ബിസിനസ് വിഭാഗം",
    selectCategory: "ബിസിനസ്സ് തരം തിരഞ്ഞെടുക്കുക",
    customCategoryPlaceholder: "നിർദ്ദിഷ്ട സംരംഭത്തിന്റെ പേര് നൽകുക",
    applicantNameLabel: "സംരംഭകന്റെ പേര് (നിർബന്ധമില്ല)",
    applicantPhoneLabel: "മൊബൈൽ നമ്പർ (റിപ്പോർട്ട് സൂക്ഷിക്കാൻ)",
    generateReportBtn: "സാധ്യതാ റിപ്പോർട്ട് തയ്യാറാക്കുക",
    generatingReport: "വിപണി വിശകലനവും വായ്പ കണക്കുകൂട്ടലും പുരോഗമിക്കുന്നു...",

    tabFeasibility: "സാധ്യതാ റിപ്പോർട്ട്",
    tabFinancial: "സാമ്പത്തിക പ്ലാനും പദ്ധതികളും",
    backToForm: "വിവരങ്ങൾ തിരുത്തുക",
    shareWhatsApp: "വാട്ട്‌സ്ആപ്പിൽ ഷെയർ ചെയ്യുക",
    downloadPdf: "ബാങ്ക് PDF ഡൗൺലോഡ് ചെയ്യുക",
    saveReport: "റിപ്പോർട്ട് സൂക്ഷിക്കുക",
    searchSaved: "സൂക്ഷിച്ച റിപ്പോർട്ടുകൾ",

    marketReachTitle: "വിപണി വ്യാപ്തിയും ഉപഭോക്താക്കളും",
    opportunityTitle: "പ്രാദേശിക അവസരങ്ങൾ",
    swotTitle: "SWOT വിശകലനം",
    threatsTitle: "വെല്ലുവിളികളും പരിഹാരങ്ങളും",
    competitorTitle: "മത്സര വിശകലനം",
    productValueTitle: "വിലയും ലാഭ പ്രതീക്ഷയും",

    swotS: "ശക്തികൾ (Strengths)",
    swotW: "ബലഹീനതകൾ (Weaknesses)",
    swotO: "അവസരങ്ങൾ (Opportunities)",
    swotT: "വെല്ലുവിളികൾ (Threats)",
    showDetails: "വിശദാംശങ്ങൾ കാണുക",
    hideDetails: "ചുരുക്കുക",
    listenVoice: "ശബ്ദത്തിൽ കേൾക്കുക",
    stopVoice: "ശബ്ദം നിർത്തുക",

    summaryMargin: "നിങ്ങളുടെ വിഹിതം (10%)",
    summaryProjectCost: "ആകെ പദ്ധതി ചെലവ് (100%)",
    summaryLoan: "അർഹമായ ബാങ്ക് വായ്പ (90%)",
    youQualifyFor: "യോജിച്ച സർക്കാർ പദ്ധതി",
    schemeReasoningTitle: "ഈ പദ്ധതി നിങ്ങളുടെ സംരംഭത്തിന് അനുയോജ്യമാകുന്നത് എന്തുകൊണ്ട്:",
    keyParameters: "പ്രധാന മാനദണ്ഡങ്ങൾ",
    interestRate: "വാർഷിക പലിശ നിരക്ക്",
    tenure: "വായ്പാ കാലാവധി",
    moratoriumPeriod: "മൊറട്ടോറിയം (ഇളവ് കാലയളവ്)",
    quarterlyEmi: "ത്രൈമാസ തിരിച്ചടവ് (EMI)",

    repaymentScheduleTitle: "ത്രൈമാസ വായ്പാ തിരിച്ചടവ് ഷെഡ്യൂൾ",
    moratoriumNote: "മൊറട്ടോറിയം കാലയളവിൽ പലിശ മാത്രം നൽകിയാൽ മതിയാകും. മുതലിന്റെ തിരിച്ചടവ് അതിനുശേഷമാണ്.",
    tableQuarter: "പാദം",
    tableOpening: "തുടക്കത്തിലെ ബാക്കി",
    tablePrincipal: "മുതൽ തിരിച്ചടവ്",
    tableInterest: "പലിശ തിരിച്ചടവ്",
    tableTotalEmi: "ആകെ ത്രൈമാസ ഗഡു",
    tableClosing: "അവസാന ബാക്കി",

    cashflowTitle: "പ്രതിമാസ പണമൊഴുക്കും ലാഭക്ഷമതയും",
    monthlyRevenue: "പ്രതീക്ഷിക്കുന്ന പ്രതിമാസ വിറ്റുവരവ്",
    monthlyExpenses: "പ്രതീക്ഷിക്കുന്ന പ്രതിമാസ ചെലവ്",
    netCashflow: "പ്രതിമാസ അറ്റാദായം",
    dscrLabel: "ഡെബ്റ്റ് സർവീസ് കവറേജ് റേഷ്യോ (DSCR)",
    dscrSafe: "സുരക്ഷിത തിരിച്ചടവ് ശേഷി (DSCR > 1.5)",

    nextStepTitle: "ബാങ്ക് അപേക്ഷയ്ക്കുള്ള അടുത്ത നടപടികൾ",
    nextStepDesc: "ഈ റിപ്പോർട്ടുമായി നിങ്ങളുടെ അടുത്തുള്ള ജില്ലാ വ്യവസായ കേന്ദ്രം (DIC) അല്ലെങ്കിൽ ബാങ്ക് സന്ദർശിക്കുക.",
    findBranchBtn: "ഏറ്റവും അടുത്തുള്ള ബാങ്ക് കണ്ടെത്തുക",
    requiredDocuments: "ആവശ്യമായ രേഖകൾ",
    doc1: "ആധാർ കാർഡും പാൻ കാർഡും",
    doc2: "പഞ്ചായത്ത് റസിഡൻസ് സർട്ടിഫിക്കറ്റ്",
    doc3: "യന്ത്രങ്ങളുടെ അംഗീകൃത കൊട്ടേഷൻ",
    doc4: "ഈ റിപ്പോർട്ടിന്റെ പ്രിന്റ് ഔട്ട്",
    disclaimer: "സർക്കാർ പദ്ധതികളും പലിശ നിരക്കുകളും ബാങ്കിന്റെ നിബന്ധനകൾക്ക് വിധേയമാണ്.",

    exploreSchemes: "സർക്കാർ പദ്ധതികളും ബാങ്കുകളും തിരഞ്ഞെടുക്കുക",
    selectBank: "വായ്പ നൽകുന്ന ബാങ്ക് തിരഞ്ഞെടുക്കുക",
    schemeDetails: "പദ്ധതി വിവരങ്ങളും ആനുകൂല്യങ്ങളും",
    subsidyAmount: "സർക്കാർ സബ്സിഡി",
    viewSchemePortal: "ഔദ്യോഗിക പോർട്ടൽ കാണുക",
    eligibilityTitle: "അർഹതാ മാനദണ്ഡങ്ങൾ",
    docChecklist: "ആവശ്യമായ രേഖകൾ",
    askAiAboutScheme: "ഈ പദ്ധതിയെക്കുറിച്ച് AI യോട് ചോദിക്കുക",
    aiAdvisorTitle: "ഗ്രാമ വ്യാപാരം AI സഹായി",
    aiAdvisorSubtitle: "പദ്ധതികൾ, സബ്സിഡികൾ, ബാങ്ക് നിയമങ്ങൾ എന്നിവയെക്കുറിച്ച് വേഗത്തിൽ അറിയുക",
    loginTitle: "ലോഗിൻ / രജിസ്റ്റർ",
    loginDesc: "റിപ്പോർട്ടുകൾ കാണാൻ ലോഗിൻ ചെയ്യുക",
    logout: "ലോഗ് ഔട്ട്"
  },

  pa: {
    portalTitle: "ਗ੍ਰਾਮ ਵਪਾਰ",
    portalSubtitle: "ਸਰਕਾਰੀ ਸਕੀਮ ਅਤੇ ਵਿਵਹਾਰਕਤਾ ਸਲਾਹਕਾਰ",
    tagline: "ਪੇਂਡੂ ਅਤੇ ਅਰਧ-ਸ਼ਹਿਰੀ ਸੂਖਮ ਉੱਦਮੀਆਂ ਦਾ ਸਸ਼ਕਤੀਕਰਨ",
    officialBadge: "MSME ਮੰਤਰਾਲਾ ਅਤੇ ਪੇਂਡੂ ਬੈਂਕਿੰਗ ਮਾਰਗਦਰਸ਼ਨ",
    langName: "ਪੰਜਾਬੀ",

    step1Title: "1. ਕਾਰੋਬਾਰ ਦੀ ਥਾਂ",
    step1Desc: "ਤੁਹਾਡਾ ਪਿੰਡ, ਬਲਾਕ ਜਾਂ ਜ਼ਿਲ੍ਹਾ",
    step2Title: "2. ਤੁਹਾਡਾ ਮਾਰਜਨ ਪੈਸਾ",
    step2Desc: "₹ ਵਿੱਚ ਤੁਹਾਡਾ 10% ਆਪਣਾ ਹਿੱਸਾ",
    step3Title: "3. ਕਾਰੋਬਾਰ ਦੀ ਸ਼੍ਰੇਣੀ",
    step3Desc: "ਆਪਣਾ ਕੰਮ ਜਾਂ ਦਸਤਕਾਰੀ ਚੁਣੋ",

    locationLabel: "ਪਿੰਡ / ਬਲਾਕ / ਜ਼ਿਲ੍ਹਾ",
    locationPlaceholder: "ਜਿਵੇਂ: ਲੁਧਿਆਣਾ, ਬਠਿੰਡਾ ਜਾਂ ਸੰਗਰੂਰ",
    pincodeLabel: "ਪਿੰਨ ਕੋਡ (ਵਿਕਲਪਿਕ)",
    pincodePlaceholder: "ਜਿਵੇਂ: 141001",
    useMyLocation: "GPS ਟਿਕਾਣਾ ਵਰਤੋ",
    locDetecting: "ਟਿਕਾਣਾ ਲੱਭ ਰਿਹਾ ਹੈ...",

    marginLabel: "ਤੁਹਾਡੀ ਉਪਲਬਧ ਮਾਰਜਨ ਪੂੰਜੀ (₹)",
    marginHint: "ਇਹ ਤੁਹਾਡੀ ਆਪਣੀ ਬੱਚਤ ਹੈ (10%)। ਸਰਕਾਰ 90% ਤੱਕ ਬੈਂਕ ਕਰਜ਼ਾ ਦਿੰਦੀ ਹੈ।",
    quickMarginTip: "ਤੁਰੰਤ ਚੋਣ:",
    totalCostPreview: "ਕੁੱਲ ਅੰਦਾਜ਼ਨ ਪ੍ਰੋਜੈਕਟ ਲਾਗਤ (100%):",
    loanPreview: "ਯੋਗ ਸਰਕਾਰੀ ਬੈਂਕ ਕਰਜ਼ਾ (90%):",

    businessLabel: "ਤਜਵੀਜ਼ਸ਼ੁਦਾ ਕਾਰੋਬਾਰੀ ਸ਼੍ਰੇਣੀ",
    selectCategory: "ਕਾਰੋਬਾਰ ਦੀ ਕਿਸਮ ਚੁਣੋ",
    customCategoryPlaceholder: "ਖਾਸ ਕਾਰੋਬਾਰ ਦਾ ਨਾਮ ਲਿਖੋ",
    applicantNameLabel: "ਉੱਦਮੀ ਦਾ ਨਾਮ (ਵਿਕਲਪਿਕ)",
    applicantPhoneLabel: "ਮੋਬਾਈਲ ਨੰਬਰ (ਰਿਪੋਰਟ ਸੁਰੱਖਿਅਤ ਕਰਨ ਲਈ)",
    generateReportBtn: "ਰਿਪੋਰਟ ਤਿਆਰ ਕਰੋ",
    generatingReport: "ਬਾਜ਼ਾਰ ਵਿਸ਼ਲੇਸ਼ਣ ਅਤੇ ਕਰਜ਼ੇ ਦੀ ਗਣਨਾ ਜਾਰੀ ਹੈ...",

    tabFeasibility: "ਵਿਵਹਾਰਕਤਾ ਰਿਪੋਰਟ",
    tabFinancial: "ਵਿੱਤੀ ਯੋਜਨਾ ਅਤੇ ਸਕੀਮਾਂ",
    backToForm: "ਵੇਰਵੇ ਬਦਲੋ",
    shareWhatsApp: "ਵਟਸਐਪ 'ਤੇ ਸਾਂਝਾ ਕਰੋ",
    downloadPdf: "ਬੈਂਕ PDF ਡਾਊਨਲੋਡ ਕਰੋ",
    saveReport: "ਰਿਪੋਰਟ ਸੁਰੱਖਿਅਤ ਕਰੋ",
    searchSaved: "ਸੰਭਾਲੀਆਂ ਰਿਪੋਰਟਾਂ",

    marketReachTitle: "ਬਾਜ਼ਾਰ ਪਹੁੰਚ ਅਤੇ ਗਾਹਕ",
    opportunityTitle: "ਸਥਾਨਕ ਮੌਕੇ",
    swotTitle: "SWOT ਵਿਸ਼ਲੇਸ਼ਣ",
    threatsTitle: "ਜੋਖਮ ਅਤੇ ਹੱਲ",
    competitorTitle: "ਮੁਕਾਬਲੇਬਾਜ਼ਾਂ ਦਾ ਮੁਲਾਂਕਣ",
    productValueTitle: "ਵਾਜਬ ਕੀਮਤ ਅਤੇ ਮੁਨਾਫ਼ੇ ਦਾ ਅੰਦਾਜ਼ਾ",

    swotS: "ਤਾਕਤ (Strengths)",
    swotW: "ਕਮਜ਼ੋਰੀਆਂ (Weaknesses)",
    swotO: "ਮੌਕੇ (Opportunities)",
    swotT: "ਖ਼ਤਰੇ (Threats)",
    showDetails: "ਵੇਰਵੇ ਵੇਖੋ",
    hideDetails: "ਛੁਪਾਓ",
    listenVoice: "ਆਵਾਜ਼ ਸੁਣੋ",
    stopVoice: "ਆਵਾਜ਼ ਬੰਦ ਕਰੋ",

    summaryMargin: "ਤੁਹਾਡਾ ਮਾਰਜਨ (10%)",
    summaryProjectCost: "ਕੁੱਲ ਪ੍ਰੋਜੈਕਟ ਲਾਗਤ (100%)",
    summaryLoan: "ਯੋਗ ਬੈਂਕ ਕਰਜ਼ਾ (90%)",
    youQualifyFor: "ਯੋਗ ਸਰਕਾਰੀ ਸਕੀਮ",
    schemeReasoningTitle: "ਇਹ ਸਕੀਮ ਤੁਹਾਡੇ ਲਈ ਢੁਕਵੀਂ ਕਿਉਂ ਹੈ:",
    keyParameters: "ਮੁੱਖ ਨਿਯਮ",
    interestRate: "ਸਾਲਾਨਾ ਵਿਆਜ ਦਰ",
    tenure: "ਕਰਜ਼ਾ ਮਿਆਦ",
    moratoriumPeriod: "ਮੋਰਟੋਰੀਅਮ (ਛੋਟ ਸਮਾਂ)",
    quarterlyEmi: "ਤਿਮਾਹੀ ਕਿਸ਼ਤ (EMI)",

    repaymentScheduleTitle: "ਤਿਮਾਹੀ ਕਰਜ਼ਾ ਅਦਾਇਗੀ ਸਮਾਂ-ਸਾਰਣੀ",
    moratoriumNote: "ਛੋਟ ਸਮੇਂ ਦੌਰਾਨ ਸਿਰਫ਼ ਵਿਆਜ ਦਾ ਭੁਗਤਾਨ ਕਰਨਾ ਹੁੰਦਾ ਹੈ। ਮੂਲ ਰਕਮ ਬਾਅਦ ਵਿੱਚ ਸ਼ੁਰੂ ਹੁੰਦੀ ਹੈ।",
    tableQuarter: "ਤਿਮਾਹੀ",
    tableOpening: "ਸ਼ੁਰੂਆਤੀ ਬਕਾਇਆ",
    tablePrincipal: "ਮੂਲ ਅਦਾਇਗੀ",
    tableInterest: "ਵਿਆਜ ਅਦਾਇਗੀ",
    tableTotalEmi: "ਕੁੱਲ ਤਿਮਾਹੀ ਕਿਸ਼ਤ",
    tableClosing: "ਆਖ਼ਰੀ ਬਕਾਇਆ",

    cashflowTitle: "ਮਹੀਨਾਵਾਰ ਨਕਦ ਵਹਾਅ ਅਤੇ ਮੁਨਾਫ਼ਾ",
    monthlyRevenue: "ਅੰਦਾਜ਼ਨ ਮਹੀਨਾਵਾਰ ਵਿਕਰੀ",
    monthlyExpenses: "ਅੰਦਾਜ਼ਨ ਮਹੀਨਾਵਾਰ ਖਰਚੇ",
    netCashflow: "ਸ਼ੁੱਧ ਮਹੀਨਾਵਾਰ ਬੱਚਤ",
    dscrLabel: "ਕਰਜ਼ਾ ਸੇਵਾ ਕਵਰੇਜ ਅਨੁਪਾਤ (DSCR)",
    dscrSafe: "ਸੁਰੱਖਿਅਤ ਅਦਾਇਗੀ ਸਮਰੱਥਾ (DSCR > 1.5)",

    nextStepTitle: "ਬੈਂਕ ਕਰਜ਼ੇ ਲਈ ਅਗਲੇ ਕਦਮ",
    nextStepDesc: "ਇਸ ਰਿਪੋਰਟ ਨਾਲ ਆਪਣੇ ਨਜ਼ਦੀਕੀ ਜ਼ਿਲ੍ਹਾ ਉਦਯੋਗ ਕੇਂਦਰ (DIC) ਜਾਂ ਬੈਂਕ ਸ਼ਾਖਾ ਵਿੱਚ ਜਾਓ।",
    findBranchBtn: "ਨੇੜਲੀ ਬੈਂਕ ਸ਼ਾਖਾ ਲੱਭੋ",
    requiredDocuments: "ਲੋੜੀਂਦੇ ਦਸਤਾਵੇਜ਼",
    doc1: "ਆਧਾਰ ਕਾਰਡ ਅਤੇ ਪੈਨ ਕਾਰਡ",
    doc2: "ਪਿੰਡ ਪੰਚਾਇਤ ਰਿਹਾਇਸ਼ੀ ਸਰਟੀਫਿਕੇਟ",
    doc3: "ਮਸ਼ੀਨਰੀ ਦਾ ਅਧਿਕਾਰਤ ਕੋਟੇਸ਼ਨ",
    doc4: "ਇਸ ਰਿਪੋਰਟ ਦੀ ਕਾਪੀ",
    disclaimer: "ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਅਤੇ ਵਿਆਜ ਦਰਾਂ ਬੈਂਕ ਦੇ ਨਿਯਮਾਂ ਦੇ ਅਧੀਨ ਹਨ।",

    exploreSchemes: "ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਅਤੇ ਬੈਂਕਾਂ ਦੀ ਚੋਣ ਕਰੋ",
    selectBank: "ਕਰਜ਼ਾ ਦੇਣ ਵਾਲਾ ਬੈਂਕ ਚੁਣੋ",
    schemeDetails: "ਸਕੀਮ ਦੇ ਵੇਰਵੇ ਅਤੇ ਲਾਭ",
    subsidyAmount: "ਸਰਕਾਰੀ ਸਬਸਿਡੀ",
    viewSchemePortal: "ਸਰਕਾਰੀ ਪੋਰਟਲ 'ਤੇ ਜਾਓ",
    eligibilityTitle: "ਯੋਗਤਾ ਦੇ ਮਾਪਦੰਡ",
    docChecklist: "ਲੋੜੀਂਦੇ ਦਸਤਾਵੇਜ਼",
    askAiAboutScheme: "ਇਸ ਸਕੀਮ ਬਾਰੇ AI ਤੋਂ ਪੁੱਛੋ",
    aiAdvisorTitle: "ਗ੍ਰਾਮ ਵਪਾਰ AI ਸਹਾਇਕ",
    aiAdvisorSubtitle: "ਸਕੀਮਾਂ, ਸਬਸਿਡੀਆਂ ਅਤੇ ਬੈਂਕ ਨਿਯਮਾਂ ਬਾਰੇ ਤੁਰੰਤ ਜਾਣੋ",
    loginTitle: "ਲਾਗਇਨ / ਰਜਿਸਟ੍ਰੇਸ਼ਨ",
    loginDesc: "ਰਿਪੋਰਟਾਂ ਵੇਖਣ ਲਈ ਲਾਗਇਨ ਕਰੋ",
    logout: "ਲਾਗ ਆਉਟ"
  },

  or: {
    portalTitle: "ଗ୍ରାମ ବ୍ୟାପାର",
    portalSubtitle: "ସରକାରୀ ଯୋଜନା ଓ ବ୍ୟବସାୟିକ ସମ୍ଭାବ୍ୟତା ପରାମର୍ଶଦାତା",
    tagline: "ଗ୍ରାମୀଣ ଓ ଅର୍ଦ୍ଧ-ସହରାଞ୍ଚଳ କ୍ଷୁଦ୍ର ଉଦ୍ୟୋଗୀମାନଙ୍କ ସଶକ୍ତୀକରଣ",
    officialBadge: "MSME ମନ୍ତ୍ରଣାଳୟ ଓ ଗ୍ରାମୀଣ ବ୍ୟାଙ୍କିଂ ମାର୍ଗଦର୍ଶନ",
    langName: "ଓଡ଼ିଆ",

    step1Title: "୧. ବ୍ୟବସାୟର ସ୍ଥାନ",
    step1Desc: "ଆପଣଙ୍କ ଗାଁ, ବ୍ଲକ ବା ଜିଲ୍ଲା",
    step2Title: "୨. ଆପଣଙ୍କ ମାର୍ଜିନ ପୁଞ୍ଜି",
    step2Desc: "ଟଙ୍କାରେ ଆପଣଙ୍କ ୧୦% ନିଜସ୍ୱ ଅଂଶଦାନ",
    step3Title: "୩. ବ୍ୟବସାୟର ବର୍ଗ",
    step3Desc: "ଆପଣଙ୍କ କ୍ଷେତ୍ର ବା ଶିଳ୍ପ ଚୟନ କରନ୍ତୁ",

    locationLabel: "ଗ୍ରାମ / ବ୍ଲକ / ଜିଲ୍ଲା",
    locationPlaceholder: "ଯଥା: ବରଗଡ଼, ପୁରୀ ବା କଟକ",
    pincodeLabel: "ପିନ କୋଡ୍ (ଇଚ୍ଛାଧୀନ)",
    pincodePlaceholder: "ଯଥା: ୭୫୧୦୦୧",
    useMyLocation: "GPS ସ୍ଥାନ ବ୍ୟବହାର କରନ୍ତୁ",
    locDetecting: "ସ୍ଥାନ ଖୋଜା ଚାଲିଛି...",

    marginLabel: "ଉପଲବ୍ଧ ମାର୍ଜିନ ପୁଞ୍ଜି (₹)",
    marginHint: "ଏହା ଆପଣଙ୍କ ନିଜସ୍ୱ ସଞ୍ଚୟ (୧୦%)। ସରକାର ୯୦% ପର୍ଯ୍ୟନ୍ତ ବ୍ୟାଙ୍କ ଋଣ ପ୍ରଦାନ କରନ୍ତି।",
    quickMarginTip: "ଶୀଘ୍ର ଚୟନ:",
    totalCostPreview: "ଆନୁମାନିକ ମୋଟ ପ୍ରକଳ୍ପ ଖର୍ଚ୍ଚ (୧୦୦%):",
    loanPreview: "ଯୋଗ୍ୟ ସରକାରୀ ବ୍ୟାଙ୍କ ଋଣ (୯୦%):",

    businessLabel: "ପ୍ରସ୍ତାବିତ ବ୍ୟବସାୟ ବର୍ଗ",
    selectCategory: "ବ୍ୟବସାୟ ପ୍ରକାର ବାଛନ୍ତୁ",
    customCategoryPlaceholder: "ନିର୍ଦ୍ଦିଷ୍ଟ ବ୍ୟବସାୟର ନାମ ଲେଖନ୍ତୁ",
    applicantNameLabel: "ଉଦ୍ୟୋଗୀଙ୍କ ନାମ (ଇଚ୍ଛାଧୀନ)",
    applicantPhoneLabel: "ମୋବାଇଲ୍ ନମ୍ବର (ରିପୋର୍ଟ ସଂରକ୍ଷଣ ପାଇଁ)",
    generateReportBtn: "ସମ୍ଭାବ୍ୟତା ଓ ଯୋଜନା ରିପୋର୍ଟ ପ୍ରସ୍ତୁତ କରନ୍ତୁ",
    generatingReport: "ବଜାର ବିଶ୍ଳେଷଣ ଓ ଋଣ ଗଣନା ଚାଲିଛି...",

    tabFeasibility: "ସମ୍ଭାବ୍ୟତା ରିପୋର୍ଟ",
    tabFinancial: "ଆର୍ଥିକ ଯୋଜନା ଓ ସରକାରୀ ଯୋଜନା",
    backToForm: "ତଥ୍ୟ ପରିବର୍ତ୍ତନ କରନ୍ତୁ",
    shareWhatsApp: "ହ୍ୱାଟ୍ସଆପ୍‌ରେ ସେୟାର କରନ୍ତୁ",
    downloadPdf: "ବ୍ୟାଙ୍କ PDF ଡାଉନଲୋଡ୍ କରନ୍ତୁ",
    saveReport: "ରିପୋର୍ଟ ସଂରକ୍ଷଣ କରନ୍ତୁ",
    searchSaved: "ସଂରକ୍ଷିତ ରିପୋର୍ଟ",

    marketReachTitle: "ବଜାର ପହଞ୍ଚ ଓ ଗ୍ରାହକ",
    opportunityTitle: "ସ୍ଥାନୀୟ ସୁଯୋଗ",
    swotTitle: "SWOT ବିଶ୍ଳେଷଣ",
    threatsTitle: "ବିପଦ ଓ ପ୍ରତିକାର",
    competitorTitle: "ପ୍ରତିଯୋଗୀ ମାନଚିତ୍ର",
    productValueTitle: "ଉଚିତ୍ ମୂଲ୍ୟ ଓ ଲାଭ ଆକଳନ",

    swotS: "ଶକ୍ତି (Strengths)",
    swotW: "ଦୁର୍ବଳତା (Weaknesses)",
    swotO: "ସୁଯୋଗ (Opportunities)",
    swotT: "ଆହ୍ୱାନ (Threats)",
    showDetails: "ବିସ୍ତୃତ ଦେଖନ୍ତୁ",
    hideDetails: "ସଂକ୍ଷିପ୍ତ କରନ୍ତୁ",
    listenVoice: "ଭଏସ୍ ଶୁଣନ୍ତୁ",
    stopVoice: "ଭଏସ୍ ବନ୍ଦ କରନ୍ତୁ",

    summaryMargin: "ଆପଣଙ୍କ ମାର୍ଜିନ (୧୦%)",
    summaryProjectCost: "ମୋଟ ପ୍ରକଳ୍ପ ଖର୍ଚ୍ଚ (୧୦୦%)",
    summaryLoan: "ଯୋଗ୍ୟ ବ୍ୟାଙ୍କ ଋଣ (୯୦%)",
    youQualifyFor: "ଉପଯୁକ୍ତ ସରକାରୀ ଯୋଜନା",
    schemeReasoningTitle: "ଏହି ଯୋଜନା ଆପଣଙ୍କ ପାଇଁ କାହିଁକି ଉପଯୁକ୍ତ:",
    keyParameters: "ମୁଖ୍ୟ ମାନଦଣ୍ଡ",
    interestRate: "ବାର୍ଷିକ ସୁଧ ହାର",
    tenure: "ଋଣ ପରିଶୋଧ ଅବଧି",
    moratoriumPeriod: "ମୋରେଟୋରିୟମ (ଛାଡ଼ ଅବଧି)",
    quarterlyEmi: "ତ୍ରୈମାସିକ କିସ୍ତି (EMI)",

    repaymentScheduleTitle: "ତ୍ରୈମାସିକ ଋଣ ପରିଶୋଧ ତାଲିକା",
    moratoriumNote: "ଛାଡ଼ ଅବଧିରେ କେବଳ ସୁଧ ଦେବାକୁ ପଡ଼େ। ମୂଳଧନ ପରିଶୋଧ ପରେ ଆରମ୍ଭ ହୁଏ।",
    tableQuarter: "ତ୍ରୈମାସିକ",
    tableOpening: "ପ୍ରାରମ୍ଭିକ ବଳକା",
    tablePrincipal: "ମୂଳଧନ ପରିଶୋଧ",
    tableInterest: "ସୁଧ ପରିଶୋଧ",
    tableTotalEmi: "ମୋଟ କିସ୍ତି",
    tableClosing: "ଅନ୍ତିମ ବଳକା",

    cashflowTitle: "ମାସିକ ନଗଦ ପ୍ରବାହ ଓ ଲାଭଦାୟକତା",
    monthlyRevenue: "ଆନୁମାନିକ ମାସିକ ବିକ୍ରୟ",
    monthlyExpenses: "ଆନୁମାନିକ ମାସିକ ଖର୍ଚ୍ଚ",
    netCashflow: "ମାସିକ ନିଟ୍ ବଳକା",
    dscrLabel: "ଋଣ ସେବା କଭରେଜ୍ ଅନୁପାତ (DSCR)",
    dscrSafe: "ନିରାପଦ ପରିଶୋଧ କ୍ଷମତା (DSCR > ୧.୫)",

    nextStepTitle: "ବ୍ୟାଙ୍କ ଆବେଦନ ପାଇଁ ପରବର୍ତ୍ତୀ ପଦକ୍ଷେପ",
    nextStepDesc: "ଏହି ରିପୋର୍ଟ ସହିତ ଜିଲ୍ଲା ଶିଳ୍ପ କେନ୍ଦ୍ର (DIC) ବା ନିକଟସ୍ଥ ବ୍ୟାଙ୍କ ଶାଖାକୁ ଯାଆନ୍ତୁ।",
    findBranchBtn: "ନିକଟସ୍ଥ ବ୍ୟାଙ୍କ ଶାଖା ଖୋଜନ୍ତୁ",
    requiredDocuments: "ଆବଶ୍ୟକ କାଗଜପତ୍ର",
    doc1: "ଆଧାର କାର୍ଡ ଓ ପାନ୍ କାର୍ଡ",
    doc2: "ଗ୍ରାମ ପଞ୍ଚାୟତ ବାସିନ୍ଦା ପ୍ରମାଣପତ୍ର",
    doc3: "ମେସିନାରୀର କୋଟେସନ୍",
    doc4: "ଏହି ରିପୋର୍ଟର କପି",
    disclaimer: "ସରକାରୀ ଯୋଜନା ଓ ସୁଧ ହାର ବ୍ୟାଙ୍କ ନିୟମାବଳୀ ଅଧୀନରେ ରହିବ।",

    exploreSchemes: "ସରକାରୀ ଯୋଜନା ଓ ବ୍ୟାଙ୍କ ବାଛନ୍ତୁ",
    selectBank: "ଋଣଦାତା ବ୍ୟାଙ୍କ ବାଛନ୍ତୁ",
    schemeDetails: "ଯୋଜନାର ବିବରଣୀ ଓ ଲାଭ",
    subsidyAmount: "ସରକାରୀ ସବସିଡି (ଅନୁଦାନ)",
    viewSchemePortal: "ସରକାରୀ ପୋର୍ଟାଲ୍ ଦେଖନ୍ତୁ",
    eligibilityTitle: "ଯୋଗ୍ୟତା ନିୟମାବଳୀ",
    docChecklist: "ଆବଶ୍ୟକ କାଗଜପତ୍ର",
    askAiAboutScheme: "ଏହି ଯୋଜନା ବିଷୟରେ AI କୁ ପଚାରନ୍ତୁ",
    aiAdvisorTitle: "ଗ୍ରାମ ବ୍ୟାପାର AI ସହାୟକ",
    aiAdvisorSubtitle: "ଯୋଜନା, ସବସିଡି ଓ ବ୍ୟାଙ୍କ ନିୟମ ବିଷୟରେ ତୁରନ୍ତ ଉତ୍ତର ପାଆନ୍ତୁ",
    loginTitle: "ଲଗଇନ୍ / ପଞ୍ଜୀକରଣ",
    loginDesc: "ରିପୋର୍ଟ ଦେଖିବା ପାଇଁ ଲଗଇନ୍ କରନ୍ତୁ",
    logout: "ଲଗ୍ ଆଉଟ୍"
  },

  as: {
    portalTitle: "গ্রাম ব্যাপাৰ",
    portalSubtitle: "চৰকাৰী আঁচনি আৰু ব্যৱহাৰিকতা উপদেষ্টা",
    tagline: "গ্ৰাম্য আৰু অৰ্ধ-চহৰীয়া ক্ষুদ্ৰ উদ্যোগীসকলৰ সৱলীকৰণ",
    officialBadge: "MSME মন্ত্ৰালয় আৰু গ্ৰাম্য বেংকিং নিৰ্দেশনা",
    langName: "অসমীয়া",

    step1Title: "১. ব্যৱসায়ৰ স্থান",
    step1Desc: "আপোনাৰ গাঁও, ব্লক বা জিলা",
    step2Title: "২. আপোনাৰ নিজা মূলধন",
    step2Desc: "টকাত আপোনাৰ ১০% নিজা অংশদান",
    step3Title: "৩. ব্যৱসায়ৰ শ্ৰেণী",
    step3Desc: "আপোনাৰ পছন্দৰ খণ্ড বা উদ্যোগ বাছক",

    locationLabel: "গাঁও / ব্লক / জিলা",
    locationPlaceholder: "যেনে: যোৰহাট, নলবাৰী বা তেজপুৰ",
    pincodeLabel: "পিন ক'ড (ঐচ্ছিক)",
    pincodePlaceholder: "যেনে: ৭৮১০০১",
    useMyLocation: "GPS স্থান ব্যৱহাৰ কৰক",
    locDetecting: "স্থান সন্ধান কৰা হৈছে...",

    marginLabel: "আপোনাৰ জমা মাৰ্জিন মূলধন (₹)",
    marginHint: "এইয়া আপোনাৰ নিজা সঞ্চয় (১০%)। চৰকাৰে ৯০% লৈকে বেংক ঋণ প্ৰদান কৰে।",
    quickMarginTip: "দ্ৰুত নিৰ্বাচন:",
    totalCostPreview: "মুঠ আনুমানিক প্ৰকল্প ব্যয় (১০০%):",
    loanPreview: "যোগ্য চৰকাৰী বেংক ঋণ (৯০%):",

    businessLabel: "প্ৰস্তাৱিত ব্যৱসায়িক খণ্ড",
    selectCategory: "ব্যৱসায়ৰ ধৰণ বাছক",
    customCategoryPlaceholder: "নিৰ্দিষ্ট উদ্যোগৰ নাম লিখক",
    applicantNameLabel: "উদ্যোগীৰ নাম (ঐচ্ছিক)",
    applicantPhoneLabel: "মোবাইল নম্বৰ (ৰিপ'ৰ্ট সংৰক্ষণৰ বাবে)",
    generateReportBtn: "সম্ভাৱ্যতা আৰু ঋণ ৰিপ'ৰ্ট প্ৰস্তুত কৰক",
    generatingReport: "বজাৰ বিশ্লেষণ আৰু ঋণ গণনা চলি আছে...",

    tabFeasibility: "সম্ভাৱ্যতা ৰিপ'ৰ্ট",
    tabFinancial: "বিত্তীয় পৰিকল্পনা আৰু আঁচনিসমূহ",
    backToForm: "তথ্য সংশোধন",
    shareWhatsApp: "হোৱাটছএপযোগে শ্বেয়াৰ কৰক",
    downloadPdf: "বেংক PDF ডাউনলোড কৰক",
    saveReport: "ৰিপ'ৰ্ট সংৰক্ষণ কৰক",
    searchSaved: "সংৰক্ষিত ৰিপ'ৰ্ট",

    marketReachTitle: "বজাৰৰ পৰিসৰ আৰু গ্ৰাহক",
    opportunityTitle: "স্থানীয় সুযোগ আৰু সম্ভাৱনা",
    swotTitle: "SWOT বিশ্লেষণ",
    threatsTitle: "আশংকা আৰু প্ৰতিকাৰ",
    competitorTitle: "প্ৰতিযোগীসকলৰ বিশ্লেষণ",
    productValueTitle: "ন্যায্য মূল্য আৰু লাভৰ হাৰ",

    swotS: "শক্তি (Strengths)",
    swotW: "দুৰ্বলতা (Weaknesses)",
    swotO: "সুযোগ (Opportunities)",
    swotT: "আহ্বান (Threats)",
    showDetails: "সবিশেষ চাওক",
    hideDetails: "চমুকৈ চাওক",
    listenVoice: "ভইচত শুনক",
    stopVoice: "ভইচ বন্ধ কৰক",

    summaryMargin: "আপোনাৰ মূলধন (১০%)",
    summaryProjectCost: "মুঠ প্ৰকল্প ব্যয় (১০০%)",
    summaryLoan: "যোগ্য বেংক ঋণ (৯০%)",
    youQualifyFor: "উপযুক্ত চৰকাৰী আঁচনি",
    schemeReasoningTitle: "এই আঁচনিখন আপোনাৰ উদ্যোগৰ বাবে কিয় উপযুক্ত:",
    keyParameters: "মূল মাপকাঠীসমূহ",
    interestRate: "বাৰ্ষিক সুতৰ হাৰ",
    tenure: "ঋণ পৰিশোধৰ সময়সীমা",
    moratoriumPeriod: "ৰেহাইৰ সময় (Moratorium)",
    quarterlyEmi: "ত্ৰৈমাসিক কিস্তি (EMI)",

    repaymentScheduleTitle: "ত্ৰৈমাসিক ঋণ পৰিশোধৰ তালিকা",
    moratoriumNote: "ৰেহাইৰ সময়ত কেৱল সুত আদায় কৰিব লাগে। মূলধনৰ পৰিশোধ পিছত আৰম্ভ হয়।",
    tableQuarter: "ত্ৰৈমাসিক",
    tableOpening: "প্ৰাৰম্ভিক স্থিতি",
    tablePrincipal: "মূলধন পৰিশোধ",
    tableInterest: "সুত পৰিশোধ",
    tableTotalEmi: "মুঠ কিস্তি",
    tableClosing: "অন্তিম স্থিতি",

    cashflowTitle: "মাহেকীয়া ধনৰ প্ৰবাহ আৰু লাভদায়কতা",
    monthlyRevenue: "আনুমানিক মাহেকীয়া বিক্ৰী",
    monthlyExpenses: "আনুমানিক মাহেকীয়া খৰচ",
    netCashflow: "মাহেকীয়া নিগুট ৰাহি",
    dscrLabel: "ঋণ সেৱা কভাৰেজ অনুপাত (DSCR)",
    dscrSafe: "সুৰক্ষিত পৰিশোধ ক্ষমতা (DSCR > ১.৫)",

    nextStepTitle: "বেংক আবেদনৰ বাবে পদক্ষেপ",
    nextStepDesc: "এই ৰিপ'ৰ্টৰ সৈতে জিলা উদ্যোগ কেন্দ্ৰ (DIC) বা নিকটৱৰ্তী বেংক শাখাত যোগাযোগ কৰক।",
    findBranchBtn: "ওচৰৰ বেংক শাখা বিচাৰক",
    requiredDocuments: "প্ৰয়োজনীয় নথিপত্ৰ",
    doc1: "আধাৰ কাৰ্ড আৰু পেন কাৰ্ড",
    doc2: "গাঁও পঞ্চায়তৰ ঠিকনা প্ৰমাণপত্ৰ",
    doc3: "মেশ্বিনৰ অফিচিয়েল কোটেচন",
    doc4: "এই ৰিপ'ৰ্টৰ প্ৰতিলিপি",
    disclaimer: "চৰকাৰী আঁচনি আৰু সুতৰ হাৰ বেংকৰ নীতি অনুসৰি প্ৰযোজ্য হ'ব।",

    exploreSchemes: "চৰকাৰী আঁচনি আৰু বেংক বাছক",
    selectBank: "ঋণ প্ৰদানকাৰী বেংক বাছক",
    schemeDetails: "আঁচনিৰ বিৱৰণ আৰু লাভালাভ",
    subsidyAmount: "চৰকাৰী অনুদান (ছাবচিডি)",
    viewSchemePortal: "চৰকাৰী প'ৰ্টেল চাওক",
    eligibilityTitle: "যোগ্যতাৰ মাপকাঠী",
    docChecklist: "প্ৰয়োজনীয় নথিপত্ৰ",
    askAiAboutScheme: "এই আঁচনিৰ বিষয়ে AI ক সোধক",
    aiAdvisorTitle: "গ্রাম ব্যাপাৰ AI সহায়ক",
    aiAdvisorSubtitle: "আঁচনি, ছাবচিডি আৰু বেংকৰ নিয়মৰ বিষয়ে তৎক্ষণাৎ জানক",
    loginTitle: "লগইন / পঞ্জীয়ন",
    loginDesc: "ৰিপ'ৰ্ট চাবলৈ লগইন কৰক",
    logout: "লগ আউট"
  },

  ur: {
    portalTitle: "گرام ویاپار",
    portalSubtitle: "سرکاری اسکیم اور کاروباری فزیبلٹی مشیر",
    tagline: "دیہی اور نیم شہری چھوٹے کاروباریوں کو بااختیار بنانا",
    officialBadge: "وزارت ایم ایس ایم ای اور دیہی بینکاری رہنمائی",
    langName: "اردو",

    step1Title: "1. کاروبار کا مقام",
    step1Desc: "آپ کا گاؤں، بلاک یا ضلع",
    step2Title: "2. آپ کا مارجن سرمایہ",
    step2Desc: "₹ میں آپ کا 10% ذاتی حصہ",
    step3Title: "3. کاروبار کا زمرہ",
    step3Desc: "اپنا شعبہ یا ہنر منتخب کریں",

    locationLabel: "گاؤں / بلاک / قصبہ / ضلع",
    locationPlaceholder: "مثلاً: سرینگر، اننت ناگ یا بارہمولہ",
    pincodeLabel: "پن کوڈ (اختیاری)",
    pincodePlaceholder: "مثلاً: 190001",
    useMyLocation: "GPS مقام استعمال کریں",
    locDetecting: "مقام تلاش کیا جا رہا ہے...",

    marginLabel: "آپ کا دستیاب مارجن سرمایہ (₹)",
    marginHint: "یہ آپ کی اپنی بچت ہے (10%)۔ حکومت 90% تک بینک قرض فراہم کرتی ہے۔",
    quickMarginTip: "فوری انتخاب:",
    totalCostPreview: "کل تخمینی پروجیکٹ لاگت (100%):",
    loanPreview: "اہل سرکاری بینک قرض (90%):",

    businessLabel: "مجوزہ کاروباری زمرہ",
    selectCategory: "کاروبار کی قسم منتخب کریں",
    customCategoryPlaceholder: "مخصوص کاروبار کا نام لکھیں",
    applicantNameLabel: "کاروباری کا نام (اختیاری)",
    applicantPhoneLabel: "موبائل نمبر (رپورٹ محفوظ کرنے کے لیے)",
    generateReportBtn: "فزیبلٹی اور اسکیم رپورٹ تیار کریں",
    generatingReport: "مقامی مارکیٹ کا تجزیہ اور قرض کا حساب جاری ہے...",

    tabFeasibility: "فزیبلٹی رپورٹ",
    tabFinancial: "مالیاتی منصوبہ اور اسکیمیں",
    backToForm: "تفصیلات تبدیل کریں",
    shareWhatsApp: "واٹس ایپ پر شیئر کریں",
    downloadPdf: "بینک پی ڈی ایف ڈاؤن لوڈ کریں",
    saveReport: "رپورٹ محفوظ کریں",
    searchSaved: "محفوظ رپورٹس",

    marketReachTitle: "مارکیٹ رسائی اور کسٹمرز",
    opportunityTitle: "مقامی مواقع",
    swotTitle: "SWOT تجزیہ",
    threatsTitle: "خطرات اور تدارک",
    competitorTitle: "حریفوں کی میپنگ",
    productValueTitle: "مناسب قیمت اور منافع کا تخمینہ",

    swotS: "طاقت (Strengths)",
    swotW: "کمزوریاں (Weaknesses)",
    swotO: "مواقع (Opportunities)",
    swotT: "چیلنجز (Threats)",
    showDetails: "تفصیلات دیکھیں",
    hideDetails: "مختصر کریں",
    listenVoice: "آواز میں سنیں",
    stopVoice: "آواز بند کریں",

    summaryMargin: "آپ کا مارجن (10%)",
    summaryProjectCost: "کل پروجیکٹ لاگت (100%)",
    summaryLoan: "اہل بینک قرض (90%)",
    youQualifyFor: "اہل سرکاری اسکیم",
    schemeReasoningTitle: "یہ اسکیم آپ کے کاروبار کے لیے کیوں موزوں ہے:",
    keyParameters: "اہم مالیاتی شرائط",
    interestRate: "سالانہ شرح سود",
    tenure: "قرض کی واپسی کی مدت",
    moratoriumPeriod: "موریٹوریم (مہلت کی مدت)",
    quarterlyEmi: "سہ ماہی قسط (EMI)",

    repaymentScheduleTitle: "سہ ماہی قرض کی ادائیگی کا شیڈول",
    moratoriumNote: "مہلت کی مدت کے دوران صرف سود ادا کیا جاتا ہے۔ اصل رقم کی ادائیگی بعد میں شروع ہوتی ہے۔",
    tableQuarter: "سہ ماہی",
    tableOpening: "ابتدائی بقایا",
    tablePrincipal: "اصل ادائیگی",
    tableInterest: "سود کی ادائیگی",
    tableTotalEmi: "کل سہ ماہی قسط",
    tableClosing: "آخری بقایا",

    cashflowTitle: "ماہانہ کیش فلو اور کاروباری منافع",
    monthlyRevenue: "تخمینی ماہانہ فروخت",
    monthlyExpenses: "تخمینی ماہانہ اخراجات",
    netCashflow: "خالص ماہانہ بچت",
    dscrLabel: "ڈیبٹ سروس کوریج ریشو (DSCR)",
    dscrSafe: "محفوظ ادائیگی کی صلاحیت (DSCR > 1.5)",

    nextStepTitle: "بینک درخواست کے لیے اگلے اقدامات",
    nextStepDesc: "اس رپورٹ کے ساتھ قریبی ڈسٹرکٹ انڈسٹریز سینٹر (DIC) یا بینک برانچ سے رجوع کریں۔",
    findBranchBtn: "قریبی بینک برانچ تلاش کریں",
    requiredDocuments: "ضروری دستاویزات کی فہرست",
    doc1: "آدھار کارڈ اور پین کارڈ",
    doc2: "گرام پنچایت رہائشی سرٹیفکیٹ",
    doc3: "مشینری کی تصدیق شدہ کوٹیشن",
    doc4: "اس رپورٹ کا پرنٹ آؤٹ",
    disclaimer: "سرکاری اسکیمیں اور شرح سود بینک کے قواعد و ضوابط کے تابع ہیں۔",

    exploreSchemes: "سرکاری اسکیمیں اور قرض دینے والے بینک منتخب کریں",
    selectBank: "قرض فراہم کرنے والا بینک منتخب کریں",
    schemeDetails: "اسکیم کی تفصیلات اور فوائد",
    subsidyAmount: "سرکاری سبسڈی (گرانٹ)",
    viewSchemePortal: "سرکاری پورٹل ملاحظہ کریں",
    eligibilityTitle: "اہلیت کے معیار",
    docChecklist: "ضروری دستاویزات",
    askAiAboutScheme: "اس اسکیم کے بارے میں AI سے پوچھیں",
    aiAdvisorTitle: "گرام ویاپار AI معاون",
    aiAdvisorSubtitle: "اسکیموں، سبسڈی اور بینکاری قواعد پر فوری جوابات حاصل کریں",
    loginTitle: "لاگ ان / رجسٹریشن",
    loginDesc: "محفوظ رپورٹس دیکھنے کے لیے لاگ ان کریں",
    logout: "لاگ آؤٹ"
  }
};
