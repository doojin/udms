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

Role.prototype.matches = function(role) {
    var ownIDs = this.roleIDs;
    var matchingIDs = role.roleIDs;

    return ownIDs.filter(function(id) {
        return matchingIDs.indexOf(id) > -1
    }).length == matchingIDs.length;
};

module.exports = Role;