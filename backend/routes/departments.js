const express = require('express');
const router = express.Router();
const queries = require('../departmentQueries');

// GET /api/departments
router.get('/', (req, res) => {
  queries.getAllDepartmentsWithCount((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ departments: rows });
  });
});

// GET /api/departments/:id
router.get('/:id', (req, res) => {
  queries.getDepartmentById(req.params.id, (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Department not found' });
    res.json(row);
  });
});

// GET /api/departments/:id/products
router.get('/:id/products', (req, res) => {
  queries.getDepartmentById(req.params.id, (err, department) => {
    if (err || !department)
      return res.status(404).json({ error: 'Department not found' });

    queries.getProductsByDepartmentId(req.params.id, (err, products) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ department: department.name, products });
    });
  });
});

module.exports = router;
