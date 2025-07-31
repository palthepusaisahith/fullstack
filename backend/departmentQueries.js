const db = require('./db');

// Get all departments with product count
function getAllDepartmentsWithCount(callback) {
  const query = `
    SELECT d.id, d.name, COUNT(p.id) AS product_count
    FROM departments d
    LEFT JOIN products p ON d.id = p.department_id
    GROUP BY d.id;
  `;
  db.all(query, [], callback);
}

// Get specific department details
function getDepartmentById(id, callback) {
  db.get(`SELECT id, name FROM departments WHERE id = ?`, [id], callback);
}

// Get products in a department
function getProductsByDepartmentId(departmentId, callback) {
  const query = `
    SELECT p.*
    FROM products p
    JOIN departments d ON p.department_id = d.id
    WHERE d.id = ?;
  `;
  db.all(query, [departmentId], callback);
}

module.exports = {
  getAllDepartmentsWithCount,
  getDepartmentById,
  getProductsByDepartmentId
};
