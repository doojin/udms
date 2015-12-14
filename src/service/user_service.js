var userRepository = require('../repository/user_repository'),
    securityService = require('../service/security_service'),
    Group = require('../repository/entity/group'),
    User = require('../repository/entity/user'),
    roleService = require('../service/role_service');

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

userService.upsert = function(data, callback) {
    if (data._id) {
        this._updateUser(data, callback);
        return;
    }
    this._insertUser(data, callback);
};

userService._insertUser = function(data, callback) {
    var randomPassword = securityService.generatePassword();
    securityService.encodePassword(randomPassword, function(encodedPassword) {
        var user = {
            userID: data.ID,
            userIDLowercase: data.ID.toLowerCase(),
            password: encodedPassword,
            cleanPassword: randomPassword,
            role: roleService.getRoleById(data.role),
            group: data.group === 'new' ? new Group({
                name: data.groupName,
                nameLowercase: data.groupName.toLowerCase()
            }) : data.group
        };

        userRepository.save(new User(user));
        callback(user);
    });
};

userService._updateUser = function(data) {

};

module.exports = userService;