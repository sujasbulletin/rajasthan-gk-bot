// ===================================================================
// UPDATED HELPERS.JS - Simple High-Volume Content System
// Replace your current netlify/functions/utils/helpers.js with this
// ===================================================================

// 🎯 YOUR QUESTION POOL - Update this section regularly
const QUESTION_POOL = [
  {
    id: "q1",
    question: "मारवाड़ के राठौड़ों की शरणस्थली किसे कहा जाता है?",
    options: ["मंडोर", "पोकरण", "बीकानेर", "फलौदी"],
    correct: 1,
    category: "history",
    hashtags: ["#rpsc", "#मारवाड़", "#sujas"],
    difficulty: "medium"
  },
  {
    id: "q2",
    question: "राजस्थान के इतिहास के प्रणेता कहे जाने वाले कर्नल टॉड ने कौन सा प्रसिद्ध ग्रंथ लिखा?",
    options: ["Annals and Antiquities of Rajasthan", "History of Rajputana", "Rajasthan Chronicles", "Tales of Rajputana"],
    correct: 0,
    category: "history",
    hashtags: ["#राजस्थानजीके", "#कर्नलटॉड", "#इतिहास"],
    difficulty: "medium"
  },
  {
    id: "q3",
    question: "गिरी-सुमेल का युद्ध किस वर्ष मालदेव और शेरशाह सूरी के बीच हुआ था?",
    options: ["1540", "1543", "1544", "1541"],
    correct: 2,
    category: "history",
    hashtags: ["#राजस्थानजीके", "#गिरीसुमेल", "#मालदेव"],
    difficulty: "hard"
  },
  {
    id: "q4",
    question: "राजस्थान में ताम्र-पाषाण संस्कृति का सबसे महत्वपूर्ण स्थल कौन सा है?",
    options: ["कालीबंगा", "आहड़", "गणेश्वर", "बागोर"],
    correct: 2,
    category: "archaeology",
    hashtags: ["#राजस्थानजीके", "#गणेश्वर", "#पुरातत्व"],
    difficulty: "hard"
  },
  {
    id: "q5",
    question: "राजस्थान की राजधानी कौन सी है?",
    options: ["जयपुर", "जोधपुर", "उदयपुर", "कोटा"],
    correct: 0,
    category: "geography",
    hashtags: ["#राजस्थानजीके", "#राजधानी", "#जयपुर"],
    difficulty: "easy"
  },
  {
    id: "q6",
    question: "राजस्थान का सबसे बड़ा जिला कौन सा है?",
    options: ["जैसलमेर", "बाड़मेर", "बीकानेर", "जोधपुर"],
    correct: 0,
    category: "geography",
    hashtags: ["#राजस्थानजीके", "#जैसलमेर", "#भूगोल"],
    difficulty: "easy"
  },
  {
    id: "q7",
    question: "राजस्थान में स्थित माउंट आबू किस पर्वत श्रृंखला का हिस्सा है?",
    options: ["अरावली", "विंध्याचल", "सतपुड़ा", "हिमालय"],
    correct: 0,
    category: "geography",
    hashtags: ["#राजस्थानजीके", "#माउंटआबू", "#अरावली"],
    difficulty: "easy"
  },
  {
    id: "q8",
    question: "राजस्थान का राजकीय पशु कौन सा है?",
    options: ["चिंकारा", "ऊंट", "बाघ", "हिरण"],
    correct: 0,
    category: "general",
    hashtags: ["#राजस्थानजीके", "#राजकीयपशु", "#चिंकारा"],
    difficulty: "easy"
  },
  {
    id: "q9",
    question: "राजस्थान का राजकीय पक्षी कौन सा है?",
    options: ["गोडावण", "मोर", "तोता", "कबूतर"],
    correct: 0,
    category: "general",
    hashtags: ["#राजस्थानजीके", "#राजकीयपक्षी", "#गोडावण"],
    difficulty: "medium"
  },
  {
    id: "q10",
    question: "जैसलमेर को किस नाम से जाना जाता है?",
    options: ["गुलाबी शहर", "नीला शहर", "सुनहरा शहर", "सफेद शहर"],
    correct: 2,
    category: "geography",
    hashtags: ["#राजस्थानजीके", "#जैसलमेर", "#सुनहराशहर"],
    difficulty: "easy"
  },
  {
    id: "q11",
    question: "राजस्थान का कौन सा शहर 'पिंक सिटी' के नाम से प्रसिद्ध है?",
    options: ["जोधपुर", "जयपुर", "उदयपुर", "बीकानेर"],
    correct: 1,
    category: "geography",
    hashtags: ["#राजस्थानजीके", "#जयपुर", "#पिंकसिटी"],
    difficulty: "easy"
  },
  {
    id: "q12",
    question: "राजस्थान में कौन सी नदी बारहमासी है?",
    options: ["लूणी", "चंबल", "बनास", "साबरमती"],
    correct: 1,
    category: "geography",
    hashtags: ["#राजस्थानजीके", "#चंबल", "#नदियां"],
    difficulty: "medium"
  },
  {
    id: "q13",
    question: "राजस्थान का राजकीय फूल कौन सा है?",
    options: ["कमल", "रोहिड़ा", "गुलाब", "सूरजमुखी"],
    correct: 1,
    category: "general",
    hashtags: ["#राजस्थानजीके", "#रोहिड़ा", "#राजकीयफूल"],
    difficulty: "medium"
  },
  {
    id: "q14",
    question: "राजस्थान का कौन सा किला यूनेस्को विश्व धरोहर स्थल है?",
    options: ["मेहरानगढ़", "आमेर किला", "नाहरगढ़", "जैसलमेर किला"],
    correct: 1,
    category: "heritage",
    hashtags: ["#राजस्थानजीके", "#आमेरकिला", "#UNESCO"],
    difficulty: "medium"
  },
  {
    id: "q15",
    question: "राजस्थान में कुल कितने जिले हैं?",
    options: ["32", "33", "34", "35"],
    correct: 1,
    category: "general",
    hashtags: ["#राजस्थानजीके", "#जिले", "#सामान्यज्ञान"],
    difficulty: "easy"
  }
  // 🔄 ADD MORE QUESTIONS HERE - Target 50+ questions
];

