var util = require('./util')

var VirtualMachine = function (client, details) {
  this.client = client
  util.extend(this, details)
}

VirtualMachine.prototype.on = function (callback) {
  var createOptions = {
    method: 'POST',
    uri: 'virtual_machines/' + this.identifier + '/startup.json',
    client: this.client
  }

  util.modem(createOptions, callback, function (body, response) {
    callback(null, JSON.parse(body))
  })
}

VirtualMachine.prototype.shutdown = function (callback) {
  var createOptions = {
    method: 'POST',
    uri: 'virtual_machines/' + this.identifier + '/shutdown.json',
    client: this.client
  }

  util.modem(createOptions, callback, function (body, response) {
    callback(null, JSON.parse(body))
  })
}

VirtualMachine.prototype.off = function (callback) {
  var createOptions = {
    method: 'POST',
    uri: 'virtual_machines/' + this.identifier + '/stop.json',
    client: this.client
  }

  util.modem(createOptions, callback, function (body, response) {
    callback(null, JSON.parse(body))
  })
}

VirtualMachine.prototype.changeOwner = function (userid, callback) {
  var createOptions = {
    method: 'POST',
    uri: 'virtual_machines/' + this.identifier + '/change_owner.json',
    client: this.client,
    body: {'user_id': userid}
  }

  util.modem(createOptions, callback, function (body, response) {
    callback(null, JSON.parse(body))
  })
}

VirtualMachine.prototype.reboot = function (callback) {
  var createOptions = {
    method: 'POST',
    uri: 'virtual_machines/' + this.identifier + '/reboot.json',
    client: this.client
  }

  util.modem(createOptions, callback, function (body, response) {
    callback(null, JSON.parse(body))
  })
}

VirtualMachine.prototype.enableAutoscale = function (callback) {
  var createOptions = {
    method: 'POST',
    uri: 'virtual_machines/' + this.identifier + '/autoscale_enable.json',
    client: this.client
  }

  util.modem(createOptions, callback, function (body, response) {
    callback(null, JSON.parse(body))
  })
}

VirtualMachine.prototype.disableAutoscale = function (callback) {
  var createOptions = {
    method: 'POST',
    uri: 'virtual_machines/' + this.identifier + '/autoscale_disable.json',
    client: this.client
  }

  util.modem(createOptions, callback, function (body, response) {
    callback(null, JSON.parse(body))
  })
}

VirtualMachine.prototype.deleteAutoscaleRule = function (callback) {
  var createOptions = {
    method: 'DELETE',
    uri: 'virtual_machines/' + this.identifier + '/auto_scaling.json',
    client: this.client
  }

  util.modem(createOptions, callback, function (body, response) {
    callback(null, JSON.parse(body))
  })
}

VirtualMachine.prototype.createAutoscaleRule = function (options, callback) {
  var opts = {}
  opts.auto_scaling_configurations = options

  var optsf = {
    method: 'POST',
    uri: 'virtual_machines/' + this.identifier + '/auto_scaling.json',
    client: this,
    body: opts
  }

  util.modem(optsf, callback, function (body, response) {
    callback(null, JSON.parse(body))
  })
}

VirtualMachine.prototype.destroy = function (callback) {
  var createOptions = {
    method: 'DELETE',
    uri: 'virtual_machines/' + this.identifier + '.json',
    client: this.client
  }

  util.modem(createOptions, callback, function (body, response) {
    callback(null, body)
  })
}

module.exports = VirtualMachine
