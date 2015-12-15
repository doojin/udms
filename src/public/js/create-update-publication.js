define([
    'helper/jquery',
    'common_logic',
    'service/content_service',
    'widget/publication_form'
], function(
    $,
    commonLogic,
    contentService,
    PublicationForm
) {

    commonLogic.initTinyMCEs(function() {
        contentService.showContent();
    });

    new PublicationForm('.publication');
});