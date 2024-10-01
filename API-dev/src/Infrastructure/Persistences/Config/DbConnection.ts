const {MongoClient} = require("mongodb");
require('dotenv').config();
const URI = process.env.CONNECTION_STRING;
const dbName = "NoahQuizDB";

async function connectDB() {
    const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log("Connected successfully to database !");
    return client.db(dbName);
}

export {
    connectDB,
}