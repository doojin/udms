define(['helper/jquery'], function($) {

    var USER_EXISTS_URL = '/user-exists';

    var userService = {};

    userService.login = function(userID, password, callback) {
        $.ajax({
            url: USER_EXISTS_URL,
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