const express = require('express');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Only accessible by admin
router.get('/admin', authorize('admin'), (req, res) => {
  res.json({ message: 'Admin content' });
});

// Accessible by user and admin
router.get('/user', authorize(['user', 'admin']), (req, res) => {
  res.json({ message: 'User content' });
});

module.exports = router;
