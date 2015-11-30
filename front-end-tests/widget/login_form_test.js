define([
    'helper/jquery',
    'widget/login_form',
    'helper/form_util',
    'helper/slidable',
    'service/user_service'
], function(
    $,
    LoginForm,
    formUtil,
    slidable,
    userService
) {

    describe('widget/login_form', function() {

        it('bindShowTrigger should bind trigger element to form show action', function() {
            var form = $('<form>');
            var button = $('<button>');
            var loginForm = new LoginForm(form);
            spyOn(slidable, 'bind');

            loginForm.bindShowTrigger(button, 'click');

            expect(slidable.bind).toHaveBeenCalledWith(button, 'click', form);
        });

        it('bindShowTrigger should clear form errors when form is shown', function() {
            var loginForm = new LoginForm();
            var button = $('<button>');
            spyOn(loginForm, '_clearForm');

            loginForm.bindShowTrigger(button, 'mouseover');
            button.mouseover();

            expect(loginForm._clearForm).toHaveBeenCalled();
        });

        it('bindSubmitTrigger should bind trigger element to form submit action', function() {
            var form = $('<form>');
            var button = $('<button>');
            var loginForm = new LoginForm(form);
            spyOn(loginForm, 'submit');

            loginForm.bindSubmitTrigger(button, 'click');
            button.click();

            expect(loginForm.submit).toHaveBeenCalled();
        });

        it('submit should reload page if validation is successful', function() {
            var loginForm = new LoginForm();
            spyOn(loginForm, '_reloadWindow');
            spyOn(loginForm, '_validate').and.callFake(function(callback) {
                callback(true);
            });

            loginForm.submit();

            expect(loginForm._reloadWindow).toHaveBeenCalled();
        });

        it('submit should not reload page if validation is unsuccessful', function() {
            var loginForm = new LoginForm();
            spyOn(loginForm, '_reloadWindow');
            spyOn(loginForm, '_validate').and.callFake(function(callback) {
                callback(false);
            });

            loginForm.submit();

            expect(loginForm._reloadWindow).not.toHaveBeenCalled();
        });

        it('_clearForm should clear form inputs and errors', function() {
            var form = $('<form>');
            var input1 = $('<input type="text">').val('val1');
            var input2 = $('<input type="text">').val('val2');
            form.append(input1).append(input2);
            var loginForm = new LoginForm(form);
            spyOn(loginForm, '_clearErrors');

            expect(input1.val()).toEqual('val1');
            expect(input2.val()).toEqual('val2');
            expect(loginForm._clearErrors).not.toHaveBeenCalled();

            loginForm._clearForm();

            expect(input1.val()).toEqual('');
            expect(input2.val()).toEqual('');
            expect(loginForm._clearErrors).toHaveBeenCalled();
        });

        it('_clearErrors should remove all errors from the form', function() {
            var form = $('<form>');
            var error1 = $('<small class="error">');
            var error2 = $('<small class="error">');
            form.append(error1).append(error2);
            var loginForm = new LoginForm(form);

            var errors = form.find('small');
            expect(errors.length).toEqual(2);

            loginForm._clearErrors();

            errors = form.find('small');
            expect(errors.length).toEqual(0);
        });

        it('_validate should remove all errors from the form', function() {
            var loginForm = new LoginForm();
            spyOn(loginForm, '_validateUserExists');
            spyOn(loginForm, '_clearErrors');

            loginForm._validate();

            expect(loginForm._clearErrors).toHaveBeenCalled();
        });

        it('_validate should call negative callback if userID is empty', function() {
            var loginForm = new LoginForm();
            spyOn(loginForm, '_validateUserIDNotEmpty').and.returnValue(false);
            spyOn(loginForm, '_validatePasswordNotEmpty').and.returnValue(true);
            spyOn(loginForm, '_validateUserExists');
            var callback = jasmine.createSpy('callback');

            loginForm._validate(callback);

            expect(callback).toHaveBeenCalledWith(false);
        });

        it('_validate should call negative callback if password is empty', function() {
            var loginForm = new LoginForm();
            spyOn(loginForm, '_validateUserIDNotEmpty').and.returnValue(true);
            spyOn(loginForm, '_validatePasswordNotEmpty').and.returnValue(false);
            spyOn(loginForm, '_validateUserExists');
            var callback = jasmine.createSpy('callback');

            loginForm._validate(callback);

            expect(callback).toHaveBeenCalledWith(false);
        });

        it('_validate should call negative callback if user not exists', function() {
            var loginForm = new LoginForm();
            spyOn(loginForm, '_validateUserIDNotEmpty').and.returnValue(true);
            spyOn(loginForm, '_validatePasswordNotEmpty').and.returnValue(true);
            spyOn(loginForm, '_validateUserExists').and.callFake(function(callback) {
                callback(false);
            });
            var callback = jasmine.createSpy('callback');

            loginForm._validate(callback);

            expect(callback).toHaveBeenCalledWith(false);
        });

        it('_validate should call positive callback if all validations are passed', function() {
            var loginForm = new LoginForm();
            spyOn(loginForm, '_validateUserIDNotEmpty').and.returnValue(true);
            spyOn(loginForm, '_validatePasswordNotEmpty').and.returnValue(true);
            spyOn(loginForm, '_validateUserExists').and.callFake(function(callback) {
                callback(true);
            });
            var callback = jasmine.createSpy('callback');

            loginForm._validate(callback);

            expect(callback).toHaveBeenCalledWith(true);
        });

        it('_validateUserIDNotEmpty should return true if userID field is not empty', function() {
            var form = $('<form>');
            var userID = $('<input>')
                .attr('type', 'text')
                .attr('id', 'user-id')
                .val('userID');
            form.append(userID);
            var loginForm = new LoginForm(form);

            expect(loginForm._validateUserIDNotEmpty()).toBeTruthy();
        });

        it('_validateUserIDNotEmpty should return false if userID field is empty', function() {
            var form = $('<form>');
            var userID = $('<input>')
                .attr('type', 'text')
                .attr('id', 'user-id')
                .val('');
            form.append(userID);
            var loginForm = new LoginForm(form);

            expect(loginForm._validateUserIDNotEmpty()).toBeFalsy();
        });

        it('_validateUserIDNotEmpty should add error message if userID is empty', function() {
            var form = $('<form>');
            var label = $('<label>');
            var userID = $('<input>')
                .attr('type', 'text')
                .attr('id', 'user-id')
                .val('');
            label.append(userID);
            form.append(label);
            var loginForm = new LoginForm(form);

            var small = form.find('label').find('small');
            expect(small.length).toEqual(0);

            loginForm._validateUserIDNotEmpty();

            small = form.find('label').find('small');
            expect(small.length).toEqual(1);
            expect(small.html()).toEqual('This field is required');
        });

        it('_validatePasswordNotEmpty should return true if password field is not empty', function() {
            var form = $('<form>');
            var userPassword = $('<input>')
                .attr('type', 'password')
                .attr('id', 'user-password')
                .val('userPassword');
            form.append(userPassword);
            var loginForm = new LoginForm(form);

            expect(loginForm._validatePasswordNotEmpty()).toBeTruthy();
        });

        it('_validatePasswordNotEmpty should return false if password field is empty', function() {
            var form = $('<form>');
            var userPassword = $('<input>')
                .attr('type', 'password')
                .attr('id', 'user-password')
                .val('');
            form.append(userPassword);
            var loginForm = new LoginForm(form);

            expect(loginForm._validatePasswordNotEmpty()).toBeFalsy();
        });

        it('_validatePasswordNotEmpty should add error message if password is empty', function() {
            var form = $('<form>');
            var label = $('<label>');
            var password = $('<input>')
                .attr('type', 'password')
                .attr('id', 'user-password')
                .val('');
            label.append(password);
            form.append(label);
            var loginForm = new LoginForm(form);

            var small = form.find('label').find('small');
            expect(small.length).toEqual(0);

            loginForm._validatePasswordNotEmpty();

            small = form.find('label').find('small');
            expect(small.length).toEqual(1);
            expect(small.html()).toEqual('This field is required');
        });

        it('_validateUserExists should call positive callback if user exists', function() {
            var loginForm = new LoginForm();
            spyOn(userService, 'login').and.callFake(function(login, password, callback) {
                callback(true);
            });
            var callback = jasmine.createSpy('callback');

            loginForm._validateUserExists(callback);

            expect(callback).toHaveBeenCalledWith(true);
        });

        it('_validateUserExists should call negative callback if user not exists', function() {
            var loginForm = new LoginForm();
            spyOn(userService, 'login').and.callFake(function(login, password, callback) {
                callback(false);
            });
            var callback = jasmine.createSpy('callback');

            loginForm._validateUserExists(callback);

            expect(callback).toHaveBeenCalledWith(false);
        });

        it('_validateUserExists should add error for userID field if user not exists', function() {
            var form = $('<form>');
            var label = $('<label>');
            var userID = $('<input>').attr('type', 'text')
                .attr('id', 'user-id');
            label.append(userID);
            form.append(label);
            var loginForm = new LoginForm(form);
            spyOn(userService, 'login').and.callFake(function(login, password, callback) {
                callback(false);
            });
            var callback = jasmine.createSpy('callback');


            var error = form.find('small');
            expect(error.length).toEqual(0);

            loginForm._validateUserExists(callback);

            error = form.find('small');
            expect(error.length).toEqual(1);
            expect(error.html()).toEqual('User with this UserID and Password doesn\'t exist');
        });

        it('_addError should add error for corresponding element', function() {
            var label = $('<label>');
            var field = $('<input>');
            label.append(field);
            var loginForm = new LoginForm();

            loginForm._addError(field, 'dummy error');

            var error = label.find('small');
            expect(error.length).toEqual(1);
            expect(error.html()).toEqual('dummy error');
        });
    });

});