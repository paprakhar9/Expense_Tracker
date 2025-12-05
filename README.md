# Expense Tracker 💰

A comprehensive personal finance management application that helps you track expenses, analyze spending patterns, and gain budget insights through AI-powered analysis.

## 📋 Features

- **Add Expenses**: Easily add and categorize your expenses
- **CRUD Operations**: Full Create, Read, Update, Delete functionality for expense management
- **Monthly Totals**: View aggregated expense totals by month
- **Category-wise Charts**: Visual representation of spending across different categories
- **AI Trend Analysis**: Intelligent analysis of spending patterns and budget recommendations
- **Database Storage**: Persistent storage of all expense data

## 🚀 Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Frontend**: React.js
- **Charts**: Chart.js / Recharts
- **AI Analysis**: OpenAI API / Custom ML model

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (v4.4 or higher)
- Git

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/paprakhar9/Expense_Tracker.git
cd Expense_Tracker
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## 🗄️ Database Setup

### MongoDB Setup

1. **Install MongoDB** (if not already installed):
   - **Ubuntu/Debian**:
     ```bash
     sudo apt-get install mongodb
     ```
   - **macOS**:
     ```bash
     brew install mongodb-community
     ```
   - **Windows**: Download from [MongoDB Official Site](https://www.mongodb.com/try/download/community)

2. **Start MongoDB Service**:
   ```bash
   # Linux/macOS
   sudo systemctl start mongod
   # or
   mongod --dbpath /path/to/data/directory
   
   # Windows
   net start MongoDB
   ```

3. **Create Database**:
   ```bash
   mongosh
   use expense_tracker
   ```

### Environment Configuration

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/expense_tracker

# JWT Secret (for authentication)
JWT_SECRET=your_jwt_secret_key_here

# AI API Configuration (optional)
OPENAI_API_KEY=your_openai_api_key_here
```

## ▶️ Running the Application

### Start Backend Server

```bash
cd backend
npm start
# or for development with auto-reload
npm run dev
```

The backend server will start on `http://localhost:5000`

### Start Frontend Application

```bash
cd frontend
npm start
```

The frontend will start on `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Expenses Endpoints

#### 1. Create Expense
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

#### 2. Get All Expenses
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

#### 3. Get Single Expense
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

#### 4. Update Expense
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

#### 5. Delete Expense
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

#### 6. Get Monthly Totals
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

#### 7. Get Category-wise Totals
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

### AI Analysis Endpoint

#### Get AI Spending Analysis
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

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🔧 Development Scripts

### Backend
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run tests
npm run lint       # Run ESLint
```

### Frontend
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App
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

## 🔒 Security

- All API endpoints should be protected with JWT authentication
- Environment variables for sensitive data
- Input validation and sanitization
- Rate limiting on API endpoints
- HTTPS in production

## 🚀 Deployment

### Backend Deployment (Heroku Example)
```bash
cd backend
heroku create expense-tracker-api
heroku config:set MONGODB_URI=your_mongodb_uri
git push heroku main
```

### Frontend Deployment (Netlify/Vercel)
```bash
cd frontend
npm run build
# Deploy the build folder to Netlify or Vercel
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Prakhar**
- GitHub: [@paprakhar9](https://github.com/paprakhar9)

## 🙏 Acknowledgments

- Express.js for the backend framework
- React.js for the frontend
- MongoDB for database
- Chart.js for visualizations
- OpenAI for AI capabilities

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainer.

---

**Happy Expense Tracking! 💰**