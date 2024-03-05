/** Database setup for jobly. */

import { Client } from 'pg';
import { DB_URI } from './config';

const client = new Client(DB_URI);

client.connect();

export default client;
