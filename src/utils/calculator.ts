import { FinancialPlanCalculation, GovernmentScheme, QuarterlyScheduleItem, SocialCategory } from "../types";
import { AVAILABLE_SCHEMES, PARTNER_BANKS, getSchemeById, getBankById } from "../data/schemesAndBanks";

export function calculateFinancialPlan(
  marginCapital: number,
  categoryInfo?: { rawMaterialShare?: number; rentWagesShare?: number; estimatedGrossMargin?: number; businessCategory?: string },
  selectedSchemeId?: string,
  selectedBankId?: string,
  socialCategory?: SocialCategory
): FinancialPlanCalculation {
  // Backward categories (SC/ST/OBC) qualify for reduced 5% promoter margin money under PMEGP and apex corporations
  const isSpecialCategory = socialCategory === "OBC" || socialCategory === "SC" || socialCategory === "ST";
  const marginPercentage = isSpecialCategory ? 5 : 10;
  const safeMargin = Math.max(marginCapital, 10000);
  
  // Total Project Cost = Margin ÷ (marginPercentage / 100)
  const totalProjectCost = Math.round(safeMargin / (marginPercentage / 100));
  
  // Maximum Loan Amount = Project Cost × (1 - margin / 100)
  const theoreticalLoan = Math.round(totalProjectCost * (1 - marginPercentage / 100));

  // Scheme Auto-Selection or User-Selected Scheme Logic
  let matchedScheme: GovernmentScheme;
  let actualLoan = theoreticalLoan;

  if (selectedSchemeId) {
    matchedScheme = { ...getSchemeById(selectedSchemeId) };
    // Adjust interest rate if a specific partner bank is also selected
    if (selectedBankId) {
      const bank = getBankById(selectedBankId);
      // Scheme base rate adjusted slightly by bank base rate
      matchedScheme.interestRate = Number(((matchedScheme.interestRate + bank.baseInterestRate) / 2).toFixed(2));
    }
    actualLoan = Math.min(theoreticalLoan, matchedScheme.maxLoan);
  } else {
    // Smart Auto-Matching based on Project Cost, Category and Social Category
    const catLower = (categoryInfo?.businessCategory || "").toLowerCase();
    
    if (isSpecialCategory && (socialCategory === "SC" || socialCategory === "ST") && totalProjectCost >= 1000000 && totalProjectCost <= 10000000) {
      matchedScheme = { ...getSchemeById("standup_india") };
    } else if (isSpecialCategory && totalProjectCost <= 5000000) {
      matchedScheme = { ...getSchemeById("nsfdc_nbcfdc") };
    } else if (catLower.includes("solar") || catLower.includes("energy")) {
      matchedScheme = { ...getSchemeById("pm_kusum") };
    } else if (catLower.includes("dairy") || catLower.includes("livestock") || catLower.includes("husbandry") || catLower.includes("poultry")) {
      matchedScheme = { ...getSchemeById("nlm_ahidf") };
    } else if (catLower.includes("food") || catLower.includes("millet") || catLower.includes("pickle") || catLower.includes("oil")) {
      matchedScheme = { ...getSchemeById("pmfme") };
    } else if (totalProjectCost <= 60000) {
      matchedScheme = { ...getSchemeById("mudra_shishu") };
    } else if (totalProjectCost <= 550000) {
      matchedScheme = { ...getSchemeById("mudra_kishore") };
    } else if (totalProjectCost <= 2200000) {
      matchedScheme = { ...getSchemeById("pmegp") };
    } else {
      matchedScheme = { ...getSchemeById("standup_india") };
    }
    actualLoan = Math.min(theoreticalLoan, matchedScheme.maxLoan);
  }

  const totalQuarters = Math.max(4, matchedScheme.tenureYears * 4);
  const moratoriumQuarters = Math.max(1, Math.round(matchedScheme.moratoriumMonths / 3));
  const quarterlyInterestRate = (matchedScheme.interestRate / 100) / 4;

  // Post-moratorium amortization quarters
  const amortQuarters = totalQuarters - moratoriumQuarters;
  
  // Standard reducing balance quarterly EMI for post-moratorium period:
  // EMI = P * [r(1+r)^N] / [(1+r)^N - 1]
  const p = actualLoan;
  const r = quarterlyInterestRate;
  const n = amortQuarters;
  const factor = Math.pow(1 + r, n);
  const regularQuarterlyEmi = Math.round(p * (r * factor) / (factor - 1));
  const moratoriumQuarterlyPayment = Math.round(p * r); // Interest-only serviced during moratorium

  const schedule: QuarterlyScheduleItem[] = [];
  let balance = p;
  let totalInterestPayable = 0;
  let totalRepaymentAmount = 0;

  for (let q = 1; q <= totalQuarters; q++) {
    const year = Math.ceil(q / 4);
    const openingBalance = balance;
    const isMoratorium = q <= moratoriumQuarters;

    let principalPaid = 0;
    let interestPaid = Math.round(openingBalance * r);
    let totalEmi = 0;
    let closingBalance = openingBalance;

    if (isMoratorium) {
      principalPaid = 0;
      totalEmi = interestPaid; // Interest-only during moratorium
      closingBalance = openingBalance;
    } else {
      if (q === totalQuarters) {
        // Last quarter settle remainder
        principalPaid = openingBalance;
        interestPaid = Math.round(openingBalance * r);
        totalEmi = principalPaid + interestPaid;
        closingBalance = 0;
      } else {
        totalEmi = regularQuarterlyEmi;
        principalPaid = Math.min(totalEmi - interestPaid, openingBalance);
        closingBalance = Math.max(0, openingBalance - principalPaid);
      }
    }

    balance = closingBalance;
    totalInterestPayable += interestPaid;
    totalRepaymentAmount += totalEmi;

    schedule.push({
      quarter: q,
      year,
      isMoratorium,
      openingBalance,
      principalPaid,
      interestPaid,
      totalEmi,
      closingBalance
    });
  }

  // Working Capital & Cash Flow Estimation
  // A viable rural enterprise typically turns over ~18% - 22% of capital per month
  const estMonthlyRevenue = Math.round(totalProjectCost * 0.20);
  const rawShare = categoryInfo?.rawMaterialShare ?? 0.50;
  const rentWagesShare = categoryInfo?.rentWagesShare ?? 0.18;

  const monthlyRawMaterial = Math.round(estMonthlyRevenue * rawShare);
  const monthlyRentUtilities = Math.round(estMonthlyRevenue * (rentWagesShare * 0.4));
  const monthlyWages = Math.round(estMonthlyRevenue * (rentWagesShare * 0.6));
  const monthlyTotalOpex = monthlyRawMaterial + monthlyRentUtilities + monthlyWages;
  const monthlyNetCashflow = Math.max(0, estMonthlyRevenue - monthlyTotalOpex);

  const monthlyEmiEquivalent = Math.round(regularQuarterlyEmi / 3);
  const dscr = monthlyEmiEquivalent > 0 
    ? Number((monthlyNetCashflow / monthlyEmiEquivalent).toFixed(2))
    : 2.5;

  return {
    marginCapital: safeMargin,
    marginPercentage,
    totalProjectCost,
    loanEligibility: actualLoan,
    matchedScheme,
    totalQuarters,
    moratoriumQuarters,
    quarterlyInterestRate,
    regularQuarterlyEmi,
    moratoriumQuarterlyPayment,
    totalInterestPayable,
    totalRepaymentAmount,
    schedule,
    monthlyRawMaterial,
    monthlyRentUtilities,
    monthlyWages,
    monthlyTotalOpex,
    monthlyEstimatedRevenue: estMonthlyRevenue,
    monthlyNetCashflow,
    monthlyEmiEquivalent,
    dscr
  };
}

export function formatINR(val: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(val);
}

export function formatIndianWords(val: number): string {
  if (val >= 10000000) {
    return `₹${(val / 10000000).toFixed(2)} Crore`;
  }
  if (val >= 100000) {
    return `₹${(val / 100000).toFixed(2)} Lakh`;
  }
  if (val >= 1000) {
    return `₹${(val / 1000).toFixed(1)} Thousand`;
  }
  return `₹${val}`;
}
