const { TwitterAPIHandler } = require('./utils/twitterAPI');
const { DatabaseHelper, Utils } = require('./utils/helpers');

/**
 * Morning Poll Function - Runs daily at 9 AM IST
 * Posts a Rajasthan GK poll with 4 options
 */
exports.handler = async (event, context) => {
  const functionName = 'morningPoll';
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

    // Get next question for poll
    Utils.log(functionName, 'Getting next question for poll');
    const question = await dbHelper.getNextQuestion();

    if (!question) {
      Utils.log(functionName, 'No questions available');
      return Utils.createResponse(404, {
        success: false,
        error: 'No questions available for posting'
      });
    }

    Utils.log(functionName, 'Selected question', { 
      id: question.id, 
      category: question.category 
    });

    // Prepare poll data
    const pollData = {
      question: question.question,
      options: question.options,
      hashtags: question.hashtags,
      duration: 540 // 9 hours (9 AM to 6 PM)
    };

    // Create poll with retry mechanism
    Utils.log(functionName, 'Creating poll on Twitter');
    const pollResult = await Utils.retryWithBackoff(
      () => twitterAPI.createPoll(pollData),
      3,
      2000
    );

    if (!pollResult.success) {
      Utils.log(functionName, 'Failed to create poll', { error: pollResult.error });
      return Utils.createResponse(500, {
        success: false,
        error: 'Failed to create poll: ' + pollResult.error
      });
    }

    // Mark question as posted
    Utils.log(functionName, 'Marking question as posted');
    await dbHelper.markQuestionPosted(question.id, pollResult.tweet_id);

    // Update daily stats
    await dbHelper.updateDailyStats();

    // Store poll info for evening answer function
    const pollInfo = {
      question_id: question.id,
      tweet_id: pollResult.tweet_id,
      poll_id: pollResult.poll_id,
      created_at: Utils.getISTTime(),
      correct_answer: question.correct,
      explanation: question.explanation,
      hashtags: question.hashtags
    };

    // Save poll info to temporary storage (you might want to use a better solution for production)
    const fs = require('fs').promises;
    const path = require('path');
    const tempPath = path.join(process.cwd(), 'data', 'current_poll.json');
    
    try {
      await fs.writeFile(tempPath, JSON.stringify(pollInfo, null, 2));
      Utils.log(functionName, 'Poll info saved for evening function');
    } catch (error) {
      Utils.log(functionName, 'Warning: Could not save poll info', { error: error.message });
    }

    Utils.log(functionName, 'Poll created successfully', {
      tweet_id: pollResult.tweet_id,
      question_id: question.id
    });

    return Utils.createResponse(200, {
      success: true,
      message: 'Morning poll posted successfully',
      data: {
        tweet_id: pollResult.tweet_id,
        question_id: question.id,
        question: question.question,
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
 * This allows you to test the function manually via HTTP request
 */
if (require.main === module) {
  // Manual test execution
  exports.handler({}, {}).then(result => {
    console.log('Manual test result:', JSON.stringify(result, null, 2));
  }).catch(error => {
    console.error('Manual test error:', error);
  });
}