// 📍 YOUR CUSTOM FACTS - Update these regularly
const CUSTOM_FACTS = [
  // ULTRA-CURRENT FACTS (2024-2025) - First 25
  "💰 राजस्थान ने दिसंबर 2024 में Rising Rajasthan Summit में रिकॉर्ड ₹35 लाख करोड़ के MoUs साइन किए! यह भारत का सबसे बड़ा state investment summit था! #RisingRajasthan #sujasfact",
  "🌞 राजस्थान में ReNew ने 1.3 GW का सबसे बड़ा single-location solar project जैसलमेर में successfully inaugurate किया। यह 5 लाख घरों को बिजली दे रहा है! #SolarPower #sujasfact",
  "🛣️ केंद्रीय मंत्री नितिन गडकरी ने राजस्थान के लिए ₹30,000 करोड़ के infrastructure projects announce किए, जिसमें ₹12,000 करोड़ का Jaipur-Amritsar highway शामिल है! #Infrastructure #sujasfact",
  "🏭 अडानी ग्रुप ने राजस्थान में ₹7.5 लाख करोड़ निवेश की घोषणा की। यह राज्य के लिए सबसे बड़ा single investment announcement है! #AdaniGroup #sujasfact",
  "⚡ राजस्थान ने 2030 तक 125 GW नवीकरणीय ऊर्जा का लक्ष्य रखा है। यह गुजरात की कुल क्षमता से भी ज्यादा है! #CleanEnergy #sujasfact",
  "📈 राजस्थान का GDP ₹16 trillion ($190 billion) है, जो इसे भारत में 7वां सबसे बड़ा economy बनाता है। यह Singapore के GDP के बराबर है! #EconomyFacts #sujasfact",
  "🚄 दिल्ली-मुंबई Expressway का 58% हिस्सा राजस्थान से गुजरता है, जो इसे India के 40% market तक direct access देता है! #DelhiMumbaiExpressway #sujasfact",
  "📱 राजस्थान ने RajNivesh digital platform launch किया - single-window clearance system जो investment approval को 45 days से घटाकर 15 days करता है! #DigitalRajasthan #sujasfact",
  "🔋 राजस्थान ने सिर्फ ₹2.18/kWh पर सबसे सस्ती solar electricity rate achieve की। यह coal power से भी सस्ती है! #CheapSolar #sujasfact",
  "🏟️ उदयपुर में 35,000 capacity का international cricket stadium construction में है। यह राजस्थान का सबसे बड़ा sports venue होगा! #UdaipurStadium #sujasfact",
  "🏭 बाड़मेर refinery project progress में है - 9 MTPA capacity के साथ यह northwest India की सबसे बड़ी refinery होगी! #BarmerRefinery #sujasfact",
  "🌍 Rising Rajasthan Summit में 32 countries और 20+ international organizations participate किए। यह किसी भी Indian state का सबसे बड़ा global outreach था! #GlobalRajasthan #sujasfact",
  "🎓 राजस्थान medical education को Hindi medium में शुरू करने वाला first state बना। Dr. APJ Abdul Kalam Medical University में हिंदी में MBBS! #MedicalEducation #sujasfact",
  "🌳 'हरियालो राजस्थान' अभियान के तहत 2025-26 में 10 करोड़ पेड़ लगाने का target है। यह पूरे दिल्ली के area में forest cover के बराबर है! #GreenRajasthan #sujasfact",
  "📊 राजस्थान road safety में first state बना है जिसने 10-year action plan adopt किया। World Bank के साथ partnership में! #RoadSafety #sujasfact",
  "⚖️ राजस्थान ने 'लोकतंत्र सेनानी सम्मान विधेयक 2024' pass किया - Emergency के heroes को ₹20,000 monthly pension! #DemocracyFighters #sujasfact",
  "💳 राजस्थान में FASTag annual pass scheme शुरू हुई - unlimited highway travel for fixed yearly fee! #FASTAGPass #sujasfact",
  "✈️ राजस्थान के 23 senior IAS officers को international jurisdictions में investor ambassadors बनाया गया। यह unique global strategy है! #InvestorOutreach #sujasfact",
  "🎬 25th IIFA Awards 2025 जयपुर में successfully हुए (March 8-9)। Laapataa Ladies ने 10 awards जीते! यह राजस्थान के लिए biggest entertainment event था! #IIFA2025 #sujasfact",
  "💧 PKC-ERCP project राजस्थान के 23 districts में irrigation facilities provide करेगा - यह भारत की सबसे बड़ी water transfer scheme है! #WaterSecurity #sujasfact",
  "🌾 राजस्थान में कृषि सब्सिडी योजना farmers को एकमुश्त settlement का मौका दे रही है। 36,351 farmers को फायदा होगा! #FarmerScheme #sujasfact",
  "🚜 राजस्थान में precision agriculture 50+ districts में शुरू हो गई है। Satellite monitoring से crop yield बढ़ रही है! #PrecisionAgriculture #sujasfact",
  "💧 राजस्थान में micro-irrigation coverage 85% तक पहुंच गई है। Water conservation में state leader बना है! #WaterConservation #sujasfact",
  "🌱 राजस्थान में organic farming area 2024-25 में 15% बढ़ा है। Chemical-free agriculture को promote कर रहा है! #OrganicFarming #sujasfact",
  "🌽 राजस्थान में millets production India में 2nd highest है। International Year of Millets में star performer! #Millets #sujasfact",

  // RENEWABLE ENERGY & TECHNOLOGY - Next 20
  "📊 राजस्थान की सौर ऊर्जा क्षमता 22,860 MW है - यह पूरे बांग्लादेश की कुल बिजली क्षमता से ज्यादा है! #SolarLeader #sujasfact",
  "🌪️ राजस्थान wind power में भारत में 3rd rank रखता है और हर साल 325+ sunny days मिलते हैं। Perfect combo for renewable energy! #WindPower #sujasfact",
  "🎯 राजस्थान का target है 2030 तक 90 GW renewable energy capacity - यह current total से 3 गुना ज्यादा है! #RenewableTarget2030 #sujasfact",
  "🚀 राजस्थान green hydrogen production में भी leader बनने वाला है। 2030 तक 5 MT production capacity planned है! #GreenHydrogen #sujasfact",
  "🔬 राजस्थान में space applications center स्थापित होने वाला है जो satellite data से agriculture को boost करेगा! #SpaceTech #sujasfact",
  "🌾 राजस्थान अब drone technology से agriculture कर रहा है। 50+ districts में precision farming start हो गई है! #DroneFarming #sujasfact",
  "⚡ राजस्थान में सबसे ज्यादा सौर ऊर्जा का उत्पादन होता है। #Energy #sujasfact",
  "🔋 राजस्थान renewable energy में भारत में 2nd position रखता है। Total 28,617 MW capacity installed है! #RenewableEnergy #sujasfact",
  "🌞 राजस्थान में 50 solar parks planned हैं जिनकी combined capacity 37.49 GW होगी! #SolarParks #sujasfact",
  "💡 राजस्थान में net metering cap को 1 MW तक बढ़ाया गया है। Commercial consumers अब surplus power बेच सकते हैं! #NetMetering #sujasfact",
  "🏭 राजस्थान India's manufacturing hub बनने की राह पर है। Defense corridor भी establish होने वाला है! #ManufacturingHub #sujasfact",
  "⚙️ राजस्थान में JSW ने ₹48,500 करोड़ के 10,000 MW solar projects propose किए हैं! #JSWProjects #sujasfact",
  "🌐 राजस्थान में green energy corridor develop हो रहा है जो 6,311 MW green energy generate करेगा! #GreenCorridor #sujasfact",
  "🔌 राजस्थान में EV charging infrastructure develop हो रहा है - renewable energy powered stations! #EVCharging #sujasfact",
  "💨 राजस्थान के Jaisalmer, Barmer, Jodhpur में consistent wind currents हैं - ideal for wind farms! #WindEnergy #sujasfact",
  "🏗️ राजस्थान में multi-modal logistics parks बन रहे हैं जो renewable energy से powered होंगे! #LogisticsPark #sujasfact",
  "⚗️ राजस्थान में battery energy storage systems (BESS) की 47.2 GW requirement by 2032! #EnergyStorage #sujasfact",
  "🌊 राजस्थान में pumped storage की 26.7 GW requirement है 2032 तक! #PumpedStorage #sujasfact",
  "🔧 राजस्थान में renewable energy equipment manufacturing hubs स्थापित हो रहे हैं! #Manufacturing #sujasfact",
  "🎛️ राजस्थान grid-connected renewable power में India में highest capacity रखता है - 22,398 MW! #GridPower #sujasfact",

  // HERITAGE & CULTURE - Next 15
  "🎭 जयपुर को UNESCO World Heritage City status मिला है - यह India का 38वां World Heritage Site है! #JaipurPinkCity #sujasfact",
  "🏰 राजस्थान में 6 UNESCO World Heritage Sites हैं - यह India में सबसे ज्यादा है! (Jaipur, Amer Fort, Chittorgarh, Kumbhalgarh, Ranthambore, Jantar Mantar) #Heritage #sujasfact",
  "🎨 राजस्थान की Phad painting technique 1000+ years old है और अब globally exhibited होती है। इसे UNESCO ने Intangible Cultural Heritage में include किया! #PhadPainting #sujasfact",
  "🐪 राजस्थान का Pushkar Camel Fair अब international tourism calendar में है और 50+ countries के tourists आते हैं! #PushkarFair #sujasfact",
  "🏛️ जयपुर का हवा महल 953 झरोखों के साथ बना है। #Architecture #sujasfact",
  "🎭 राजस्थान की कठपुतली कला विश्व प्रसिद्ध है। #Culture #sujasfact",
  "🎵 राजस्थान के लोक वाद्य यंत्र रावणहत्था और मांदल विश्व प्रसिद्ध हैं। #Music #sujasfact",
  "🏰 चित्तौड़गढ़ किला भारत का सबसे बड़ा किला है। #Forts #sujasfact",
  "🏛️ बीकानेर का जूनागढ़ किला कभी नहीं जीता गया। #Forts #sujasfact",
  "🏰 राजस्थान का कुंभलगढ़ किला 36 किमी लंबी दीवार के साथ विश्व की दूसरी सबसे लंबी दीवार है। #Heritage #sujasfact",
  "🏛️ राजस्थान में कुल 33 जिले हैं। हनुमानगढ़ 1994 में बना सबसे नया जिला है। #Facts #sujasfact",
  "🏺 राजस्थान के कालीबंगा में हड़प्पा सभ्यता के अवशेष मिले हैं। #History #sujasfact",
  "🎪 राजस्थान का पुष्कर मेला विश्व का सबसे बड़ा ऊंट मेला है। #Culture #sujasfact",
  "🏛️ राजस्थान की पहली महिला मुख्यमंत्री वसुंधरा राजे थीं। #Politics #sujasfact",
  "🎨 राजस्थान की मिनिएचर पेंटिंग यूनेस्को की अमूर्त सांस्कृतिक धरोहर सूची में शामिल है। #Art #sujasfact",

  // GEOGRAPHY & NATURAL RESOURCES - Next 15
  "💎 राजस्थान में दुनिया की 81 varieties of minerals मिलती हैं - यह Australia के बाद दूसरा सबसे mineral-rich region है! #MineralWealth #sujasfact",
  "🏜️ थार मरुस्थल राजस्थान के 60% भाग में फैला हुआ है। #Desert #sujasfact",
  "💎 राजस्थान में भारत का 90% संगमरमर का उत्पादन होता है। #Industry #sujasfact",
  "🏖️ राजस्थान का एकमात्र हिल स्टेशन माउंट आबू है। #Tourism #sujasfact",
  "💰 राजस्थान में सोने की खदानें हुंडेर (बांसवाड़ा) में स्थित हैं। #Mining #sujasfact",
  "💧 राजस्थान की एकमात्र बारहमासी नदी चंबल है। #Rivers #sujasfact",
  "🌸 राजस्थान का राजकीय फूल रोहिड़ा है। #Flora #sujasfact",
  "🌵 राजस्थान में खेजड़ी को राज्य वृक्ष का दर्जा प्राप्त है। #Flora #sujasfact",
  "🦚 राजस्थान का राजकीय पक्षी गोडावण है, जो विलुप्त होने के कगार पर है। #Wildlife #sujasfact",
  "🐯 राजस्थान में 3 राष्ट्रीय उद्यान हैं - रणथंभौर, सरिस्का, और केवलादेव। #Wildlife #sujasfact",
  "🌾 राजस्थान में सबसे ज्यादा बाजरे का उत्पादन होता है। #Agriculture #sujasfact",
  "📍 राजस्थान का सबसे ऊंचा बिंदु माउंट आबू में गुरु शिखर है (1722 मीटर)। #Geography #sujasfact",
  "🏛️ राजस्थान का सबसे बड़ा जिला जैसलमेर है। #Geography #sujasfact",
  "🌆 जैसलमेर को 'सुनहरा शहर' के नाम से जाना जाता है। #Geography #sujasfact",
  "🌆 जयपुर को 'पिंक सिटी' के नाम से जाना जाता है। #Geography #sujasfact",

  // TOURISM & DEVELOPMENT - Next 10
  "✈️ राजस्थान में tourist arrivals 2024 में 52 million cross किए - pre-COVID levels को beat किया! #Tourism #sujasfact",
  "🏨 राजस्थान में luxury tourism segment 25% growth rate से बढ़ रहा है। Palace hotels का unique concept! #LuxuryTourism #sujasfact",
  "🎪 राजस्थान के festivals में international participation 40% बढ़ा है। Cultural diplomacy का powerful tool! #CulturalTourism #sujasfact",
  "🏕️ राजस्थान में desert camping sites 200+ developed हो गए हैं। Adventure tourism का hub बन रहा है! #AdventureTourism #sujasfact",
  "🚂 राजस्थान में heritage train routes 15+ हैं। Palace on Wheels globally famous! #HeritageTourism #sujasfact",
  "🕌 राजस्थान में religious tourism circuit development में ₹800 करोड़ investment! Spiritual tourism को boost! #ReligiousTourism #sujasfact",
  "🎬 राजस्थान film shooting destination के रूप में 300+ projects हुई हैं। Bollywood का favorite location! #FilmTourism #sujasfact",
  "🏰 राजस्थान में heritage hotels 150+ हैं। Palace को hotel में convert करने का unique concept globally famous! #HeritageHotels #sujasfact",
  "🎯 राजस्थान में wellness tourism segment तेजी से grow कर रहा है। Ayurveda और spa retreats popular! #WellnessTourism #sujasfact",
  "🚁 राजस्थान में helicopter tourism services शुरू हो गई हैं। Aerial views of forts और palaces! #HelicopterTourism #sujasfact",

  // FINAL 5 FACTS - Education & Future
  "🎓 राजस्थान में skill development centers 500+ established हैं। Youth को industry-ready बनाने का mission! #SkillDevelopment #sujasfact",
  "🏫 राजस्थान में technical education enrollment 35% बढ़ी है। Engineering और ITI colleges में capacity expansion! #TechnicalEducation #sujasfact",
  "👩‍💻 राजस्थान में women's participation in higher education 45% cross कर गया है। Gender parity में progress! #WomenEducation #sujasfact",
  "🔬 राजस्थान में research institutions 25+ हैं। Science और technology में innovation hub बन रहा है! #ResearchInstitutions #sujasfact",
  "📚 राजस्थान में digital classrooms 50,000+ schools में setup हो गए हैं। Education technology revolution! #DigitalEducation #sujasfact"
];

