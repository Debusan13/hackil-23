import * as dotenv from 'dotenv';
dotenv.config({ path: './.envrc' });

import { MongoClient, ServerApiVersion } from 'mongodb';

const connectionString = process.env.CONNECTION_URL || "";
// console.log(`string: ${connectionString}`);

const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("db");

export default db;
