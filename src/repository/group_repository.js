var Group = require('./entity/group');

var groupRepository = {};

groupRepository.all = function(callback) {
    Group.find().then(callback);
};

module.exports = groupRepository;