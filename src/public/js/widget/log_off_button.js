define(['helper/jquery', 'service/user_service'], function($, userService) {

    function LogOffButton(elementSelector) {
        this.button = $(elementSelector);

        this._addClickListener();
    }

    LogOffButton.prototype._addClickListener = function() {
        var self = this;
        this.button.on('click', function() {
            userService.logoff(function(result) {
                if (result === true) self._reloadWindow();
            });
        });
    };

    LogOffButton.prototype._reloadWindow = function() {
        location.reload();
    };

    return LogOffButton;

});