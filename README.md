node-onapp
==========

node.js onapp module

More methods coming...

Check the examples below for usage.

##Installation:
```
npm install onapp
```

##Examples:

`````javascript
var Onapp = require('onapp');

var config = {
  username: 'username@email.com',
  apiKey: 'api_hash',
  serverUrl: 'http://192.168.1.1'
};

var onapp = new Onapp(config);

//Onapp version
onapp.getVersion(function (err, data) {
  console.log(data);
});


//Template list
//returns a array with Template objects.
onapp.getSystemTemplates(function (err, templates) {
  console.log(templates);
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

//return a VirtualMachine object
onapp.createVirtualMachine(options, function (err, vm) {
  if(err !== null) {
    console.log(err);
  } else {
    console.log(vm);
  }
});


//Get VM details
//returns a array of VirtualMachine objects
onapp.getVirtualMachine('vm_id', function (err, vm) {
  if(err !== null) {
    console.log(err);
  } else {
    vm.off(function(error, data){});
    //vm.reboot(function(error, data){});
    //...
  }
});

//Get VM List
onapp.getVirtualMachines(function (err, vm) {
  if(err !== null) {
    console.log(err);
  } else {
    console.log(vm);
  }
});

//Creating an user, billing plan and its resurces
onapp.createUser({'email': 'xpto@xpto.xpto','first_name': 'XPTO','last_name': 'OTPX','login': 'xptoxpto','password': '123qwe_123qwe', 'user_group_id': '1', 'role_ids': ['1']}, function(err, user) {
  if (err) throw err;
  console.log('User created!');

  onapp.createBillingPlan({'label': 'xpto@xpto.xpto plan','currency_code': 'USD','monthly_price': '0.0'}, function(err, billingplan) {
    if (err) throw err;
    console.log('Billing plan created!');

    user.billing_plan_id = billingplan.id;
    user.save(function(err, data) {
      if (err) throw err;
      console.log('User saved!');

      billingplan.addResource({resource: 'VmLimit', limits: {limit: 1, limit_free: 0}}, function(err, resource) {
        if (err) throw err;
        console.log('Resource added!');
        console.log('SUCCESS!!!');
      });
    });
  });
});
`````
