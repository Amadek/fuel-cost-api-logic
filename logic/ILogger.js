const Interface = require('@amadek/js-sdk/Interface');

const ILogger = new Interface('ILogger', ['logEvent', 'logException', 'logTrace'], []);

module.exports = ILogger;
