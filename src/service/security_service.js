var bcrypt = require('bcrypt');

var service = {};

service.encodePassword = function(password, callback) {
    bcrypt.hash(password, 10, function(err, result) {
        callback(result);
    });
};

service.comparePasswords = function(password, encodedPassword, callback) {
    bcrypt.compare(password, encodedPassword, function(err, result) {
        callback(result);
    });
};

module.exports = service;