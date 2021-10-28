// Load modules
const express = require('express');

// Config router
const router = express.Router();

// Load controllers
const EmployeesController = require('../controllers/employees.controller');

// Load validators
const EmployeesValidator = require('../validators/employees.validator');

// Setup routes
router.get(
  '/',
  EmployeesValidator.list(),
  EmployeesController.list
);

router.get(
  '/:id',
  EmployeesValidator.get(),
  EmployeesController.get
);

router.post(
  '/',
  EmployeesValidator.create(),
  EmployeesController.create
);

router.put(
  '/:id',
  EmployeesValidator.update(),
  EmployeesController.update
);

router.delete(
  '/:id',
  EmployeesValidator.delete(),
  EmployeesController.delete
);

module.exports = router;