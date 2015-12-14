var bcrypt = require('bcrypt');

var PASSWORD_LENGTH = 6;

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

service.generatePassword = function() {
    var symbols = ['b', 'g', 'e', 'f', 'g', 'h', 'k', 'p', 's', 'u', 'v', 'w', '2', '4', '5', '6', '8', '9'];
    var password = '';
    for (var i = 0; i < PASSWORD_LENGTH; i++) {
        var index = Math.floor(Math.random() * symbols.length);
        password += symbols[index];
    }
    return password;
};

module.exports = service;