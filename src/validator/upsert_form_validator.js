//noinspection ThisExpressionReferencesGlobalObjectJS
(function() {

    var nodeModule = false;
    if (typeof module === 'object' && module && typeof module.exports === 'object') nodeModule = true;

    var ERR_FIELD_REQUIRED = 'This field is required';
    var ERR_FIELD_LENGTH = 'The value of this field must be {min}..{max} symbols';
    var ERR_USER_ID_SYMBOLS = 'User ID can consist of letter, number and dot symbols';
    var ERR_USER_ID_EXISTS = 'User with this ID already exists';
    var ERR_WRONG_ROLE = 'Select correct user role';
    var ERR_GROUP_NAME_SYMBOLS = 'Group Name can consist of letter, number and dot symbols';
    var ERR_GROUP_NAME_EXISTS = 'Group with this name already exists';
    var ERR_GROUP_WRONG = 'Select correct user group';

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

    if (nodeModule) {

        validator.serverValidation = function(data, callback) {
            var self = this;
            var result = this.validate(data);

            if (!result.success) return callback(result);

            var async = require('async');
            async.waterfall([
                function(callback) {
                    self._validateUserNotExists(data, result, callback);
                },
                function(callback) {
                    self._validateNewGroupNotExists(data, result, callback);
                },
                function(callback) {
                    self._validateGroupExists(data, result, callback);
                }

            ], function() {
                self._addStatus(result);
                callback(result);
            });
        };

        validator._validateUserNotExists = function(data, result, next) {
            var userID = data.ID;

            var userRepository = require('../repository/user_repository');
            userRepository.IDExists(userID, function(exists) {
                if (!result.ID && exists) result.ID = ERR_USER_ID_EXISTS;
                next();
            });
        };

        validator._validateNewGroupNotExists = function(data, result, next) {
            var groupName = data.groupName;

            // Validating only if user is trying to create new group instead of selecting the old one
            if (data.group !== 'new') return next();

            var groupRepository = require('../repository/group_repository');
            groupRepository.exists(groupName, function(exists) {
                if (!result.groupName && exists) result.groupName = ERR_GROUP_NAME_EXISTS;
                next();
            });
        };

        validator._validateGroupExists = function(data, result, next) {
            var group = data.group;

            // Validating only if user selected an old group instead of creating the new one
            if (data.group === 'new') return next();

            var groupRepository = require('../repository/group_repository');
            groupRepository.IDExists(group, function(exists) {
                if (!result.group && !exists) result.group = ERR_GROUP_WRONG;
                next();
            });
        };

        module.exports = validator;
        return;
    }

    define(function() {
        return validator;
    });

}());