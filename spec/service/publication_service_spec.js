var publicationService = require('../../src/service/publication_service'),
    publicationRepository = require('../../src/repository/publication_repository');

describe('publication_service', function() {

    beforeEach(function() {
        spyOn(publicationRepository, 'insert');
    });

    it('_buildModelObject should build model from data', function() {
        var data = {
            name: 'dummy name',
            description: 'dummy description',
            sections: [
                { title: 'dummy title 1', description: 'dummy description 1' },
                { title: 'dummy title 2', description: 'dummy description 2' }
            ],
            members: [
                { type: 'student', value: { ID: 'student1' } },
                { type: 'student', value: { ID: 'student2' } },
                { type: 'group', value: { _id: 'group1' } },
                { type: 'group', value: { _id: 'group2' } }
            ],
            author: 'dummy author'
        };

        expect(publicationService._buildModelObject(data)).toEqual({
            name: 'dummy name',
            description: 'dummy description',
            sections: [
                { title: 'dummy title 1', description: 'dummy description 1' },
                { title: 'dummy title 2', description: 'dummy description 2' }
            ],
            students: [ 'student1', 'student2' ],
            groups: [ 'group1', 'group2' ],
            author: 'dummy author'
        });
    });

    it('upsert should insert publication if data has no ID property', function() {
        var data = {};
        spyOn(publicationService, '_buildModelObject');

        publicationService.upsert(data);

        expect(publicationRepository.insert).toHaveBeenCalled();
    });

});