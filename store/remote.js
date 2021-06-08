const request = require('request');

function createRemoteDB(host, port) {
    const URL = `http://${host}:${port}`;

    async function list(table) {
        const data = await doRequest('GET', table)
        return data;
    }

    async function get(id) {
        const data = await doRequest('GET', table, { id })
        return data;
    }

    async function insert(data) {
        const insertedRow = await doRequest('POST', table, data)
        return insertedRow;
    }
    async function upsert(id, data) {
        const updatResult = await doRequest('PUT', table, { id, ...data })
        return updatResult;
    }

    async function doRequest (method, table, data) {
        let url = parseURL(table, data);
        body = data;

        return new Promise((resolve, reject) => {
            request({
                method,
                headers: {
                    'content-type': 'application/json'
                },
                url,
                body
            }, (err, req, body) => {
                if(err) {
                    console.error('Error en la base de datos remota', err)
                    return reject(err.message);
                }

                const resp = JSON.parse(body);
                return resolve(resp);
            })
        });
    }

    return {
        list,
        get,
        insert,
        upsert
    }
}

function parseURL (table, data) {
    return (data.id !== undefined) && (data.id !== null) 
        ? `${URL}/${table}`:
        `${URL}/${table}/data.id`;
}

module.exports = createRemoteDB;