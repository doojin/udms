var roleService = require('../service/role_service');

var authService = {};

var UNAUTHORIZED = {
    ID: null,
    userID: null,
    role: roleService.ROLES.unauthorized
};

authService.bind = function(app) {
    app.use(this._populateUserData);
};

authService._populateUserData = function(req, res, next) {
    req.session.auth = req.session.auth === undefined ? UNAUTHORIZED : req.session.auth;

    res.locals.ID = req.session.auth.ID;
    res.locals.userID = req.session.auth.userID;

    next();
};

module.exports = authService;