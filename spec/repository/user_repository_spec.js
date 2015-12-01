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

});