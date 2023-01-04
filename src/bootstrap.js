import config from './config';
import env from './env';
import migrate from './scripts/migrate';
/* eslint-disable @typescript-eslint/no-explicit-any */
import secrets from '@tabdigital/secrets';
import start from './start';

secrets
  .load({
    service: 'service-venue-connect',
    env,
    skip: ['Dev', 'Test']
  })
  .then(async (response) => {
    try {
      console.log('Starting migrate up');
      await migrate('up', config.get(), null);
    } catch (err) {
      console.error(err, 'Error ocurred while migrating up');
      return;
    }
    start();
  })
  .catch((e) => {
    console.error(e, 'Error getting the secrets');
  });
