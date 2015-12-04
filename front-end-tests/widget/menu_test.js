define(['helper/jquery', 'widget/menu'], function($, Menu) {

    describe('widget/menu', function() {

        var API;

        beforeEach(function() {
            API = {};
            API.close = jasmine.createSpy('close');
            API.open = jasmine.createSpy('open');
        });

        it('Constructor should set selector and cloneSelector properties', function() {
            var menu = new Menu('menuID');

            expect(menu.selector).toEqual('#menuID');
            expect(menu.cloneSelector).toEqual('#mm-menuID');
        });

        it('bindTrigger should bind trigger to widget', function() {
            var menu = new Menu('menuID');
            spyOn(menu, '_toggle');
            var button = $('<button>');

            menu.bindTrigger(button, 'click');

            expect(menu._toggle).not.toHaveBeenCalled();
            button.click();
            expect(menu._toggle).toHaveBeenCalled();
        });

        it('_toggle should close menu if it is open', function() {
            var menu = new Menu();
            var clone = $('<div>').addClass('mm-current');
            spyOn(menu, '_getClone').and.returnValue(clone);
            spyOn(menu, '_getAPI').and.returnValue(API);

            expect(API.close).not.toHaveBeenCalled();
            menu._toggle();
            expect(API.close).toHaveBeenCalled();
        });

        it('_toggle should open menu if it is closed', function() {
            var menu = new Menu();
            var clone = $('<div>');
            spyOn(menu, '_getClone').and.returnValue(clone);
            spyOn(menu, '_getAPI').and.returnValue(API);

            expect(API.open).not.toHaveBeenCalled();
            menu._toggle();
            expect(API.open).toHaveBeenCalled();
        });
    });

});