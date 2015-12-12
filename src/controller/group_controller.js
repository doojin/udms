var groupRepository = require('../repository/group_repository');

module.exports = {
    apply: function(app) {
        app.use('/groups', getGroups);
    }
};

function getGroups(req, res) {
    groupRepository.all(function(groups) {
        res.json(groups);
    });
}
