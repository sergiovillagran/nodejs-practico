const express = require('express');
const bodyParser = require('body-parser');


const API_PREFIX = 'api'
const config = require('../config.js');

const user = require('./components/user/network')
const auth = require('./components/auth/network')

const app = express();

app.use(bodyParser.json());

// ROUTER
app.use(`/${API_PREFIX}/user`, user);
app.use(`/${API_PREFIX}/auth`, auth);

app.listen(config.api.port, () => {
    console.log(`Api is listening in the port ${config.api.port}`)
});