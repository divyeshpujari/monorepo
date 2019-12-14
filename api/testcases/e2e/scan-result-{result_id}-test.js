'use strict';
const chai = require('chai');
const ZSchema = require('z-schema');
const request = require('request');
const config = require('config');
const {zSchemaCustomFormat} = require('../../utils/TestUtils');
zSchemaCustomFormat(ZSchema);
const validator = new ZSchema({});
const BASE_URL = `${config.get('BASE_URL')}:${config.get('APP_PORT')}`;
const {SecurityScanHelper} = require('./e2eHelper');
chai.should();

describe('/scan-result/{result_id}', function () {
  let resultId;
  before((done) => {
    SecurityScanHelper.createScanResult({}, (error, scanResultDoc) => {
      if (error) {
        return done(error);
      }
      resultId = scanResultDoc._id;
      return done();
    });
  });

  describe('get', function () {
    it('should respond with 200 Success response structure', function (done) {
      /*eslint-disable*/
      const schema = {
        "allOf": [
          {
            "type": "object",
            "required": [
              "_id",
              "updatedAt",
              "createdAt",
              "__v"
            ],
            "properties": {
              "_id": {
                "type": "string",
                "pattern": "^[a-f\\d]{24}$"
              },
              "updatedAt": {
                "type": "string",
                "format": "date-time"
              },
              "createdAt": {
                "type": "string",
                "format": "date-time"
              },
              "__v": {
                "type": "integer"
              }
            }
          },
          {
            "type": "object",
            "required": [
              "RepositoryName",
              "Status"
            ],
            "properties": {
              "RepositoryName": {
                "type": "string",
                "minLength": 1
              },
              "Status": {
                "type": "string",
                "enum": [
                  "Queued",
                  "In Progress",
                  "Success",
                  "Failure"
                ]
              },
              "QueuedAt": {
                "type": "string",
                "format": "date-time"
              },
              "ScanningAt": {
                "type": "string",
                "format": "date-time"
              },
              "FinishedAt": {
                "type": "string",
                "format": "date-time"
              },
              "Findings": {
                "type": "array",
                "items": {
                  "type": "object",
                  "required": [
                    "type",
                    "ruleId",
                    "location",
                    "metadata"
                  ],
                  "properties": {
                    "type": {
                      "type": "string",
                      "minLength": 1
                    },
                    "ruleId": {
                      "type": "string",
                      "minLength": 1
                    },
                    "location": {
                      "type": "object",
                      "required": [
                        "path",
                        "positions"
                      ],
                      "properties": {
                        "path": {
                          "type": "string",
                          "minLength": 1
                        },
                        "positions": {
                          "type": "object",
                          "required": [
                            "begin"
                          ],
                          "properties": {
                            "begin": {
                              "type": "object",
                              "required": [
                                "line"
                              ],
                              "properties": {
                                "line": {
                                  "type": "number"
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "metadata": {
                      "type": "object",
                      "required": [
                        "severity"
                      ],
                      "properties": {
                        "description": {
                          "type": "string"
                        },
                        "severity": {
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        ]
      };

      /*eslint-enable*/
      request({
        url: `${BASE_URL}/api/scan-result/${resultId}`,
        json: true,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      },
      function (error, res, body) {
        if (error) {return done(error);}

        res.statusCode.should.equal(200);

        validator.validate(body, schema).should.be.true;
        done();
      });
    });

    it('should respond with 400 validation error response', function (done) {
      /*eslint-disable*/
      const schema = {
        "type": "object",
        "properties": {
          "code": {
            "type": "string"
          },
          "message": {
            "type": "string"
          },
          "errors": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "code": {
                  "type": "string"
                },
                "message": {
                  "type": "string"
                },
                "path": {
                  "type": "array"
                }
              }
            }
          }
        },
        "required": [
          "message"
        ]
      };

      /*eslint-enable*/
      const resultId = 'someInvalidObjectId';
      request({
        url: `${BASE_URL}/api/scan-result/${resultId}`,
        json: true,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      },
      function (error, res, body) {
        if (error) {return done(error);}

        res.statusCode.should.equal(400);

        validator.validate(body, schema).should.be.true;
        done();
      });
    });

    it('should respond with 404 validation error response', function (done) {
      /*eslint-disable*/
      const schema = {
        "type": "object",
        "properties": {
          "code": {
            "type": "string"
          },
          "message": {
            "type": "string"
          },
          "errors": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "code": {
                  "type": "string"
                },
                "message": {
                  "type": "string"
                },
                "path": {
                  "type": "array"
                }
              }
            }
          }
        },
        "required": [
          "message"
        ]
      };

      /*eslint-enable*/
      const resultId = '5df4ba3d0ce188d1ccda8418';
      request({
        url: `${BASE_URL}/api/scan-result/${resultId}`,
        json: true,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      },
      function (error, res, body) {
        if (error) {return done(error);}

        res.statusCode.should.equal(404);

        validator.validate(body, schema).should.be.true;
        done();
      });
    });

  });

});
