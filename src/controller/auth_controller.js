var userService = require('../service/user_service');

module.exports = {

    apply: function(app) {
        app.get('/', getAuth);
        app.get('/login', getLogin)
    }

};

function getAuth(req, res) {
    res.render('authorization');
}

function getLogin(req, res) {
    var userID = req.query.userID,
        password = req.query.password;

    userService.exists(userID, password, function(userExists) {
        res.json({success: userExists});
    });
}