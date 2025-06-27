// ===================================================================
// FILE: netlify/functions/postQuestion.js
// Handles posting questions as polls
// ===================================================================

const { TwitterApi } = require('twitter-api-v2');
const { ContentManager, Utils } = require('./utils/helpers');

exports.handler = async (event, context) => {
  const functionName = 'postQuestion';
  Utils.log(functionName, 'Function started');

  try {
    if (!Utils.validateEnvironmentVariables()) {
      return Utils.createResponse(500, { 
        success: false, 
        error: 'Missing environment variables' 
      });
    }

    // Initialize Twitter client directly
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });

    const contentManager = new ContentManager();

    const question = contentManager.getNextQuestion();
    Utils.log(functionName, 'Selected question', { 
      id: question.id, 
      category: question.category,
      difficulty: question.difficulty 
    });

    // Create poll using direct client
    const difficultyEmoji = {
      'easy': '✨',
      'medium': '⚡',
      'hard': '🔥'
    };

    const pollText = `📚 राजस्थान सामान्य ज्ञान ${difficultyEmoji[question.difficulty] || '⚡'}\n\n${question.question}\n\n${question.hashtags.join(' ')} #DailyQuiz`;
    
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

    Utils.log(functionName, 'Question posted successfully', result);

    return Utils.createResponse(200, {
      success: true,
      message: 'Question posted successfully',
      data: {
        ...result,
        question_category: question.category,
        question_difficulty: question.difficulty,
        posted_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
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
