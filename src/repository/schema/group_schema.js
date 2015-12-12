var mongoose = require('mongoose');

var groupSchema = new mongoose.Schema({
    name: String,
    nameLowercase: String
});

module.exports = groupSchema;