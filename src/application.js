var express = require('express'),
    appConfig = require('./config/app_config'),
    viewConfig = require('./config/view_config'),
    mongoConfig = require('./config/mongo_config'),
    controllers = require('./controller/controllers'),
    sessionService = require('./service/session_service'),
    authorizationService = require('./service/authorization_service'),
    userService = require('./service/user_service');

var app = express();

mongoConfig.setUp();
appConfig.setUp(app);
viewConfig.setUp(app);

sessionService.bind(app);
authorizationService.bind(app);
userService.bind(app);

controllers.applyAll(app);

module.exports = app;