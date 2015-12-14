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

    it('getRoleById should return role by it\'s it', function() {
        expect(roleService.getRoleById(0)).toEqual(Role.UNAUTHORIZED);
        expect(roleService.getRoleById(1)).toEqual(Role.AUTHORIZED);
        expect(roleService.getRoleById(2)).toEqual(Role.STUDENT);
        expect(roleService.getRoleById(3)).toEqual(Role.PROFESSOR);
        expect(roleService.getRoleById(4)).toEqual(Role.ADMINISTRATOR);
    });

});