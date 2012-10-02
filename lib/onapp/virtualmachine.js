var $ = require('jquery'),
    utils = require('./utils');

var VirtualMachine = exports.VirtualMachine = function (client, details) {
  this.client = client;
  $.extend(this, details);
};

VirtualMachine.prototype.on = function(callback) {
  var createOptions = {
    method: 'POST',
    uri: 'virtual_machines/' + this.identifier + '/startup.json',
    client: this.client
  };

  utils.modem(createOptions, callback, function(body, response) {
    callback(null, JSON.parse(body));
  });
}

VirtualMachine.prototype.shutdown = function(callback) {
  var createOptions = {
    method: 'POST',
    uri: 'virtual_machines/' + this.identifier + '/shutdown.json',
    client: this.client
  };

  utils.modem(createOptions, callback, function(body, response) {
    callback(null, JSON.parse(body));
  });
}

VirtualMachine.prototype.off = function(callback) {
  var createOptions = {
    method: 'POST',
    uri: 'virtual_machines/' + this.identifier + '/stop.json',
    client: this.client
  };

  utils.modem(createOptions, callback, function(body, response) {
    callback(null, JSON.parse(body));
  });
}


VirtualMachine.prototype.reboot = function(callback) {
  var createOptions = {
    method: 'POST',
    uri: 'virtual_machines/' + this.identifier + '/reboot.json',
    client: this.client
  };

  utils.modem(createOptions, callback, function(body, response) {
    callback(null, JSON.parse(body));
  });
}


