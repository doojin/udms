var Publication = require('./entity/publication');

var publicationRepository = {};

publicationRepository.insert = function(publicationModel, callback) {
    var publication = new Publication(publicationModel);
    publication.save().then(function() {
        callback();
    });
};

module.exports = publicationRepository;