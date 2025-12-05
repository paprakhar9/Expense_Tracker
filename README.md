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

## 📚 Documentation

- **[Installation Guide](docs/INSTALLATION.md)** - Setup and installation instructions
- **[API Documentation](docs/API.md)** - Complete API reference
- **[Usage Guide](docs/USAGE.md)** - Examples and features
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Production deployment instructions
- **[Contributing](docs/CONTRIBUTING.md)** - How to contribute to the project

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (v4.4 or higher)
- Git

### Installation

### Installation

```bash
# Clone the repository
git clone https://github.com/paprakhar9/Expense_Tracker.git
cd Expense_Tracker

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Configuration

Create a `.env` file in the `backend` directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/expense_tracker
JWT_SECRET=your_jwt_secret_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

### Running the Application

```bash
# Start backend server
cd backend
npm start

# In a new terminal, start frontend
cd frontend
npm start
```

Visit `http://localhost:3000` to use the application.

For detailed installation instructions, see the [Installation Guide](docs/INSTALLATION.md).

## 📖 More Information

- **[API Documentation](docs/API.md)** - Complete API reference with examples
- **[Usage Guide](docs/USAGE.md)** - Features and usage examples
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Deploy to production
- **[Contributing](docs/CONTRIBUTING.md)** - Contribution guidelines

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Prakhar**
- GitHub: [@paprakhar9](https://github.com/paprakhar9)

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainer.

---

**Happy Expense Tracking! 💰**