var authService = require('../../src/service/authorization_service'),
    Role = require('../../src/model/role');

describe('authorization_service', function() {

    var req, res, next;
    beforeEach(function() {
        req = { session: {} };
        res = { locals: {} };
        next = jasmine.createSpy('next');
    });

    it('_populateUserData should set auth object to unauthorized if it does\'t exist', function() {
        authService._populateUserData(req, res, next);

        expect(req.session.auth.ID).toBeNull();
        expect(req.session.auth.userID).toBeNull();
        expect(req.session.auth.role).toEqual(Role.UNAUTHORIZED);
    });

    it('_populateUserData should populate response locals with user data', function() {
        req.session.auth = {};
        req.session.auth.ID = 1;
        req.session.auth.userID = 'dummy user id';
        spyOn(authService, '_populateUserRoles');

        expect(res.locals.ID).toBeUndefined();
        expect(res.locals.userID).toBeUndefined();
        expect(authService._populateUserRoles).not.toHaveBeenCalled();

        authService._populateUserData(req, res, next);

        expect(res.locals.ID).toEqual(1);
        expect(res.locals.userID).toEqual('dummy user id');
        expect(authService._populateUserRoles).toHaveBeenCalled();
    });

    it('isAuthorized should return true if user has one of the authorized roles', function() {
        var req = {
            session: {
                auth: {
                    role: Role.AUTHORIZED
                }
            }
        };

        expect(authService.isAuthorized(req)).toBeTruthy();

        req.session.auth.role = Role.STUDENT;
        expect(authService.isAuthorized(req)).toBeTruthy();

        req.session.auth.role = Role.PROFESSOR;
        expect(authService.isAuthorized(req)).toBeTruthy();
    });

    it('isAuthorized should return false if user has no authorized roles', function() {
        var req = {
            session: {
                auth: {
                    role: Role.UNAUTHORIZED
                }
            }
        };

        expect(authService.isAuthorized(req)).toBeFalsy();
    });

    it('authorize should populate session with user data', function() {
        var user = {
            ID: 'dummy ID',
            userID: 'dummy userID',
            role: 'dummy role'
        };
        var req = {
            session: {
                auth: {

                }
            }
        };

        expect(req.session.auth.ID).toBeUndefined();
        expect(req.session.auth.userID).toBeUndefined();
        expect(req.session.auth.role).toBeUndefined();

        authService.authorize(req, user);

        expect(req.session.auth.ID).toEqual('dummy ID');
        expect(req.session.auth.userID).toEqual('dummy userID');
        expect(req.session.auth.role).toEqual('dummy role');
    });

    it('_populateUserRoles should populate response with user roles', function() {
        var role = Role.PROFESSOR;
        var res = { locals: {} };

        authService._populateUserRoles(res, role);

        expect(res.locals.roles).toEqual({
            'unauthorized': false,
            'authorized': true,
            'student': false,
            'professor': true,
            'administrator': false
        });
    });

});