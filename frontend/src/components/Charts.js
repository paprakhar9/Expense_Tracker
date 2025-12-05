import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const Charts = ({ categoryData, monthlyData }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#a4de6c'];

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Spending Analytics</h3>
      
      {categoryData && categoryData.length > 0 && (
        <div style={styles.chartSection}>
          <h4 style={styles.chartTitle}>Category-wise Spending</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, percentage }) => `${category}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="total"
                nameKey="category"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {monthlyData && monthlyData.length > 0 && (
        <div style={styles.chartSection}>
          <h4 style={styles.chartTitle}>Monthly Spending</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              <Legend />
              <Bar dataKey="total" fill="#8884d8" name="Total Spent" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {(!categoryData || categoryData.length === 0) && (!monthlyData || monthlyData.length === 0) && (
        <div style={styles.emptyState}>
          <p>No data available for charts. Add some expenses to see analytics!</p>
        </div>
      )}
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
  chartSection: {
    marginBottom: '30px'
  },
  chartTitle: {
    marginTop: 0,
    marginBottom: '15px',
    color: '#555',
    fontSize: '16px'
  },
  emptyState: {
    padding: '40px',
    textAlign: 'center',
    color: '#888'
  }
};

export default Charts;
