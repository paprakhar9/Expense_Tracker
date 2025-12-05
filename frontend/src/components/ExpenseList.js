import React from 'react';

const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatAmount = (amount) => {
    return `$${Number(amount).toFixed(2)}`;
  };

  if (expenses.length === 0) {
    return (
      <div style={styles.emptyState}>
        <p>No expenses found. Add your first expense to get started!</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Recent Expenses</h3>
      <div style={styles.list}>
        {expenses.map(expense => (
          <div key={expense._id} style={styles.expenseItem}>
            <div style={styles.expenseInfo}>
              <div style={styles.expenseHeader}>
                <span style={styles.amount}>{formatAmount(expense.amount)}</span>
                <span style={styles.category}>{expense.category}</span>
              </div>
              <div style={styles.description}>{expense.description}</div>
              <div style={styles.date}>{formatDate(expense.date)}</div>
            </div>
            <div style={styles.actions}>
              <button 
                onClick={() => onEdit(expense)}
                style={{...styles.button, ...styles.editButton}}
              >
                Edit
              </button>
              <button 
                onClick={() => onDelete(expense._id)}
                style={{...styles.button, ...styles.deleteButton}}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '20px'
  },
  title: {
    marginTop: 0,
    marginBottom: '20px',
    color: '#333'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  expenseItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    border: '1px solid #e0e0e0',
    borderRadius: '6px',
    backgroundColor: '#fafafa'
  },
  expenseInfo: {
    flex: 1
  },
  expenseHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  },
  amount: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  category: {
    fontSize: '12px',
    padding: '4px 12px',
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    borderRadius: '12px',
    fontWeight: '500'
  },
  description: {
    color: '#555',
    marginBottom: '5px',
    fontSize: '14px'
  },
  date: {
    fontSize: '12px',
    color: '#888'
  },
  actions: {
    display: 'flex',
    gap: '10px',
    marginLeft: '20px'
  },
  button: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  },
  editButton: {
    backgroundColor: '#2196F3',
    color: 'white'
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: 'white'
  },
  emptyState: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center',
    color: '#888'
  }
};

export default ExpenseList;
