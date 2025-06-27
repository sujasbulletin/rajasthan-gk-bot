// ===================================================================
// UPDATED TWITTERAPI.JS - Simplified Twitter Manager
// Replace your current netlify/functions/utils/twitterAPI.js with this
// ===================================================================

const { TwitterApi } = require('twitter-api-v2');

class TwitterManager {
  constructor() {
    this.client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });
  }

  // Create poll question (24-hour duration since no answers)
  async createPoll(question) {
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

    const response = await this.client.v2.tweet(pollOptions);
    return {
      success: true,
      tweet_id: response.data.id,
      question_id: question.id
    };
  }

  // Post regular content (facts/tips)
  async postContent(content) {
    const response = await this.client.v2.tweet(content);
    return {
      success: true,
      tweet_id: response.data.id
    };
  }

  // Test authentication
  async testAuth() {
    try {
      const user = await this.client.v2.me();
      return {
        success: true,
        user: {
          username: user.data.username,
          name: user.data.name,
          id: user.data.id
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = { TwitterManager };
