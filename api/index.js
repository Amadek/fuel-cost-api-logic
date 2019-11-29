var express = require('express');
var app = express();
var config = require('./config');
var IndexController = require('./IndexController');

new IndexController(app, config);