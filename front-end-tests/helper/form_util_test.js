define(['helper/jquery', 'helper/form_util'], function($, formUtil) {

    function createKeyPressEvent(key) {
        var keyPressEvent = $.Event('keypress');
        keyPressEvent.which = key;
        return keyPressEvent;
    }

    function createEnterPressEvent() {
        return createKeyPressEvent(13);
    }

    describe('helper/form_util', function() {

        it('onEnter should add enterKeyPress listener for all form input elements', function() {
            var form = $('<form>');
            var textInput = $('<input type="text">');
            var passwordInput = $('<input type="password">');
            form.append(textInput);
            form.append(passwordInput);
            var callback = jasmine.createSpy('callback');

            formUtil.onEnter(form, callback);
            textInput.trigger(createEnterPressEvent());
            passwordInput.trigger(createEnterPressEvent());

            expect(callback.calls.count()).toEqual(2);
            expect(callback).toHaveBeenCalledWith(form);
        });

        it('onEnter should not add any other key press listeners but for Enter key', function() {
            var form = $('<form>');
            var textInput = $('<input type="text">');
            form.append(textInput);
            var callback = jasmine.createSpy('callback');

            formUtil.onEnter(form, callback);
            textInput.trigger(createKeyPressEvent(12));
            textInput.trigger(createKeyPressEvent(13)); // Enter
            textInput.trigger(createKeyPressEvent(13)); // Enter
            textInput.trigger(createKeyPressEvent(14));

            expect(callback.calls.count()).toEqual(2);
        });

    });

});