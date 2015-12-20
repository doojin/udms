var validator = require('../../src/validator/publication_form_validator');

describe('publication_form_validator', function() {

    it('_addError should add error to result object', function() {
        var result = {};

        validator._addError('dummy property', result, 'dummy error');

        expect(result).toEqual({ 'dummy property': 'dummy error' });
    });

    it('_addError should not override existing error', function() {
        var result = { 'field1': 'error1' };

        validator._addError('field1', result, 'error2');

        expect(result).toEqual({ field1: 'error1' });
    });

    it('_validateName should add error if publication name is not set', function() {
        var result = {};
        var data = { name: '' };

        validator._validateName(data, result);

        expect(result.name).toEqual('This field is required');
    });

    it('_validateName should add error if publication name is too short or too long', function() {
        var result = {};
        var data = { name: '1234' };

        validator._validateName(data, result);

        expect(result.name).toEqual('The value of this field must be 5..100 symbols');

        result = {};
        for (var i = 0, name = ''; i < 101; i++)  name += '1';
        data.name = name;

        validator._validateName(data, result);

        expect(result.name).toEqual('The value of this field must be 5..100 symbols');
    });

    it('_validateName should not add error if name is valid', function() {
        var result = {};
        var data = { name: '12345' };

        validator._validateName(data, result);

        expect(result.name).toBeUndefined();
    });

    it('_validateDescription should add error if description is too long', function() {
        var result = {};
        for (var i = 0, description = ''; i < 4001; i++) description += '1';
        var data = { description: description };

        validator._validateDescription(data, result);

        expect(result.description).toEqual('The value of this field should be not longer than 4000 symbols');
    });

    it('_validateDescription should not add error if description is valid', function() {
        var result = {};
        for (var i = 0, description = ''; i < 4000; i++) description += '1';
        var data = { description: description };

        validator._validateDescription(data, result);

        expect(result.description).toBeUndefined();
    });

    it('_validateSectionTitle should add error if section title is not set', function() {
        var result = {};
        var data = { title: '' };

        validator._validateSectionTitle(data, result);

        expect(result.title).toEqual('This field is required');
    });

    it('_validateSectionTitle should add error if section title is too short', function() {
        var result = {};
        var data = { title: '1234' };

        validator._validateSectionTitle(data, result);

        expect(result.title).toEqual('The value of this field must be 5..100 symbols');
    });

    it('_validateSectionTitle should add error if section title is too long', function() {
        var result = {};
        var data = { title: '' };
        for (var i = 0; i < 101; i++) data.title += '1';

        validator._validateSectionTitle(data, result);

        expect(result.title).toEqual('The value of this field must be 5..100 symbols');
    });

    it('_validateSectionTitle should not add error if section title is valid', function() {
        var result = {};
        var data = { title: '' };
        for (var i = 0; i < 100; i++) data.title += '1';

        validator._validateSectionTitle(data, result);

        expect(result.title).toBeUndefined();
    });

    it('_validateSectionDescription should add error if section description is too long', function() {
        var result = {};
        var data = { description: '' };
        for (var i = 0; i < 4001; i++) data.description += '1';

        validator._validateSectionDescription(data, result);

        expect(result.description).toEqual('The value of this field should be not longer than 4000 symbols');
    });

    it('_validateSectionDescription should not add error if section description is valid', function() {
        var result = {};
        var data = { description: '' };
        for (var i = 0; i < 4000; i++) data.description += '1';

        validator._validateSectionDescription(data, result);

        expect(result.description).toBeUndefined();
    });

    it('_validateSections should add errors only for section which contain errors', function() {
        var result = {};
        for (var i = 0, tooLongDescription = ''; i < 4001; i++) tooLongDescription += '1';
        var data = {
            sections: [
                { title: '1234', description: 'dummy description' }, // Too short title
                { title: '12345', description: 'dummy description' }, // Correct section
                { title: '1234', description: tooLongDescription } // Too short title + too long description
            ]
        };

        validator._validateSections(data, result);

        expect(result).toEqual({
            sections: [
                { title: 'The value of this field must be 5..100 symbols' },
                {  /* empty error object */ },
                {
                    title: 'The value of this field must be 5..100 symbols',
                    description: 'The value of this field should be not longer than 4000 symbols'
                }
            ]
        });
    });

    it('_setSuccessFlag should set flag to false if publication name has error', function() {
        var result = { name: 'error' };

        validator._setSuccessFlag(result);

        expect(result.success).toBeFalsy();
    });

    it('_setSuccessFlag should set flag to false if publication description has error', function() {
        var result = { description: 'error' };

        validator._setSuccessFlag(result);

        expect(result.success).toBeFalsy();
    });

    it('_setSuccessFlag should set flag to false if one of sections has error', function() {
        var result = {
            sections: [
                { },
                { title: 'error' },
                { }
            ]
        };

        validator._setSuccessFlag(result);

        expect(result.success).toBeFalsy();
    });

    it('_setSuccessFlag should set flag to true if form is valid', function() {
        var result = {
            sections: [
                { },
                { },
                { }
            ]
        };

        validator._setSuccessFlag(result);

        expect(result.success).toBeTruthy();
    });
});