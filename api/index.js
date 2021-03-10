const express = require('express');

const config = require('../config.js');
const user = require('./components/user/network')

const app = express();

// ROUTER
app.use('/api/user', user);

app.listen(config.api.port, () => {
    console.log(`Api is listening in the port ${config.api.port}`)
});