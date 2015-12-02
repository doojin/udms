var roleService = {};

roleService.matches = function(role1, role2) {
    var role1IDs = role1.roleIDs,
        role2IDs = role2.roleIDs;

    return role1IDs.filter(function(id) {
            return role2IDs.indexOf(id) > -1
        }).length == role2IDs.length;
};

module.exports = roleService;