var roleRequired = require('./middleware/role_required'),
    mainScript = require('./middleware/main_script'),
    Role = require('../model/role');

var NEW_PUBLICATION_URL = '/new-publication';

module.exports = {
    apply: function(app) {
        app.get(
            NEW_PUBLICATION_URL,
            roleRequired(Role.PROFESSOR),
            mainScript('create-update-publication'),
            getNewPublication
        )
    }
};

function getNewPublication(req, res) {
    res.render('new-publication');
}