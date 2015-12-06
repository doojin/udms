var securityService = require('../../src/service/security_service');

describe('security_service', function() {

    it('comparePasswords should return true if raw password equals hashed password', function(done) {
        securityService.encodePassword('dummy password', function(encodedPassword) {
            securityService.comparePasswords('dummy password', encodedPassword, function(result) {
                expect(result).toBeTruthy();
                done();
            });
        });
    });

    it('comparePasswords should return false if raw password not equals hashed password', function(done) {
        securityService.encodePassword('dummy password', function(encodedPassword) {
            securityService.comparePasswords('WRONG PASSWORD', encodedPassword, function(result) {
                expect(result).toBeFalsy();
                done();
            });
        });
    });

});