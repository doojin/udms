var mongoose = require('mongoose');

var config = {};

config.setUp = function() {
    // Replace with correct connection string
    mongoose.connect('mongodb://udms:udms@ds047335.mongolab.com:47335/udms');
};

module.exports = config;