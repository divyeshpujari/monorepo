'use strict';
const {SecurityScanResultService} = require('../services');

/**
 * @module Security Scan Result controller
 * @description - Expose the file controller functions
 */
module.exports = {
  /**
   * @method createSecurityScanResult
   * @description - Provide create security scan result functionality into the system.
   *
   * @param {RequestObject} req - Incoming request object
   * @param {ResponseObject} res - The response object for incoming request
   * @param (function) next - pass request to next middleware or handler
   *
   * @returns {void}
   */
  createSecurityScanResult: (req, res, next) => {
    const params = req.swagger.params;
    let service = new SecurityScanResultService(req.logger);
    service.createSecurityScanResult(params, res, next);
  },

  /**
   * @method getSecurityScanResultList
   * @description - Provide get list of security scan result functionality into the system.
   *
   * @param {RequestObject} req - Incoming request object
   * @param {ResponseObject} res - The response object for incoming request
   * @param (function) next - pass request to next middleware or handler
   *
   * @returns {void}
   */
  getSecurityScanResultList: (req, res, next) => {
    let service = new SecurityScanResultService(req.logger);
    service.getSecurityScanResultList(req, res, next);
  },

  /**
   * @method getScanResultContent
   * @description - Provide get security scan result content functionality into the system.
   *
   * @param {RequestObject} req - Incoming request object
   * @param {ResponseObject} res - The response object for incoming request
   * @param (function) next - pass request to next middleware or handler
   *
   * @returns {void}
   */
  getScanResultContent: (req, res, next) => {
    const params = req.swagger.params;
    let service = new SecurityScanResultService(req.logger);
    service.getScanResultContent(params, res, next);
  }
};