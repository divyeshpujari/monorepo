'use strict';
const STATUS_CODE = require('http-status-codes');

/**
 * @module Validation-Error
 * @description - Provide a functionality to handle validation error. And return with appropriate format.
 *
 * @return {Object} - The validation error object
 */
module.exports = (message, errors, code = 'FAILED_TO_VALIDATE') => {
  return {
    code: code,
    message: message,
    errors: errors,
    statusCode: STATUS_CODE.BAD_REQUEST
  };
};