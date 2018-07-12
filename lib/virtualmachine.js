var util = require('./util')

var VirtualMachine = function (client, details) {
  this.client = client
  util.extend(this, details)
}

VirtualMachine.prototype.edit = function (options, callback) {
  var container = {}
  container.virtual_machine = options

  var createOptions = {
    method: 'PUT',
    uri: 'virtual_machines/' + this.identifier + '.json',
    client: this.client,
    body: container
  }

  util.modem(createOptions, callback, function (body, response) {
    callback(null)
  })
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

VirtualMachine.prototype.listInterfaces = function (callback) {
  var createOptions = {
    method: 'GET',
    uri: 'virtual_machines/' + this.identifier + '/network_interfaces.json',
    client: this.client
  }

  util.modem(createOptions, callback, function (body, response) {
    callback(null, body)
  })
}

VirtualMachine.prototype.addInterface = function (opts, callback) {
  var createOptions = {
    method: 'POST',
    uri: 'virtual_machines/' + this.identifier + '/network_interfaces.json',
    client: this.client,
    body: {'network_interface': opts}
  }

  util.modem(createOptions, callback, function (body, response) {
    callback(null, JSON.parse(body))
  })
}

VirtualMachine.prototype.assignIP = function (opts, callback) {
  var createOptions = {
    method: 'POST',
    uri: 'virtual_machines/' + this.identifier + '/ip_addresses.json',
    client: this.client,
    body: {'ip_address': opts}
  }

  util.modem(createOptions, callback, function (body, response) {
    callback(null, JSON.parse(body))
  })
}

VirtualMachine.prototype.rebuildNetwork = function (opts, callback) {
  var createOptions = {
    method: 'POST',
    uri: 'virtual_machines/' + this.identifier + '/rebuild_network.json',
    client: this.client,
    body: opts
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
