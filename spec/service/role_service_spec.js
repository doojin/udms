var roleService = require('../../src/service/role_service'),
    Role = require('../../src/model/role');

describe('role_service', function() {

    it('matches should return true if role1 has all role ids of role2', function() {
        var role1 = new Role();
        var role2 = new Role();
        role1.roleIDs = [1, 2, 3, 4, 5];
        role2.roleIDs = [2, 3, 4];

        expect(roleService.matches(role1, role2)).toBeTruthy();
    });

    it('matches should return false if role1 has not all role ids of role2', function() {
        var role1 = new Role();
        var role2 = new Role();
        role1.roleIDs = [1, 2, 3, 4, 5];
        role2.roleIDs = [2, 3, 4, 6];

        expect(roleService.matches(role1, role2)).toBeFalsy();
    });

    it('roleRequired should redirect to homepage if user has no required role', function() {
        var roleRequired = roleService.roleRequired(Role.AUTHORIZED);
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

        roleRequired(req, res, next);

        expect(res.redirect).toHaveBeenCalledWith('/');
        expect(next).not.toHaveBeenCalled();
    });

    it('roleRequired should call next if user has required role', function() {
        var roleRequired = roleService.roleRequired(Role.AUTHORIZED);
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

        roleRequired(req, res, next);

        expect(res.redirect).not.toHaveBeenCalledWith();
        expect(next).toHaveBeenCalled();
    });

});