import { FeasibilityReportData, SupportedLanguage, SUPPORTED_LANGUAGES } from "../types";

// Static multi-language translation dictionary for the feasibility report domain knowledge
// Covers all 13 supported languages: en, hi, mr, bn, ta, te, gu, kn, ml, pa, or, as, ur
interface ReportTranslations {
  opportunitySummary: Record<string, string>;
  niches: Record<string, string>;
  swotStrengths: Record<string, string>;
  swotWeaknesses: Record<string, string>;
  swotOpportunities: Record<string, string>;
  swotThreats: Record<string, string>;
  threatsSummary: Record<string, string>;
  risks: Record<string, string>;
  competitorSummary: Record<string, string>;
  competitorInsights: Record<string, string>;
  pricingSummary: Record<string, string>;
  priceRange: Record<string, string>;
  benchmarkNote: Record<string, string>;
}

// Pre-compiled translation maps for common rural feasibility report sentences
const TRANSLATION_MAPS: Record<SupportedLanguage, Partial<ReportTranslations>> = {
  en: {},
  hi: {
    opportunitySummary: {
      "default": "मूल्य-संवर्धित प्रसंस्करण और स्वच्छ स्थानीय पैकेजिंग से कच्चे माल के खुले व्यापार की तुलना में 30% अधिक लाभ मार्जिन प्राप्त होता है।",
      "dairy": "ताजे दूध को प्रशीतित (चिल्ड) करके और स्वच्छ पनीर/दही बनाकर बेचने से खुले दूध की तुलना में 35% अधिक लाभ मार्जिन मिलता है।",
      "retail": "किराना के साथ-साथ तेज बिकने वाले उपभोक्ता सामान (FMCG) और स्थानीय मसाले रखने से ग्राहकों की संख्या और मुनाफा बढ़ता है।",
      "textiles": "स्कूल यूनिफॉर्म और त्योहारों के लिए तैयार परिधानों की सिलाई में सामान्य सिलाई की तुलना में अधिक लाभ मार्जिन है।",
      "food": "कोल्ड-प्रेस्ड शुद्ध तेल और पारंपरिक मसालों की स्थानीय मांग बहुत तेज है, जिसमें 30% से 40% का शुद्ध मार्जिन संभव है।",
      "ecotourism": "मिट्टी के पारंपरिक आवास, ग्रामीण भोजन और कृषि भ्रमण शहरी पर्यटकों को आकर्षित करते हैं और 50% से अधिक लाभ देते हैं।",
      "renewable": "कृषि सोलर पंपों की स्थापना और वार्षिक रखरखाव अनुबंध (AMC) से नियमित और सुरक्षित आय प्राप्त होती है।",
      "digital": "सरकारी योजनाओं के ऑनलाइन आवेदन, आधार सक्षम भुगतान (AePS) और मिनी-एटीएम सेवा से प्रतिदिन नकद कमीशन मिलता है।",
      "artisanal": "हाथ से बने जैविक उत्पादों और पारंपरिक मोटे अनाज (श्री अन्न) के उत्पादों पर 35% से 50% का उत्कृष्ट मार्जिन उपलब्ध है।"
    },
    niches: {
      "Locally branded packaged items": "स्थानीय ब्रांडेड पैकेज्ड उत्पाद",
      "Morning fresh subscription delivery": "सुबह की ताजा सदस्यता आधारित घर-पहुंच सेवा",
      "Direct supply to local schools & dhabas": "स्थानीय स्कूलों और ढाबों को सीधी थोक आपूर्ति",
      "Farm-fresh A2 Desi Cow Milk": "खेत का ताजा ए2 देसी गाय का दूध",
      "Value-added Paneer & Ghee during festival peaks": "त्योहारों में मूल्य-संवर्धित ताजा पनीर और शुद्ध घी",
      "Chilled curd supply to local dhabas along highway": "हाईवे के ढाबों और होटलों को प्रशीतित दही की आपूर्ति",
      "Local branded regional snacks & spices": "स्थानीय ब्रांडेड क्षेत्रीय नमकीन और पिसे मसाले",
      "Mini-departmental layout with self-selection counters": "स्वयं-चयन काउंटरों के साथ मिनी-डिपार्टमेंटल स्टोर",
      "Digital payments (UPI/QR) & utility bill payment assist": "डिजिटल भुगतान (UPI/QR) और बिजली-पानी बिल भुगतान सुविधा",
      "School & college uniform bulk contracts": "स्कूल और कॉलेज यूनिफॉर्म के थोक सिलाई अनुबंध",
      "Custom bridal blouse & festive embroidery": "शादी-ब्याह के लिए विशेष कढ़ाई और डिजाइनर परिधान",
      "Low-cost cotton workwear for farm laborers": "खेत मजदूरों के लिए टिकाऊ और किफायती सूती पोशाक",
      "FSSAI-certified traditional mango/lemon pickles": "एफएसएसएआई प्रमाणित पारंपरिक आम और नींबू के अचार",
      "Hygienic cold-pressed mustard/groundnut oil": "स्वच्छ तरीके से निकाला गया कच्ची घानी सरसों व मूंगफली तेल",
      "Multi-grain diabetic-friendly flour (Atta) mixes": "डायबिटीज-अनुकूल मल्टीग्रेन पौष्टिक आटा मिश्रण",
      "Agri-tourism farm stay with fresh organic harvest picking": "ऑर्गेनिक खेती भ्रमण और ताजे फल-सब्जी तुड़ाई के साथ फार्म स्टे",
      "Stargazing and rural folk music night camps": "ग्रामीण लोक संगीत और रात्रि कैम्पिंग अनुभव",
      "Day-picnics for urban school and senior citizen clubs": "शहरी स्कूलों और वरिष्ठ नागरिकों के लिए दिन का ग्रामीण पिकनिक",
      "Solar pump cleaning, inverter repair & battery replenishment AMC": "सोलर पंप सफाई, इन्वर्टर मरम्मत और बैटरी रखरखाव एएमसी",
      "Rooftop solar for grain mills & cold storages": "आटा चक्की और कोल्ड स्टोरेज के लिए रूफटॉप सोलर प्लांट",
      "Bio-gas plant installation for dairy farmers": "डेयरी किसानों के लिए गोबर गैस / बायो-गैस संयंत्र स्थापना",
      "AePS (Aadhaar Enabled Payment System) cash deposits & withdrawals": "आधार सक्षम भुगतान (AePS) द्वारा नकद जमा और निकासी",
      "Land Record (7/12, Khatauni) extraction and digital color lamination": "भूलेख (खतौनी/खसरा) प्रतिलिपि निकालना और डिजिटल लेमिनेशन",
      "Railway (IRCTC) and bus reservation counter": "रेलवे (IRCTC) और बस टिकट बुकिंग सुविधा केंद्र"
    },
    swotStrengths: {
      "10% low margin money requirement under govt scheme": "सरकारी योजना के तहत केवल 10% कम मार्जिन राशि की आवश्यकता",
      "Immediate daily cash flow turnaround": "त्वरित दैनिक नकदी प्रवाह और निरंतर बिक्री",
      "Proximity to raw village inputs": "गाँव के स्थानीय कच्चे माल की आसान और सस्ती उपलब्धता",
      "Abundant local fodder supply": "स्थानीय स्तर पर प्रचुर हरा चारा और भूसा उपलब्ध",
      "High daily cash-flow velocity": "दैनिक नकद बिक्री से कार्यशील पूंजी की सुगमता",
      "Govt subsidy under National Livestock Mission": "राष्ट्रीय पशुधन मिशन के तहत सरकारी पूंजीगत सब्सिडी",
      "Immediate cash turnaround": "दैनिक नकद आवक से उधारी की चिंता कम",
      "Year-round non-cyclical basic demand": "साल भर चलने वाली अनिवार्य दैनिक उपभोग मांग",
      "High community goodwill": "स्थानीय गाँव समाज में गहरा विश्वास और प्रतिष्ठा",
      "Low initial machine deprecation": "मशीनों का कम रखरखाव और दीर्घकालिक उपयोग",
      "High labor value-addition": "कुशल कारीगरी से उत्पाद का मूल्य कई गुना बढ़ना",
      "Repeat customer retention": "विश्वसनीय कार्य से बार-बार आने वाले पक्के ग्राहक",
      "Proximity to raw agricultural produce at mandi prices": "मंडी भाव पर स्थानीय कृषि उपज की सीधी खरीद",
      "Govt PMFME 35% capital subsidy scheme compatibility": "पीएमएफएमई योजना के तहत 35% बैक-एंडेड पूंजीगत सब्सिडी",
      "Scenic natural rural ambience": "प्राकृतिक ग्रामीण शांति और प्रदूषण-मुक्त वातावरण",
      "High government push under PM-KUSUM & PM Surya Ghar Muft Bijli Yojana": "पीएम-कुसुम और पीएम सूर्य घर मुफ्त बिजली योजना का पूर्ण सहयोग",
      "Low capital expenditure": "न्यूनतम पूंजीगत व्यय में तुरंत शुरू होने वाला उद्यम",
      "Near-zero raw material cost (waste streams)": "कृषि अवशेष और अपशिष्ट पदार्थों से लगभग शून्य कच्चा माल खर्च"
    },
    swotWeaknesses: {
      "Cold storage / power backup vulnerability": "कोल्ड स्टोरेज / बिजली बैकअप की निरंतर आवश्यकता",
      "Working capital tied in seasonal inventory": "मौसमी स्टॉक और कच्चे माल में कार्यशील पूंजी का रुकना",
      "Requires constant cold-chain electricity": "दूध और दुग्ध उत्पादों के लिए चौबीसों घंटे बिजली आवश्यक",
      "Veterinary care access dependencies": "पशु चिकित्सा और कृत्रिम गर्भाधान सेवाओं पर निर्भरता",
      "Working capital tied up in slow-moving stock": "धीमी गति से बिकने वाले माल में पूंजी का अवरुद्ध होना",
      "Unregulated credit given to customers (udhaar)": "ग्राहकों को अनियंत्रित उधार देने से नकदी का संकट",
      "Dependent on skilled tailors/artisans": "कुशल कारीगरों और समय पर काम करने वाले दर्जियों पर निर्भरता",
      "High seasonality around Diwali/Eid/wedding months": "शादी-ब्याह और त्योहारों के समय ही अत्यधिक व्यस्तता",
      "FSSAI testing and shelf-life compliance learning curve": "खाद्य सुरक्षा (FSSAI) प्रमाणन और शेल्फ-लाइफ परीक्षण की समझ",
      "Packaging material sourcing from nearby towns": "अच्छे पैकेजिंग पाउच और लेबल के लिए नजदीकी शहर पर निर्भरता",
      "Seasonal tourism peaks (monsoon & winter)": "पर्यटन केवल सर्दी और सुहावने मौसम में ही चरम पर रहना",
      "Requires certified technician training for high-voltage invertors": "हाई-वोल्टेज सोलर इन्वर्टर के लिए प्रशिक्षित तकनीशियन की जरूरत",
      "Dependence on broadband internet stability and biometric server uptime": "इंटरनेट कनेक्टिविटी और आधार बायोमेट्रिक सर्वर की कार्यप्रणाली पर निर्भरता"
    },
    swotOpportunities: {
      "Government interest subvention and back-ended capital subsidy": "सरकारी ब्याज अनुदान और बैक-एंडेड पूंजीगत सब्सिडी का सीधा लाभ",
      "Expansion into neighboring weekly haats": "आस-पास के साप्ताहिक हाटों और ग्रामीण बाजारों में बिक्री का विस्तार",
      "Supply tie-up with district cooperative federation": "जिला दुग्ध सहकारी संघ के साथ नियमित आपूर्ति अनुबंध",
      "Cattle dung biogas & organic manure monetization": "गोबर से बायोगैस और जैविक वर्मीकम्पोस्ट खाद बनाकर अतिरिक्त आमदनी",
      "Tie up with regional FMCG distributors for direct bulk discounts": "बड़ी कंपनियों के थोक वितरकों से सीधे जुड़कर अधिक मार्जिन पाना",
      "Micro-ATM / banking correspondent point for extra commission": "दुकान पर माइक्रो-एटीएम लगाकर अतिरिक्त कमीशन और ग्राहकों का आकर्षण",
      "Catalog selling via WhatsApp and Instagram": "व्हाट्सएप और सोशल मीडिया कैटलॉग के जरिए सीधी ऑनलाइन बुकिंग",
      "Selling on ONDC (Open Network for Digital Commerce)": "ओएनडीसी (ONDC) डिजिटल प्लेटफॉर्म पर पूरे देश में उत्पाद बेचना",
      "Supplying festive gift hampers to local corporates & schools": "त्योहारों में स्थानीय संस्थानों और स्कूलों को उपहार पैक की आपूर्ति",
      "Financing tie-ups with regional rural banks (RRBs) for zero-down-payment farmer loans": "क्षेत्रीय ग्रामीण बैंकों (RRB) के साथ किसानों के लिए आसान ऋण व्यवस्था",
      "Acting as banking correspondent (BC) for regional rural bank": "बैंक मित्र (Banking Correspondent) बनकर स्थायी मासिक आमदनी पाना"
    },
    swotThreats: {
      "Pre-monsoon raw material inflation": "मानसून से पहले कच्चे माल की कीमतों में अप्रत्याशित वृद्धि",
      "Customer credit ledger (udhaar) default risks": "ग्राहकों के उधार खाते (उधार) में भुगतान अटकने का जोखिम",
      "Summer yield reduction (heat stress)": "भीषण गर्मी में पशुओं के दूध उत्पादन में मौसमी गिरावट",
      "Fodder price inflation during dry spells": "सूखे मौसम में हरे व सूखे चारे के दामों में तेजी",
      "Aggressive wholesale discounters near highways": "हाईवे के पास बड़े थोक विक्रेताओं से मूल्य प्रतिस्पर्धा",
      "High perishability on fresh produce": "ताजे फलों और सब्जियों के जल्दी खराब होने का डर",
      "Cheap synthetic readymade imports from urban textile hubs": "सूरत और दिल्ली से आने वाले सस्ते सिंथेटिक रेडीमेड कपड़ों की चुनौती",
      "Unseasonal crop damage increasing spice/grain purchase costs": "बेमौसम बारिश से फसल खराब होने पर अनाजों और मसालों की लागत बढ़ना",
      "Dust accumulation reducing panel efficiency if not maintained": "धूल-मिट्टी जमने से सोलर पैनलों की कार्यक्षमता घटना",
      "Biometric mismatch among manual farm laborers with worn fingerprints": "खेत मजदूरों की घिसी हुई उंगलियों के कारण आधार बायोमेट्रिक मिसमैच"
    },
    threatsSummary: {
      "default": "मानसून में मौसमी मंदी और एकल खरीदारों से भुगतान में देरी से निपटने के लिए सक्रिय नकदी भंडार बनाए रखें।",
      "dairy": "गर्मियों में दूध उत्पादन में कमी और चारे की कीमतों में अचानक वृद्धि से बचाव के लिए अग्रिम योजना आवश्यक है।",
      "retail": "ग्राहकों को अत्यधिक उधार देने से बचें और स्टॉक के खराब होने से पहले उसका त्वरित विक्रय सुनिश्चित करें।",
      "textiles": "ऑफ-सीजन में मांग में कमी और कुशल कारीगरों को रोके रखने के लिए अग्रिम ऑर्डर लेना आवश्यक है।",
      "food": "नमी वाले मौसम में फफूंदी और कच्चे माल की कीमतों में उतार-चढ़ाव से बचाव के लिए उचित भंडारण व्यवस्था करें।",
      "renewable": "आंधी-तूफान में इन्वर्टर सुरक्षा और सरकारी सब्सिडी प्रक्रिया में लगने वाले समय का ध्यान रखें।",
      "digital": "सरकारी पेंशन वितरण के दिनों में नकदी की कमी और ब्रॉडबैंड कटने से बचने के लिए वैकल्पिक सिम रखें।"
    },
    risks: {
      "Power cuts requiring generator backup": "बिजली कटौती जिसके लिए जनरेटर या इन्वर्टर बैकअप की आवश्यकता होगी",
      "Seasonal demand swings during agricultural sowing months": "कृषि बुवाई और कटाई के महीनों में ग्राहकों की उपस्थिति में उतार-चढ़ाव",
      "Supply chain transport delays": "खराब मौसम या परिवहन हड़ताल के दौरान कच्चे माल की आपूर्ति में देरी",
      "Power cuts affecting raw milk chilling": "बिजली गुल होने से दूध के फटने का खतरा (सोलर या जनरेटर जरूरी)",
      "Fodder price hike in pre-monsoon months": "मानसून पूर्व महीनों में सूखे चारे की कीमतों में 20-30% की वृद्धि",
      "Over-extension of credit during lean agricultural sowing months": "बुवाई के सीजन में ग्रामीणों को अत्यधिक उधारी देना",
      "Inventory spoilage due to humidity": "बरसात के मौसम में दालों और मसालों में नमी लगने का खतरा",
      "Seasonal lean period during monsoon": "मानसून के महीनों में सिलाई और कपड़ों की मांग में कमी",
      "Moisture saturation killing earthworms in vermicompost pits": "अत्यधिक बारिश में केंचुआ खाद के गड्ढों में पानी भरने का खतरा",
      "Panel theft in isolated farm fields": "दूर-दराज के खेतों में लगे सोलर पैनलों की चोरी का अंदेशा"
    },
    competitorSummary: {
      "default": "इस ब्लॉक में 3-4 असंगठित विक्रेताओं के साथ मध्यम प्रतिस्पर्धा है; उच्च स्वच्छता और व्यवस्थित सेवा से पूरा बाजार आपका हो सकता है।",
      "dairy": "क्षेत्र में 4 पारंपरिक दूध विक्रेता हैं, लेकिन स्वच्छ प्रशीतित (चिल्ड) पैकेज्ड दूध कोई नहीं देता।",
      "retail": "मुख्य बाजार में 5 पारंपरिक किराना दुकानें हैं; डिजिटल ऑर्डरिंग और साफ-सुथरी पैकेजिंग से आप आगे रहेंगे।",
      "textiles": "गाँव में 3 घरेलू दर्जी हैं, लेकिन आधुनिक ओवरलॉक व इंटरलॉक फिनिशिंग का अभाव है।",
      "food": "क्षेत्र में केवल 1 साधारण आटा चक्की है; शुद्ध कच्ची घानी तेल और ब्रांडेड मसालों का कोई संगठित उत्पादक नहीं है।",
      "renewable": "35 किमी दूर केवल 1 सोलर डीलर है; स्थानीय स्तर पर तुरंत 24 घंटे में मरम्मत करने वाला कोई नहीं है।",
      "digital": "गाँव में 2 धीमे साइबर कैफे हैं जहाँ अक्सर नकद खत्म हो जाता है; त्वरित 2 मिनट सेवा से सभी ग्राहक आपके पास आएंगे।"
    },
    competitorInsights: {
      "default": "मौजूदा विक्रेता पारंपरिक तरीके से काम कर रहे हैं। स्वच्छ पैकेजिंग, सही नाप-तौल और व्हाट्सएप होम डिलीवरी से आप 40% अतिरिक्त ग्राहक जोड़ सकते हैं।",
      "dairy": "मौजूदा विक्रेता कच्चा खुला दूध ₹42-45 में बेचते हैं। स्वच्छ प्रशीतित पैकेट का दूध ₹54-58 में तुरंत बिकता है।",
      "retail": "पारंपरिक दुकानों में अंधेरा और भीड़ होती है। अच्छी रोशनी, स्पष्ट मूल्य टैग और होम डिलीवरी से ग्राहक आकर्षित होते हैं।",
      "textiles": "स्थानीय दर्जी 2 सप्ताह का समय लेते हैं। 48 घंटे में गारंटीड सिलाई देने से नौकरीपेशा और युवा ग्राहक तुरंत जुड़ेंगे।"
    },
    pricingSummary: {
      "default": "ग्रामीण और अर्ध-शहरी उपभोक्ताओं की क्रय शक्ति के अनुकूल टिकाऊ लाभ मार्जिन प्रदान करने वाली अनुशंसित मूल्य सीमा।",
      "dairy": "प्रशीतित पाउच दूध के लिए ₹52 से ₹58 प्रति लीटर और ताजा पनीर के लिए ₹320 से ₹360 प्रति किलो अनुशंसित है।",
      "retail": "दाल-अनाज जैसी बुनियादी वस्तुओं पर 12-18% और पैक किए गए स्नैक्स व सौंदर्य प्रसाधनों पर 25-32% सकल मार्जिन मिलता है।",
      "textiles": "साधारण सिलाई ₹250-₹450 प्रति परिधान और स्कूल यूनिफॉर्म सेट ₹550-₹850 प्रति जोड़ी पर अनुशंसित है।"
    },
    priceRange: {
      "default": "स्थानीय बाजार में प्रतिस्पर्धी एवं उचित मूल्य",
      "Competitive Local Range": "प्रतिस्पर्धी स्थानीय मूल्य सीमा",
      "₹50 - ₹58 / Liter": "₹50 - ₹58 प्रति लीटर",
      "₹10 - ₹2,500 varied SKUs": "₹10 से ₹2,500 के विभिन्न उत्पाद",
      "₹250 - ₹1,200 per garment": "₹250 से ₹1,200 प्रति परिधान",
      "₹90 - ₹350 per packaged unit": "₹90 से ₹350 प्रति पैकेट",
      "₹20 - ₹200 per service transaction": "₹20 से ₹200 प्रति सेवा"
    },
    benchmarkNote: {
      "default": "कृषि और अर्ध-शहरी पंचायतों में स्थानीय लोगों की क्रय शक्ति और दैनिक आदतों के आधार पर निर्धारित।",
      "Calibrated for purchasing habits in agricultural and semi-urban panchayats.": "कृषि और अर्ध-शहरी पंचायतों में स्थानीय उपभोग और क्रय आदतों के आधार पर निर्धारित।"
    }
  },
  mr: {
    opportunitySummary: {
      "default": "मूल्यवर्धित प्रक्रिया आणि स्वच्छ स्थानिक पॅकेजिंगमुळे खुल्या कच्च्या मालाच्या व्यापारापेक्षा 30% जास्त नफा मिळतो.",
      "dairy": "ताजे दूध थंड (चिल्ड) करून आणि स्वच्छ पनीर/दही बनवून विकल्यास खुल्या दुधापेक्षा 35% जास्त नफा मिळतो.",
      "retail": "किराणा मालासोबत जलद खपाच्या वस्तू (FMCG) आणि स्थानिक मसाले ठेवल्याने ग्राहकांची गर्दी आणि नफा वाढतो.",
      "textiles": "शालेय गणवेश आणि सणासुदीच्या तयार कपड्यांच्या शिलाईमध्ये साध्या शिलाईपेक्षा खूप चांगला नफा मिळतो."
    },
    niches: {
      "Locally branded packaged items": "स्थानिक ब्रँडेड पॅकेज्ड वस्तू",
      "Morning fresh subscription delivery": "सकाळची ताजी घरपोच मासिक वर्गणी सेवा",
      "Direct supply to local schools & dhabas": "स्थानिक शाळा आणि धाब्यांना थेट पुरवठा",
      "Farm-fresh A2 Desi Cow Milk": "गोठ्यातील ताजे ए2 देशी गाईचे दूध",
      "Value-added Paneer & Ghee during festival peaks": "सणासुदीच्या काळात ताजे पनीर आणि शुद्ध साजूक तूप"
    },
    swotStrengths: {
      "10% low margin money requirement under govt scheme": "सरकारी योजनेअंतर्गत केवळ 10% कमी मार्जिन रकमेची गरज",
      "Immediate daily cash flow turnaround": "तातडीने होणारी दैनंदिन रोकड उलाढाल आणि सतत विक्री",
      "Proximity to raw village inputs": "गावातील स्थानिक कच्च्या मालाची सुलभ उपलब्धता"
    },
    swotWeaknesses: {
      "Cold storage / power backup vulnerability": "कोल्ड स्टोरेज / वीज बॅकअपची निरंतर आवश्यकता",
      "Working capital tied in seasonal inventory": "हंगामी साठ्यामध्ये खेळते भांडवल अडकण्याची शक्यता"
    },
    swotOpportunities: {
      "Government interest subvention and back-ended capital subsidy": "सरकारी व्याज सवलत आणि भांडवली अनुदानाचा थेट फायदा",
      "Expansion into neighboring weekly haats": "शेजारच्या आठवडी बाजारात आणि ग्रामीण भागात विक्री विस्तार"
    },
    swotThreats: {
      "Pre-monsoon raw material inflation": "पावसाळ्यापूर्वी कच्च्या मालाच्या दरात अचानक वाढ",
      "Customer credit ledger (udhaar) default risks": "ग्राहकांच्या उधारी खात्यातील (उधार) पैसे अडकण्याची जोखीम"
    },
    threatsSummary: {
      "default": "पावसाळ्यातील मंदी आणि खरेदीदारांकडून विलंबाने मिळणाऱ्या पैशांमुळे खेळता रोकड राखीव निधी आवश्यक आहे."
    },
    risks: {
      "Power cuts requiring generator backup": "वीज खंडित होणे ज्यासाठी जनरेटर बॅकअप आवश्यक आहे",
      "Seasonal demand swings during agricultural sowing months": "शेतीच्या पेरणीच्या काळात मागणीतील चढ-उतार",
      "Supply chain transport delays": "पुरवठा साखळी आणि वाहतुकीतील अडथळे"
    },
    competitorSummary: {
      "default": "या ब्लॉकमध्ये 3-4 असंघटित विक्रेत्यांसह मध्यम स्पर्धा; स्वच्छता आणि चांगल्या पॅकेजिंगने बाजार जिंकण्याची मोठी संधी."
    },
    pricingSummary: {
      "default": "स्थानिक खरेदी क्षमतेचा विचार करून शाश्वत नफा मिळवून देणारी शिफारस केलेली किंमत."
    },
    priceRange: {
      "default": "किफायतशीर स्थानिक दर",
      "Competitive Local Range": "स्पर्धात्मक स्थानिक दर श्रेणी"
    },
    benchmarkNote: {
      "default": "कृषी आणि निम-शहरी पंचायतींमधील ग्राहकांच्या खरेदीच्या सवयींनुसार निश्चित."
    }
  },
  bn: {
    opportunitySummary: {
      "default": "মূল্য সংযোজিত প্রক্রিয়াকরণ এবং স্বাস্থ্যকর স্থানীয় প্যাকেজিং আলগা কাঁচামাল বাণিজ্যের তুলনায় ৩০% বেশি মার্জিন প্রদান করে।"
    },
    niches: {
      "Locally branded packaged items": "স্থানীয় ব্র্যান্ডযুক্ত প্যাকেটজাত পণ্য",
      "Morning fresh subscription delivery": "সকালের তাজা সাবস্ক্রিপশন হোম ডেলিভারি",
      "Direct supply to local schools & dhabas": "স্থানীয় স্কুল এবং ধাবায় সরাসরি পাইকারি সরবরাহ"
    },
    swotStrengths: {
      "10% low margin money requirement under govt scheme": "সরকারি প্রকল্পের আওতায় মাত্র ১০% কম মার্জিন অর্থ প্রয়োজন",
      "Immediate daily cash flow turnaround": "তাৎক্ষণিক দৈনিক নগদ প্রবাহ ও আবর্তন",
      "Proximity to raw village inputs": "গ্রামের স্থানীয় কাঁচামালের সহজ সান্নিধ্য"
    },
    swotWeaknesses: {
      "Cold storage / power backup vulnerability": "কোল্ড স্টোরেজ / পাওয়ার ব্যাকআপের দুর্বলতা",
      "Working capital tied in seasonal inventory": "মৌসুমি মজুদে কার্যকরী মূলধন আটকে যাওয়া"
    },
    swotOpportunities: {
      "Government interest subvention and back-ended capital subsidy": "সরকারি সুদে ছাড় এবং মূলধনী ভর্তুকির সুযোগ",
      "Expansion into neighboring weekly haats": "পার্শ্ববর্তী সাপ্তাহিক হাট এবং গ্রামীণ বাজারে সম্প্রসারণ"
    },
    swotThreats: {
      "Pre-monsoon raw material inflation": "বর্ষার আগে কাঁচামালের দাম বৃদ্ধি",
      "Customer credit ledger (udhaar) default risks": "গ্রাহকদের বাকির খাতায় অর্থ আটকে যাওয়ার ঝুঁকি"
    },
    threatsSummary: {
      "default": "বর্ষাকালের মন্দা এবং ক্রেতাদের বিলম্বিত পেমেন্ট সামলাতে সক্রিয় নগদ মজুদ রাখা প্রয়োজন।"
    },
    risks: {
      "Power cuts requiring generator backup": "ঘন ঘন লোডশেডিং যার জন্য জেনারেটর ব্যাকআপ দরকার",
      "Seasonal demand swings during agricultural sowing months": "কৃষি বপন মৌসুমে চাহিদার ওঠানামা",
      "Supply chain transport delays": "সরবরাহ ব্যবস্থা ও পরিবহনে বিলম্ব"
    },
    competitorSummary: {
      "default": "এই ব্লকে ৩-৪টি অসংগঠিত ব্যবসার সাথে মাঝারি প্রতিযোগিতা; স্বাস্থ্যকর মান বজায় রেখে বড় সুযোগ।"
    },
    pricingSummary: {
      "default": "স্থানীয় ক্রয়ক্ষমতার সাথে সামঞ্জস্য রেখে টেকসই লাভ নিশ্চিত করার জন্য প্রস্তাবিত মূল্য।"
    },
    priceRange: {
      "default": "প্রতিযোগিতামূলক স্থানীয় মূল্য",
      "Competitive Local Range": "প্রতিযোগিতামূলক স্থানীয় মূল্যের সীমা"
    },
    benchmarkNote: {
      "default": "কৃষি ও আধা-শহুরে পঞ্চায়েতের ক্রয় অভ্যাসের ওপর ভিত্তি করে নির্ধারিত।"
    }
  },
  ta: {
    opportunitySummary: {
      "default": "மதிப்புக் கூட்டப்பட்ட பதப்படுத்துதல் மற்றும் சுகாதாரமான உள்ளூர் பேக்கேஜிங் ஆகியவை தளர்வான மூலப்பொருள் வர்த்தகத்தை விட 30% அதிக லாப வரம்பை அளிக்கின்றன."
    },
    niches: {
      "Locally branded packaged items": "உள்ளூர் பிராண்டட் பேக் செய்யப்பட்ட பொருட்கள்",
      "Morning fresh subscription delivery": "காலை நேர புதிய சந்தா வீட்டு விநியோகம்",
      "Direct supply to local schools & dhabas": "உள்ளூர் பள்ளிகள் மற்றும் உணவகங்களுக்கு நேரடி விநியோகம்"
    },
    swotStrengths: {
      "10% low margin money requirement under govt scheme": "அரசுத் திட்டத்தின் கீழ் 10% குறைந்த விளிம்புத் தொகை தேவை",
      "Immediate daily cash flow turnaround": "உடனடி தினசரி பணப்புழக்கம் மற்றும் தொடர் விற்பனை",
      "Proximity to raw village inputs": "கிராமப்புற மூலப்பொருட்களின் எளிதான அருகாமை"
    },
    swotWeaknesses: {
      "Cold storage / power backup vulnerability": "குளிர்பதனக் கிடங்கு / மின்சார ஆதரவின் தேவை",
      "Working capital tied in seasonal inventory": "பருவகால இருப்பில் சிக்கியுள்ள நடைமுறை மூலதனம்"
    },
    swotOpportunities: {
      "Government interest subvention and back-ended capital subsidy": "அரசு வட்டி மானியம் மற்றும் மூலதன மானிய வாய்ப்பு",
      "Expansion into neighboring weekly haats": "அருகிலுள்ள வாராந்திர சந்தைகளில் விரிவாக்கம்"
    },
    swotThreats: {
      "Pre-monsoon raw material inflation": "பருவமழைக்கு முந்தைய மூலப்பொருள் விலை உயர்வு",
      "Customer credit ledger (udhaar) default risks": "வாடிக்கையாளர் கடன் கணக்கு (உதார்) நிலுவை அபாயம்"
    },
    threatsSummary: {
      "default": "பருவமழை மந்தநிலை மற்றும் தாமதமான கொடுப்பனவுகளை சமாளிக்க பண இருப்பு தேவை."
    },
    risks: {
      "Power cuts requiring generator backup": "மின்வெட்டு காரணமாக ஜெனரேட்டர் தேவை",
      "Seasonal demand swings during agricultural sowing months": "விவசாய விதைப்பு மாதங்களில் பருவகால தேவை மாற்றங்கள்",
      "Supply chain transport delays": "விநியோகச் சங்கிலி போக்குவரத்து தாமதங்கள்"
    },
    competitorSummary: {
      "default": "இந்த வட்டத்தில் 3-4 ஒழுங்கமைக்கப்படாத வணிகங்களுடன் மிதமான போட்டி; தரம் மூலம் வெற்றி பெற வாய்ப்பு."
    },
    pricingSummary: {
      "default": "உள்ளூர் வாங்கும் திறனைக் கருத்தில் கொண்டு நிலையான லாபத்தை வழங்கும் விலை பரிந்துரை."
    },
    priceRange: {
      "default": "போட்டித்தன்மை வாய்ந்த உள்ளூர் விலை",
      "Competitive Local Range": "போட்டித்தன்மை வாய்ந்த உள்ளூர் விலை வரம்பு"
    },
    benchmarkNote: {
      "default": "விவசாய மற்றும் பகுதி கிராம பஞ்சாயத்துகளின் வாங்கும் பழக்கத்திற்கு ஏற்ப கணக்கிடப்பட்டது."
    }
  },
  te: {
    opportunitySummary: {
      "default": "విలువ ఆధారిత ప్రాసెసింగ్ మరియు పరిశుభ్రమైన స్థానిక ప్యాకేజింగ్ ముడి వస్తువుల వ్యాపారం కంటే 30% ఎక్కువ మార్జిన్‌ను అందిస్తాయి."
    },
    niches: {
      "Locally branded packaged items": "స్థానిక బ్రాండెడ్ ప్యాక్ చేసిన వస్తువులు",
      "Morning fresh subscription delivery": "ఉదయం తాజా సబ్‌స్క్రిప్షన్ డెలివరీ",
      "Direct supply to local schools & dhabas": "స్థానిక పాఠశాలలు మరియు ధాబాలకు ప్రత్యక్ష సరఫరా"
    },
    swotStrengths: {
      "10% low margin money requirement under govt scheme": "ప్రభుత్వ పథకం కింద 10% తక్కువ మార్జిన్ మనీ అవసరం",
      "Immediate daily cash flow turnaround": "తక్షణ రోజువారీ నగదు ప్రవాహం",
      "Proximity to raw village inputs": "గ్రామీణ ముడి సరుకుల లభ్యత"
    },
    swotWeaknesses: {
      "Cold storage / power backup vulnerability": "కోల్డ్ స్టోరేజ్ / పవర్ బ్యాకప్ ఆధారపడటం",
      "Working capital tied in seasonal inventory": "సీజనల్ ఇన్వెంటరీలో వర్కింగ్ క్యాపిటల్ చిక్కుకుపోవడం"
    },
    swotOpportunities: {
      "Government interest subvention and back-ended capital subsidy": "ప్రభుత్వ వడ్డీ రాయితీ మరియు మూలధన సబ్సిడీ ప్రయోజనం",
      "Expansion into neighboring weekly haats": "పొరుగున ఉన్న వారపు సంతలలో విస్తరణ"
    },
    swotThreats: {
      "Pre-monsoon raw material inflation": "వర్షాకాలానికి ముందు ముడి సరుకుల ధరల పెరుగుదల",
      "Customer credit ledger (udhaar) default risks": "కస్టమర్ల అప్పుల ఖాతా (ఉధార్) డిఫాల్ట్ ప్రమాదం"
    },
    threatsSummary: {
      "default": "సీజనల్ వర్షాకాల మందగమనం మరియు చెల్లింపుల ఆలస్యాన్ని తట్టుకోవడానికి నగదు నిల్వలు అవసరం."
    },
    risks: {
      "Power cuts requiring generator backup": "జనరేటర్ బ్యాకప్ అవసరమయ్యే విద్యుత్ కోతలు",
      "Seasonal demand swings during agricultural sowing months": "వ్యవసాయ విత్తే నెలల్లో కాలానుగుణ డిమాండ్ హెచ్చుతగ్గులు",
      "Supply chain transport delays": "సరఫరా గొలుసు రవాణా ఆలస్యాలు"
    },
    competitorSummary: {
      "default": "ఈ బ్లాక్‌లో 3-4 అసంఘటిత వ్యాపారులతో మధ్యస్థ పోటీ; పరిశుభ్రమైన ఉత్పత్తులతో రాణించే గొప్ప అవకాశం."
    },
    pricingSummary: {
      "default": "స్థానిక కొనుగోలు శక్తికి అనుగుణంగా స్థిరమైన లాభాన్ని అందించే సిఫార్సు చేయబడిన ధర."
    },
    priceRange: {
      "default": "పోటీతత్వ స్థానిక ధరల శ్రేణి"
    },
    benchmarkNote: {
      "default": "వ్యవసాయ మరియు పాక్షిక పట్టణ పంచాయతీల కొనుగోలు అలవాట్లకు అనుగుణంగా రూపొందించబడింది."
    }
  },
  gu: {
    opportunitySummary: {
      "default": "મૂલ્યવર્ધિત પ્રોસેસિંગ અને સ્વચ્છ સ્થાનિક પેકેજિંગ છૂટક કાચા માલના વેપાર કરતાં 30% વધુ માર્જિન આપે છે."
    },
    niches: {
      "Locally branded packaged items": "સ્થાનિક બ્રાન્ડેડ પેકેજ્ડ વસ્તુઓ",
      "Morning fresh subscription delivery": "સવારની તાજી સબ્સ્ક્રિપ્શન હોમ ડિલિવરી",
      "Direct supply to local schools & dhabas": "સ્થાનિક શાળાઓ અને ઢાબાઓને સીધો પુરવઠો"
    },
    swotStrengths: {
      "10% low margin money requirement under govt scheme": "સરકારી યોજના હેઠળ માત્ર 10% ઓછી માર્જિન મનીની જરૂરિયાત",
      "Immediate daily cash flow turnaround": "તાત્કાલિક દૈનિક રોકડ પ્રવાહ",
      "Proximity to raw village inputs": "ગામડાના કાચા માલની નિકટતા"
    },
    swotWeaknesses: {
      "Cold storage / power backup vulnerability": "કોલ્ડ સ્ટોરેજ / વીજળી બેકઅપની નબળાઈ",
      "Working capital tied in seasonal inventory": "મોસમી માલસામાનમાં કાર્યકારી મૂડી રોકાઈ જવી"
    },
    swotOpportunities: {
      "Government interest subvention and back-ended capital subsidy": "સરકારી વ્યાજ સહાય અને મૂડી સબસિડીનો લાભ",
      "Expansion into neighboring weekly haats": "આસપાસની સાપ્તાહિક હાટોમાં વિસ્તરણ"
    },
    swotThreats: {
      "Pre-monsoon raw material inflation": "ચોમાસા પહેલા કાચા માલના ભાવમાં વધારો",
      "Customer credit ledger (udhaar) default risks": "ગ્રાહકોની ઉધારી ખાતામાં નાણાં ફસાઈ જવાનું જોખમ"
    },
    threatsSummary: {
      "default": "ચોમાસાની મંદી અને ચુકવણીમાં વિલંબ સામે રક્ષણ માટે રોકડ અનામત રાખવી જરૂરી છે."
    },
    risks: {
      "Power cuts requiring generator backup": "વીજ કાપ જેના માટે જનરેટર બેકઅપ જરૂરી છે",
      "Seasonal demand swings during agricultural sowing months": "ખેતીની વાવણીના મહિનાઓમાં મોસમી માંગમાં વધઘટ",
      "Supply chain transport delays": "સપ્લાય ચેઈન ટ્રાન્સપોર્ટમાં વિલંબ"
    },
    competitorSummary: {
      "default": "આ બ્લોકમાં 3-4 અસંગઠિત વિક્રેતાઓ સાથે મધ્યમ સ્પર્ધા; ગુણવત્તા અને સ્વચ્છતા સાથે આગળ વધવાની ઉત્તમ તક."
    },
    pricingSummary: {
      "default": "સ્થાનિક ખરીદ શક્તિને ધ્યાનમાં રાખીને ટકાઉ નફો આપતી ભલામણ કરેલ કિંમત."
    },
    priceRange: {
      "default": "સ્પર્ધાત્મક સ્થાનિક ભાવ"
    },
    benchmarkNote: {
      "default": "કૃષિ અને અર્ધ-શહેરી પંચાયતોમાં લોકોની ખરીદીની ટેવ મુજબ નિર્ધારિત."
    }
  },
  kn: {
    opportunitySummary: {
      "default": "ಮೌಲ್ಯವರ್ಧಿತ ಸಂಸ್ಕರಣೆ ಮತ್ತು ನೈರ್ಮಲ್ಯದ ಸ್ಥಳೀಯ ಪ್ಯಾಕೇಜಿಂಗ್ ಸಡಿಲವಾದ ಕಚ್ಚಾ ಸಾಮಗ್ರಿಗಳ ವ್ಯಾಪಾರಕ್ಕಿಂತ 30% ಹೆಚ್ಚಿನ ಲಾಭವನ್ನು ನೀಡುತ್ತದೆ."
    },
    niches: {
      "Locally branded packaged items": "ಸ್ಥಳೀಯ ಬ್ರಾಂಡೆಡ್ ಪ್ಯಾಕೇಜ್ ಮಾಡಿದ ವಸ್ತುಗಳು",
      "Morning fresh subscription delivery": "ಮುಂಜಾನೆಯ ತಾಜಾ ಚಂದಾದಾರಿಕೆ ಮನೆಬಾಗಿಲಿಗೆ ತಲುಪಿಸುವಿಕೆ",
      "Direct supply to local schools & dhabas": "ಸ್ಥಳೀಯ ಶಾಲೆಗಳು ಮತ್ತು ಡಾಬಾಗಳಿಗೆ ನೇರ ಪೂರೈಕೆ"
    },
    swotStrengths: {
      "10% low margin money requirement under govt scheme": "ಸರ್ಕಾರಿ ಯೋಜನೆಯಡಿ ಕೇವಲ 10% ಕಡಿಮೆ ಮಾರ್ಜಿನ್ ಮೊತ್ತದ ಅವಶ್ಯಕತೆ",
      "Immediate daily cash flow turnaround": "ತಕ್ಷಣದ ದೈನಂದಿನ ನಗದು ಹರಿವು",
      "Proximity to raw village inputs": "ಗ್ರಾಮೀಣ ಕಚ್ಚಾ ಸಾಮಗ್ರಿಗಳ ಸಾಮೀಪ್ಯ"
    },
    swotWeaknesses: {
      "Cold storage / power backup vulnerability": "ಕೋಲ್ಡ್ ಸ್ಟೋರೇಜ್ / ವಿದ್ಯುತ್ ಬ್ಯಾಕಪ್ ಅವಲಂಬನೆ",
      "Working capital tied in seasonal inventory": "ಋತುಮಾನದ ದಾಸ್ತಾನಿನಲ್ಲಿ ದುಡಿಯುವ ಬಂಡವಾಳ ಸಿಲುಕುವುದು"
    },
    swotOpportunities: {
      "Government interest subvention and back-ended capital subsidy": "ಸರ್ಕಾರಿ ಬಡ್ಡಿ ರಿಯಾಯಿತಿ ಮತ್ತು ಬಂಡವಾಳ ಸಬ್ಸಿಡಿ ಅವಕಾಶ",
      "Expansion into neighboring weekly haats": "ನೆರೆಯ ಸಾಪ್ತಾಹಿಕ ಸಂತೆಗಳಿಗೆ ವಿಸ್ತರಣೆ"
    },
    swotThreats: {
      "Pre-monsoon raw material inflation": "ಮುಂಗಾರಿಗೆ ಮುನ್ನ ಕಚ್ಚಾ ಸಾಮಗ್ರಿಗಳ ಬೆಲೆ ಏರಿಕೆ",
      "Customer credit ledger (udhaar) default risks": "ಗ್ರಾಹಕರ ಸಾಲದ ಖಾತೆಯಲ್ಲಿ (ಉದ್ದರಿ) ಬಾಕಿ ಉಳಿಯುವ ಅಪಾಯ"
    },
    threatsSummary: {
      "default": "ಮುಂಗಾರು ಮಂದಗತಿ ಮತ್ತು ಪಾವತಿ ವಿಳಂಬವನ್ನು ಎದುರಿಸಲು ನಗದು ಮೀಸಲು ಅಗತ್ಯವಿದೆ."
    },
    risks: {
      "Power cuts requiring generator backup": "ಜನರೇಟರ್ ಬ್ಯಾಕಪ್ ಅಗತ್ಯವಿರುವ ವಿದ್ಯುತ್ ಕಡಿತ",
      "Seasonal demand swings during agricultural sowing months": "ಕೃಷಿ ಬಿತ್ತನೆ ತಿಂಗಳುಗಳಲ್ಲಿ ಕಾಲೋಚಿತ ಬೇಡಿಕೆಯ ಏರಿಳಿತ",
      "Supply chain transport delays": "ಸರಬರಾಜು ಸರಪಳಿ ಸಾರಿಗೆ ವಿಳಂಬ"
    },
    competitorSummary: {
      "default": "ಈ ಬ್ಲಾಕ್‌ನಲ್ಲಿ 3-4 ಅಸಂಘಟಿತ ವ್ಯಾಪಾರಿಗಳೊಂದಿಗೆ ಮಧ್ಯಮ ಸ್ಪರ್ಧೆ; ಗುಣಮಟ್ಟದ ಮೂಲಕ ಮುನ್ನಡೆಯಲು ಉತ್ತಮ ಅವಕಾಶ."
    },
    pricingSummary: {
      "default": "ಸ್ಥಳೀಯ ಖರೀದಿ ಸಾಮರ್ಥ್ಯಕ್ಕೆ ತಕ್ಕಂತೆ ಸುಸ್ಥಿರ ಲಾಭವನ್ನು ನೀಡುವ ಬೆಲೆ ಶಿಫಾರಸು."
    },
    priceRange: {
      "default": "ಸ್ಪರ್ಧಾತ್ಮಕ ಸ್ಥಳೀಯ ಬೆಲೆ"
    },
    benchmarkNote: {
      "default": "ಕೃಷಿ ಮತ್ತು ಅರೆ-ನಗರ ಪಂಚಾಯತ್‌ಗಳ ಖರೀದಿ ಅಭ್ಯಾಸಗಳಿಗೆ ಅನುಗುಣವಾಗಿ ಹೊಂದಿಸಲಾಗಿದೆ."
    }
  },
  ml: {
    opportunitySummary: {
      "default": "മൂല്യവർദ്ധിത സംസ്കരണവും ശുചിത്വമുള്ള പ്രാദേശിക പാക്കേജിംഗും അസംസ്കൃത സാധന വ്യാപാരത്തേക്കാൾ 30% ഉയർന്ന ലാഭം നൽകുന്നു."
    },
    niches: {
      "Locally branded packaged items": "പ്രാദേശിക ബ്രാൻഡഡ് പാക്കേജ് ചെയ്ത ഉൽപ്പന്നങ്ങൾ",
      "Morning fresh subscription delivery": "പ്രഭാതത്തിലെ പുതിയ സബ്‌സ്‌ക്രിപ്ഷൻ ഹോം ഡെലിവറി",
      "Direct supply to local schools & dhabas": "പ്രാദേശിക സ്കൂളുകൾക്കും ദാബകൾക്കും നേരിട്ടുള്ള വിതരണം"
    },
    swotStrengths: {
      "10% low margin money requirement under govt scheme": "സർക്കാർ പദ്ധതി പ്രകാരം 10% കുറഞ്ഞ മാർജിൻ തുക മാത്രം മതിയാകും",
      "Immediate daily cash flow turnaround": "തൽക്ഷണ ദൈനംദിന പണമിടപാട്",
      "Proximity to raw village inputs": "ഗ്രാമീയ അസംസ്കൃത വസ്തുക്കളുടെ ലഭ്യത"
    },
    swotWeaknesses: {
      "Cold storage / power backup vulnerability": "കോൾഡ് സ്റ്റോറേജ് / പവർ ബാക്കപ്പ് ലഭ്യതക്കുറവ്",
      "Working capital tied in seasonal inventory": "സീസണൽ സാധനങ്ങളിൽ പ്രവർത്തന മൂലധനം കുടുങ്ങിക്കിടക്കുന്നത്"
    },
    swotOpportunities: {
      "Government interest subvention and back-ended capital subsidy": "സർക്കാർ പലിശ ഇളവും മൂലധന സബ്‌സിഡിയും",
      "Expansion into neighboring weekly haats": "സമീപത്തെ ആഴ്ചച്ചന്തകളിലേക്കുള്ള വിപുലീകരണം"
    },
    swotThreats: {
      "Pre-monsoon raw material inflation": "മൺസൂണിന് മുമ്പുള്ള അസംസ്കൃത വസ്തുക്കളുടെ വിലക്കയറ്റം",
      "Customer credit ledger (udhaar) default risks": "ഉപഭോക്താക്കളുടെ കടം (ഉധാർ) തിരിച്ചടയ്ക്കാത്ത നഷ്ടസാധ്യത"
    },
    threatsSummary: {
      "default": "സീസണൽ മാന്ദ്യവും പേയ്‌മെന്റ് കാലതാമസവും നേരിടാൻ കരുതൽ ധനം ആവശ്യമാണ്."
    },
    risks: {
      "Power cuts requiring generator backup": "ജനറേറ്റർ ബാക്കപ്പ് ആവശ്യമുള്ള വൈദ്യുതി തടസ്സം",
      "Seasonal demand swings during agricultural sowing months": "കാർഷിക വിതയ്ക്കൽ മാസങ്ങളിലെ സീസണൽ ഡിമാൻഡ് മാറ്റങ്ങൾ",
      "Supply chain transport delays": "സപ്ലൈ ചെയിൻ ഗതാഗത കാലതാമസം"
    },
    competitorSummary: {
      "default": "ഈ ബ്ലോക്കിൽ 3-4 അസംഘടിത കച്ചവടക്കാരുമായി മിതമായ മത്സരം; ഗുണനിലവാരത്തിലൂടെ വിജയിക്കാനുള്ള സാധ്യത."
    },
    pricingSummary: {
      "default": "പ്രാദേശിക വാങ്ങൽ ശേഷിക്ക് അനുസൃതമായി സുസ്ഥിര ലാഭം നൽകുന്ന വില."
    },
    priceRange: {
      "default": "മത്സരാധിഷ്ഠിത പ്രാദേശിക നിരക്ക്"
    },
    benchmarkNote: {
      "default": "കാർഷിക, അർദ്ധ-നഗര പ്രദേശങ്ങളിലെ ഉപഭോഗ രീതികളെ അടിസ്ഥാനമാക്കി നിശ്ചയിച്ചത്."
    }
  },
  pa: {
    opportunitySummary: {
      "default": "ਮੁੱਲ-ਵਰਧਿਤ ਪ੍ਰੋਸੈਸਿੰਗ ਅਤੇ ਸਾਫ਼-ਸੁਥਰੀ ਸਥਾਨਕ ਪੈਕੇਜਿੰਗ ਕੱਚੇ ਮਾਲ ਦੇ ਖੁੱਲ੍ਹੇ ਵਪਾਰ ਨਾਲੋਂ 30% ਵੱਧ ਮੁਨਾਫਾ ਪ੍ਰਦਾਨ ਕਰਦੀ ਹੈ।"
    },
    niches: {
      "Locally branded packaged items": "ਸਥਾਨਕ ਬ੍ਰਾਂਡੇਡ ਪੈਕ ਕੀਤੀਆਂ ਵਸਤੂਆਂ",
      "Morning fresh subscription delivery": "ਸਵੇਰ ਦੀ ਤਾਜ਼ਾ ਸਬਸਕ੍ਰਿਪਸ਼ਨ ਹੋਮ ਡਿਲੀਵਰੀ",
      "Direct supply to local schools & dhabas": "ਸਥਾਨਕ ਸਕੂਲਾਂ ਅਤੇ ਢਾਬਿਆਂ ਨੂੰ ਸਿੱਧੀ ਸਪਲਾਈ"
    },
    swotStrengths: {
      "10% low margin money requirement under govt scheme": "ਸਰਕਾਰੀ ਸਕੀਮ ਅਧੀਨ ਸਿਰਫ਼ 10% ਘੱਟ ਮਾਰਜਿਨ ਮਨੀ ਦੀ ਲੋੜ",
      "Immediate daily cash flow turnaround": "ਤੁਰੰਤ ਰੋਜ਼ਾਨਾ ਨਕਦੀ ਦਾ ਪ੍ਰਵਾਹ",
      "Proximity to raw village inputs": "ਪਿੰਡ ਦੇ ਕੱਚੇ ਮਾਲ ਦੀ ਨੇੜਤਾ"
    },
    swotWeaknesses: {
      "Cold storage / power backup vulnerability": "ਕੋਲਡ ਸਟੋਰੇਜ / ਬਿਜਲੀ ਬੈਕਅੱਪ ਦੀ ਕਮਜ਼ੋਰੀ",
      "Working capital tied in seasonal inventory": "ਮੌਸਮੀ ਸਟਾਕ ਵਿੱਚ ਵਰਕਿੰਗ ਕੈਪੀਟਲ ਦਾ ਫਸਣਾ"
    },
    swotOpportunities: {
      "Government interest subvention and back-ended capital subsidy": "ਸਰਕਾਰੀ ਵਿਆਜ ਛੋਟ ਅਤੇ ਪੂੰਜੀ ਸਬਸਿਡੀ ਦਾ ਲਾਭ",
      "Expansion into neighboring weekly haats": "ਗੁਆਂਢੀ ਹਫ਼ਤਾਵਾਰੀ ਹਾਟਾਂ ਵਿੱਚ ਪਸਾਰ"
    },
    swotThreats: {
      "Pre-monsoon raw material inflation": "ਮਾਨਸੂਨ ਤੋਂ ਪਹਿਲਾਂ ਕੱਚੇ ਮਾਲ ਦੀਆਂ ਕੀਮਤਾਂ ਵਿੱਚ ਵਾਧਾ",
      "Customer credit ledger (udhaar) default risks": "ਗਾਹਕਾਂ ਦੇ ਉਧਾਰ ਖਾਤੇ ਵਿੱਚ ਪੈਸੇ ਫਸਣ ਦਾ ਖ਼ਤਰਾ"
    },
    threatsSummary: {
      "default": "ਮਾਨਸੂਨ ਦੀ ਮੰਦੀ ਅਤੇ ਅਦਾਇਗੀਆਂ ਵਿੱਚ ਦੇਰੀ ਨਾਲ ਨਜਿੱਠਣ ਲਈ ਨਕਦ ਰਿਜ਼ਰਵ ਜ਼ਰੂਰੀ ਹੈ।"
    },
    risks: {
      "Power cuts requiring generator backup": "ਬਿਜਲੀ ਕੱਟ ਜਿਸ ਲਈ ਜਨਰੇਟਰ ਬੈਕਅੱਪ ਦੀ ਲੋੜ ਹੋਵੇਗੀ",
      "Seasonal demand swings during agricultural sowing months": "ਖੇਤੀ ਬਿਜਾਈ ਦੇ ਮਹੀਨਿਆਂ ਦੌਰਾਨ ਮੌਸਮੀ ਮੰਗ ਵਿੱਚ ਉਤਰਾਅ-ਚੜ੍ਹਾਅ",
      "Supply chain transport delays": "ਸਪਲਾਈ ਚੇਨ ਟਰਾਂਸਪੋਰਟ ਵਿੱਚ ਦੇਰੀ"
    },
    competitorSummary: {
      "default": "ਇਸ ਬਲਾਕ ਵਿੱਚ 3-4 ਗੈਰ-ਜਥੇਬੰਦਕ ਵਿਕਰੇਤਾਵਾਂ ਨਾਲ ਦਰਮਿਆਨਾ ਮੁਕਾਬਲਾ; ਸਾਫ਼-ਸਫ਼ਾਈ ਨਾਲ ਬਾਜ਼ਾਰ ਜਿੱਤਣ ਦਾ ਵਧੀਆ ਮੌਕਾ।"
    },
    pricingSummary: {
      "default": "ਸਥਾਨਕ ਖਰੀਦ ਸ਼ਕਤੀ ਦਾ ਧਿਆਨ ਰੱਖਦੇ ਹੋਏ ਵਧੀਆ ਮੁਨਾਫਾ ਦੇਣ ਵਾਲੀਆਂ ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀਆਂ ਕੀਮਤਾਂ।"
    },
    priceRange: {
      "default": "ਮੁਕਾਬਲੇਬਾਜ਼ ਸਥਾਨਕ ਕੀਮਤ"
    },
    benchmarkNote: {
      "default": "ਖੇਤੀਬਾੜੀ ਅਤੇ ਅਰਧ-ਸ਼ਹਿਰੀ ਪੰਚਾਇਤਾਂ ਵਿੱਚ ਲੋਕਾਂ ਦੀਆਂ ਖਰੀਦ ਆਦਤਾਂ ਅਨੁਸਾਰ ਤਿਆਰ ਕੀਤਾ ਗਿਆ।"
    }
  },
  or: {
    opportunitySummary: {
      "default": "ମୂଲ୍ୟଯୁକ୍ତ ପ୍ରକ୍ରିୟାକରଣ ଏବଂ ସ୍ୱଚ୍ଛ ସ୍ଥାନୀୟ ପ୍ୟାକେଜିଂ ଖୋଲା କଞ୍ଚାମାଲ ବ୍ୟବସାୟ ତୁଳନାରେ 30% ଅଧିକ ଲାଭ ପ୍ରଦାନ କରେ।"
    },
    niches: {
      "Locally branded packaged items": "ସ୍ଥାନୀୟ ବ୍ରାଣ୍ଡେଡ୍ ପ୍ୟାକେଜ୍ ହୋଇଥିବା ସାମଗ୍ରୀ",
      "Morning fresh subscription delivery": "ସକାଳର ତାଜା ସଦସ୍ୟତା ଘରେ ପହଞ୍ଚାଇବା ସେବା",
      "Direct supply to local schools & dhabas": "ସ୍ଥାନୀୟ ବିଦ୍ୟାଳୟ ଏବଂ ଢାବାକୁ ସିଧାସଳଖ ଯୋଗାଣ"
    },
    swotStrengths: {
      "10% low margin money requirement under govt scheme": "ସରକାରୀ ଯୋଜନା ଅଧୀନରେ ମାତ୍ର 10% କମ୍ ମାର୍ଜିନ୍ ଟଙ୍କା ଆବଶ୍ୟକ",
      "Immediate daily cash flow turnaround": "ତୁରନ୍ତ ଦୈନିକ ନଗଦ କାରବାର",
      "Proximity to raw village inputs": "ଗ୍ରାମ୍ୟ କଞ୍ଚାମାଲର ନିକଟତରତା"
    },
    swotWeaknesses: {
      "Cold storage / power backup vulnerability": "କୋଲ୍ଡ ଷ୍ଟୋରେଜ୍ / ବିଦ୍ୟୁତ୍ ବ୍ୟାକଅପ୍ ଅଭାବ",
      "Working capital tied in seasonal inventory": "ଋତୁକାଳୀନ ମହଜୁଦରେ ଚଳନ୍ତି ପୁଞ୍ଜି ଫସିରହିବା"
    },
    swotOpportunities: {
      "Government interest subvention and back-ended capital subsidy": "ସରକାରୀ ସୁଧ ରିହାତି ଏବଂ ପୁଞ୍ଜି ସବସିଡି ସୁବିଧା",
      "Expansion into neighboring weekly haats": "ପଡ଼ୋଶୀ ସାପ୍ତାହିକ ହାଟରେ ବ୍ୟବସାୟ ସମ୍ପ୍ରସାରଣ"
    },
    swotThreats: {
      "Pre-monsoon raw material inflation": "ମୌସୁମୀ ପୂର୍ବରୁ କଞ୍ଚାମାଲ ଦର ବୃଦ୍ଧି",
      "Customer credit ledger (udhaar) default risks": "ଗ୍ରାହକଙ୍କ ଉଧାର ଖାତାରେ ଟଙ୍କା ଫସିବାର ବିପଦ"
    },
    threatsSummary: {
      "default": "ମୌସୁମୀ ମାନ୍ଦାବସ୍ଥା ଏବଂ ବିଳମ୍ବିତ ପାଉଣା ପରିଚାଳନା ପାଇଁ ନଗଦ ପାଣ୍ଠି ଆବଶ୍ୟକ।"
    },
    risks: {
      "Power cuts requiring generator backup": "ବିଦ୍ୟୁତ୍ କାଟ୍ ଯୋଗୁଁ ଜେନେରେଟର ବ୍ୟାକଅପ୍ ଆବଶ୍ୟକ",
      "Seasonal demand swings during agricultural sowing months": "ଚାଷ ବୁଣାବୁଣି ସମୟରେ ଚାହିଦାରେ ଉତ୍ଥାନ-ପତନ",
      "Supply chain transport delays": "ଯୋଗାଣ ଶୃଙ୍ଖଳା ପରିବହନ ବିଳମ୍ବ"
    },
    competitorSummary: {
      "default": "ଏହି ବ୍ଲକରେ 3-4 ଜଣ ଅସଂଗଠିତ ବ୍ୟବସାୟୀଙ୍କ ସହ ମଧ୍ୟମ ପ୍ରତିଯୋଗିତା; ସ୍ୱଚ୍ଛତା ଓ ଗୁଣବତ୍ତା ବଜାୟ ରଖିଲେ ଉଚ୍ଚ ସଫଳତା।"
    },
    pricingSummary: {
      "default": "ସ୍ଥାନୀୟ କ୍ରୟ କ୍ଷମତାକୁ ଧ୍ୟାନରେ ରଖି ନିରନ୍ତର ଲାଭ ପ୍ରଦାନ କରୁଥିବା ମୂଲ୍ୟ ଧାର୍ଯ୍ୟ।"
    },
    priceRange: {
      "default": "ପ୍ରତିଯୋଗିତାମୂଳକ ସ୍ଥାନୀୟ ଦର"
    },
    benchmarkNote: {
      "default": "କୃଷି ଏବଂ ଅର୍ଦ୍ଧ-ସହରାଞ୍ଚଳ ପଞ୍ଚାୟତର କ୍ରୟ ଅଭ୍ୟାସ ଅନୁଯାୟୀ ପ୍ରସ୍ତୁତ।"
    }
  },
  as: {
    opportunitySummary: {
      "default": "মূল্য সংযোজিত প্ৰক্ৰিয়াকৰণ আৰু পৰিষ্কাৰ স্থানীয় পেকেজিঙে কেঁচা সামগ্ৰীৰ ব্যৱসায়তকৈ ৩০% অধিক লাভ প্ৰদান কৰে।"
    },
    niches: {
      "Locally branded packaged items": "স্থানীয় ব্ৰেণ্ডেড পেকেটজাত সামগ্ৰী",
      "Morning fresh subscription delivery": "ৰাতিপুৱাৰ সতেজ গ্ৰাহক ঘৰুৱা যোগান",
      "Direct supply to local schools & dhabas": "স্থানীয় বিদ্যালয় আৰু ধাবালৈ পোনপটীয়া যোগান"
    },
    swotStrengths: {
      "10% low margin money requirement under govt scheme": "চৰকাৰী আঁচনিৰ অধীনত মাত্ৰ ১০% কম মাৰ্জিন ধনৰ প্ৰয়োজন",
      "Immediate daily cash flow turnaround": "তাৎক্ষণিক দৈনিক নগদ ধনৰ লেনদেন",
      "Proximity to raw village inputs": "গাঁৱৰ স্থানীয় কেঁচা সামগ্ৰীৰ সহজলভ্যতা"
    },
    swotWeaknesses: {
      "Cold storage / power backup vulnerability": "কোল্ড ষ্টোৰেজ / বিদ্যুৎ ব্যাকআপৰ প্ৰয়োজনীয়তা",
      "Working capital tied in seasonal inventory": "ঋতুকালীন মজুতত কাৰ্য্যকৰী মূলধন আবদ্ধ হোৱা"
    },
    swotOpportunities: {
      "Government interest subvention and back-ended capital subsidy": "চৰকাৰী সুতৰ ৰেহাই আৰু মূলধনী ৰাজসাহায্যৰ সুবিধা",
      "Expansion into neighboring weekly haats": "ওচৰৰ সাপ্তাহিক হাটসমূহত ব্যৱসায় সম্প্ৰসাৰণ"
    },
    swotThreats: {
      "Pre-monsoon raw material inflation": "বাৰিষাৰ পূৰ্বে কেঁচা সামগ্ৰীৰ মূল্য বৃদ্ধি",
      "Customer credit ledger (udhaar) default risks": "গ্ৰাহকৰ বাকী খাতাৰ ধন অনাদায় হোৱাৰ সম্ভাৱনা"
    },
    threatsSummary: {
      "default": "বাৰিষাৰ মন্দাৱস্থা আৰু পলমকৈ হোৱা পৰিশোধৰ বাবে নগদ ধন মজুত ৰখা প্ৰয়োজন।"
    },
    risks: {
      "Power cuts requiring generator backup": "বিদ্যুৎ কৰ্তন যাৰ বাবে জেনেৰেটৰৰ প্ৰয়োজন",
      "Seasonal demand swings during agricultural sowing months": "কৃষি ৰোপণৰ মাহবোৰত চাহিদাৰ উঠা-নমা",
      "Supply chain transport delays": "যোগান শৃংখল পৰিবহনত পলম"
    },
    competitorSummary: {
      "default": "এই ব্লকত ৩-৪টা অসংগঠিত ব্যৱসায়ৰ সৈতে মধ্যমীয়া প্ৰতিযোগিতা; পৰিষ্কাৰ মান নিশ্চিত কৰিলে ডাঙৰ সুযোগ।"
    },
    pricingSummary: {
      "default": "স্থানীয় ক্ৰয় ক্ষমতাৰ সৈতে সামঞ্জস্য ৰাখি লাভজনক মূল্যৰ পৰামৰ্শ।"
    },
    priceRange: {
      "default": "প্ৰতিযোগিতামূলক স্থানীয় মূল্য"
    },
    benchmarkNote: {
      "default": "কৃষি আৰু অৰ্ধ-নগৰীয়া পঞ্চায়তৰ ক্ৰয় অভ্যাসৰ ওপৰত ভিত্তি কৰি নিৰ্ধাৰিত।"
    }
  },
  ur: {
    opportunitySummary: {
      "default": "ویلیو ایڈڈ پروسیسنگ اور صاف ستھری مقامی پیکیجنگ خام اشیاء کے کھلے کاروبار کے مقابلے میں 30 فیصد زیادہ منافع فراہم کرتی ہے۔"
    },
    niches: {
      "Locally branded packaged items": "مقامی برانڈڈ پیک شدہ اشیاء",
      "Morning fresh subscription delivery": "صبح کی تازہ سبسکرپشن ہوم ڈیلیوری",
      "Direct supply to local schools & dhabas": "مقامی اسکولوں اور ڈھابوں کو براہ راست فراہمی"
    },
    swotStrengths: {
      "10% low margin money requirement under govt scheme": "سرکاری اسکیم کے تحت صرف 10 فیصد کم مارجن رقم کی ضرورت",
      "Immediate daily cash flow turnaround": "فوری روزانہ کیش فلو اور فروخت",
      "Proximity to raw village inputs": "دیہاتی خام مال کی قریبی دستیابی"
    },
    swotWeaknesses: {
      "Cold storage / power backup vulnerability": "کولڈ اسٹوریج اور بجلی کے بیک اپ پر انحصار",
      "Working capital tied in seasonal inventory": "موسمی اسٹاک میں ورکنگ کیپیٹل کا پھنس جانا"
    },
    swotOpportunities: {
      "Government interest subvention and back-ended capital subsidy": "سرکاری سود کی رعایت اور کیپیٹل سبسڈی کا فائدہ",
      "Expansion into neighboring weekly haats": "قریبی ہفتہ وار ہاٹ اور دیہی منڈیوں میں توسیع"
    },
    swotThreats: {
      "Pre-monsoon raw material inflation": "مانسون سے پہلے خام مال کی قیمتوں میں اضافہ",
      "Customer credit ledger (udhaar) default risks": "گاہکوں کے ادھار کھاتے میں رقم ڈوبنے کا خطرہ"
    },
    threatsSummary: {
      "default": "موسمی مندی اور خریداروں کی تاخیر سے ادائیگیوں کے لیے ہنگامی کیش ریزرو ضروری ہے۔"
    },
    risks: {
      "Power cuts requiring generator backup": "بجلی کی بندش جس کے لیے جنریٹر بیک اپ درکار ہے",
      "Seasonal demand swings during agricultural sowing months": "زرعی بوائی کے مہینوں میں طلب میں موسمی اتار چڑھاؤ",
      "Supply chain transport delays": "سپلائی چین ٹرانسپورٹ میں ممکنہ تاخیر"
    },
    competitorSummary: {
      "default": "اس بلاک میں 3-4 غیر منظم دکانداروں کے ساتھ معتدل مقابلہ؛ معیاری صفائی اور پیکیجنگ کے ساتھ آگے بڑھنے کا بہترین موقع۔"
    },
    pricingSummary: {
      "default": "مقامی قوت خرید کا لحاظ رکھتے ہوئے پائیدار منافع فراہم کرنے والی مجوزہ قیمتیں۔"
    },
    priceRange: {
      "default": "مقابلہ جاتی مقامی قیمت"
    },
    benchmarkNote: {
      "default": "زرعی اور نیم شہری پنچایتوں میں خریداری کی عادات کے مطابق ترتیب دیا گیا۔"
    }
  }
};

