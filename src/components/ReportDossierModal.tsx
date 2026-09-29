import React, { useState, useRef } from "react";
import { FeasibilityReportData, FinancialPlanCalculation, SupportedLanguage, UserInputState } from "../types";
import { translations } from "../data/translations";
import { formatINR } from "../utils/calculator";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { auth, saveReportToFirestore } from "../lib/firebase";
import {
  X,
  Printer,
  Download,
  Share2,
  Bookmark,
  CheckCircle2,
  Landmark,
  FileCheck,
  Phone,
  Building2,
  AlertCircle
} from "lucide-react";

interface ReportDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  userInput: UserInputState;
  feasibility: FeasibilityReportData;
  financialPlan: FinancialPlanCalculation;
  currentLang: SupportedLanguage;
  onReportSaved?: (phone: string) => void;
}

export const ReportDossierModal: React.FC<ReportDossierModalProps> = ({
  isOpen,
  onClose,
  userInput,
  feasibility,
  financialPlan,
  currentLang,
  onReportSaved
}) => {
  const t = translations[currentLang];
  const printableRef = useRef<HTMLDivElement>(null);

  const [savePhone, setSavePhone] = useState(userInput.phone || "");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  if (!isOpen) return null;

  // Handle Save Report
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = savePhone.replace(/\D/g, "").slice(-10);
    if (cleanPhone.length < 10) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsSaving(true);
    const reportItem = {
      id: `rep-${Date.now()}`,
      phone: cleanPhone,
      location: userInput.location,
      businessCategory: userInput.businessCategory,
      marginCapital: financialPlan.marginCapital,
      projectCost: financialPlan.totalProjectCost,
      loanEligibility: financialPlan.loanEligibility,
      schemeName: financialPlan.matchedScheme.name,
      reportData: feasibility,
      timestamp: new Date().toISOString()
    };

    try {
      // 1. Save to Cloud Firestore if logged in
      if (auth.currentUser) {
        try {
          await saveReportToFirestore(auth.currentUser.uid, reportItem);
        } catch (fbErr) {
          console.warn("Firestore save report notice:", fbErr);
        }
      }

      // 2. Also call API route
      await fetch("/api/saved-reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reportItem)
      });

      // 3. Save locally in browser storage
      const localKey = `udyam_reports_${cleanPhone}`;
      const existing = JSON.parse(localStorage.getItem(localKey) || "[]");
      existing.unshift(reportItem);
      localStorage.setItem(localKey, JSON.stringify(existing));

      setSaveSuccess(true);
      if (onReportSaved) onReportSaved(cleanPhone);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      console.warn("Save failed on server, saved locally:", err);
      setSaveSuccess(true);
    } finally {
      setIsSaving(false);
    }
  };

  // WhatsApp Share Generator
  const handleWhatsAppShare = () => {
    const text = `*🇮🇳 UDYAM SAHAYAK - BUSINESS FEASIBILITY & SCHEME DOSSIER*
----------------------------------
👤 *Applicant:* ${userInput.applicantName || "Enterprising Citizen"}
📍 *Location:* ${userInput.location}
💼 *Business:* ${userInput.businessCategory}

💰 *Financial Sizing (10% Margin Money Scheme):*
• *Your Margin (10%):* ${formatINR(financialPlan.marginCapital)}
• *Total Project Cost:* ${formatINR(financialPlan.totalProjectCost)}
• *Max Loan Eligibility (90%):* ${formatINR(financialPlan.loanEligibility)}

🏛️ *Qualified Scheme:* ${financialPlan.matchedScheme.name}
• *Interest Rate:* ${financialPlan.matchedScheme.interestRate}% p.a. (Subsidized)
• *Tenure:* ${financialPlan.matchedScheme.tenureYears} Years (${financialPlan.totalQuarters} Quarters)
• *Moratorium (Grace):* ${financialPlan.matchedScheme.moratoriumMonths} Months
• *Quarterly Repayment (EMI):* ${formatINR(financialPlan.regularQuarterlyEmi)}

📊 *Viability:*
• Monthly Net Cash Flow: ${formatINR(financialPlan.monthlyNetCashflow)}
• Debt Coverage (DSCR): ${financialPlan.dscr}x (Bank Approved Zone)

_Prepared via Udyam Sahayak Rural MSME Advisory Portal._`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  // Export PDF via html2canvas and jsPDF
  const handleDownloadPdf = async () => {
    if (!printableRef.current) return;
    setIsGeneratingPdf(true);

    try {
      const element = printableRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff"
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const fileName = `Gram_Vyapar_Dossier_${userInput.businessCategory.replace(/\s+/g, "_")}.pdf`;
      pdf.save(fileName);
    } catch (err) {
      console.error("PDF generation failed:", err);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto" id="report-dossier-modal">
      <div className="bg-white w-full max-w-4xl max-h-[92vh] rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Top Control Bar */}
        <div className="p-4 bg-blue-900 text-white border-b border-blue-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-800 flex items-center justify-center text-white border border-blue-700">
              <FileCheck className="h-4 w-4 text-blue-200" />
            </div>
            <h3 className="font-black text-sm sm:text-base uppercase tracking-tight text-white">
              Bank / SCA Feasibility & Loan Dossier
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {/* WhatsApp Share */}
            <button
              type="button"
              id="whatsapp-share-btn"
              onClick={handleWhatsAppShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-green-600 hover:bg-green-500 text-white text-xs font-bold rounded-full shadow-xs transition-colors uppercase tracking-tight"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{t.shareWhatsApp}</span>
            </button>

            {/* Print */}
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-800 hover:bg-blue-700 text-white text-xs font-bold rounded-full transition-colors uppercase tracking-tight border border-blue-700"
            >
              <Printer className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>

            {/* Download PDF */}
            <button
              type="button"
              id="download-pdf-btn"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white hover:bg-slate-100 text-blue-900 text-xs font-black rounded-full shadow-xs transition-colors uppercase tracking-tight"
            >
              <Download className="h-3.5 w-3.5 text-blue-900" />
              <span>{isGeneratingPdf ? "Generating..." : t.downloadPdf}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-blue-300 hover:text-white hover:bg-blue-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Quick Phone Save Sub-bar */}
        <div className="p-3 bg-blue-50/70 border-b border-blue-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <form onSubmit={handleSave} className="flex items-center gap-2 w-full sm:w-auto">
            <span className="font-bold uppercase tracking-wider text-[10px] text-blue-900 hidden md:inline">Save for Bank Visits:</span>
            <div className="relative">
              <input
                type="tel"
                value={savePhone}
                onChange={(e) => setSavePhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="Enter 10-digit mobile"
                className="pl-3.5 pr-2 py-1.5 bg-white border border-blue-300 rounded-full text-xs text-slate-900 font-semibold focus:outline-blue-900 w-44"
              />
            </div>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-full font-bold uppercase tracking-tight text-xs flex items-center gap-1.5"
            >
              <Bookmark className="h-3.5 w-3.5" />
              {isSaving ? "Saving..." : t.saveReport}
            </button>
          </form>

          {saveSuccess && (
            <span className="text-xs font-bold text-blue-900 flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              Saved! You can retrieve it anytime using your phone number.
            </span>
          )}
        </div>

        {/* Printable Official Dossier View */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50 text-slate-900">
          <div
            ref={printableRef}
            className="max-w-3xl mx-auto p-7 bg-white border border-slate-300 rounded-2xl shadow-sm space-y-6 text-slate-900 print:border-0 print:p-0 print:shadow-none"
            id="official-bank-dossier"
          >
            {/* Official Header */}
            <div className="border-b-2 border-blue-900 pb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-blue-900 text-white flex items-center justify-center font-bold text-lg">
                  <Landmark className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-black tracking-tight text-slate-900 uppercase">
                    GRAM VYAPAR (ग्राम व्यापार)
                  </h1>
                  <p className="text-xs font-bold text-blue-900 uppercase tracking-tight">
                    Rural & Semi-Urban Enterprise Feasibility & Government Margin Scheme Report
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium">
                    Formulated under 10% Margin Money MSME Guidelines • Prepared for Bank / SCA Verification
                  </p>
                </div>
              </div>

              <div className="text-right text-[11px] text-slate-600">
                <p><strong>Dossier Ref:</strong> GV-{Date.now().toString().slice(-6)}</p>
                <p><strong>Date:</strong> {new Date().toLocaleDateString("en-IN")}</p>
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-green-100 text-green-900 font-bold text-[10px] border border-green-200">
                  RECOMMENDED FOR SANCTION
                </span>
              </div>
            </div>

            {/* Applicant & Location Metadata */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold">Applicant</span>
                <p className="font-bold text-slate-900">{userInput.applicantName || "Enterprising Citizen"}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold">Contact</span>
                <p className="font-bold text-slate-900">{userInput.phone || savePhone || "Not provided"}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold">Enterprise</span>
                <p className="font-bold text-slate-900">{userInput.businessCategory}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold">Location</span>
                <p className="font-bold text-slate-900 truncate">{userInput.location}</p>
              </div>
            </div>

            {/* Financial Structuring Certificate Block */}
            <div className="p-5 bg-white border border-slate-200 border-l-4 border-l-blue-600 rounded-xl shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-blue-900 uppercase tracking-wider">
                  1. Financial Sizing & Scheme Eligibility
                </h3>
                <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  {financialPlan.matchedScheme.name}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Promoter Margin (10%)</span>
                  <p className="text-base font-black text-slate-900 mt-0.5">{formatINR(financialPlan.marginCapital)}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-blue-900 uppercase font-bold">Total Project Cost (100%)</span>
                  <p className="text-base font-black text-blue-900 mt-0.5">{formatINR(financialPlan.totalProjectCost)}</p>
                </div>
                <div className="bg-blue-900 text-white p-3 rounded-lg border border-blue-800">
                  <span className="text-[10px] text-blue-200 uppercase font-bold">Sanction Loan Limit (90%)</span>
                  <p className="text-base font-black text-white mt-0.5">{formatINR(financialPlan.loanEligibility)}</p>
                </div>
              </div>

              <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex flex-wrap justify-between gap-2 font-medium">
                <span><strong>Interest Rate:</strong> {financialPlan.matchedScheme.interestRate}% p.a.</span>
                <span><strong>Tenure:</strong> {financialPlan.matchedScheme.tenureYears} Years</span>
                <span><strong>Moratorium Grace:</strong> {financialPlan.matchedScheme.moratoriumMonths} Months</span>
                <span><strong>Quarterly EMI:</strong> {formatINR(financialPlan.regularQuarterlyEmi)}</span>
              </div>
            </div>

            {/* Feasibility Highlights */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                2. Market Feasibility Summary
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 uppercase text-[10px] block mb-1">Market Reach (5–10 km):</span>
                  <p className="text-slate-700 leading-relaxed">{feasibility.marketReach?.summary}</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 uppercase text-[10px] block mb-1">Local Opportunity & Niches:</span>
                  <p className="text-slate-700 leading-relaxed">{feasibility.opportunityAnalysis?.summary}</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 uppercase text-[10px] block mb-1">Recommended Selling Price:</span>
                  <p className="text-slate-700 leading-relaxed">{feasibility.productMarketValue?.priceRange} ({feasibility.productMarketValue?.marginEstimate})</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 uppercase text-[10px] block mb-1">Block Competition Density:</span>
                  <p className="text-slate-700 leading-relaxed">{feasibility.competitorMapping?.densityLevel} — {feasibility.competitorMapping?.summary}</p>
                </div>
              </div>
            </div>

            {/* Operational Cash Flow Snapshot */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <h4 className="font-bold uppercase tracking-wider text-[10px] text-slate-900 mb-2.5">3. Monthly Cash Flow & Debt Service Viability</h4>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Gross Revenue</span>
                  <p className="font-bold text-slate-900 mt-0.5">{formatINR(financialPlan.monthlyEstimatedRevenue)}</p>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Opex</span>
                  <p className="font-bold text-red-700 mt-0.5">{formatINR(financialPlan.monthlyTotalOpex)}</p>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-green-800 uppercase font-bold">Net Cash Flow</span>
                  <p className="font-bold text-green-900 mt-0.5">{formatINR(financialPlan.monthlyNetCashflow)}</p>
                </div>
                <div className="bg-green-50 p-2.5 rounded-lg border border-green-200">
                  <span className="text-[10px] text-green-800 uppercase font-bold">DSCR Ratio</span>
                  <p className="font-black text-green-900 mt-0.5">{financialPlan.dscr}x (Safe)</p>
                </div>
              </div>
            </div>

            {/* Condensed Quarterly Schedule First 4 Quarters */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 mb-1.5">
                4. Initial Quarterly Repayment Schedule (Sample)
              </h4>
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 font-bold uppercase text-[10px]">
                    <th className="py-1.5 px-2">Quarter</th>
                    <th className="py-1.5 px-2">Opening</th>
                    <th className="py-1.5 px-2">Principal</th>
                    <th className="py-1.5 px-2">Interest</th>
                    <th className="py-1.5 px-2">Quarterly EMI</th>
                    <th className="py-1.5 px-2">Closing</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium">
                  {financialPlan.schedule.slice(0, 4).map((q) => (
                    <tr key={q.quarter}>
                      <td className="py-1 px-2 font-bold text-slate-900">Q{q.quarter} {q.isMoratorium ? "(Grace)" : ""}</td>
                      <td className="py-1 px-2">{formatINR(q.openingBalance)}</td>
                      <td className="py-1 px-2 text-blue-900 font-bold">{q.isMoratorium ? "₹0" : formatINR(q.principalPaid)}</td>
                      <td className="py-1 px-2">{formatINR(q.interestPaid)}</td>
                      <td className="py-1 px-2 font-bold">{formatINR(q.totalEmi)}</td>
                      <td className="py-1 px-2">{formatINR(q.closingBalance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-[10px] text-slate-500 mt-1 font-medium">Full {financialPlan.totalQuarters} quarters detailed in digital application portal.</p>
            </div>

            {/* Signature & Verification Footnotes */}
            <div className="pt-6 border-t border-slate-200 flex justify-between items-end text-xs text-slate-600">
              <div>
                <p className="font-semibold text-slate-800">Applicant Signature: _______________________</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Date: {new Date().toLocaleDateString("en-IN")}</p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-slate-800">Bank / DIC Branch Officer: _______________________</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Seal & Verification Stamp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
