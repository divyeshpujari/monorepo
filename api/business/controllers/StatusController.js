'use strict';
const {StatusService} = require('../services');

/**
 * @module Status Controller
 * @description - Expose the Status Controller functions
 */
module.exports = {
  /**
   * @method getSystemStatus
   * @description - Provide system status
   *
   * @param {RequestObject} req - Incoming request object
   * @param {ResponseObject} res - The response object for incoming request
   * @param (function) next - pass request to next middleware or handler
   *
   * @returns {void}
   */
  getSystemStatus: (req, res) => {
    let statusService = new StatusService(req.logger);
    statusService.getSystemStatus(req.swagger.params, res);
  }
};