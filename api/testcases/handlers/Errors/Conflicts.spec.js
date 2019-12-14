'use strict';
const {assert} = require('chai');
const {Error} = require('../../../handlers');

/**
 * @TestSuite Conflicts
 * @description - Test the conflicts error handler
 */
describe('Conflicts Error Handler Test scenario', () => {

  it('Test the conflicts error handler', () => {
    const errorMessage = 'User already exist with given email address';
    const expectedConflictsError = {
      code: 'CONFLICTS',
      message: errorMessage,
      statusCode: 409
    };
    assert.deepEqual(
      Error.Conflicts(errorMessage),
      expectedConflictsError,
      'Conflicts error handler not work as expected'
    );
  });
});