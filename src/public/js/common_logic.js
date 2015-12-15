define([
    'helper/jquery',
    'widget/login_form',
    'widget/log_off_button',
    'widget/menu',
    'tinyMCE'
], function(
    $,
    LoginForm,
    LogOffButton,
    Menu,
    tinyMCE
) {

    var commonLogic = {};

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

    // Updating all textareas
    // TODO: tests
    commonLogic.initTinyMCEs = function(onLoad) {
        if (typeof onLoad !== typeof Function) onLoad = function() {};

        var textAreas = $('textarea').length;
        if (textAreas === 0) return;

        var loaded = 0;

        tinyMCE.init({
            selector: 'textarea',
            menubar: false,
            toolbar: 'undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist | fontsizeselect',
            statusbar: false,
            setup: function(editor) {
                editor.on('init', function() {
                    loaded++;
                    if (loaded === textAreas) onLoad();
                });
            }
        });
    };

    return commonLogic;

});