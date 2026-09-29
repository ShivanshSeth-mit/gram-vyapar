import { GovernmentScheme, PartnerBank } from "../types";

export const AVAILABLE_SCHEMES: GovernmentScheme[] = [
  {
    id: "pmegp",
    code: "PMEGP",
    name: "Prime Minister's Employment Generation Programme (PMEGP)",
    nameHi: "प्रधानमंत्री रोजगार सृजन कार्यक्रम (PMEGP)",
    maxLoan: 5000000,
    minLoan: 100000,
    interestRate: 8.25,
    tenureYears: 7,
    moratoriumMonths: 6,
    conditionDescription: "New Micro Enterprises in Manufacturing (up to ₹50L) & Services (up to ₹20L)",
    reasoning: "Highest capital subsidy (up to 35% in rural areas) for new micro-units. 10% own margin required.",
    subsidyPercentage: 35,
    subsidyCap: 1750000,
    subsidyAssistance: "15% - 25% General; 25% - 35% for Special Categories (SC/ST/OBC/Women/Ex-Servicemen) in Rural areas.",
    targetBeneficiaries: "Rural individuals, SHGs, and cooperatives setting up new manufacturing or service units.",
    collateralRequirement: "No collateral required up to ₹10 Lakhs (covered under CGTMSE credit guarantee).",
    sectorTag: "Manufacturing",
    highlightBadge: "Up to 35% Rural Subsidy",
    isBackwardCasteFocused: true,
    targetCategory: "SC / ST / OBC / Women (35% Subsidy & 5% Margin)",
    officialPortal: "KVIC Online PMEGP e-Portal",
    portalUrl: "https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp",
    eligibilityCriteria: [
      "Any individual above 18 years of age",
      "Passed at least 8th standard for projects > ₹10 Lakh in manufacturing or > ₹5 Lakh in services",
      "Only for new projects (expansion not covered under first loan)",
      "Self Help Groups (SHGs) and institutions registered under Societies Act are eligible"
    ],
    documentsRequired: [
      "Aadhaar Card & PAN Card",
      "Caste / Category Certificate (for 35% special category subsidy claim)",
      "Rural Area Certificate issued by Gram Panchayat / Village Officer",
      "Detailed Project Report (DPR) with machine quotation",
      "Educational qualification certificate (8th pass or above)"
    ]
  },
  {
    id: "mudra_kishore",
    code: "MUDRA-KISHORE",
    name: "PM MUDRA Yojana - Kishore (₹50,000 to ₹5,00,000)",
    nameHi: "पीएम मुद्रा योजना - किशोर ऋण (₹50,000 से ₹5 लाख)",
    maxLoan: 500000,
    minLoan: 50000,
    interestRate: 8.50,
    tenureYears: 5,
    moratoriumMonths: 3,
    conditionDescription: "Equipment, machinery, and working capital for growing micro-units",
    reasoning: "Zero collateral requirement with fast-track processing through local bank branches or Jan Samarth.",
    subsidyPercentage: 0,
    subsidyAssistance: "Zero collateral guarantee via NCGTC; 2% interest subvention for prompt repayment.",
    targetBeneficiaries: "Shopkeepers, artisans, fruit/veg vendors, repair mechanics, small workshops.",
    collateralRequirement: "Strictly Zero Third-Party Collateral (as per RBI MSME guidelines).",
    sectorTag: "Services & Trading",
    highlightBadge: "Zero Collateral Fast Track",
    officialPortal: "Udyamimitra & JanSamarth Portal",
    portalUrl: "https://www.jansamarth.in",
    eligibilityCriteria: [
      "Existing or newly starting small business unit",
      "Non-farm enterprise generating monthly income",
      "No past banking default history",
      "Indian citizen with local residence proof"
    ],
    documentsRequired: [
      "Identity Proof (Aadhaar / Voter ID / Driving License)",
      "Residence Proof (Electricity bill / Gram Panchayat certificate)",
      "Quotations for machinery/tools to be purchased",
      "Bank Account Statement for past 6 months (if existing account)"
    ]
  },
  {
    id: "mudra_tarun",
    code: "MUDRA-TARUN",
    name: "PM MUDRA Yojana - Tarun (₹5,00,000 to ₹20,00,000)",
    nameHi: "पीएम मुद्रा योजना - तरुण ऋण (₹5 लाख से ₹20 लाख)",
    maxLoan: 2000000,
    minLoan: 500000,
    interestRate: 8.75,
    tenureYears: 7,
    moratoriumMonths: 6,
    conditionDescription: "Scale-up credit for commercial machinery, transport vehicles, and multi-worker workshops",
    reasoning: "Limit enhanced up to ₹20 Lakh in Union Budget 2024 for micro-enterprises scaling operations.",
    subsidyPercentage: 0,
    subsidyAssistance: "CGTMSE backed guarantee. Competitive commercial lending rates.",
    targetBeneficiaries: "Established workshops, food processing units, village transport tempo operators, solar installers.",
    collateralRequirement: "Hypothecation of assets created out of bank finance; no third party guarantee.",
    sectorTag: "All Sectors",
    highlightBadge: "Up to ₹20 Lakh (Enhanced)",
    officialPortal: "JanSamarth Portal",
    portalUrl: "https://www.jansamarth.in",
    eligibilityCriteria: [
      "Prior track record of prompt repayment or solid viable enterprise business plan",
      "Udyam Registration Certificate (free on udyamregistration.gov.in)",
      "Viable enterprise cash flow showing minimum 1.5x DSCR coverage"
    ],
    documentsRequired: [
      "Udyam Registration Number",
      "GST returns or sales estimates for past 12 months (if applicable)",
      "Machinery invoices / builder estimate for shed",
      "Projected balance sheet & P&L for next 3 years"
    ]
  },
  {
    id: "mudra_shishu",
    code: "MUDRA-SHISHU",
    name: "PM MUDRA Yojana - Shishu (Up to ₹50,000)",
    nameHi: "पीएम मुद्रा योजना - शिशु ऋण (₹50,000 तक)",
    maxLoan: 50000,
    minLoan: 10000,
    interestRate: 7.75,
    tenureYears: 3,
    moratoriumMonths: 2,
    conditionDescription: "Immediate micro-credit for home artisans, vegetable vendors & roadside kiosks",
    reasoning: "Quick 48-hour sanction at any bank branch with minimal paperwork and flexible repayment.",
    subsidyPercentage: 0,
    subsidyAssistance: "2% interest rebate for on-time repayments.",
    targetBeneficiaries: "First-time ultra-micro entrepreneurs needing seed stock or handheld hand-tools.",
    collateralRequirement: "100% Collateral-Free.",
    sectorTag: "Services & Trading",
    highlightBadge: "Instant Micro Loan",
    officialPortal: "Udyamimitra Portal",
    portalUrl: "https://www.udyamimitra.in",
    eligibilityCriteria: [
      "Any self-employed individual or small vendor",
      "No formal business registration needed for loan up to ₹50,000"
    ],
    documentsRequired: [
      "Aadhaar Card",
      "Bank Passbook copy",
      "Passport-sized photographs"
    ]
  },
  {
    id: "standup_india",
    code: "STANDUP-INDIA",
    name: "Stand-Up India Scheme (₹10 Lakh to ₹1 Crore)",
    nameHi: "स्टैंड-अप इंडिया योजना (₹10 लाख से ₹1 करोड़)",
    maxLoan: 10000000,
    minLoan: 1000000,
    interestRate: 8.20,
    tenureYears: 7,
    moratoriumMonths: 18,
    conditionDescription: "Dedicated for SC/ST and Woman entrepreneurs for greenfield manufacturing, service or agri-trading",
    reasoning: "At least one SC/ST and one Woman borrower per bank branch. 18-month moratorium period for unit commissioning.",
    subsidyPercentage: 15,
    subsidyAssistance: "Margin money assistance from State Govts can reduce promoter contribution to 10%.",
    targetBeneficiaries: "SC, ST, and Women entrepreneurs setting up greenfield (first-time) ventures.",
    collateralRequirement: "Credit Guarantee Fund for Stand-Up India (CGFSI) guarantee.",
    sectorTag: "All Sectors",
    highlightBadge: "Women & SC/ST Priority",
    isBackwardCasteFocused: true,
    targetCategory: "SC / ST & Women (Mandatory Bank Branch Allocation)",
    officialPortal: "Standupmitra Portal",
    portalUrl: "https://www.standupmitra.in",
    eligibilityCriteria: [
      "Borrower must be a Woman OR belonging to Scheduled Caste (SC) / Scheduled Tribe (ST)",
      "In case of non-individual enterprises, 51% shareholding & controlling stake must be held by SC/ST or Woman",
      "Enterprise must be greenfield (first time venture)"
    ],
    documentsRequired: [
      "Aadhaar & PAN card",
      "Caste certificate (for SC/ST applicants)",
      "Project report with detailed machinery & shed expenditure",
      "Land ownership documents or registered long-term lease deed"
    ]
  },
  {
    id: "pmfme",
    code: "PMFME",
    name: "PM Formalisation of Micro Food Processing Enterprises (PMFME)",
    nameHi: "पीएम सूक्ष्म खाद्य प्रसंस्करण उद्यम योजना (PMFME)",
    maxLoan: 3000000,
    minLoan: 100000,
    interestRate: 8.15,
    tenureYears: 7,
    moratoriumMonths: 6,
    conditionDescription: "Food processing, pickles, spices, flour milling, cold-press oil, and millet value-addition",
    reasoning: "35% credit-linked capital subsidy up to ₹10 Lakh per unit under One District One Product (ODOP).",
    subsidyPercentage: 35,
    subsidyCap: 1000000,
    subsidyAssistance: "35% credit-linked capital subsidy directly credited to bank account to offset principal.",
    targetBeneficiaries: "Micro food processors, farmer producer groups (FPOs), SHGs, and local agri-food entrepreneurs.",
    collateralRequirement: "CGTMSE coverage applicable.",
    sectorTag: "Food Processing",
    highlightBadge: "35% Capital Subsidy (Food & Millets)",
    officialPortal: "Ministry of Food Processing Industries (MoFPI)",
    portalUrl: "https://pmfme.mofpi.gov.in",
    eligibilityCriteria: [
      "Existing or new micro food processing enterprise",
      "Promoter must be willing to invest at least 10% own contribution",
      "Preference given to One District One Product (ODOP) designated crops"
    ],
    documentsRequired: [
      "FSSAI basic food license or undertaking to obtain within 6 months",
      "Detailed project report on food unit machinery",
      "Bank account statements & Aadhaar/PAN"
    ]
  },
  {
    id: "pm_kusum",
    code: "PM-KUSUM",
    name: "PM-KUSUM Scheme (Solar Agri Pumps & Rural Clean Energy)",
    nameHi: "पीएम कुसुम योजना (सोलर कृषि पंप एवं ग्रामीण सौर ऊर्जा)",
    maxLoan: 1500000,
    minLoan: 150000,
    interestRate: 7.90,
    tenureYears: 7,
    moratoriumMonths: 6,
    conditionDescription: "Standalone solar agricultural pumps, pump solarisation & small rural solar plants",
    reasoning: "60% total subsidy (30% Central + 30% State Govt). Farmer/promoter margin only 10%.",
    subsidyPercentage: 60,
    subsidyAssistance: "30% Central Govt CFA + 30% State Subsidy = 60% total grant assistance.",
    targetBeneficiaries: "Farmers, rural youth, panchayats, water user associations setting up solar pumps or solar service kiosks.",
    collateralRequirement: "Hypothecation of solar equipment and pump sets.",
    sectorTag: "Solar & Green",
    highlightBadge: "60% Combined Subsidy",
    officialPortal: "MNRE PM-KUSUM National Portal",
    portalUrl: "https://pmkusum.mnre.gov.in",
    eligibilityCriteria: [
      "Land ownership or long-term lease for solar array installation",
      "Water source availability (borewell / canal / open well) for solar pump",
      "Applicant must not have previously claimed full central subsidy on the same parcel"
    ],
    documentsRequired: [
      "7/12 Land extract / Khasra-Khatauni showing land title",
      "Aadhaar card & Bank details",
      "Electricity board / DISCOM NOC or declaration of no grid pump"
    ]
  },
  {
    id: "nlm_ahidf",
    code: "NLM-AHIDF",
    name: "National Livestock Mission (NLM) & AHIDF",
    nameHi: "राष्ट्रीय पशुधन मिशन एवं पशुपालन अवसंरचना कोष",
    maxLoan: 4000000,
    minLoan: 200000,
    interestRate: 7.85,
    tenureYears: 8,
    moratoriumMonths: 12,
    conditionDescription: "Poultry parent farms, goat/sheep breeding, modern dairy chilling, and silage/fodder seed units",
    reasoning: "50% capital subsidy (up to ₹25-50 Lakh) plus 3% interest subvention for animal husbandry units.",
    subsidyPercentage: 50,
    subsidyCap: 2500000,
    subsidyAssistance: "50% back-ended capital subsidy released in two equal tranches through SIDBI.",
    targetBeneficiaries: "Rural dairy operators, goat rearers, poultry entrepreneurs, fodder entrepreneurs.",
    collateralRequirement: "Bank loan covered under Animal Husbandry Credit Guarantee Trust.",
    sectorTag: "Livestock & Dairy",
    highlightBadge: "50% Animal Husbandry Subsidy",
    officialPortal: "Department of Animal Husbandry & Dairying (DAHD)",
    portalUrl: "https://dahd.nic.in",
    eligibilityCriteria: [
      "Experience or formal training in animal husbandry / dairy management",
      "Sufficient land area for livestock shed and biosecure buffer",
      "Access to clean water source and veterinary access"
    ],
    documentsRequired: [
      "Veterinary health plan and biosecurity undertaking",
      "Land document for farm shed construction",
      "Detailed estimates for livestock procurement & shed construction",
      "Training certificate from Krishi Vigyan Kendra (KVK) or RSETI (preferred)"
    ]
  },
  {
    id: "nsfdc_nbcfdc",
    code: "NSFDC-NBCFDC",
    name: "National Backward Classes & SC Finance Concessional Credit Schemes",
    nameHi: "राष्ट्रीय पिछड़ा वर्ग एवं अनुसूचित जाति वित्त रियायती ऋण योजना (NSFDC / NBCFDC)",
    maxLoan: 5000000,
    minLoan: 50000,
    interestRate: 5.50,
    tenureYears: 7,
    moratoriumMonths: 6,
    conditionDescription: "Concessional credit (4% - 6% p.a.) for SC, ST, and OBC entrepreneurs, artisans & women",
    reasoning: "Dedicated apex corporations (NSFDC for SC, NBCFDC for OBC) channelized via Public Sector Banks & RRBs. Only 5% borrower margin required; up to 95% project cost funded.",
    subsidyPercentage: 30,
    subsidyCap: 1500000,
    subsidyAssistance: "Concessional interest rate (4% under Mahila Samriddhi, 5% for Micro-Credit, 6%-8% for Term Loans) plus margin money subsidy.",
    targetBeneficiaries: "OBC, SC, and ST micro-entrepreneurs, traditional artisans, transport operators, and women self-help members.",
    collateralRequirement: "Zero collateral up to ₹2 Lakh; Credit guarantee / hypothecation of assets for higher amounts.",
    sectorTag: "All Sectors",
    highlightBadge: "4% - 6% Backward Class Loan",
    isBackwardCasteFocused: true,
    targetCategory: "OBC / SC / ST / Traditional Artisans",
    officialPortal: "NSFDC & NBCFDC Joint Portal via Jan Samarth",
    portalUrl: "https://www.jansamarth.in",
    eligibilityCriteria: [
      "Applicant must belong to Scheduled Caste (SC), Scheduled Tribe (ST), or Other Backward Class (OBC)",
      "Annual family income within target guidelines (relaxed for micro-credit schemes)",
      "Traditional artisans and backward class youth getting self-employed",
      "Only 5% promoter margin money required"
    ],
    documentsRequired: [
      "Caste Certificate issued by Competent Revenue Authority (Tehsildar / SDO)",
      "Income Certificate / Self-Declaration of income",
      "Aadhaar Card and PAN Card",
      "Quotation of machines / tools / vehicle to be purchased",
      "Bank Account details"
    ]
  },
  {
    id: "dri_scheme",
    code: "DRI-4PCT",
    name: "Differential Rate of Interest (DRI) 4.0% Scheme",
    nameHi: "विभेदक ब्याज दर (DRI) 4% रियायती ऋण योजना",
    maxLoan: 150000,
    minLoan: 15000,
    interestRate: 4.00,
    tenureYears: 5,
    moratoriumMonths: 3,
    conditionDescription: "Ultra-concessional 4% p.a. bank loan for SC/ST and backward class low-income micro-enterprises",
    reasoning: "Mandated across all public sector commercial banks (SBI, PNB, BoB, Canara, RRBs) at fixed 4.0% annual interest rate with zero processing fee.",
    subsidyPercentage: 20,
    subsidyAssistance: "Fixed 4.0% concessional annual interest rate (saving 5%-8% compared to standard commercial loans).",
    targetBeneficiaries: "SC/ST micro-entrepreneurs, roadside vendors, cobblers, tailors, rural blacksmiths, small livestock keepers.",
    collateralRequirement: "100% Collateral-Free (Zero Third-Party Guarantee).",
    sectorTag: "Services & Trading",
    highlightBadge: "Fixed 4.0% Interest Rate",
    isBackwardCasteFocused: true,
    targetCategory: "SC / ST / Rural Backward Classes",
    officialPortal: "Reserve Bank of India (RBI) Priority Sector Lending",
    portalUrl: "https://www.rbi.org.in",
    eligibilityCriteria: [
      "SC/ST applicants given top priority (at least 40% of all bank DRI funds mandated for SC/ST)",
      "Annual family income up to ₹2,00,000 in rural areas",
      "Engaged in viable productive self-employment enterprise"
    ],
    documentsRequired: [
      "SC/ST Caste Certificate or BPL / Income Certificate",
      "Aadhaar Card",
      "Bank Passbook copy"
    ]
  }
];

