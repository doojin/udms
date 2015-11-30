var userRepository = {};

userRepository._users = [
    {userID: 'dmitry.papka', password: 'abcdefg123'}
];

userRepository._all = function() {
    return this._users;
};

userRepository.exists = function(userID, password) {
    var found = false;
    this._all().forEach(function(user) {
        if (user.userID === userID && user.password === password) {
            found = true;
        }
    });
    return found;
};

module.exports = userRepository;