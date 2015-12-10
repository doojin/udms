define(['helper/jquery', 'widget/table'], function($, Table) {

    describe('widget/table', function() {

        var table;

        beforeEach(function() {
            table = new Table();
        });

        it('_buildEmptyTable should create an empty table element', function() {
            expect(table._output).toBeNull();

            table._buildEmptyTable();

            expect(table._output).toEqual($('<table>'));
        });

        it('_buildHeader should build table header if column titles exist', function() {
            table._output = $('<table>');
            table.header = ['title 1', 'title 2', 'title 3'];

            expect(table._output.find('thead').find('tr').find('td').length).toEqual(0);

            table._buildHeader();

            var titles = table._output.find('thead').find('tr').find('td');
            expect(titles.length).toEqual(3);
            expect($(titles[0]).html()).toEqual('title 1');
            expect($(titles[1]).html()).toEqual('title 2');
            expect($(titles[2]).html()).toEqual('title 3');
        });


        it('_buildHeader should not build table header if column titles don\'t exist', function() {
            table._output = $('<table>');
            table.header = [];

            table._buildHeader();

            expect(table._output.find('thead').length).toEqual(0);
        });

        it('_buildRows should build table rows', function() {
            table._output = $('<table>');
            table.data = [
                { name: 'Dmitry Papka', age: 24 },
                { name: 'Chuck Norris', age: -1 }
            ];
            table.render = function(data, columns) {
                columns[0] = 'Name: ' + data.name;
                columns[1] = 'Age: ' + data.age;
            };

            expect(table._output.find('tbody').find('tr').length).toEqual(0);

            table._buildRows();

            var rows = table._output.find('tbody').find('tr');
            expect(rows.length).toEqual(2);
            expect(rows[0].outerHTML).toEqual('<tr><td>Name: Dmitry Papka</td><td>Age: 24</td></tr>');
            expect(rows[1].outerHTML).toEqual('<tr><td>Name: Chuck Norris</td><td>Age: -1</td></tr>');
        });

        it('_buildRows should add click handler to table rows', function() {
            var rowData1 = {number: 1};
            var rowData2 = {number: 2};
            table.data = [rowData1, rowData2];
            table.render = function() {};
            table._output = $('<table>');
            table.onclick = jasmine.createSpy('click handler');

            table._buildRows();

            var rows = table._output.find('tbody').find('tr');
            expect(rows.length).toEqual(2);

            expect(table.onclick).not.toHaveBeenCalled();

            rows[0].click();

            expect(table.onclick).toHaveBeenCalledWith(rowData1);

            rows[1].click();

            expect(table.onclick).toHaveBeenCalledWith(rowData2);
        });

        it('addClass should add class to the array of classes', function() {
            expect(table._tableClasses).toEqual([]);

            table.addClass('class1');
            table.addClass('class2');

            expect(table._tableClasses).toEqual(['class1', 'class2']);
        });

        it('_appendClasses should add all classes from class array to table widget', function() {
            table._tableClasses = ['class1', 'class2'];
            table._output = $('<table>');

            table._appendClasses();

            expect(table._output.hasClass('class1')).toBeTruthy();
            expect(table._output.hasClass('class2')).toBeTruthy();
        });

    });

});