"use strict"

var AsanaTaskReceiver = module.exports = require("./lib/AsanaTaskReceiver.js")

var asana = require("asana")
AsanaTaskReceiver._asanaAPI = asana
