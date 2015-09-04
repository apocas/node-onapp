var util = require('util'),
    utils = require('./utils'),
    onapp = require('../onapp');

var BaseResource = exports.BaseResource = function (client, details) {
  this.client = client;
  util.inherits(this, details);
};

BaseResource.prototype.save = function (callback) {
  var self = this;

  var container  = {};
  container.base_resource = {};
  container.base_resource.prices = this.prices;
  container.base_resource.limits = this.limits;

  var createOptions = {
    method: 'PUT',
    uri: 'billing_plans/' + this.billing_plan_id + '/base_resources/' + this.id + '.json',
    client: self.client,
    body: container
  };

  utils.modem(createOptions, callback, function(body, response) {
    callback(null, body);
  });
};
