var assert = require('assert'),
  onapp = require('./../lib/onapp'),
  config = require('./config');


describe('authok', function() {

  var client;

  before(function(done){
    client = onapp.createClient(config.validConfig);
    done();
  });

  it('should get version without error', function(done) {
    client.getVersion(function (err, data) {
      if (err) throw err;
      done();
    });
  });

});


describe('authnok', function() {

  var client;

  before(function(done){
    client = onapp.createClient(config.invalidConfig);
    done();
  });

  it('should fail auth with wrong credentials', function(done) {
    client.getVersion(function (err, data) {
      if (!err) throw err;
      done();
    });
  });

});