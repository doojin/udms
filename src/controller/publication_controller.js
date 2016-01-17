var roleRequired = require('./middleware/role_required'),
    mainScript = require('./middleware/main_script'),
    Role = require('../model/role'),
    userRepository = require('../repository/user_repository'),
    publicFormValidator = require('../validator/publication_form_validator'),
    publicationService = require('../service/publication_service'),
    Publication = require('../repository/entity/publication'),
    User = require('../repository/entity/user');

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

        app.get(
            '/publications',
            roleRequired(Role.AUTHORIZED),
            publications
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
        try {
            data.author = req.session.auth.ID;
            if (result.success) {
                publicationService.upsert(data, function () {
                    return res.json(result);
                });
            } else {
                return res.json(result);
            }
        } catch(e) {

        }
    });
}

function publications(req, res) {
    var myPublications = [];
    Publication.find({}).then(function(publications) {
        User.findOne({'_id': req.session.auth.ID}, function(err, me) {
            publications.forEach(function(publication) {
                var pushed = false;
                if (!pushed && publication.author == req.session.auth.ID) {
                    myPublications.push(publication);
                    pushed = true;
                }
                if (!pushed && publication.students.indexOf(req.session.auth.ID) > -1) {
                    myPublications.push(publication);
                    pushed = true;
                }
                if (!pushed && publication.groups.indexOf(me.group) > -1) {
                    myPublications.push(publication);
                }
            });
            res.render('publications', { publications: myPublications, me: me });
        });
    });
}