// In-memory runtime translation cache
const runtimeTranslationCache = new Map<string, string>();

/**
 * Translates a single text string using dictionary mapping, pattern matching, or online API fallback
 */
export function translateText(
  text: string | undefined | null,
  targetLang: SupportedLanguage,
  fieldCategory?: keyof ReportTranslations
): string {
  if (!text) return "";
  if (targetLang === "en") return text;

  const cacheKey = `${targetLang}:${fieldCategory || "gen"}:${text}`;
  if (runtimeTranslationCache.has(cacheKey)) {
    return runtimeTranslationCache.get(cacheKey)!;
  }

  const langMap = TRANSLATION_MAPS[targetLang];
  if (!langMap) return text;

  // 1. Direct dictionary hit in specific category
  if (fieldCategory && langMap[fieldCategory]) {
    const catMap = langMap[fieldCategory] as Record<string, string>;
    if (catMap[text]) {
      runtimeTranslationCache.set(cacheKey, catMap[text]);
      return catMap[text];
    }
    // Partial substring match
    for (const [k, v] of Object.entries(catMap)) {
      if (k !== "default" && (text.includes(k) || k.includes(text))) {
        runtimeTranslationCache.set(cacheKey, v);
        return v;
      }
    }
    // Default fallback in that category if available
    if (catMap["default"]) {
      runtimeTranslationCache.set(cacheKey, catMap["default"]);
      return catMap["default"];
    }
  }

  // 2. Search all categories for this language
  for (const cat of Object.keys(langMap) as (keyof ReportTranslations)[]) {
    const catMap = langMap[cat] as Record<string, string> | undefined;
    if (catMap && catMap[text]) {
      runtimeTranslationCache.set(cacheKey, catMap[text]);
      return catMap[text];
    }
  }

  return text;
}

