var util = require('util'),
    utils = require('./utils'),
    onapp = require('../onapp');

var BillingPlan = exports.BillingPlan = function (client, details) {
  this.client = client;
  util.inherits(this, details);
};

BillingPlan.prototype.addResource = function (options, callback) {
  var self = this;

  var container = {};
  container.base_resource = options;
  container.base_resource.billing_plan_id = this.id;
  container.base_resource.resource_class = 'Resource::' + options.resource;
  delete container.base_resource.resource;

  var createOptions = {
    method: 'POST',
    uri: 'billing_plans/' + this.id + '/base_resources.json',
    client: self.client,
    body: container
  };

  utils.modem(createOptions, callback, function(body, response) {
    var br = new (onapp.BaseResource)(self, JSON.parse(body).base_resource);
    callback(null, br);
  });
};
