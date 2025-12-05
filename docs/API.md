# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Expenses Endpoints

### 1. Create Expense
```http
POST /api/expenses
Content-Type: application/json

{
  "amount": 50.00,
  "category": "Food",
  "description": "Lunch at restaurant",
  "date": "2025-12-05"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64f5a1b2c3d4e5f6a7b8c9d0",
    "amount": 50.00,
    "category": "Food",
    "description": "Lunch at restaurant",
    "date": "2025-12-05T00:00:00.000Z",
    "createdAt": "2025-12-05T10:30:00.000Z"
  }
}
```

### 2. Get All Expenses
```http
GET /api/expenses
```

**Query Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Items per page (default: 10)
- `category` (optional): Filter by category
- `startDate` (optional): Filter expenses from this date
- `endDate` (optional): Filter expenses until this date

**Response:**
```json
{
  "success": true,
  "count": 25,
  "data": [
    {
      "_id": "64f5a1b2c3d4e5f6a7b8c9d0",
      "amount": 50.00,
      "category": "Food",
      "description": "Lunch at restaurant",
      "date": "2025-12-05T00:00:00.000Z"
    }
  ]
}
```

### 3. Get Single Expense
```http
GET /api/expenses/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64f5a1b2c3d4e5f6a7b8c9d0",
    "amount": 50.00,
    "category": "Food",
    "description": "Lunch at restaurant",
    "date": "2025-12-05T00:00:00.000Z"
  }
}
```

### 4. Update Expense
```http
PUT /api/expenses/:id
Content-Type: application/json

{
  "amount": 55.00,
  "description": "Updated lunch expense"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64f5a1b2c3d4e5f6a7b8c9d0",
    "amount": 55.00,
    "category": "Food",
    "description": "Updated lunch expense",
    "date": "2025-12-05T00:00:00.000Z"
  }
}
```

### 5. Delete Expense
```http
DELETE /api/expenses/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Expense deleted successfully"
}
```

### 6. Get Monthly Totals
```http
GET /api/expenses/monthly/totals
```

**Query Parameters:**
- `year` (optional): Year to filter (default: current year)
- `month` (optional): Specific month (1-12)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "month": "January",
      "year": 2025,
      "total": 1250.50,
      "count": 45
    },
    {
      "month": "February",
      "year": 2025,
      "total": 1100.75,
      "count": 38
    }
  ]
}
```

### 7. Get Category-wise Totals
```http
GET /api/expenses/category/totals
```

**Query Parameters:**
- `startDate` (optional): Start date for filtering
- `endDate` (optional): End date for filtering

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "category": "Food",
      "total": 850.00,
      "percentage": 34
    },
    {
      "category": "Transportation",
      "total": 450.00,
      "percentage": 18
    },
    {
      "category": "Entertainment",
      "total": 300.00,
      "percentage": 12
    }
  ]
}
```

## AI Analysis Endpoint

### Get AI Spending Analysis
```http
GET /api/expenses/ai/analysis
```

**Query Parameters:**
- `period` (optional): 'week', 'month', 'year' (default: 'month')

**Response:**
```json
{
  "success": true,
  "data": {
    "period": "month",
    "insights": [
      "Your food spending is 25% higher than last month",
      "You spent most on weekends",
      "Transportation costs are consistent"
    ],
    "recommendations": [
      "Consider meal prepping to reduce food expenses",
      "Look into monthly transportation passes for savings"
    ],
    "trends": {
      "increasing": ["Food", "Entertainment"],
      "decreasing": ["Shopping"],
      "stable": ["Transportation", "Utilities"]
    }
  }
}
```

## 🌟 Supported Categories

Default expense categories include:
- Food & Dining
- Transportation
- Shopping
- Entertainment
- Bills & Utilities
- Healthcare
- Education
- Travel
- Personal Care
- Other

You can customize categories in the application settings.
