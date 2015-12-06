var userRepository = require('../repository/user_repository');

var userService = {};

userService.exists = function(userID, password, callback) {
    userRepository.exists(userID, password, callback);
};

module.exports = userService;