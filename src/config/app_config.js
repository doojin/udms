var express = require('express'),
    globals = require('../globals'),
    bodyParser = require('body-parser');

var appConfig = {};

appConfig.setUp = function(app) {

    // Setting up directories with static files
    globals.STATIC_DIRS.forEach(function(dir) {
        app.use(express.static(dir))
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
};

module.exports = appConfig;