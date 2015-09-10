var request = require('request'),
    onapp = require('../onapp');

var utils = exports;

var failCodes = {
  401: "Invalid login or password.",
  403: "The request is correct, but could not be process.",
  404: "The requested URL is incorrect or the resource does not exist.",
  422: "The sent parameters are erroneous",
  500: "An error occurred. Please contact support"
};

utils.failCodes = failCodes;

var successCodes = {
  200: "The request completed sucessfully",
  201: "The request has been accepted and scheduled for processing"
};

utils.successCodes = successCodes;

utils.extend = function() {
  var src, copyIsArray, copy, name, options, clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;

  // Handle a deep copy situation
  if ( typeof target === "boolean" ) {
    deep = target;

    // skip the boolean and the target
    target = arguments[ i ] || {};
    i++;
  }

  // Handle case when target is a string or something (possible in deep copy)
  if ( typeof target !== "object" && typeof target !== "function" ) {
    target = {};
  }

  for ( ; i < length; i++ ) {
    // Only deal with non-null/undefined values
    if ( (options = arguments[ i ]) != null ) {
      // Extend the base object
      for ( name in options ) {
        src = target[ name ];
        copy = options[ name ];

        // Prevent never-ending loop
        if ( target === copy ) {
          continue;
        }

        // Recurse if we're merging plain objects or arrays
        if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
          if ( copyIsArray ) {
            copyIsArray = false;
            clone = src && jQuery.isArray(src) ? src : [];

          } else {
            clone = src && jQuery.isPlainObject(src) ? src : {};
          }

          // Never move original objects, clone them
          target[ name ] = jQuery.extend( deep, clone, copy );

          // Don't bring in undefined values
        } else if ( copy !== undefined ) {
          target[ name ] = copy;
        }
      }
    }
  }

  // Return the modified object
  return target;
};

utils.modem = function() {
  var args = Array.prototype.slice.call(arguments),
      success = (typeof(args[args.length - 1]) === 'function' || typeof(args[args.length - 1]) === undefined) && args.pop(),
      callback = (typeof(args[args.length - 1]) === 'function' || typeof(args[args.length - 1]) === undefined) && args.pop(),
      uri, method, requestBody, client, headers = {};


  if(args.length == 1) {
    method = args[0]['method'] || 'GET';
    uri = args[0]['uri'];
    requestBody = args[0]['body'];
    client = args[0]['client'];
  } else if(args.length === 2) {
    method = 'GET';
    uri = args[0];
    client = args[1];
  } else {
    method = args[0];
    uri = args[1];
    client = args[2];
  }

  function makeRequest() {
    headers['AUTHORIZATION'] = "Basic " + toBase64(client.config.username + ":" + client.config.apiKey);
    var serverOptions = {
      uri: uri,
      method: method,
      headers: headers
    };

    if(typeof requestBody !== 'undefined') {
      serverOptions.headers['Content-Type'] = 'application/json';
      serverOptions.body = JSON.stringify(requestBody);
    } else if(typeof resquestBody !== 'undefined') {
      serverOptions.body = requestBody;
    }

    request(serverOptions, function (err, res, body) {
      if(err) {
        if(callback) callback(err);
        return;
      }

      var statusCode = res.statusCode.toString();
      if(Object.keys(failCodes).indexOf(statusCode) !== -1) {
        if(callback) callback(new Error('Onapp Error (' + statusCode + '): ' + failCodes[statusCode] + ' - ' + JSON.stringify(JSON.parse(body).errors)));
        return;
      }

      success(body,res);
    });
  }

  function toBase64 (str) {
    return (new Buffer(str || "", "ascii")).toString("base64")
  }

  uri = client.config.serverUrl + "/" + uri;
  makeRequest();
};
