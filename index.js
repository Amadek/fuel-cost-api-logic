const config = require('./config')[process.env.NODE_ENV];
const express = require('express');
const helmet = require('helmet');
const IndexController = require('./api/IndexController');
const DummyLogger = require('./api/DummyLogger');
const app = express();

const logger = new DummyLogger();

app.use(helmet());
app.use(express.json());
app.use(new IndexController(config, logger).route(express.Router()));
app.use((req, res, next) => res.status(404).end());
app.listen(config.api.port);
