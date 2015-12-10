define(function() {

    function userTableRender(data, columns) {
        // User ID
        columns[0] = data.userID;

        columns[1] = "";

        // User group
        var group = data.group && data.group.name;
        columns[2] = group ? group : 'No Group';

    }

    return userTableRender;

});