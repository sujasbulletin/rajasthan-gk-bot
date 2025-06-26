const fs = require('fs').promises;
const path = require('path');

class DatabaseHelper {
  constructor() {
    // Use environment variable for questions if available, otherwise default questions
    this.defaultQuestions = [
      {
        "id": 1,
        "question": "राजस्थान की राजधानी कौन सी है?",
        "options": ["जयपुर", "जोधपुर", "उदयपुर", "कोटा"],
        "correct": 0,
        "explanation": "जयपुर राजस्थान की राजधानी है और इसे गुलाबी शहर भी कहते हैं।",
        "category": "geography",
        "hashtags": ["#राजस्थानजीके", "#जयपुर", "#राजधानी"],
        "posted": false,
        "posted_date": null,
        "tweet_id": null
      },
      {
        "id": 2,
        "question": "राजस्थान का सबसे बड़ा जिला कौन सा है?",
        "options": ["जैसलमेर", "बाड़मेर", "बीकानेर", "जोधपुर"],
        "correct": 0,
        "explanation": "जैसलमेर राजस्थान का सबसे बड़ा जिला है।",
        "category": "geography",
        "hashtags": ["#राजस्थानजीके", "#जैसलमेर", "#भूगोल"],
        "posted": false,
        "posted_date": null,
        "tweet_id": null
      }
    ];
  }

  async loadDatabase() {
    try {
      // Try to load from environment variable first
      if (process.env.QUESTIONS_DATABASE) {
        return JSON.parse(process.env.QUESTIONS_DATABASE);
      }
      
      // Fallback to default questions
      return {
        questions: this.defaultQuestions,
        metadata: {
          total_questions: this.defaultQuestions.length,
          last_updated: new Date().toISOString(),
          version: "1.0"
        }
      };
    } catch (error) {
      console.error('Error loading database:', error);
      throw new Error('Failed to load questions database');
    }
  }

  async saveDatabase(data) {
    try {
      // In production, you'd save this back to environment or external storage
      // For now, we'll just log it
      console.log('Database updated in memory');
      return true;
    } catch (error) {
      console.error('Error saving database:', error);
      throw new Error('Failed to save questions database');
    }
  }

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
        availableQuestions = db.questions;
      }
      
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

  async markQuestionPosted(questionId, tweetId) {
    try {
      console.log(`Question ${questionId} marked as posted with tweet ${tweetId}`);
      return true;
    } catch (error) {
      console.error('Error marking question as posted:', error);
    }
  }

  async getQuestionById(questionId) {
    try {
      const db = await this.loadDatabase();
      return db.questions.find(q => q.id === questionId);
    } catch (error) {
      console.error('Error getting question by ID:', error);
      return null;
    }
  }
}

class Utils {
  static getISTTime() {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + istOffset);
    return istTime.toISOString();
  }

  static log(functionName, message, data = null) {
    const timestamp = Utils.getISTTime();
    console.log(`[${timestamp}] [${functionName}] ${message}`);
    if (data) {
      console.log(`[${timestamp}] [${functionName}] Data:`, JSON.stringify(data, null, 2));
    }
  }

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
