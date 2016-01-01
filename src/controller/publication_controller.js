var roleRequired = require('./middleware/role_required'),
    mainScript = require('./middleware/main_script'),
    Role = require('../model/role'),
    userRepository = require('../repository/user_repository'),
    publicFormValidator = require('../validator/publication_form_validator'),
    publicationService = require('../service/publication_service');

var PUBLICATION_URL = '/publication',
    STUDENT_LIST_URL = '/students',
    SUBMIT_FORM_URL = '/submit-publication';

module.exports = {
    apply: function(app) {
        app.get(
            PUBLICATION_URL,
            roleRequired(Role.PROFESSOR),
            mainScript('create-update-publication'),
            getNewPublication
        );

        app.get(
            STUDENT_LIST_URL,
            roleRequired(Role.PROFESSOR),
            studentList
        );

        app.post(
            SUBMIT_FORM_URL,
            roleRequired(Role.PROFESSOR),
            submitPublicationForm
        );
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

function submitPublicationForm(req, res) {
    var data = req.body;
    publicFormValidator.serverValidation(data, function(result) {
        data.author = req.session.auth.ID;
        publicationService.upsert(data, function() {
            res.json(result);
        });
    });
}