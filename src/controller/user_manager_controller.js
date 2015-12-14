var roleRequired = require('./middleware/role_required'),
    Role = require('../model/role'),
    paginationService = require('../service/pagination_service'),
    paginationRequired = require('./middleware/pagination_required'),
    userRepository = require('../repository/user_repository'),
    User = require('../repository/entity/user'),
    mainScript = require('./middleware/main_script'),
    upsertFormValidator = require('../validator/upsert_form_validator'),
    userService = require('../service/user_service');

module.exports = {
    apply: function(app) {
        app.get(
            '/user-manager/:page?/:perPage?',
            roleRequired(Role.ADMINISTRATOR),
            paginationRequired(User, 'userPagination'),
            mainScript('user-manager'),
            getUserManager
        );

        app.post(
            '/create-user',
            roleRequired(Role.ADMINISTRATOR),
            createUser
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

function createUser(req, res) {
    var data = req.body;
    upsertFormValidator.serverValidation(data, function(result) {
        if (result.success) {
            userService.upsert(data, function(user) {
                result.password = user.cleanPassword;
                res.json(result);
            });
            return;
        }
        res.json(result);
    });
}