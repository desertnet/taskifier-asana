"use strict"

var assert = require("assert")

var AsanaTaskReceiver = require("../lib/AsanaTaskReceiver.js")
var AsanaMock = require("./mock/AsanaMock.js")

describe("AsanaTaskReceiver", function () {
  var taskReceiver, asana

  beforeEach(function () {
    asana = new AsanaMock()
    taskReceiver = new AsanaTaskReceiver()
    taskReceiver._useAPIModule(asana)
  })

  describe("configure()", function () {
    it("should call basicAuth with the given API key", function () {
      taskReceiver.configure({
        "apiKey": "foobar"
      })

      asana.assertBasicAuthCalledWith("foobar")
    })
  })
})
