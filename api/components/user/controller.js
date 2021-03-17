const TABLE = 'user'

module.exports = function (injectedStore) {
    let store = injectedStore

    if(!store) {
        store = require('../../../store/dummy.js')
    }

    async function list () {
        return store.list(TABLE);
    }

    async function get(id) {
        return store.get(TABLE, id);
    }


    return module.exports =  {
        list,
        get
    }
}