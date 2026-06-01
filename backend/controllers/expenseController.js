const Expense = require('../models/Expense');

// @desc    Get all expenses
// @route   GET /api/expenses
// @access  Public
exports.getExpenses = async (req, res) => {
  try {
    Expense.findAll(req.query, (err, expenses) => {
      if (err) {
        return res.status(500).json({ success: false, error: err.message });
      }
      res.status(200).json({
        success: true,
        count: expenses.length,
        data: expenses
      });
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
    Expense.findById(req.params.id, (err, expense) => {
      if (err || !expense) {
        return res.status(404).json({ success: false, error: 'Expense not found' });
      }
      res.status(200).json({ success: true, data: expense });
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
    Expense.create(req.body, (err, expense) => {
      if (err) {
        return res.status(400).json({ success: false, error: err.message });
      }
      res.status(201).json({ success: true, data: expense });
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
    Expense.update(req.params.id, req.body, (err, expense) => {
      if (err) {
        return res.status(400).json({ success: false, error: err.message });
      }
      res.status(200).json({ success: true, data: expense });
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
    Expense.delete(req.params.id, (err) => {
      if (err) {
        return res.status(400).json({ success: false, error: err.message });
      }
      res.status(200).json({ success: true, message: 'Expense deleted successfully' });
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
    const db = require('../models/Expense');
    const sqlite3 = require('sqlite3').verbose();
    const path = require('path');
    const dbPath = path.resolve(__dirname, '../expense_tracker.sqlite');
    const sqlDb = new sqlite3.Database(dbPath);

    sqlDb.all(
      `SELECT strftime('%m', date) AS month, SUM(amount) AS total, COUNT(*) AS count FROM expenses WHERE strftime('%Y', date) = ? GROUP BY month ORDER BY month ASC`,
      [year.toString()],
      (err, rows) => {
        if (err) return res.status(500).json({ success: false, error: err.message });
        const monthNames = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const formattedResult = rows.map(item => ({
          month: monthNames[parseInt(item.month, 10) - 1],
          year,
          total: Math.round(item.total * 100) / 100,
          count: item.count
        }));
        res.status(200).json({ success: true, data: formattedResult });
      }
    );
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get category-wise totals
// @route   GET /api/expenses/category/totals
// @access  Public
exports.getCategoryTotals = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const db = require('../models/Expense');
    const sqlite3 = require('sqlite3').verbose();
    const path = require('path');
    const dbPath = path.resolve(__dirname, '../expense_tracker.sqlite');
    const sqlDb = new sqlite3.Database(dbPath);

    let sql = `SELECT category, SUM(amount) AS total FROM expenses`;
    const params = [];
    if (startDate && endDate) {
      sql += ` WHERE date >= ? AND date <= ?`;
      params.push(startDate, endDate);
    } else if (startDate) {
      sql += ` WHERE date >= ?`;
      params.push(startDate);
    } else if (endDate) {
      sql += ` WHERE date <= ?`;
      params.push(endDate);
    }
    sql += ` GROUP BY category ORDER BY total DESC`;

    sqlDb.all(sql, params, (err, rows) => {
      if (err) return res.status(500).json({ success: false, error: err.message });
      const grandTotal = rows.reduce((sum, item) => sum + item.total, 0);
      const formattedResult = rows.map(item => ({
        category: item.category,
        total: Math.round(item.total * 100) / 100,
        percentage: grandTotal ? Math.round((item.total / grandTotal) * 100) : 0
      }));
      res.status(200).json({ success: true, data: formattedResult });
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get AI spending analysis
// @route   GET /api/expenses/ai/analysis
// @access  Public
exports.getAIAnalysis = async (req, res) => {
  try {
    const period = req.query.period || 'month';
    const now = new Date();
    let currentStart, previousStart, previousEnd;

    if (period === 'week') {
      currentStart = new Date(now);
      currentStart.setDate(now.getDate() - 7);
      previousStart = new Date(now);
      previousStart.setDate(now.getDate() - 14);
      previousEnd = new Date(now);
      previousEnd.setDate(now.getDate() - 7);
    } else if (period === 'month') {
      currentStart = new Date(now.getFullYear(), now.getMonth(), 1);
      previousStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      previousEnd = new Date(now.getFullYear(), now.getMonth(), 0);
    } else if (period === 'year') {
      currentStart = new Date(now.getFullYear(), 0, 1);
      previousStart = new Date(now.getFullYear() - 1, 0, 1);
      previousEnd = new Date(now.getFullYear(), 0, 0);
    } else {
      return res.status(400).json({ success: false, error: 'Invalid period' });
    }

    const formatDate = d => d.toISOString().slice(0, 10);
    const currentStartStr = formatDate(currentStart);
    const nowStr = formatDate(now);
    const previousStartStr = formatDate(previousStart);
    const previousEndStr = formatDate(previousEnd);

    const db = require('../models/Expense');
    const sqlite3 = require('sqlite3').verbose();
    const path = require('path');
    const dbPath = path.resolve(__dirname, '../expense_tracker.sqlite');
    const sqlDb = new sqlite3.Database(dbPath);

    // Helper to get totals by category for a date range
    function getTotalsByCategory(start, end, cb) {
      sqlDb.all(
        `SELECT category, SUM(amount) as total FROM expenses WHERE date >= ? AND date <= ? GROUP BY category`,
        [start, end],
        (err, rows) => {
          if (err) return cb(err);
          cb(null, rows);
        }
      );
    }

    getTotalsByCategory(currentStartStr, nowStr, (err, currentData) => {
      if (err) return res.status(500).json({ success: false, error: err.message });
      getTotalsByCategory(previousStartStr, previousEndStr, (err2, previousData) => {
        if (err2) return res.status(500).json({ success: false, error: err2.message });

        // Convert to maps for easier comparison
        const currentMap = new Map(currentData.map(item => [item.category, item.total]));
        const previousMap = new Map(previousData.map(item => [item.category, item.total]));

        // Generate insights
        const insights = [];
        const trends = {
          increasing: [],
          decreasing: [],
          stable: []
        };

        currentData.forEach(item => {
          const currentTotal = item.total;
          const previousTotal = previousMap.get(item.category) || 0;
          if (previousTotal > 0) {
            const percentChange = ((currentTotal - previousTotal) / previousTotal) * 100;
            if (Math.abs(percentChange) > 10) {
              if (percentChange > 0) {
                insights.push(`Your ${item.category} spending is ${Math.round(percentChange)}% higher than last ${period}`);
                trends.increasing.push(item.category);
              } else {
                insights.push(`Your ${item.category} spending is ${Math.round(Math.abs(percentChange))}% lower than last ${period}`);
                trends.decreasing.push(item.category);
              }
            } else {
              trends.stable.push(item.category);
            }
          }
        });

        // Generate recommendations
        const recommendations = [];
        if (currentData.length > 0) {
          const topCategory = currentData.reduce((a, b) => (a.total > b.total ? a : b));
          recommendations.push(`Consider reviewing your ${topCategory.category} expenses as they are your highest spending category`);
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
      });
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
