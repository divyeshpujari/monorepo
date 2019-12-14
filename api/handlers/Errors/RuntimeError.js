'use strict';
const STATUS_CODE = require('http-status-codes');

/**
 * @module Runtime-Error
 * @description - Provide a functionality to handle Runtime error. And return with appropriate format.
 *
 * @return {Object} - The runtime error object
 */
module.exports = (message) => {
  return {
    message: message,
    statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR
  };
};