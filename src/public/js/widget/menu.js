define(['jquery', 'mmenu'], function($) {

    var MOBILE_CONFIG = {
        navbar: {
            add: false
        },
        offCanvas: {
            position  : 'top',
            zposition : 'front'
        }
    };

    function NavigationMenu(id) {
        this.selector = '#' + id;
        this.cloneSelector = '#mm-' + id;
    }

    NavigationMenu.prototype.init = function() {
        $(this.selector).mmenu(MOBILE_CONFIG, {
            clone: true
        });
    };

    NavigationMenu.prototype.bindTrigger = function(trigSelector, trigEvent) {
        var self = this;
        var trigger = $(trigSelector);
        trigger.on(trigEvent, function() { self._toggle(); });
    };

    NavigationMenu.prototype._toggle = function() {
        var menu = this._getClone();
        var API = this._getAPI();

        if (menu.hasClass('mm-current')) {
            API.close();
            return;
        }

        API.open();
    };

    NavigationMenu.prototype._getClone = function() {
        return $(this.cloneSelector);
    };

    NavigationMenu.prototype._getAPI = function() {
        return $(this.selector).data('mmenu');
    };

    return NavigationMenu;

});