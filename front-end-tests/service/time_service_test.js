define(['service/time_service'], function(service) {

    describe('service/time_service', function() {

        beforeEach(function() {
            spyOn(service, 'now').and.returnValue(Date.parse('1991-03-21T21:40:00.000Z'));
        });

        it('timePassed should return milliseconds since time mark', function() {
            expect(service.timePassed('1991-03-21T21:39:59.001Z')).toEqual('Now');
        });

        it('timePassed should return seconds since time mark', function() {
            expect(service.timePassed('1991-03-21T21:39:59.000Z')).toEqual('1 second(s) ago');
            expect(service.timePassed('1991-03-21T21:39:01.000Z')).toEqual('59 second(s) ago');
        });

        it('timePassed should return minutes since time mark', function() {
            expect(service.timePassed('1991-03-21T21:39:00.000Z')).toEqual('1 minute(s) ago');
            expect(service.timePassed('1991-03-21T20:41:00.000Z')).toEqual('59 minute(s) ago');
        });

        it('timePassed should return hours since time mark', function() {
            expect(service.timePassed('1991-03-21T20:40:00.000Z')).toEqual('1 hour(s) ago');
            expect(service.timePassed('1991-03-20T22:40:00.000Z')).toEqual('23 hour(s) ago');
        });

        it('timePassed should return days since time mark', function() {
            expect(service.timePassed('1991-03-20T20:40:00.000Z')).toEqual('1 day(s) ago');
            expect(service.timePassed('1991-02-22T21:00:00.000Z')).toEqual('27 day(s) ago');
        });

        it('timePassed should return months since time mark', function() {
            expect(service.timePassed('1991-01-20T20:40:00.000Z')).toEqual('2 month(s) ago');
        });

        it('timePassed should return years since time mark', function() {
            expect(service.timePassed('1989-01-20T20:40:00.000Z')).toEqual('2 year(s) ago');
        });

        it('timePassed should return Never if time is undefined', function() {
            expect(service.timePassed(undefined)).toEqual('Never');
        });

    });

});