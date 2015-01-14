"use strict"

var assert = require("assert")

var config = integrationConfig()
var descOrSkip = config ? describe : describe.skip

var AsanaTaskReceiver = require("../index.js")
var TaskMock = require("./mock/TaskifierTaskMock.js")

descOrSkip("Asana Integration", function () {
  var taskReceiver, task

  before(function () {
    task = new TaskMock({
      "name": "Mayday! Nothing works!",
      "decription": "It's all broken! Everything! Holy smokes!"
    })

    taskReceiver = new AsanaTaskReceiver()
    taskReceiver.configure(config)
  })

  describe("new task creation", function () {
    it("should create a new task", function (done) {
      taskReceiver.newTask(task, function (err, task) {
        assert.ifError(err)
      })
    })
  })
})

function integrationConfig () {
  var config = {}

  var envs = {
    "ASANA_API_KEY": "apiKey",
    "ASANA_PROJECT_ID": "projectId"
  }

  var hasAllIntegrationEnvs = Object.keys(envs).reduce(function (prev, env) {
    return prev && process.env[env]
  }, true)

  if (hasAllIntegrationEnvs) {
    Object.keys(envs).forEach(function (env) {
      config[env] = envs[env]
    })
    return config
  }

  return null
}
