const express = require('express');

const response = require('../../../network/response')
const controller = require('./')

const router = express.Router();

router.get('/', async function (req, res) {
    try {
        const list = await controller.list();
        response.success(req, res, list, 200);
    } catch (error) {
        response.error(req, res, 'Error getting users', 500);
    }
    
})

router.get('/:id', async function (req, res) {
    try {
        const user = await controller.get(req.params.id);
        response.success(req, res, user, 200);
    } catch (error) {
        console.log(error);
        response.error(req, res, 'Error getting user by id', 500);
    }
})

module.exports = router;