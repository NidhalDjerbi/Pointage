// Load modules
const httpStatus = require('http-status');

// Load services
const EmployeesService = require('../services/employees.service');

// Load helpers
const ApiError = require('../helpers/error.helper');
const Errors = require('../helpers/custom-errors.helper');

module.exports = class EmployeesController {
  /**
   * @api {get} /employees List employees
   * @apiName ListEmployees
   * @apiGroup Employees
   *
   * @apiSuccess {String} _id Identifier of the Employee.
   * @apiSuccess {String} name Name of the Employee.
   * @apiSuccess {String} firstName  FirstName of the Employee.
   * @apiSuccess {Date} dateCreated  DateCreated of the Employee.
   * @apiSuccess {String} department  Department of the Employee.
   * @apiSuccess {Boolean} active  Active of the Employee.
   * @apiSuccess {Number} salary  Salary of the Employee.
   *
   * @apiSuccessExample Success-Response:
   *     [{
   *       "_id": "617ab483a023a6af9e05b54b",
   *        "name": "MyName",
   *        "firstName": "MyFirstName",
   *        "dateCreated": "2020-10-00T12:00:00.000Z",
   *        "department": "Informatique",
   *        "active": true,
   *        "salary": 1000,
   *     }]
   */
  static async list(req, res, next) {
    try {
      const { department } = req.query;

      const employeesQuery = {};

      if (department) {
        employeesQuery.department = department;
      }

      const employees = await EmployeesService.find(employeesQuery);

      return res.success(employees);
    } catch (err) {
      return next(err);
    }
  }

  /**
   * @api {get} /employees/:id Get employee
   * @apiName GetEmployee
   * @apiGroup Employees
   * 
   * @apiParam {String} id Identifier of the Employee.
   *
   * @apiSuccess {String} _id Identifier of the Employee.
   * @apiSuccess {String} name Name of the Employee.
   * @apiSuccess {String} firstName  FirstName of the Employee.
   * @apiSuccess {Date} dateCreated  DateCreated of the Employee.
   * @apiSuccess {String} department  Department of the Employee.
   * @apiSuccess {Boolean} active  Active of the Employee.
   * @apiSuccess {Number} salary  Salary of the Employee.
   *
   * @apiSuccessExample Success-Response:
   *     {
   *       "_id": "617ab483a023a6af9e05b54b",
   *        "name": "MyName",
   *        "firstName": "MyFirstName",
   *        "dateCreated": "2020-10-00T12:00:00.000Z",
   *        "department": "Informatique",
   *        "active": true,
   *        "salary": 1000,
   *     }
   */
  static async get(req, res, next) {
    try {
      const { id } = req.params;

      const employee = await EmployeesService.findOne({
        _id: id
      });

      if (!employee) {
        throw new ApiError(
          Errors.EMPLOYEE.NOT_FOUND,
          httpStatus.BAD_REQUEST
        );
      }

      return res.success(employee);
    } catch (err) {
      return next(err);
    }
  }

  /**
   * @api {post} /employees Create employee
   * @apiName CreateEmployee
   * @apiGroup Employees
   * 
   * @apiParam (Body) {String} name Name of the Employee.
   * @apiParam (Body) {String} firstName  FirstName of the Employee.
   * @apiParam (Body) {Date} dateCreated  DateCreated of the Employee.
   * @apiParam (Body) {String} department  Department of the Employee.
   * @apiParam (Body) {Boolean} [active]  Active of the Employee.
   * @apiParam (Body) {Number} [salary]  Salary of the Employee.
   *
   * @apiSuccess {String} _id Identifier of the Employee.
   * @apiSuccess {String} name Name of the Employee.
   * @apiSuccess {String} firstName  FirstName of the Employee.
   * @apiSuccess {Date} dateCreated  DateCreated of the Employee.
   * @apiSuccess {String} department  Department of the Employee.
   * @apiSuccess {Boolean} active  Active of the Employee.
   * @apiSuccess {Number} salary  Salary of the Employee.
   *
   * @apiSuccessExample Success-Response:
   *     {
   *       "_id": "617ab483a023a6af9e05b54b",
   *        "name": "MyName",
   *        "firstName": "MyFirstName",
   *        "dateCreated": "2020-10-00T12:00:00.000Z",
   *        "department": "Informatique",
   *        "active": true,
   *        "salary": 1000,
   *     }
   */
  static async create(req, res, next) {
    try {
      const { body } = req;

      const employee = await EmployeesService.create(body);

      return res.success(employee);
    } catch (err) {
      return next(err);
    }
  }

  /**
   * @api {put} /employees Update employee
   * @apiName UpdateEmployee
   * @apiGroup Employees
   * 
   * @apiParam {String} id Identifier of the Employee.
   * 
   * @apiParam (Body) {String} [name] Name of the Employee.
   * @apiParam (Body) {String} [firstName]  FirstName of the Employee.
   * @apiParam (Body) {Date} [dateCreated]  DateCreated of the Employee.
   * @apiParam (Body) {String} [department]  Department of the Employee.
   * @apiParam (Body) {Boolean} [active]  Active of the Employee.
   * @apiParam (Body) {Number} [salary]  Salary of the Employee.
   *
   * @apiSuccess {String} _id Identifier of the Employee.
   * @apiSuccess {String} name Name of the Employee.
   * @apiSuccess {String} firstName  FirstName of the Employee.
   * @apiSuccess {Date} dateCreated  DateCreated of the Employee.
   * @apiSuccess {String} department  Department of the Employee.
   * @apiSuccess {Boolean} active  Active of the Employee.
   * @apiSuccess {Number} salary  Salary of the Employee.
   *
   * @apiSuccessExample Success-Response:
   *     {
   *       "_id": "617ab483a023a6af9e05b54b",
   *        "name": "MyName",
   *        "firstName": "MyFirstName",
   *        "dateCreated": "2020-10-00T12:00:00.000Z",
   *        "department": "Informatique",
   *        "active": true,
   *        "salary": 1000,
   *     }
   */
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { body } = req;

      const exists = await EmployeesService.findOne({
        _id: id
      });

      if (!exists) {
        throw new ApiError(
          Errors.EMPLOYEE.NOT_FOUND,
          httpStatus.BAD_REQUEST
        );
      }

      const employee = await EmployeesService.update({
        _id: id,
      },
        body
      );

      return res.success(employee);
    } catch (err) {
      return next(err);
    }
  }

  /**
   * @api {delete} /employees/:id Delete employee
   * @apiName DeleteEmployee
   * @apiGroup Employees
   * 
   * @apiParam {String} id Identifier of the Employee.
   *
   * @apiSuccess {String} _id Identifier of the Employee.
   * @apiSuccess {String} name Name of the Employee.
   * @apiSuccess {String} firstName  FirstName of the Employee.
   * @apiSuccess {Date} dateCreated  DateCreated of the Employee.
   * @apiSuccess {String} department  Department of the Employee.
   * @apiSuccess {Boolean} active  Active of the Employee.
   * @apiSuccess {Number} salary  Salary of the Employee.
   *
   * @apiSuccessExample Success-Response:
   *     {
   *       "_id": "617ab483a023a6af9e05b54b",
   *        "name": "MyName",
   *        "firstName": "MyFirstName",
   *        "dateCreated": "2020-10-00T12:00:00.000Z",
   *        "department": "Informatique",
   *        "active": true,
   *        "salary": 1000,
   *     }
   */
  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const exists = await EmployeesService.findOne({
        _id: id
      });

      if (!exists) {
        throw new ApiError(
          Errors.EMPLOYEE.NOT_FOUND,
          httpStatus.BAD_REQUEST
        );
      }

      const employee = await EmployeesService.remove({
        _id: id,
      });

      return res.success(employee);
    } catch (err) {
      return next(err);
    }
  }
}
