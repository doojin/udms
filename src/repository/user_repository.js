var User = require('../repository/entity/user'),
    Role = require('../model/role');

var userRepository = {};

userRepository.exists = function(userID, password, callback) {
    var userIDLowercase = userID.toLowerCase();
    User.count({ userIDLowercase: userIDLowercase, password: password })
        .then(function(count) {
            var result = count > 0;
            callback(result);
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

module.exports = userRepository;