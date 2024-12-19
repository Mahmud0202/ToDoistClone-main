const { createDb } = require("drizzle-orm");

const db = createDb({
    client: "pg",
    connection: process.env.DB_CONNECTION_STRING, // From .env file
});

module.exports = { db };
