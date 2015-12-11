define(['service/role_service', 'service/time_service', 'helper/jquery'], function(roleService, timeService, $) {

    function userTableRender(user, columns) {
        var label;

        // User ID
        label = createLabel('User ID:');
        columns[0] = label + user.userID;

        // User Role
        label = createLabel('User Role:');
        columns[1] = label + roleService.roleName(user.role);

        // User group
        label = createLabel('User Group:');
        var group = user.group && user.group.name;
        var groupName = group ? group : 'No Group';
        columns[2] = label + groupName;

        label = createLabel('Last Active:');
        columns[3] = label + timeService.timePassed(user.lastActive);
    }

    function createLabel(text) {
        return $('<span>').addClass('lbl')
            .html(text)
            .prop('outerHTML');
    }

    return userTableRender;

});