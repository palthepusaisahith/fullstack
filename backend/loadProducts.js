const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const csv = require("csv-parser");

const db = new sqlite3.Database("./ecommerce.db");

db.serialize(() => {
  db.run("DROP TABLE IF EXISTS products");

  db.run(`
    CREATE TABLE products (
      id INTEGER PRIMARY KEY,
      cost REAL,
      category TEXT,
      name TEXT,
      brand TEXT,
      retail_price REAL,
      department TEXT,
      sku TEXT,
      distribution_center_id INTEGER
    )
  `);

  console.log("✅ Table 'products' created.");

  const products = [];

  fs.createReadStream("products.csv")
    .pipe(csv())
    .on("data", (row) => {
      products.push([
        parseInt(row["id"]),
        parseFloat(row["cost"]),
        row["category"],
        row["name"],
        row["brand"],
        parseFloat(row["retail_price"]),
        row["department"],
        row["sku"],
        parseInt(row["distribution_center_id"])
      ]);
    })
    .on("end", () => {
      console.log(`📊 Finished reading CSV. Total rows: ${products.length}`);

      const stmt = db.prepare(`
        INSERT INTO products (id, cost, category, name, brand, retail_price, department, sku, distribution_center_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      products.forEach((p) => stmt.run(p));

      stmt.finalize(() => {
        console.log("✅ All products inserted into the database.");

        db.all("SELECT * FROM products LIMIT 5", (err, rows) => {
          if (err) {
            console.error("❌ Error:", err.message);
          } else {
            console.log("🔍 Sample rows from DB:");
            rows.forEach((row) => console.log(row));
          }
          db.close();
        });
      });
    })
    .on("error", (err) => {
      console.error("❌ CSV read error:", err.message);
    });
});
