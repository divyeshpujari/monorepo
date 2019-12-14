'use strict';
const chai = require('chai');
const ZSchema = require('z-schema');
const request = require('request');
const config = require('config');
const {zSchemaCustomFormat} = require('../../utils/TestUtils');
zSchemaCustomFormat(ZSchema);
const validator = new ZSchema({});
const BASE_URL = `${config.get('BASE_URL')}:${config.get('APP_PORT')}`;
chai.should();

describe('/scan-result', function () {
  const scanResultURL = `${BASE_URL}/api/scan-result`;

  describe('post', function () {
    const payload = {
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
    };
    it('should respond with 201 Success response', function (done) {
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
        url: scanResultURL,
        json: true,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: payload
      },
      function (error, res, body) {
        if (error) {return done(error);}

        res.statusCode.should.equal(201);

        validator.validate(body, schema).should.be.true;
        done();
      });
    });

    it('should respond with 400 validation error when required properties are missing', function (done) {
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
      request({
        url: scanResultURL,
        json: true,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {}
      },
      function (error, res, body) {
        if (error) {return done(error);}

        res.statusCode.should.equal(400);

        validator.validate(body, schema).should.be.true;
        done();
      });
    });

  });

  describe('get', function () {
    it('should respond with 200 Success response structure', function (done) {
      /*eslint-disable*/
      const schema = {
        "type": "array",
        "items": {
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
        }
      };

      /*eslint-enable*/
      request({
        url: scanResultURL,
        json: true,
        qs: {
          page: 1, itemsPerPage: 20
        },
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

    it('should respond with 204 No content found', function (done) {
      request({
        url: scanResultURL,
        json: true,
        qs: {
          page: '200', itemsPerPage: '1000'
        },
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      },
      function (error, res, body) {
        if (error) {return done(error);}

        res.statusCode.should.equal(204);
        done();
      });
    });

    it('should respond with 400 validation error when invalid query params pass', function (done) {
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
      request({
        url: scanResultURL,
        json: true,
        qs: {
          page: true
        },
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

  });

});
