var roleRequired = require('./middleware/role_required'),
    mainScript = require('./middleware/main_script'),
    Role = require('../model/role'),
    userRepository = require('../repository/user_repository');

var NEW_PUBLICATION_URL = '/new-publication';
var STUDENT_LIST_URL = '/students';

module.exports = {
    apply: function(app) {
        app.get(
            NEW_PUBLICATION_URL,
            roleRequired(Role.PROFESSOR),
            mainScript('create-update-publication'),
            getNewPublication
        );

        app.get(
            STUDENT_LIST_URL,
            roleRequired(Role.PROFESSOR),
            studentList
        )
    }
};

function getNewPublication(req, res) {
    res.render('new-publication');
}

function studentList(req, res) {
    userRepository.students(function(students) {
        res.json(students);
    });
}