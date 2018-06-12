/* global describe it before */
var onapp = require('./../lib/onapp')
var expect = require('chai').expect
var config = require('./config')

describe('authok', function () {
  var client

  before(function (done) {
    client = onapp.createClient(config.validConfig)
    done()
  })

  it('should get version', function (done) {
    this.timeout(10000)
    client.getVersion(function (err, data) {
      expect(err).to.be.null
      expect(data).to.be.ok
      done()
    })
  })
})

describe('authnok', function () {
  var client

  before(function (done) {
    client = onapp.createClient(config.invalidConfig)
    done()
  })

  it('should fail auth with wrong credentials', function (done) {
    this.timeout(10000)
    client.getVersion(function (err, data) {
      expect(err).to.be.ok
      done()
    })
  })
})
