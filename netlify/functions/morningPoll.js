// Fixed morningPoll.js - Uses same approach as successful tests
const { TwitterApi } = require('twitter-api-v2');

/**
 * Utility functions
 */
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

  getISTTime: () => {
    return new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  },

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

/**
 * Sample Rajasthan GK Questions Database
 * Replace this with your actual database connection
 */
const sampleQuestions = [
  {
    id: 1,
    question: "राजस्थान की राजधानी कौन सी है?",
    options: ["जयपुर", "जोधपुर", "उदयपुर", "अजमेर"],
    correct: 0,
    explanation: "जयपुर राजस्थान की राजधानी है, जिसे 'गुलाबी शहर' भी कहा जाता है।",
    category: "geography",
    hashtags: ["#RajasthanGK", "#Geography"]
  },
  {
    id: 2,
    question: "राजस्थान का सबसे बड़ा जिला कौन सा है?",
    options: ["जैसलमेर", "बीकानेर", "जोधपुर", "उदयपुर"],
    correct: 0,
    explanation: "जैसलमेर राजस्थान का सबसे बड़ा जिला है, जो 38,401 वर्ग किमी में फैला है।",
    category: "geography", 
    hashtags: ["#RajasthanGK", "#Geography"]
  },
  {
    id: 3,
    question: "राजस्थान में कौन सा त्योहार 'रंगों का त्योहार' कहलाता है?",
    options: ["होली", "दीवाली", "गणगौर", "तीज"],
    correct: 0,
    explanation: "होली को 'रंगों का त्योहार' कहा जाता है और राजस्थान में यह बहुत धूमधाम से मनाया जाता है।",
    category: "culture",
    hashtags: ["#RajasthanGK", "#Culture", "#Festivals"]
  },
  {
    id: 4,
    question: "राजस्थान का राजकीय पशु कौन सा है?",
    options: ["चिंकारा", "ऊंट", "बाघ", "हिरण"],
    correct: 0,
    explanation: "चिंकारा (भारतीय गज़ेल) राजस्थान का राजकीय पशु है।",
    category: "general",
    hashtags: ["#RajasthanGK", "#StateSymbols"]
  },
  {
    id: 5,
    question: "राजस्थान में स्थित 'थार का घड़ा' किसे कहा जाता है?",
    options: ["जैसलमेर", "बीकानेर", "गंगानगर", "हनुमानगढ़"],
    correct: 0,
    explanation: "जैसलमेर को 'थार का घड़ा' और 'सुनहरा शहर' कहा जाता है।",
    category: "geography",
    hashtags: ["#RajasthanGK", "#Geography", "#Nicknames"]
  }
];

/**
 * Simple Database Helper
 */
class DatabaseHelper {
  constructor() {
    this.questions = sampleQuestions;
    this.usedQuestions = new Set();
  }

  async getNextQuestion() {
    Utils.log('DatabaseHelper', 'Getting next question');
    
    // Get unused questions
    const availableQuestions = this.questions.filter(q => !this.usedQuestions.has(q.id));
    
    // If all questions used, reset
    if (availableQuestions.length === 0) {
      Utils.log('DatabaseHelper', 'All questions used, resetting');
      this.usedQuestions.clear();
      return this.questions[Math.floor(Math.random() * this.questions.length)];
    }
    
    // Return random unused question
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions[randomIndex];
    
    Utils.log('DatabaseHelper', 'Selected question', { 
      id: selectedQuestion.id, 
      category: selectedQuestion.category 
    });
    
    return selectedQuestion;
  }

  async markQuestionPosted(questionId, tweetId) {
    Utils.log('DatabaseHelper', 'Marking question as posted', { questionId, tweetId });
    this.usedQuestions.add(questionId);
    return true;
  }

  async updateDailyStats() {
    Utils.log('DatabaseHelper', 'Updating daily stats');
    return true;
  }
}

/**
 * Main Morning Poll Function
 */
exports.handler = async (event, context) => {
  const functionName = 'morningPoll';
  Utils.log(functionName, 'Function started');

  try {
    // Validate environment variables
    if (!Utils.validateEnvironmentVariables()) {
      Utils.log(functionName, 'Missing environment variables');
      return Utils.createResponse(500, {
        success: false,
        error: 'Missing required environment variables'
      });
    }

    // Initialize Twitter client (same as successful tests)
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });

    Utils.log(functionName, 'Twitter client initialized');

    // Initialize database helper
    const dbHelper = new DatabaseHelper();

    // Get next question for poll
    Utils.log(functionName, 'Getting next question for poll');
    const question = await dbHelper.getNextQuestion();

    if (!question) {
      Utils.log(functionName, 'No questions available');
      return Utils.createResponse(404, {
        success: false,
        error: 'No questions available for posting'
      });
    }

    Utils.log(functionName, 'Selected question', { 
      id: question.id, 
      category: question.category 
    });

    // Prepare poll text with Hindi formatting
    const pollText = `📚 राजस्थान सामान्य ज्ञान\n\n${question.question}\n\n${question.hashtags.join(' ')} #MorningQuiz`;

    // Prepare poll data (same format as successful test)
    const pollOptions = {
      text: pollText,
      poll: {
        options: question.options,
        duration_minutes: 540 // 9 hours (9 AM to 6 PM)
      }
    };

    Utils.log(functionName, 'Creating poll on Twitter');
    Utils.log(functionName, 'Poll data', pollOptions);

    // Create poll using same method as successful test
    const pollTweet = await client.v2.tweet(pollOptions);

    Utils.log(functionName, 'Poll created successfully', {
      tweet_id: pollTweet.data.id,
      question_id: question.id
    });

    // Mark question as posted
    Utils.log(functionName, 'Marking question as posted');
    await dbHelper.markQuestionPosted(question.id, pollTweet.data.id);

    // Update daily stats
    await dbHelper.updateDailyStats();

    // Store poll info for evening answer function
    const pollInfo = {
      question_id: question.id,
      tweet_id: pollTweet.data.id,
      created_at: Utils.getISTTime(),
      correct_answer: question.correct,
      explanation: question.explanation,
      hashtags: question.hashtags,
      question: question.question,
      options: question.options
    };

    Utils.log(functionName, 'Poll posted successfully', pollInfo);

    return Utils.createResponse(200, {
      success: true,
      message: 'Morning poll posted successfully',
      data: {
        tweet_id: pollTweet.data.id,
        question_id: question.id,
        question: question.question,
        posted_at: Utils.getISTTime(),
        poll_url: `https://twitter.com/SujasBulletin/status/${pollTweet.data.id}`
      }
    });

  } catch (error) {
    Utils.log(functionName, 'Error occurred', { 
      error: error.message,
      code: error.code,
      type: error.type,
      stack: error.stack
    });
    
    return Utils.createResponse(500, {
      success: false,
      error: 'Failed to create poll: ' + error.message,
      details: {
        code: error.code,
        type: error.type
      }
    });
  }
};

/**
 * Handle manual testing
 */
if (require.main === module) {
  exports.handler({}, {}).then(result => {
    console.log('Manual test result:', JSON.stringify(result, null, 2));
  }).catch(error => {
    console.error('Manual test error:', error);
  });
}
