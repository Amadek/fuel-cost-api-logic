require('dotenv').config({ path: '.env.dev' });
var express = require('express');
var app = express();
var IndexController = require('./IndexController');

app.use(express.json());
app.use(new IndexController(process.env).route(express.Router()));

app.listen(process.env.API_PORT, function () {
  console.log('Listening on ' + process.env.API_PORT + '...');
});
