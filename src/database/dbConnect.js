import pg from "pg";
import config from '../config';
const Client = pg.Client;

export default async function dbConnect() {
    try {
        const dbConfiguration = config.get();
        const client = new Client(dbConfiguration.venueConnectDatabase)
        client.connect();
        return client
    } catch (error) {
        console.log(error)
    }

}

