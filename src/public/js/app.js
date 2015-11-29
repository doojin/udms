require.config({
    paths: {
        'jqueryGlobal': 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min'
    }
});

define([
    'helper/jquery',
    'widget/login_form'
], function(
    $,
    LoginForm
) {
    // Login form
    var loginPopup = $('.login-form');
    var loginButton = $('.login-button');
    var submitButton = loginPopup.find('.submit');

    var loginForm = new LoginForm(loginPopup);
    loginForm.bindShowTrigger(loginButton, 'click');
    loginForm.bindSubmitTrigger(submitButton, 'click');

});