import restifyErrors from 'restify-errors';

export default restifyErrors.makeConstructor('InvalidTokenError', {
  statusCode: 401,
  failureType: 'InvalidToken',
  message: 'Invalid token'
});
