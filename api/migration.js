'use strict';
/**
 * @file migration.js
 * @description - Use for database migration
 */
const config = require('config');
let mongoMigration = require('mongodb-migrations');
const mongoUrl = process.env.MONGO_URL || config.get('MONGODB.url');
let migrator = new mongoMigration.Migrator({
  'url': mongoUrl,
  'collection': 'migrationLog'
});

migrator.runFromDir(__dirname + '/database/migrationScripts/', (error) => {
  if (error) {
    // eslint-disable-next-line no-console
    console.log('An error occurred in a migartion', error);
    return process.exit(1);
  }
  process.exit(0);
});