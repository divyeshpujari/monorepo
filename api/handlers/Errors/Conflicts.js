'use strict';
const STATUS_CODE = require('http-status-codes');

/**
 * @module Conflicts
 * @description - Provide a functionality to handle conflicts error. And return with appropriate format.
 *
 * @return {Object} - The conflicts error object
 */
module.exports = (message, code = 'CONFLICTS') => {
  return {
    code: code,
    message: message,
    statusCode: STATUS_CODE.CONFLICT
  };
};