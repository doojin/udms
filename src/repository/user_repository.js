var User = require('../repository/entity/user'),
    Role = require('../model/role'),
    securityService = require('../service/security_service');

var userRepository = {};

userRepository.exists = function(userID, password, callback) {
    this.getByUserID(userID, function(user) {
        if (user === null) {
            callback(false);
            return;
        }
        securityService.comparePasswords(password, user.password, function(result) {
            callback(result);
        });
    });
};

userRepository.getByUserID = function(userID, callback) {
    var userIDLowercase = userID.toLowerCase();
    User.findOne({ userIDLowercase: userIDLowercase })
        .then(function(user) {
            var result = user === null ? null : user.toJSON();
            callback(result);
        });
};

userRepository.getLimited = function(skipAmt, limit, callback) {
    User.find()
        .skip(skipAmt)
        .limit(limit)
        .sort([['created', 'descending']])
        .then(function(users) {
            var result = [];
            users.forEach(function(user) {
                result.push(user.toJSON());
            });
            callback(result);
        });
};

userRepository.updateActivity = function(id) {
    var update = { lastActive: Date.now() };
    User.update({ _id: id }, update, function(err, updated) {
        // User activity is updated
    });
};

module.exports = userRepository;