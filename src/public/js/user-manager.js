define([
    'widget/table',
    'render/user_table_render',
    'widget/user_upsert_form',
    'helper/jquery',
    'common_logic'
], function(
    Table,
    userTableRender,
    UserUpsertForm,
    $
) {

    var userTableWrapper = $('#user-list'),
        upsertForm = $('.user-upsert'),
        newUserButton = $('.new-user');

    // New user
    var form = new UserUpsertForm(upsertForm);
    form.bindNewUserEvent(newUserButton, 'click');

    // User table
    var userTable = new Table(users, userTableRender);
    userTable.header = ['User ID', 'Role', 'Group', 'Last Active'];
    userTable.addClass('full-width');
    userTable.addClass('user-table');
    userTable.onclick = function(data) {
        form.showUpdateForm(data);
    };
    userTableWrapper.append(userTable.build());
});