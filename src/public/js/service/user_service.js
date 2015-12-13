define(['helper/jquery'], function($) {

    var LOG_IN_URL = '/login';
    var LOG_OFF_URL = '/log-off';
    var CREATE_USER_URL = '/create-user';

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

    userService.logoff = function(callback) {
        $.ajax({
            url: LOG_OFF_URL,
            type: 'get',
            success: function() {
                callback(true);
            },
            error: function() {
                callback(false);
            }
        })
    };

    userService.createUser = function(data, callback) {
        $.ajax({
            url: CREATE_USER_URL,
            data: JSON.stringify(data),
            type: 'post',
            contentType: 'application/json',
            success: callback
        })
    };

    return userService;

});