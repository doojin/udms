var userService = require('../service/user_service'),
    userRepository = require('../repository/user_repository'),
    authService = require('../service/authorization_service');

module.exports = {

    apply: function(app) {
        app.get('/', getAuth);
        app.get('/login', getLogin)
    }

};

function getAuth(req, res, next) {
    if (!authService.isAuthorized(req)) {
        res.render('authorization');
        return;
    }
    next();
}

function getLogin(req, res) {
    var userID = req.query.userID,
        password = req.query.password;

    userService.exists(userID, password, function(userExists) {
        if (userExists) {
            userRepository.getByUserID(userID, function(user) {
                authService.authorize(req, user);
            });
        }
        res.json({success: userExists});
    });
}