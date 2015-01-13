"use strict"

var assert = require("assert")
var Promise = require("bluebird")

var AsanaMock = module.exports = function () {
  this.Client = {}
  this.Client.basicAuth = Client.basicAuth.bind(Client, this)

  this._basicAuthCalledWithArg = null
  this._tasksCreateCalledWithArg = null
}

AsanaMock.prototype.assertBasicAuthCalledWith = function (arg) {
  assert.strictEqual(arg, this._basicAuthCalledWithArg)
}

AsanaMock.prototype.assertTaskWasCreated = function (task) {
  assert.strictEqual(task.name(), this._tasksCreateCalledWithArg.name)
}

var Client = function (mock, apiKey) {
  this.tasks = new TasksResource(this)

  this._mock = mock
  this._apiKey = apiKey
}

Client.basicAuth = function (mock, apiKey) {
  mock._basicAuthCalledWithArg = apiKey
  return new Client(mock, apiKey)
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
