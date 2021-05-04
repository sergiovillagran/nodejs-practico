const express = require('express');

const response = require('../../../network/response')
const controller = require('./')

const router = express.Router();

router.post('/login', async function (req, res) {
    try {
        const { username, password } = req.body;
        const token = await controller.login(username, password);
        response.success(req, res, token, 200);
    } catch (error) {
        console.log(error);
        response.error(req, res, 'Error login an user', 500);
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