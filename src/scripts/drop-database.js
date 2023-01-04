#!/usr/bin/env node

import dbSetup from '@tabdigital/db-setup';
import config from '../config.js';

const { database: dbName } = config.get().venueConnectDatabase;

(async () => {
  try {
    await dbSetup.drop(dbName);
    console.log('DB dropped successfully');
  } catch (err) {
    console.error('DB drop failed', err);
  }
})();
