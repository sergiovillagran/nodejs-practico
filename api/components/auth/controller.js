const bcrypt = require('bcrypt')
const { sign } = require('../../../auth')

const TABLE = 'auth'

module.exports = function (injectedStore) {
    let store = injectedStore

    if(!store) {
        store = require('../../../store/dummy.js')
    }

    function upsert(data) {
        const authData = {
            id: data.id
        }

        if (data.username) {
            authData.username = data.username;
        }

        if (data.password) {
            authData.password = bcrypt.hashSync(data.password, 5); 
        }

        return store.upsert(TABLE, authData);
    }

    async function login (username, password) {
        const data = await store.query(TABLE, { username });
        console.log(data);
        const arePasswordtheSame = await bcrypt.compare(password, data.password)
        if (arePasswordtheSame) {
            return sign(data);
        } else {
            throw new Error('Invalid Information');
        }
    }


    return module.exports =  {
        upsert,
        login
    }
}