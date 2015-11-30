var userRepository = require('../repository/user_repository');

var userService = {};

userService.exists = function(userID, password, callback) {
    callback(userRepository.exists(userID, password));
};

module.exports = userService;