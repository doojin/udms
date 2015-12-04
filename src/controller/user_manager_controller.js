var roleRequired = require('../service/role_service').roleRequired,
    Role = require('../model/role');

module.exports = {
    apply: function(app) {
        app.get('/user-manager', roleRequired(Role.ADMINISTRATOR), getUserManager)
    }
};

function getUserManager(req, res) {
    res.render('user-manager');
}