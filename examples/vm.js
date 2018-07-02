var config = {
  username: process.env.USERNAME || 'xpto@xpto.xpto',
  apiKey: process.env.KEY || 'xxxxxxxxxxxxxxxxxxxxxxxx',
  serverUrl: process.env.URL || 'http://192.168.0.1'
}


var Onapp = require('./../lib/onapp')
var client = new Onapp(config)


client.getVirtualMachine('wmqvrhtnelgqez', function (err, vm) {
  vm.listInterfaces(function (err, data) {
    console.log(data)
  })
})
