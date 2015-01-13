"use strict"

var AsanaTaskReceiver = module.exports = function () {
  this._asana = require("asana")
  this._asanaClient = null
  this._config = null
}

AsanaTaskReceiver.prototype._useAsanaAPIModule = function (module) {
  this._asana = module
}

AsanaTaskReceiver.prototype.configure = function (config) {
  this._config = config
  this._asanaClient = this._asana.Client.basicAuth(config.apiKey)
}
