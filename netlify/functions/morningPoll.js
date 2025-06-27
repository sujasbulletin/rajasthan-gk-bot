// ===================================================================
// FILE: netlify/functions/morningPoll.js
// Updated to use new system - posts questions like other functions
// ===================================================================

const { TwitterApi } = require('twitter-api-v2');
const { ContentManager, Utils } = require('./utils/helpers');

exports.handler = async (event, context) => {
  const functionName = 'morningPoll';
  Utils.log(functionName, 'Function started');

  try {
    if (!Utils.validateEnvironmentVariables()) {
      return Utils.createResponse(500, { 
        success: false, 
        error: 'Missing environment variables' 
      });
    }

    // Initialize Twitter client directly (same as working tests)
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });

    const contentManager = new ContentManager();

    const question = contentManager.getNextQuestion();
    Utils.log(functionName, 'Selected morning question', { 
      id: question.id, 
      category: question.category,
      difficulty: question.difficulty 
    });

    // Create poll using direct client (same format as successful tests)
    const difficultyEmoji = {
      'easy': '✨',
      'medium': '⚡',
      'hard': '🔥'
    };

    const pollText = `📚 राजस्थान सामान्य ज्ञान ${difficultyEmoji[question.difficulty] || '⚡'}\n\n${question.question}\n\n${question.hashtags.join(' ')} #MorningQuiz`;
    
    const pollOptions = {
      text: pollText,
      poll: {
        options: question.options,
        duration_minutes: 1440 // 24 hours
      }
    };

    const response = await client.v2.tweet(pollOptions);
    
    const result = {
      success: true,
      tweet_id: response.data.id,
      question_id: question.id
    };

    Utils.log(functionName, 'Morning question posted successfully', result);

    return Utils.createResponse(200, {
      success: true,
      message: 'Morning question posted successfully',
      data: {
        ...result,
        question_category: question.category,
        question_difficulty: question.difficulty,
        posted_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        poll_url: `https://twitter.com/SujasBulletin/status/${response.data.id}`
      }
    });

  } catch (error) {
    Utils.log(functionName, 'Error', { error: error.message });
    return Utils.createResponse(500, { 
      success: false, 
      error: error.message 
    });
  }
};
