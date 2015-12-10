var roleService = require('../../service/role_service');

module.exports = function(role) {
    return function(req, res, next) {
        var actualRole = req.session.auth.role;
        if (!roleService.matches(actualRole, role)) {
            res.redirect('/');
            return;
        }
        next();
    };
};