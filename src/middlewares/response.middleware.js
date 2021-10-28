// Load modules
const status = require('http-status');

module.exports = class ResponseMiddleware {
  // Add custom responses
  static setup(req, res, next) {
    res.success = (data) => {
      res.json({
        success: true,
        data,
        status: status.OK,
      });
    };

    next();
  }
};
