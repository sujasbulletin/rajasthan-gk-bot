const { TwitterAPIHandler } = require('./utils/twitterAPI');
const { DatabaseHelper, Utils } = require('./utils/helpers');
const fs = require('fs').promises;
const path = require('path');

/**
 * Evening Answer Function - Runs daily at 6 PM IST
 * Posts the correct answer with explanation and poll results
 */
exports.handler = async (event, context) => {
  const functionName = 'eveningAnswer';
  Utils.log(functionName, 'Function started');

  try {
    // Validate environment variables
    if (!Utils.validateEnvironmentVariables()) {
      Utils.log(functionName, 'Missing environment variables');
      return Utils.createResponse(500, {
        success: false,
        error: 'Missing required environment variables'
      });
    }

    // Initialize handlers
    const twitterAPI = new TwitterAPIHandler();
    const dbHelper = new DatabaseHelper();

    // Load current poll info
    const tempPath = path.join(process.cwd(), 'data', 'current_poll.json');
    let pollInfo;
    
    try {
      const pollData = await fs.readFile(tempPath, 'utf8');
      pollInfo = JSON.parse(pollData);
      Utils.log(functionName, 'Loaded poll info', { 
        question_id: pollInfo.question_id,
        tweet_id: pollInfo.tweet_id 
      });
    } catch (error) {
      Utils.log(functionName, 'No current poll found', { error: error.message });
      
      // Fallback: Find today's posted question
      const db = await dbHelper.loadDatabase();
      const today = new Date().toISOString().split('T')[0];
      const todayQuestion = db.questions.find(q => 
        q.posted && q.posted_date && q.posted_date.startsWith(today)
      );
      
      if (!todayQuestion) {
        return Utils.createResponse(404, {
          success: false,
          error: 'No poll found for today'
        });
      }
      
      pollInfo = {
        question_id: todayQuestion.id,
        tweet_id: todayQuestion.tweet_id,
        correct_answer: todayQuestion.correct,
        explanation: todayQuestion.explanation,
        hashtags: todayQuestion.hashtags
      };
    }

    // Get poll results from Twitter
    Utils.log(functionName, 'Fetching poll results from Twitter');
    const pollResults = await Utils.retryWithBackoff(
      () => twitterAPI.getPollResults(pollInfo.tweet_id),
      3,
      2000
    );

    if (!pollResults.success) {
      Utils.log(functionName, 'Failed to fetch poll results', { 
        error: pollResults.error 
      });
    }

    // Get the question data for correct option text
    const question = await dbHelper.getQuestionById(pollInfo.question_id);
    if (!question) {
      Utils.log(functionName, 'Question not found in database');
      return Utils.createResponse(404, {
        success: false,
        error: 'Question not found'
      });
    }

    // Prepare answer data
    const correctOptionText = question.options[question.correct];
    const answerData = {
      correct_option: `${String.fromCharCode(65 + question.correct)}) ${correctOptionText}`,
      explanation: question.explanation,
      poll_results: pollResults.success ? pollResults.poll_data : null,
      hashtags: question.hashtags,
      original_tweet_id: pollInfo.tweet_id
    };

    // Post answer with retry mechanism
    Utils.log(functionName, 'Posting answer tweet');
    const answerResult = await Utils.retryWithBackoff(
      () => twitterAPI.postAnswer(answerData),
      3,
      2000
    );

    if (!answerResult.success) {
      Utils.log(functionName, 'Failed to post answer', { 
        error: answerResult.error 
      });
      return Utils.createResponse(500, {
        success: false,
        error: 'Failed to post answer: ' + answerResult.error
      });
    }

    // Clean up current poll file
    try {
      await fs.unlink(tempPath);
      Utils.log(functionName, 'Cleaned up poll temp file');
    } catch (error) {
      Utils.log(functionName, 'Could not clean up temp file', { 
        error: error.message 
      });
    }

    // Calculate engagement metrics if poll results available
    let engagement = { total_votes: 0, correct_percentage: 0 };
    if (pollResults.success && pollResults.poll_data.options) {
      const totalVotes = pollResults.poll_data.options.reduce(
        (sum, option) => sum + (option.votes || 0), 0
      );
      const correctVotes = pollResults.poll_data.options[question.correct]?.votes || 0;
      
      engagement = {
        total_votes: totalVotes,
        correct_percentage: totalVotes > 0 ? Math.round((correctVotes / totalVotes) * 100) : 0
      };
    }

    Utils.log(functionName, 'Answer posted successfully', {
      answer_tweet_id: answerResult.tweet_id,
      original_tweet_id: pollInfo.tweet_id,
      engagement
    });

    return Utils.createResponse(200, {
      success: true,
      message: 'Evening answer posted successfully',
      data: {
        answer_tweet_id: answerResult.tweet_id,
        original_tweet_id: pollInfo.tweet_id,
        question_id: pollInfo.question_id,
        engagement,
        posted_at: Utils.getISTTime()
      }
    });

  } catch (error) {
    Utils.log(functionName, 'Unexpected error', { error: error.message });
    
    return Utils.createResponse(500, {
      success: false,
      error: 'Internal server error: ' + error.message
    });
  }
};

/**
 * Handle manual testing
 */
if (require.main === module) {
  exports.handler({}, {}).then(result => {
    console.log('Manual test result:', JSON.stringify(result, null, 2));
  }).catch(error => {
    console.error('Manual test error:', error);
  });
}