// 📚 STUDY TIPS
const STUDY_TIPS = [
  "🎯 एग्जाम टिप: MCQ solve करते समय पहले गलत विकल्पों को eliminate करें। #StudyTip #राजस्थानजीके",
  "📚 Memory Trick: राजस्थान के 7 संभाग - 'जयजुबिकोउअ' (जयपुर, जोधपुर, बीकानेर, कोटा, उदयपुर, अजमेर, भरतपुर) #StudyTip",
  "⏰ Study Plan: सुबह History, दोपहर Geography, शाम Current Affairs पढ़ें। #StudyTip #राजस्थानजीके",
  "🔄 Revision Rule: जो आज पढ़ा है, उसे 3 दिन बाद, फिर 7 दिन बाद दोहराएं। #StudyTip #Memory",
  "📝 नोट्स बनाते समय अपने शब्दों का इस्तेमाल करें। याददाश्त बढ़ाने में मदद करता है। #StudyTip",
  "🎨 Visual Learning: Maps और Charts का ज्यादा इस्तेमाल करें। Geography के लिए बेहतरीन! #StudyTip",
  "📖 Daily Target: रोज़ाना कम से कम 20 नए facts पढ़ें और लिखें। #StudyTip #DailyGoal",
  "🧠 Memory Palace: महत्वपूर्ण तारीखों को किसी कहानी से जोड़कर याद करें। #StudyTip #Memory",
  "📱 Mobile Learning: खाली समय में अपने notes review करें। हर मिनट काउंट करता है! #StudyTip",
  "💪 Practice: रोज़ाना 50 MCQ solve करें और गलतियों को analyze करें। #StudyTip #Practice",
  "🎯 Focus Mode: पढ़ाई के दौरान phone को silent रखें। Concentration बढ़ेगी! #StudyTip #Focus",
  "📊 Weekly Test: हर हफ्ते mock test लें और performance track करें। #StudyTip #Testing",
  "🤝 Group Study: दोस्तों के साथ discuss करें और doubts clear करें। #StudyTip #GroupStudy",
  "🌅 Morning Study: सुबह का समय concepts के लिए सबसे बेहतर है। #StudyTip #MorningStudy",
  "💤 Sleep Well: पर्याप्त नींद लें, memory consolidation के लिए जरूरी है। #StudyTip #Health"
];

