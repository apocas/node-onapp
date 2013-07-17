var $ = require('jquery'),
    utils = require('./utils'),
    onapp = require('../onapp');

var User = exports.User = function (client, details) {
  this.client = client;
  $.extend(this, details);
};


User.prototype.getBillingPlan = function(callback) {
  var self = this;

  var createOptions = {
    method: 'GET',
    uri: 'billing_plans/' + this.billing_plan_id + '.json',
    client: this.client
  };

  utils.modem(createOptions, callback, function(body, response) {
    var bp =  new (onapp.BillingPlan)(self.client, JSON.parse(body).billing_plan);

    var brs = [];
    bp.base_resources.forEach(function (bra) {
      var br = new (onapp.BaseResource)(self, bra.base_resource);
      br.billing_plan_id = self.billing_plan_id;
      brs.push(br);
    });

    bp.base_resources = brs;
    self.billing_plan = bp;
    callback(null, bp);
  });
};


User.prototype.save = function (callback) {
  var self = this;

  var container  = {};
  container.user = {};
  container.user.first_name = this.first_name;
  container.user.last_name = this.last_name;
  container.user.user_group_id = this.user_group_id;
  container.user.billing_plan_id = this.billing_plan_id;

  var createOptions = {
    method: 'PUT',
    uri: 'users/' + this.id + '.json',
    client: self.client,
    body: container
  };

  utils.modem(createOptions, callback, function(body, response) {
    callback(null, body);
  });
};


User.prototype.destroy = function (callback) {
  var self = this;

  var createOptions = {
    method: 'DELETE',
    uri: 'users/' + this.id + '.json',
    client: this.client
  };

  utils.modem(createOptions, callback, function(body, response) {
    callback(null, body);
  });
};
