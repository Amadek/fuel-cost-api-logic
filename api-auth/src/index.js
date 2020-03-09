const express = require('express');
const helmet = require('helmet');
const config = require('./config');
const AuthController = require('./controllers/AuthController');
const app = express();

app.use(helmet());
app.use('/auth', new AuthController(config).route(express.Router()));
app.listen(config.api.port, () => console.log(`Listening on ${config.api.port}...`));
