var Interface = require('@amadek/js-sdk/Interface');

var ILogger = new Interface('ILogger', ['logEvent', 'logException', 'logTrace'], []);

module.exports = ILogger;
