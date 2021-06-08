const express = require('express');

const response = require('../../../network/response')
const controller = require('./')

const router = express.Router();

router.get('/', list)

function list(req, res, next) {
    try {
        const posts = await controller.list();
        response.success(req, res, posts, 200);
    } catch (error) {
        next();
    }
}

module.exports = router;