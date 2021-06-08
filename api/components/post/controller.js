const TABLE = 'post'

module.exports = function (injectedStore) {
    let store = injectedStore

    if (!store) {
        store = require('../../../store/dummy.js')
    }

    async function list () {
        return store.list(TABLE);
    }
    
    return {
        list
    }
}