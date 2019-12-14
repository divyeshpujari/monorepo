'use strict';
const STATUS_CODE = require('http-status-codes');

/**
 * @module Unauthorized
 * @description - Provide a functionality to handle unauthorized error. And return with appropriate format.
 *
 * @return {Object} - The unauthorized error object
 */
module.exports = (message) => {
  return {
    code: 'UNAUTHORIZED',
    message: message,
    statusCode: STATUS_CODE.UNAUTHORIZED
  };
};