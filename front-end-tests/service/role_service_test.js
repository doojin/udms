define(['service/role_service'], function(service) {

    describe('service/role_service', function() {

        it('roleName should return role name if such role exist', function() {
            var role = { ID: 'dummy' };

            role.ID = '0';
            expect(service.roleName(role)).toEqual('Unauthorized');

            role.ID = '1';
            expect(service.roleName(role)).toEqual('Authorized');

            role.ID = '2';
            expect(service.roleName(role)).toEqual('Student');

            role.ID = '3';
            expect(service.roleName(role)).toEqual('Professor');

            role.ID = '4';
            expect(service.roleName(role)).toEqual('Administrator');
        });

        it('roleName should return "Unknown Role" if role doesn\'t exist', function() {
            expect(service.roleName({ ID: 42 })).toEqual('Unknown Role');
        });

        it('roleName should return "Unknown Role" if role is null or undefined', function() {
            expect(service.roleName(undefined)).toEqual('Unknown Role');
            expect(service.roleName(null)).toEqual('Unknown Role');
            expect(service.roleName({})).toEqual('Unknown Role');
        });

        it('roles should return Student, Professor and Administrator roles', function() {
            var roles = service.roles();
            expect(roles).toEqual({
                2: 'Student',
                3: 'Professor',
                4: 'Administrator'
            });
        });

    });

});