// Netlify Function: /.netlify/functions/testAuth.js
// This function tests your Twitter API authentication without posting

const { TwitterApi } = require('twitter-api-v2');

exports.handler = async (event, context) => {
  console.log('🔍 Starting Twitter Auth Test...');
  
  try {
    // Get environment variables
    const apiKey = process.env.TWITTER_API_KEY;
    const apiSecret = process.env.TWITTER_API_SECRET;
    const accessToken = process.env.TWITTER_ACCESS_TOKEN;
    const accessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET;

    // Log token formats (without revealing actual values)
    console.log('📊 Token Format Check:');
    console.log(`API Key length: ${apiKey?.length || 0}`);
    console.log(`API Secret length: ${apiSecret?.length || 0}`);
    console.log(`Access Token length: ${accessToken?.length || 0}`);
    console.log(`Access Token Secret length: ${accessTokenSecret?.length || 0}`);
    
    // Check if Access Token has correct format (should contain dash)
    const hasCorrectTokenFormat = accessToken && accessToken.includes('-');
    console.log(`Access Token format check (should contain dash): ${hasCorrectTokenFormat}`);

    // Check if all tokens are present
    if (!apiKey || !apiSecret || !accessToken || !accessTokenSecret) {
      throw new Error('Missing required environment variables');
    }

    // Initialize Twitter client
    const client = new TwitterApi({
      appKey: apiKey,
      appSecret: apiSecret,
      accessToken: accessToken,
      accessSecret: accessTokenSecret,
    });

    console.log('✅ Twitter client initialized');

    // Test 1: Verify credentials (this should work with read permissions)
    console.log('🧪 Test 1: Verifying credentials...');
    const user = await client.v2.me();
    console.log(`✅ Authenticated as: @${user.data.username} (${user.data.name})`);

    // Test 2: Check app permissions
    console.log('🧪 Test 2: Checking app permissions...');
    try {
      // Try to get user's tweets (requires read permission)
      const tweets = await client.v2.userTimeline(user.data.id, { max_results: 5 });
      console.log(`✅ Read permission confirmed - found ${tweets.data?.data?.length || 0} recent tweets`);
    } catch (readError) {
      console.log('❌ Read permission test failed:', readError.message);
    }

    // Test 3: Test write permissions (without actually posting)
    console.log('🧪 Test 3: Testing write permissions...');
    try {
      // We'll use the media upload endpoint as a test - it requires write permissions
      // but we won't actually upload anything
      const uploadTest = await client.v1.uploadMedia(Buffer.from('test'), { type: 'image/png' });
      console.log('❌ Unexpected success with empty media upload');
    } catch (writeError) {
      if (writeError.message.includes('media parameter is missing') || 
          writeError.message.includes('Invalid media')) {
        console.log('✅ Write permission confirmed (got expected media error)');
      } else if (writeError.code === 401) {
        console.log('❌ Write permission denied - 401 error');
      } else {
        console.log('⚠️ Write permission test inconclusive:', writeError.message);
      }
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        message: 'Authentication test completed',
        user: {
          username: user.data.username,
          name: user.data.name,
          id: user.data.id
        },
        tokenFormats: {
          hasCorrectAccessTokenFormat: hasCorrectTokenFormat,
          tokenLengths: {
            apiKey: apiKey.length,
            apiSecret: apiSecret.length,
            accessToken: accessToken.length,
            accessTokenSecret: accessTokenSecret.length
          }
        }
      }, null, 2)
    };

  } catch (error) {
    console.error('❌ Auth test failed:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        error: error.message,
        code: error.code || 'UNKNOWN',
        details: error.data || error.errors || null
      }, null, 2)
    };
  }
};
