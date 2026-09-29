import React, { useState, useEffect, useRef } from "react";
import { AiChatMessage, SupportedLanguage, SUPPORTED_LANGUAGES } from "../types";
import {
  MessageSquare,
  Send,
  Sparkles,
  Bot,
  User,
  X,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Languages,
  ChevronDown,
  Check,
  RefreshCw
} from "lucide-react";

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: SupportedLanguage;
  context?: {
    location?: string;
    businessCategory?: string;
    marginCapital?: number;
    projectCost?: number;
    selectedScheme?: string;
    selectedBank?: string;
  };
  initialQuery?: string;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  context,
  initialQuery
}) => {
  const [assistantLang, setAssistantLang] = useState<SupportedLanguage>(currentLang);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [messages, setMessages] = useState<AiChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [autoSpeakEnabled, setAutoSpeakEnabled] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Sync assistantLang with prop currentLang if not manually modified
  useEffect(() => {
    setAssistantLang(currentLang);
  }, [currentLang]);

  // Close language dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Language code to BCP-47 speech tag mapping for Voice Input and TTS
  const getBcp47Tag = (lang: SupportedLanguage): string => {
    switch (lang) {
      case "hi": return "hi-IN";
      case "mr": return "mr-IN";
      case "bn": return "bn-IN";
      case "ta": return "ta-IN";
      case "te": return "te-IN";
      case "gu": return "gu-IN";
      case "kn": return "kn-IN";
      case "ml": return "ml-IN";
      case "pa": return "pa-IN";
      case "or": return "or-IN";
      case "as": return "as-IN";
      case "ur": return "ur-IN";
      default: return "en-IN";
    }
  };

  // Text-To-Speech function
  const speakText = (text: string, msgId: string) => {
    if (!("speechSynthesis" in window)) {
      alert("Text-to-Speech audio is not supported in this browser.");
      return;
    }

    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean text of markdown asterisks or special characters for natural voice output
    const cleanText = text.replace(/[*#_`]/g, "").replace(/\n/g, " ");

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = getBcp47Tag(assistantLang);
    utterance.rate = 0.95; // slightly relaxed pace for clarity

    utterance.onstart = () => setSpeakingMsgId(msgId);
    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    window.speechSynthesis.speak(utterance);
  };

  // Stop speaking when modal closes
  useEffect(() => {
    if (!isOpen) {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setSpeakingMsgId(null);
      setIsListening(false);
    }
  }, [isOpen]);

  // Greetings dictionary for initial prompt
  useEffect(() => {
    const greetings: Record<string, string> = {
      hi: "नमस्ते! मैं 'ग्राम व्यापार AI' हूँ। आप सरकारी योजनाओं (PMEGP, मुद्रा, स्टैंड-अप इंडिया), 35% सब्सिडी, बैंक नियमों और ऋण प्रक्रिया पर मुझसे कोई भी प्रश्न पूछ सकते हैं। आप बोलकर (माइक) भी पूछ सकते हैं!",
      mr: "नमस्कार! मी 'ग्राम व्यापार AI' आहे. आपण शासकीय योजना (PMEGP, मुद्रा), सबसिडी, बँक प्रक्रिया आणि व्यवसाय नियोजनाबद्दल मला थेट विचारू शकता. आपण आवाजाद्वारे (माइक) देखील प्रश्न विचारू शकता!",
      bn: "নমস্কার! আমি 'গ্রাম ব্যাপার AI'। আপনি সরকারি স্কিম (PMEGP, মুদ্রা), ৩৫% ভর্তুকি, এবং ব্যাংক ঋণ প্রক্রিয়া সম্পর্কে যেকোনো প্রশ্ন করতে পারেন। আপনি মুখে বলেও প্রশ্ন করতে পারেন!",
      ta: "வணக்கம்! நான் 'கிராம வியாபாரம் AI'. அரசு திட்டங்கள் (PMEGP, முத்ரா), மானியம் மற்றும் வங்கி கடன்கள் குறித்து ஏதேனும் கேள்விகள் கேட்கலாம். நீங்கள் குரல் மூலமாகவும் கேட்கலாம்!",
      te: "నమస్కారం! నేను 'గ్రామ వ్యాపార AI'. ప్రభుత్వ పథకాలు (PMEGP, ముద్ర), సబ్సిడీ మరియు బ్యాంకు రుణాల గురించి నన్ను ఏ ప్రశ్నైనా అడగవచ్చు. మీరు మాట్లాడి కూడా అడగవచ్చు!",
      gu: "નમસ્તે! હું 'ગ્રામ વ્યાપાર AI' છું. તમે સરકારી યોજનાઓ (PMEGP, મુદ્રા), સબસિડી અને બેંક લોન પ્રક્રિયા વિશે કોઈપણ પ્રશ્ન પૂછી શકો છો. તમે બોલીને પણ પૂછી શકો છો!",
      kn: "ನಮಸ್ಕಾರ! ನಾನು 'ಗ್ರಾಮ ವ್ಯಾಪಾರ AI'. ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು (PMEGP, ಮುದ್ರಾ), ಸಬ್ಸಿಡಿ ಮತ್ತು ಬ್ಯಾಂಕ್ ಸಾಲಗಳ ಬಗ್ಗೆ ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಬಹುದು.",
      ml: "നമസ്കാരം! ഞാൻ 'ഗ്രാമ വ്യാപാരം AI'. സർക്കാർ പദ്ധതികൾ (PMEGP, മുദ്ര), സബ്‌സിഡി, ബാങ്ക് വായ്പകൾ എന്നിവയെക്കുറിച്ച് സംശയങ്ങൾ ചോദിക്കാം.",
      pa: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ 'ਗ੍ਰਾਮ ਵਪਾਰ AI' ਹਾਂ। ਤੁਸੀਂ ਸਰਕਾਰੀ ਸਕੀਮਾਂ (PMEGP, ਮੁਦਰਾ), ਸਬਸਿਡੀ ਅਤੇ ਬੈਂਕ ਨਿਯਮਾਂ ਬਾਰੇ ਸਵਾਲ ਪੁੱਛ ਸਕਦੇ ਹੋ।",
      or: "ନମସ୍କାର! ମୁଁ 'ଗ୍ରାମ ବ୍ୟାପାର AI'। ଆପଣ ସରକାରୀ ଯୋଜନା (PMEGP, ମୁଦ୍ରା), ସବସିଡି ଓ ବ୍ୟାଙ୍କ ଋଣ ବିଷୟରେ ପ୍ରଶ୍ନ ପଚାରିପାରିବେ।",
      as: "নমস্কাৰ! মই 'গ্রাম ব্যাপাৰ AI'। চৰকাৰী আঁচনি (PMEGP, মুদ্ৰা), ছাবচিডি আৰু বেংক ঋণৰ বিষয়ে আপুনি প্ৰশ্ন সুধিব পাৰে।",
      ur: "آداب! میں 'گرام ویاپار AI' ہوں۔ آپ سرکاری اسکیموں (PMEGP، مدرا)، سبسڈی اور بینک قواعد کے بارے میں کوئی بھی سوال پوچھ سکتے ہیں۔",
      en: "Hello! I am your Gram Vyapar AI Voice & Text Advisor. Ask me anything about government schemes (PMEGP, MUDRA, Stand-Up India), subsidies, bank loans, or business money management. Tap the mic to speak!"
    };

    const starterQuestions: Record<string, string[]> = {
      hi: [
        "PMEGP में 35% ग्रामीण सब्सिडी कैसे प्राप्त करें?",
        "क्या ₹10 लाख तक के ऋण के लिए गारंटी आवश्यक है?",
        "परियोजना लागत में पैसे कहां खर्च करें और कहां बचाएं?",
        "पिछड़े वर्ग (SC/ST/OBC) के लिए बैंकों में क्या विशेष सुविधाएं हैं?"
      ],
      mr: [
        "PMEGP योजनेत 35% सबसिडी कशी मिळवावी?",
        "मुद्रा कर्जासाठी तारण आवश्यक आहे का?",
        "प्रकल्पात पैसे कुठे खर्च करावेत आणि कुठे वाचवावेत?",
        "मागासवर्गीय उद्योजकांसाठी कोणत्या विशेष सवलती आहेत?"
      ],
      en: [
        "How to claim up to 35% PMEGP capital subsidy?",
        "Is collateral mandatory for loans up to ₹10 Lakhs?",
        "Where should I spend and where can I save capital?",
        "What are the backward caste apex bank schemes?"
      ]
    };

    const initialGreeting = greetings[assistantLang] || greetings.en;

    setMessages([
      {
        id: `msg-init-${assistantLang}`,
        sender: "ai",
        text: initialGreeting,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestedQuestions: starterQuestions[assistantLang] || starterQuestions.en
      }
    ]);
  }, [assistantLang]);

  // Handle initial query if passed
  useEffect(() => {
    if (isOpen && initialQuery && initialQuery.trim()) {
      handleSendMessage(initialQuery);
    }
  }, [isOpen, initialQuery]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputText;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: AiChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.text,
          language: assistantLang,
          context: {
            location: context?.location || "Rural India",
            businessCategory: context?.businessCategory || "Micro-enterprise",
            marginCapital: context?.marginCapital || 100000,
            projectCost: context?.projectCost || 1000000,
            selectedScheme: context?.selectedScheme || "PMEGP",
            selectedBank: context?.selectedBank || "State Bank of India"
          }
        })
      });

      const data = await response.json();
      const replyText = data.answer || "I am available to assist you with your scheme, subsidy, and banking questions.";

      const aiReply: AiChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestedQuestions: data.suggestedQuestions || []
      };

      setMessages((prev) => [...prev, aiReply]);

      if (autoSpeakEnabled) {
        speakText(replyText, aiReply.id);
      }
    } catch {
      // Fallback response in target language
      const fallbackReplies: Record<string, string> = {
        hi: "प्राथमिकता क्षेत्र ऋण नियमों के तहत, सूक्ष्म ऋण ₹10 लाख तक सीजीटीएमएसई (CGTMSE) गारंटी से कवर्ड होते हैं और किसी तृतीय-पक्ष जमानत की आवश्यकता नहीं होती। आप सीधे जन समर्थ अथवा PMEGP ई-पोर्टल पर आवेदन कर सकते हैं।",
        mr: "प्राधान्य क्षेत्रातील नियमांनुसार ₹10 लाखांपर्यंतच्या सूक्ष्म कर्जांना सीजीटीएमएसई (CGTMSE) हमी संरक्षण असते, त्यामुळे कोणत्याही तारणाची गरज नाही. आपण थेट जन समर्थ किंवा PMEGP पोर्टलवर अर्ज करू शकता.",
        en: "Under priority sector lending norms, micro-loans up to ₹10 Lakhs are covered by credit guarantee (CGTMSE) with zero collateral required. You can apply directly on the Jan Samarth or PMEGP portal."
      };

      const aiReply: AiChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: fallbackReplies[assistantLang] || fallbackReplies.en,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestedQuestions: [
          assistantLang === "hi" ? "मोरेटोरियम ग्रेस पीरियड क्या है?" : "What is the moratorium grace period?",
          assistantLang === "hi" ? "उद्यम पंजीकरण कैसे प्राप्त करें?" : "How to get Udyam registration?"
        ]
      };
      setMessages((prev) => [...prev, aiReply]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  // Speech-to-Text Support for Voice Queries
  const toggleSpeechRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser. Please use Chrome, Edge, or an updated browser.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = getBcp47Tag(assistantLang);
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputText(transcript);
          handleSendMessage(transcript);
        }
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  if (!isOpen) return null;

  const activeLangMeta = SUPPORTED_LANGUAGES.find((l) => l.code === assistantLang) || SUPPORTED_LANGUAGES[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/60 backdrop-blur-xs p-2 sm:p-4 animate-in fade-in duration-200"
      id="ai-assistant-backdrop"
    >
      <div
        id="ai-assistant-card"
        className="bg-white dark:bg-slate-900 w-full max-w-lg h-[92vh] max-h-[760px] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col animate-in slide-in-from-right duration-300 transition-colors"
        role="dialog"
        aria-modal="true"
      >
        {/* Header with Language Dropdown + Auto-speak toggle + Close */}
        <div className="px-4 py-3 bg-blue-900 text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center border border-white/20 shrink-0">
              <Sparkles className="h-5 w-5 text-amber-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-black uppercase tracking-tight text-white">
                  Gram Vyapar AI Assistant
                </h3>
                <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-green-500 text-white">
                  Online
                </span>
              </div>
              <p className="text-[10px] text-blue-200">
                Voice & Text MSME Advisor
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Language Selector Dropdown inside the Assistant */}
            <div className="relative" ref={langDropdownRef}>
              <button
                type="button"
                id="assistant-lang-btn"
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-800/90 hover:bg-blue-800 text-xs font-bold text-white border border-blue-700 transition-colors"
                title="Change Assistant Language"
              >
                <Languages className="h-3 w-3 text-blue-300" />
                <span>{activeLangMeta.nativeName}</span>
                <ChevronDown className="h-3 w-3 text-blue-300" />
              </button>

              {isLangDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 max-h-72 overflow-y-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-50 text-slate-800 dark:text-slate-100 animate-in fade-in zoom-in-95 duration-150"
                  id="assistant-lang-dropdown"
                >
                  <div className="px-3 py-1 border-b border-slate-100 dark:border-slate-700 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Voice & Chat Language
                  </div>
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setAssistantLang(lang.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors ${
                        assistantLang === lang.code
                          ? "bg-blue-50 dark:bg-slate-700 font-bold text-blue-900 dark:text-amber-300"
                          : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <span>{lang.nativeName} ({lang.name})</span>
                      {assistantLang === lang.code && <Check className="h-3.5 w-3.5 text-blue-900 dark:text-amber-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auto-Speak Toggle Button */}
            <button
              type="button"
              onClick={() => {
                const next = !autoSpeakEnabled;
                setAutoSpeakEnabled(next);
                if (!next && "speechSynthesis" in window) {
                  window.speechSynthesis.cancel();
                  setSpeakingMsgId(null);
                }
              }}
              className={`p-1.5 rounded-full border transition-colors ${
                autoSpeakEnabled
                  ? "bg-amber-400 text-blue-950 border-amber-300"
                  : "bg-blue-800 text-blue-200 hover:text-white border-blue-700"
              }`}
              title={autoSpeakEnabled ? "Auto-voice reading enabled" : "Enable voice read-aloud for answers"}
            >
              {autoSpeakEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>

            {/* Close Button */}
            <button
              type="button"
              id="ai-chat-close-btn"
              onClick={onClose}
              className="p-1.5 rounded-full text-blue-200 hover:text-white hover:bg-blue-800 transition-colors"
              title="Close Assistant"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Current Context Strip */}
        <div className="px-4 py-1.5 bg-blue-50 dark:bg-slate-800/80 border-b border-blue-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-blue-900 dark:text-blue-200 font-semibold overflow-x-auto">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
            <span className="text-slate-600 dark:text-slate-400">Context:</span>
            <span className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded-md border border-blue-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
              {context?.businessCategory || "Micro-Enterprise"}
            </span>
            <span className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded-md border border-blue-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
              {context?.location || "India"}
            </span>
          </div>
          <span className="text-[10px] text-blue-700 dark:text-blue-300 uppercase font-bold shrink-0 ml-2">
            Auto-Grounded
          </span>
        </div>

        {/* Active Voice Listening Banner */}
        {isListening && (
          <div className="bg-red-500 text-white px-4 py-2 flex items-center justify-between text-xs font-bold animate-pulse">
            <div className="flex items-center gap-2">
              <Mic className="h-4 w-4 animate-bounce" />
              <span>
                {assistantLang === "hi"
                  ? "सुन रहे हैं... कृपया हिंदी में बोलें"
                  : assistantLang === "mr"
                  ? "ऐकत आहोत... कृपया बोला"
                  : `Listening in ${activeLangMeta.name}... Speak now`}
              </span>
            </div>
            <button
              type="button"
              onClick={toggleSpeechRecognition}
              className="bg-white/20 hover:bg-white/30 text-white px-2 py-0.5 rounded-full text-[10px]"
            >
              Stop
            </button>
          </div>
        )}

        {/* Messages Scroll Area */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/60 dark:bg-slate-950/60 transition-colors"
          id="ai-messages-container"
        >
          {messages.map((msg) => {
            const isAi = msg.sender === "ai";
            const isSpeakingThis = speakingMsgId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`flex gap-2 max-w-[90%] sm:max-w-[85%] ${
                    msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-xs ${
                      msg.sender === "user"
                        ? "bg-slate-800 text-white dark:bg-blue-700"
                        : "bg-blue-900 text-amber-300 dark:bg-blue-950 dark:border dark:border-blue-800"
                    }`}
                  >
                    {msg.sender === "user" ? (
                      <User className="h-3.5 w-3.5" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs relative ${
                      msg.sender === "user"
                        ? "bg-blue-900 dark:bg-blue-700 text-white rounded-tr-xs"
                        : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-tl-xs"
                    }`}
                  >
                    {/* Clean text formatted with line breaks */}
                    <div className="whitespace-pre-line font-normal">
                      {msg.text}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100 dark:border-slate-700/50">
                      <span
                        className={`text-[10px] font-medium ${
                          msg.sender === "user"
                            ? "text-blue-200"
                            : "text-slate-400 dark:text-slate-400"
                        }`}
                      >
                        {msg.timestamp}
                      </span>

                      {/* TTS Speak button for AI replies */}
                      {isAi && (
                        <button
                          type="button"
                          onClick={() => speakText(msg.text, msg.id)}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors ${
                            isSpeakingThis
                              ? "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 animate-pulse"
                              : "bg-slate-100 dark:bg-slate-700/80 hover:bg-blue-50 text-slate-600 dark:text-slate-300"
                          }`}
                          title={isSpeakingThis ? "Stop speaking" : "Listen to answer in audio"}
                        >
                          {isSpeakingThis ? (
                            <>
                              <VolumeX className="h-3 w-3 text-red-500" />
                              <span>Stop</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                              <span>Listen</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Suggested Questions */}
                {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                  <div className="mt-2.5 ml-9 flex flex-wrap gap-1.5 max-w-[88%]">
                    {msg.suggestedQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendMessage(q)}
                        className="text-left text-[11px] font-semibold bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-blue-900 dark:text-blue-300 border border-blue-200 dark:border-slate-700 px-2.5 py-1 rounded-full transition-colors shadow-2xs"
                      >
                        💡 {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs italic pl-9">
              <RefreshCw className="h-3.5 w-3.5 animate-spin text-blue-900 dark:text-blue-400" />
              <span>
                {assistantLang === "hi"
                  ? "सरकारी नियमों का विश्लेषण कर रहे हैं..."
                  : "Analyzing government scheme rules & guidelines..."}
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar with Voice Button & Dark Mode styling */}
        <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            {/* Voice Input Microphone Button */}
            <button
              type="button"
              id="ai-voice-btn"
              onClick={toggleSpeechRecognition}
              className={`p-2.5 rounded-xl border transition-all ${
                isListening
                  ? "bg-red-500 text-white border-red-600 animate-pulse ring-2 ring-red-400"
                  : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700"
              }`}
              title={isListening ? "Listening... Click to stop" : `Ask by speaking in ${activeLangMeta.name}`}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4 text-blue-700 dark:text-blue-400" />}
            </button>

            <input
              ref={inputRef}
              type="text"
              id="ai-chat-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                assistantLang === "hi"
                  ? "योजना, सब्सिडी या खर्च/बचत पर पूछें या बोलें..."
                  : assistantLang === "mr"
                  ? "योजना, सबसिडी किंवा खर्च/बचत नियमांवर विचारा..."
                  : `Ask about schemes, subsidies, savings in ${activeLangMeta.name}...`
              }
              className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-colors"
            />

            <button
              type="submit"
              id="ai-send-btn"
              disabled={!inputText.trim() || isLoading}
              className={`p-2.5 rounded-xl font-bold transition-all shadow-xs ${
                inputText.trim() && !isLoading
                  ? "bg-blue-900 hover:bg-blue-950 text-white dark:bg-blue-600 dark:hover:bg-blue-500"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600 cursor-not-allowed"
              }`}
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
