var Publication = require('../repository/entity/publication'),
    publicationRepository = require('../repository/publication_repository');

var publicationService = {};

publicationService.upsert = function(data, callback) {
    var model = new Publication(this._buildModelObject(data));
    if (!data.ID) publicationRepository.insert(model, callback);
};

publicationService._buildModelObject = function(data) {
    var modelObject = {
        name: data.name,
        description: data.description,
        sections: data.sections,
        students: [],
        groups: [],
        author: data.author
    };

    data.members.forEach(function(member) {
        if (member.type === 'student')
            return modelObject.students.push(member.value.ID);
        modelObject.groups.push(member.value._id);

    });

    return modelObject;
};

module.exports = publicationService;