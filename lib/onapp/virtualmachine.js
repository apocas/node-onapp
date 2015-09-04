var util = require('util'),
    utils = require('./utils');

var VirtualMachine = exports.VirtualMachine = function (client, details) {
  this.client = client;
  util.inherits(this, details);
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
};

VirtualMachine.prototype.shutdown = function(callback) {
  var createOptions = {
    method: 'POST',
    uri: 'virtual_machines/' + this.identifier + '/shutdown.json',
    client: this.client
  };

  utils.modem(createOptions, callback, function(body, response) {
    callback(null, JSON.parse(body));
  });
};

VirtualMachine.prototype.off = function(callback) {
  var createOptions = {
    method: 'POST',
    uri: 'virtual_machines/' + this.identifier + '/stop.json',
    client: this.client
  };

  utils.modem(createOptions, callback, function(body, response) {
    callback(null, JSON.parse(body));
  });
};

VirtualMachine.prototype.changeOwner = function(userid, callback) {
  var createOptions = {
    method: 'POST',
    uri: 'virtual_machines/' + this.identifier + '/change_owner.json',
    client: this.client,
    body: {'user_id': userid}
  };

  utils.modem(createOptions, callback, function(body, response) {
    callback(null, JSON.parse(body));
  });
};

VirtualMachine.prototype.reboot = function(callback) {
  var createOptions = {
    method: 'POST',
    uri: 'virtual_machines/' + this.identifier + '/reboot.json',
    client: this.client
  };

  utils.modem(createOptions, callback, function(body, response) {
    callback(null, JSON.parse(body));
  });
};

VirtualMachine.prototype.destroy = function (callback) {
  var self = this;

  var createOptions = {
    method: 'DELETE',
    uri: 'virtual_machines/' + this.identifier + '.json',
    client: this.client
  };

  utils.modem(createOptions, callback, function(body, response) {
    callback(null, body);
  });
};

