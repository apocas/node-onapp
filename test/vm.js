var assert = require('assert'),
  onapp = require('./../lib/onapp'),
  config = require('./config');


describe('virtualmachine', function() {

  var client;
  var vmg;

  before(function(done){
    client = onapp.createClient(config.validConfig);
    done();
  });


  it('should create virtualmachine without error', function(done) {
    var self = this;
    var options = {
      memory: '512',
      cpus: '1',
      cpu_shares: '50',
      hostname: 'tests.tests.com',
      label: 'VM from node',
      primary_disk_size: '5',
      swap_disk_size: '1',
      primary_network_id: '2',
      template_id: '78',
      hypervisor_id: 2,
      initial_root_password: '123Aadsf_Asda45675',
      rate_limit: 'none'
    };

    self.timeout(10000);
    client.createVirtualMachine(options, function (err, vm) {
      if (err) throw err;
      vmg = vm;
      done();
    });
  });

  it('should get previous created virtualmachine without error', function(done) {
    this.timeout(10000);
    client.getVirtualMachine(vmg.id, function (err, vm) {
      if (err) throw err;
      done();
    });
  });

  after(function(done) {
    // wait up to 10 mins until the virtual machine has finished building
    this.timeout(600000);

    var interval = setInterval(function() {
      client.getVirtualMachine(vmg.id, function(err, vm) {
        if (err) throw err;

        if (vm.built || !vm.locked) {
          clearInterval(interval);
          vmg.destroy(function(err) {
            if (err) throw err;
            done();
          });
        }
      });
    }, 1000);
  });

});
