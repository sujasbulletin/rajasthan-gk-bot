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
    hashtags: ["#राजस्थानजीके", "#मारवाड़", "#राठौड़वंश"],
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
  "🏛️ राजस्थान में कुल 33 जिले हैं। हनुमानगढ़ 1994 में बना सबसे नया जिला है। #राजस्थानजीके #Facts",
  "🏰 राजस्थान का कुंभलगढ़ किला 36 किमी लंबी दीवार के साथ विश्व की दूसरी सबसे लंबी दीवार है। #राजस्थानजीके #Heritage",
  "📍 राजस्थान का सबसे ऊंचा बिंदु माउंट आबू में गुरु शिखर है (1722 मीटर)। #राजस्थानजीके #Geography",
  "🐪 राजस्थान में विश्व का एकमात्र ऊंट अनुसंधान केंद्र बीकानेर में स्थित है। #राजस्थानजीके #Research",
  "🏜️ थार मरुस्थल राजस्थान के 60% भाग में फैला हुआ है। #राजस्थानजीके #Desert",
  "💎 राजस्थान में भारत का 90% संगमरमर का उत्पादन होता है। #राजस्थानजीके #Industry",
  "🎨 राजस्थान की मिनिएचर पेंटिंग यूनेस्को की अमूर्त सांस्कृतिक धरोहर सूची में शामिल है। #राजस्थानजीके #Art",
  "🏛️ राजस्थान में 3 यूनेस्को विश्व धरोहर स्थल हैं - जंतर मंतर, आमेर किला, और हिल फोर्ट्स। #राजस्थानजीके #UNESCO",
  "🦚 राजस्थान का राजकीय पक्षी गोडावण है, जो विलुप्त होने के कगार पर है। #राजस्थानजीके #Wildlife",
  "🌵 राजस्थान में खेजड़ी को राज्य वृक्ष का दर्जा प्राप्त है। #राजस्थानजीके #Flora",
  "🏖️ राजस्थान का एकमात्र हिल स्टेशन माउंट आबू है। #राजस्थानजीके #Tourism",
  "💰 राजस्थान में सोने की खदानें हुंडेर (बांसवाड़ा) में स्थित हैं। #राजस्थानजीके #Mining",
  "🏺 राजस्थान के कालीबंगा में हड़प्पा सभ्यता के अवशेष मिले हैं। #राजस्थानजीके #History",
  "🎪 राजस्थान का पुष्कर मेला विश्व का सबसे बड़ा ऊंट मेला है। #राजस्थानजीके #Culture",
  "🏰 चित्तौड़गढ़ किला भारत का सबसे बड़ा किला है। #राजस्थानजीके #Forts",
  "💧 राजस्थान की एकमात्र बारहमासी नदी चंबल है। #राजस्थानजीके #Rivers",
  "🌸 राजस्थान का राजकीय फूल रोहिड़ा है। #राजस्थानजीके #Flora",
  "🎭 राजस्थान की कठपुतली कला विश्व प्रसिद्ध है। #राजस्थानजीके #Culture",
  "🏛️ राजस्थान की पहली महिला मुख्यमंत्री वसुंधरा राजे थीं। #राजस्थानजीके #Politics",
  "⚡ राजस्थान में सबसे ज्यादा सौर ऊर्जा का उत्पादन होता है। #राजस्थानजीके #Energy",
  "🏛️ जयपुर का हवा महल 953 झरोखों के साथ बना है। #राजस्थानजीके #Architecture",
  "🐯 राजस्थान में 3 राष्ट्रीय उद्यान हैं - रणथंभौर, सरिस्का, और केवलादेव। #राजस्थानजीके #Wildlife",
  "🌾 राजस्थान में सबसे ज्यादा बाजरे का उत्पादन होता है। #राजस्थानजीके #Agriculture",
  "🏛️ बीकानेर का जूनागढ़ किला कभी नहीं जीता गया। #राजस्थानजीके #Forts",
  "🎵 राजस्थान के लोक वाद्य यंत्र रावणहत्था और मांदल विश्व प्रसिद्ध हैं। #राजस्थानजीके #Music"
  // 🔄 ADD MORE FACTS HERE - Target 100+ facts
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
