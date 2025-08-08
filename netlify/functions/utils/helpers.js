// ===================================================================
// UPDATED HELPERS.JS - Simple High-Volume Content System
// Replace your current netlify/functions/utils/helpers.js with this
// ===================================================================

// 🎯 YOUR QUESTION POOL - Update this section regularly
const QUESTION_POOL = [
  // HISTORY - Ancient & Medieval (15 questions)
{id: "q1", question: "राजस्थान पुनर्गठन में 1956 में किस आयोग की सिफारिशों के आधार पर राज्य का गठन हुआ?", options: ["फजल अली आयोग", "धर आयोग", "शाह आयोग", "मुंशी आयोग"], correct: 0, category: "history", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "hard"},
{id: "q2", question: "राजस्थान में 'गैर' किस लोक नृत्य से संबंधित है?", options: ["गेर", "कच्ची घोड़ी", "घूमर", "तेरहताली"], correct: 0, category: "history", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "medium"},
{id: "q3", question: "राजस्थान का सबसे बड़ा जिला क्षेत्रफल के आधार पर कौन सा है?", options: ["जैसलमेर", "बारां", "बीकानेर", "उदयपुर"], correct: 0, category: "geography", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "easy"},
{id: "q4", question: "राजस्थान की 'लूणी' नदी किस जिले में समाप्त होती है?", options: ["जोधपुर", "जैसलमेर", "बाड़मेर", "पाली"], correct: 2, category: "geography", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "medium"},
{id: "q5", question: "पुष्कर मेले का आयोजन किस जिले में होता है?", options: ["अजमेर", "जयपुर", "सीकर", "बीकानेर"], correct: 0, category: "history", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "easy"},
{id: "q6", question: "राजस्थान का कौन सा जिला 'हीरों की खान' के लिए प्रसिद्ध है?", options: ["भरतपुर", "सिरोही", "पाली", "उदयपुर"], correct: 3, category: "geography", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "medium"},
{id: "q7", question: "राजस्थान विधानसभा में कुल कितनी सीटें हैं?", options: ["199", "200", "201", "198"], correct: 1, category: "current", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "easy"},
{id: "q8", question: "राजस्थान का कौन सा किला UNESCO विश्व धरोहर में शामिल है?", options: ["मेहरानगढ़", "चित्तौड़गढ़", "कुम्भलगढ़", "जैसलमेर का किला"], correct: 3, category: "history", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "hard"},
{id: "q9", question: "राजस्थान में 2024 में मुख्यमंत्री कौन बने?", options: ["अशोक गहलोत", "भजन लाल शर्मा", "वसुंधरा राजे", "गजेन्द्र सिंह शेखावत"], correct: 1, category: "current", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "easy"},
{id: "q10", question: "केवलादेव राष्ट्रीय उद्यान किसके लिए प्रसिद्ध है?", options: ["बाघ", "पक्षी अभयारण्य", "ऊंट", "हिरण"], correct: 1, category: "geography", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "easy"},
{id: "q11", question: "राजस्थान का कौन सा शहर 'गुलाबी नगरी' के नाम से प्रसिद्ध है?", options: ["जोधपुर", "जयपुर", "उदयपुर", "बीकानेर"], correct: 1, category: "history", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "easy"},
{id: "q12", question: "राजस्थान में सर्वाधिक जनसंख्या वाला जिला कौन सा है?", options: ["जयपुर", "जोधपुर", "अलवर", "कोटा"], correct: 0, category: "geography", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "medium"},
{id: "q13", question: "राजस्थान दिवस कब मनाया जाता है?", options: ["25 मार्च", "30 मार्च", "1 अप्रैल", "15 अगस्त"], correct: 1, category: "history", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "easy"},
{id: "q14", question: "थार मरुस्थल का सबसे ऊँचा टीला कौन सा है?", options: ["साम टीला", "धन्या टीला", "माउंट आबू", "कुम्भलगढ़"], correct: 0, category: "geography", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "medium"},
{id: "q15", question: "राजस्थान में सबसे अधिक क्षेत्रफल किस प्रकार की मिट्टी का है?", options: ["बालू मिट्टी", "काली मिट्टी", "जलोढ़ मिट्टी", "लाल मिट्टी"], correct: 0, category: "geography", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "hard"},
{id: "q16", question: "अजमेर में सूफी संत ख्वाजा मोइनुद्दीन चिश्ती की दरगाह किस वंश के समय बनी?", options: ["मुगल", "सल्तनत", "राजपूत", "ब्रिटिश"], correct: 1, category: "history", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "hard"},
{id: "q17", question: "राजस्थान का कौन सा जिला 'वनों का प्रदेश' कहलाता है?", options: ["उदयपुर", "सिरोही", "बारां", "बांसवाड़ा"], correct: 3, category: "geography", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "medium"},
{id: "q18", question: "राजस्थान में विधानसभा चुनाव कितने वर्षों में होते हैं?", options: ["4", "5", "6", "3"], correct: 1, category: "current", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "easy"},
{id: "q19", question: "राजस्थान के कौन से जिले में रणथंभौर राष्ट्रीय उद्यान स्थित है?", options: ["सवाई माधोपुर", "उदयपुर", "जयपुर", "जैसलमेर"], correct: 0, category: "geography", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "easy"},
{id: "q20", question: "महाराणा प्रताप का हल्दीघाटी युद्ध किस वर्ष हुआ था?", options: ["1576", "1556", "1526", "1582"], correct: 0, category: "history", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "hard"},
{id: "q21", question: "राजस्थान का एकमात्र हिल स्टेशन कौन सा है?", options: ["माउंट आबू", "कुम्भलगढ़", "सिरोही", "उदयपुर"], correct: 0, category: "geography", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "easy"},
{id: "q22", question: "कुंभलगढ़ किले की दीवार को किस नाम से जाना जाता है?", options: ["भारत की दूसरी सबसे लंबी दीवार", "राजस्थान की सबसे ऊँची दीवार", "मरुस्थल की दीवार", "राजपूत दीवार"], correct: 0, category: "history", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "medium"},
{id: "q23", question: "राजस्थान की सबसे लंबी नदी कौन सी है?", options: ["चंबल", "लूणी", "बनास", "माही"], correct: 2, category: "geography", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "medium"},
{id: "q24", question: "राजस्थान में किस शहर को 'ब्लू सिटी' कहा जाता है?", options: ["बीकानेर", "जैसलमेर", "जोधपुर", "अजमेर"], correct: 2, category: "history", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "easy"},
{id: "q25", question: "गंगा नहर परियोजना राजस्थान के किस क्षेत्र को सिंचाई प्रदान करती है?", options: ["पूर्वी राजस्थान", "पश्चिमी राजस्थान", "दक्षिणी राजस्थान", "उत्तर-पूर्वी राजस्थान"], correct: 1, category: "geography", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "medium"},
{id: "q26", question: "राजस्थान में सबसे अधिक वन क्षेत्र किस जिले में है?", options: ["उदयपुर", "बारां", "सिरोही", "बांसवाड़ा"], correct: 0, category: "geography", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "hard"},
{id: "q27", question: "राजस्थान का कौन सा शहर शिक्षा नगरी के नाम से प्रसिद्ध है?", options: ["कोटा", "जयपुर", "अजमेर", "भीलवाड़ा"], correct: 0, category: "current", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "easy"},
{id: "q28", question: "जयपुर शहर की स्थापना किसने की थी?", options: ["सवाई माधो सिंह", "महाराजा मानसिंह", "महाराजा सवाई जयसिंह द्वितीय", "महाराणा प्रताप"], correct: 2, category: "history", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "easy"},
{id: "q29", question: "राजस्थान के किस जिले में काला हिरण अभयारण्य स्थित है?", options: ["पाली", "जोधपुर", "जैसलमेर", "सीकर"], correct: 0, category: "geography", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "medium"},
{id: "q30", question: "राजस्थान में 2023 में किस जिले में नया एयरपोर्ट शुरू हुआ?", options: ["कोटा", "श्रीगंगानगर", "बीकानेर", "टोंक"], correct: 1, category: "current", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "medium"},
{id: "q31", question: "राजस्थान के किस लोकदेवता को 'वीर तेजाजी' कहा जाता है?", options: ["पाबूजी", "मल्लिनाथजी", "तेजाजी", "गोगाजी"], correct: 2, category: "history", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "medium"},
{id: "q32", question: "राजस्थान में ऊँट उत्सव कहां आयोजित किया जाता है?", options: ["जोधपुर", "बीकानेर", "जैसलमेर", "अजमेर"], correct: 1, category: "history", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "easy"},
{id: "q33", question: "राजस्थान की सबसे ऊँची चोटी कौन सी है?", options: ["गुरु शिखर", "कुम्भलगढ़", "माउंट आबू", "धौलागढ़"], correct: 0, category: "geography", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "easy"},
{id: "q34", question: "राजस्थान का कौन सा जिला खनिज जिंक के लिए प्रसिद्ध है?", options: ["चित्तौड़गढ़", "भीलवाड़ा", "उदयपुर", "अजमेर"], correct: 0, category: "geography", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "hard"},
{id: "q35", question: "चित्तौड़गढ़ किला किस नदी के किनारे स्थित है?", options: ["गंभीरी", "बनास", "चंबल", "माही"], correct: 0, category: "history", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "medium"},
{id: "q36", question: "राजस्थान में लोक देवता गोगाजी का मेला कहां भरता है?", options: ["हनुमानगढ़", "अजमेर", "बीकानेर", "सीकर"], correct: 0, category: "history", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "medium"},
{id: "q37", question: "राजस्थान में सर्वाधिक तापमान किस जिले में दर्ज किया जाता है?", options: ["जैसलमेर", "बाड़मेर", "बीकानेर", "फलौदी"], correct: 3, category: "geography", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "medium"},
{id: "q38", question: "राजस्थान में 2025 का बजट किसने पेश किया?", options: ["अशोक गहलोत", "भजन लाल शर्मा", "गजेन्द्र सिंह शेखावत", "वसुंधरा राजे"], correct: 1, category: "current", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "medium"},
{id: "q39", question: "राजस्थान में गवरिया जाति किस पेशे से जुड़ी है?", options: ["चरवाहा", "बुनकर", "कुम्हार", "कसाई"], correct: 0, category: "history", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "hard"},
{id: "q40", question: "राजस्थान में नाकोड़ा जी मंदिर किस जिले में है?", options: ["जैसलमेर", "पाली", "सिरोही", "जोधपुर"], correct: 1, category: "history", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "medium"},
{id: "q41", question: "राजस्थान का सबसे अधिक औसत वर्षा वाला जिला कौन सा है?", options: ["बारां", "उदयपुर", "बांसवाड़ा", "जालौर"], correct: 2, category: "geography", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "medium"},
{id: "q42", question: "राजस्थान में तिलवाड़ा का मेला किस नदी के किनारे भरता है?", options: ["लूणी", "चंबल", "बनास", "माही"], correct: 0, category: "history", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "hard"},
{id: "q43", question: "राजस्थान की कौन सी झील कृत्रिम है?", options: ["फतेह सागर", "पिचोला", "सम्भर", "पुष्कर"], correct: 0, category: "geography", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "easy"},
{id: "q44", question: "राजस्थान का पहला महिला मुख्यमंत्री कौन थी?", options: ["वसुंधरा राजे", "गुलाबो देवी", "किरण माहेश्वरी", "विजया राजे"], correct: 0, category: "history", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "easy"},
{id: "q45", question: "राजस्थान में दूध उत्पादन में सबसे अग्रणी जिला कौन सा है?", options: ["जयपुर", "अलवर", "नागौर", "भीलवाड़ा"], correct: 2, category: "current", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "medium"},
{id: "q46", question: "राजस्थान का सबसे कम जनसंख्या वाला जिला कौन सा है?", options: ["जैसलमेर", "सिरोही", "बूंदी", "जालौर"], correct: 0, category: "geography", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "medium"},
{id: "q47", question: "राजस्थान के किस लोकनृत्य में महिलाएं सिर पर मटके रखकर नृत्य करती हैं?", options: ["गैर", "घूमर", "तेरहताली", "कलबेलिया"], correct: 1, category: "history", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "easy"},
{id: "q48", question: "राजस्थान के किस जिले में एशिया का सबसे बड़ा प्याज मंडी स्थित है?", options: ["अलवर", "कोटा", "नासिराबाद", "भरतपुर"], correct: 2, category: "current", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "medium"},
{id: "q49", question: "राजस्थान के किस जिले में जैविक कृषि को बढ़ावा देने के लिए 'जीवामृत योजना' शुरू हुई?", options: ["अलवर", "उदयपुर", "बांसवाड़ा", "झुंझुनूं"], correct: 1, category: "current", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "hard"},
{id: "q50", question: "राजस्थान में 'मरुधरा ग्रोथ कॉरिडोर' परियोजना किस क्षेत्र में विकास के लिए है?", options: ["कृषि", "उद्योग", "पर्यटन", "खनन"], correct: 1, category: "current", hashtags: ["#sujasquiz", "#rpsc"], difficulty: "hard"}
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
  "🎯 परीक्षा में सबसे पहले पूरे प्रश्न पत्र को एक बार जरूर पढ़ें। जो प्रश्न आसान लगें उन्हें पहले हल करें। इससे आत्मविश्वास बढ़ता है और समय की बचत होती है। अंत में कठिन प्रश्नों पर ध्यान दें।",
  "📚 रटने की बजाय समझने पर जोर दें। जब आप किसी विषय को समझ जाते हैं तो वह लंबे समय तक याद रहता है। हर टॉपिक को अपने शब्दों में लिखने की कोशिश करें।",
  "⏰ सुबह 4-6 बजे का समय पढ़ाई के लिए सर्वोत्तम है। इस समय दिमाग fresh रहता है और concentration power अधिक होती है। नए topics इसी समय पढ़ें।",
  "🔄 जो आज पढ़ा है उसे 24 घंटे, 3 दिन, 7 दिन और 21 दिन बाद दोहराएं। यह वैज्ञानिक तरीका है जिससे चीजें स्थायी रूप से याद रहती हैं।",
  "📝 नोट्स बनाते समय हमेशा अपने शब्दों का प्रयोग करें। रंगीन पेन का उपयोग करें। महत्वपूर्ण बिंदुओं को हाइलाइट करें। छोटे-छोटे चित्र बनाएं।",
  "🧠 पढ़ाई के दौरान हर 45 मिनट बाद 10 मिनट का ब्रेक लें। इस दौरान थोड़ा टहलें या पानी पिएं। यह दिमाग को तरोताजा रखता है।",
  "📖 किताब पढ़ते समय पहले पूरे चैप्टर को एक बार देखें। फिर महत्वपूर्ण प्रश्न बनाएं। उसके बाद विस्तार से पढ़ें। अंत में संक्षेप में लिखें।",
  "💡 कठिन विषयों को सुबह पढ़ें जब दिमाग ताजा हो। आसान विषय शाम को पढ़े जा सकते हैं। रात में केवल रिवीजन करें, नया कुछ न पढ़ें।",
  "🎯 हर दिन के लिए छोटे-छोटे लक्ष्य बनाएं। जैसे आज 2 चैप्टर पूरे करने हैं या 50 प्रश्न हल करने हैं। इससे प्रगति दिखती है और उत्साह बना रहता है।",
  "📊 अपनी प्रगति को ट्रैक करें। एक डायरी में लिखें कि आज क्या पढ़ा, कितना समझ आया। इससे कमजोर विषयों का पता चलता है।",
  "🌟 पढ़ाई का एक निश्चित स्थान बनाएं। वहां केवल पढ़ाई करें। मोबाइल को दूर रखें। यह जगह देखते ही दिमाग अपने आप पढ़ाई मोड में आ जाएगा।",
  "💪 रोज कम से कम 30 मिनट व्यायाम करें। स्वस्थ शरीर में ही स्वस्थ मन का वास होता है। योग और प्राणायाम से एकाग्रता बढ़ती है।",
  "🎯 पिछले वर्षों के प्रश्न पत्रों का अध्ययन करें। इससे परीक्षा का पैटर्न समझ आता है और महत्वपूर्ण टॉपिक्स का अंदाजा लगता है।",
  "📚 ग्रुप स्टडी करें लेकिन सीमित समय के लिए। दोस्तों के साथ डिस्कशन से नए विचार मिलते हैं और संदेह दूर होते हैं।",
  "⏰ रात में जल्दी सोएं और सुबह जल्दी उठें। कम से कम 7-8 घंटे की नींद जरूरी है। अच्छी नींद से याददाश्त मजबूत होती है।",
  "🔄 एक ही विषय लगातार न पढ़ें। विषयों को बदलते रहें। इससे बोरियत नहीं होती और दिमाग fresh रहता है।",
  "📝 महत्वपूर्ण फॉर्मूले, तारीखें, नाम आदि को फ्लैशकार्ड पर लिखें। इन्हें बार-बार देखने से जल्दी याद हो जाते हैं।",
  "🧠 कठिन विषयों को छोटे-छोटे भागों में बांटें। एक बार में पूरा समझने की कोशिश न करें। धीरे-धीरे आगे बढ़ें।",
  "📖 पढ़ते समय मुख्य बिंदुओं को अंडरलाइन करें। बाद में केवल इन्हीं को पढ़ने से पूरा चैप्टर याद आ जाता है।",
  "💡 अपनी गलतियों से सीखें। गलत हुए प्रश्नों को अलग नोट करें और बार-बार अभ्यास करें। गलतियां दोहराने से बचें।",
  "🎯 परीक्षा से एक दिन पहले नया कुछ न पढ़ें। केवल रिवीजन करें। शांत रहें और पर्याप्त आराम करें।",
  "📊 मॉक टेस्ट नियमित रूप से दें। इससे समय प्रबंधन की प्रैक्टिस होती है और कमजोरियों का पता चलता है।",
  "🌟 सकारात्मक सोच रखें। खुद पर विश्वास करें। मैं कर सकता हूं - यह सोच आधी सफलता है।",
  "💪 पढ़ाई के दौरान सही posture में बैठें। कमर सीधी रखें। इससे लंबे समय तक पढ़ने में थकान नहीं होती।",
  "🎯 एक बार में एक ही काम करें। मल्टीटास्किंग से बचें। पूरा ध्यान एक विषय पर केंद्रित करें।",
  "📚 कठिन शब्दों या concepts के लिए डिक्शनरी या इंटरनेट का सहारा लें। अधूरी जानकारी से बेहतर है पूरी समझ।",
  "⏰ पढ़ाई का टाइम टेबल बनाएं और उसका सख्ती से पालन करें। अनुशासन सफलता की कुंजी है।",
  "🔄 रिवीजन के लिए अलग से समय निकालें। नया पढ़ना जितना जरूरी है, पुराना दोहराना भी उतना ही जरूरी है।",
  "📝 परीक्षा में सुंदर और स्पष्ट लिखावट का ध्यान रखें। अच्छी हैंडराइटिंग से अच्छे अंक मिलने की संभावना बढ़ जाती है।",
  "🧠 मुश्किल फॉर्मूलों को याद करने के लिए shortcuts या tricks बनाएं। जैसे VIBGYOR से इंद्रधनुष के रंग याद करना।",
  "📖 पढ़ाई के दौरान पानी पीते रहें। डिहाइड्रेशन से एकाग्रता में कमी आती है। हर घंटे एक गिलास पानी जरूर पिएं।",
  "💡 अपने आसपास का माहौल शांत रखें। शोर-शराबे से दूर रहें। जरूरत हो तो इयरप्लग का उपयोग करें।",
  "🎯 छोटी-छोटी उपलब्धियों का जश्न मनाएं। एक चैप्टर पूरा करने पर खुद को शाबाशी दें। यह प्रेरणा बनी रहती है।",
  "📊 अपनी कमजोरियों को पहचानें और उन पर अधिक मेहनत करें। जो आता है उसे भी नियमित अभ्यास से बनाए रखें।",
  "🌟 पढ़ाई को बोझ न समझें। इसे अपने भविष्य में निवेश समझें। सकारात्मक दृष्टिकोण से पढ़ाई आसान लगती है।",
  "💪 स्वस्थ भोजन करें। जंक फूड से बचें। बादाम, अखरोट जैसे ड्राई फ्रूट्स याददाश्त बढ़ाने में मदद करते हैं।",
  "🎯 प्रतिदिन कम से कम एक नया शब्द या तथ्य सीखें। छोटी-छोटी चीजें मिलकर बड़ा ज्ञान बनाती हैं।",
  "📚 विभिन्न स्रोतों से पढ़ें। केवल एक किताब पर निर्भर न रहें। अलग-अलग दृष्टिकोण से समझ बेहतर होती है।",
  "⏰ परीक्षा के दिन जल्दी पहुंचें। अंतिम समय की हड़बड़ी से बचें। शांत मन से परीक्षा दें।",
  "🔄 गलतियों को सुधारने के लिए एक अलग नोटबुक बनाएं। बार-बार की जाने वाली गलतियों पर विशेष ध्यान दें।",
  "📝 महत्वपूर्ण बिंदुओं के लिए अपने शॉर्टकट्स बनाएं। लेकिन ये ऐसे हों जो आपको हमेशा याद रहें।",
  "🧠 दिमागी थकान महसूस हो तो तुरंत ब्रेक लें। जबरदस्ती पढ़ने से कुछ याद नहीं रहता। थोड़ा आराम करके फिर शुरू करें।",
  "📖 पढ़ाई का माहौल बनाएं। टेबल साफ रखें, अच्छी रोशनी हो, हवादार कमरा हो। अच्छा माहौल पढ़ाई में मन लगाता है।",
  "💡 कॉन्सेप्ट्स को real life examples से जोड़ें। इससे समझना और याद रखना दोनों आसान हो जाता है।",
  "🎯 हर सप्ताह अपनी प्रगति का मूल्यांकन करें। क्या सीखा, क्या बाकी है, कहां सुधार की जरूरत है - इसका विश्लेषण करें।",
  "📊 समय बर्बाद करने वाली गतिविधियों को पहचानें और उन्हें कम करें। सोशल मीडिया का सीमित उपयोग करें।",
  "🌟 असफलता से निराश न हों। यह सीखने का एक हिस्सा है। हर असफलता से सीख लेकर आगे बढ़ें।",
  "💪 अपने लक्ष्य को हमेशा याद रखें। जब मन न करे तो अपने सपनों को याद करें। यह सबसे बड़ी प्रेरणा है।",
  "🎯 परीक्षा की तैयारी एक मैराथन है, स्प्रिंट नहीं। धैर्य रखें, निरंतर प्रयास करें। सफलता जरूर मिलेगी।"
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
