describe('app_config', function() {

    var express = require('express');
    var appConfig = require('../../src/config/app_config');
    var app;

    beforeEach(function() {
        app = express();
    });

    it('setUp should set up all static directories', function() {
        spyOn(express, 'static').and.callThrough();

        appConfig.setUp(app);

        expect(express.static.calls.count()).toEqual(2);
        expect(express.static).toHaveBeenCalledWith('src/public/');
    });

});