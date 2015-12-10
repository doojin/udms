define(['helper/jquery'], function($) {

    function Table(data, renderRow) {
        this.data = data;
        this.render = renderRow;
        this.onclick = function(data) { /* Do nothing */ };
        this.header = [];

        this._tableClasses = [];

        this._output = null;
    }

    Table.prototype.build = function() {
        this._buildEmptyTable();
        this._buildHeader();
        this._buildRows();
        this._appendClasses();
        return this._output;
    };

    Table.prototype.addClass = function(clazz) {
        this._tableClasses.push(clazz);
    };

    Table.prototype._buildEmptyTable = function() {
        this._output = $('<table>');
    };

    Table.prototype._buildHeader = function() {
        if (this.header.length === 0) return;

        var tr =  $('<tr>');
        this.header.forEach(function(columnTitle) {
            var td = $('<td>').html(columnTitle);
            tr.append(td);
        });
        var thead = $('<thead>').append(tr);

        this._output.append(thead);
    };

    Table.prototype._buildRows = function() {
        var tbody = $('<tbody>');
        var self = this;
        this.data.forEach(function(rowData) {
            // Adding row columns
            var columns = [];
            self.render(rowData, columns);

            var row = $('<tr>');
            columns.forEach(function(column) {
                var td = $('<td>').html(column);
                row.append(td);
            });

            // Adding click handler for row
            row.on('click', function() {
                self.onclick(rowData)
            });

            // Appending row to tbody of output table
            tbody.append(row);
        });
        this._output.append(tbody);
    };

    Table.prototype._appendClasses = function() {
        var self = this;
        this._tableClasses.forEach(function(clazz) {
            self._output.addClass(clazz);
        });
    };

    return Table;

});