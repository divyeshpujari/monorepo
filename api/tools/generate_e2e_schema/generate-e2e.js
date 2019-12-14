'use strict';
const fs = require('fs');
const stt = require('swagger-test-templates');
const jsYaml = require('js-yaml');
// eslint-disable-next-line no-sync
const swagger = jsYaml.safeLoad(fs.readFileSync('./swagger.yaml'));
const config = {
  assertionFormat: 'should',
  testModule: 'request',
  pathName: ['/scan-result', '/scan-result/{result_id}']
};
if (!config.pathName.length) {
  throw new Error('Path not specified to generate');
}
const tests = stt.testGen(swagger, config);
tests.forEach((element) => {
  fs.writeFile('./testcases/e2e/' + element.name, element.test, (err) => {
    if (err) {throw err;}
  });
}, this);