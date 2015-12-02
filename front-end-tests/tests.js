(function() {

    var BOWER_DIR = '../../../bower_components/';

    require.config({
        urlArgs: 'cb=' + Math.random(),
        baseUrl: '../src/public/js',
        paths: {
            'jasmine': BOWER_DIR + 'jasmine-core/lib/jasmine-core/jasmine',
            'jasmine-html': BOWER_DIR + 'jasmine-core/lib/jasmine-core/jasmine-html',
            'boot': BOWER_DIR + 'jasmine-core/lib/jasmine-core/boot',
            'tests': '../../../front-end-tests/',
            'jqueryGlobal': 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min'
        },
        shim: {
            'jasmine-html': {
                exports: 'jasmineRequire',
                deps: ['jasmine']
            },
            'boot': {
                exports: 'jasmineRequire',
                deps: ['jasmine', 'jasmine-html']
            }
        }
    });

}());

define(['helper/jquery', 'boot'], function($) {

    var tests = [
        'tests/helper/form_util_test',
        'tests/widget/login_form_test',
        'tests/helper/slidable_test',
        'tests/widget/log_off_button_test'
    ];

    require(tests, function() {
        beforeEach(function() {
            $('#fixture').html('');
        });

        window.onload();
    });

});