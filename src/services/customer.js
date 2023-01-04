import updateCustomerStatusAndGetList from '../db-handlers/customer-db-handler';
export default async function customers(req) {
    try {
        const customer = await updateCustomerStatusAndGetList(req)
        return customer
    } catch (error) {
        throw error;
    }
}
