describe('controllers', function() {

    var express = require('express');
    var controllers = require('../../src/controller/controllers');
    var app;

    beforeEach(function() {
        app = express();
    });

    it('applyAll should apply all controllers', function() {
        var authController = require('../../src/controller/auth_controller');
        spyOn(authController, 'apply').and.callThrough();

        controllers.applyAll(app);

        expect(authController.apply).toHaveBeenCalledWith(app);
    });
});