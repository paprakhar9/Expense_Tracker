import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Charts from './components/Charts';
import AIInsights from './components/AIInsights';
import { expenseService } from './services/api';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load expenses
      const expensesResponse = await expenseService.getExpenses({ limit: 50 });
      setExpenses(expensesResponse.data || []);

      // Load category data
      const categoryResponse = await expenseService.getCategoryTotals();
      setCategoryData(categoryResponse.data || []);

      // Load monthly data
      const monthlyResponse = await expenseService.getMonthlyTotals({ year: new Date().getFullYear() });
      setMonthlyData(monthlyResponse.data || []);

      // Load AI analysis
      const aiResponse = await expenseService.getAIAnalysis({ period: 'month' });
      setAiAnalysis(aiResponse.data);

      setLoading(false);
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load data. Make sure the backend server is running.');
      setLoading(false);
    }
  };

  const handleAddExpense = async (expenseData) => {
    try {
      await expenseService.createExpense(expenseData);
      await loadData();
      alert('Expense added successfully!');
    } catch (err) {
      console.error('Error adding expense:', err);
      alert('Failed to add expense. Please try again.');
    }
  };

  const handleUpdateExpense = async (expenseData) => {
    try {
      await expenseService.updateExpense(editingExpense._id, expenseData);
      setEditingExpense(null);
      await loadData();
      alert('Expense updated successfully!');
    } catch (err) {
      console.error('Error updating expense:', err);
      alert('Failed to update expense. Please try again.');
    }
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await expenseService.deleteExpense(id);
        await loadData();
        alert('Expense deleted successfully!');
      } catch (err) {
        console.error('Error deleting expense:', err);
        alert('Failed to delete expense. Please try again.');
      }
    }
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  if (loading) {
    return (
      <div style={styles.app}>
        <div style={styles.container}>
          <div style={styles.loading}>Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.app}>
        <div style={styles.container}>
          <div style={styles.error}>
            <h2>⚠️ Error</h2>
            <p>{error}</p>
            <button onClick={loadData} style={styles.retryButton}>Retry</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.app}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>💰 Expense Tracker</h1>
          <p style={styles.subtitle}>Manage your personal finances with ease</p>
        </header>

        <div style={styles.content}>
          <div style={styles.leftColumn}>
            <ExpenseForm 
              onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense}
              initialData={editingExpense ? {
                amount: editingExpense.amount,
                category: editingExpense.category,
                description: editingExpense.description,
                date: new Date(editingExpense.date).toISOString().split('T')[0]
              } : null}
            />
            {editingExpense && (
              <button onClick={handleCancelEdit} style={styles.cancelButton}>
                Cancel Edit
              </button>
            )}
            <AIInsights analysisData={aiAnalysis} />
          </div>

          <div style={styles.rightColumn}>
            <ExpenseList 
              expenses={expenses}
              onDelete={handleDeleteExpense}
              onEdit={handleEditExpense}
            />
            <Charts 
              categoryData={categoryData}
              monthlyData={monthlyData}
            />
          </div>
        </div>

        <footer style={styles.footer}>
          <p>© 2025 Expense Tracker. Built with React & Express.</p>
        </footer>
      </div>
    </div>
  );
}

const styles = {
  app: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px'
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto'
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  title: {
    margin: 0,
    color: '#2c3e50',
    fontSize: '36px'
  },
  subtitle: {
    margin: '10px 0 0 0',
    color: '#7f8c8d',
    fontSize: '16px'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginBottom: '30px'
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  footer: {
    textAlign: 'center',
    padding: '20px',
    color: '#7f8c8d',
    fontSize: '14px'
  },
  loading: {
    textAlign: 'center',
    padding: '50px',
    fontSize: '18px',
    color: '#666'
  },
  error: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center',
    color: '#f44336'
  },
  retryButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  cancelButton: {
    padding: '12px 20px',
    backgroundColor: '#ff9800',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500'
  }
};

export default App;
