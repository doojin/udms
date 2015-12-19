define(['helper/jquery'], function($) {

    var LOG_IN_URL = '/login';
    var LOG_OFF_URL = '/log-off';
    var UPDATE_INSERT_USER = '/update-insert-user';

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

    userService.upsert = function(data, callback) {
        $.ajax({
            url: UPDATE_INSERT_USER,
            data: JSON.stringify(data),
            type: 'post',
            contentType: 'application/json',
            success: callback
        })
    };

    userService.students = function(callback) {
        callback([
            { userID: 'User 1' },
            { userID: 'User 2' },
            { userID: 'User 3' },
            { userID: 'User 4' },
            { userID: 'User 5' },
            { userID: 'User 6' },
            { userID: 'User 7' },
            { userID: 'User 8' },
            { userID: 'User 9' }
        ]);
    };

    return userService;

});