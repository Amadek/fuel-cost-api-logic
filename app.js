var config = require('./config');
var IApiLoader = require('./loaders/ILoader');
var ApiLoader = require('./loaders/ApiLoader');

var loaders = [
  new ApiLoader(config)
];

// First check if all loaders implement interface.
loaders.forEach(function (loader) {
  IApiLoader.ensureImplemented(loader);
});

// Load all.
loaders.forEach(function (loader) {
  loader.load();
});
