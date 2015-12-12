define(['helper/jquery', 'helper/slidable'], function($, slidable) {

    function UserUpsertForm(selector) {
        this._form = $(selector);
        this._addGroupChangeListener();
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
        this._getUpdateButton().addClass('invisible');
        this._clearForm();
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

    return UserUpsertForm;

});