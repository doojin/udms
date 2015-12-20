define(['helper/jquery'], function($) {

    var SUBMIT_PUBLICATION_FORM_URL = '/submit-publication';

    var service = {};

    service.validate = function(data, callback) {
        $.ajax({
            url: SUBMIT_PUBLICATION_FORM_URL,
            data: JSON.stringify(data),
            type: 'post',
            contentType: 'application/json',
            success: callback
        })
    };

    return service;

});