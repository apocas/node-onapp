module.exports.validConfig = {
  username: process.env.USERNAME || 'xpto@xpto.xpto',
  apiKey: process.env.KEY || 'xxxxxxxxxxxxxxxxxxxxxxxx',
  serverUrl: process.env.URL || 'http://192.168.0.1'
}

module.exports.invalidConfig = {
  username: 'xxxxxxxxxxxxxxx',
  apiKey: 'xxxxxxxxxxxxxxx',
  serverUrl: 'http://192.168.0.1'
}
