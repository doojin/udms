var mongoose = require('mongoose'),
    publicationSchema = require('../schema/publication_schema');

var Group = mongoose.model('Publication', publicationSchema);

module.exports = Group;