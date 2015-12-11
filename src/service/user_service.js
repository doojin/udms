var userRepository = require('../repository/user_repository');

var userService = {};

userService.bind = function(app) {
    app.use(userService._updateUserActivity);
};

userService._updateUserActivity = function(req, res, next) {
    var id = req.session.auth.ID;
    if (id !== null) userRepository.updateActivity(id);
    next();
};

userService.exists = function(userID, password, callback) {
    userRepository.exists(userID, password, callback);
};

module.exports = userService;