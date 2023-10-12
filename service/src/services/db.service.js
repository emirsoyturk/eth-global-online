const Pool = require('pg').Pool
const dotenv = require('dotenv')
const {generalLogger} = require("./logger.service");
dotenv.config()

const pool = new Pool({
    connectionString: process.env.DB_CONNECT_STRING,
    ssl: true
})

function queryClient(client, command, parameters) {
    return client.query(command, parameters)
        .then((result) => {
            client.release();
            return result.rows;
        }).catch((error) => {
            client.release();
            throw error;
        })
}

async function queryDatabase(query, parameters) {
    if (parameters === undefined) {
        parameters = [];
    }
    return pool.connect().then((client) => {
        return queryClient(client, query, parameters)
    }).then((result) => {
        return result
    }).catch((error) => {
        console.log(error)
        generalLogger.error(error.message, {
            type: 'Database',
            method: 'queryDatabase',
            errorType: 'queryDatabase',
            query: query,
        })
    })
}


module.exports = {
    queryDatabase: queryDatabase,
}
