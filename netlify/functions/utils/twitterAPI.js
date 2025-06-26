const { TwitterApi } = require('twitter-api-v2');

class TwitterAPIHandler {
  constructor() {
    // Initialize Twitter API client with environment variables
    this.client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });
    
    // Get read-write access
    this.rwClient = this.client.readWrite;
  }

  /**
   * Create a poll tweet with 4 options
   * @param {Object} pollData - Poll configuration
   * @returns {Object} Tweet response with poll ID
   */
  async createPoll(pollData) {
    try {
      const { question, options, hashtags, duration = 540 } = pollData; // 9 hours default
      
      const tweetText = `🧠 राजस्थान जीके चैलेंज

${question}

A) ${options[0]}
B) ${options[1]}
C) ${options[2]}
D) ${options[3]}

⏰ परिणाम शाम 6 बजे!
👇 अपना जवाब दें!

${hashtags.join(' ')}`;

      const pollOptions = {
        poll: {
          options: options,
          duration_minutes: duration
        }
      };

      const response = await this.rwClient.v2.tweet(tweetText, pollOptions);
      
      console.log('Poll created successfully:', response.data);
      return {
        success: true,
        tweet_id: response.data.id,
        text: tweetText,
        poll_id: response.data.id
      };
      
    } catch (error) {
      console.error('Error creating poll:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Get poll results by tweet ID
   * @param {string} tweetId - Tweet ID containing the poll
   * @returns {Object} Poll results
   */
  async getPollResults(tweetId) {
    try {
      const response = await this.client.v2.singleTweet(tweetId, {
        'tweet.fields': ['attachments'],
        'poll.fields': ['options', 'voting_status', 'end_datetime']
      });

      if (response.data.attachments && response.data.attachments.poll_ids) {
        const pollId = response.data.attachments.poll_ids[0];
        const pollResponse = await this.client.v2.singlePoll(pollId, {
          'poll.fields': ['options', 'voting_status', 'end_datetime']
        });

        return {
          success: true,
          poll_data: pollResponse.data,
          is_closed: pollResponse.data.voting_status === 'closed'
        };
      }

      return {
        success: false,
        error: 'No poll found in tweet'
      };
      
    } catch (error) {
      console.error('Error fetching poll results:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Post answer with explanation and poll results
   * @param {Object} answerData - Answer data
   * @returns {Object} Tweet response
   */
  async postAnswer(answerData) {
    try {
      const { 
        correct_option, 
        explanation, 
        poll_results, 
        hashtags,
        original_tweet_id 
      } = answerData;

      let resultText = '';
      if (poll_results && poll_results.options) {
        resultText = poll_results.options.map((option, index) => {
          const letter = String.fromCharCode(65 + index); // A, B, C, D
          const votes = option.votes || 0;
          const total = poll_results.options.reduce((sum, opt) => sum + (opt.votes || 0), 0);
          const percentage = total > 0 ? Math.round((votes / total) * 100) : 0;
          return `${letter}) ${percentage}%`;
        }).join('\n');
      }

      const tweetText = `✅ सही जवाब: ${correct_option}

📝 व्याख्या: ${explanation}

📊 आज के परिणाम:
${resultText}

कल फिर नया सवाल! 🌟

${hashtags.join(' ')} #Answer`;

      const tweetOptions = {};
      if (original_tweet_id) {
        tweetOptions.reply = { in_reply_to_tweet_id: original_tweet_id };
      }

      const response = await this.rwClient.v2.tweet(tweetText, tweetOptions);
      
      console.log('Answer posted successfully:', response.data);
      return {
        success: true,
        tweet_id: response.data.id,
        text: tweetText
      };
      
    } catch (error) {
      console.error('Error posting answer:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Post regular content (motivational quotes, tips, facts)
   * @param {string} content - Tweet content
   * @returns {Object} Tweet response
   */
  async postTweet(content) {
    try {
      const response = await this.rwClient.v2.tweet(content);
      
      console.log('Tweet posted successfully:', response.data);
      return {
        success: true,
        tweet_id: response.data.id,
        text: content
      };
      
    } catch (error) {
      console.error('Error posting tweet:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Get user's recent tweets for monitoring
   * @param {number} count - Number of recent tweets to fetch
   * @returns {Object} Recent tweets
   */
  async getRecentTweets(count = 10) {
    try {
      const user = await this.client.v2.me();
      const tweets = await this.client.v2.userTimeline(user.data.id, {
        max_results: count,
        'tweet.fields': ['created_at', 'public_metrics']
      });

      return {
        success: true,
        tweets: tweets.data
      };
      
    } catch (error) {
      console.error('Error fetching recent tweets:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = { TwitterAPIHandler };