/**
 * Transforms an entire FeasibilityReportData object into the target language
 */
export function convertFeasibilityReport(
  report: FeasibilityReportData,
  targetLang: SupportedLanguage
): FeasibilityReportData {
  if (targetLang === "en") return report;

  const result: FeasibilityReportData = {
    ...report,
    language: targetLang,
    marketReach: report.marketReach ? {
      ...report.marketReach,
      summary: translateText(report.marketReach.summary, targetLang, "opportunitySummary") || report.marketReach.summary,
      consumerBase: translateText(report.marketReach.consumerBase, targetLang) || report.marketReach.consumerBase,
      channels: report.marketReach.channels?.map(ch => translateText(ch, targetLang) || ch) || []
    } : undefined,
    opportunityAnalysis: report.opportunityAnalysis ? {
      summary: translateText(report.opportunityAnalysis.summary, targetLang, "opportunitySummary") || report.opportunityAnalysis.summary,
      niches: report.opportunityAnalysis.niches?.map(n => translateText(n, targetLang, "niches") || n) || []
    } : undefined,
    swot: report.swot ? {
      strengths: report.swot.strengths?.map(s => translateText(s, targetLang, "swotStrengths") || s) || [],
      weaknesses: report.swot.weaknesses?.map(w => translateText(w, targetLang, "swotWeaknesses") || w) || [],
      opportunities: report.swot.opportunities?.map(o => translateText(o, targetLang, "swotOpportunities") || o) || [],
      threats: report.swot.threats?.map(tr => translateText(tr, targetLang, "swotThreats") || tr) || []
    } : undefined,
    threatsIdentification: report.threatsIdentification ? {
      summary: translateText(report.threatsIdentification.summary, targetLang, "threatsSummary") || report.threatsIdentification.summary,
      risks: report.threatsIdentification.risks?.map(r => translateText(r, targetLang, "risks") || r) || []
    } : undefined,
    competitorMapping: report.competitorMapping ? {
      ...report.competitorMapping,
      summary: translateText(report.competitorMapping.summary, targetLang, "competitorSummary") || report.competitorMapping.summary,
      competitorInsights: translateText(report.competitorMapping.competitorInsights, targetLang, "competitorInsights") || report.competitorMapping.competitorInsights
    } : undefined,
    productMarketValue: report.productMarketValue ? {
      summary: translateText(report.productMarketValue.summary, targetLang, "pricingSummary") || report.productMarketValue.summary,
      priceRange: translateText(report.productMarketValue.priceRange, targetLang, "priceRange") || report.productMarketValue.priceRange,
      marginEstimate: translateText(report.productMarketValue.marginEstimate, targetLang) || report.productMarketValue.marginEstimate,
      benchmarkNote: translateText(report.productMarketValue.benchmarkNote, targetLang, "benchmarkNote") || report.productMarketValue.benchmarkNote
    } : undefined
  };

  return result;
}

/**
 * Async API translation fallback that calls the backend /api/translate
 * and updates the cache
 */
export async function translateViaApi(
  texts: string[],
  targetLanguageName: string,
  targetLangCode: SupportedLanguage
): Promise<string[]> {
  try {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texts, targetLanguage: targetLanguageName })
    });
    if (!res.ok) throw new Error("Translation request failed");
    const json = await res.json();
    if (json.success && Array.isArray(json.translations)) {
      json.translations.forEach((trans: string, idx: number) => {
        const orig = texts[idx];
        if (orig && trans) {
          runtimeTranslationCache.set(`${targetLangCode}:gen:${orig}`, trans);
        }
      });
      return json.translations;
    }
  } catch (err) {
    console.warn("Using built-in dictionary translation fallback:", err);
  }

  // Fallback to local dictionary
  return texts.map(t => translateText(t, targetLangCode));
}
