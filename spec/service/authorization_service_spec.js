var authService = require('../../src/service/authorization_service'),
    roleService = require('../../src/service/role_service');

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
        expect(req.session.auth.role).toEqual(roleService.ROLES.unauthorized);
    });

    it('_populateUserData should populate response locals with user data', function() {
        req.session.auth = {};
        req.session.auth.ID = 1;
        req.session.auth.userID = 'dummy user id';

        expect(res.locals.ID).toBeUndefined();
        expect(res.locals.userID).toBeUndefined();

        authService._populateUserData(req, res, next);

        expect(res.locals.ID).toEqual(1);
        expect(res.locals.userID).toEqual('dummy user id');
    });

});