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

    // User table
    var userTable = new Table(users, userTableRender);
    userTable.header = ['User ID', 'Role', 'Group', 'Last Active'];
    userTable.addClass('full-width');
    userTableWrapper.append(userTable.build());

    // New user
    var form = new UserUpsertForm(upsertForm);
    form.bindNewUserEvent(newUserButton, 'click');
});