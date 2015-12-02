var Role = require('../model/role');

var roleService = {
    ROLES: {}
};

roleService.ROLES.unauthorized = new Role();
roleService.ROLES.authorized = new Role();
roleService.ROLES.student = new Role(roleService.ROLES.authorized);
roleService.ROLES.professor = new Role(roleService.ROLES.authorized);
roleService.ROLES.administrator = new Role(roleService.ROLES.professor);

module.exports = roleService;