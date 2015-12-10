define([
    'widget/table',
    'render/user_table_render',
    'helper/jquery'
], function(
    Table,
    userTableRender,
    $
) {

    var content = $('#content');

    var userTable = new Table(users, userTableRender);
    userTable.header = ['User ID', 'Role', 'Group'];
    userTable.addClass('full-width');
    content.append(userTable.build());

});