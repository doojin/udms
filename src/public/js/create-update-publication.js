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

    var publicationForm = new PublicationForm('.publication');

    publicationForm.onDataLoad = function() {
        commonLogic.initTinyMCEs(function() {
            contentService.showContent();
        });
    };

});