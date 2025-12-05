# Installation Guide

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (v4.4 or higher)
- Git

## 🛠️ Installation Steps

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
   
   # Windows (check your service name in Services)
   net start MongoDB
   # or if that doesn't work:
   # net start "MongoDB Server"
   # or use the mongod command directly
   ```

3. **Create Database**:
   ```bash
   # For MongoDB Shell 1.0+ (newer installations)
   mongosh
   use expense_tracker
   
   # For legacy MongoDB installations
   mongo
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
