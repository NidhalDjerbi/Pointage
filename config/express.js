// Load modules
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Load middlewares
const ResponseMiddleware = require('../src/middlewares/response.middleware');
const RoutingMiddleware = require('../src/middlewares/routing.middleware');
const ErrorMiddleware = require('../src/middlewares/error.middleware');

// Load routes
const routes = require('../src/routes');

// Create express app
const app = express();

// Handle json body request body
app.use(express.json());

// Handle urlencoded request body
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Secure apps by setting various HTTP headers
app.use(helmet());

// Enable CORS - Cross Origin Resource Sharing
app.use(cors());

// Add response custom function
app.use(ResponseMiddleware.setup);

// Load api routes
app.use('/api', routes);

// Catch 404 and forward to error handler
app.use(RoutingMiddleware.notFound);

// Error handler
// eslint-disable-next-line no-unused-vars
app.use(ErrorMiddleware.handler);

module.exports = app;
