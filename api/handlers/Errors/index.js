'use strict';
const ErrorHandler = require('./ErrorHandler');
const RuntimeError = require('./RuntimeError');
const ResourceNotfound = require('./ResourceNotfound');
const ValidationError = require('./ValidationError');
const Unauthorized = require('./Unauthorized');
const Forbidden = require('./Forbidden');
const PreConditionFailed = require('./PreConditionFailed');
const Conflicts = require('./Conflicts');

/**
 * @module Error handler module
 * @description - Expose the error handler and different error support over the system
 */
module.exports = {
  Conflicts,
  ErrorHandler,
  Forbidden,
  RuntimeError,
  PreConditionFailed,
  ResourceNotfound,
  ValidationError,
  Unauthorized
};