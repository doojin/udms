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

        it('remove should remove item from _items list', function() {
            var item1 = new List.Item();
            var item2 = new List.Item();
            var item3 = new List.Item();

            var list = new List();

            list.add(item1);
            list.add(item2);
            list.add(item3);

            expect(list._items).toEqual([item1, item2, item3]);

            list.remove(item2);

            expect(list._items).toEqual([item1, item3]);
        });

        it('remove should remove item from HTML output', function() {
            List.Item.ID = 0;
            var item = new List.Item();

            var list = new List();
            list.add(item);

            expect(list._root.find('li').length).toEqual(1);

            list.remove(item);

            expect(list._root.find('li').length).toEqual(0);
        });

        it('item should return item by it\'s id', function() {
            var list = new List();
            var item1 = { ID: 'item1' },
                item2 = { ID: 'item2' },
                item3 = { ID: 'item3' };
            list._items = [ item1, item2, item3 ];

            expect(list.item('item1')).toEqual(item1);
            expect(list.item('item2')).toEqual(item2);
            expect(list.item('item3')).toEqual(item3);
            expect(list.item('item4')).toBeNull();
        });

        it('title should add title div after removing existing', function() {
            var list = new List();
            var titleDiv1 = $('<div>').addClass('title');
            var titleDiv2 = $('<div>').addClass('title');
            list._root
                .append(titleDiv1)
                .append(titleDiv2);

            expect(list._root.find('.title').length).toEqual(2);

            list.title('Dummy title');

            expect(list._root.find('.title').length).toEqual(1);
            expect(list._root.find('.title').html()).toEqual('Dummy title');
        });

        it('_showHideEmptyLabel should append "empty" class if no items exist and remove class if exist', function() {
            var list = new List();

            expect(list._root.hasClass('empty')).toBeTruthy();

            list._items.push('dummy item');
            list._showHideEmptyLabel();

            expect(list._root.hasClass('empty')).toBeFalsy();

            list._items = [];
            list._showHideEmptyLabel();

            expect(list._root.hasClass('empty')).toBeTruthy();
        });

    });

});