var service = require('../../src/service/user_service'),
    userRepository = require('../../src/repository/user_repository'),
    roleService = require('../../src/service/role_service'),
    Role = require('../../src/model/role');

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

    it('upsert should update user if _id is set', function() {
        spyOn(service, '_insertUser');
        spyOn(service, '_updateUser');

        service.upsert({ _id: 'dummy id' });

        expect(service._insertUser).not.toHaveBeenCalled();
        expect(service._updateUser).toHaveBeenCalled();
    });

    it('upsert should insert user if _id is not set', function() {
        spyOn(service, '_insertUser');
        spyOn(service, '_updateUser');

        service.upsert({});

        expect(service._insertUser).toHaveBeenCalled();
        expect(service._updateUser).not.toHaveBeenCalled();
    });

    it('_createUserModel should create correct user model', function() {
        spyOn(roleService, 'getRoleById').and.returnValue(Role.ADMINISTRATOR);
        var data = {
            ID: 'Dummy ID',
            role: '1',
            group: 'Dummy Group'
        };

        var result = service._createUserModel(data);

        expect(result).toEqual({
            userID: 'Dummy ID',
            userIDLowercase: 'dummy id',
            role: Role.ADMINISTRATOR,
            group: 'Dummy Group'
        });
    });

});