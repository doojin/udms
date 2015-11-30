define([
    'helper/jquery',
    'helper/slidable',
    'helper/form_util',
    'service/user_service'
], function(
    $,
    slidable,
    formUtil,
    userService
) {

    var ERROR_WRONG_USER_ID_OR_PASSWORD = 'User with this UserID and Password doesn\'t exist';
    var ERROR_EMPTY = 'This field is required';

    function LoginForm(formSelector) {
        this.form = $(formSelector);
        this.userID = this.form.find('#user-id');
        this.password = this.form.find('#user-password');

        var self = this;
        formUtil.onEnter(this.form, function() {
            self.submit();
        });
    }

    // Submitting form
    LoginForm.prototype.submit = function() {
        var self = this;
        this._validate(function(success) {
            if (success) self._reloadWindow();
        });
    };

    LoginForm.prototype.bindShowTrigger = function(triggerSelector, triggerEvent) {
        slidable.bind(triggerSelector, triggerEvent, this.form);

        var self = this;
        $(triggerSelector).bind(triggerEvent, function() {
            self._clearForm()
        });
    };

    LoginForm.prototype.bindSubmitTrigger = function(triggerSelector, triggerEvent) {
        var trigger = $(triggerSelector);

        var self = this;
        trigger.on(triggerEvent, function() {
            self.submit();
        });
    };

    LoginForm.prototype._reloadWindow = function() {
        location.reload();
    };

    LoginForm.prototype._clearForm = function() {
        this.form.find('input').val('');
        this._clearErrors();
    };

    LoginForm.prototype._clearErrors = function() {
        this.form.find('small.error').remove();
    };

    LoginForm.prototype._validate = function(callback) {
        this._clearErrors();

        if (!this._validateUserIDNotEmpty() || !this._validatePasswordNotEmpty()) {
            callback(false);
            return;
        }
        this._validateUserExists(callback);
    };

    LoginForm.prototype._validateUserIDNotEmpty = function() {
        if (this.userID.val() === '') {
            this._addError(this.userID, ERROR_EMPTY);
            return false;
        }
        return true;
    };

    LoginForm.prototype._validatePasswordNotEmpty = function() {
        if (this.password.val() === '') {
            this._addError(this.password, ERROR_EMPTY);
            return false;
        }
        return true;
    };

    LoginForm.prototype._validateUserExists = function(callback) {
        var userID = this.userID.val(),
            password = this.password.val();

        var self = this;
        userService.login(userID, password, function(result) {
            if (!result) self._addError(self.userID, ERROR_WRONG_USER_ID_OR_PASSWORD);
            callback(result);
        });
    };

    LoginForm.prototype._addError = function(element, errorMessage) {
        var label = $(element).parent('label');
        var error = $('<small>').addClass('error')
            .html(errorMessage);
        label.append(error);
    };

    return LoginForm;

});