var require = {
    urlArgs: 'cb=' + Math.random(),
    paths: {
        'validator': '../../../',
        'jquery': 'vendor/jquery.min',
        'mmenu': 'https://cdnjs.cloudflare.com/ajax/libs/jQuery.mmenu/5.5.3/core/js/jquery.mmenu.min.all',
        'tinyMCE': 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.3.2/tinymce.min'
    },
    shim: {
        'mmenu': {
            deps: ['jquery']
        },
        'tinyMCE': {
            exports: 'tinyMCE'
        }
    }
};