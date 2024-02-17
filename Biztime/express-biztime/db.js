/** Database setup for BizTime. */
import { client } from "pg";

const client = new Client({
    connectionString: "postgresql:///biztime"
});

client.connect();

module.exports = client;
