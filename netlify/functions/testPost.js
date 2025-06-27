// Netlify Function: /.netlify/functions/testPost.js
// This function tests actual posting capability

const { TwitterApi } = require('twitter-api-v2');

exports.handler = async (event, context) => {
  console.log('🐦 Starting Twitter Post Test...');
  
  try {
    // Initialize Twitter client
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });

    console.log('✅ Twitter client initialized');

    // Test 1: Try to create a simple test tweet
    console.log('🧪 Test 1: Attempting to post a simple tweet...');
    try {
      const testTweet = await client.v2.tweet({
        text: '🧪 Bot test - This is a test post from Rajasthan GK Bot. Will delete shortly. #Test'
      });
      
      console.log('✅ SUCCESS: Tweet posted successfully!');
      console.log('Tweet ID:', testTweet.data.id);
      
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: true,
          message: 'Tweet posted successfully!',
          tweetId: testTweet.data.id,
          tweetText: testTweet.data.text
        }, null, 2)
      };
      
    } catch (tweetError) {
      console.error('❌ Tweet posting failed:', tweetError);
      console.log('Error code:', tweetError.code);
      console.log('Error message:', tweetError.message);
      console.log('Error details:', JSON.stringify(tweetError.data || tweetError.errors || {}, null, 2));
      
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: false,
          error: 'Tweet posting failed',
          code: tweetError.code,
          message: tweetError.message,
          details: tweetError.data || tweetError.errors || null
        }, null, 2)
      };
    }

  } catch (error) {
    console.error('❌ General error:', error);
    
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: false,
        error: error.message,
        type: 'general_error'
      }, null, 2)
    };
  }
};
