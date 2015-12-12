var mongoose = require('mongoose'),
    groupSchema = require('../schema/group_schema');

var Group = mongoose.model('Group', groupSchema);

module.exports = Group;