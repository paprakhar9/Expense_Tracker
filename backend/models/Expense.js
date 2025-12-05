const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../expense_tracker.sqlite');
const db = new sqlite3.Database(dbPath);

const Expense = {
  create: (data, callback) => {
    const { amount, category, description, date } = data;
    db.run(
      `INSERT INTO expenses (amount, category, description, date) VALUES (?, ?, ?, ?)`,
      [amount, category, description, date],
      function (err) {
        callback(err, { id: this?.lastID, ...data });
      }
    );
  },
  findAll: (query, callback) => {
    let sql = 'SELECT * FROM expenses';
    const params = [];
    const conditions = [];
    if (query.category) {
      conditions.push('category = ?');
      params.push(query.category);
    }
    if (query.startDate) {
      conditions.push('date >= ?');
      params.push(query.startDate);
    }
    if (query.endDate) {
      conditions.push('date <= ?');
      params.push(query.endDate);
    }
    if (conditions.length) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }
    sql += ' ORDER BY date DESC';
    db.all(sql, params, callback);
  },
  findById: (id, callback) => {
    db.get('SELECT * FROM expenses WHERE id = ?', [id], callback);
  },
  update: (id, data, callback) => {
    const { amount, category, description, date } = data;
    db.run(
      `UPDATE expenses SET amount = ?, category = ?, description = ?, date = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
      [amount, category, description, date, id],
      function (err) {
        callback(err, { id, ...data });
      }
    );
  },
  delete: (id, callback) => {
    db.run('DELETE FROM expenses WHERE id = ?', [id], callback);
  },
};

module.exports = Expense;
