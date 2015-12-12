define(function() {

    var roles = {
        '0': 'Unauthorized',
        '1': 'Authorized',
        '2': 'Student',
        '3': 'Professor',
        '4': 'Administrator'
    };

    var roleService = {};

    roleService.roleName = function(role) {
        var roleID = role && role.ID ? role.ID : -1;
        var roleName = roles[roleID];
        return roleName ? roleName : 'Unknown Role';
    };

    roleService.roles = function() {
        var authorizedRoles = {};
        for (var i in roles) {
            if (parseInt(i) > 1) {
                authorizedRoles[i] = roles[i];
            }
        }
        return authorizedRoles;
    };

    return roleService;

});