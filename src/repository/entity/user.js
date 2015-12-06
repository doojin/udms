var mongoose = require('mongoose'),
    userSchema = require('../schema/user_schema');

var User = mongoose.model('User', userSchema);

module.exports = User;