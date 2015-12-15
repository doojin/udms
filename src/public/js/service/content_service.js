define(['helper/jquery'], function($) {

    var contentService = {};

    contentService.showContent = function() {
        $('#content').removeClass('hidden');
    };

    return contentService;

});