var service = require('../../src/service/user_service'),
    userRepository = require('../../src/repository/user_repository'),
    securityService = require('../../src/service/security_service'),
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

    it('_insertUser should create correct user model', function() {
        spyOn(securityService, 'generatePassword').and.returnValue('clean password');
        spyOn(securityService, 'encodePassword').and.callFake(function(password, callback) {
            callback('dummy password');
        });
        spyOn(roleService, 'getRoleById').and.returnValue(Role.ADMINISTRATOR);
        var callback = jasmine.createSpy('callback');
        var data = {
            ID: 'Dummy ID',
            role: '1',
            group: 'Dummy Group'
        };

        service._insertUser(data, callback);

        expect(callback).toHaveBeenCalledWith({
            userID: 'Dummy ID',
            userIDLowercase: 'dummy id',
            password: 'dummy password',
            cleanPassword: 'clean password',
            role: Role.ADMINISTRATOR,
            group: 'Dummy Group'
        });
    });

});