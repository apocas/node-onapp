/* global describe it before after */
var onapp = require('./../lib/onapp')
var config = require('./config')
var expect = require('chai').expect

describe('virtualmachine', function () {
  var client
  var vmg

  before(function (done) {
    client = onapp.createClient(config.validConfig)
    done()
  })

  it('should create virtualmachine', function (done) {
    var self = this
    var options = {
      memory: '1024',
      cpus: '1',
      cpu_shares: '50',
      hostname: 'tests.tests.com',
      label: 'VM from node',
      primary_disk_size: '5',
      swap_disk_size: '1',
      template_id: '5',

      initial_root_password: '123Aadsf_Asda45675',
      rate_limit: 'none'
    }

    client.createVirtualMachine(options, function (err, vm) {
      self.timeout(10000)
      expect(err).to.be.null
      vmg = vm
      done()
    })
  })

  it('should get previous created virtualmachine', function (done) {
    this.timeout(10000)
    client.getVirtualMachine(vmg.id, function (err, vm) {
      expect(err).to.be.null
      done()
    })
  })

  /*
  after(function (done) {
    this.timeout(10000)

    setTimeout(function () {
      vmg.destroy(function (err, data) {
        expect(err).to.be.null
        done()
      })
    }, 65000)
  })
  */
})