// ===================================================================
// CONTENT MANAGER CLASS
// ===================================================================

class ContentManager {
  constructor() {
    this.state = {
      usedQuestions: new Set(),
      usedFacts: new Set(),
      usedTips: new Set(),
      lastReset: new Date().toDateString(),
      dailyCount: {
        questions: 0,
        facts: 0,
        tips: 0
      }
    };
  }

  // Reset usage tracking daily
  resetIfNeeded() {
    const today = new Date().toDateString();
    if (this.state.lastReset !== today) {
      this.state.usedQuestions.clear();
      this.state.usedFacts.clear();
      this.state.usedTips.clear();
      this.state.dailyCount = { questions: 0, facts: 0, tips: 0 };
      this.state.lastReset = today;
      console.log('Daily usage reset completed');
    }
  }

  // Get random unused content
  getRandomUnused(array, usedSet, type) {
    this.resetIfNeeded();
    
    const available = array.filter((_, index) => !usedSet.has(index));
    
    if (available.length === 0) {
      console.log(`All ${type} used today, resetting...`);
      usedSet.clear();
      this.state.dailyCount[type] = 0;
      return array[Math.floor(Math.random() * array.length)];
    }
    
    const randomIndex = Math.floor(Math.random() * available.length);
    const selectedItem = available[randomIndex];
    const originalIndex = array.indexOf(selectedItem);
    usedSet.add(originalIndex);
    this.state.dailyCount[type]++;
    
    return selectedItem;
  }

