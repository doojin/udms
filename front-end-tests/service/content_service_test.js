define(['helper/jquery', 'service/content_service'], function($, contentService) {

    var fixture = $('#fixture');

    describe('service/content_service', function() {

        it('showContent should remove "hidden" class from content element', function() {
            var content = $('<div>').attr('id', 'content').addClass('hidden');
            fixture.append(content);

            contentService.showContent();

            expect(content.hasClass('hidden')).toBeFalsy();
        });

    });

});