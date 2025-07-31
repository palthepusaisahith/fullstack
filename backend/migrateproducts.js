// backend/migrateProducts.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('ecommerce.db');

db.serialize(() => {
  // Rename the old products table
  db.run(`ALTER TABLE products RENAME TO old_products`);

  // Create new products table with department_id as foreign key
  db.run(`
    CREATE TABLE products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      brand TEXT,
      category TEXT,
      retail_price REAL,
      cost REAL,
      sku TEXT,
      department_id INTEGER,
      distribution_center_id INTEGER,
      FOREIGN KEY (department_id) REFERENCES departments(id)
    )
  `);

  // Insert into new products table with department_id
  db.run(`
    INSERT INTO products (
      id, name, brand, category, retail_price, cost, sku, department_id, distribution_center_id
    )
    SELECT 
      op.id, op.name, op.brand, op.category, op.retail_price, op.cost, op.sku, d.id, op.distribution_center_id
    FROM old_products op
    JOIN departments d ON op.department = d.name
  `);

  console.log("✅ Products table migrated with foreign key department_id!");
});

db.close();
