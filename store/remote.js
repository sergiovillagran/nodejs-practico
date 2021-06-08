const request = require('request');

function createRemoteDB(host, port) {
    const URL = `http://${host}:${port}`;

    async function list(table) {
        const data = await doRequest('GET', table)
        return data;
    }

    function get(id) {}
    function insert(data) {}
    function upsert(id, data) {}

    async function doRequest (method, table, data) {
        let url = `${URL}/${table}`
        body = '';

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
        list
    }
}

module.exports = createRemoteDB;