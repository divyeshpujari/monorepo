'use strict';
const request = require('request');
const config = require('config');
const BASE_URL = `${config.get('BASE_URL')}:${config.get('APP_PORT')}`;

/**
 * @module security scan result helper
 * @description - security scan result routes related helper
 */
module.exports = {
  /**
   * @method Security scan result create helper
   * @description - Security scan result routes related helper
   *
   * @param {Object} scanResult - The scan result data object
   * @param {function} callback - The callback function
   */
  createScanResult: (scanResult, callback) => {
    const url = `${BASE_URL}/api/scan-result`;

    const scanResultBody = Object.assign({
      'QueuedAt': new Date('2019-12-14T13:03:00.536+05:30'),
      'RepositoryName': 'once',
      'Status': 'Queued',
      'ScanningAt': new Date('2019-12-14T13:03:00.536+05:30'),
      'FinishedAt': new Date('2019-12-14T13:03:00.536+05:30'),
      'Findings': [
        {
          'location': {
            'positions': {
              'begin': {
                'line': 62
              }
            },
            'path': './someJavaScriptFile.js'
          },
          'type': 'string',
          'ruleId': 'string',
          'metadata': {
            'description': 'string',
            'severity': 'HIGH'
          }
        }
      ]
    }, scanResult);

    request({
      url,
      json: true,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: scanResultBody
    },
    function (error, res, body) {
      if (error) {
        return callback(error);
      }
      return callback(null, body);
    });
  }
};