const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 33400;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the SQLite database
const db = new sqlite3.Database('./ecommerce.db', (err) => {
  if (err) {
    console.error('❌ Error opening database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database');
  }
});

// GET all departments
app.get('/departments', (req, res) => {
  db.all('SELECT * FROM departments', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ data: rows });
  });
});

// GET a department by ID
app.get('/departments/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM departments WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Department not found' });
    res.json({ data: row });
  });
});

// GET products in a specific department
app.get('/departments/:id/products', (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT products.* FROM products
    JOIN departments ON products.department = departments.name
    WHERE departments.id = ?
  `;
  db.all(query, [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ data: rows });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Ecommerce API is running at http://localhost:${PORT}`);
});
