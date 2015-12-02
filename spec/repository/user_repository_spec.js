var userRepository = require('../../src/repository/user_repository');

describe('userRepository', function() {

    var repository;

    beforeEach(function() {
        repository = Object.create(userRepository);
    });

    it('exists should return true if user exists', function() {
        repository._users = [
            {userID: 'dummyID', password: 'dummyPassword'}
        ];

        expect(repository.exists('dummyID', 'dummyPassword')).toBeTruthy();
    });

    it('exists should return false if user not exists', function() {
        repository._users = [
            {userID: 'dummyID', password: 'dummyPassword'}
        ];

        expect(repository.exists('unknown user', 'with unknown password')).toBeFalsy();
    });

    it('getByUserID should return user by it\'s userID', function() {
        var u1 = {userID: 'dummyID1'},
            u2 = {userID: 'dummyID2'};
        repository._users = [u1, u2];
        var callback = jasmine.createSpy('callback');

        repository.getByUserID('dummyID1', callback);

        expect(callback).toHaveBeenCalledWith(u1);
    });

    it('getByUserID should return null if user is not found by userID', function() {
        var u1 = {userID: 'dummyID1'},
            u2 = {userID: 'dummyID2'};
        repository._users = [u1, u2];
        var callback = jasmine.createSpy('callback');

        repository.getByUserID('dummyID3', callback);

        expect(callback).toHaveBeenCalledWith(null);
    });

});