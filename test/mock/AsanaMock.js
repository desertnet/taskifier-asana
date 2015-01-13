"use strict"

var assert = require("assert")

var AsanaMock = module.exports = function () {
  this.Client = {}
  this.Client.basicAuth = Client.basicAuth.bind(Client, this)

  this._basicAuthCalledWithArg = null
}

AsanaMock.prototype.assertBasicAuthCalledWith = function (arg) {
  assert.strictEqual(arg, this._basicAuthCalledWithArg)
}

var Client = function (mock, apiKey) {
  this._mock = mock
  this._apiKey = apiKey
}

Client.basicAuth = function (mock, apiKey) {
  mock._basicAuthCalledWithArg = apiKey
  return new Client(mock, apiKey)
}
