var roleRequired = require('../service/role_service').roleRequired,
    Role = require('../model/role'),
    paginationRequired = require('../service/pagination_service').paginationRequired,
    User = require('../repository/entity/user');

module.exports = {
    apply: function(app) {
        app.get(
            '/user-manager/:page?/:perPage?',
            roleRequired(Role.ADMINISTRATOR),
            paginationRequired(User, 'userPagination'),
            getUserManager
        )
    }
};

function getUserManager(req, res) {
    res.render('user-manager');
}