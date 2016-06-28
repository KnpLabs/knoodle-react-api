#!/usr/bin/env node
'use strict';

var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var colors     = require('colors');
var cors       = require('cors');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/knoodle');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 8080;

var routes = require('./../lib/router');

app.use('/', routes);

app.listen(port);

console.log(`Knoodle API is running on port ${port} :)`.bold.green);
console.log(`Visit http://localhost:8080 !`.bold.grey);
