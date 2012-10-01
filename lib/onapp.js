var onapp = exports;

require('pkginfo')(module, 'version');
//
// // Core functionality
onapp.createClient = require('./onapp/client').createClient;
//
// // Type Definitions
onapp.Client = require('./onapp/client').Client;
