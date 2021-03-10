const express = require('express');

const response = require('../../../network/response')

const router = express.Router();

router.get('/', function (req, res) {
    response.success(req, res, 'Every thing is working fine', 200);
})

module.exports = router;