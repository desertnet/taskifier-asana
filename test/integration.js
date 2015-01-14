"use strict"

var assert = require("assert")

var config = integrationConfig()
var descOrSkip = config ? describe : describe.skip

var AsanaTaskReceiver = require("../index.js")
var TaskMock = require("./mock/TaskifierTaskMock.js")

descOrSkip("Asana Integration (See README.md to enable)", function () {
  var taskReceiver, task

  before(function () {
    task = new TaskMock({
      "name": "Mayday! Nothing works!",
      "description": "It's all broken! Everything! Holy smokes!"
    })

    taskReceiver = new AsanaTaskReceiver()
    taskReceiver.configure(config)
  })

  describe("new task creation", function () {
    it("should create a new task", function (done) {
      taskReceiver.newTask(task, function (err) {
        assert.ifError(err)
        return done()
      })
    })
  })

  describe("error reporting", function () {
    it("should report errors", function (done) {
      var troublesomeTaskReceiver = new AsanaTaskReceiver()
      var mangledConfig = Object.create(config)
      mangledConfig.projectId = 999
      troublesomeTaskReceiver.configure(mangledConfig)
      troublesomeTaskReceiver.newTask(task, function (err, task) {
        assert.ok(err)
        return done()
      })
    })
  })
})

function integrationConfig () {
  var config = {}

  var envs = {
    "ASANA_API_KEY": "apiKey",
    "ASANA_WORKSPACE_ID": "workspaceId",
    "ASANA_PROJECT_ID": "projectId"
  }

  var hasAllIntegrationEnvs = Object.keys(envs).reduce(function (prev, env) {
    return prev && process.env[env]
  }, true)

  if (hasAllIntegrationEnvs) {
    Object.keys(envs).forEach(function (env) {
      config[envs[env]] = process.env[env]
    })
    return config
  }

  return null
}
