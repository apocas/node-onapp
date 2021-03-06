/* global describe it before */
var assert = require('assert')
var expect = require('chai').expect
var Onapp = require('./../lib/onapp')
var config = require('./config')

describe('user', function () {
  var client

  before(function (done) {
    client = new Onapp(config.validConfig)
    done()
  })

  it('should get users list', function (done) {
    this.timeout(60000)
    client.getUsers(function (err, users) {
      expect(err).to.be.null
      assert(true, users instanceof Array)
      done()
    })
  })
})
