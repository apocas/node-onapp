var config = {
  username: process.env.USERNAME || 'xpto@xpto.xpto',
  apiKey: process.env.KEY || 'xxxxxxxxxxxxxxxxxxxxxxxx',
  serverUrl: process.env.URL || 'http://192.168.0.1'
}

var Onapp = require('./../lib/onapp')
var client = new Onapp(config)

client.getVirtualMachine('ikfckromytdksy', function (err, vm) {
  if (err) throw err

  vm.addInterface({'label': 'Customer', 'network_join_id': '8', 'rate_limit': '100'}, function (err, data) {
    if (err) throw err
    console.log(data)
    console.log(data.network_interface.id)
    vm.assignIP({'network_interface_id': data.network_interface.id, 'used_ip': '0'}, function (err, data) {
      if (err) throw err
      console.log(data)
    })
  })

  /*
  vm.listInterfaces(function (err, data) {
    if (err) throw err
    console.log(data)
  })
  */
})
