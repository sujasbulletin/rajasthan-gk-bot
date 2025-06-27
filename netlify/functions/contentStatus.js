// ===================================================================
// FILE: netlify/functions/contentStatus.js
// Dashboard to monitor content usage and stats
// ===================================================================

const { ContentManager, Utils, QUESTION_POOL, CUSTOM_FACTS, STUDY_TIPS } = require('./utils/helpers');

exports.handler = async (event, context) => {
  try {
    const contentManager = new ContentManager();
    const stats = contentManager.getStats();
    
    return Utils.createResponse(200, {
      success: true,
      message: 'Content status retrieved successfully',
      data: {
        current_time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        server_time: new Date().toISOString(),
        
        content_stats: stats,
        
        posting_schedule: {
          questions_per_day: 3,
          facts_per_day: 9,
          tips_per_day: 5,
          total_posts_per_day: 17,
          estimated_monthly_posts: 510
        },
        
        recommendations: {
          questions_needed: Math.max(0, 50 - QUESTION_POOL.length),
          facts_needed: Math.max(0, 100 - CUSTOM_FACTS.length),
          tips_sufficient: STUDY_TIPS.length >= 15,
          content_status: QUESTION_POOL.length >= 30 ? 'Good' : 'Need More Content'
        },
        
        content_breakdown: {
          question_categories: [...new Set(QUESTION_POOL.map(q => q.category))],
          difficulty_levels: [...new Set(QUESTION_POOL.map(q => q.difficulty))],
          category_count: QUESTION_POOL.reduce((acc, q) => {
            acc[q.category] = (acc[q.category] || 0) + 1;
            return acc;
          }, {}),
          difficulty_count: QUESTION_POOL.reduce((acc, q) => {
            acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
            return acc;
          }, {})
        },
        
        daily_progress: {
          questions_posted_today: stats.used_today.questions,
          facts_posted_today: stats.used_today.facts,
          tips_posted_today: stats.used_today.tips,
          total_posted_today: stats.used_today.questions + stats.used_today.facts + stats.used_today.tips,
          remaining_for_today: {
            questions: Math.max(0, 3 - stats.used_today.questions),
            facts: Math.max(0, 9 - stats.used_today.facts),
            tips: Math.max(0, 5 - stats.used_today.tips)
          }
        }
      }
    });
  } catch (error) {
    return Utils.createResponse(500, { 
      success: false, 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
};
