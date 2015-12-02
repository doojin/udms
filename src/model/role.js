function Role(anotherRole) {
    this.roleIDs = [];

    var self = this;
    if (anotherRole instanceof Role) {
        anotherRole.roleIDs.forEach(function(role) {
            self.roleIDs.push(role);
        });
    }

    this.roleIDs.push(Role._counter++);
}

Role._counter = 0;

Role.UNAUTHORIZED = new Role();
Role.AUTHORIZED = new Role();
Role.STUDENT = new Role(Role.AUTHORIZED);
Role.PROFESSOR = new Role(Role.AUTHORIZED);
Role.ADMINISTRATOR = new Role(Role.PROFESSOR);

module.exports = Role;