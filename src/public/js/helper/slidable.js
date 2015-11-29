define(['helper/jquery'], function($) {

    return {
        bind: function(triggerSelector, triggerEvent, slidableSelector) {
            var trigger = $(triggerSelector),
                slidable = $(slidableSelector);

            trigger.on(triggerEvent, function() {
                slidable.addClass('visible');
            });

            var hideTrigger = slidable.find('.hide-slidable');
            hideTrigger.on('click', function() {
                slidable.removeClass('visible');
            });
        }
    };

});