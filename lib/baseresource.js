var util = require('./util')

var BaseResource = function (client, details) {
  this.client = client
  util.extend(this, details)
}

BaseResource.prototype.save = function (callback) {
  var self = this

  var container = {}
  container.base_resource = {}
  container.base_resource.prices = this.prices
  container.base_resource.limits = this.limits

  var createOptions = {
    method: 'PUT',
    uri: 'billing_plans/' + this.billing_plan_id + '/base_resources/' + this.id + '.json',
    client: self.client,
    body: container
  }

  util.modem(createOptions, callback, function (body, response) {
    callback(null, body)
  })
}

module.exports = BaseResource
