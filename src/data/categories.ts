export interface CategoryOption {
  id: string;
  nameEn: string;
  nameHi: string;
  nameMr: string;
  nameBn: string;
  iconName: string;
  descriptionEn: string;
  typicalCapexShare: number; // machinery/equipment share
  rawMaterialShare: number;  // % of revenue
  rentWagesShare: number;    // % of revenue
  estimatedGrossMargin: number; // %
}

export const businessCategories: CategoryOption[] = [
  {
    id: "dairy",
    nameEn: "Dairy & Animal Husbandry",
    nameHi: "डेयरी एवं पशुपालन (दूध व पनीर)",
    nameMr: "दुग्धव्यवसाय व पशुपालन",
    nameBn: "দুগ্ধ খামার ও পশুপালন",
    iconName: "Milk",
    descriptionEn: "Milch cows, buffaloes, milk chilling & value-added curd/paneer",
    typicalCapexShare: 0.75,
    rawMaterialShare: 0.50,
    rentWagesShare: 0.20,
    estimatedGrossMargin: 0.30
  },
  {
    id: "retail",
    nameEn: "Retail Kirana & Daily Provisions",
    nameHi: "किराना दुकान एवं दैनिक वस्तुएँ",
    nameMr: "किराणा व जनरल स्टोअर्स",
    nameBn: "মুদি ও নিত্যপ্রয়োজনীয় দোকান",
    iconName: "Store",
    descriptionEn: "Village grocery, staples, FMCG, packaged goods & stationery",
    typicalCapexShare: 0.35,
    rawMaterialShare: 0.70,
    rentWagesShare: 0.12,
    estimatedGrossMargin: 0.18
  },
  {
    id: "textiles",
    nameEn: "Textiles & Garment Tailoring",
    nameHi: "कपड़ा व्यापार एवं सिलाई वर्कशॉप",
    nameMr: "कापड व टेलरिंग व्यवसाय",
    nameBn: "বস্ত্র ও পোশাক সেলাই কারখানা",
    iconName: "Scissors",
    descriptionEn: "Readymade garments, school uniforms, bridal blouse & boutique",
    typicalCapexShare: 0.45,
    rawMaterialShare: 0.40,
    rentWagesShare: 0.22,
    estimatedGrossMargin: 0.38
  },
  {
    id: "food_processing",
    nameEn: "Food Processing & Spice Grinding",
    nameHi: "खाद्य प्रसंस्करण, मसाला व तेल पिराई",
    nameMr: "अन्न प्रक्रिया व मसाला गिरणी",
    nameBn: "খাদ্য প্রক্রিয়াকরণ ও মশলা পেষাই",
    iconName: "Utensils",
    descriptionEn: "Cold-pressed edible oil, flour mill (Atta), pickles & turmeric processing",
    typicalCapexShare: 0.65,
    rawMaterialShare: 0.52,
    rentWagesShare: 0.16,
    estimatedGrossMargin: 0.32
  },
  {
    id: "poultry",
    nameEn: "Poultry Farming & Fishery",
    nameHi: "मुर्गी पालन एवं मत्स्य पालन",
    nameMr: "कुक्कुटपालन व मत्स्यशेती",
    nameBn: "পোল্ট্রি ও মাছ চাষ",
    iconName: "Egg",
    descriptionEn: "Broiler/country birds, egg layers, freshwater fish pond",
    typicalCapexShare: 0.60,
    rawMaterialShare: 0.55,
    rentWagesShare: 0.15,
    estimatedGrossMargin: 0.30
  },
  {
    id: "handicrafts",
    nameEn: "Handicrafts, Pottery & Bamboo Craft",
    nameHi: "हस्तशिल्प, मिट्टी के बर्तन व बाँस शिल्प",
    nameMr: "हस्तकला, मातीची भांडी व बांबू काम",
    nameBn: "হস্তশিল্প, মৃৎশিল্প ও বাঁশের কাজ",
    iconName: "Palette",
    descriptionEn: "Earthen cookware, jute bags, wooden carving & handloom weave",
    typicalCapexShare: 0.40,
    rawMaterialShare: 0.35,
    rentWagesShare: 0.25,
    estimatedGrossMargin: 0.40
  },
  {
    id: "agro_service",
    nameEn: "Agro-Service & Farm Machinery",
    nameHi: "कृषि सेवा केंद्र व खाद-बीज भंडार",
    nameMr: "कृषी सेवा केंद्र व खते-बियाणे",
    nameBn: "কৃষি সেবা কেন্দ্র ও বীজ ভাণ্ডার",
    iconName: "Tractor",
    descriptionEn: "Certified seeds, organic bio-fertilizers, solar pumps & sprayers",
    typicalCapexShare: 0.50,
    rawMaterialShare: 0.68,
    rentWagesShare: 0.12,
    estimatedGrossMargin: 0.20
  },
  {
    id: "welding",
    nameEn: "Welding & Fabrication Workshop",
    nameHi: "वेल्डिंग एवं फैब्रिकेशन वर्कशॉप",
    nameMr: "वेल्डिंग व फॅब्रिकेशन वर्कशॉप",
    nameBn: "ওয়েল্ডিং ও মেটাল ওয়ার্কশপ",
    iconName: "Wrench",
    descriptionEn: "Agricultural trolleys, iron gates, window grills & tractor repair",
    typicalCapexShare: 0.70,
    rawMaterialShare: 0.48,
    rentWagesShare: 0.22,
    estimatedGrossMargin: 0.30
  },
  {
    id: "beauty_salon",
    nameEn: "Rural Beauty Parlour & Grooming Salon",
    nameHi: "ब्यूटी पार्लर एवं ग्रूमिंग सैलून",
    nameMr: "ब्युटी पार्लर व हेअर सलून",
    nameBn: "বিউটি পার্লার ও সেলুন",
    iconName: "Sparkles",
    descriptionEn: "Bridal makeup, skin care, haircutting & herbal cosmetics",
    typicalCapexShare: 0.55,
    rawMaterialShare: 0.20,
    rentWagesShare: 0.30,
    estimatedGrossMargin: 0.50
  },
  {
    id: "ecotourism",
    nameEn: "Ecotourism & Agri-Tourism Homestay",
    nameHi: "इको-टूरिज्म व कृषि-पर्यटन होमस्टे",
    nameMr: "कृषी पर्यटन व ग्रामीण होमस्टे",
    nameBn: "ইকো-ট্যুরিজম ও কৃষি-পর্যটন হোমস্টে",
    iconName: "Trees",
    descriptionEn: "Rural guest cottages, organic farm tours, village folk culture & authentic ethnic cuisine",
    typicalCapexShare: 0.65,
    rawMaterialShare: 0.25,
    rentWagesShare: 0.25,
    estimatedGrossMargin: 0.50
  },
  {
    id: "renewable_energy",
    nameEn: "Renewable Energy & Solar Services",
    nameHi: "सौर ऊर्जा व नवीकरणीय ऊर्जा सेवाएँ",
    nameMr: "सौर ऊर्जा व नूतनीकरणक्षम ऊर्जा सेवा",
    nameBn: "সৌর শক্তি ও নবায়নযোগ্য শক্তি পরিষেবা",
    iconName: "Sun",
    descriptionEn: "Rooftop solar panel setup, solar agricultural pump servicing, bio-gas & inverter battery hub",
    typicalCapexShare: 0.70,
    rawMaterialShare: 0.45,
    rentWagesShare: 0.20,
    estimatedGrossMargin: 0.35
  },
  {
    id: "digital_services",
    nameEn: "Digital Services Hub & CSC Kendra",
    nameHi: "जन सेवा केंद्र (CSC) व डिजिटल सुविधा हब",
    nameMr: "आपले सरकार / सीएससी डिजिटल सेवा केंद्र",
    nameBn: "ডিজিটাল সেবা কেন্দ্র ও সিএসসি হাব",
    iconName: "Laptop",
    descriptionEn: "Aadhaar/PAN card, micro-ATM banking point, utility bills, online exam forms & xerox printing",
    typicalCapexShare: 0.55,
    rawMaterialShare: 0.15,
    rentWagesShare: 0.25,
    estimatedGrossMargin: 0.60
  },
  {
    id: "artisanal_food",
    nameEn: "Artisanal Food & Millet Value Addition",
    nameHi: "पारंपरिक खाद्य उत्पाद व श्री-अन्न (मिलेट) स्नैक्स",
    nameMr: "पारंपरिक खाद्यपदार्थ व भरडधान्य प्रक्रिया",
    nameBn: "ঐতিহ্যবাহী খাদ্য ও মিলেট প্রক্রিয়াকরণ",
    iconName: "CookingPot",
    descriptionEn: "Handmade pickles (achar), papad, cold-pressed oils, organic honey packing & ragi millet snacks",
    typicalCapexShare: 0.50,
    rawMaterialShare: 0.48,
    rentWagesShare: 0.18,
    estimatedGrossMargin: 0.34
  },
  {
    id: "waste_management",
    nameEn: "Waste Management & Recycling Unit",
    nameHi: "कचरा प्रबंधन, प्लास्टिक रीसाइक्लिंग व खाद",
    nameMr: "कचरा व्यवस्थापन, पुनर्वापर व गांडूळखत",
    nameBn: "বর্জ্য ব্যবস্থাপনা ও পুনর্ব্যবহারযোগ্য ইউনিট",
    iconName: "Recycle",
    descriptionEn: "Plastic scrap baling, crop residue (parali) biomass briquettes & vermicompost organic manure",
    typicalCapexShare: 0.65,
    rawMaterialShare: 0.35,
    rentWagesShare: 0.25,
    estimatedGrossMargin: 0.40
  },
  {
    id: "cold_storage",
    nameEn: "Cold Storage & Fresh Produce Hub",
    nameHi: "मिनी कोल्ड स्टोरेज व फल-सब्जी एकत्रीकरण",
    nameMr: "मिनी शीतगृह व भाजीपाला संकलन केंद्र",
    nameBn: "মিনি কোল্ড স্টোরেজ ও ফল-সবজি সংগ্রহ",
    iconName: "Snowflake",
    descriptionEn: "Micro solar-powered cold room, onion/potato grading, sorting warehouse & mandi market link",
    typicalCapexShare: 0.80,
    rawMaterialShare: 0.45,
    rentWagesShare: 0.15,
    estimatedGrossMargin: 0.40
  },
  {
    id: "custom_hiring",
    nameEn: "Custom Hiring Centre (Farm Machinery)",
    nameHi: "कृषि यंत्र कस्टम हायरिंग बैंक (किराया सेवा)",
    nameMr: "कृषी अवजारे बँक व भाडेतत्त्व केंद्र",
    nameBn: "কৃষি যন্ত্রপাতি ভাড়া ও কাস্টম হায়ারিং",
    iconName: "Tractor",
    descriptionEn: "Rotavator, laser land leveler, drone crop spraying, mini tractor & multi-crop thresher hire",
    typicalCapexShare: 0.85,
    rawMaterialShare: 0.20,
    rentWagesShare: 0.25,
    estimatedGrossMargin: 0.55
  },
  {
    id: "ev_mobility",
    nameEn: "EV 2-Wheeler & Auto Repair Hub",
    nameHi: "ई-रिक्शा, टू-व्हीलर सर्विस व चार्जिंग स्टेशन",
    nameMr: "ई-रिक्षा व दुचाकी दुरुस्ती व चार्जिंग केंद्र",
    nameBn: "ই-রিকশা ও বাইক সার্ভিসিং কেন্দ্র",
    iconName: "BatteryCharging",
    descriptionEn: "E-rickshaw battery swapping, electric scooter maintenance, tyre puncture & mechanic service",
    typicalCapexShare: 0.60,
    rawMaterialShare: 0.35,
    rentWagesShare: 0.25,
    estimatedGrossMargin: 0.40
  },
  {
    id: "bamboo_craft",
    nameEn: "Bamboo & Eco-Packaging Products",
    nameHi: "बाँस शिल्प व पर्यावरण-अनुकूल पत्तल-दोना",
    nameMr: "बांबू हस्तकला व पर्यावरणपूरक द्रोण-पत्रावळी",
    nameBn: "বাঁশ শিল্প ও পরিবেশবান্ধব থালা-বাসন",
    iconName: "Package",
    descriptionEn: "Areca palm leaf plates, bamboo woven baskets, cane furniture & biodegradable take-away boxes",
    typicalCapexShare: 0.45,
    rawMaterialShare: 0.35,
    rentWagesShare: 0.25,
    estimatedGrossMargin: 0.40
  },
  {
    id: "ayurvedic_herbs",
    nameEn: "Herbal & Ayurvedic Processing Unit",
    nameHi: "आयुर्वेदिक जड़ी-बूटी व एलोवेरा प्रसंस्करण",
    nameMr: "आयुर्वेदिक औषधी वनस्पती व प्रक्रिया",
    nameBn: "ভেষজ ও আয়ুর্বেদিক পণ্য প্রক্রিয়াকরণ",
    iconName: "Leaf",
    descriptionEn: "Aloe vera juice extraction, tulsi/ashwagandha powders, herbal teas, essential oils & herbal soap",
    typicalCapexShare: 0.60,
    rawMaterialShare: 0.40,
    rentWagesShare: 0.20,
    estimatedGrossMargin: 0.40
  },
  {
    id: "rural_logistics",
    nameEn: "Rural Logistics & Farm Transport Hub",
    nameHi: "ग्रामीण पार्सल डिलीवरी व कृषि परिवहन केंद्र",
    nameMr: "ग्रामीण कुरिअर व कृषी वाहतूक केंद्र",
    nameBn: "গ্রামীণ পার্সেল ডেলিভারি ও পরিবহন কেন্দ্র",
    iconName: "Truck",
    descriptionEn: "Last-mile village parcel drop, farm produce transport to mandi & small commercial tempo hire",
    typicalCapexShare: 0.65,
    rawMaterialShare: 0.25,
    rentWagesShare: 0.30,
    estimatedGrossMargin: 0.45
  },
  {
    id: "other",
    nameEn: "Other Micro-Enterprise",
    nameHi: "अन्य स्वरोज़गार उद्यम",
    nameMr: "इतर व्यवसाय",
    nameBn: "অন্যান্য ক্ষুদ্র শিল্প",
    iconName: "Briefcase",
    descriptionEn: "Custom enterprise customized to your rural/semi-urban expertise",
    typicalCapexShare: 0.50,
    rawMaterialShare: 0.50,
    rentWagesShare: 0.20,
    estimatedGrossMargin: 0.30
  }
];
