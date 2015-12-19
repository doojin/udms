var User = require('./entity/user'),
    Role = require('../model/role'),
    Group = require('./entity/group'),
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
        .populate('group')
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
        .populate('group')
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

userRepository.save = function(user, callback) {
    if (user.group && user.group.save) {
        user.group.save();
    }
    return user.save(callback);
};

userRepository.IDExists = function(ID, callback) {
    var userIDLowercase = ID.toLowerCase();
    User.findOne({ userIDLowercase: userIDLowercase })
        .then(function(user) {
            callback(user !== null);
        });
};

userRepository.keyExists = function(key, callback) {
    User.findById(key).then(function(user) {
        callback(user !== null);
    }, function() {
        callback(false);
    })
};

userRepository.update = function(key, update, callback) {
    if (update.group.save) update.group.save();
    User.update({ _id: key }, update, function() {
        callback();
    });
};

userRepository.students = function(callback) {
    User.find({ role: Role.STUDENT })
        .sort([['created', 'descending']])
        .then(function(users) {
            callback(users);
        });
};

module.exports = userRepository;