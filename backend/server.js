
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const db = new sqlite3.Database("./ecommerce.db");

app.use(cors());
app.use(express.json());

// ✅ Get all products (limit to 100)
app.get("/api/products", (req, res) => {
  db.all("SELECT * FROM products LIMIT 100", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ data: rows });
  });
});

// ✅ Get product by ID
app.get("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Product not found" });
    res.status(200).json({ data: row });
  });
});

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
