// Load modules
const status = require('http-status');

// Load configs
const environment = require('../../config/environment');

module.exports = class ErrorMiddleware {
  // Api global error handler
  static handler(error, req, res, next) {
    let { message } = error;

    // Check if error comes from param validation
    if (error.details) {
      error.status = status.BAD_REQUEST;
      if (error.details.body) {
        message = error.details.body[0].message;
      }
      if (error.details.query) {
        message = error.details.query[0].message;
      }
      if (error.details.params) {
        message = error.details.params[0].message;
      }
    }

    const _status = error.status || status.INTERNAL_SERVER_ERROR;

    res.status(_status).json({
      success: false,
      error: message,
      code: error.errorCode || _status,
      status: _status,
      stack: environment.env === 'development' ? error.stack : undefined,
    });
  }
};
