define(['render/user_table_render', 'service/role_service'], function(render, roleService) {

    describe('render/user_table_render', function() {

        it('should set group column to "No Group" if user has no group', function() {
            var data = [ {} ];
            var columns = [];

            render(data, columns);

            expect(columns[2]).toEqual('<span class="lbl">User Group:</span>No Group');
        });

        it('should set group column to user\'s group if user has group', function() {
            var data = { group: { name: 'Dummy Group' } };
            var columns = [];

            render(data, columns);

            expect(columns[2]).toEqual('<span class="lbl">User Group:</span>Dummy Group');
        });

        it('should render user ID column correctly', function() {
            var data = { userID: 'dummy ID' };
            var columns = [];

            render(data, columns);

            expect(columns[0]).toEqual('<span class="lbl">User ID:</span>dummy ID');
        });

        it('should render user role column correctly', function() {
            spyOn(roleService, 'roleName').and.returnValue('Dummy Role');
            var columns = [];

            render({}, columns);

            expect(columns[1]).toEqual('<span class="lbl">User Role:</span>Dummy Role');
        });

    });

});