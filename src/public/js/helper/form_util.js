define(['helper/jquery'], function($) {

    var formUtil = {};

    formUtil.onEnter = function(formSelector, callback) {
        var form = $(formSelector);

        form.find('input').keypress(function(e) {
            if (e.which == 13) {
                callback(form);
                return false;
            }
        });
    };

    return formUtil;

});