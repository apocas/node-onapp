var assert = require('assert'),
  onapp = require('./../lib/onapp'),
  config = require('./config');


describe('user', function() {

  var client;

  before(function(done){
    client = onapp.createClient(config.validConfig);
    done();
  });


  it('should get users list without error', function(done) {
    this.timeout(60000);
    client.getUsers(function (err, users) {
      if (err) throw err;
      assert(true, users instanceof Array);
      done();
    });
  });

});