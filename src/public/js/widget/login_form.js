define(['helper/jquery', 'helper/slidable', 'helper/form_util'], function($, slidable, formUtil) {

    function LoginForm(formSelector) {
        this.form = $(formSelector);
        formUtil.onEnter(this.form, this.submit);
    }

    LoginForm.prototype.bindShowTrigger = function(triggerSelector, triggerEvent) {
        slidable.bind(triggerSelector, triggerEvent, this.form);
    };

    LoginForm.prototype.bindSubmitTrigger = function(triggerSelector, triggerEvent) {
        var trigger = $(triggerSelector);
        trigger.on(triggerEvent, this.submit);
    };

    LoginForm.prototype.submit = function() {
        console.log('Form was submitted');
    };

    return LoginForm;

});