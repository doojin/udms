var mainScript = require('../../../src/controller/middleware/main_script');

describe('controller/middleware/main_script', function() {

    it('mainScript should set main script url to response object', function() {
        var callback = mainScript('dummyScript');
        var res = { locals: {} };
        var next = jasmine.createSpy('next');

        callback(null, res, next);

        expect(res.locals.mainScript).toEqual('/js/dummyScript');
    });

});