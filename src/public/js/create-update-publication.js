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

    var publicationForm = new PublicationForm('.publication');
    publicationForm.onSubmit = function(data) {
        console.log(data);
    };
});