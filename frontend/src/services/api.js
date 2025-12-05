import axios from 'axios';

const API_URL = '/api/expenses';

export const expenseService = {
  // Get all expenses
  getExpenses: async (params = {}) => {
    const response = await axios.get(API_URL, { params });
    return response.data;
  },

  // Get single expense
  getExpense: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  // Create expense
  createExpense: async (expenseData) => {
    const response = await axios.post(API_URL, expenseData);
    return response.data;
  },

  // Update expense
  updateExpense: async (id, expenseData) => {
    const response = await axios.put(`${API_URL}/${id}`, expenseData);
    return response.data;
  },

  // Delete expense
  deleteExpense: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },

  // Get monthly totals
  getMonthlyTotals: async (params = {}) => {
    const response = await axios.get(`${API_URL}/monthly/totals`, { params });
    return response.data;
  },

  // Get category totals
  getCategoryTotals: async (params = {}) => {
    const response = await axios.get(`${API_URL}/category/totals`, { params });
    return response.data;
  },

  // Get AI analysis
  getAIAnalysis: async (params = {}) => {
    const response = await axios.get(`${API_URL}/ai/analysis`, { params });
    return response.data;
  }
};
