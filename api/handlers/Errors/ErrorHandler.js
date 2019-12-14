'use strict';

/**
 * @module ErrorHandler.js
 * @description - Provide a functionality to handle error. And return with appropriate format.
 */
module.exports = (errorObj, req, res) => {
  let statusCode = errorObj.statusCode || res.statusCode;
  let errorMessage = errorObj.message;
  let errorCode = errorObj.code;
  let errors = (errorObj.results && errorObj.results.errors) || errorObj.errors;

  return res.status(statusCode).json({
    code: errorCode,
    message: errorMessage,
    errors: errors
  });
};