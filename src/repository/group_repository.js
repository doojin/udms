var Group = require('./entity/group');

var groupRepository = {};

groupRepository.all = function(callback) {
    Group.find().then(callback);
};

groupRepository.exists = function(groupName, callback) {
    var nameLowercase = groupName.toLowerCase();
    Group.findOne({ nameLowercase: nameLowercase })
        .then(function(group) {
            callback(group !== null);
        });
};

module.exports = groupRepository;