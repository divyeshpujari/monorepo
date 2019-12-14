'use strict';
const STATUS_CODE = require('http-status-codes');

/**
 * @class StatusService
 * @description - System status functionality service
 */
class StatusService {

  /**
   * @constructor
   *
   * @param {Object} logger - The logger object
   *
   * @member {Object} this.logger - The logger object
   */
  constructor(logger) {
    this.logger = logger;
  }

  /**
   * @method getSystemStatus
   * @description - Provide system status
   *
   * @param {Object} swaggerParams - Incoming request swagger params
   * @param {ResponseObject} res - The response object for incoming request
   *
   * @returns {void}
   */
  getSystemStatus(swaggerParams, res) {
    this.logger.info(
      'Get system status inquiry request received and successfully completed'
    );
    return res.status(STATUS_CODE.OK).json({
      message: 'System is working fine',
      responseAt: new Date()
    });
  }
}

module.exports = StatusService;