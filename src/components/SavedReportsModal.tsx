import React, { useState, useEffect } from "react";
import { StoredReportItem, SupportedLanguage } from "../types";
import { translations } from "../data/translations";
import { formatINR } from "../utils/calculator";
import { auth, getUserReportsFromFirestore } from "../lib/firebase";
import { X, Search, Phone, Calendar, ArrowRight, FolderOpen, Landmark, CheckCircle, Cloud } from "lucide-react";

interface SavedReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectReport: (report: StoredReportItem) => void;
  currentLang: SupportedLanguage;
}

export const SavedReportsModal: React.FC<SavedReportsModalProps> = ({
  isOpen,
  onClose,
  onSelectReport,
  currentLang
}) => {
  const t = translations[currentLang];
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reports, setReports] = useState<StoredReportItem[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isOpen && auth.currentUser) {
      setIsLoading(true);
      getUserReportsFromFirestore(auth.currentUser.uid)
        .then((userReports) => {
          if (userReports && userReports.length > 0) {
            setReports(userReports);
            setHasSearched(true);
          }
        })
        .catch((err) => {
          console.warn("Error fetching firestore reports:", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phoneNumber.replace(/\D/g, "").slice(-10);
    if (cleanPhone.length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);
    setHasSearched(true);

    try {
      // 1. Try server endpoint
      const res = await fetch(`/api/saved-reports/${cleanPhone}`);
      const data = await res.json();
      
      let serverReports: StoredReportItem[] = [];
      if (data.success && Array.isArray(data.reports)) {
        serverReports = data.reports;
      }

      // 2. Also check localStorage for local offline saves
      const localSaves = localStorage.getItem(`udyam_reports_${cleanPhone}`);
      const localList: StoredReportItem[] = localSaves ? JSON.parse(localSaves) : [];

      // Merge unique by id
      const combined = [...serverReports];
      localList.forEach(lr => {
        if (!combined.some(c => c.id === lr.id)) {
          combined.push(lr);
        }
      });

      setReports(combined);
    } catch (err: any) {
      console.warn("Server search failed, checking local storage:", err);
      const localSaves = localStorage.getItem(`udyam_reports_${cleanPhone}`);
      setReports(localSaves ? JSON.parse(localSaves) : []);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs" id="saved-reports-modal">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200 transition-colors">
        {/* Modal Header */}
        <div className="p-5 border-b border-blue-800 flex items-center justify-between bg-blue-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-800 flex items-center justify-center text-white border border-blue-700">
              <FolderOpen className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-black text-base uppercase tracking-tight text-white">{t.searchSaved}</h3>
              <p className="text-xs text-blue-200 font-medium">Retrieve your saved report with your mobile number</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-blue-300 hover:text-white hover:bg-blue-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search input form */}
        <div className="p-5">
          <form onSubmit={handleSearch} className="space-y-3">
            <div>
              <label htmlFor="modal-phone-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Enter 10-Digit Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone className="h-4 w-4" />
                </div>
                <input
                  id="modal-phone-input"
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="e.g. 9876543210"
                  className="w-full pl-10 pr-24 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-full text-sm font-semibold text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:border-blue-900 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-hidden transition-all"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="absolute inset-y-1 right-1 px-4 bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-bold rounded-full transition-colors flex items-center gap-1.5 uppercase tracking-tight"
                >
                  {isLoading ? "Searching..." : "Find"}
                  <Search className="h-3.5 w-3.5" />
                </button>
              </div>
              {errorMessage && <p className="text-xs text-red-600 mt-1 font-semibold">{errorMessage}</p>}
            </div>
          </form>

          {/* Search Results List */}
          <div className="mt-5 max-h-80 overflow-y-auto space-y-3">
            {hasSearched && reports.length === 0 && !isLoading && (
              <div className="text-center py-8 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  No saved reports found for {phoneNumber}. Try generating a new report or test with demo number <strong>9876543210</strong>.
                </p>
              </div>
            )}

            {reports.map((r) => (
              <div
                key={r.id}
                className="p-4 bg-white dark:bg-slate-800/80 hover:bg-blue-50/40 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 rounded-xl shadow-xs transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 px-2.5 py-0.5 rounded-full">
                      {r.schemeName}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1">
                      {r.businessCategory}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{r.location}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectReport(r);
                      onClose();
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 bg-blue-900 dark:bg-blue-600 text-white rounded-full hover:bg-blue-800 dark:hover:bg-blue-500 shadow-xs uppercase tracking-tight"
                  >
                    <span>Load</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-400">
                    Margin: <strong className="text-slate-900 dark:text-white">{formatINR(r.marginCapital)}</strong> • Loan: <strong className="text-blue-900 dark:text-blue-400">{formatINR(r.loanEligibility)}</strong>
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
                    <Calendar className="h-3 w-3" />
                    {new Date(r.timestamp).toLocaleDateString("en-IN")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            Tip: You can test instant lookup using sample demo mobile number: <span className="font-bold text-blue-900 dark:text-blue-400">9876543210</span>
          </p>
        </div>
      </div>
    </div>
  );
};
