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


function list (table) {
    return new Promise ( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (error, data) => {
            if (error) {
                console.log('[db error]', error)
                return reject(error);
            }
            resolve(data);
        })
    } )
}

function get (table, id) {
    return new Promise ( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id="${id}"`, (error, data) => {
            if (error) {
                console.log('[db error]', error)
                return reject(error);
            }
            resolve(data);
        })
    } )
} 

function insert (table, data) {
    return new Promise ( (resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (error, result) => {
            if (error) {
                console.log('[db error]', error)
                return reject(error);
            }
            console.log(result)
            resolve(result);
        })
    } )
}

function update (table, data) {
    return new Promise ( (resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (error, data) => {
            if (error) {
                console.log('[db error]', error)
                return reject(error);
            }
            resolve(data);
        })
    } )
}

async function upsert (table, data) {
    if (data.id) {
        const row = await get(table, data.id);
        if (row.length > 0) {
            return update(table, data);
        }
    }
    return insert(table, data);
}

function query (table, query) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ?`, query, (error, data) => {
            if (error) {
                console.log('[db error]', error)
                return reject(error);
            }
            if (data.length > 1) {
                resolve(data);
            }
            resolve({ ...data[0] } || null);
        });
    });
}

handleConection();

module.exports = {
    list,
    get,
    insert,
    upsert,
    query,
};
