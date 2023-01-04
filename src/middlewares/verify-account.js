import restifyErrors from 'restify-errors';

import { ErrorMessages } from '../constants';

const accountNumberInBody = (req) =>
  req && req.body && req.body.accountDetails
    ? req.body.accountDetails.accountNumber
    : 0;

const accountNumbersMatch = (req) =>
  accountNumberInBody(req) === parseInt(req.params.accountNumber, 10);

// eslint-disable-next-line @typescript-eslint/ban-types
const handler = (req, res, next) => {
  if (req.params.accountNumber && !accountNumbersMatch(req)) {
    console.error(
      'transaction:accountMismatch',
      req,
      {
        numberInUrlParam: req.params.accountNumber,
        numberInReqBody: accountNumberInBody(req)
      },
      'Account number does not match'
    );
    return next(
      new restifyErrors.UnauthorizedError(ErrorMessages.ACCOUNT_MISMATCH)
    );
  }
  next();
};

export default {
  handler
};
