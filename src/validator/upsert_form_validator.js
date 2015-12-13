//noinspection ThisExpressionReferencesGlobalObjectJS
(function() {

    var ERR_FIELD_REQUIRED = 'This field is required';
    var ERR_FIELD_LENGTH = 'The value of this field must be {min}..{max} symbols';
    var ERR_USER_ID_SYMBOLS = 'User ID can consist of letter, number and dot symbols';
    var ERR_WRONG_ROLE = 'Select correct user role';
    var ERR_GROUP_NAME_SYMBOLS = 'Group Name can consist of letter, number and dot symbols';

    var USER_ID_GROUP_NAME_PATTERN = /^[a-zA-Z0-9.]+$/;

    var validator = {};

    validator.validate = function(data) {
        var result = {
            ID: validator._validateUserID(data.ID),
            role: validator._validateUserRole(data.role),
            group: validator._validateUserGroup(data.group),
            groupName: validator._validateGroupName(data.group, data.groupName)
        };

        validator._addStatus(result);

        return result;
    };

    validator._addStatus = function(result) {
        result.success = result.ID === null &&
                result.role === null &&
                result.group === null &&
                result.groupName === null;
    };

    validator._validateUserID = function(userID) {
        var error = null;

        if (!error && !userID)
            error = ERR_FIELD_REQUIRED;

        if (!error && userID.length < 5 || userID.length > 16)
            error = ERR_FIELD_LENGTH.replace('{min}', '5').replace('{max}', '16');

        if (!error && !userID.match(USER_ID_GROUP_NAME_PATTERN))
            error = ERR_USER_ID_SYMBOLS;

        return error;
    };

    validator._validateUserRole = function(role) {
        var error = null;

        var validRoles = ['2', '3', '4'];

        if (!error && validRoles.indexOf(role) == -1)
            error = ERR_WRONG_ROLE;

        return error;
    };

    validator._validateUserGroup = function(group) {
        var error = null;

        if (!error && !group)
            error = ERR_FIELD_REQUIRED;

        return error;
    };

    validator._validateGroupName = function(group, groupName) {
        var error = null;

        if (group !== 'new') return null;

        if (!error && !groupName)
            error = ERR_FIELD_REQUIRED;

        if (!error && groupName.length < 3 || groupName.length > 16)
            error = ERR_FIELD_LENGTH.replace('{min}', '3').replace('{max}', '16');

        if (!error && !groupName.match(USER_ID_GROUP_NAME_PATTERN))
            error = ERR_GROUP_NAME_SYMBOLS;

        return error;
    };

    if (typeof module === 'object' && module && typeof module.exports === 'object') {
        module.exports = validator;
        return;
    }

    define(function() {
        return validator;
    });

}());