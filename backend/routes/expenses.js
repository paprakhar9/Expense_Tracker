const express = require('express');
const router = express.Router();
const {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  getMonthlyTotals,
  getCategoryTotals,
  getAIAnalysis
} = require('../controllers/expenseController');

// Special routes must come before parameterized routes
router.get('/monthly/totals', getMonthlyTotals);
router.get('/category/totals', getCategoryTotals);
router.get('/ai/analysis', getAIAnalysis);

// Standard CRUD routes
router.route('/')
  .get(getExpenses)
  .post(createExpense);

router.route('/:id')
  .get(getExpense)
  .put(updateExpense)
  .delete(deleteExpense);

module.exports = router;
