'use strict';
const STATUS_CODE = require('http-status-codes');

/**
 * @module Forbidden.js
 * @description - Provide a functionality to handle forbidden error. And return with appropriate format.
 *
 * @return {Object} - The forbidden error object
 */
module.exports = (message) => {
  return {
    code: 'FORBIDDEN',
    message: message,
    statusCode: STATUS_CODE.FORBIDDEN
  };
};