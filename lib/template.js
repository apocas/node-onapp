var Template = function (details) {
  if (!details) throw new Error('Template details missing.')

  this._setProperties(details)
}

Template.prototype._setProperties = function (details) {
  this.id = details.image_template.id
  this.name = details.image_template.label
  this.ram = details.image_template.min_memory_size
  this.disk = details.image_template.min_disk_size
}

module.exports = Template
