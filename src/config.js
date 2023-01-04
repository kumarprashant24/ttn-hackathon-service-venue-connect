import env from './env.js';
import jconfig from '@tabdigital/json-config';
import s from 'strummer';

const cfg = jconfig.load({
  path: `configs/${env}/config.json`,
  schema: new s({
    serverPort: new s.number(),
    publicUrl: new s.url(),
    basePath: new s.string(),
    logAllRequests: new s.boolean(),
    requestTimeout: new s.duration(),
    showStackTrace: new s.boolean(),
    venueConnectDatabase: {
      venueConnect: new s.string()
    },
    venueConnectDatabasePool: {
      connectionTimeout: 'duration',
      idleTimeout: 'duration',
      max: s.number({ parse: true })
    },
    tokenEncryptionKeyPath: new s.string(),
    userChecksumSaltPath: new s.string(),
    auth0TokenValidation: {
      publicKeyPath: new s.string(),
      validIssuer: new s.string(),
      validAlgorithm: new s.string()
    }
  })
});

const get = () => cfg;
export default { get };
