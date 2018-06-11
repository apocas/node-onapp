var request = require('request')

var util = exports

util.extend = function (obj) {
  var arr = []
  var each = arr.forEach
  var slice = arr.slice

  each.call(slice.call(arguments, 1), function (source) {
    if (source) {
      for (var prop in source) {
        obj[prop] = source[prop]
      }
    }
  })
  return obj
}

var failCodes = {
  401: 'Invalid login or password.',
  403: 'The request is correct, but could not be process.',
  404: 'The requested URL is incorrect or the resource does not exist.',
  422: 'The sent parameters are erroneous',
  500: 'An error occurred. Please contact support'
}

util.failCodes = failCodes

var successCodes = {
  200: 'The request completed sucessfully',
  201: 'The request has been accepted and scheduled for processing'
}

util.successCodes = successCodes

util.modem = function () {
  var args = Array.prototype.slice.call(arguments)
  var success = (typeof (args[args.length - 1]) === 'function' || typeof (args[args.length - 1]) === 'undefined') && args.pop()
  var callback = (typeof (args[args.length - 1]) === 'function' || typeof (args[args.length - 1]) === 'undefined') && args.pop()
  var uri
  var method
  var requestBody
  var client
  var headers = {}

  if (args.length === 1) {
    method = args[0]['method'] || 'GET'
    uri = args[0]['uri']
    requestBody = args[0]['body']
    client = args[0]['client']
  } else if (args.length === 2) {
    method = 'GET'
    uri = args[0]
    client = args[1]
  } else {
    method = args[0]
    uri = args[1]
    client = args[2]
  }

  function makeRequest () {
    headers['AUTHORIZATION'] = 'Basic ' + toBase64(client.config.username + ':' + client.config.apiKey)
    var serverOptions = {
      uri: uri,
      method: method,
      headers: headers
    }

    if (typeof requestBody !== 'undefined') {
      serverOptions.headers['Content-Type'] = 'application/json'
      serverOptions.body = JSON.stringify(requestBody)
    } else if (typeof resquestBody !== 'undefined') {
      serverOptions.body = requestBody
    }

    request(serverOptions, function (err, res, body) {
      if (err) {
        if (callback) callback(err)
        return
      }

      var statusCode = res.statusCode.toString()
      if (Object.keys(failCodes).indexOf(statusCode) !== -1) {
        if (callback) callback(new Error('Onapp Error (' + statusCode + '): ' + failCodes[statusCode] + ' - ' + JSON.stringify(JSON.parse(body).errors)))
        return
      }

      success(body, res)
    })
  }

  function toBase64 (str) {
    return (Buffer.from(str || '', 'ascii')).toString('base64')
  }

  uri = client.config.serverUrl + '/' + uri
  makeRequest()
}
