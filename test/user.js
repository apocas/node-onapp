/* global describe it before */
var assert = require('assert')
var onapp = require('./../lib/onapp')
var config = require('./config')

describe('user', function () {
  var client

  before(function (done) {
    client = onapp.createClient(config.validConfig)
    done()
  })

  it('should get users list', function (done) {
    this.timeout(60000)
    client.getUsers(function (err, users) {
      if (err) throw err
      assert(true, users instanceof Array)
      done()
    })
  })
})
