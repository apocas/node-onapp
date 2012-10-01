var onapp = exports;

require('pkginfo')(module, 'version');

onapp.createClient = require('./onapp/client').createClient;

onapp.Client = require('./onapp/client').Client;
onapp.Template = require('./onapp/template').Template;
onapp.VirtualMachine = require('./onapp/virtualmachine').VirtualMachine;