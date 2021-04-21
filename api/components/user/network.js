const express = require('express');

const response = require('../../../network/response')
const controller = require('./')

const router = express.Router();

router.post('/', post)
router.get('/', get)
router.get('/:id', getById)

async function post (req, res) {
    try {
        const { name, username, password } = req.body;
        const user = await controller.upsert(
            { name, username, password }
        );
        response.success(req, res, user, 200);
    } catch (error) {
        console.log(error);
        response.error(req, res, 'Error creating an user', 500);
    }
}

async function get(req, res) {
    try {
        const list = await controller.list();
        response.success(req, res, list, 200);
    } catch (error) {
        response.error(req, res, 'Error getting users', 500);
    }
    
}

async function getById(req, res) {
    try {
        const user = await controller.get(req.params.id);
        response.success(req, res, user, 200);
    } catch (error) {
        console.log(error);
        response.error(req, res, 'Error getting user by id', 500);
    }
}


module.exports = router;