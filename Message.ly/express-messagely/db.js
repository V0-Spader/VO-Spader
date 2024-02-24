/** Database connection for messagely. */


import { Client } from "pg";
import default from "./config";
const { DB_URI } = default;

const client = new Client(DB_URI);

client.connect();


export default client;
