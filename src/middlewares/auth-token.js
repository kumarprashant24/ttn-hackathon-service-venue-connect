import { ErrorMessages } from '../constants';
import config from '../config.js';
import authToken from '@tabdigital/api-auth-token';

const authTabToken = authToken({ brand: 'TAB' });
const cfg = config.get();

authTabToken.configureKeysPath({
  tokenEncryptionKeyPath: cfg.tokenEncryptionKeyPath,
  userChecksumSaltPath: cfg.userChecksumSaltPath,
  auth0PublicKeyPath: cfg.auth0TokenValidation.publicKeyPath,
  auth0TokenIssuer: cfg.auth0TokenValidation.validIssuer,
  auth0ValidAlgorithm: cfg.auth0TokenValidation.validAlgorithm
});

// eslint-disable-next-line @typescript-eslint/ban-types
const handler = (req, res, next) =>
  authTabToken.middlewares.decode([
    'update-status-get-list'
  ])(req, res, (err) => {
    if (err) {
      if (err.name === 'InvalidTokenError') {
        err.message =
          err.message === 'Expired token'
            ? ErrorMessages.EXPIRED_TOKEN_ERROR
            : ErrorMessages.INVALID_TOKEN_ERROR;
      } else if (err.name === 'AuthenticationRequiredError') {
        err.message = ErrorMessages.MISSING_TOKEN_ERROR;
      }
      return next(err);
    }
    next();
  });

export default {
  handler
};
