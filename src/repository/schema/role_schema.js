var mongoose = require('mongoose');

var options = { _id: false };
var roleSchema = new mongoose.Schema({ ID: Number, roleIDs: [Number] }, options);

module.exports = roleSchema;