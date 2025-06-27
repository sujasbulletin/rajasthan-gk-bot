// Netlify Function: /.netlify/functions/testPoll.js
// This function tests poll creation specifically

const { TwitterApi } = require('twitter-api-v2');

exports.handler = async (event, context) => {
  console.log('📊 Starting Twitter Poll Test...');
  
  try {
    // Initialize Twitter client
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });

    console.log('✅ Twitter client initialized');

    // Test: Create a poll (this is what was failing in your original bot)
    console.log('🧪 Testing poll creation...');
    
    const pollOptions = {
      text: '📚 राजस्थान GK Test Poll\n\nराजस्थान की राजधानी कौन सी है?\n\n#RajasthanGK #Test',
      poll: {
        options: ['जयपुर', 'जोधपुर', 'उदयपुर', 'अजमेर'],
        duration_minutes: 60
      }
    };

    console.log('Poll data:', JSON.stringify(pollOptions, null, 2));

    try {
      const pollTweet = await client.v2.tweet(pollOptions);
      
      console.log('✅ SUCCESS: Poll created successfully!');
      console.log('Poll Tweet ID:', pollTweet.data.id);
      
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: true,
          message: 'Poll created successfully!',
          tweetId: pollTweet.data.id,
          pollData: pollOptions
        }, null, 2)
      };
      
    } catch (pollError) {
      console.error('❌ Poll creation failed:', pollError);
      console.log('Error code:', pollError.code);
      console.log('Error message:', pollError.message);
      console.log('Error type:', pollError.type);
      console.log('Error status:', pollError.status);
      console.log('Error details:', JSON.stringify(pollError.data || pollError.errors || {}, null, 2));
      
      // Let's also try to understand what permissions we have
      console.log('🔍 Checking what we can access...');
      try {
        const me = await client.v2.me();
        console.log('✅ Can access user info:', me.data.username);
      } catch (meError) {
        console.log('❌ Cannot access user info:', meError.message);
      }
      
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: false,
          error: 'Poll creation failed',
          code: pollError.code,
          status: pollError.status,
          message: pollError.message,
          type: pollError.type,
          details: pollError.data || pollError.errors || null,
          rawError: {
            name: pollError.name,
            message: pollError.message,
            stack: pollError.stack?.split('\n')[0] // Just first line of stack
          }
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
