define(['service/role_service'], function(roleService) {

    function userTableRender(user, columns) {
        // User ID
        columns[0] = user.userID;

        // User Role
        columns[1] = roleService.roleName(user.role);

        // User group
        var group = user.group && user.group.name;
        columns[2] = group ? group : 'No Group';

    }

    return userTableRender;

});