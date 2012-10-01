var http = require('http'),
    url = require('url'),
    request = require('request'),
    onapp = require('../onapp'),
    utils = require('./utils');

var serverUrl = '';

exports.createClient = function (options) {
  return new Client(options);
}

var Client = exports.Client = function (options) {
  if(!options.username) throw new Error ('options.username is required to create config');
  if(!options.apiKey) throw new Error ('options.apiKey is required to create config');
  if(!options.serverUrl) throw new Error ('options.serverUrl is required to create config');

  this.config = options;
  this.authorized = false;
}

Client.prototype.getVersion = function (callback) {
  utils.modem(['version.json'], this, callback, function (body) {
    callback(null, JSON.parse(body).version);
  });
};
