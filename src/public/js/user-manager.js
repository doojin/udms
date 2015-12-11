define([
    'widget/table',
    'render/user_table_render',
    'helper/jquery',
    'common_logic'
], function(
    Table,
    userTableRender,
    $
) {

    var wrapper = $('#user-list');

    var userTable = new Table(users, userTableRender);
    userTable.header = ['User ID', 'Role', 'Group'];
    userTable.addClass('full-width');
    wrapper.append(userTable.build());

});