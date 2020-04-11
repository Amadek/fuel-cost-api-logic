const Interface = require('@amadek/js-sdk/Interface');

const ITokenValidator = new Interface('ITokenValidator', [ 'validate' ], []);

module.exports = ITokenValidator;
