import dbConnect from '../database/dbConnect';
import { getCustomerDetails } from '../services/accounts';
import toCamelCase from 'camelcase-keys';

export default async function updateCustomerStatusAndGetList(req) {
    try {
        const { venueId, active } = req.body;
        const { accountNumber } = req.body.accountDetails;
        const client = await dbConnect();
        if (!active) {
            await client.query(
                'delete from customers where account_number = $1 and venue_id = $2',
                [accountNumber, venueId]
            );
        } else {
            const details = await getCustomerDetails.getDetails(req, accountNumber);
            const { firstName, lastName, middleName } = details.customerDetails;
            await client.query(
              'insert into customers(venue_id, first_name, last_name, middle_name, account_number, active_status) values($1, $2, $3, $4, $5, $6) ON CONFLICT (venue_id, account_number) do update set active_status = $7',
              [venueId, firstName, lastName, middleName, accountNumber, active, active]
            );
        }
        const res = await client.query(
            'select account_number as accountNumber, first_name, middle_name, last_name from customers where venue_id = $1',
            [venueId]
        );
        return toCamelCase(res.rows);

    } catch (error) {
        console.log(error);
        throw error;
    }


}
