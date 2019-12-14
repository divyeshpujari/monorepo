'use strict';
const _ = require('lodash');
const async = require('async');
const {RuntimeError, ResourceNotfound} = require('../../handlers/Errors');
const STATUS_CODE = require('http-status-codes');
const {DbOperationHelper, dbSchemas} = require('../../database');
const {SecurityScanResult} = dbSchemas;
const {QueryParamsAndPaginationHelper} = require('../../helpers');

/**
* @class SecurityScanResultService
* @description - Security scan result operation functionality service
*/
class SecurityScanResultService {

  /**
   * @constructor
   *
   * @param {Object} logger - The logger object
   *
   * @member {Object} this.logger - The logger object
   * @member {DbOperationHelper} this.dbOperationHelper - The DbOperationHelper instance
   */
  constructor(logger) {
    this.logger = logger;
    this.dbOperationHelper = new DbOperationHelper(this.logger);
  }

  /**
   * @method createSecurityScanResult
   * @description - Provide create security scan result functionality into the system.
   *
   * @param {Object} swaggerParams - Incoming request swagger params
   * @param {ResponseObject} res - The response object for incoming request
   * @param (function) next - pass request to next middleware or handler
   *
   * @returns {void}
   */
  createSecurityScanResult(swaggerParams, res, next) {
    let payload = swaggerParams.payload.value;
    const logger = this.logger;
    const repositoryName = payload.RepositoryName;
    this.logger.info(
      `Create security scan result request received for repository name [${repositoryName}]`,
      {payload: payload}
    );

    let securityScanRecord = new SecurityScanResult(_prepareDbObject(payload));
    return this.dbOperationHelper.save(securityScanRecord, false, (error, scanResult) => {
      if (error) {
        return next(
          RuntimeError(
            `An error occurred while creating the security scan result record for repository name [${repositoryName}]`
          )
        );
      }
      logger.info(
        `Create security scan result request successfully completed for repository name [${repositoryName}]`
      );
      return res.status(STATUS_CODE.CREATED).json(scanResult);
    });

  }

  /**
   * @method getSecurityScanResultList
   * @description - Provide get list of security scan result functionality into the system.
   *
   * @param {RequestObject} req - Incoming request object
   * @param {ResponseObject} res - The response object for incoming request
   * @param (function) next - pass request to next middleware or handler
   *
   */
  getSecurityScanResultList(req, res, next) {
    let swaggerParams = req.swagger.params;
    let query = QueryParamsAndPaginationHelper.buildQuery(swaggerParams);
    let sortBy = QueryParamsAndPaginationHelper.buildSortBy(swaggerParams);
    let page = swaggerParams.page.value;
    let itemsPerPage = swaggerParams.itemsPerPage.value;
    let paginationOption = {
      sortingObj: sortBy,
      page: page,
      itemsPerPage: itemsPerPage
    };

    this.logger.info(
      'Security scan result get list request received by service',
      {query: query, paginationOption: paginationOption}
    );
    const paginationOptions = {
      query: query,
      queryOptions: {},
      paginationOption: paginationOption
    };
    async.parallel({
      count: async.apply(this.dbOperationHelper.count, SecurityScanResult, query),
      listData: async.apply(this.dbOperationHelper.pagination, SecurityScanResult, paginationOptions)
    }, (error, result) => {
      if (error) {
        return next(
          RuntimeError('An error occurred while retrieving security scan result list')
        );
      }
      res.setHeader('x-items-count', result.count);
      res.setHeader(
        'x-page-links',
        QueryParamsAndPaginationHelper.buildPageLink(req.url, page, itemsPerPage, result.count)
      );
      if (result.listData.length === 0) {
        this.logger.verbose(
          'No record found for get security scan result list'
        );
        return res.status(STATUS_CODE.NO_CONTENT).end();
      }

      this.logger.info(
        'Security scan result request successfully completed'
      );
      return res.status(STATUS_CODE.OK).json(result.listData);
    });
  }

  /**
   * @method getScanResultContent
   * @description - Provide specific scan result functionality into the system.
   *
   * @param {Object} swaggerParams - Incoming request swagger params
   * @param {ResponseObject} res - The response object for incoming request
   * @param (function) next - pass request to next middleware or handler
   *
   * @returns {void}
   */
  getScanResultContent(swaggerParams, res, next) {
    let resultId = swaggerParams.result_id.value;
    this.logger.info(`Get specific security scan result request received for id [${resultId}]`);

    const query = {
      query: resultId,
      isLean: true
    };

    return this.dbOperationHelper.findById(SecurityScanResult, query, (error, scanResult) => {
      if (error) {
        return next(
          RuntimeError(`An error occurred while retrieving the security scan result for id [${resultId}]`)
        );
      }

      if (_.isEmpty(scanResult)) {
        const message = `No security scan result found for id [${resultId}]`;
        this.logger.verbose(message);
        return next(ResourceNotfound(message));
      }

      this.logger.info(`Get security scan result request successfully completed for id [${resultId}]`);
      return res.status(STATUS_CODE.OK).json(scanResult);
    });
  }
}

module.exports = SecurityScanResultService;

/**
 * @function _prepareDbObject
 * @description Prepare the object to store in database based on payload to the request
 *
 * @param {Object} payload - The request payload object
 *
 * @private
 * @return {Object} - The prepared database object
 */
function _prepareDbObject(payload) {
  const {RepositoryName, Status, QueuedAt, ScanningAt, FinishedAt, Findings} = payload;

  return {
    RepositoryName,
    Status,
    QueuedAt,
    ScanningAt,
    FinishedAt,
    Findings
  };
}

