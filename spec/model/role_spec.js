var Role = require('../../src/model/role');

describe('Role', function() {

   it('Constructor should append _counter value to roleIDs array', function() {
       Role._counter = 5;
       var role1 = new Role();

       expect(Role._counter).toEqual(6);
       expect(role1.roleIDs.length).toEqual(1);
       expect(role1.roleIDs).toContain(5);

       var role2 = new Role();

       expect(Role._counter).toEqual(7);
       expect(role2.roleIDs.length).toEqual(1);
       expect(role2.roleIDs).toContain(6);
   });

    it('Role should inherit another role\'s ids if role is passed as argument', function() {
        var parentRole = new Role();
        parentRole.roleIDs = [1, 2, 3];
        Role._counter = 5;

        var role = new Role(parentRole);

        expect(role.roleIDs).toEqual([1, 2, 3, 5]);
    });

});