var VirtualMachine = require('./virtualmachine')
var User = require('./user')
var BillingPlan = require('./billingplan')
var Template = require('./template')
var util = require('./util')

var Onapp = function (options) {
  ['username', 'apiKey', 'serverUrl'].forEach(function (required) {
    if (!options[required]) throw new Error('options.' + required + ' ia a required argument.')
  })

  this.config = options
  this.authorized = false
}

Onapp.prototype.createVirtualMachine = function (options, callback) {
  var self = this

  var params = ['memory', 'cpus', 'hostname', 'label', 'primary_disk_size', 'swap_disk_size', 'template_id']
  params.forEach(function (required) {
    if (!options[required]) throw new Error('options ' + required + ' is a required argument.')
  })

  options.required_ip_address_assignment = typeof options.required_ip_address_assignment !== 'undefined' ? options.required_ip_address_assignment : '1'
  options.required_virtual_machine_build = typeof options.required_virtual_machine_build !== 'undefined' ? options.required_virtual_machine_build : '1'

  var container = {}
  container.virtual_machine = options

  var createOptions = {
    method: 'POST',
    uri: 'virtual_machines.json',
    client: this,
    body: container
  }

  util.modem(createOptions, callback, function (body, response) {
    var vm = new VirtualMachine(self, JSON.parse(body).virtual_machine)
    callback(null, vm)
  })
}

Onapp.prototype.createUser = function (options, callback) {
  var self = this

  var params = ['email', 'first_name', 'last_name', 'login', 'password']
  params.forEach(function (required) {
    if (!options[required]) throw new Error('options ' + required + ' is a required argument.')
  })

  var container = {}
  container.user = options

  var createOptions = {
    method: 'POST',
    uri: 'users.json',
    client: this,
    body: container
  }

  util.modem(createOptions, callback, function (body, response) {
    var user = new User(self, JSON.parse(body).user)
    callback(null, user)
  })
}

Onapp.prototype.createBillingPlan = function (options, callback) {
  var self = this

  var params = ['label', 'currency_code', 'monthly_price']
  params.forEach(function (required) {
    if (!options[required]) throw new Error('options ' + required + ' is a required argument.')
  })

  var container = {}
  container.billing_plan = options

  var createOptions = {
    method: 'POST',
    uri: 'billing_plans.json',
    client: this,
    body: container
  }

  util.modem(createOptions, callback, function (body, response) {
    var bp = new BillingPlan(self, JSON.parse(body).billing_plan)
    callback(null, bp)
  })
}

Onapp.prototype.getVirtualMachine = function (id, callback) {
  var self = this
  util.modem(['virtual_machines/' + id + '.json'], this, callback, function (body) {
    var vm = new VirtualMachine(self, JSON.parse(body).virtual_machine)
    callback(null, vm)
  })
}

Onapp.prototype.getVirtualMachines = function (callback) {
  var self = this
  util.modem(['virtual_machines.json'], this, callback, function (body) {
    var vmsa = JSON.parse(body)
    var vms = []
    vmsa.forEach(function (vma) {
      var vm = new VirtualMachine(self, vma.virtual_machine)
      vms.push(vm)
    })
    callback(null, vms)
  })
}

Onapp.prototype.getUsers = function (callback) {
  var self = this
  util.modem(['users.json'], this, callback, function (body) {
    var usersa = JSON.parse(body)
    var users = []
    usersa.forEach(function (usera) {
      var user = new User(self, usera.user)
      users.push(user)
    })
    callback(null, users)
  })
}

Onapp.prototype.getVersion = function (callback) {
  util.modem(['version.json'], this, callback, function (body) {
    callback(null, JSON.parse(body).version)
  })
}

Onapp.prototype.getTemplateGroups = function (callback) {
  util.modem(['settings/image_template_groups.json'], this, callback, function (body) {
    callback(null, JSON.parse(body))
  })
}

Onapp.prototype.getSystemTemplates = function (callback) {
  util.modem(['templates.json'], this, callback, function (body) {
    var results = []
    var data = JSON.parse(body)

    data.forEach(function (info) {
      results.push(new Template(info))
    })

    callback(null, results)
  })
}

module.exports = Onapp
