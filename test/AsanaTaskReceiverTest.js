"use strict"

var assert = require("assert")

var AsanaTaskReceiver = require("../lib/AsanaTaskReceiver.js")
var AsanaMock = require("./mock/AsanaMock.js")
var TaskMock = require("./mock/TaskifierTaskMock.js")

describe("AsanaTaskReceiver", function () {
  var taskReceiver, asana

  beforeEach(function () {
    asana = new AsanaMock()
    taskReceiver = new AsanaTaskReceiver()
    taskReceiver._useAsanaAPIModule(asana)
  })

  describe("configure()", function () {
    it("should call useBasicAuth with the given API key", function () {
      taskReceiver.configure({
        "apiKey": "foobar"
      })

      asana.assertUseBasicAuthCalledWith("foobar")
    })
  })

  describe("newTask()", function () {
    var task = new TaskMock({
      "name": "Mayday! Nothing works!",
      "description": "It's all broken! Everything! Holy smokes!"
    })

    beforeEach(function () {
      taskReceiver.configure({"apiKey": "fooo"})
    })

    it("should call client.tasks.create() with expected data", function (done) {
      taskReceiver.newTask(task, function (err) {
        assert.ifError(err)
        asana.assertTaskWasCreated(task)
        return done()
      })
    })
  })
})
