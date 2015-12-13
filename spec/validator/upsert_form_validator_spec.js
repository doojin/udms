var validator = require('../../src/validator/upsert_form_validator'),
    userRepository = require('../../src/repository/user_repository'),
    groupRepository = require('../../src/repository/group_repository');

describe('validator/upsert_form_validator', function() {

    var next, data;

    beforeEach(function() {
        spyOn(userRepository, 'IDExists').and.callFake(function(callback) {
            callback(false);
        });
        spyOn(groupRepository, 'exists').and.callFake(function(callback) {
            callback(false);
        });
        next = jasmine.createSpy('next');
        data = {};
    });

    it('_validateUserID should return error if user ID is empty', function() {
        expect(validator._validateUserID('')).toEqual('This field is required');
    });

    it('_validateUserID should return error if user ID is too short or too long', function() {
        expect(validator._validateUserID('1234')).toEqual('The value of this field must be 5..16 symbols');
        expect(validator._validateUserID('12345678901234567')).toEqual('The value of this field must be 5..16 symbols');
    });

    it('_validateUserID should return error if user ID contains wrong symbols', function() {
        expect(validator._validateUserID('abcdef-')).toEqual('User ID can consist of letter, number and dot symbols');
    });

    it('_validateUserID should return null error if user ID is correct', function() {
        expect(validator._validateUserID('123a567.90123B56')).toBeNull();
    });

    it('_addStatus should set status to fail if user ID contains error', function() {
        var result = { ID: 'dummy error' };
        validator._addStatus(result);
        expect(result.success).toBeFalsy();

    });

    it('_addStatus should set status to success if result has no errors', function() {
        var result = { ID: null, role: null, group: null, groupName: null };
        validator._addStatus(result);
        expect(result.success).toBeTruthy();
    });

    it('_addStatus should set status to fail if user role contains error', function() {
        var result = { role: 'dummy error' };
        validator._addStatus(result);
        expect(result.success).toBeFalsy();
    });

    it('_validateUserRole should return error if user role has wrong value', function() {
        expect(validator._validateUserRole('1')).toEqual('Select correct user role');
    });

    it('_validateUserRole should return null if user role is valid', function() {
        expect(validator._validateUserRole('2')).toBeNull();
        expect(validator._validateUserRole('3')).toBeNull();
        expect(validator._validateUserRole('4')).toBeNull();
    });

    it('_validateUserGroup should return error if group is empty', function() {
        expect(validator._validateUserGroup()).toEqual('This field is required');
        expect(validator._validateUserGroup(null)).toEqual('This field is required');
        expect(validator._validateUserGroup('')).toEqual('This field is required');
    });

    it('_validateUserGroup should return null if user group is valid', function() {
        expect(validator._validateUserGroup('dummy group')).toBeNull();
    });

    it('_addStatus should set status to fail if user group contains error', function() {
        var result = { group: 'dummy error' };
        validator._addStatus(result);
        expect(result.success).toBeFalsy();
    });

    it('_addStatus should set status to fail if group name contains error', function() {
        var result = { groupName: 'dummy error' };
        validator._addStatus(result);
        expect(result.success).toBeFalsy();
    });

    it('_validateUserGroup should return null if group is not new', function() {
        expect(validator._validateGroupName('old group', null)).toEqual(null);
    });

    it('_validateUserGroup should return error if group name is empty', function() {
        expect(validator._validateGroupName('new', '')).toEqual('This field is required');
    });

    it('_validateUserGroup should return error if group name is too short or too long', function() {
        expect(validator._validateGroupName('new', '12')).toEqual('The value of this field must be 3..16 symbols');
        expect(validator._validateGroupName('new', '12345678901234567')).toEqual('The value of this field must be 3..16 symbols');
    });

    it('_validateUserGroup should return error if group name contains wrong symbols', function() {
        expect(validator._validateGroupName('new', 'abcdef^')).toEqual('Group Name can consist of letter, number and dot symbols');
    });

    it('_validateUserGroup should return null if group name is valid', function() {
        expect(validator._validateGroupName('new', '123D56789.1234g6')).toBeNull();
    });

    it('_validateUserNotExists should add error if user exists', function() {
        userRepository.IDExists.and.callFake(function(id, callback) {
            callback(true);
        });
        var result = { ID: null };

        validator._validateUserNotExists(data, result, next);

        expect(result.ID).toEqual('User with this ID already exists');
    });

    it('_validateUserNotExists should not add error if user ID already has error', function() {
        userRepository.IDExists.and.callFake(function(id, callback) {
            callback(true);
        });
        var result = { ID: 'dummy error' };

        validator._validateUserNotExists(data, result, next);

        expect(result.ID).toEqual('dummy error');
    });

    it('_validateUserNotExists should not add error if user not exists', function() {
        userRepository.IDExists.and.callFake(function(id, callback) {
            callback(false);
        });
        var result = { ID: null };

        validator._validateUserNotExists(data, result, next);

        expect(result.ID).toBeNull();
    });

    it('serverValidation should not continue validation if simple validation is not passed', function() {
        var callback = jasmine.createSpy('callback');
        spyOn(validator, 'validate').and.returnValue({ success: false });
        spyOn(validator, '_validateUserNotExists');

        validator.serverValidation(data, callback);

        expect(callback).toHaveBeenCalledWith({ success: false });
        expect(validator._validateUserNotExists).not.toHaveBeenCalled();
    });

    it('serverValidation should continue validation if simple validation is passed', function() {
        var callback = jasmine.createSpy('callback');
        spyOn(validator, 'validate').and.returnValue({ success: true });
        spyOn(validator, '_validateUserNotExists');

        validator.serverValidation(data, callback);

        expect(validator._validateUserNotExists).toHaveBeenCalled();
    });

    it('_validateNewGroupNotExists should add error if new group already exists', function() {
        data.group = 'new';
        var result = { groupName: null };
        groupRepository.exists.and.callFake(function(id, callback) {
            callback(true);
        });

        validator._validateNewGroupNotExists(data, result, next);

        expect(result.groupName).toEqual('Group with this name already exists');
    });

    it('_validateNewGroupNotExists should not add error if group name already has error', function() {
        data.group = 'new';
        var result = { groupName: 'dummy error' };
        groupRepository.exists.and.callFake(function(id, callback) {
            callback(true);
        });

        validator._validateNewGroupNotExists(data, result, next);

        expect(result.groupName).toEqual('dummy error');
    });

    it('_validateNewGroupNotExists should not add error if group not exists', function() {
        data.group = 'new';
        var result = { groupName: null };
        groupRepository.exists.and.callFake(function(id, callback) {
            callback(false);
        });

        validator._validateNewGroupNotExists(data, result, next);

        expect(result.groupName).toBeNull();
    });

    it('_validateNewGroupNotExists should skip validation if group is not new', function() {
        data.group = 'dummy group';

        validator._validateNewGroupNotExists(data, null, next);

        expect(groupRepository.exists).not.toHaveBeenCalled();
    });
});