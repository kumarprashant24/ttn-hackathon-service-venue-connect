import restifyErrors from 'restify-errors';

/* The error will be serialised by @tabdigital/restify-formatters to become:
   {
    code: 'INTERNAL_SERVER_ERROR', // The name of the error will become the error code in the response
    message: '',
   }
*/
export default restifyErrors.makeConstructor('InternalServerError', {
  statusCode: 500
});
