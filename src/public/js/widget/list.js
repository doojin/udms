define(['helper/jquery', 'scrollbar'], function($) {

    /* List ---------------------------------------------*/

    function List() {
        this.onClick = function() {};

        this._items = [];
        this._root = $('<ul>')
            .addClass('item-list')
            .addClass('empty');
        //noinspection JSUnresolvedFunction
        this._root.perfectScrollbar();
    }

    List.prototype.data = function() {
        var result = [];
        this._items.forEach(function(item) {
            var res = {};
            Object.keys(item).forEach(function(key) {
                if (key === 'ID') return;
                res[key] = item[key];
            });
            result.push(res);
        });
        return result;
    };

    List.prototype.add = function(item) {
        item.ID = List.Item.ID++;
        this._items.push(item);

        var itemHTML = item.toHTML();
        this._addClickHandler(item, itemHTML);
        this._root.append(itemHTML);
        this._showHideEmptyLabel();
        //noinspection JSUnresolvedFunction
        this._root.perfectScrollbar('update');
    };

    List.prototype.remove = function(item) {
        this._items = this._items.filter(function(currItem) {
            return(currItem.ID != item.ID);
        });
        this._root.find('li[data-id="' + item.ID + '"]').remove();
        this._showHideEmptyLabel();
        //noinspection JSUnresolvedFunction
        this._root.perfectScrollbar('update');
    };

    List.prototype.appendTo = function(element) {
        $(element).append(this._root);
        this._root.scrollTop(1).scrollTop(0);
    };

    List.prototype.item = function(ID) {
        var matches = this._items.filter(function(item) {
            return item.ID == ID;
        });
        return matches.length === 0 ? null : matches[0];
    };

    List.prototype.title = function(title) {
        this._titleDiv().remove();
        var titleDiv = $('<div>')
            .addClass('title')
            .html(title);
        this._root.prepend(titleDiv);
    };

    List.prototype._addClickHandler = function(item, itemHTML) {
        var self = this;
        $(itemHTML).on('click', function() {
            self.onClick(item);
        });
    };

    List.prototype._showHideEmptyLabel = function() {
        if (this._items.length === 0) {
            this._root.addClass('empty');
            return;
        }
        this._root.removeClass('empty');
    };

    List.prototype._titleDiv = function() {
        return this._root.find('.title');
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