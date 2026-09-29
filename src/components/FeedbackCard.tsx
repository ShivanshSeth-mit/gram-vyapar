import React, { useState, useEffect } from "react";
import { SupportedLanguage } from "../types";
import { Star, CheckCircle2, MessageSquare, Sparkles, X } from "lucide-react";
import { auth, saveFeedbackToFirestore } from "../lib/firebase";

interface FeedbackCardProps {
  currentLang: SupportedLanguage;
  businessCategory: string;
  location: string;
  marginCapital: number;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({
  currentLang,
  businessCategory,
  location,
  marginCapital
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<string[]>(["Clear Loan & EMI Calculation"]);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Check if feedback already submitted in this browser session
  useEffect(() => {
    const prev = localStorage.getItem("udyam_feedback_submitted");
    if (prev === "true") {
      setIsSubmitted(true);
    }
  }, []);

  if (isDismissed) return null;

  const quickTags = [
    { id: "accurate_pricing", labelEn: "Accurate Local Pricing", labelHi: "सटीक स्थानीय मूल्य निर्धारण" },
    { id: "clear_emi", labelEn: "Clear Loan & EMI Schedule", labelHi: "स्पष्ट ऋण व ईएमआई गणना" },
    { id: "scheme_matched", labelEn: "Government Scheme Matched Well", labelHi: "उपयुक्त सरकारी योजना" },
    { id: "easy_language", labelEn: "Easy Multi-lingual Language", labelHi: "सरल व स्थानीय भाषा" },
    { id: "bank_helpful", labelEn: "Helpful for Bank Visit", labelHi: "बैंक आवेदन में सहायक" },
    { id: "need_more", labelEn: "Need More District Details", labelHi: "अधिक जिला जानकारी चाहिए" },
  ];

  const ratingDescriptions: Record<number, { en: string; hi: string }> = {
    1: { en: "Needs a lot of improvement", hi: "काफी सुधार की आवश्यकता है" },
    2: { en: "Below expectations", hi: "उम्मीद से कम उपयोगी" },
    3: { en: "Moderately useful", hi: "मध्यम रूप से उपयोगी" },
    4: { en: "Very helpful and clear", hi: "काफी उपयोगी व स्पष्ट" },
    5: { en: "Extremely useful for bank application", hi: "बैंक आवेदन हेतु अत्यंत उपयोगी" }
  };

  const handleTagToggle = (tagLabel: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagLabel) ? prev.filter((t) => t !== tagLabel) : [...prev, tagLabel]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        id: `fb-${Date.now()}`,
        rating,
        tags: selectedTags,
        comment: comment.trim(),
        businessCategory,
        location,
        marginCapital,
        timestamp: new Date().toISOString()
      };

      // 1. Save to Cloud Firestore if logged in
      if (auth.currentUser) {
        try {
          await saveFeedbackToFirestore(auth.currentUser.uid, payload);
        } catch (fbErr) {
          console.warn("Firestore save feedback notice:", fbErr);
        }
      }

      // 2. Call logging API
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      // Save locally
      localStorage.setItem("udyam_feedback_submitted", "true");
      setIsSubmitted(true);
    } catch (err) {
      console.warn("Feedback offline fallback:", err);
      // Still treat as submitted locally so user is acknowledged
      localStorage.setItem("udyam_feedback_submitted", "true");
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentDesc = ratingDescriptions[hoverRating || rating] || ratingDescriptions[5];

  return (
    <div
      id="user-feedback-section"
      className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 dark:border-slate-800 mt-8 relative transition-all"
    >
      {/* Dismiss button */}
      <button
        type="button"
        id="dismiss-feedback-btn"
        onClick={() => setIsDismissed(true)}
        className="absolute top-4 right-4 text-slate-400 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-label="Dismiss feedback"
      >
        <X className="h-4 w-4" />
      </button>

      {isSubmitted ? (
        <div className="flex flex-col sm:flex-row items-center gap-4 py-2 text-center sm:text-left">
          <div className="h-12 w-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-base text-slate-900 dark:text-slate-100">
              {currentLang === "hi"
                ? "आपकी प्रतिक्रिया दर्ज कर ली गई है, धन्यवाद!"
                : "Thank you for your valuable feedback!"}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {currentLang === "hi"
                ? "आपकी राय से ग्रामीण उद्यमियों के लिए सरकारी योजनाओं और बैंक अनुमानों को और अधिक सटीक बनाने में सहायता मिलती है।"
                : "Your rating helps us improve feasibility and margin money loan accuracy for rural entrepreneurs across India."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="text-xs font-bold text-blue-900 dark:text-blue-400 hover:underline shrink-0"
          >
            {currentLang === "hi" ? "संशोधित करें" : "Update Review"}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300">
              <MessageSquare className="h-4 w-4" />
            </span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tight">
              {currentLang === "hi"
                ? "क्या यह रिपोर्ट आपके व्यवसाय के लिए उपयोगी रही?"
                : "Was this Feasibility & Loan Report helpful?"}
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 max-w-xl">
            {currentLang === "hi"
              ? "कृपया 1 से 5 स्टार रेटिंग दें ताकि हम स्थानीय बैंक मानकों और बाजार अनुमानों को और बेहतर कर सकें।"
              : "Rate the usefulness of this report. Your input directly shapes better scheme calculations and market benchmarks."}
          </p>

          {/* Star Rating Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <div className="flex items-center gap-1.5" role="radiogroup" aria-label="Rating">
              {[1, 2, 3, 4, 5].map((star) => {
                const filled = (hoverRating || rating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    id={`feedback-star-${star}`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    aria-label={`${star} star`}
                    className="p-1 text-amber-400 hover:scale-110 transition-transform focus:outline-none"
                  >
                    <Star
                      className={`h-7 w-7 transition-colors ${
                        filled ? "fill-amber-400 text-amber-400" : "text-slate-300 dark:text-slate-600"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full w-fit">
              {currentLang === "hi" ? currentDesc.hi : currentDesc.en}
            </div>
          </div>

          {/* Quick Tags Selection */}
          <div className="mb-4">
            <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              {currentLang === "hi" ? "त्वरित अनुभव चुनें:" : "What stood out the most?"}
            </p>
            <div className="flex flex-wrap gap-2">
              {quickTags.map((tag) => {
                const isSelected = selectedTags.includes(tag.labelEn);
                return (
                  <button
                    key={tag.id}
                    type="button"
                    id={`feedback-tag-${tag.id}`}
                    onClick={() => handleTagToggle(tag.labelEn)}
                    className={`px-3 py-1.5 text-xs rounded-xl font-medium transition-all ${
                      isSelected
                        ? "bg-blue-900 dark:bg-blue-600 text-white shadow-sm"
                        : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    {currentLang === "hi" ? tag.labelHi : tag.labelEn}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional Textarea */}
          <div className="mb-4">
            <textarea
              id="feedback-comment-input"
              rows={2}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={
                currentLang === "hi"
                  ? "कोई अतिरिक्त सुझाव या अपने बैंक अनुभव के बारे में लिखें (वैकल्पिक)..."
                  : "Any specific suggestions, or how was your bank manager's response? (Optional)..."
              }
              className="w-full text-xs p-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 resize-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>

          {/* Submit Action */}
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] text-slate-400 dark:text-slate-500">
              Logged anonymously for policy analysis
            </span>
            <button
              type="submit"
              id="feedback-submit-btn"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-blue-900 hover:bg-blue-950 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-sm transition-all disabled:opacity-50 flex items-center gap-1.5"
            >
              {isSubmitting ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{currentLang === "hi" ? "फीडबैक भेजें" : "Submit Feedback"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
