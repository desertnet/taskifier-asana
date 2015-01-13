"use strict"

var TaskifierTaskMock = module.exports = function (data) {
  this._data = data
}

TaskifierTaskMock.prototype.name = function () {
  return this._data.name
}
