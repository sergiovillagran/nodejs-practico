const mysql = require('mysql')

const config = require('../config')

const dbConfig = {
    host,
    user,
    password,
    database,
} = config.mysql;

let connection;

function handleConection () {
    connection = mysql.createConnection(dbConfig);

    connection.connect((err) => {
        if (err) {
            console.error('[db error]', err);
            setTimeout(handleConection, 2000);
        }
        console.log('[db]', 'DB Connected');
    })

    connection.on('error', (err) => {
        console.error('[db error]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            return handleConection();
        }
        throw err;
    })
}

handleConection();
