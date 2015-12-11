define(function() {

    var timeService = {};

    var NEVER = 'Never',
        NOW = 'Now',
        SECONDS = '{amt} second(s) ago',
        MINUTES = '{amt} minute(s) ago',
        HOURS = '{amt} hour(s) ago',
        DAYS = '{amt} day(s) ago',
        MONTHS = '{amt} month(s) ago',
        YEARS = '{amt} year(s) ago';

    var MILLISECONDS_COEFF = 1000,
        SECONDS_COEFF = 60,
        MINUTES_COEFF = 60,
        HOURS_COEFF = 24,
        DAYS_COEFF = 30,
        MONTHS_COEFF = 12;

    timeService.now = function() {
        return Date.now();
    };

    timeService.timePassed = function(date) {
        if (!date) return NEVER;

        var now = this.now(),
            then = Date.parse(date);

        // Milliseconds
        var diff = now - then;

        // Seconds
        diff = Math.floor(diff / MILLISECONDS_COEFF);

        if (diff < 1) return NOW;
        if (diff < SECONDS_COEFF) return SECONDS.replace('{amt}', diff.toString());

        // Minutes
        diff = Math.floor(diff / SECONDS_COEFF);
        if (diff < MINUTES_COEFF) return MINUTES.replace('{amt}', diff.toString());

        // Hours
        diff = Math.floor(diff / MINUTES_COEFF);
        if (diff < HOURS_COEFF) return HOURS.replace('{amt}', diff.toString());

        // Days
        diff = Math.floor(diff / HOURS_COEFF);
        if (diff < DAYS_COEFF) return DAYS.replace('{amt}', diff.toString());

        // Months
        diff = Math.floor(diff / DAYS_COEFF);
        if (diff < MONTHS_COEFF) return MONTHS.replace('{amt}', diff.toString());

        // Years
        diff = Math.floor(diff / MONTHS_COEFF);
        return YEARS.replace('{amt}', diff.toString());
    };

    return timeService;

});