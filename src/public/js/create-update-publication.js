define([
    'helper/jquery',
    'common_logic',
    'service/content_service',
    'widget/publication_form',
    'service/publication_service'
], function(
    $,
    commonLogic,
    contentService,
    PublicationForm,
    publicationService
) {

    var publicationForm = new PublicationForm('.publication');

    publicationForm.onDataLoad = function() {
        commonLogic.initTinyMCEs(function() {
            contentService.showContent();
        });
    };

});