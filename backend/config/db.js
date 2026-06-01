
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

let db;
const connectDB = () => {
  const dbPath = path.resolve(__dirname, '../expense_tracker.sqlite');
  db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error opening SQLite database:', err.message);
      process.exit(1);
    } else {
      console.log('Connected to SQLite database.');
      db.run(`CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL NOT NULL,
        category TEXT NOT NULL,
        description TEXT NOT NULL,
        date TEXT NOT NULL,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
      )`);
    }
  });
  return db;
};

module.exports = connectDB;
