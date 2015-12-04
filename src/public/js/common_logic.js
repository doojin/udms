define([
    'helper/jquery',
    'widget/login_form',
    'widget/log_off_button',
    'widget/menu'
], function(
    $,
    LoginForm,
    LogOffButton,
    Menu
) {
    // Login form
    var loginPopup = $('.login-form');
    var loginButton = $('.login-button');
    var submitButton = loginPopup.find('.submit');

    var loginForm = new LoginForm(loginPopup);
    loginForm.bindShowTrigger(loginButton, 'click');
    loginForm.bindSubmitTrigger(submitButton, 'click');

    // Log off button
    new LogOffButton('.log-off');

    // Menu
    var menuIcon = $('.menu-icon');

    var menu = new Menu('navigation-menu');
    menu.init();
    menu.bindTrigger(menuIcon, 'click');

});