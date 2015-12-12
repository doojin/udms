define(['helper/jquery'], function($) {

    var GET_GROUPS_URL = '/groups';

    var groupService = {};

    groupService.groups = function(callback) {
        $.ajax({
            url: GET_GROUPS_URL,
            type: 'get',
            success: callback
        });
    };

    return groupService;

});