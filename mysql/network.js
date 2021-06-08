const express = require('express');

const response = require('../network/response');
const Store = require('../store/mysql');

const router = express.Router();

router.get('/:table', list);
router.get('/:table/:id', get);
router.post('/:table', insert);
router.put('/:table', upsert);

async function list(req, res, next) {
    try {
        const data = await Store.list(req.params.table);
        response.success(req, res, data, 200);
    } catch (error) {
        next();
    }
}

async function get(req, res, next) {
    try {
        const { table, id } = req.params;
        const row = await Store.get(table, id);
        response.success(req, res, row, 200);
    } catch (error) {
        next();
    }
}

async function insert(req, res, next) {
    try {
        const { table } = req.params;
        const row = await Store.insert(table, req.body);
        response.success(req, res, row, 200);
    } catch (error) {
        next();
    }
}

async function upsert(req, res, next) {
    try {
        const { table } = req.params;
        const data = await Store.upsert(table, req.body);
        response.success(req, res, data, 200);
    } catch (error) {
        next();
    }
}

module.exports = router;