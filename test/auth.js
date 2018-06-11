/* global describe it before */
var onapp = require('./../lib/onapp')
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
      if (err) throw err
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
      if (!err) throw err
      done()
    })
  })
})
