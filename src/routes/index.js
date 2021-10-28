// Load modules
const express = require('express');

// Config router
const router = express.Router();

// Load routes
const employeesRoute = require('./employees.route');

// Define routes
router.use('/employees', employeesRoute);

module.exports = router;