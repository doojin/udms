var roleRequired = require('./middleware/role_required'),
    mainScript = require('./middleware/main_script'),
    Role = require('../model/role'),
    userRepository = require('../repository/user_repository'),
    publicFormValidator = require('../validator/publication_form_validator'),
    publicationService = require('../service/publication_service'),
    Publication = require('../repository/entity/publication'),
    User = require('../repository/entity/user'),
    roleService = require('../service/role_service'),
    multer = require('multer'),
    Upload = require('../repository/entity/upload'),
    fs = require('fs'),
    Comment = require('../repository/entity/comment');

var PUBLICATION_URL = '/publication',
    STUDENT_LIST_URL = '/students',
    SUBMIT_FORM_URL = '/submit-publication';

var uploading = multer({
    dest: 'upload'
});

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

        app.get(
            '/pub/:pubId',
            roleRequired(Role.AUTHORIZED),
            showPublication
        );

        app.post(
            '/upload',
            roleRequired(Role.AUTHORIZED),
            uploading.fields([
                {name: 'f0'},
                {name: 'f1'},
                {name: 'f2'},
                {name: 'f3'},
                {name: 'f4'},
                {name: 'f5'},
                {name: 'f6'},
                {name: 'f7'},
                {name: 'f8'},
                {name: 'f9'},
                {name: 'f10'}
            ]),
            upload
        );

        app.get(
            '/up/:uploadId',
            roleRequired(Role.AUTHORIZED),
            showUpload
        );

        app.post(
            '/up/:uploadId',
            roleRequired(Role.AUTHORIZED),
            comment
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

function showPublication(req, res) {
    Publication.findOne({ '_id': req.param('pubId') }, function(err, publication) {
        if (err || publication === null) return res.redirect('/publications');
        if (roleService.matches(Role.ADMINISTRATOR, req.session.auth.role)) {
            return showPublicationProfessor(req, res, publication);
        }
        showPublicationStudent(req, res, publication);
    });
}

function showPublicationProfessor(req, res, publication) {
    Upload.find({ 'publication': publication._id }, {}, { sort: { 'created' : -1 } })
        .populate('uploader')
        .exec(function(err, uploads) {
            res.render('show_publication_professor', { uploads: uploads });
        });
}

function showPublicationStudent(req, res, publication) {
    Upload.findOne({ 'publication': publication._id }, {}, { sort: { 'created' : -1 } }, function(err, upload) {
        Comment.find({ publication: publication._id}, function(err, comments) {
            res.render('show_publication_student', { publication: publication, upload: upload, comments: comments });
        });
    });
}

function upload(req, res) {
    var files = [];
    for (var i in req.files) {
        var file = req.files[i][0];
        fs.rename('upload/' + file.filename, 'upload/' + file.filename + '.doc');
        files.push(file.filename + '.doc');
    }
    var upload = new Upload({
        publication: req.body.pubId,
        uploader: req.session.auth.ID,
        files: files
    });
    upload.save();
    res.render('submitted');
}

function showUpload(req, res) {
    Upload.findOne({ '_id': req.param('uploadId') }, function(err, upload) {
        if (err || upload === null) return res.redirect('/publications');
        Comment.find({ publication: upload.publication}, function(err, comments) {
            res.render('show_upload', { upload: upload, comments: comments });
        });
    });
}

function comment(req, res) {
    Upload.findOne({ '_id': req.param('uploadId') })
        .populate('uploader')
        .exec(function(err, upload) {
            if (err || upload === null) return res.redirect('/publications');
            var comment = new Comment({
                sender: req.session.auth.ID,
                receiver: upload.uploader.ID,
                publication: upload.publication,
                text: req.body.text
            });
            comment.save(function() {
                showUpload(req, res);
            });
        });
}