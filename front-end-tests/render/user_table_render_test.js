define(['render/user_table_render'], function(render) {

    describe('render/user_table_render', function() {

        it('should set group column to "No Group" if user has no group', function() {
            var data = [ {} ];
            var columns = [];

            render(data, columns);

            expect(columns[2]).toEqual('No Group');
        });

        it('should set group column to user\'s group if user has group', function() {
            var data = { group: { name: 'Dummy Group' } };
            var columns = [];

            render(data, columns);

            expect(columns[2]).toEqual('Dummy Group');
        });

    });

});