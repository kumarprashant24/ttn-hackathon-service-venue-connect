#!/usr/bin/env node

import conf from '../config';
import migrate from './migrate';

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
    await migrate('down', config, null);
  } catch (err) {
    console.error('migration-down failed!', err);
  }
})();
