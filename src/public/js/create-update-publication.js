define([
    'helper/jquery',
    'common_logic',
    'service/content_service'
], function(
    $,
    commonLogic,
    contentService
) {

    commonLogic.initTinyMCEs(function() {
        contentService.showContent();
    });
});