'use strict';
const StatusService = require('./StatusService');
const SecurityScanResultService = require('./SecurityScanResultService');

/**
* @module Service
* @description - Expose the services of controller business logic over the system
*
* @return {Object} config - The services object
*/
module.exports = {
  StatusService,
  SecurityScanResultService
};