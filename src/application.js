var express = require('express'),
    appConfig = require('./config/app_config'),
    viewConfig = require('./config/view_config');

var app = express();

appConfig.setUp(app);
viewConfig.setUp(app);

app.get('/', function(req, res) {
    res.render('homepage');
});

module.exports = app;