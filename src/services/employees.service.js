// Load models
const Employee = require('../models/employee.model');

module.exports = class EmployeesService {
  static find(query) {
    return Employee.find(query);
  }

  static findOne(query) {
    return Employee.findOne(query);
  }

  static create(body) {
    return Employee.create(body);
  }

  static update(query, body) {
    return Employee.findOneAndUpdate(query, body, {
      new: true,
    });
  }

  static remove(query) {
    return Employee.findOneAndRemove(query);
  }
};
