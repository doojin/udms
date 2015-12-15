define([
    'widget/user_upsert_form',
    'helper/jquery',
    'helper/slidable',
    'service/role_service',
    'service/group_service',
    'service/user_service',
    'validator/upsert_form_validator'
], function(
    Form,
    $,
    slidable,
    roleService,
    groupService,
    userService,
    validator
) {

    describe('widget/user_upsert_form', function() {

        beforeEach(function() {
            spyOn(groupService, 'groups').and.returnValue([]);
            spyOn(userService, 'upsert');
            spyOn(validator, 'validate').and.returnValue({ success: true });
        });

        it('_clearForm should clear all form inputs', function() {
            var userIDInput = $('<input>')
                .addClass('user-id')
                .val('dummy value');

            var userNewGroupInput = $('<input>')
                .addClass('user-new-group')
                .val('dummy value');

            var userRoleSelect = $('<select>')
                .addClass('user-role')
                .append($('<option>').val('1'))
                .append($('<option>').val('dummy value').attr('selected', 'selected'));

            var userGroupSelect = $('<select>')
                .addClass('user-group')
                .append($('<option>').val('new'))
                .append($('<option>').val('dummy value').attr('selected', 'selected'));

            var IDInput = $('<input>')
                .addClass('_id')
                .val('dummy id');

            var form = $('<div>').append(userIDInput)
                .append(userNewGroupInput)
                .append(userRoleSelect)
                .append(userGroupSelect)
                .append(IDInput);

            var upsertForm = new Form();
            upsertForm._form = form;

            expect(userIDInput.val()).toEqual('dummy value');
            expect(userNewGroupInput.val()).toEqual('dummy value');
            expect(userGroupSelect.val()).toEqual('dummy value');
            expect(userRoleSelect.val()).toEqual('dummy value');
            expect(IDInput.val()).toEqual('dummy id');

            upsertForm._clearForm();

            expect(userIDInput.val()).toEqual('');
            expect(userNewGroupInput.val()).toEqual('');
            expect(userGroupSelect.val()).toEqual('new');
            expect(userRoleSelect.val()).toEqual('1');
            expect(IDInput.val()).toEqual('');
        });

        it('_clearForm should clear errors', function() {
            var upsertForm = new Form();
            spyOn(upsertForm, '_clearErrors');

            upsertForm._clearForm();

            expect(upsertForm._clearErrors).toHaveBeenCalled();
        });

        it('_prepareNewUserForm should make submit button visible', function() {
            var submitButton = $('<div>').addClass('submit').addClass('invisible');
            var form = $('<div>').append(submitButton);
            var upsertForm = new Form(form);

            expect(submitButton.hasClass('invisible')).toBeTruthy();

            upsertForm._prepareNewUserForm();

            expect(submitButton.hasClass('invisible')).toBeFalsy();
        });

        it('_prepareNewUserForm should make close button invisible', function() {
            var closeButton = $('<div>').addClass('close');
            var form = $('<div>').append(closeButton);
            var upsertForm = new Form(form);

            expect(closeButton.hasClass('invisible')).toBeFalsy();

            upsertForm._prepareNewUserForm();

            expect(closeButton.hasClass('invisible')).toBeTruthy();
        });

        it('constructor should bind element to show form event', function() {
            var form = $('<div>');
            var upsertForm = new Form(form);
            var btn = $('<button>');
            spyOn(slidable, 'bind');
            spyOn(upsertForm, '_prepareNewUserForm');

            expect(slidable.bind).not.toHaveBeenCalled();
            expect(upsertForm._prepareNewUserForm).not.toHaveBeenCalled();

            upsertForm.bindNewUserEvent(btn, 'click');
            btn.click();

            expect(slidable.bind).toHaveBeenCalledWith(btn, 'click', upsertForm._form);
            expect(upsertForm._prepareNewUserForm).toHaveBeenCalled();
        });

        it('_addGroupChangeListener should show/hide group name row depending on user group value', function() {
            var upsertForm = new Form();

            var userGroup = $('<select>').addClass('user-group')
                .append($('<option>').val('1'))
                .append($('<option>').val('2'));

            var groupNameInput = $('<input>').addClass('user-new-group');

            var groupNameRow = $('<div>')
                .addClass('row')
                .append(groupNameInput);

            upsertForm._form = $('<div>')
                .append(userGroup)
                .append(groupNameRow);

            upsertForm._addGroupChangeListener();

            expect(groupNameRow.hasClass('invisible')).toBeFalsy();

            userGroup.val('2').change();

            expect(groupNameRow.hasClass('invisible')).toBeTruthy();

            userGroup.val('1').change();

            expect(groupNameRow.hasClass('invisible')).toBeFalsy();
        });

        it('_populateRoles should populate user roles', function() {
            var upsertForm = new Form();
            var userRolesSelect = $('<select>').addClass('user-role');
            upsertForm._form = $('<div>').append(userRolesSelect);
            spyOn(roleService, 'roles').and.returnValue({
                '1': 'Dummy role 1',
                '2': 'Dummy role 2'
            });

            upsertForm._populateRoles();

            var options = userRolesSelect.find('option');
            expect(options.length).toEqual(2);
            expect(options[0].outerHTML).toEqual('<option value="1">Dummy role 1</option>');
            expect(options[1].outerHTML).toEqual('<option value="2">Dummy role 2</option>');
        });

        it('_populateGroups should populate group <select>', function() {
            groupService.groups.and.callFake(function(callback) {
                callback([
                    { _id: 'id1', name: 'group1'},
                    { _id: 'id2', name: 'group2'}
                ]);
            });
            var upsertForm = new Form();
            var firstOption = $('<option>');
            var groupSelect = $('<select>')
                .addClass('user-group')
                .append(firstOption);
            upsertForm._form = $('<div>').append(groupSelect);

            upsertForm._populateGroups();

            var options = groupSelect.find('option');
            expect(options.length).toEqual(3);
            expect(options[0].outerHTML).toEqual('<option></option>');
            expect(options[1].outerHTML).toEqual('<option value="id1">group1</option>');
            expect(options[2].outerHTML).toEqual('<option value="id2">group2</option>');
        });

        it('_collectData should collect form data', function() {
            var userIDInput = $('<input>').addClass('user-id').val('dummy id');

            var roleSelect = $('<select>')
                .addClass('user-role')
                .append($('<option>')
                    .val('dummy role')
                    .prop('selected', true)
                );

            var groupSelect = $('<select>')
                .addClass('user-group')
                .append($('<option>')
                    .val('dummy group')
                    .prop('selected', true)
                );

            var groupNameInput = $('<input>')
                .addClass('user-new-group')
                .val('dummy group name');

            var IDInput = $('<input>')
                .addClass('_id')
                .val('dummy id');

            var form = $('<div>')
                .append(userIDInput)
                .append(roleSelect)
                .append(groupSelect)
                .append(groupNameInput)
                .append(IDInput);

            var upsertForm = new Form();
            upsertForm._form = form;

            var data = upsertForm._collectData();

            expect(data).toEqual({
                ID: 'dummy id',
                group: 'dummy group',
                role: 'dummy role',
                groupName: 'dummy group name',
                _id: 'dummy id'
            });
        });

        it('_showSuccessMessage should show success message', function() {
            var passwordSpan = $('<span>').addClass('user-password');

            var successRow = $('<div>')
                .addClass('success')
                .addClass('create')
                .addClass('invisible')
                .append(passwordSpan);

            var form = $('<div>').append(successRow);

            var upsertForm = new Form();
            upsertForm._form = form;

            expect(successRow.hasClass('invisible')).toBeTruthy();

            upsertForm._showSuccessMessage('dummy password');

            expect(successRow.hasClass('invisible')).toBeFalsy();
            expect(passwordSpan.html()).toEqual('dummy password');
        });

        it('_hideSuccessMessage should hide success message', function() {
            var passwordSpan = $('<span>')
                .addClass('user-password')
                .html('dummy password');

            var successRow = $('<div>')
                .addClass('success')
                .addClass('create')
                .append(passwordSpan);

            var successUpdateRow = $('<div>')
                .addClass('success')
                .addClass('update');

            var upsertForm = new Form();
            upsertForm._form = $('<div>')
                .append(successRow)
                .append(successUpdateRow);

            expect(passwordSpan.html()).toEqual('dummy password');
            expect(successRow.hasClass('invisible')).toBeFalsy();
            expect(successUpdateRow.hasClass('invisible')).toBeFalsy();

            upsertForm._hideSuccessMessages();

            expect(passwordSpan.html()).toEqual('');
            expect(successRow.hasClass('invisible')).toBeTruthy();
            expect(successUpdateRow.hasClass('invisible')).toBeTruthy();
        });

        it('_lockForm should disable all inputs', function() {
            var IDInput = $('<input>').addClass('user-id');
            var roleDropDown = $('<select>').addClass('user-role');
            var groupDropDown = $('<select>').addClass('user-group');
            var groupNameInput = $('<input>').addClass('user-new-group');

            var form = $('<div>')
                .append(IDInput)
                .append(roleDropDown)
                .append(groupDropDown)
                .append(groupNameInput);

            var upsertForm = new Form();
            upsertForm._form = form;

            expect(IDInput.prop('disabled')).toBeFalsy();
            expect(roleDropDown.prop('disabled')).toBeFalsy();
            expect(groupDropDown.prop('disabled')).toBeFalsy();
            expect(groupNameInput.prop('disabled')).toBeFalsy();

            upsertForm._lockForm();

            expect(IDInput.prop('disabled')).toBeTruthy();
            expect(roleDropDown.prop('disabled')).toBeTruthy();
            expect(groupDropDown.prop('disabled')).toBeTruthy();
            expect(groupNameInput.prop('disabled')).toBeTruthy();
        });

        it('_unlock form should enable all inputs', function() {
            var IDInput = $('<input>')
                .addClass('user-id')
                .prop('disabled', true);

            var roleDropDown = $('<select>')
                .addClass('user-role')
                .prop('disabled', true);

            var groupDropDown = $('<select>')
                .addClass('user-group')
                .prop('disabled', true);

            var groupNameInput = $('<input>')
                .addClass('user-new-group')
                .prop('disabled', true);

            var form = $('<div>')
                .append(IDInput)
                .append(roleDropDown)
                .append(groupDropDown)
                .append(groupNameInput);

            var upsertForm = new Form();
            upsertForm._form = form;

            expect(IDInput.prop('disabled')).toBeTruthy();
            expect(roleDropDown.prop('disabled')).toBeTruthy();
            expect(groupDropDown.prop('disabled')).toBeTruthy();
            expect(groupNameInput.prop('disabled')).toBeTruthy();

            upsertForm._unlockForm();

            expect(IDInput.prop('disabled')).toBeFalsy();
            expect(roleDropDown.prop('disabled')).toBeFalsy();
            expect(groupDropDown.prop('disabled')).toBeFalsy();
            expect(groupNameInput.prop('disabled')).toBeFalsy();
        });

        it('_addSubmitListener should clear form errors on submit', function() {
            var upsertForm = new Form();
            var submitButton = $('<button>').addClass('submit');
            upsertForm._form =  $('<div>').append(submitButton);
            spyOn(upsertForm, '_clearErrors');

            upsertForm._addSubmitListener();

            expect(upsertForm._clearErrors).not.toHaveBeenCalled();

            submitButton.click();

            expect(upsertForm._clearErrors).toHaveBeenCalled();
        });

        it('_addSubmitListener should lock form and show success message if user was created', function() {
            var upsertForm = new Form();
            var submitButton = $('<button>').addClass('submit');
            upsertForm._form = $('<div>').append(submitButton);
            userService.upsert.and.callFake(function(data, callback) {
                callback({ success: true, password: 'dummy password' });
            });
            spyOn(upsertForm, '_showSuccessMessage');
            spyOn(upsertForm, '_lockForm');

            upsertForm._addSubmitListener();

            expect(upsertForm._showSuccessMessage).not.toHaveBeenCalled();
            expect(upsertForm._lockForm).not.toHaveBeenCalled();

            submitButton.click();

            expect(upsertForm._showSuccessMessage).toHaveBeenCalledWith('dummy password');
            expect(upsertForm._lockForm).toHaveBeenCalled();
        });

        it('_addSubmitListener should show errors on form if user was not created', function() {
            var upsertForm = new Form();
            var submitButton = $('<button>').addClass('submit');
            upsertForm._form = $('<div>').append(submitButton);
            userService.upsert.and.callFake(function(data, callback) {
                callback({ success: false });
            });
            spyOn(upsertForm, '_showErrors');

            upsertForm._addSubmitListener();

            expect(upsertForm._showErrors).not.toHaveBeenCalled();

            submitButton.click();

            expect(upsertForm._showErrors).toHaveBeenCalledWith({ success: false });
        });

        it('_addSubmitListener should hide all buttons BUT close button on success', function() {
            var upsertForm = new Form();
            var submitButton = $('<button>').addClass('submit');
            var closeButton = $('<button>').addClass('close').addClass('invisible');
            var cancelButton = $('<button>').addClass('cancel');

            upsertForm._form = $('<div>')
                .append(submitButton)
                .append(closeButton)
                .append(cancelButton);

            userService.upsert.and.callFake(function(data, callback) {
                callback({ success: true });
            });
            validator.validate.and.returnValue({ success: true });

            expect(submitButton.hasClass('invisible')).toBeFalsy();
            expect(cancelButton.hasClass('invisible')).toBeFalsy();
            expect(closeButton.hasClass('invisible')).toBeTruthy();

            upsertForm._addSubmitListener();
            submitButton.click();

            expect(submitButton.hasClass('invisible')).toBeTruthy();
            expect(cancelButton.hasClass('invisible')).toBeTruthy();
            expect(closeButton.hasClass('invisible')).toBeFalsy();
        });

        it('_showErrors should show errors for the fields which contain error', function() {
            var upsertForm = new Form();

            var userIDInput = $('<input>');
            var userRoleSelect = $('<select>');
            var userGroupSelect = $('<select>');
            var groupNameInput = $('<select>');

            spyOn(upsertForm, '_getUserIDInput').and.returnValue(userIDInput);
            spyOn(upsertForm, '_getUserRoleSelect').and.returnValue(userRoleSelect);
            spyOn(upsertForm, '_getUserGroupSelect').and.returnValue(userGroupSelect);
            spyOn(upsertForm, '_getUserGroupNameInput').and.returnValue(groupNameInput);
            spyOn(upsertForm, '_addError');

            upsertForm._showErrors({
                ID: 'user id error',
                role: 'user role error',
                group: 'user group error',
                groupName: 'group name error'
            });

            expect(upsertForm._addError).toHaveBeenCalledWith(userIDInput, 'user id error');
            expect(upsertForm._addError).toHaveBeenCalledWith(userRoleSelect, 'user role error');
            expect(upsertForm._addError).toHaveBeenCalledWith(userGroupSelect, 'user group error');
            expect(upsertForm._addError).toHaveBeenCalledWith(groupNameInput, 'group name error');
        });

        it('_showErrors should not show errors for the fields which don\'t contain error', function() {
            var upsertForm = new Form();

            var userIDInput = $('<input>');
            var userRoleSelect = $('<select>');
            var userGroupSelect = $('<select>');
            var groupNameInput = $('<select>');

            spyOn(upsertForm, '_getUserIDInput').and.returnValue(userIDInput);
            spyOn(upsertForm, '_getUserRoleSelect').and.returnValue(userRoleSelect);
            spyOn(upsertForm, '_getUserGroupSelect').and.returnValue(userGroupSelect);
            spyOn(upsertForm, '_getUserGroupNameInput').and.returnValue(groupNameInput);
            spyOn(upsertForm, '_addError');

            upsertForm._showErrors({
                ID: null,
                role: null,
                group: null,
                groupName: null
            });

            expect(upsertForm._addError).not.toHaveBeenCalled();
        });

        it('_addError should add error to the corresponding form element', function() {
            var upsertForm = new Form();
            var input = $('<input>');
            var oldError = $('<small>').addClass('error').html('old error');
            var label = $('<label>').append(input).append(oldError);
            upsertForm._form = $('<div>').append(label);

            var error = label.find('small.error');
            expect(error.length).toEqual(1);
            expect(error[0].outerHTML).toEqual('<small class="error">old error</small>');

            upsertForm._addError(input, 'dummy error');
            error = label.find('small.error');

            expect(error.length).toEqual(1);
            expect(error[0].outerHTML).toEqual('<small class="error">dummy error</small>')
        });

        it('_clearErrors should remove all error messages from form', function() {
            var upsertForm = new Form();
            var form = $('<div>');
            for (var i = 0; i < 5; i++) {
                var error = $('<small>').addClass('error');
                form.append(error);
            }
            upsertForm._form = form;

            expect(form.find('.error').length).toEqual(5);

            upsertForm._clearErrors();

            expect(form.find('.error').length).toEqual(0);
        });

        it('_addSubmitListener should not process back-end validation if front-end validation is failed', function() {
            var upsertForm = new Form();
            var submitButton = $('<button>').addClass('submit');
            upsertForm._form = $('<div>').append(submitButton);
            validator.validate.and.returnValue({ success: false });

            upsertForm._addSubmitListener();
            submitButton.click();

            expect(userService.upsert).not.toHaveBeenCalled();
        });

        it('_addSubmitListener should process back-end validation if front-end validation is passed', function() {
            var upsertForm = new Form();
            var submitButton = $('<button>').addClass('submit');
            upsertForm._form = $('<div>').append(submitButton);
            validator.validate.and.returnValue({ success: true });

            upsertForm._addSubmitListener();
            submitButton.click();

            expect(userService.upsert).toHaveBeenCalled();
        });

        it('_addSubmitListener should show errors if front-end validation is not passed', function() {
            var upsertForm = new Form();
            var submitButton = $('<button>').addClass('submit');
            upsertForm._form = $('<div>').append(submitButton);
            validator.validate.and.returnValue({ success: false });
            spyOn(upsertForm, '_showErrors');

            expect(upsertForm._showErrors).not.toHaveBeenCalled();

            upsertForm._addSubmitListener();
            submitButton.click();

            expect(upsertForm._showErrors).toHaveBeenCalledWith({ success: false });
        });

        it('showUpdateForm should show form', function() {
            var upsertForm = new Form();
            var form = $('<div>');
            upsertForm._form = form;
            spyOn(upsertForm, '_fillForm');

            expect(form.hasClass('visible')).toBeFalsy();

            upsertForm.showUpdateForm();

            expect(form.hasClass('visible')).toBeTruthy();
        });

        it('showUpdateForm should show only submit and cancel buttons', function() {
            var upsertForm = new Form();
            spyOn(upsertForm, '_fillForm');

            var submitButton = $('<button>').addClass('invisible');
            var cancelButton = $('<button>').addClass('invisible');
            var closeButton = $('<button>');

            spyOn(upsertForm, '_getSubmitButton').and.returnValue(submitButton);
            spyOn(upsertForm, '_getCancelButton').and.returnValue(cancelButton);
            spyOn(upsertForm, '_getCloseButton').and.returnValue(closeButton);

            expect(submitButton.hasClass('invisible')).toBeTruthy();
            expect(cancelButton.hasClass('invisible')).toBeTruthy();
            expect(closeButton.hasClass('invisible')).toBeFalsy();

            upsertForm.showUpdateForm();

            expect(submitButton.hasClass('invisible')).toBeFalsy();
            expect(cancelButton.hasClass('invisible')).toBeFalsy();
            expect(closeButton.hasClass('invisible')).toBeTruthy();
        });

        it('_fillForm should fill upsert form with user data', function() {
            var upsertForm = new Form();

            var IDInput = $('<input>');

            var userIDInput = $('<input>');

            var roleOption1 = $('<option>').val('dummy role');
            var roleOption2 = $('<option>').val('another role');
            var userRoleSelect = $('<select>')
                .append(roleOption1)
                .append(roleOption2);

            var groupOption1 = $('<option>').val('dummy group');
            var groupOption2 = $('<option>').val('another group');
            var userGroupSelect = $('<select>')
                .append(groupOption1)
                .append(groupOption2);

            var groupNameInput = $('<input>').val('dummy group name');

            spyOn(upsertForm, '_getIDInput').and.returnValue(IDInput);
            spyOn(upsertForm, '_getUserIDInput').and.returnValue(userIDInput);
            spyOn(upsertForm, '_getUserRoleSelect').and.returnValue(userRoleSelect);
            spyOn(upsertForm, '_getUserGroupSelect').and.returnValue(userGroupSelect);
            spyOn(upsertForm, '_getUserGroupNameInput').and.returnValue(groupNameInput);

            var user = {
                ID: 'dummy id',
                userID: 'dummy user id',
                role: { ID: 'another role' },
                group: { _id: 'another group' }
            };

            expect(IDInput.val()).toEqual('');
            expect(userIDInput.val()).toEqual('');
            expect(userRoleSelect.val()).toEqual('dummy role');
            expect(userGroupSelect.val()).toEqual('dummy group');
            expect(groupNameInput.val()).toEqual('dummy group name');

            upsertForm._fillForm(user);

            expect(IDInput.val()).toEqual('dummy id');
            expect(userIDInput.val()).toEqual('dummy user id');
            expect(userRoleSelect.val()).toEqual('another role');
            expect(userGroupSelect.val()).toEqual('another group');
            expect(groupNameInput.val()).toEqual('');
        });

        it('_showSuccessUpdateMessage should show success message', function() {
            var upsertForm = new Form();
            var successRow = $('<div>').addClass('invisible');
            spyOn(upsertForm, '_getSuccessUpdateRow').and.returnValue(successRow);

            expect(successRow.hasClass('invisible')).toBeTruthy();

            upsertForm._showSuccessUpdateMessage();

            expect(successRow.hasClass('invisible')).toBeFalsy();
        });
    });

});