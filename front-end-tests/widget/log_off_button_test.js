define([
    'helper/jquery',
    'widget/log_off_button',
    'service/user_service'
], function(
    $,
    LogOffButton,
    userService
) {

    describe('widget/log_off_button', function() {

        it('_addClickListener should reload window on log off success', function() {
            var button = $('<button>');
            var logOffButton = new LogOffButton();
            logOffButton.button = button;
            logOffButton._addClickListener();
            spyOn(logOffButton, '_reloadWindow');
            spyOn(userService, 'logoff').and.callFake(function(callback) {
                callback(true);
            });

            button.click();

            expect(logOffButton._reloadWindow).toHaveBeenCalled();
        });

        it('_addClickListener should not reload window on log off fail', function() {
            var button = $('<button>');
            var logOffButton = new LogOffButton();
            logOffButton._addClickListener();
            logOffButton.button = button;
            spyOn(logOffButton, '_reloadWindow');
            spyOn(userService, 'logoff').and.callFake(function(callback) {
                callback(false);
            });

            button.click();

            expect(logOffButton._reloadWindow).not.toHaveBeenCalled();
        });


    });

});