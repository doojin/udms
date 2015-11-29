define([
    'helper/jquery',
    'widget/login_form',
    'helper/form_util',
    'helper/slidable'
], function(
    $,
    LoginForm,
    formUtil,
    slidable
) {

    describe('widget/login_form', function() {

        it('LoginForm should add onEnter listener', function() {
            spyOn(formUtil, 'onEnter');
            var form = $('<form>');

            var loginForm = new LoginForm(form);

            expect(formUtil.onEnter).toHaveBeenCalledWith(form, loginForm.submit);
        });

        it('bindShowTrigger should bind trigger element to form show action', function() {
            var form = $('<form>');
            var button = $('<button>');
            var loginForm = new LoginForm(form);
            spyOn(slidable, 'bind');

            loginForm.bindShowTrigger(button, 'click');

            expect(slidable.bind).toHaveBeenCalledWith(button, 'click', form);
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

    });

});