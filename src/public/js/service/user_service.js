define(['helper/jquery'], function($) {

    var LOG_IN_URL = '/login';

    var userService = {};

    userService.login = function(userID, password, callback) {
        $.ajax({
            url: LOG_IN_URL,
            type: 'get',
            data: {
                userID: userID,
                password: password
            },
            success: function(data) {
                callback(data.success);
            },
            error: function() {
                callback(false);
            }
        });
    };

    return userService;

});