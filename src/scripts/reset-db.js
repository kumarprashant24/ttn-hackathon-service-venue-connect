#!/usr/bin/env node

import dbSetup from '@tabdigital/db-setup';
import conf from '../config.js';

const resetDb = async (config, logger) => {
  const log = logger ? logger.info.bind(logger) : console.log.bind(console);

  // this will drop the database
  await dbSetup.drop(config.venueConnectDatabase);

  // this will create a blank database along with the required application role
  await dbSetup.reset(config.venueConnectDatabase);

  log('Db reset successfull!');
};

(async () => {
  let config;

  try {
    config = conf.get();
    console.log(config);
  } catch (err) {
    console.error('Cant find config json', err);
    process.abort();
  }
  if (!config.venueConnectDatabase.database) {
    console.error('database name required');
    process.abort();
  }
  try {
    await resetDb(config, null);
  } catch (err) {
    console.error('reset-db failed!', err);
  }
})();
