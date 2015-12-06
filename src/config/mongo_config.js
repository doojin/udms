var mongoose = require('mongoose');

var config = {};

config.setUp = function() {
    // Replace with correct connection string
    mongoose.connect('mongodb://udms_user:udms_password@localhost/udms');
};

module.exports = config;