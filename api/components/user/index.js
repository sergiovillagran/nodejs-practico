const controller = require('./controller')
const store = require('../../../store/remoteMysql')

module.exports = controller(store);

