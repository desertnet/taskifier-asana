"use strict"

var AsanaTaskReceiver = module.exports = function () {
  this._asana = AsanaTaskReceiver._asanaAPI
  this._asanaClient = null
  this._config = null
}

AsanaTaskReceiver.prototype._useAsanaAPIModule = function (module) {
  this._asana = module
}

AsanaTaskReceiver.prototype.configure = function (config) {
  this._config = config
  this._asanaClient = this._asana.Client.create()
  this._asanaClient.useBasicAuth(config.apiKey)
}

AsanaTaskReceiver.prototype.newTask = function (task, cb) {
  return this._asanaClient.tasks.create({
    "name": task.name(),
    "workspace": this._config.workspaceId,
    "projects": [ this._config.projectId ]
  }).nodeify(function (err, data) {
    // if (err) console.log("got", err.value.errors)
    return cb(err, task)
  }.bind(this))
}
