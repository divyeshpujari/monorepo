'use strict';
const {assert} = require('chai');
const {Error} = require('../../../handlers');

/**
 * @TestSuite Forbidden
 * @description - Test the forbidden error handlers
 */
describe('Forbidden Error Handler Test scenario', () => {

  it('Test the forbidden error handler', () => {
    const errorMessage = 'User does not have an access for specific route';
    const expectedForbiddenError = {
      code: 'FORBIDDEN',
      message: errorMessage,
      statusCode: 403
    };
    assert.deepEqual(
      Error.Forbidden(errorMessage),
      expectedForbiddenError,
      'Forbidden error handler not work as expected'
    );
  });
});