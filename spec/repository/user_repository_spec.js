var userRepository = require('../../src/repository/user_repository');

describe('userRepository', function() {

    it('exists should return true if user exists', function() {
        spyOn(userRepository, '_all').and.returnValue([
            {userID: 'dummyID', password: 'dummyPassword'}
        ]);

        expect(userRepository.exists('dummyID', 'dummyPassword')).toBeTruthy();
    });

    it('exists should return false if user not exists', function() {
        spyOn(userRepository, '_all').and.returnValue([
            {userID: 'dummyID', password: 'dummyPassword'}
        ]);

        expect(userRepository.exists('unknown user', 'with unknown password')).toBeFalsy();
    });

});