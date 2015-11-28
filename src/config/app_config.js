var express = require('express'),
    globals = require('../globals');

var appConfig = {};

appConfig.setUp = function(app) {

    // Setting up directories with static files
    globals.STATIC_DIRS.forEach(function(dir) {
        app.use(express.static(dir))
    });
};

module.exports = appConfig;