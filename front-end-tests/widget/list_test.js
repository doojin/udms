define(['helper/jquery', 'widget/list'], function($, List) {

    describe('widget/list', function() {

        it('List.toHTML should create html element', function() {
            var item = new List.Item('dummy name');
            item.ID = 5;
            expect(item.toHTML()[0].outerHTML).toEqual('<li data-id="5">dummy name</li>');
        });

        it('_addClickHandler should call onClick callback on click', function() {
            var list = new List();
            list.onClick = jasmine.createSpy('onClick');
            var item = {};
            var itemHTML = $('<button>');

            list._addClickHandler(item, itemHTML);

            expect(list.onClick).not.toHaveBeenCalled();

            itemHTML.click();

            expect(list.onClick).toHaveBeenCalledWith(item);
        });

        it('add should increment Item ID', function() {
            var list = new List();
            List.Item.ID = 68;
            var item = new List.Item();

            list.add(item);

            expect(List.Item.ID).toEqual(69);
        });

        it('add should append item\'s HTML representation to root element', function() {
            var list = new List();
            spyOn(list._root, 'append');
            var item = new List.Item();
            spyOn(item, 'toHTML').and.returnValue('dummy html');

            list.add(item);

            expect(list._root.append).toHaveBeenCalledWith('dummy html');
        });

        it('add should add item to _items array', function() {
            var list = new List();
            var item = new List.Item();

            expect(list._items.length).toEqual(0);

            list.add(item);

            expect(list._items.length).toEqual(1);
            expect(list._items[0]).toEqual(item);
        });

    });

});