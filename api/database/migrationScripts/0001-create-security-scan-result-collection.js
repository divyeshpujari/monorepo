'use strict';

exports.id = '0001-create-security-scan-result-collection';

exports.up = function up(done) {
  this.db.createCollection('SecurityScanResult', done);
};

exports.down = function down(done) {
  this.db.collection('SecurityScanResult').drop(done);
};