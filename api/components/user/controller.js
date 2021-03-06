const nanoid = require('nanoid')
const auth = require('../auth/')

const TABLE = 'user'

module.exports = function (injectedStore) {
    let store = injectedStore

    if (!store) {
        store = require('../../../store/dummy.js')
    }

    async function list () {
        return store.list(TABLE);
    }

    async function get(id) {
        return store.get(TABLE, id);
    }

    async function upsert(body) {
        const user = {
            name: body.name,
            username: body.username,
        }

        if (body.id) {
            user.id = body.id
        } else {
            user.id = nanoid.nanoid();
        }

        if (body.password || body.username) {
            await auth.upsert({
                id: user.id, 
                username: user.username,
                password: body.password
            });
        }

        return store.upsert(TABLE, user);
    }

    async function follow (from, to){
        return store.upsert(TABLE + '_follow', {
            user_from: from,
            user_to: to,
        })
    }

    async function getFollows (from, to){
        return store.query(TABLE + '_follow', {
            user_from: from,
        })
    }


    return module.exports =  {
        list,
        get,
        upsert,
        follow,
        getFollows
    }
}