  // Get next question
  getNextQuestion() {
    return this.getRandomUnused(QUESTION_POOL, this.state.usedQuestions, 'questions');
  }

  // Get random fact
  getRandomFact() {
    return this.getRandomUnused(CUSTOM_FACTS, this.state.usedFacts, 'facts');
  }

  // Get random tip
  getRandomTip() {
    return this.getRandomUnused(STUDY_TIPS, this.state.usedTips, 'tips');
  }

  // Get usage statistics
  getStats() {
    this.resetIfNeeded();
    return {
      total_content: {
        questions: QUESTION_POOL.length,
        facts: CUSTOM_FACTS.length,
        tips: STUDY_TIPS.length
      },
      used_today: {
        questions: this.state.usedQuestions.size,
        facts: this.state.usedFacts.size,
        tips: this.state.usedTips.size
      },
      remaining_today: {
        questions: QUESTION_POOL.length - this.state.usedQuestions.size,
        facts: CUSTOM_FACTS.length - this.state.usedFacts.size,
        tips: STUDY_TIPS.length - this.state.usedTips.size
      },
      last_reset: this.state.lastReset
    };
  }
}

// ===================================================================
// UTILITY FUNCTIONS
// ===================================================================

const Utils = {
  log: (functionName, message, data = {}) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${functionName}: ${message}`, data);
  },

  createResponse: (statusCode, body) => ({
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(body, null, 2)
  }),

  validateEnvironmentVariables: () => {
    const required = [
      'TWITTER_API_KEY',
      'TWITTER_API_SECRET', 
      'TWITTER_ACCESS_TOKEN',
      'TWITTER_ACCESS_TOKEN_SECRET'
    ];
    return required.every(key => process.env[key]);
  }
};

// ===================================================================
// EXPORTS
// ===================================================================

module.exports = {
  ContentManager,
  Utils,
  QUESTION_POOL,
  CUSTOM_FACTS,
  STUDY_TIPS
};
