var $ = require('jquery');

var VirtualMachine = function (client, details) {
  this.client = client;
  this._setProperties(details);
};

VirtualMachine.prototype._setProperties = function(details) {
  $.extend(this, details);
}

exports.VirtualMachine = VirtualMachine;
