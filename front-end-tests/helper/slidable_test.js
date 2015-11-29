define(['helper/jquery', 'helper/slidable'], function($, slidable) {

    describe('helper/slidable', function() {

        it('bind should bind trigger element to showing slidable element', function() {
            var button = $('<button>');
            var slidableElement = $('<div>');

            slidable.bind(button, 'click', slidableElement);

            expect(slidableElement.hasClass('visible')).toBeFalsy();
            button.click();
            expect(slidableElement.hasClass('visible')).toBeTruthy();
        });

        it('bind should make .hide-slidable element within slidable to hide it on click', function() {
            var button = $('<button>');
            var slidableElement = $('<div>');
            var closeButton = $('<button>').addClass('hide-slidable');
            slidableElement.append(closeButton);

            slidable.bind(button, 'click', slidableElement);

            expect(slidableElement.hasClass('visible')).toBeFalsy();
            button.click();
            expect(slidableElement.hasClass('visible')).toBeTruthy();
            closeButton.click();
            expect(slidableElement.hasClass('visible')).toBeFalsy();
        });

    });

});