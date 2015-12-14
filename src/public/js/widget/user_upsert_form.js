define([
    'helper/jquery',
    'helper/slidable',
    'service/role_service',
    'service/group_service',
    'service/user_service',
    'validator/upsert_form_validator'
], function(
    $,
    slidable,
    roleService,
    groupService,
    userService,
    upsertFormValidator
) {

    function UserUpsertForm(selector) {
        this._form = $(selector);
        this._addGroupChangeListener();
        this._populateRoles();
        this._populateGroups();
        this._addSubmitListener();
    }

    UserUpsertForm.prototype.bindNewUserEvent = function(trigSelector, trigEvent) {
        var self = this;
        slidable.bind(trigSelector, trigEvent, this._form);
        $(trigSelector).on(trigEvent, function() {
            self._prepareNewUserForm();
        });
    };

    UserUpsertForm.prototype._prepareNewUserForm = function() {
        this._getSubmitButton().removeClass('invisible');
        this._getCancelButton().removeClass('invisible');
        this._getUpdateButton().addClass('invisible');
        this._getCloseButton().addClass('invisible');
        this._clearForm();
        this._hideSuccessMessage();
        this._unlockForm();
    };

    UserUpsertForm.prototype._clearForm = function() {
        this._getUserIDInput().val('');
        this._getUserRoleSelect()
            .find('option:first-child')
            .prop('selected', true)
            .change();
        this._getUserGroupSelect()
            .find('option:first-child')
            .prop('selected', true)
            .change();
        this._getUserGroupNameInput().val('');
        this._clearErrors();
    };

    UserUpsertForm.prototype._addGroupChangeListener = function() {
        var groupSelect = this._getUserGroupSelect();
        var groupNameRow = this._getUserGroupNameRow();

        groupSelect.on('change', function() {
            // New group selected
            if (groupSelect[0].selectedIndex === 0) {
                groupNameRow.removeClass('invisible');
                return;
            }
            // Old group selected
            groupNameRow.addClass('invisible');
        });
    };

    UserUpsertForm.prototype._populateRoles = function() {
        var roles = roleService.roles();
        for (var i in roles) {
            //noinspection JSUnfilteredForInLoop
            var option = $('<option>')
                .val(i)
                .html(roles[i]);
            this._getUserRoleSelect().append(option);
        }
    };

    UserUpsertForm.prototype._populateGroups = function() {
        this._getUserGroupSelect()
            .find('option:not(:first)')
            .remove();

        var self = this;
        groupService.groups(function(groups) {
            groups.forEach(function(group) {
                var option = $('<option>')
                    .val(group._id)
                    .html(group.name);

                self._getUserGroupSelect().append(option);
            });
        });
    };

    UserUpsertForm.prototype._addSubmitListener = function() {
        var self = this;
        this._getSubmitButton().on('click', function() {
            self._clearErrors();
            var formData = self._collectData();

            // Front-end validation
            var validationResult = upsertFormValidator.validate(formData);
            if (!validationResult.success) {
                self._showErrors(validationResult);
                return;
            }

            // Back-end validation & processing
            userService.createUser(formData, function(result) {
                if (result.success) {
                    self._showSuccessMessage(result.password);
                    self._lockForm();
                    self._getCloseButton().removeClass('invisible');
                    self._getSubmitButton().addClass('invisible');
                    self._getCancelButton().addClass('invisible');
                    self._getUpdateButton().addClass('invisible');
                    return;
                }
                self._showErrors(result);
            });
        });
    };

    UserUpsertForm.prototype._showSuccessMessage = function(password) {
        this._getPasswordSpan().html(password);
        this._getSuccessRow().removeClass('invisible');
    };

    UserUpsertForm.prototype._hideSuccessMessage = function() {
        this._getPasswordSpan().html('');
        this._getSuccessRow().addClass('invisible');
    };

    UserUpsertForm.prototype._lockForm = function() {
        this._getUserIDInput().prop('disabled', true);
        this._getUserGroupNameInput().prop('disabled', true);
        this._getUserRoleSelect().prop('disabled', true);
        this._getUserGroupSelect().prop('disabled', true);
    };

    UserUpsertForm.prototype._unlockForm = function() {
        this._getUserIDInput().prop('disabled', false);
        this._getUserGroupNameInput().prop('disabled', false);
        this._getUserRoleSelect().prop('disabled', false);
        this._getUserGroupSelect().prop('disabled', false);
    };

    UserUpsertForm.prototype._collectData = function() {
        return {
            ID: this._getUserIDInput().val(),
            role: this._getUserRoleSelect().val(),
            group: this._getUserGroupSelect().val(),
            groupName: this._getUserGroupNameInput().val()
        };
    };

    UserUpsertForm.prototype._showErrors = function(response) {
        if (response.ID !== null) { this._addError(this._getUserIDInput(), response.ID); }
        if (response.role !== null) { this._addError(this._getUserRoleSelect(), response.role); }
        if (response.group !== null) { this._addError(this._getUserGroupSelect(), response.group); }
        if (response.groupName !== null) { this._addError(this._getUserGroupNameInput(), response.groupName); }
    };

    UserUpsertForm.prototype._addError = function(element, error) {
        var label = $(element).closest('label');

        label.find('small.error').remove();
        var errorLabel = $('<small>').addClass('error').html(error);
        label.append(errorLabel);
    };

    UserUpsertForm.prototype._clearErrors = function() {
        this._form.find('small.error').remove();
    };

    UserUpsertForm.prototype._getCancelButton = function() {
        return this._form.find('.cancel');
    };

    UserUpsertForm.prototype._getSuccessRow = function() {
        return this._form.find('.success');
    };

    UserUpsertForm.prototype._getPasswordSpan = function() {
        return this._form.find('.user-password');
    };

    UserUpsertForm.prototype._getUserIDInput = function() {
        return this._form.find('.user-id');
    };

    UserUpsertForm.prototype._getUserRoleSelect = function() {
        return this._form.find('.user-role');
    };

    UserUpsertForm.prototype._getUserGroupSelect = function() {
        return this._form.find('.user-group');
    };

    UserUpsertForm.prototype._getUserGroupNameInput = function() {
        return this._form.find('.user-new-group');
    };

    UserUpsertForm.prototype._getUserGroupNameRow = function() {
        return this._form.find('.user-new-group').closest('.row');
    };

    UserUpsertForm.prototype._getSubmitButton = function() {
        return this._form.find('.submit');
    };

    UserUpsertForm.prototype._getUpdateButton = function() {
        return this._form.find('.update');
    };

    UserUpsertForm.prototype._getCloseButton = function() {
        return this._form.find('.close');
    };

    return UserUpsertForm;

});