var roleRequired = require('../../../src/controller/middleware/role_required'),
    Role = require('../../../src/model/role');

describe('controller/middleware/role_required', function() {

    it('roleRequired should redirect to homepage if user has no required role', function() {
        var callback = roleRequired(Role.AUTHORIZED);
        var req = {
            session: {
                auth: {
                    role: Role.UNAUTHORIZED
                }
            }
        };
        var res = {
            redirect: jasmine.createSpy('redirect')
        };
        var next = jasmine.createSpy('next');

        callback(req, res, next);

        expect(res.redirect).toHaveBeenCalledWith('/');
        expect(next).not.toHaveBeenCalled();
    });

    it('roleRequired should call next if user has required role', function() {
        var callback = roleRequired(Role.AUTHORIZED);
        var req = {
            session: {
                auth: {
                    role: Role.AUTHORIZED
                }
            }
        };
        var res = {
            redirect: jasmine.createSpy('redirect')
        };
        var next = jasmine.createSpy('next');

        callback(req, res, next);

        expect(res.redirect).not.toHaveBeenCalledWith();
        expect(next).toHaveBeenCalled();
    });

});