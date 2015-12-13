var validator = require('../../src/validator/upsert_form_validator');

describe('validator/upsert_form_validator', function() {

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

});