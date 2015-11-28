var express = require('express'),
    appConfig = require('./config/app_config'),
    viewConfig = require('./config/view_config'),
    controllers = require('./controller/controllers');

var app = express();

appConfig.setUp(app);
viewConfig.setUp(app);

controllers.applyAll(app);

module.exports = app;