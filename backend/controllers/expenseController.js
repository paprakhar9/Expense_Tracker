const Expense = require('../models/Expense');

// @desc    Get all expenses
// @route   GET /api/expenses
// @access  Public
exports.getExpenses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query
    const query = {};
    if (req.query.category) {
      query.category = req.query.category;
    }
    if (req.query.startDate || req.query.endDate) {
      query.date = {};
      if (req.query.startDate) {
        query.date.$gte = new Date(req.query.startDate);
      }
      if (req.query.endDate) {
        query.date.$lte = new Date(req.query.endDate);
      }
    }

    const expenses = await Expense.find(query)
      .sort({ date: -1 })
      .limit(limit)
      .skip(skip);

    const count = await Expense.countDocuments(query);

    res.status(200).json({
      success: true,
      count: expenses.length,
      total: count,
      page,
      pages: Math.ceil(count / limit),
      data: expenses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single expense
// @route   GET /api/expenses/:id
// @access  Public
exports.getExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        error: 'Expense not found'
      });
    }

    res.status(200).json({
      success: true,
      data: expense
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create expense
// @route   POST /api/expenses
// @access  Public
exports.createExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body);

    res.status(201).json({
      success: true,
      data: expense
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update expense
// @route   PUT /api/expenses/:id
// @access  Public
exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!expense) {
      return res.status(404).json({
        success: false,
        error: 'Expense not found'
      });
    }

    res.status(200).json({
      success: true,
      data: expense
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete expense
// @route   DELETE /api/expenses/:id
// @access  Public
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        error: 'Expense not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Expense deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get monthly totals
// @route   GET /api/expenses/monthly/totals
// @access  Public
exports.getMonthlyTotals = async (req, res) => {
  try {
    const year = parseInt(req.query.year) || new Date().getFullYear();
    const month = req.query.month ? parseInt(req.query.month) : null;

    const matchStage = {
      $expr: { $eq: [{ $year: '$date' }, year] }
    };

    if (month) {
      matchStage.$expr = {
        $and: [
          { $eq: [{ $year: '$date' }, year] },
          { $eq: [{ $month: '$date' }, month] }
        ]
      };
    }

    const result = await Expense.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: { month: { $month: '$date' }, year: { $year: '$date' } },
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const formattedResult = result.map(item => ({
      month: monthNames[item._id.month - 1],
      year: item._id.year,
      total: Math.round(item.total * 100) / 100,
      count: item.count
    }));

    res.status(200).json({
      success: true,
      data: formattedResult
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get category-wise totals
// @route   GET /api/expenses/category/totals
// @access  Public
exports.getCategoryTotals = async (req, res) => {
  try {
    const query = {};
    if (req.query.startDate || req.query.endDate) {
      query.date = {};
      if (req.query.startDate) {
        query.date.$gte = new Date(req.query.startDate);
      }
      if (req.query.endDate) {
        query.date.$lte = new Date(req.query.endDate);
      }
    }

    const result = await Expense.aggregate([
      ...(Object.keys(query).length > 0 ? [{ $match: query }] : []),
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' }
        }
      },
      { $sort: { total: -1 } }
    ]);

    const grandTotal = result.reduce((sum, item) => sum + item.total, 0);

    const formattedResult = result.map(item => ({
      category: item._id,
      total: Math.round(item.total * 100) / 100,
      percentage: Math.round((item.total / grandTotal) * 100)
    }));

    res.status(200).json({
      success: true,
      data: formattedResult
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get AI spending analysis
// @route   GET /api/expenses/ai/analysis
// @access  Public
exports.getAIAnalysis = async (req, res) => {
  try {
    const period = req.query.period || 'month';
    
    // Calculate date ranges
    const now = new Date();
    const currentPeriodStart = new Date();
    const previousPeriodStart = new Date();
    const previousPeriodEnd = new Date();

    if (period === 'week') {
      currentPeriodStart.setDate(now.getDate() - 7);
      previousPeriodStart.setDate(now.getDate() - 14);
      previousPeriodEnd.setDate(now.getDate() - 7);
    } else if (period === 'month') {
      currentPeriodStart.setMonth(now.getMonth() - 1);
      previousPeriodStart.setMonth(now.getMonth() - 2);
      previousPeriodEnd.setMonth(now.getMonth() - 1);
    } else if (period === 'year') {
      currentPeriodStart.setFullYear(now.getFullYear() - 1);
      previousPeriodStart.setFullYear(now.getFullYear() - 2);
      previousPeriodEnd.setFullYear(now.getFullYear() - 1);
    }

    // Get current period data
    const currentData = await Expense.aggregate([
      { $match: { date: { $gte: currentPeriodStart, $lte: now } } },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' }
        }
      }
    ]);

    // Get previous period data
    const previousData = await Expense.aggregate([
      { $match: { date: { $gte: previousPeriodStart, $lte: previousPeriodEnd } } },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' }
        }
      }
    ]);

    // Convert to maps for easier comparison
    const currentMap = new Map(currentData.map(item => [item._id, item.total]));
    const previousMap = new Map(previousData.map(item => [item._id, item.total]));

    // Generate insights
    const insights = [];
    const trends = {
      increasing: [],
      decreasing: [],
      stable: []
    };

    currentData.forEach(item => {
      const currentTotal = item.total;
      const previousTotal = previousMap.get(item._id) || 0;
      
      if (previousTotal > 0) {
        const percentChange = ((currentTotal - previousTotal) / previousTotal) * 100;
        
        if (Math.abs(percentChange) > 10) {
          if (percentChange > 0) {
            insights.push(`Your ${item._id} spending is ${Math.round(percentChange)}% higher than last ${period}`);
            trends.increasing.push(item._id);
          } else {
            insights.push(`Your ${item._id} spending is ${Math.round(Math.abs(percentChange))}% lower than last ${period}`);
            trends.decreasing.push(item._id);
          }
        } else {
          trends.stable.push(item._id);
        }
      }
    });

    // Generate recommendations
    const recommendations = [];
    const topCategory = currentData[0];
    if (topCategory) {
      recommendations.push(`Consider reviewing your ${topCategory._id} expenses as they are your highest spending category`);
    }
    
    if (trends.increasing.length > 0) {
      recommendations.push(`Look for ways to reduce spending in: ${trends.increasing.join(', ')}`);
    }

    res.status(200).json({
      success: true,
      data: {
        period,
        insights: insights.length > 0 ? insights : ['Not enough data for meaningful insights yet'],
        recommendations: recommendations.length > 0 ? recommendations : ['Keep tracking your expenses to get personalized recommendations'],
        trends
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
