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
            'jquery': 'vendor/jquery.min',
            'mmenu': 'https://cdnjs.cloudflare.com/ajax/libs/jQuery.mmenu/5.5.3/core/js/jquery.mmenu.min.all',
            'validator': '../../validator',
            'tinyMCE': 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.3.2/tinymce.min',
            'scrollbar': 'https://cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/0.6.8/js/min/perfect-scrollbar.jquery.min'
        },
        shim: {
            'jasmine-html': {
                exports: 'jasmineRequire',
                deps: ['jasmine']
            },
            'boot': {
                exports: 'jasmineRequire',
                deps: ['jasmine', 'jasmine-html']
            },
            'mmenu': {
                deps: ['jquery']
            },
            'tinyMCE': {
                exports: 'tinyMCE'
            }
        }
    });

}());

define(['helper/jquery', 'boot'], function($) {

    var tests = [
        'tests/helper/form_util_test',
        'tests/widget/login_form_test',
        'tests/helper/slidable_test',
        'tests/widget/log_off_button_test',
        'tests/widget/menu_test',
        'tests/widget/table_test',
        'tests/render/user_table_render_test',
        'tests/service/role_service_test',
        'tests/service/time_service_test',
        'tests/widget/user_upsert_form_test',
        'tests/service/content_service_test',
        'tests/widget/publication_form_test',
        'tests/widget/list_test'
    ];

    require(tests, function() {
        beforeEach(function() {
            $('#fixture').html('');
        });

        window.onload();
    });

});