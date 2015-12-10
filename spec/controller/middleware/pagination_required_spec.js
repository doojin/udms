var paginationRequired = require('../../../src/controller/middleware/pagination_required'),
    paginationService = require('../../../src/service/pagination_service');

describe('controller/middleware/pagination_required', function() {

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

        spyOn(paginationService, 'validatePage').and.returnValue(5);
        spyOn(paginationService, 'createPagination').and.returnValue({});

        var func = paginationRequired(entity, 'dummy');

        func(req, null, next);

        expect(paginationService.createPagination).toHaveBeenCalledWith(5, 10, 20);
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
        spyOn(paginationService, 'createPagination').and.returnValue(pagination);

        var func = paginationRequired(entity, 'viewField');

        func(req, res, next);

        expect(res.locals.viewField).toEqual(pagination);
    });

});