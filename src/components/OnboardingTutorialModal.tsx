import React, { useState, useEffect } from "react";
import { SupportedLanguage, SUPPORTED_LANGUAGES } from "../types";
import {
  MapPin,
  IndianRupee,
  Briefcase,
  BarChart3,
  Coins,
  FileCheck,
  ChevronRight,
  ChevronLeft,
  X,
  Sparkles,
  HelpCircle,
  Landmark,
  Bot,
  Globe,
  Languages
} from "lucide-react";

interface OnboardingTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: SupportedLanguage;
  onLanguageChange?: (lang: SupportedLanguage) => void;
}

export const OnboardingTutorialModal: React.FC<OnboardingTutorialModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onLanguageChange
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [guideLang, setGuideLang] = useState<SupportedLanguage>(currentLang);

  useEffect(() => {
    setGuideLang(currentLang);
  }, [currentLang]);

  if (!isOpen) return null;

  // Step 1 to 6 with 13-language translations
  const TUTORIAL_CONTENT: Record<number, Record<string, { tag: string; title: string; desc: string; badge: string }>> = {
    0: {
      en: {
        tag: "Core Input 1 of 3",
        title: "Input Your Village or Pin Code",
        desc: "Type your village name or 6-digit postal code. If typing is difficult, tap the Microphone icon to simply speak your location in any regional language.",
        badge: "Speech-to-Text & GPS Assisted"
      },
      hi: {
        tag: "मुख्य चरण 1",
        title: "गाँव, कस्बा या 6-अंकों का पिन कोड दर्ज करें",
        desc: "अपने गाँव का नाम या 6 अंकों का पिन कोड दर्ज करें। टाइपिंग से बचने के लिए माइक्रोफ़ोन बटन दबाकर अपनी आवाज़ में बोल सकते हैं।",
        badge: "आवाज़ व जीपीएस सहायता"
      },
      mr: {
        tag: "महत्त्वाचा टप्पा 1",
        title: "आपले गाव किंवा 6-अंकी पिन कोड प्रविष्ट करा",
        desc: "आपल्या गावाचे नाव किंवा पिन कोड टाका. टायपिंग सोपे करण्यासाठी मायक्रोफोन बटण दाबून आपल्या भाषेत बोला.",
        badge: "व्हॉइस व जीपीएस सहाय्य"
      },
      bn: {
        tag: "মূল ধাপ ১",
        title: "আপনার গ্রাম বা ৬-সংখ্যার পিন কোড লিখুন",
        desc: "আপনার গ্রামের নাম বা পিন কোড লিখুন। সহজে বলতে মাইক্রোফোন বোতামটি ব্যবহার করুন।",
        badge: "ভয়েস ও জিপিএস সুবিধা"
      },
      ta: {
        tag: "படி 1",
        title: "உங்கள் கிராமம் அல்லது அஞ்சல் குறியீட்டை உள்ளிடவும்",
        desc: "கிராமத்தின் பெயர் அல்லது 6 இலக்க பின்கோடு உள்ளிடவும். மைக்ரோஃபோன் பொத்தானை அழுத்தி பேசலாம்.",
        badge: "குரல் மற்றும் ஜிபிஎஸ் உதவி"
      },
      te: {
        tag: "దశ 1",
        title: "మీ గ్రామం లేదా పిన్ కోడ్ నమోదు చేయండి",
        desc: "మీ గ్రామ పేరు లేదా 6 అంకెల పిన్ కోడ్ నమోదు చేయండి. వాయిస్ మైక్రోఫోన్ ఉపయోగించి సులభంగా మాట్లాడవచ్చు.",
        badge: "వాయిస్ & జీపీఎస్ మద్దతు"
      },
      gu: {
        tag: "પગલું 1",
        title: "તમારું ગામ અથવા પિન કોડ દાખલ કરો",
        desc: "તમારા ગામનું નામ અથવા 6-અંકનો પિન કોડ લખો. માઇક્રોફોન વડે બોલીને પણ સ્થાન જણાવી શકો છો.",
        badge: "વોઇસ અને જીપીએસ સહાય"
      },
      kn: {
        tag: "ಹಂತ 1",
        title: "ನಿಮ್ಮ ಗ್ರಾಮ ಅಥವಾ ಪಿನ್ ಕೋಡ್ ನಮೂದಿಸಿ",
        desc: "ನಿಮ್ಮ ಊರಿನ ಹೆಸರು ಅಥವಾ 6-ಅಂಕಿಯ ಪಿನ್ ಕೋಡ್ ನಮೂದಿಸಿ. ಧ್ವನಿ ಮೂಲಕವೂ ಮಾತನಾಡಬಹುದು.",
        badge: "ಧ್ವನಿ & ಜಿಪಿಎಸ್ ನೆರವು"
      },
      ml: {
        tag: "ഘട്ടം 1",
        title: "നിങ്ങളുടെ ഗ്രാമമോ പിൻ കോഡോ നൽകുക",
        desc: "ഗ്രാമത്തിന്റെ പേരോ 6 അക്ക പിൻ കോഡോ രേഖപ്പെടുത്തുക. സംസാരിച്ചും നൽകാവുന്നതാണ്.",
        badge: "വോയ്‌സ് & ജിപിഎസ് സഹായം"
      },
      pa: {
        tag: "ਕਦਮ 1",
        title: "ਆਪਣੇ ਪਿੰਡ ਜਾਂ ਪਿੰਨ ਕੋਡ ਦਰਜ ਕਰੋ",
        desc: "ਪਿੰਡ ਦਾ ਨਾਮ ਜਾਂ 6-ਅੰਕੀ ਪਿੰਨ ਕੋਡ ਦਰਜ ਕਰੋ। ਮਾਈਕ੍ਰੋਫੋਨ ਨਾਲ ਬੋਲ ਕੇ ਵੀ ਦਰਜ ਕਰ ਸਕਦੇ ਹੋ।",
        badge: "ਆਵਾਜ਼ ਅਤੇ ਜੀਪੀਐਸ ਸਹਾਇਤਾ"
      },
      or: {
        tag: "ପଦକ୍ଷେପ ୧",
        title: "ଗ୍ରାମ କିମ୍ବା ପିନ କୋଡ୍ ଦାଖଲ କରନ୍ତୁ",
        desc: "ଆପଣଙ୍କ ଗ୍ରାମ ନାମ କିମ୍ବା ୬-ଅଙ୍କ ବିଶିଷ୍ଟ ପିନ କୋଡ୍ ପ୍ରବେଶ କରନ୍ତୁ। ଭଏସ୍ ବଟନ୍ ମଧ୍ୟ ଉପଲବ୍ଧ।",
        badge: "ଭଏସ୍ ଓ ଜିପିଏସ୍ ସହାୟତା"
      },
      as: {
        tag: "পদক্ষেপ ১",
        title: "আপোনাৰ গাঁও বা পিন ক'ড প্ৰবিষ্ট কৰক",
        desc: "গাঁও বা ৬-সংখ্যাৰ পিন ক'ড লিখক। মাইক্ৰ'ফোনৰ সহায়তো ক'ব পাৰে।",
        badge: "ভইচ আৰু জিপিএছ সুবিধা"
      },
      ur: {
        tag: "مرحلہ 1",
        title: "اپنا گاؤں یا پن کوڈ درج کریں",
        desc: "اپنے گاؤں کا نام یا 6 ہندسوں کا پن کوڈ درج کریں۔ مائیکروفون کے ذریعے بول کر بھی بتا سکتے ہیں۔",
        badge: "آواز اور جی پی ایس کی سہولت"
      }
    },
    1: {
      en: {
        tag: "Core Input 2 of 3",
        title: "Enter Your Margin Capital (10% Rule)",
        desc: "Enter your personal savings (e.g. ₹50,000 or ₹1 Lakh). The app automatically calculates your 10x Total Project Cost and 90% Bank Loan eligibility per government guidelines.",
        badge: "10x Project Cost Formula"
      },
      hi: {
        tag: "मुख्य चरण 2",
        title: "अपनी बचत / स्वयं का अंशदान दर्ज करें (10% नियम)",
        desc: "अपनी बचत राशि दर्ज करें (जैसे ₹50,000 या ₹1 लाख)। हमारा सिस्टम सरकारी नियमों के अनुसार 10 गुना कुल प्रोजेक्ट लागत और 90% बैंक ऋण पात्रता की तुरंत गणना करता है।",
        badge: "10 गुना लागत फॉर्मूला"
      },
      mr: {
        tag: "महत्त्वाचा टप्पा 2",
        title: "स्वतःचे भांडवल प्रविष्ट करा (10% नियम)",
        desc: "आपल्या जवळील बचत रक्कम टाका. सरकारी नियमांनुसार प्रणाली तत्काळ 10 पट प्रकल्प खर्च आणि 90% बँक कर्ज मर्यादा मोजते.",
        badge: "10 पट प्रकल्प खर्च"
      },
      bn: {
        tag: "মূল ধাপ ২",
        title: "আপনার নিজস্ব মূলধন লিখুন (১০% নিয়ম)",
        desc: "আপনার সঞ্চিত পুঁজির পরিমাণ লিখুন। সরকারি নিয়ম অনুযায়ী সিস্টেম ১০ গুণ প্রকল্প ব্যয় এবং ৯০% ব্যাংক ঋণের হিসাব তৈরি করে।",
        badge: "১০ গুণ প্রকল্প ব্যয়"
      },
      ta: {
        tag: "படி 2",
        title: "உங்கள் சேமிப்பு மூலதனத்தை உள்ளிடவும் (10% விதி)",
        desc: "உங்கள் சேமிப்பு தொகையை பதிவு செய்யவும். அரசு விதிகளின்படி 10 மடங்கு திட்டச் செலவு மற்றும் 90% கடன் தகுதி கணக்கிடப்படும்.",
        badge: "10 மடங்கு திட்ட மதிப்பீடு"
      },
      te: {
        tag: "దశ 2",
        title: "మీ స్వంత పెట్టుబడిని నమోదు చేయండి (10% నియమం)",
        desc: "మీ పొదుపు మొత్తాన్ని నమోదు చేయండి. ప్రభుత్వ నిబంధనల ప్రకారం 10 రెట్లు ప్రాజెక్ట్ వ్యయం మరియు 90% రుణ అర్హత లెక్కింపబడుతుంది.",
        badge: "10 రెట్ల ప్రాజెక్ట్ ఖర్చు"
      },
      gu: {
        tag: "પગલું 2",
        title: "તમારી બચત મૂડી દાખલ કરો (10% નિયમ)",
        desc: "તમારી બચત રકમ લખો. સિસ્ટમ આપમેળે 10 ગણો કુલ પ્રોજેક્ટ ખર્ચ અને 90% બેંક લોન પાત્રતા ગણશે.",
        badge: "10 ગણો પ્રોજેક્ટ ખર્ચ"
      },
      kn: {
        tag: "ಹಂತ 2",
        title: "ನಿಮ್ಮ ಸ್ವಂತ ಬಂಡವಾಳ ನಮೂದಿಸಿ (10% ನಿಯಮ)",
        desc: "ನಿಮ್ಮ ಉಳಿತಾಯದ ಮೊತ್ತವನ್ನು ದಾಖಲಿಸಿ. 10 ಪಟ್ಟು ಒಟ್ಟು ಯೋಜನಾ ವೆಚ್ಚ ಮತ್ತು 90% ಸಾಲದ ಮೊತ್ತ ತಕ್ಷಣ ಲೆಕ್ಕಹಾಕಲಾಗುತ್ತದೆ.",
        badge: "10 ಪಟ್ಟು ಯೋಜನಾ ವೆಚ್ಚ"
      },
      ml: {
        tag: "ഘട്ടം 2",
        title: "നിക്ഷേപ തുക നൽകുക (10% നിയമം)",
        desc: "നിങ്ങളുടെ സമ്പാദ്യ തുക രേഖപ്പെടുത്തുക. 10 ഇരട്ടി പ്രൊജക്റ്റ് ചിലവും 90% ബാങ്ക് വായ്പയും സ്വയം കണക്കാക്കപ്പെടുന്നു.",
        badge: "10 ഇരട്ടി പദ്ധതി ചെലവ്"
      },
      pa: {
        tag: "ਕਦਮ 2",
        title: "ਆਪਣੀ ਬੱਚਤ ਰਕਮ ਦਰਜ ਕਰੋ (10% ਨਿਯਮ)",
        desc: "ਆਪਣੀ ਬੱਚਤ ਦਰਜ ਕਰੋ। ਸਰਕਾਰੀ ਨਿਯਮਾਂ ਅਨੁਸਾਰ 10 ਗੁਣਾ ਪ੍ਰੋਜੈਕਟ ਲਾਗਤ ਅਤੇ 90% ਕਰਜ਼ੇ ਦੀ ਗਣਨਾ ਹੋਵੇਗੀ।",
        badge: "10 ਗੁਣਾ ਲਾਗਤ ਫਾਰਮੂਲਾ"
      },
      or: {
        tag: "ପଦକ୍ଷେପ ୨",
        title: "ନିଜସ୍ୱ ପୁଞ୍ଜି ଦାଖଲ କରନ୍ତୁ (୧୦% ନିୟମ)",
        desc: "ଆପଣଙ୍କ ସଞ୍ଚୟ ରାଶି ଲେଖନ୍ତୁ। ସରକାରୀ ନିୟମ ଅନୁସାରେ ୧୦ ଗୁଣା ପ୍ରକଳ୍ପ ଖର୍ଚ୍ଚ ଏବଂ ୯୦% ବ୍ୟାଙ୍କ ଋଣ ହିସାବ କରାଯିବ।",
        badge: "୧୦ ଗୁଣ ପ୍ରକଳ୍ପ ମୂଲ୍ୟ"
      },
      as: {
        tag: "পদক্ষেপ ২",
        title: "আপোনাৰ মূলধন লিখক (১০% নিয়ম)",
        desc: "আপোনাৰ সঞ্চিত ধন লিখক। ১০ গুণ প্ৰকল্প ব্যয় আৰু ৯০% বেংক ঋণ যোগ্যতা গণনা কৰা হ'ব।",
        badge: "১০ গুণ প্ৰকল্প ব্যয়"
      },
      ur: {
        tag: "مرحلہ 2",
        title: "اپنا سرمایہ درج کریں (10% اصول)",
        desc: "اپنی بچت کی رقم درج کریں۔ سرکاری قواعد کے مطابق 10 گنا پروجیکٹ لاگت اور 90% بینک لون کا حساب لگایا جاتا ہے۔",
        badge: "10 گنا لاگت فارمولا"
      }
    },
    2: {
      en: {
        tag: "Core Input 3 of 3",
        title: "Choose From 20+ Rural Business Categories",
        desc: "Select from curated rural opportunities including Solar Services, Ecotourism Homestays, CSC Digital Hubs, Millets Processing, Waste Recycling, Dairy, and Farm Machinery Rentals.",
        badge: "21 Localized Sectors"
      },
      hi: {
        tag: "मुख्य चरण 3",
        title: "20+ ग्रामीण व्यापार श्रेणियों में से चुनें",
        desc: "सोलर ऊर्जा, इको-टूरिज्म, जन सेवा केंद्र (CSC), पारंपरिक खाद्य उत्पाद, कचरा प्रबंधन, डेयरी और कृषि यंत्र बैंक जैसी 20 से अधिक श्रेणियों में से चुनें या अपना व्यवसाय लिखें।",
        badge: "21 स्थानीय श्रेणियां"
      },
      mr: {
        tag: "महत्त्वाचा टप्पा 3",
        title: "20+ ग्रामीण व्यवसाय प्रकारांतून निवडा",
        desc: "सौर ऊर्जा, कृषी पर्यटन, डिजिटल सेवा केंद्र, पारंपरिक खाद्य, बांबू हस्तकला किंवा इतर व्यवसायांपैकी योग्य पर्याय निवडा.",
        badge: "21 ग्रामीण व्यवसाय"
      },
      bn: {
        tag: "মূল ধাপ ৩",
        title: "২০+ গ্রামীণ ব্যবসার তালিকা থেকে নির্বাচন করুন",
        desc: "সৌর শক্তি, ইকো-ট্যুরিজম, সিএসসি ডিজিটাল কেন্দ্র, প্রক্রিয়াজাত খাদ্য এবং দুগ্ধ খামারের মতো ২০টির বেশি ক্ষেত্র থেকে বেছে নিন।",
        badge: "২১টি স্থানীয় ক্ষেত্র"
      },
      ta: {
        tag: "படி 3",
        title: "20+ கிராமப்புற வணிகப் பிரிவுகளிலிருந்து தேர்வு செய்க",
        desc: "சூரிய சக்தி, வேளாண் சுற்றுலா, பொதுச் சேவை மையம், பால் பண்ணை, சிறுதானியங்கள் போன்ற 20+ வாய்ப்புகள்.",
        badge: "21 தொழில் பிரிவுகள்"
      },
      te: {
        tag: "దశ 3",
        title: "20+ గ్రామీణ వ్యాపార కేటగిరీల నుండి ఎంచుకోండి",
        desc: "సౌర విద్యుత్, ఎకో-టూరిజం, డిజిటల్ సేవా కేంద్రం, పాల పరిశ్రమ వంటి 20 కంటే ఎక్కువ రంగాలు.",
        badge: "21 గ్రామీణ రంగాలు"
      },
      gu: {
        tag: "પગલું 3",
        title: "20+ ગ્રામીણ વ્યવસાય શ્રેણીઓમાંથી પસંદ કરો",
        desc: "સોલાર એનર્જી, એગ્રો ટૂરિઝમ, ડિજિટલ હબ, ડેરી ફાર્મિંગ જેવી 20+ આધુનિક ગ્રામીણ તકો.",
        badge: "21 શ્રેણીઓ"
      },
      kn: {
        tag: "ಹಂತ 3",
        title: "20+ ಗ್ರಾಮೀಣ ವ್ಯಾಪಾರ ವಿಭಾಗಗಳಿಂದ ಆರಿಸಿ",
        desc: "ಸೌರ ಶಕ್ತಿ, ಕೃಷಿ ಪ್ರವಾಸೋದ್ಯಮ, ಡಿಜಿಟಲ್ ಸೇವಾ ಕೇಂದ್ರ, ಡೈರಿ ಸೇರಿದಂತೆ 20ಕ್ಕೂ ಹೆಚ್ಚು ಆಯ್ಕೆಗಳು.",
        badge: "21 ವಲಯಗಳು"
      },
      ml: {
        tag: "ഘട്ടം 3",
        title: "20+ ഗ്രാമീണ ബിസിനസ്സ് മേഖലകളിൽ നിന്ന് തിരഞ്ഞെടുക്കുക",
        desc: "സോളാർ എനർജി, ഇക്കോ ടൂറിസം, സി‌എസ്‌സി ഡിജിറ്റൽ ഹബ്ബ്, ക്ഷീരമേഖല തുടങ്ങി 20ലധികം ബിസിനസുകൾ.",
        badge: "21 മേഖലകൾ"
      },
      pa: {
        tag: "ਕਦਮ 3",
        title: "20+ ਪੇਂਡੂ ਕਾਰੋਬਾਰੀ ਸ਼੍ਰੇਣੀਆਂ ਵਿੱਚੋਂ ਚੁਣੋ",
        desc: "ਸੋਲਰ ਊਰਜਾ, ਈਕੋ-ਟੂਰਿਜ਼ਮ, ਡਿਜੀਟਲ ਸੇਵਾ ਕੇਂਦਰ, ਡੇਅਰੀ ਅਤੇ ਖੇਤੀਬਾੜੀ ਮਸ਼ੀਨਰੀ ਵਰਗੇ ਮੌਕੇ।",
        badge: "21 ਖੇਤਰੀ ਸ਼੍ਰੇਣੀਆਂ"
      },
      or: {
        tag: "ପଦକ୍ଷେପ ୩",
        title: "୨୦+ ଗ୍ରାମୀଣ ବ୍ୟବସାୟ ବର୍ଗରୁ ବାଛନ୍ତୁ",
        desc: "ସୌର ଶକ୍ତି, ଇକୋ-ଟୁରିଜିମ, ଡିଜିଟାଲ୍ ସେବା କେନ୍ଦ୍ର, ଡାଏରୀ ସମେତ ୨୦ରୁ ଅଧିକ ବ୍ୟବସାୟ ସୁଯୋଗ।",
        badge: "୨୧ଟି କ୍ଷେତ୍ର"
      },
      as: {
        tag: "পদক্ষেপ ৩",
        title: "২০+ গ্ৰাম্য ব্যৱসায়িক শ্ৰেণীৰ পৰা বাছক",
        desc: "সৌৰ শক্তি, পৰ্যটন, ডিজিটেল সেৱা কেন্দ্ৰ, দুগ্ধ পাম আদি ২০ৰো অধিক ব্যৱসায়ৰ সুযোগ।",
        badge: "২১টা বিভাগ"
      },
      ur: {
        tag: "مرحلہ 3",
        title: "20+ دیہی کاروباری زمروں میں سے انتخاب کریں",
        desc: "شمسی توانائی، ایکو ٹورازم، ڈیجیٹل سروس سینٹر، ڈیری اور فوڈ پروسیسنگ جیسے 20 سے زائد شعبے۔",
        badge: "21 شعبہ جات"
      }
    },
    3: {
      en: {
        tag: "Module 1 Analysis",
        title: "Feasibility Report: Hyper-Local Market Demand",
        desc: "Review your 5-10 km consumer radius, competitor density in your block, pricing benchmarks, and a 2x2 SWOT matrix to validate if your business will thrive.",
        badge: "5-10 km Radius & SWOT Matrix"
      },
      hi: {
        tag: "मॉड्यूल 1 विश्लेषण",
        title: "व्यवहार्यता रिपोर्ट: स्थानीय बाजार मांग व SWOT",
        desc: "अपने ब्लॉक में 5-10 किमी के दायरे में ग्राहकों की मांग, मौजूदा प्रतिस्पर्धियों की संख्या, मूल्य निर्धारण और विस्तृत 2x2 SWOT विश्लेषण देखें।",
        badge: "5-10 किमी दायरा व SWOT"
      },
      mr: {
        tag: "मॉड्यूल 1 विश्लेषण",
        title: "व्यवहार्यता अहवाल: स्थानिक बाजारपेठ मागणी",
        desc: "आपल्या परिसरातील ग्राहक मागणी, प्रतिस्पर्धी, बाजार दर आणि SWOT विश्लेषण तपासा जेणेकरून व्यवसाय फायद्यात राहील.",
        badge: "SWOT व ग्राहक मागणी"
      },
      bn: {
        tag: "মডিউল ১ বিশ্লেষণ",
        title: "সম্ভাব্যতা রিপোর্ট: স্থানীয় বাজারের চাহিদা",
        desc: "আপনার এলাকার ৫-১০ কিলোমিটারের গ্রাহক চাহিদা, প্রতিযোগী সংখ্যা এবং বিস্তারিত SWOT বিশ্লেষণ পর্যালোচনা করুন।",
        badge: "৫-১০ কিমি রেঞ্জ ও SWOT"
      },
      ta: {
        tag: "பகுதி 1",
        title: "சாத்தியக்கூறு அறிக்கை: உள்ளூர் சந்தை தேவை",
        desc: "5-10 கிமீ சுற்றளவில் வாடிக்கையாளர் தேவை, போட்டியாளர்கள் மற்றும் SWOT பகுப்பாய்வு பாருங்கள்.",
        badge: "சந்தை பகுப்பாய்வு"
      },
      te: {
        tag: "మాడ్యూల్ 1",
        title: "సాధ్యత నివేదిక: స్థానిక మార్కెట్ డిమాండ్",
        desc: "5-10 కిమీ పరిధిలో వినియోగదారుల డిమాండ్, పోటీదారులు మరియు SWOT విశ్లేషణను సమీక్షించండి.",
        badge: "మార్కెట్ విశ్లేషణ"
      },
      gu: {
        tag: "વિશ્લેષણ 1",
        title: "વ્યવહારુતા અહેવાલ: સ્થાનિક બજાર માંગ",
        desc: "5-10 કિમી ત્રિજ્યામાં ગ્રાહક માંગ, હરીફોની સંખ્યા અને SWOT વિશ્લેષણ તપાસો.",
        badge: "બજાર વિશ્લેષણ"
      },
      kn: {
        tag: "ಭಾಗ 1",
        title: "ಸಾಧ್ಯತಾ ವರದಿ: ಸ್ಥಳೀಯ ಮಾರುಕಟ್ಟೆ ಬೇಡಿಕೆ",
        desc: "5-10 ಕಿಮೀ ವ್ಯಾಪ್ತಿಯ ಗ್ರಾಹಕರ ಬೇಡಿಕೆ ಮತ್ತು SWOT ವಿಶ್ಲೇಷಣೆಯನ್ನು ವೀಕ್ಷಿಸಿ.",
        badge: "ಮಾರುಕಟ್ಟೆ ಬೇಡಿಕೆ"
      },
      ml: {
        tag: "മൊഡ്യൂൾ 1",
        title: "സാധ്യത റിപ്പോർട്ട്: പ്രാദേശിക വിപണി ഡിമാൻഡ്",
        desc: "5-10 കി.മീ ചുറ്റളവിലെ വിപണി സാധ്യതയും SWOT വിശകലനവും കാണുക.",
        badge: "വിപണി വിശകലനം"
      },
      pa: {
        tag: "ਮੋਡਿਊਲ 1",
        title: "ਸੰਭਾਵਨਾ ਰਿਪੋਰਟ: ਸਥਾਨਕ ਬਾਜ਼ਾਰ ਮੰਗ",
        desc: "5-10 ਕਿਲੋਮੀਟਰ ਦੇ ਘੇਰੇ ਵਿੱਚ ਗਾਹਕ ਮੰਗ ਅਤੇ SWOT ਵਿਸ਼ਲੇਸ਼ਣ ਦੀ ਸਮੀਖਿਆ ਕਰੋ।",
        badge: "ਬਾਜ਼ਾਰ ਵਿਸ਼ਲੇਸ਼ਣ"
      },
      or: {
        tag: "ମଡ୍ୟୁଲ୍ ୧",
        title: "ସମ୍ଭାବ୍ୟତା ରିପୋର୍ଟ: ସ୍ଥାନୀୟ ବଜାର ଚାହିଦା",
        desc: "୫-୧୦ କିଲୋମିଟର ପରିସର ମଧ୍ୟରେ ଗ୍ରାହକ ଚାହିଦା ଓ SWOT ବିଶ୍ଳେଷଣ ଦେଖନ୍ତୁ।",
        badge: "ବଜାର ଚାହିଦା ରିପୋର୍ଟ"
      },
      as: {
        tag: "মডিউল ১",
        title: "সম্ভাৱ্যতা প্ৰতিবেদন: স্থানীয় বজাৰৰ চাহিদা",
        desc: "৫-১০ কিলোমিটাৰ এলেকাৰ গ্ৰাহকৰ চাহিদা আৰু SWOT বিশ্লেষণ নিৰীক্ষণ কৰক।",
        badge: "বজাৰ বিশ্লেষণ"
      },
      ur: {
        tag: "ماڈیول 1",
        title: "فزیبلٹی رپورٹ: مقامی مارکیٹ کی طلب",
        desc: "اپنے علاقے کے 5 سے 10 کلومیٹر کے دائرے میں گاہکوں کی طلب اور تفصیلی SWOT تجزیہ دیکھیں۔",
        badge: "مارکیٹ تجزیہ"
      }
    },
    4: {
      en: {
        tag: "Module 2 Analysis",
        title: "Financial Plan: Multiple Schemes & Partner Banks",
        desc: "Switch between 8 government credit schemes (PMEGP 35% subsidy, Mudra, PMFME, Kusum) and choose from 6 leading banks (SBI, BoB, PNB, RRB) to view custom quarterly EMI schedules.",
        badge: "8 Schemes & 6 Banks Options"
      },
      hi: {
        tag: "मॉड्यूल 2 विश्लेषण",
        title: "वित्तीय योजना: सरकारी योजनाएं व बैंक विकल्प",
        desc: "PMEGP (35% सब्सिडी), मुद्रा और कुसुम जैसी 8 योजनाओं और SBI, BoB, PNB व ग्रामीण बैंकों में से चुनें और ईएमआई शेड्यूल देखें।",
        badge: "8 योजनाएं व 6 बैंक विकल्प"
      },
      mr: {
        tag: "मॉड्यूल 2 विश्लेषण",
        title: "आर्थिक नियोजन: शासकीय योजना व बँक पर्याय",
        desc: "PMEGP (35% सबसिडी) व मुद्रा अशा 8 योजना आणि SBI, BoB, ग्रामीण बँकांमधून निवडून अचूक ईएमआय व व्याज तपासा.",
        badge: "8 योजना व 6 बँका"
      },
      bn: {
        tag: "মডিউল ২ বিশ্লেষণ",
        title: "আর্থিক পরিকল্পনা: সরকারি স্কিম ও ব্যাংক নির্বাচন",
        desc: "PMEGP (৩৫% ভর্তুকি), মুদ্রা এবং এসবিআই, পিএনবি সহ ৮টি স্কিম ও ৬টি ব্যাংক থেকে বেছে নিয়ে ইএমআই শিডিউল দেখুন।",
        badge: "৮টি স্কিম ও ৬টি ব্যাংক"
      },
      ta: {
        tag: "பகுதி 2",
        title: "நிதித் திட்டம்: அரசு திட்டங்கள் & வங்கிகள்",
        desc: "PMEGP (35% மானியம்), முத்ரா போன்ற 8 திட்டங்கள் மற்றும் 6 முன்னணி வங்கிகளைத் தேர்ந்தெடுத்து தவணை விவரங்களை அறியலாம்.",
        badge: "8 திட்டங்கள் & 6 வங்கிகள்"
      },
      te: {
        tag: "మాడ్యూల్ 2",
        title: "ఆర్థిక ప్రణాళిక: ప్రభుత్వ పథకాలు & బ్యాంకులు",
        desc: "PMEGP (35% సబ్సిడీ), ముద్ర వంటి 8 పథకాలు మరియు SBI, BoB వంటి 6 బ్యాంకులను ఎంచుకుని EMI షెడ్యూల్ చూడండి.",
        badge: "8 పథకాలు & 6 బ్యాంకులు"
      },
      gu: {
        tag: "વિશ્લેષણ 2",
        title: "નાણાકીય યોજના: સરકારી યોજનાઓ અને બેંકો",
        desc: "PMEGP (35% સબસિડી), મુદ્રા યોજના અને SBI, BoB સહિત 6 બેંકો પસંદ કરીને EMI ગણતરી જુઓ.",
        badge: "8 યોજનાઓ અને 6 બેંકો"
      },
      kn: {
        tag: "ಭಾಗ 2",
        title: "ಹಣಕಾಸು ಯೋಜನೆ: ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು & ಬ್ಯಾಂಕುಗಳು",
        desc: "PMEGP (35% ಸಬ್ಸಿಡಿ), ಮುದ್ರಾ ಮತ್ತು SBI, PNB ಸೇರಿದಂತೆ 8 ಯೋಜನೆಗಳು & 6 ಬ್ಯಾಂಕುಗಳನ್ನು ಆಯ್ಕೆ ಮಾಡಿ ಇಎಂಐ ಪರಿಶೀಲಿಸಿ.",
        badge: "8 ಯೋಜನೆಗಳು & 6 ಬ್ಯಾಂಕುಗಳು"
      },
      ml: {
        tag: "മൊഡ്യൂൾ 2",
        title: "സാമ്പത്തിക പ്ലാൻ: സർക്കാർ വായ്പകളും ബാങ്കുകളും",
        desc: "PMEGP (35% സബ്‌സിഡി), മുദ്ര പദ്ധതികളും 6 മുൻനിര ബാങ്കുകളും തിരഞ്ഞെടുത്ത് EMI ഷെഡ്യൂൾ പരിശോധിക്കുക.",
        badge: "8 പദ്ധതികളും 6 ബാങ്കുകളും"
      },
      pa: {
        tag: "ਮੋਡਿਊਲ 2",
        title: "ਵਿੱਤੀ ਯੋਜਨਾ: ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਅਤੇ ਬੈਂਕ",
        desc: "PMEGP (35% ਸਬਸਿਡੀ), ਮੁਦਰਾ ਸਮੇਤ 8 ਸਕੀਮਾਂ ਅਤੇ 6 ਪ੍ਰਮੁੱਖ ਬੈਂਕਾਂ ਵਿੱਚੋਂ ਚੁਣ ਕੇ EMI ਵੇਖੋ।",
        badge: "8 ਸਕੀਮਾਂ ਤੇ 6 ਬੈਂਕ"
      },
      or: {
        tag: "ମଡ୍ୟୁଲ୍ ୨",
        title: "ଆର୍ଥିକ ଯୋଜନା: ସରକାରୀ ଯୋଜନା ଓ ବ୍ୟାଙ୍କ ଚୟନ",
        desc: "PMEGP (୩୫% ସବସିଡି), ମୁଦ୍ରା ସମେତ ୮ଟି ଯୋଜନା ଏବଂ ୬ଟି ବ୍ୟାଙ୍କ ମଧ୍ୟରୁ ବାଛି EMI ତାଲିକା ଦେଖନ୍ତୁ।",
        badge: "୮ଟି ଯୋଜନା ଓ ୬ଟି ବ୍ୟାଙ୍କ"
      },
      as: {
        tag: "মডিউল ২",
        title: "বিত্তীয় পৰিকল্পনা: চৰকাৰী আঁচনি আৰু বেংক",
        desc: "PMEGP (৩৫% ৰেহাই), মুদ্ৰা আদি ৮খন আঁচনি আৰু ৬টা বেংকৰ মাজৰ পৰা বাছক।",
        badge: "৮খন আঁচনি আৰু ৬টা বেংক"
      },
      ur: {
        tag: "ماڈیول 2",
        title: "مالیاتی منصوبہ: اسکیموں اور بینکوں کا انتخاب",
        desc: "PMEGP (35% سبسڈی) اور مدرا جیسی 8 اسکیموں اور 6 بڑے بینکوں میں سے انتخاب کر کے اقساط دیکھیں۔",
        badge: "8 اسکیمیں اور 6 بینک"
      }
    },
    5: {
      en: {
        tag: "AI & Official Dossier",
        title: "AI Counselor & Bank-Ready Project Report",
        desc: "Ask the built-in AI Counselor any questions about bank interviews, subsidies, or rules in your regional language. Download an official, signed project dossier ready for bank submission.",
        badge: "AI Advisor & Bank-Ready PDF"
      },
      hi: {
        tag: "एआई व बैंक डोजियर",
        title: "एआई सलाहकार व बैंक-प्रस्तुति प्रोजेक्ट रिपोर्ट",
        desc: "सब्सिडी, बैंक पूछताछ या नियमों पर किसी भी प्रश्न के लिए हमारी AI से अपनी क्षेत्रीय भाषा में पूछें। बैंक में सीधे जमा करने हेतु आधिकारिक प्रोजेक्ट रिपोर्ट डाउनलोड करें।",
        badge: "एआई सलाहकार व बैंक रिपोर्ट"
      },
      mr: {
        tag: "एआय व बँक अहवाल",
        title: "एआय सल्लागार व बँकेसाठी अधिकृत प्रकल्प अहवाल",
        desc: "कोणत्याही प्रश्नासाठी एआय कडून आपल्या भाषेत उत्तरे मिळवा. स्थानिक बँक शाखा व्यवस्थापकाकडे देण्यासाठी मुहरयुक्त प्रकल्प अहवाल डाउनलोड करा.",
        badge: "एआय सहाय्य व बँक अहवाल"
      },
      bn: {
        tag: "এআই ও ব্যাংক ডসিয়ার",
        title: "এআই পরামর্শক ও ব্যাংক ঋণের অফিসিয়াল রিপোর্ট",
        desc: "আপনার যেকোনো প্রশ্নের জন্য AI উপদেষ্টাকে জিজ্ঞাসা করুন। ব্যাংকে জমা দেওয়ার উপযোগী স্বাক্ষরিত প্রজেক্ট রিপোর্ট ডাউনলোড করুন।",
        badge: "এআই ও ব্যাংক রিপোর্ট"
      },
      ta: {
        tag: "AI & வங்கி அறிக்கை",
        title: "AI ஆலோசகர் மற்றும் வங்கி திட்ட அறிக்கை",
        desc: "உங்கள் கேள்விகளுக்கு AI உதவியாளரிடம் கேட்டு விளக்கம் பெறலாம். வங்கியில் சமர்ப்பிக்க திட்ட அறிக்கையை பதிவிறக்குங்கள்.",
        badge: "AI ஆலோசகர் & PDF"
      },
      te: {
        tag: "AI & బ్యాంక్ నివేదిక",
        title: "AI కౌన్సిలర్ మరియు ప్రాజెక్ట్ నివేదిక",
        desc: "సందేహాల కోసం AI సలహాదారుని అడగండి. బ్యాంకు సమర్పణ కోసం అధికారిక ప్రాజెక్ట్ నివేదికను డౌన్‌లోడ్ చేసుకోండి.",
        badge: "AI కౌన్సిలర్ & PDF"
      },
      gu: {
        tag: "AI અને બેંક રિપોર્ટ",
        title: "AI સલાહકાર અને સત્તાવાર પ્રોજેક્ટ અહેવાલ",
        desc: "તમારા પ્રશ્નો માટે AI સહાયક સાથે વાત કરો અને બેંકમાં રજૂ કરવા માટે સંપૂર્ણ પ્રોજેક્ટ રિપોર્ટ ડાઉનલોડ કરો.",
        badge: "AI સલાહકાર & PDF"
      },
      kn: {
        tag: "AI & ಬ್ಯಾಂಕ್ ವರದಿ",
        title: "AI ಸಲಹೆಗಾರ ಮತ್ತು ಯೋಜನಾ ವರದಿ ಡೌನ್‌ಲೋಡ್",
        desc: "ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳಿಗೆ AI ಸಲಹೆಗಾರರನ್ನು ಕೇಳಿ. ಬ್ಯಾಂಕಿಗೆ ಸಲ್ಲಿಸಲು ಅಧಿಕೃತ ಯೋಜನಾ ವರದಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.",
        badge: "AI ಸಲಹೆಗಾರ & PDF"
      },
      ml: {
        tag: "AI & ബാങ്ക് റിപ്പോർട്ട്",
        title: "AI ഉപദേശകനും ബാങ്ക് സമർപ്പണ റിപ്പോർട്ടും",
        desc: "സംശയങ്ങൾക്ക് AI അസിസ്റ്റന്റിനോട് ചോദിക്കുക. ബാങ്കിൽ സമർപ്പിക്കുന്നതിനായി പ്രൊജക്റ്റ് റിപ്പോർട്ട് ഡൗൺലോഡ് ചെയ്യുക.",
        badge: "AI ഉപദേശകൻ & PDF"
      },
      pa: {
        tag: "AI ਅਤੇ ਬੈਂਕ ਰਿਪੋਰਟ",
        title: "AI ਸਲਾਹਕਾਰ ਅਤੇ ਬੈਂਕ ਲਈ ਪ੍ਰੋਜੈਕਟ ਰਿਪੋਰਟ",
        desc: "ਕਿਸੇ ਵੀ ਸਵਾਲ ਲਈ AI ਸਲਾਹਕਾਰ ਨੂੰ ਪੁੱਛੋ ਅਤੇ ਬੈਂਕ ਵਿੱਚ ਜਮ੍ਹਾਂ ਕਰਾਉਣ ਲਈ ਪ੍ਰੋਜੈਕਟ ਰਿਪੋਰਟ ਡਾਊਨਲੋਡ ਕਰੋ।",
        badge: "AI ਸਲਾਹਕਾਰ & PDF"
      },
      or: {
        tag: "AI ଓ ବ୍ୟାଙ୍କ ରିପୋର୍ଟ",
        title: "AI ପରାମର୍ଶଦାତା ଓ ବ୍ୟାଙ୍କ ପ୍ରକଳ୍ପ ରିପୋର୍ଟ",
        desc: "ନିଜ ପ୍ରଶ୍ନ ପାଇଁ AI ସହାୟକଙ୍କୁ ପଚାରନ୍ତୁ। ବ୍ୟାଙ୍କରେ ଦାଖଲ ପାଇଁ ଅଫିସିଆଲ୍ ରିପୋର୍ଟ ଡାଉନଲୋଡ୍ କରନ୍ତୁ।",
        badge: "AI ପରାମର୍ଶ ଓ PDF"
      },
      as: {
        tag: "AI আৰু বেংক প্ৰতিবেদন",
        title: "AI পৰামৰ্শদাতা আৰু বেংক প্ৰকল্প প্ৰতিবেদন",
        desc: "প্ৰশ্নৰ উত্তৰৰ বাবে AI ৰ সহায় লওক আৰু বেংকত দাখিল কৰিবলৈ প্ৰকল্প প্ৰতিবেদন ডাউনল'ড কৰক।",
        badge: "AI পৰামৰ্শ আৰু PDF"
      },
      ur: {
        tag: "AI اور پروجیکٹ رپورٹ",
        title: "AI مشیر اور بینک کے لیے پروجیکٹ رپورٹ",
        desc: "کسی بھی سوال کے لیے AI مشیر سے اپنی زبان میں رہنمائی لیں۔ بینک میں جمع کرانے کے لیے باضابطہ پروجیکٹ رپورٹ ڈاؤن لوڈ کریں۔",
        badge: "AI مشیر اور بینک رپورٹ"
      }
    }
  };

  const stepIcons = [
    <MapPin className="h-8 w-8 text-blue-900" />,
    <IndianRupee className="h-8 w-8 text-emerald-900" />,
    <Briefcase className="h-8 w-8 text-amber-900" />,
    <BarChart3 className="h-8 w-8 text-blue-900" />,
    <Coins className="h-8 w-8 text-indigo-900" />,
    <Bot className="h-8 w-8 text-emerald-900" />
  ];

  const stepAccents = [
    "bg-blue-50 text-blue-900 border-blue-200",
    "bg-emerald-50 text-emerald-900 border-emerald-200",
    "bg-amber-50 text-amber-900 border-amber-200",
    "bg-blue-50 text-blue-900 border-blue-200",
    "bg-indigo-50 text-indigo-900 border-indigo-200",
    "bg-emerald-50 text-emerald-900 border-emerald-200"
  ];

  const totalSteps = 6;
  const currentStepData = TUTORIAL_CONTENT[currentStep]?.[guideLang] || TUTORIAL_CONTENT[currentStep]?.en;
  const isFirst = currentStep === 0;
  const isLast = currentStep === totalSteps - 1;

  const handleNext = () => {
    if (isLast) {
      localStorage.setItem("udyam_tutorial_completed", "true");
      onClose();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem("udyam_tutorial_completed", "true");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div
        id="tutorial-modal-card"
        className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header with Step indicator, In-Guide Language Switcher, and Skip Button */}
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="h-6 px-2.5 rounded-full bg-blue-900 text-white text-[11px] font-bold flex items-center">
              {guideLang === "hi" ? `कदम ${currentStep + 1} / ${totalSteps}` : `Step ${currentStep + 1} of ${totalSteps}`}
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:inline">
              {currentStepData.tag}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* In-Guide Language Selection Dropdown */}
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-2.5 py-1 shadow-2xs hover:border-blue-400 transition-colors">
              <Globe className="h-3.5 w-3.5 text-blue-700 shrink-0" />
              <select
                id="guide-language-select"
                aria-label="Change language in guide"
                value={guideLang}
                onChange={(e) => {
                  const newLang = e.target.value as SupportedLanguage;
                  setGuideLang(newLang);
                  onLanguageChange?.(newLang);
                }}
                className="text-xs font-bold text-slate-800 bg-transparent outline-none cursor-pointer pr-1"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              id="tutorial-skip-btn"
              onClick={handleSkip}
              className="text-xs font-bold text-slate-500 hover:text-slate-900 px-2.5 py-1.5 rounded-lg hover:bg-slate-200/70 transition-colors flex items-center gap-1"
            >
              <span>{guideLang === "hi" ? "स्किप करें" : "Skip"}</span>
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 flex flex-col items-center text-center">
          {/* Visual Icon */}
          <div className={`p-4 rounded-3xl border shadow-sm mb-4 ${stepAccents[currentStep]}`}>
            {stepIcons[currentStep]}
          </div>

          <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-[11px] font-bold tracking-wide mb-2.5">
            {currentStepData.badge}
          </span>

          <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-3 leading-snug">
            {currentStepData.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md">
            {currentStepData.desc}
          </p>

          {/* Step Dots */}
          <div className="flex items-center gap-1.5 mt-8">
            {Array.from({ length: totalSteps }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                id={`tutorial-dot-${idx}`}
                onClick={() => setCurrentStep(idx)}
                aria-label={`Go to step ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${
                  currentStep === idx
                    ? "w-6 bg-blue-900"
                    : "w-2 bg-slate-200 hover:bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            id="tutorial-prev-btn"
            onClick={handlePrev}
            disabled={isFirst}
            className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1 transition-colors ${
              isFirst
                ? "text-slate-300 cursor-not-allowed"
                : "text-slate-700 hover:bg-slate-200/80"
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>{guideLang === "hi" ? "पिछला" : "Previous"}</span>
          </button>

          <button
            type="button"
            id="tutorial-next-btn"
            onClick={handleNext}
            className="px-6 py-2.5 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <span>
              {isLast
                ? guideLang === "hi" ? "शुरू करें" : "Get Started"
                : guideLang === "hi" ? "आगे बढ़ें" : "Next"}
            </span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
