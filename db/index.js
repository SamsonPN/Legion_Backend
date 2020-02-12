const { Pool } = require('pg');
const {user, host, database, password, port} = require('../config/keys').pgadmin;
// const {user, host, database, password, port} = require('../config/keys').heroku;


const pool = new Pool({
    user,
    host,
    database,
    password,
    port
});

module.exports = {
    query: (text, params) => pool.query(text, params)
}