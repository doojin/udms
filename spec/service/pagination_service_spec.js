var service = require('../../src/service/pagination_service');

describe('pagination_service', function() {

    it('_calculateMaxPage should return the maximal page number', function() {
        expect(service._calculateMaxPage(10, 3)).toEqual(4);
        expect(service._calculateMaxPage(9, 3)).toEqual(3);
    });

    it('_calculateInterval should return left and right link numbers', function() {
        expect(service._calculateInterval(1, 10)).toEqual({ left: 2, right: 6 });
        expect(service._calculateInterval(1, 1)).toEqual({ left: 2, right: 0 });
        expect(service._calculateInterval(5, 10)).toEqual({ left: 3, right: 7 });
        expect(service._calculateInterval(10, 10)).toEqual({ left: 5, right: 9 });
    });

    it('_calculateMargins should return left and right margin visibility flags', function() {
        var borders, max;

        borders = { left: 1, right: 5};
        max = 5;
        expect(service._calculateMargins(borders, max)).toEqual({ left: false, right: false });

        borders = { left: 2, right: 5};
        max = 5;
        expect(service._calculateMargins(borders, max)).toEqual({ left: false, right: false });

        borders = { left: 3, right: 5};
        max = 5;
        expect(service._calculateMargins(borders, max)).toEqual({ left: true, right: false });

        borders = { left: 1, right: 5};
        max = 7;
        expect(service._calculateMargins(borders, max)).toEqual({ left: false, right: true });

        borders = { left: 1, right: 6};
        max = 7;
        expect(service._calculateMargins(borders, max)).toEqual({ left: false, right: false });

        borders = { left: 1, right: 7};
        max = 7;
        expect(service._calculateMargins(borders, max)).toEqual({ left: false, right: false });

        borders = { left: 3, right: 7};
        max = 9;
        expect(service._calculateMargins(borders, max)).toEqual({ left: true, right: true });
    });

    it('skippedRecords should return the amount of skipped records for the current page', function() {
        expect(service.skippedRecords(10, 1)).toEqual(0);
        expect(service.skippedRecords(10, 2)).toEqual(10);
    });

    it('validatePage should return 1 if page value is not a number', function() {
        expect(service.validatePage(null, null, 'abcdefg')).toEqual(1);
    });

    it('validatePage should return 1 if page is smaller than 1', function() {
        expect(service.validatePage(null, null, -10)).toEqual(1);
    });

    it('validatePage should return the maximal page if page is bigger than the maximal page', function() {
        spyOn(service, '_calculateMaxPage').and.returnValue(5);
        expect(service.validatePage(null, null, 10)).toEqual(5);
    });

    it('validatePage should return page itself if it satisfies all check conditions', function() {
        spyOn(service, '_calculateMaxPage').and.returnValue(5);
        expect(service.validatePage(null, null, 4)).toEqual(4);
    });

    it('_calculatePages should return an array of pages', function() {
        expect(service._calculatePages({ left: 5, right: 11 })).toEqual([5, 6, 7, 8, 9, 10, 11]);
    });

    it('paginationRequired should use parameters from request for pagination creation', function(done) {
        var req = {};
        req.params = {};
        req.params.page = 5;
        req.params.perPage = 10;

        var res = {};
        res.locals = {};

        var next = jasmine.createSpy('next');

        var entity = {
            count: jasmine.createSpy('count').and.returnValue(
                {
                    then: function(callback) {
                        callback(20);
                        done();
                    }
                }
            )
        };

        spyOn(service, 'validatePage').and.returnValue(5);
        spyOn(service, 'createPagination').and.returnValue({});

        var func = service.paginationRequired(entity, 'dummy');

        func(req, null, next);

        expect(service.createPagination).toHaveBeenCalledWith(5, 10, 20);
    });

    it('paginationRequired should populate response locals', function(done) {
        var req = {};
        req.params = {};

        res = {};
        res.locals = {};

        var next = jasmine.createSpy('next');

        var entity = {
            count: jasmine.createSpy('count').and.returnValue(
                {
                    then: function(callback) {
                        callback();
                        done();
                    }
                }
            )
        };

        var pagination = { shouldDisplay: true };
        spyOn(service, 'createPagination').and.returnValue(pagination);

        var func = service.paginationRequired(entity, 'viewField');

        func(req, res, next);

        expect(res.locals.viewField).toEqual(pagination);
    });

    it('validatePerPage should validate perPage value correctly', function() {
        expect(service.validatePerPage('5')).toEqual(5);
        expect(service.validatePerPage('10')).toEqual(10);
        expect(service.validatePerPage('15')).toEqual(15);
        expect(service.validatePerPage('25')).toEqual(25);
        expect(service.validatePerPage('50')).toEqual(50);
        expect(service.validatePerPage('100')).toEqual(100);
        expect(service.validatePerPage('69')).toEqual(15);
    });
});