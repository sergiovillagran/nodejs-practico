const express = require('express');

const secure = require('./secure')
const response = require('../../../network/response')
const controller = require('./')

const router = express.Router();

router.post('/', post)
router.post('/follow/:id', secure('follow'), follow);
router.get('/follow', secure('follow'), getFollows);
router.get('/', get)
router.get('/:id', getById)
router.put('/', secure('update'), post)

async function post (req, res) {
    try {
        const { id, name, username, password } = req.body;
        const user = await controller.upsert(
            { id, name, username, password }
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

async function follow(req, res, next) {
    try {
        const result = await controller.follow(req.user.id, req.params.id);
        response.success(req, res, result, 201);
    } catch (error) {
        console.log(error);
        next();
    }
}
async function getFollows(req, res, next) {
    try {
        const result = await controller.getFollows(req.user.id);
        response.success(req, res, result, 201);
    } catch (error) {
        console.log(error);
        next();
    }
}


module.exports = router;