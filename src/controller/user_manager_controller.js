var roleRequired = require('../service/role_service').roleRequired,
    Role = require('../model/role'),
    paginationService = require('../service/pagination_service'),
    paginationRequired = paginationService.paginationRequired,
    userRepository = require('../repository/user_repository'),
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
    var skip = paginationService.skippedRecords(req);
    var perPage = req.pagination.perPage;
    userRepository.getLimited(skip, perPage, function(users) {
        users.forEach(function(user) {
            delete user.password;
        });
        res.render('user-manager', {
            users: JSON.stringify(users)
        });
    });
}