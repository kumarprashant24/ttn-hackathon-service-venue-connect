import restifyErrors from 'restify-errors';

/* The error will be serialised by @tabdigital/restify-formatters to become:
   {
    code: 'INVALID_SYNTAX_ERROR', // The name of the error will become the error code in the response
    message: '',
    // These properties are passed as info object in the constructor (https://github.com/joyent/node-verror#verrorinfoerr)
    // and are serialised because they are included in the restifyFormattersOpts.includedProps
    errors: [],
   }
*/
export default restifyErrors.makeConstructor('InvalidSyntaxError', {
  statusCode: 400,
  // Properties that will be serialised in the HTTP response
  restifyFormattersOpts: {
    includedProps: ['errors']
  }
});
