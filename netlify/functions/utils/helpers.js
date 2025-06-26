const fs = require('fs').promises;
const path = require('path');

class DatabaseHelper {
  constructor() {
    this.dataPath = path.join(__dirname, '../../../data', 'questions.json');
  }

  /**
   * Load questions database
   * @returns {Object} Questions data
   */
  async loadDatabase() {
    try {
      const data = await fs.readFile(this.dataPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading database:', error);
      throw new Error('Failed to load questions database');
    }
  }

  /**
   * Save questions database
   * @param {Object} data - Database data to save
   */
  async saveDatabase(data) {
    try {
      await fs.writeFile(this.dataPath, JSON.stringify(data, null, 2));
      console.log('Database saved successfully');
    } catch (error) {
      console.error('Error saving database:', error);
      throw new Error('Failed to save questions database');
    }
  }

  /**
   * Get next unposted question
   * @param {string} category - Optional category filter
   * @returns {Object} Next question or null
   */
  async getNextQuestion(category = null) {
    try {
      const db = await this.loadDatabase();
      
      let availableQuestions = db.questions.filter(q => !q.posted);
      
      if (category) {
        availableQuestions = availableQuestions.filter(q => q.category === category);
      }
      
      if (availableQuestions.length === 0) {
        // Reset all questions if none available
        db.questions.forEach(q => {
          q.posted = false;
          q.posted_date = null;
          q.tweet_id = null;
        });
        
        await this.saveDatabase(db);
        availableQuestions = db.questions.filter(q => 
          category ? q.category === category : true
        );
      }
      
      // Return random question from available ones
      if (availableQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        return availableQuestions[randomIndex];
      }
      
      return null;
    } catch (error) {
      console.error('Error getting next question:', error);
      return null;
    }
  }

  /**
   * Mark question as posted
   * @param {number} questionId - Question ID
   * @param {string} tweetId - Tweet ID
   */
  async markQuestionPosted(questionId, tweetId) {
    try {
      const db = await this.loadDatabase();
      const question = db.questions.find(q => q.id === questionId);
      
      if (question) {
        question.posted = true;
        question.posted_date = new Date().toISOString();
        question.tweet_id = tweetId;
        
        // Update metadata
        db.metadata.last_updated = new Date().toISOString();
        
        await this.saveDatabase(db);
        console.log(`Question ${questionId} marked as posted`);
      }
    } catch (error) {
      console.error('Error marking question as posted:', error);
    }
  }

  /**
   * Get question by ID
   * @param {number} questionId - Question ID
   * @returns {Object} Question data
   */
  async getQuestionById(questionId) {
    try {
      const db = await this.loadDatabase();
      return db.questions.find(q => q.id === questionId);
    } catch (error) {
      console.error('Error getting question by ID:', error);
      return null;
    }
  }

  /**
   * Get random content by type
   * @param {string} contentType - Type of content (motivational_quotes, study_tips, cultural_facts)
   * @returns {string} Random content
   */
  async getRandomContent(contentType) {
    try {
      const db = await this.loadDatabase();
      const content = db[contentType];
      
      if (content && content.length > 0) {
        const randomIndex = Math.floor(Math.random() * content.length);
        return content[randomIndex];
      }
      
      return null;
    } catch (error) {
      console.error('Error getting random content:', error);
      return null;
    }
  }

  /**
   * Update daily stats
   */
  async updateDailyStats() {
    try {
      const db = await this.loadDatabase();
      const today = new Date().toISOString().split('T')[0];
      
      if (db.metadata.last_post_date !== today) {
        db.metadata.questions_posted_today = 0;
        db.metadata.last_post_date = today;
      }
      
      db.metadata.questions_posted_today += 1;
      await this.saveDatabase(db);
    } catch (error) {
      console.error('Error updating daily stats:', error);
    }
  }

  /**
   * Get database statistics
   * @returns {Object} Database stats
   */
  async getStats() {
    try {
      const db = await this.loadDatabase();
      const totalQuestions = db.questions.length;
      const postedQuestions = db.questions.filter(q => q.posted).length;
      const availableQuestions = totalQuestions - postedQuestions;
      
      const categoryStats = {};
      db.questions.forEach(q => {
        if (!categoryStats[q.category]) {
          categoryStats[q.category] = { total: 0, posted: 0 };
        }
        categoryStats[q.category].total += 1;
        if (q.posted) {
          categoryStats[q.category].posted += 1;
        }
      });
      
      return {
        total_questions: totalQuestions,
        posted_questions: postedQuestions,
        available_questions: availableQuestions,
        questions_posted_today: db.metadata.questions_posted_today || 0,
        last_post_date: db.metadata.last_post_date,
        category_stats: categoryStats,
        last_updated: db.metadata.last_updated
      };
    } catch (error) {
      console.error('Error getting stats:', error);
      return null;
    }
  }
}

/**
 * Utility functions
 */
class Utils {
  /**
   * Generate IST timestamp
   * @returns {string} IST timestamp
   */
  static getISTTime() {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    const istTime = new Date(now.getTime() + istOffset);
    return istTime.toISOString();
  }

  /**
   * Log function activity
   * @param {string} functionName - Name of the function
   * @param {string} message - Log message
   * @param {Object} data - Additional data
   */
  static log(functionName, message, data = null) {
    const timestamp = Utils.getISTTime();
    console.log(`[${timestamp}] [${functionName}] ${message}`);
    if (data) {
      console.log(`[${timestamp}] [${functionName}] Data:`, JSON.stringify(data, null, 2));
    }
  }

  /**
   * Create API response
   * @param {number} statusCode - HTTP status code
   * @param {Object} body - Response body
   * @returns {Object} Netlify function response
   */
  static createResponse(statusCode, body) {
    return {
      statusCode,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      },
      body: JSON.stringify(body)
    };
  }

  /**
   * Validate required environment variables
   * @returns {boolean} True if all required env vars are present
   */
  static validateEnvironmentVariables() {
    const required = [
      'TWITTER_API_KEY',
      'TWITTER_API_SECRET', 
      'TWITTER_ACCESS_TOKEN',
      'TWITTER_ACCESS_TOKEN_SECRET'
    ];
    
    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
      console.error('Missing environment variables:', missing);
      return false;
    }
    
    return true;
  }

  /**
   * Generate hashtags based on category
   * @param {string} category - Question category
   * @returns {Array} Array of hashtags
   */
  static generateHashtags(category) {
    const baseHashtags = ['#राजस्थानजीके'];
    
    const categoryHashtags = {
      geography: ['#भूगोल', '#राजस्थान'],
      history: ['#इतिहास', '#महाराणाप्रताप'],
      schemes: ['#सरकारीयोजना', '#कल्याणकारी'],
      culture: ['#संस्कृति', '#त्योहार'],
      general: ['#सामान्यज्ञान', '#राज्यसरकार'],
      current_affairs: ['#समसामयिकी', '#न्यूज़']
    };
    
    return [...baseHashtags, ...(categoryHashtags[category] || ['#ज्ञान'])];
  }

  /**
   * Retry function with exponential backoff
   * @param {Function} fn - Function to retry
   * @param {number} maxRetries - Maximum number of retries
   * @param {number} delay - Initial delay in ms
   * @returns {Promise} Function result
   */
  static async retryWithBackoff(fn, maxRetries = 3, delay = 1000) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        
        const waitTime = delay * Math.pow(2, i);
        console.log(`Retry ${i + 1}/${maxRetries} after ${waitTime}ms`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }
}

module.exports = { DatabaseHelper, Utils };
