var express = require('express');
var app = express();
var port = 3000;
var FuelInfoAppender = require('../logic/FuelInfoAppender');

app.get('/:number(\\d+)', function(req, res) { new FuelInfoAppender().append(req.params.number, function() { res.send('OK'); }); });

app.listen(port, function() { console.log('Listening on' + port + '.'); });