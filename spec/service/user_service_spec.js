var service = require('../../src/service/user_service'),
    userRepository = require('../../src/repository/user_repository');

describe('service/user_service', function() {

    it('_updateUserActivity should update user activity if user id is not null', function() {
        spyOn(userRepository, 'updateActivity');
        var req = {
            session: {
                auth: {
                    ID: 12345
                }
            }
        };
        var next = jasmine.createSpy('next');

        service._updateUserActivity(req, null, next);

        expect(userRepository.updateActivity).toHaveBeenCalledWith(12345);
    });

    it('_updateUserActivity should not update user activity if user id is null', function() {
        spyOn(userRepository, 'updateActivity');
        var req = {
            session: {
                auth: {
                    ID: null
                }
            }
        };
        var next = jasmine.createSpy('next');

        service._updateUserActivity(req, null, next);

        expect(userRepository.updateActivity).not.toHaveBeenCalled();
    });

});