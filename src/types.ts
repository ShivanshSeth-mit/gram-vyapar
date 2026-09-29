export type SupportedLanguage = 
  | "en" 
  | "hi" 
  | "mr" 
  | "bn" 
  | "ta" 
  | "te" 
  | "gu" 
  | "kn" 
  | "ml" 
  | "pa" 
  | "or" 
  | "as" 
  | "ur";

export interface LanguageMeta {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  region: string;
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: "en", name: "English", nativeName: "English", region: "National / Global" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", region: "North & Central India" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", region: "Maharashtra" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", region: "West Bengal & Tripura" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", region: "Tamil Nadu & Puducherry" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", region: "Andhra Pradesh & Telangana" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", region: "Gujarat" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", region: "Karnataka" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", region: "Kerala" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", region: "Punjab" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ", region: "Odisha" },
  { code: "as", name: "Assamese", nativeName: "অসমীয়া", region: "Assam & North East" },
  { code: "ur", name: "Urdu", nativeName: "اردو", region: "National / Jammu & Kashmir" },
];

export type SocialCategory = "General" | "OBC" | "SC" | "ST";

export interface UserInputState {
  location: string;
  state: string;
  district: string;
  villageOrBlock: string;
  pinCode: string;
  marginCapital: number;
  businessCategory: string;
  socialCategory?: SocialCategory;
  customCategory?: string;
  applicantName?: string;
  phone?: string;
}

export interface FeasibilityMarketReach {
  summary: string;
  consumerBase: string;
  channels: string[];
}

export interface FeasibilityOpportunity {
  summary: string;
  niches: string[];
}

export interface FeasibilitySWOT {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface FeasibilityThreats {
  summary: string;
  risks: string[];
}

export interface FeasibilityCompetitor {
  summary: string;
  existingCount: number;
  densityLevel: string;
  competitorInsights: string;
}

export interface FeasibilityProductValue {
  summary: string;
  priceRange: string;
  marginEstimate: string;
  benchmarkNote: string;
}

export interface FeasibilityReportData {
  language?: SupportedLanguage;
  marketReach: FeasibilityMarketReach;
  opportunityAnalysis: FeasibilityOpportunity;
  swot: FeasibilitySWOT;
  threatsIdentification: FeasibilityThreats;
  competitorMapping: FeasibilityCompetitor;
  productMarketValue: FeasibilityProductValue;
}

export interface GovernmentScheme {
  id: string; // "pmegp" | "mudra_shishu" | "mudra_kishore" | "mudra_tarun" | "standup_india" | "pmfme" | "pm_kusum" | "nlm_ahidf" | "micro_finance" | "term_loan" | "custom_scheme";
  code?: string;
  name: string;
  nameHi: string;
  maxLoan: number;
  minLoan?: number;
  interestRate: number; // percentage p.a.
  tenureYears: number;
  moratoriumMonths: number;
  conditionDescription: string;
  reasoning: string;
  subsidyAssistance?: string;
  subsidyPercentage?: number; // e.g., 35 for 35%
  subsidyCap?: number; // in INR
  targetBeneficiaries?: string;
  collateralRequirement?: string;
  eligibilityCriteria?: string[];
  documentsRequired?: string[];
  officialPortal?: string;
  portalUrl?: string;
  sectorTag?: "All Sectors" | "Manufacturing" | "Food Processing" | "Solar & Green" | "Livestock & Dairy" | "Services & Trading";
  highlightBadge?: string;
  isBackwardCasteFocused?: boolean;
  targetCategory?: string;
}

export interface PartnerBank {
  id: string; // "sbi" | "bob" | "pnb" | "canara" | "rrb_nabard" | "hdfc_rural" | "nsfdc_apex" | "nbcfdc_apex"
  name: string;
  shortName: string;
  logoInitial: string;
  baseInterestRate: number; // e.g. 8.25
  processingFeeText: string;
  ruralNetworkRating: string; // e.g. "5/5 Star (22,000+ Rural Branches)"
  branchTurnaround: string; // e.g. "7 - 10 Days"
  specialPerks: string[];
  eligibleSchemes: string[]; // scheme ids
  helpline: string;
  portalName: string;
  isApexBackwardClassBank?: boolean;
  targetCategory?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: "entrepreneur" | "counselor";
  state?: string;
  district?: string;
  udyamNumber?: string;
  isLoggedIn: boolean;
  avatarColor?: string;
}

export interface AiChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
}

export interface QuarterlyScheduleItem {
  quarter: number;
  year: number;
  isMoratorium: boolean;
  openingBalance: number;
  principalPaid: number;
  interestPaid: number;
  totalEmi: number;
  closingBalance: number;
}

export interface FinancialPlanCalculation {
  marginCapital: number;
  marginPercentage: number;
  totalProjectCost: number;
  loanEligibility: number;
  matchedScheme: GovernmentScheme;
  totalQuarters: number;
  moratoriumQuarters: number;
  quarterlyInterestRate: number;
  regularQuarterlyEmi: number;
  moratoriumQuarterlyPayment: number;
  totalInterestPayable: number;
  totalRepaymentAmount: number;
  schedule: QuarterlyScheduleItem[];
  // Working capital estimations
  monthlyRawMaterial: number;
  monthlyRentUtilities: number;
  monthlyWages: number;
  monthlyTotalOpex: number;
  monthlyEstimatedRevenue: number;
  monthlyNetCashflow: number;
  monthlyEmiEquivalent: number;
  dscr: number; // Debt Service Coverage Ratio
}

export interface StoredReportItem {
  id: string;
  phone: string;
  timestamp: string;
  location: string;
  businessCategory: string;
  marginCapital: number;
  projectCost: number;
  loanEligibility: number;
  schemeName: string;
  reportData: FeasibilityReportData;
}

export interface UserFeedback {
  id: string;
  timestamp: string;
  rating: number; // 1 to 5
  tags: string[];
  comment?: string;
  businessCategory?: string;
  location?: string;
  marginCapital?: number;
}
