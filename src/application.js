var express = require('express'),
    appConfig = require('./config/app_config'),
    viewConfig = require('./config/view_config'),
    controllers = require('./controller/controllers'),
    sessionService = require('./service/session_service'),
    authorizationService = require('./service/authorization_service');

var app = express();

appConfig.setUp(app);
viewConfig.setUp(app);

sessionService.bind(app);
authorizationService.bind(app);

controllers.applyAll(app);

module.exports = app;