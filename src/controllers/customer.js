import customers from '../services/customer';
import restifyErrors from 'restify-errors';
import { ErrorMessages } from '../constants';

export default async function customerLists(req, res) {
    try {
        const result = await customers(req);
        res.send(200, {users: result});
    }
    catch (err) {
        res.send(
          new restifyErrors.ServiceUnavailableError(err, ErrorMessages.SERVER_ERROR)
        );
      }
}
