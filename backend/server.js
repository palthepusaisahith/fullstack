const express = require('express');
const app = express();
const port = 33400;
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./ecommerce.db');
const cors = require('cors');

app.use(cors());
app.use(express.json());

// ✅ Get all departments
app.get('/api/departments', (req, res) => {
  const query = `
    SELECT d.id, d.name, COUNT(p.id) AS product_count
    FROM departments d
    LEFT JOIN products p ON d.id = p.department_id
    GROUP BY d.id
  `;
  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ departments: rows });
  });
});

// ✅ Get department by ID
app.get('/api/departments/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM departments WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Department not found' });
    res.json(row);
  });
});

// ✅ Get all products in a department
app.get('/api/departments/:id/products', (req, res) => {
  const id = req.params.id;
  const query = `
    SELECT p.*
    FROM products p
    WHERE p.department_id = ?
  `;
  db.all(query, [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ department_id: id, products: rows });
  });
});

app.listen(port, () => {
  console.log(`Ecommerce API is running at http://localhost:${port}`);
});
