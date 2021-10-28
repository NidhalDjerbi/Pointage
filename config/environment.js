// Load modules
const Joi = require('joi');

// Require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// Define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow('development', 'production')
    .default('development'),
  PORT: Joi.number().default(3000),
  DB_URL: Joi.string().required(),
})
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  database: {
    url: envVars.DB_URL,
  },
};

module.exports = config;