export const PARTNER_BANKS: PartnerBank[] = [
  {
    id: "sbi",
    name: "State Bank of India (SBI)",
    shortName: "SBI Rural SME",
    logoInitial: "SBI",
    baseInterestRate: 8.25,
    processingFeeText: "0.25% (Waived up to ₹5 Lakh under Mudra)",
    ruralNetworkRating: "5/5 Star (22,000+ Branches across all blocks)",
    branchTurnaround: "7 - 10 Days",
    specialPerks: [
      "Direct integration with Jan Samarth portal for instant in-principle sanction",
      "Dedicated Agri-Commercial Officer (ACO) in every rural taluka branch",
      "Lowest processing charges and standardized documentation"
    ],
    eligibleSchemes: ["pmegp", "mudra_kishore", "mudra_tarun", "mudra_shishu", "standup_india", "pmfme", "pm_kusum", "nlm_ahidf"],
    helpline: "1800 1234 / 1800 2100",
    portalName: "SBI YONO Business / SME Sanjeevani"
  },
  {
    id: "bob",
    name: "Bank of Baroda (BoB)",
    shortName: "Bank of Baroda",
    logoInitial: "BOB",
    baseInterestRate: 8.35,
    processingFeeText: "Nil for loans up to ₹5 Lakh; 0.30% above",
    ruralNetworkRating: "4.8/5 Star (Strong West & Central India presence)",
    branchTurnaround: "5 - 8 Days",
    specialPerks: [
      "Baroda Digital SME Hub with rapid paperless in-principle approval",
      "Priority processing for Women Entrepreneurs with 0.10% interest discount",
      "PMEGP Task Force fast clearance coordination"
    ],
    eligibleSchemes: ["pmegp", "mudra_kishore", "mudra_tarun", "mudra_shishu", "standup_india", "pmfme", "pm_kusum"],
    helpline: "1800 5700",
    portalName: "Baroda MSME Express"
  },
  {
    id: "pnb",
    name: "Punjab National Bank (PNB)",
    shortName: "PNB Gramin Vikas",
    logoInitial: "PNB",
    baseInterestRate: 8.30,
    processingFeeText: "0.20% (Concessional for MSME)",
    ruralNetworkRating: "4.8/5 Star (Dominant North & Eastern India Network)",
    branchTurnaround: "6 - 9 Days",
    specialPerks: [
      "Largest rural network in Uttar Pradesh, Punjab, Bihar, Rajasthan, Haryana",
      "Special PNB Vikas camps in Krishi Vigyan Kendras (KVKs)",
      "Instant Mudra card with overdraft facility for working capital"
    ],
    eligibleSchemes: ["pmegp", "mudra_kishore", "mudra_tarun", "mudra_shishu", "standup_india", "pmfme", "nlm_ahidf"],
    helpline: "1800 180 2222",
    portalName: "PNB E-Corporate / Jan Samarth Hub"
  },
  {
    id: "canara",
    name: "Canara Bank",
    shortName: "Canara MSME Pragati",
    logoInitial: "CB",
    baseInterestRate: 8.40,
    processingFeeText: "0.25% for rural projects",
    ruralNetworkRating: "4.7/5 Star (Strong South & Western India reach)",
    branchTurnaround: "6 - 10 Days",
    specialPerks: [
      "Pioneer in Self Help Group (SHG) bank linkage and rural artisan loans",
      "Co-sponsors with RSETI for entrepreneurship training & fast approvals",
      "Special sanction desk for food processing and herbal units"
    ],
    eligibleSchemes: ["pmegp", "mudra_kishore", "mudra_tarun", "standup_india", "pmfme", "pm_kusum"],
    helpline: "1800 425 0018",
    portalName: "Canara MSME e-Hub"
  },
  {
    id: "rrb_nabard",
    name: "Regional Rural Banks (RRBs via NABARD Refinance)",
    shortName: "Gramin Banks (RRB)",
    logoInitial: "RRB",
    baseInterestRate: 7.75,
    processingFeeText: "Zero processing fee for priority micro loans up to ₹3 Lakh",
    ruralNetworkRating: "5/5 Star (Present at Village Panchayat / Block level)",
    branchTurnaround: "5 - 7 Days",
    specialPerks: [
      "Operating locally (e.g. Maharashtra Gramin, Prathama UP, Aryavart, Paschim Banga)",
      "Bank Sakhi / BC Model allows doorstep document verification in village",
      "Direct NABARD 3% interest subvention on animal husbandry and micro-solar units"
    ],
    eligibleSchemes: ["pmegp", "mudra_kishore", "mudra_shishu", "pmfme", "pm_kusum", "nlm_ahidf"],
    helpline: "Contact Local Gramin Bank Branch / Lead Bank Manager",
    portalName: "NABARD Village Credit Portal"
  },
  {
    id: "hdfc_rural",
    name: "HDFC Bank Rural & Semi-Urban",
    shortName: "HDFC Rural Hub",
    logoInitial: "HDFC",
    baseInterestRate: 8.95,
    processingFeeText: "0.50% (Fast-track digital clearance)",
    ruralNetworkRating: "4.5/5 Star (Deep semi-urban mandi & town centers)",
    branchTurnaround: "2 - 4 Days (Fastest in Industry)",
    specialPerks: [
      "Fastest 48-hour commercial vehicle / tempo / machinery financing",
      "Completely paperless digital journey via tablet banking at shop premises",
      "Flexible repayments structured according to seasonal agricultural harvests"
    ],
    eligibleSchemes: ["mudra_kishore", "mudra_tarun", "standup_india", "pmegp"],
    helpline: "1800 202 6161",
    portalName: "HDFC Rural Connect"
  },
  {
    id: "nsfdc_apex",
    name: "National Scheduled Castes Finance & Dev Corp (NSFDC / SCA via SBI & PNB)",
    shortName: "NSFDC SC/ST Financial Corp",
    logoInitial: "NSFDC",
    baseInterestRate: 5.00,
    processingFeeText: "Nil (100% Waived for SC/ST Applicants)",
    ruralNetworkRating: "5/5 Star (National Apex Apex Body channelized via SBI, PNB, Canara & State SCAs)",
    branchTurnaround: "5 - 7 Days",
    isApexBackwardClassBank: true,
    targetCategory: "Scheduled Caste (SC) & Scheduled Tribe (ST)",
    specialPerks: [
      "Ultra-low 4.0% interest rate under Mahila Samriddhi Yojana (MSY) for women entrepreneurs",
      "Micro-Credit Finance up to ₹1,40,000 at only 5% annual interest through local bank branches",
      "Promoter margin money reduced to just 5%; 95% of project cost funded by NSFDC & partner bank"
    ],
    eligibleSchemes: ["nsfdc_nbcfdc", "dri_scheme", "standup_india", "pmegp", "mudra_kishore"],
    helpline: "1800 11 0505 / 011-22054135",
    portalName: "nsfdc.nic.in / Jan Samarth MSME"
  },
  {
    id: "nbcfdc_apex",
    name: "National Backward Classes Finance & Dev Corp (NBCFDC via RRBs & Canara Bank)",
    shortName: "NBCFDC Backward Classes Corp",
    logoInitial: "NBCFDC",
    baseInterestRate: 5.50,
    processingFeeText: "Nil (Zero processing charge for OBC youth & artisans)",
    ruralNetworkRating: "4.8/5 Star (Channelized via Regional Rural Banks, Canara Bank, and State BC Corporations)",
    branchTurnaround: "5 - 8 Days",
    isApexBackwardClassBank: true,
    targetCategory: "Other Backward Class (OBC) & Traditional Crafts",
    specialPerks: [
      "Shilp Sampada scheme for traditional OBC artisans up to ₹10 Lakh at 5% - 6% p.a. interest",
      "New Swarnima concessional term credit for backward class women at 5% p.a. with no collateral",
      "Microfinance loans up to ₹1,25,000 at 5% p.a. through Self Help Groups and Gramin Banks"
    ],
    eligibleSchemes: ["nsfdc_nbcfdc", "pmegp", "pmfme", "mudra_kishore", "mudra_tarun"],
    helpline: "011-45854400 / 1800 102 3399",
    portalName: "nbcfdc.gov.in / Jan Samarth Portal"
  },
  {
    id: "nstfdc_apex",
    name: "National Scheduled Tribes Finance & Dev Corp (NSTFDC Tribal Credit Channel)",
    shortName: "NSTFDC Tribal Credit",
    logoInitial: "NSTFDC",
    baseInterestRate: 4.50,
    processingFeeText: "Nil (100% Free for Tribal Beneficiaries)",
    ruralNetworkRating: "4.9/5 Star (Deep presence in Tribal ITDA Blocks & Gramin Banks)",
    branchTurnaround: "5 - 7 Days",
    isApexBackwardClassBank: true,
    targetCategory: "Scheduled Tribe (ST)",
    specialPerks: [
      "Adivasi Mahila Sashaktikaran Yojana (AMSY) at flat 4% concessional interest p.a.",
      "Micro-Credit Scheme for ST self-help groups and minor forest produce collectors",
      "Direct 90% refinance to Regional Rural Banks and State Tribal Corporations"
    ],
    eligibleSchemes: ["nsfdc_nbcfdc", "dri_scheme", "standup_india", "pmegp", "nlm_ahidf"],
    helpline: "011-26713580 / 1800 11 0031",
    portalName: "nstfdc.tribal.gov.in"
  }
];

// Helper to find a scheme by ID
export function getSchemeById(id: string): GovernmentScheme {
  return AVAILABLE_SCHEMES.find(s => s.id === id) || AVAILABLE_SCHEMES[0];
}

// Helper to find a bank by ID
export function getBankById(id: string): PartnerBank {
  return PARTNER_BANKS.find(b => b.id === id) || PARTNER_BANKS[0];
}

// Helper to find backward caste focused schemes
export function getBackwardCasteSchemes(): GovernmentScheme[] {
  return AVAILABLE_SCHEMES.filter(s => s.isBackwardCasteFocused);
}

// Helper to find backward caste focused banks
export function getBackwardCasteBanks(): PartnerBank[] {
  return PARTNER_BANKS.filter(b => b.isApexBackwardClassBank);
}
