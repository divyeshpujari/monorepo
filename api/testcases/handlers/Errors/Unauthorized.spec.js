'use strict';
const {assert} = require('chai');
const {Error} = require('../../../handlers');

/**
 * @TestSuite Unauthorized Error
 * @description - Test the unauthorized error handler
 */
describe('Unauthorized Error Handler Test scenario', () => {

  it('Test the Unauthorized error handler', () => {
    const errorMessage = 'Invalid credentials found';
    const expectedUnauthorizedError = {
      code: 'UNAUTHORIZED',
      message: errorMessage,
      statusCode: 401
    };
    assert.deepEqual(
      Error.Unauthorized(errorMessage),
      expectedUnauthorizedError,
      'Unauthorized error handler not work as expected'
    );
  });
});