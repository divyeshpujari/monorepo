'use strict';
const allowedEnv = [
  'production',
  'testing',
  'ci'
];
const config = require('config');

/**
 * @module Config
 * @description - Expose the configuration over the system
 *
 * @return {Object} config - The configuration object
 */
module.exports = () => {
  let environment = process.env && process.env.NODE_ENV;
  if (environment && !allowedEnv.includes(environment)) {
    // eslint-disable-next-line no-console
    console.log('Given environment does not supported by system', {supportedEnv: allowedEnv});
    return process.exit(1);
  }
  return config;
};