# Usage Guide

## 💡 Usage Examples

### Adding an Expense via cURL

```bash
curl -X POST http://localhost:5000/api/expenses \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 75.50,
    "category": "Groceries",
    "description": "Weekly grocery shopping",
    "date": "2025-12-05"
  }'
```

### Getting Monthly Totals

```bash
curl http://localhost:5000/api/expenses/monthly/totals?year=2025
```

### Filtering Expenses by Category

```bash
curl "http://localhost:5000/api/expenses?category=Food&limit=20"
```

## 📊 Features in Detail

### 1. Expense Management
- Add expenses with amount, category, description, and date
- Edit existing expenses
- Delete unwanted entries
- View all expenses with filtering and pagination

### 2. Charts and Visualizations
The frontend provides interactive charts:
- **Pie Chart**: Category-wise expense distribution
- **Bar Chart**: Monthly spending comparison
- **Line Chart**: Spending trends over time

### 3. AI-Powered Insights
The AI analysis feature provides:
- Spending pattern recognition
- Budget recommendations
- Anomaly detection (unusual spending)
- Predictive analysis for future expenses

### 4. Monthly Reports
- Aggregated totals for each month
- Year-over-year comparisons
- Category breakdowns
- Export functionality (CSV/PDF)

## 🏗️ Project Structure

```
Expense_Tracker/
├── backend/
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── controllers/
│   │   ├── expenseController.js
│   │   └── aiController.js
│   ├── models/
│   │   └── Expense.js         # Mongoose schema
│   ├── routes/
│   │   └── expenses.js        # API routes
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── utils/
│   │   └── aiAnalysis.js      # AI analysis logic
│   ├── .env                   # Environment variables
│   ├── server.js              # Express server entry point
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ExpenseForm.js
│   │   │   ├── ExpenseList.js
│   │   │   ├── Charts.js
│   │   │   └── AIInsights.js
│   │   ├── services/
│   │   │   └── api.js         # API service
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── README.md
```
