// Load modules
const Joi = require('joi');
const { validate } = require('express-validation');

module.exports = class EmployeesValidator {
  // GET /api/employees
  static list() {
    return validate({
      query: Joi.object({
        department: Joi.string().optional(),
      }),
    });
  }

  // GET /api/employees/:id
  static get() {
    return validate({
      params: Joi.object({
        id: Joi.string().required(),
      }),
    });
  }

  // POST /api/employees
  static create() {
    return validate({
      body: Joi.object({
        name: Joi.string().required(),
        firstName: Joi.string().required(),
        dateCreated: Joi.date().required(),
        department: Joi.string().required(),
        active: Joi.boolean().optional(),
        salary: Joi.number().optional(),
      }),
    });
  }

  // PUT /api/employees/:id
  static update() {
    return validate({
      params: Joi.object({
        id: Joi.string().required(),
      }),
      body: Joi.object({
        name: Joi.string().optional(),
        firstName: Joi.string().optional(),
        dateCreated: Joi.date().optional(),
        department: Joi.string().optional(),
        active: Joi.boolean().optional(),
        salary: Joi.number().optional(),
      }),
    });
  }

  // DELETE /api/employees/:id
  static delete() {
    return validate({
      params: Joi.object({
        id: Joi.string().required(),
      }),
    });
  }
};
