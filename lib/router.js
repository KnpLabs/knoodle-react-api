'use strict';

const router = require('express').Router();

let controllers = require('./controllers');

for (let controller of controllers) {
    controller(router);
}

module.exports = router;
