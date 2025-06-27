// ===================================================================
// FILE: netlify/functions/postFact.js
// Handles posting custom facts
// ===================================================================

const { TwitterApi } = require('twitter-api-v2');
const { ContentManager, Utils } = require('./utils/helpers');

exports.handler = async (event, context) => {
  const functionName = 'postFact';
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

    const fact = contentManager.getRandomFact();
    const response = await client.v2.tweet(fact);
    
    const result = {
      success: true,
      tweet_id: response.data.id
    };

    Utils.log(functionName, 'Fact posted successfully', result);

    return Utils.createResponse(200, {
      success: true,
      message: 'Fact posted successfully',
      data: {
        ...result,
        content_preview: fact.substring(0, 50) + '...',
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
