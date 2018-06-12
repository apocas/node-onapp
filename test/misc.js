/* global describe it before */
var assert = require('assert')
var expect = require('chai').expect
var onapp = require('./../lib/onapp')
var config = require('./config')

describe('version', function () {
  var client

  before(function (done) {
    client = onapp.createClient(config.validConfig)
    done()
  })

  it('should get templates', function (done) {
    this.timeout(30000)
    client.getSystemTemplates(function (err, templates) {
      expect(err).to.be.null
      assert(true, templates instanceof Array)
      done()
    })
  })

  it('should get virtualmachines list', function (done) {
    this.timeout(60000)
    client.getVirtualMachines(function (err, vms) {
      expect(err).to.be.null
      assert(true, vms instanceof Array)
      done()
    })
  })
})
