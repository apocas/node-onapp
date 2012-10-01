node-onapp
==========

node.js Onapp module

More functionality to come very soon.

##USAGE:

`````javascript
var onapp = require('onapp');

var config = {
  username: 'username@email.com',
  apiKey: 'api_hash',
  serverUrl: '192.168.1.1'
};

var client = onapp.createClient(config);

//Onapp version
client.getVersion(function (err, data) {
  console.log(data);
});


//Template list
client.getSystemTemplates(function (err, data) {
  console.log(data);
});


//Create a VM
//For more options check Onapp manual since these are directly pass to it.
var options = {
  memory: '1024',
  cpus: '1',
  cpu_shares: '50',
  hostname: 'tests.tests.com',
  label: 'VM from node',
  primary_disk_size: '10',
  swap_disk_size: '1',
  primary_network_id: '2',
  template_id: '6',
  hypervisor_id: 2,
  initial_root_password: '12345675',
  rate_limit: 'none'
};

client.createVirtualMachine(options, function (err, vm) {
  if(err !== null) {
    console.log(err);
  } else {
    console.log(vm);
  }
});


//Get VM details
client.getVirtualMachine('vm_id', function (err, vm) {
  if(err !== null) {
    console.log(err);
  } else {
    console.log(vm);
  }
});

//Get VM List
client.getVirtualMachines(function (err, vm) {
  if(err !== null) {
    console.log(err);
  } else {
    console.log(vm);
  }
});
`````