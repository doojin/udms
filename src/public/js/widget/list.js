define(['helper/jquery'], function($) {

    /* List ---------------------------------------------*/

    function List() {
        this.onClick = function() {};

        this._items = [];
        this._root = $('<ul>').addClass('item-list');
    }

    List.prototype.add = function(item) {
        item.ID = List.Item.ID++;
        this._items.push(item);

        var itemHTML = item.toHTML();
        this._addClickHandler(item, itemHTML);
        this._root.append(itemHTML);
    };

    List.prototype.remove = function(item) {
        this._items = this._items.filter(function(currItem) {
            return(currItem.ID != item.ID);
        });
        this._root.find('li[data-id="' + item.ID + '"]').remove();
    };

    List.prototype.toHTML = function() {
        return this._root;
    };

    List.prototype._addClickHandler = function(item, itemHTML) {
        var self = this;
        $(itemHTML).on('click', function() {
            self.onClick(item);
        });
    };

    /* List.Item -----------------------------------------*/

    List.Item = function(name, value) {
        this.name = name;
        this.value = value;
    };

    List.Item.ID = 0;

    List.Item.prototype.toHTML = function() {
        return $('<li>')
            .text(this.name)
            .attr('data-id', this.ID);
    };

    return List;

});