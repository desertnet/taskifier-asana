"use strict"

var assert = require("assert")
var Promise = require("bluebird")

var AsanaMock = module.exports = function () {
  this.Client = {}
  this.Client.create = Client.create.bind(Client, this)

  this._useBasicAuthCalledWithArg = null
  this._tasksCreateCalledWithArg = null
}

AsanaMock.prototype.assertUseBasicAuthCalledWith = function (arg) {
  assert.strictEqual(arg, this._useBasicAuthCalledWithArg)
}

AsanaMock.prototype.assertTaskWasCreated = function (task) {
  assert.strictEqual(task.name(), this._tasksCreateCalledWithArg.name)
  assert.strictEqual(task.description(), this._tasksCreateCalledWithArg.notes)
}

var Client = function (mock) {
  this.tasks = new TasksResource(this)

  this._mock = mock
  this._apiKey = undefined
}

Client.create = function (mock) {
  return new Client(mock)
}

Client.prototype.useBasicAuth = function (apiKey) {
  this._apiKey = apiKey
  this._mock._useBasicAuthCalledWithArg = apiKey
}

var TasksResource = function (client) {
  this._client = client
}

TasksResource.prototype.create = function (data) {
  this._client._mock._tasksCreateCalledWithArg = data
  return new Promise(function (resolve, reject) {
    return resolve({"id": 1001})
  })
}
