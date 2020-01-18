const { Pool } = require('pg');

const pool = new Pool({
    user: 'Samson',
    host: 'localhost',
    database: 'Legion',
    password: 'Sanguyen5',
    port: 5432
});

module.exports = {
    query: (text, params) => pool.query(text, params)
}