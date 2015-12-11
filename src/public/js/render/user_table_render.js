define(['service/role_service', 'helper/jquery'], function(roleService, $) {

    function userTableRender(user, columns) {
        var label;

        // User ID
        label = $('<span>').addClass('lbl').html('User ID:');
        columns[0] = label.prop('outerHTML') + user.userID;

        // User Role
        label = $('<span>').addClass('lbl').html('User Role:');
        columns[1] = label.prop('outerHTML') + roleService.roleName(user.role);

        // User group
        label = $('<span>').addClass('lbl').html('User Group:');
        var group = user.group && user.group.name;
        var groupName = group ? group : 'No Group';
        columns[2] = label.prop('outerHTML') + groupName;
    }

    return userTableRender;

});