import { axiosClient } from '../../utils';
import config from '../../config';
import * as uriTemplate from '@tabdigital/uri-template';
import errors from 'restify-errors';

const cfg = config.get();
// Call account service

const getCustomerDetailsTemplate = uriTemplate.parse(
  `${cfg.accountService.url}/tab/accounts/{accountNumber}`
);

const getDetailsUrl = async (
  accountNumber
) => {
  return getCustomerDetailsTemplate.expand({
    accountNumber
  });
};

const getDetails = async (
  req,
  accountNumber
) => {
  try {
    const detailsUrl = await getDetailsUrl(accountNumber);

    //TODO: 5 - get-my-bets - Get statements from CAM via the account-service
    const customerDetails = await axiosClient.get(
      detailsUrl,
      cfg.accountService.timeout,
      req
    );
    return customerDetails;
  } catch (err) {
    throw new errors.ServiceUnavailableError(
      err,
      'Unable to reach account service'
    );
  }
};

export default { getDetails };
