#!/usr/bin/env node

import conf from '../config.js';
import migrate from './migrate.js';

(async () => {
  let config;

  try {
    config = conf.get();
  } catch (err) {
    console.error('Cant find config json', err);
    process.abort();
  }
  if (!config.venueConnectDatabase) {
    console.error('database name required');
    process.abort();
  }
  try {
    await migrate('up', config, null);
  } catch (err) {
    console.error('migration-up failed!', err);
  }
})();
