module.exports = {
    api: {
        port: process.env.API_PORT || 3000
    },
    posts: {
        port: process.env.POST_SERVICE_PORT || 3002
    },
    jwt: {
        secret: process.env.SECRET || 'secreto'
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'remotemysql.com',
        user: process.env.MYSQL_USER || 'yzxdEoLkGB',
        password: process.env.MYSQL_PASSWORD || 'U5yfik8EvV',
        database: process.env.MYSQL_DATABASE || 'yzxdEoLkGB',
    },
    mysqlService: {
        port: process.env.MYSQL_SERVICE_PORT || 3001,
        host: process.env.MYSQL_SERVICE_HOST || 'localhost'
    }
}   