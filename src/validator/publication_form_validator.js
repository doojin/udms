(function() {

    var nodeModule = false;
    if (typeof module === 'object' && module && typeof module.exports === 'object') nodeModule = true;

    var ERR_FIELD_REQUIRED = 'This field is required',
        ERR_FIELD_LENGTH = 'The value of this field must be {min}..{max} symbols',
        ERR_FIELD_MAXLENGTH = 'The value of this field should be not longer than {max} symbols',
        ERR_MEMBERS_WRONG_STUDENTS = 'One or more students do not exist in database anymore';

    var validator = {};

    validator.baseValidation = function(data) {
        var result = {};

        this._validateName(data, result);
        this._validateDescription(data, result);
        this._validateMembers(data, result);
        this._validateSections(data, result);

        this._setSuccessFlag(result);

        return result;
    };

    validator._addError = function(property, result, error) {
        if (result[property]) return;
        result[property] = error;
    };

    validator._validateName = function(data, result) {
        if (!data.name) this._addError('name', result, ERR_FIELD_REQUIRED);
        if (data.name.length < 5 || data.name.length > 100) this._addError('name', result, ERR_FIELD_LENGTH
                .replace('{min}', '5')
                .replace('{max}', '100'));

    };

    validator._validateDescription = function(data, result) {
        if (data.description && data.description.length > 4000)
            this._addError('description', result, ERR_FIELD_MAXLENGTH
                .replace('{max}', '4000'));
    };

    validator._validateMembers = function(data, result) {
    };

    validator._validateSections = function(data, result) {
        var sections = data.sections;
        if (!sections) return;

        var self = this;
        result.sections = [];
        sections.forEach(function(section) {
            var sectionResult = {};
            self._validateSectionTitle(section, sectionResult);
            self._validateSectionDescription(section, sectionResult);
            result.sections.push(sectionResult);
        });
    };

    validator._validateSectionTitle = function(data, result) {
        if (!data.title) this._addError('title', result, ERR_FIELD_REQUIRED);
        if (data.title.length < 5 || data.title.length > 100) this._addError('title', result, ERR_FIELD_LENGTH
            .replace('{min}', '5')
            .replace('{max}', '100'));
    };

    validator._validateSectionDescription = function(data, result) {
        if (data.description && data.description.length > 4000)
            this._addError('description', result, ERR_FIELD_MAXLENGTH
                .replace('{max}', '4000'));
    };

    validator._setSuccessFlag = function(result) {
        result.success = true;

        if (result.name) result.success = false;

        if (result.description) result.success = false;

        result.sections && result.sections.forEach(function(section) {
            if (section.title) result.success = false;
            if (section.description) result.success = false;
        });

        if (result.members) result.success = false;
    };

    if (nodeModule) {
        validator.serverValidation = function(data, callback) {
            var result = this.baseValidation(data);

            !result.success && callback(result);

            var self = this;
            var async = require('async');
            async.waterfall([
                function(callback) {
                    self._validateStudents(data, result, callback);
                },
                function(callback) {
                    self._validateGroups(data, result, callback);
                }
            ], function() {
                self._setSuccessFlag(result);
                callback(result);
            });
        };

        validator._validateStudents = function(data, result, callback) {
            var userRepository = require('../repository/user_repository');
            var students = data.members.filter(function(member) {
                return member.type === 'student';
            });

            var IDs = [];
            students.forEach(function(student) {
                IDs.push(student.value.ID);
            });

            var self = this;
            userRepository.existAll(IDs, function(exist) {
                if (!exist) self._addError('members', result, ERR_MEMBERS_WRONG_STUDENTS);
                callback();
            });
        };

        validator._validateGroups = function(data, result, callback) {
            callback();
        };

        module.exports = validator;
        return;
    }

    define(function() {
        return validator;
    });

})();