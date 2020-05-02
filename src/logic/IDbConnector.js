const Interface = require('@amadek/js-sdk/Interface');

const IDbConnector = new Interface('IDbConnector', ['connect', 'close'], []);

module.exports = IDbConnector;
