var assert = require('assert'),
  onapp = require('./../lib/onapp'),
  config = require('./config');


describe('version', function() {

  var client;

  before(function(done){
    client = onapp.createClient(config.validConfig);
    done();
  });


  it('should get templates without error', function(done) {
    this.timeout(30000);
    client.getSystemTemplates(function (err, templates) {
      if (err) throw err;
      assert(true, templates instanceof Array);
      done();
    });
  });


  it('should get virtualmachines list without error', function(done) {
    this.timeout(60000);
    client.getVirtualMachines(function (err, vms) {
      if (err) throw err;
      assert(true, vms instanceof Array);
      done();
    });
  });

});