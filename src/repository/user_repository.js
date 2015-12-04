var Role = require('../model/role');

var userRepository = {};

userRepository._users = [
    {ID: 1, userID: 'dmitry.papka', password: 'abcdefg123', role: Role.ADMINISTRATOR},
    {ID: 2, userID: 'professor', password: 'p', role: Role.PROFESSOR},
    {ID: 3, userID: 'student', password: 's', role: Role.STUDENT},
    {ID: 4, userID: 'admin', password: 'a', role: Role.ADMINISTRATOR}
];

userRepository.exists = function(userID, password) {
    var found = false;
    this._users.forEach(function(user) {
        if (user.userID.toLowerCase() === userID.toLowerCase() && user.password === password) {
            found = true;
        }
    });
    return found;
};

userRepository.getByUserID = function(userID, callback) {
    var matches = this._users.filter(function(user) {
        return user.userID.toLowerCase() === userID.toLowerCase();
    });

    var user =  matches.length > 0 ? matches[0] : null;
    callback(user);
};

module.exports = userRepository;