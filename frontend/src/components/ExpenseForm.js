import React, { useState } from 'react';

const ExpenseForm = ({ onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState(initialData || {
    amount: '',
    category: 'Food & Dining',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Education',
    'Travel',
    'Personal Care',
    'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData({
        amount: '',
        category: 'Food & Dining',
        description: '',
        date: new Date().toISOString().split('T')[0]
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3 style={styles.formTitle}>{initialData ? 'Edit Expense' : 'Add New Expense'}</h3>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Amount ($)</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          step="0.01"
          min="0"
          required
          style={styles.input}
          placeholder="0.00"
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          style={styles.select}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          maxLength="200"
          style={styles.input}
          placeholder="Enter description"
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>

      <button type="submit" style={styles.button}>
        {initialData ? 'Update Expense' : 'Add Expense'}
      </button>
    </form>
  );
};

const styles = {
  form: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '20px'
  },
  formTitle: {
    marginTop: 0,
    marginBottom: '20px',
    color: '#333'
  },
  formGroup: {
    marginBottom: '15px'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: '500',
    color: '#555'
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box'
  },
  select: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box'
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100%',
    fontWeight: '500'
  }
};

export default ExpenseForm;
