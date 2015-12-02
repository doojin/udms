var Role = require('../model/role'),
    roleService = require('../service/role_service');

var authService = {};

var UNAUTHORIZED = {
    ID: null,
    userID: null,
    role: Role.UNAUTHORIZED
};

authService.bind = function(app) {
    app.use(this._populateUserData);
};

authService.isAuthorized = function(req) {
    return roleService.matches(req.session.auth.role, Role.AUTHORIZED);
};

authService.authorize = function(req, user) {
    req.session.auth.ID = user.ID;
    req.session.auth.userID = user.userID;
    req.session.auth.role = user.role;
};

authService.logoff = function(req) {
    req.session.auth = UNAUTHORIZED;
};

// Used as middleware on each request
authService._populateUserData = function(req, res, next) {
    req.session.auth = req.session.auth === undefined ? UNAUTHORIZED : req.session.auth;

    res.locals.ID = req.session.auth.ID;
    res.locals.userID = req.session.auth.userID;

    next();
};

module.exports = authService;